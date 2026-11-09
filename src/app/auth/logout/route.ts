import { NextResponse } from "next/server";
import { safeReturnTo } from "@/lib/redirect";
import { createClient } from "@/lib/supabase/server";

export const dynamic = "force-dynamic";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Methods": "GET, POST, OPTIONS",
  "Access-Control-Allow-Headers":
    "Content-Type, Authorization, X-Requested-With, X-App-Id",
};

export async function OPTIONS() {
  return new NextResponse(null, {
    status: 204,
    headers: corsHeaders,
  });
}

function getRequestOrigin(request: Request, requestUrl: URL): string {
  const forwardedHost =
    request.headers.get("x-forwarded-host") || request.headers.get("host");
  const forwardedProto =
    request.headers.get("x-forwarded-proto") ||
    (forwardedHost?.includes("localhost") ||
    forwardedHost?.includes("127.0.0.1")
      ? "http"
      : "https");

  return forwardedHost
    ? `${forwardedProto}://${forwardedHost}`
    : requestUrl.origin ||
        process.env.NEXT_PUBLIC_SITE_URL ||
        "https://vntez-iam.vercel.app";
}

/**
 * GET /auth/logout: Đăng xuất tập trung SSO (RP-Initiated Logout)
 * Hỗ trợ tham số query: redirect_url hoặc post_logout_redirect_uri
 */
export async function GET(request: Request) {
  const requestUrl = new URL(request.url);
  const rawRedirect =
    requestUrl.searchParams.get("redirect_url") ||
    requestUrl.searchParams.get("post_logout_redirect_uri") ||
    requestUrl.searchParams.get("return_to");

  const returnTo = safeReturnTo(rawRedirect);
  const origin = getRequestOrigin(request, requestUrl);

  try {
    const supabase = await createClient(request);
    await supabase.auth.signOut();
  } catch (err) {
    console.warn("[/auth/logout] Lỗi khi huỷ phiên Supabase:", err);
  }

  const target = returnTo
    ? returnTo.startsWith("/")
      ? `${origin}${returnTo}`
      : returnTo
    : null;

  const acceptHeader = request.headers.get("accept") || "";
  if (acceptHeader.includes("application/json")) {
    return NextResponse.json(
      {
        ok: true,
        message: "Đăng xuất thành công",
        redirect_url: target,
      },
      { status: 200, headers: corsHeaders },
    );
  }

  // Chuyển hướng người dùng về app vệ tinh hoặc trang login của IAM
  return NextResponse.redirect(
    target || `${origin}/login?logged_out=true`,
    302,
  );
}

/**
 * POST /auth/logout: Đăng xuất qua API dành cho SPA / mobile client
 */
export async function POST(request: Request) {
  const requestUrl = new URL(request.url);
  let rawRedirect =
    requestUrl.searchParams.get("redirect_url") ||
    requestUrl.searchParams.get("post_logout_redirect_uri");

  try {
    const body = await request.json().catch(() => ({}));
    if (!rawRedirect && body) {
      rawRedirect = body.redirect_url || body.post_logout_redirect_uri || null;
    }
  } catch {
    // Body rỗng hoặc không phải JSON
  }

  const returnTo = safeReturnTo(rawRedirect);
  const origin = getRequestOrigin(request, requestUrl);

  try {
    const supabase = await createClient(request);
    await supabase.auth.signOut();
  } catch (err) {
    console.warn("[/auth/logout POST] Lỗi khi huỷ phiên Supabase:", err);
  }

  const target = returnTo
    ? returnTo.startsWith("/")
      ? `${origin}${returnTo}`
    : returnTo
    : null;

  return NextResponse.json(
    {
      ok: true,
      message: "Đăng xuất thành công",
      redirect_url: target,
    },
    { status: 200, headers: corsHeaders },
  );
}
