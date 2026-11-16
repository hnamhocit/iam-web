import crypto from "node:crypto";
import type { Metadata } from "next";
import { redirect } from "next/navigation";
import { connection } from "next/server";
import { Suspense } from "react";
import { ConsentScreen } from "@/components/oauth/consent-screen";
import { OAuthErrorView } from "@/components/oauth/oauth-error-view";
import { getApp, saveOAuthCode } from "@/lib/supabase/admin";
import { createClient } from "@/lib/supabase/server";

export const metadata: Metadata = {
  title: "Ủy quyền truy cập (OAuth 2.0 / SSO)",
  description: "Trang xác thực và chấp thuận cấp quyền ứng dụng VNTEZ IAM.",
  robots: {
    index: false,
    follow: false,
  },
};

interface AuthorizePageProps {
  searchParams: Promise<{
    app_id?: string;
    client_id?: string;
    redirect_uri?: string;
    response_type?: string;
    state?: string;
    code_challenge?: string;
    code_challenge_method?: string;
    scope?: string;
  }>;
}

async function AuthorizeContent({ searchParams }: AuthorizePageProps) {
  await connection();
  const params = await searchParams;
  const {
    app_id,
    client_id,
    redirect_uri,
    response_type,
    state,
    code_challenge,
    code_challenge_method,
    scope,
  } = params;

  // Xác định app identifier: ưu tiên app_id, tương thích ngược client_id
  const targetAppId = app_id || client_id;

  // 1. Kiểm tra các tham số bắt buộc theo chuẩn OAuth 2.0 PKCE
  if (!targetAppId) {
    return (
      <OAuthErrorView
        title="Thiếu mã định danh ứng dụng"
        desc="Yêu cầu ủy quyền OAuth 2.0 / SSO phải chứa tham số nhận diện ứng dụng (app_id hoặc client_id)."
        errorCode="MISSING_APP_ID"
        redirectUri={redirect_uri}
        hint="Truyền tham số ?app_id=<app_id> hoặc ?client_id=<client_id> vào URL ủy quyền."
      />
    );
  }

  if (!redirect_uri) {
    return (
      <OAuthErrorView
        title="Thiếu tham số redirect_uri"
        desc="Yêu cầu ủy quyền OAuth 2.0 phải chứa địa chỉ URL phản hồi (redirect_uri)."
        errorCode="MISSING_REDIRECT_URI"
        appId={targetAppId}
        hint="Cung cấp ?redirect_uri=<url> hợp lệ đã được đăng ký trong cấu hình ứng dụng."
      />
    );
  }

  if (response_type !== "code") {
    return (
      <OAuthErrorView
        title="Phương thức phản hồi không hỗ trợ"
        desc="VNTEZ IAM hiện hỗ trợ phương thức phản hồi tiêu chuẩn OAuth 2.0 Authorization Code Flow: response_type=code."
        errorCode="UNSUPPORTED_RESPONSE_TYPE"
        appId={targetAppId}
        redirectUri={redirect_uri}
        hint="Thiết lập tham số ?response_type=code trong yêu cầu ủy quyền."
      />
    );
  }

  // 2. Tìm kiếm ứng dụng từ bảng apps theo app_id / id
  const app = await getApp(targetAppId);
  if (!app) {
    return (
      <OAuthErrorView
        title="Ứng dụng không tồn tại"
        desc={`Không tìm thấy ứng dụng với mã định danh "${targetAppId}" trong hệ sinh thái VNTEZ IAM. Vui lòng kiểm tra lại cấu hình app_id trong VNTEZ Developer Portal.`}
        errorCode="APP_NOT_FOUND"
        appId={targetAppId}
        redirectUri={redirect_uri}
        hint="Kiểm tra xem app_id đã được thêm vào bảng apps của VNTEZ hoặc đã kích hoạt hay chưa."
      />
    );
  }

  // 2.5 Kiểm tra trạng thái ứng dụng (status active)
  if (app.status && app.status !== "active") {
    return (
      <OAuthErrorView
        title="Ứng dụng đang tạm ngưng"
        desc={`Ứng dụng "${app.name}" hiện đang ở trạng thái bảo trì hoặc tạm thời ngừng cung cấp dịch vụ.`}
        errorCode="APP_INACTIVE"
        appId={targetAppId}
        redirectUri={redirect_uri}
        hint="Liên hệ Quản trị viên hệ thống để kích hoạt lại trạng thái hoạt động của ứng dụng."
      />
    );
  }

  // Đối chiếu redirect_uri có khớp với danh sách URI đã đăng ký trong bảng apps
  const registeredUris = app.redirect_uris || [];
  const isRedirectAllowed = registeredUris.some((uri) => {
    try {
      const u1 = new URL(uri);
      const u2 = new URL(redirect_uri);
      return u1.origin === u2.origin && u1.pathname === u2.pathname;
    } catch {
      return uri === redirect_uri;
    }
  });

  if (!isRedirectAllowed) {
    return (
      <OAuthErrorView
        title="Redirect URI không được phép"
        desc={`Địa chỉ phản hồi "${redirect_uri}" không khớp với bất kỳ Redirect URI nào đã đăng ký cho ứng dụng "${app.name}".`}
        errorCode="UNAUTHORIZED_REDIRECT_URI"
        appId={targetAppId}
        redirectUri={redirect_uri}
        hint={`Danh sách URI hợp lệ đã cấu hình: ${registeredUris.length > 0 ? registeredUris.join(", ") : "(Chưa có URI nào được cấu hình)"}`}
      />
    );
  }

  // 3. Kiểm tra phiên đăng nhập hiện tại qua Supabase Auth
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  // Nếu CHƯA ĐĂNG NHẬP: Lưu lại toàn bộ query param và chuyển hướng tới form Login
  if (!user) {
    const currentQuery = new URLSearchParams();
    currentQuery.set("app_id", targetAppId);
    currentQuery.set("client_id", targetAppId);
    if (redirect_uri) currentQuery.set("redirect_uri", redirect_uri);
    if (response_type) currentQuery.set("response_type", response_type);
    if (state) currentQuery.set("state", state);
    if (code_challenge) currentQuery.set("code_challenge", code_challenge);
    if (code_challenge_method)
      currentQuery.set("code_challenge_method", code_challenge_method);
    if (scope) currentQuery.set("scope", scope);

    const fullAuthorizeUrl = `/oauth/authorize?${currentQuery.toString()}`;
    redirect(`/login?redirect_url=${encodeURIComponent(fullAuthorizeUrl)}`);
  }

  // Nếu ĐÃ ĐĂNG NHẬP:
  // Tự động bypass consent screen nếu là ứng dụng nội bộ VNTEZ
  if (app.is_internal) {
    const authCode = crypto.randomBytes(32).toString("hex");
    const expiresAt = new Date(Date.now() + 5 * 60 * 1000).toISOString();

    await saveOAuthCode({
      code: authCode,
      client_id: targetAppId,
      user_id: user.id,
      code_challenge: code_challenge || null,
      code_challenge_method: code_challenge_method || "S256",
      redirect_uri,
      expires_at: expiresAt,
    });

    const targetUrl = new URL(redirect_uri);
    targetUrl.searchParams.set("code", authCode);
    if (state) targetUrl.searchParams.set("state", state);
    targetUrl.searchParams.set("app_id", targetAppId);

    redirect(targetUrl.toString());
  }

  // Màn hình chấp thuận cấp quyền (Consent screen) cho các ứng dụng vệ tinh/bên thứ ba
  const meta = user.user_metadata ?? {};
  const mappedUser = {
    id: user.id,
    name: meta.full_name || meta.name || user.email?.split("@")[0] || "User",
    email: user.email ?? "",
    avatar: meta.avatar_url || meta.picture || null,
  };

  return (
    <ConsentScreen
      client={{
        client_id: app.id,
        name: app.name,
        logo_url: app.logo_url || (app as any).avatar_url || null,
        description: app.description,
      }}
      user={mappedUser}
      params={{
        redirect_uri,
        state,
        code_challenge,
        code_challenge_method,
        scope,
      }}
    />
  );
}

export default function AuthorizePage(props: AuthorizePageProps) {
  return (
    <Suspense
      fallback={
        <div className="flex min-h-screen w-full items-center justify-center bg-background">
          <div className="h-8 w-8 animate-spin rounded-full border-2 border-primary border-t-transparent" />
        </div>
      }
    >
      <AuthorizeContent {...props} />
    </Suspense>
  );
}
