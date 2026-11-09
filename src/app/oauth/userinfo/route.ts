import { NextResponse } from "next/server";
import { verifyAccessToken } from "@/lib/oauth/jwt";
import { getUserById, supabaseAdmin } from "@/lib/supabase/admin";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Methods": "GET, POST, OPTIONS",
  "Access-Control-Allow-Headers": "Content-Type, Authorization, X-App-Id",
};

export async function OPTIONS() {
  return new NextResponse(null, {
    status: 204,
    headers: corsHeaders,
  });
}

/**
 * Lấy vai trò và quyền hạn CHUYÊN BIỆT cho từng ứng dụng (App-scoped)
 * Tuyệt đối không trả về vai trò của ứng dụng khác để tránh rò rỉ và quá tải payload.
 */
async function getScopedUserRolesAndPerms(
  userId: string,
  userEmail: string | undefined,
  targetAppId: string | null,
) {
  let appRole: string | null = null;
  let isSuperAdmin = false;

  try {
    const { data: userRoles } = await supabaseAdmin
      .from("iam_user_roles")
      .select("role_id, app_id")
      .eq("user_id", userId);

    if (userRoles && userRoles.length > 0) {
      for (const r of userRoles) {
        if (!r.app_id && r.role_id === "admin") {
          isSuperAdmin = true;
        }
        if (targetAppId) {
          // Lọc role thuộc đúng app được yêu cầu
          if (r.app_id === targetAppId) {
            appRole = r.role_id.replace(/^[^:]+:/, "");
          }
        } else {
          // Phạm vi Root (app_id is null)
          if (!r.app_id) {
            appRole = r.role_id;
          }
        }
      }
    }
  } catch (err) {
    console.warn("[/oauth/userinfo] Không thể truy vấn iam_user_roles:", err);
  }

  // Fallbacks logic
  if (isSuperAdmin || userEmail === "hnamhocit@gmail.com") {
    if (!appRole) appRole = "admin";
  } else if (!appRole) {
    appRole = targetAppId ? "member" : "viewer";
  }

  const roleName = appRole;
  const roles = [roleName];

  // Lấy quyền hạn của role này
  let permissions: string[] = [];
  try {
    const roleDbKeys = targetAppId
      ? [`${targetAppId}:${roleName}`, roleName]
      : [roleName];

    const { data: permsData } = await supabaseAdmin
      .from("iam_role_permissions")
      .select("permission")
      .in("role_id", roleDbKeys);

    if (permsData && permsData.length > 0) {
      permissions = Array.from(new Set(permsData.map((p: any) => p.permission)));
    }
  } catch (err) {
    console.warn("[/oauth/userinfo] Không thể truy vấn iam_role_permissions:", err);
  }

  if (isSuperAdmin || userEmail === "hnamhocit@gmail.com") {
    if (!permissions.includes("*:*")) {
      permissions.unshift("*:*");
    }
  }

  return {
    app_id: targetAppId,
    role: roleName,
    roles,
    permissions,
  };
}

async function handleUserInfo(req: Request) {
  const authHeader = req.headers.get("Authorization");
  if (!authHeader?.startsWith("Bearer ")) {
    return NextResponse.json(
      {
        error: "unauthorized",
        error_description:
          "Thiếu Bearer access token trong header Authorization",
      },
      { status: 401, headers: corsHeaders },
    );
  }

  const token = authHeader.split(" ")[1];

  try {
    const payload = verifyAccessToken(token);

    // Xác định app_id đang gọi:
    // 1. Header X-App-Id
    // 2. Query param ?app_id=
    // 3. Claims trong Access Token (payload.app_id hoặc payload.aud)
    const url = new URL(req.url);
    const rawAppId =
      req.headers.get("X-App-Id") ||
      url.searchParams.get("app_id") ||
      (payload as any).app_id ||
      (payload.aud && payload.aud !== "vntez-console-app" && payload.aud !== "root" ? payload.aud : null);

    const targetAppId = rawAppId && rawAppId.trim() ? rawAppId.trim() : null;

    // Query thông tin user từ Supabase auth qua admin API
    const user = await getUserById(payload.sub);
    const userEmail = user?.email || payload.email || "";
    const userId = user?.id || payload.sub;

    const rbac = await getScopedUserRolesAndPerms(userId, userEmail, targetAppId);

    if (user) {
      return NextResponse.json(
        {
          sub: user.id,
          email: user.email,
          email_verified: Boolean(user.email_confirmed_at),
          name:
            user.user_metadata?.full_name ||
            user.user_metadata?.name ||
            user.email?.split("@")[0] ||
            "",
          avatar:
            user.user_metadata?.avatar_url ||
            user.user_metadata?.picture ||
            null,
          picture:
            user.user_metadata?.avatar_url ||
            user.user_metadata?.picture ||
            null,
          app_id: rbac.app_id,
          role: rbac.role,
          roles: rbac.roles,
          permissions: rbac.permissions,
        },
        { status: 200, headers: corsHeaders },
      );
    }

    // Nếu không có service role key hoặc không tìm thấy user qua admin, fallback từ claims của token
    return NextResponse.json(
      {
        sub: payload.sub,
        email: payload.email || "",
        email_verified: true,
        name: payload.name || "",
        avatar: payload.avatar || null,
        picture: payload.avatar || null,
        app_id: rbac.app_id,
        role: rbac.role,
        roles: rbac.roles,
        permissions: rbac.permissions,
      },
      { status: 200, headers: corsHeaders },
    );
  } catch (err: any) {
    console.warn("[/oauth/userinfo] Token không hợp lệ:", err?.message);
    return NextResponse.json(
      {
        error: "invalid_token",
        error_description: "Access token đã hết hạn hoặc chữ ký không hợp lệ",
      },
      { status: 401, headers: corsHeaders },
    );
  }
}

export async function GET(req: Request) {
  return handleUserInfo(req);
}

export async function POST(req: Request) {
  return handleUserInfo(req);
}

export async function GET(req: Request) {
  return handleUserInfo(req);
}

export async function POST(req: Request) {
  return handleUserInfo(req);
}
