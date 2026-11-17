import crypto from "node:crypto";
import { NextResponse } from "next/server";
import { signAccessToken } from "@/lib/oauth/jwt";
import { supabaseAdmin } from "@/lib/supabase/admin";

// CORS headers cho phép app vệ tinh (kể cả SPA trên domain khác) gọi API
const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Methods": "POST, OPTIONS",
  "Access-Control-Allow-Headers": "Content-Type, Authorization",
};

export async function OPTIONS() {
  return new NextResponse(null, {
    status: 204,
    headers: corsHeaders,
  });
}

function verifySecret(clientSecret: string, clientSecretHash: string): boolean {
  if (!clientSecret || !clientSecretHash) return false;

  // Hỗ trợ kiểm tra hash SHA256 hoặc so khớp trực tiếp nếu dev lưu plain
  const sha256 = crypto.createHash("sha256").update(clientSecret).digest("hex");
  if (sha256 === clientSecretHash) return true;

  return clientSecret === clientSecretHash;
}

export async function POST(req: Request) {
  try {
    let body: Record<string, any> = {};
    const contentType = req.headers.get("content-type") || "";

    if (contentType.includes("application/x-www-form-urlencoded")) {
      const text = await req.text();
      const params = new URLSearchParams(text);
      for (const [key, value] of params.entries()) {
        body[key] = value;
      }
    } else if (contentType.includes("multipart/form-data")) {
      const formData = await req.formData().catch(() => null);
      if (formData) {
        for (const [key, value] of formData.entries()) {
          body[key] = value;
        }
      }
    } else {
      body = await req.json().catch(() => ({}));
    }

    const {
      grant_type,
      code,
      app_id,
      client_id,
      app_secret,
      client_secret,
      code_verifier,
      redirect_uri,
    } = body;

    // Kiểm tra grant_type
    if (grant_type !== "authorization_code") {
      return NextResponse.json(
        {
          error: "unsupported_grant_type",
          error_description: "grant_type phải là authorization_code",
        },
        { status: 400, headers: corsHeaders },
      );
    }

    // Xác định appId (ưu tiên app_id, fallback client_id)
    const appId = app_id || client_id;
    if (!code || !appId) {
      return NextResponse.json(
        {
          error: "invalid_request",
          error_description: "Thiếu code hoặc app_id/client_id",
        },
        { status: 400, headers: corsHeaders },
      );
    }

    // 1. Kiểm tra App từ bảng apps theo app_id / id
    const { data: client, error: clientErr } = await supabaseAdmin
      .from("apps")
      .select("*")
      .eq("id", appId)
      .maybeSingle();

    if (clientErr) {
      console.error("[/oauth/token] Lỗi truy vấn bảng apps:", clientErr);
    }

    if (!client) {
      return NextResponse.json(
        {
          error: "invalid_client",
          error_description: `Ứng dụng '${appId}' không hợp lệ hoặc chưa được đăng ký trong hệ thống`,
        },
        { status: 401, headers: corsHeaders },
      );
    }

    // 1.5 Kiểm tra app status (nếu từ bảng apps)
    if (client.status && client.status !== "active") {
      return NextResponse.json(
        {
          error: "invalid_client",
          error_description: "App hiện không hoạt động",
        },
        { status: 403, headers: corsHeaders },
      );
    }

    // 2. Kiểm tra Auth Code
    const { data: codeRecord, error: codeErr } = await supabaseAdmin
      .from("oauth_codes")
      .select("*")
      .eq("code", code)
      .eq("client_id", appId) // Tìm code với app_id/client_id
      .eq("used", false)
      .gt("expires_at", new Date().toISOString())
      .maybeSingle();

    if (codeErr || !codeRecord || codeRecord.redirect_uri !== redirect_uri) {
      return NextResponse.json(
        {
          error: "invalid_grant",
          error_description:
            "Auth code không hợp lệ, đã hết hạn hoặc redirect_uri không khớp",
        },
        { status: 400, headers: corsHeaders },
      );
    }

    // 3. Xác thực Secret:
    // - Luồng PKCE (SPA/Public Client): Client xác thực qua code_verifier, KHÔNG bắt buộc app_secret.
    // - Luồng Confidential Client (không có code_challenge): Bắt buộc xác thực app_secret/client_secret nếu app có secret.
    const secret = app_secret || client_secret;
    const secretHash = client.app_secret || client.client_secret_hash;

    if (!codeRecord.code_challenge) {
      if (secretHash) {
        const isValid = verifySecret(secret, secretHash);
        if (!isValid) {
          return NextResponse.json(
            {
              error: "unauthorized_client",
              error_description: "app_secret/client_secret không chính xác",
            },
            { status: 401, headers: corsHeaders },
          );
        }
      }
    } else if (secret && secretHash) {
      const isValid = verifySecret(secret, secretHash);
      if (!isValid) {
        return NextResponse.json(
          {
            error: "unauthorized_client",
            error_description: "app_secret/client_secret không chính xác",
          },
          { status: 401, headers: corsHeaders },
        );
      }
    }

    // 4. Xác thực PKCE S256 nếu có code_challenge
    if (codeRecord.code_challenge) {
      if (!code_verifier) {
        return NextResponse.json(
          {
            error: "code_verifier_required",
            error_description:
              "Yêu cầu cung cấp code_verifier để xác thực PKCE",
          },
          { status: 400, headers: corsHeaders },
        );
      }

      // S256: BASE64URL-ENCODE(SHA256(ASCII(code_verifier)))
      const hash = crypto
        .createHash("sha256")
        .update(code_verifier)
        .digest("base64url");

      if (hash !== codeRecord.code_challenge) {
        return NextResponse.json(
          {
            error: "invalid_code_verifier",
            error_description:
              "code_verifier không khớp với code_challenge đã đăng ký",
          },
          { status: 400, headers: corsHeaders },
        );
      }
    }

    // 5. Đánh dấu code đã dùng ngay lập tức (Chống tấn công Replay Attack)
    await supabaseAdmin
      .from("oauth_codes")
      .update({ used: true })
      .eq("code", code);

    // 6. Cấp Access Token (JWT được ký bởi VNTEZ IAM Key)
    const { accessToken, expiresIn } = signAccessToken({
      userId: codeRecord.user_id,
      clientId: appId,
    });

    return NextResponse.json(
      {
        access_token: accessToken,
        token_type: "Bearer",
        expires_in: expiresIn,
        scope: "openid profile email",
      },
      {
        status: 200,
        headers: {
          ...corsHeaders,
          "Cache-Control": "no-store",
          Pragma: "no-cache",
        },
      },
    );
  } catch (err: any) {
    console.error("[/oauth/token] Lỗi hệ thống:", err);
    return NextResponse.json(
      {
        error: "server_error",
        error_description: err?.message || "Đã xảy ra lỗi nội bộ",
      },
      { status: 500, headers: corsHeaders },
    );
  }
}
