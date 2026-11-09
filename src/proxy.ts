import { createServerClient } from "@supabase/ssr";
import { NextResponse, type NextRequest } from "next/server";
import { cookieDomain, normalizeSupabaseUrl } from "@/lib/supabase/domains";
import { safeReturnTo } from "@/lib/redirect";

// Các route công khai không bị chặn redirect về /login
const PUBLIC_PREFIXES = [
  "/login",
  "/terms",
  "/privacy",
  "/oauth/token",
  "/oauth/userinfo",
  "/oauth/tester",
  "/developers",
  "/.well-known",
  "/auth/callback",
  "/auth/logout",
  "/oauth/logout",
  "/logout",
];

export async function proxy(request: NextRequest) {
  let response = NextResponse.next({ request });

  const supabaseUrl = normalizeSupabaseUrl(process.env.NEXT_PUBLIC_SUPABASE_URL);
  const supabaseKey =
    process.env.NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY ||
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY ||
    "";

  const host =
    request.headers.get("x-forwarded-host") ||
    request.headers.get("host") ||
    request.nextUrl.hostname;

  const supabase = createServerClient(
    supabaseUrl || "https://placeholder.supabase.co",
    supabaseKey || "placeholder-anon-key",
    {
      cookieOptions: {
        domain: cookieDomain(host),
        sameSite: "lax",
        secure: process.env.NODE_ENV === "production",
      },
      cookies: {
        getAll: () => request.cookies.getAll(),
        setAll: (c) => {
          c.forEach(({ name, value }) => {
            request.cookies.set(name, value);
          });
          response = NextResponse.next({ request });
          c.forEach(({ name, value, options }) => {
            response.cookies.set(name, value, options);
          });
        },
      },
    },
  );

  const {
    data: { user },
  } = await supabase.auth.getUser();

  const { pathname, search } = request.nextUrl;

  // Cho phép /oauth/authorize tự xử lý redirect kèm nguyên vẹn search params
  if (pathname === "/oauth/authorize") {
    return response;
  }

  const isPublic =
    pathname === "/" ||
    PUBLIC_PREFIXES.some(
      (prefix) => pathname === prefix || pathname.startsWith(prefix + "/"),
    );

  // (A) Chưa login vào route protected -> chuyển hướng đến /login
  if (!isPublic && !user) {
    const url = request.nextUrl.clone();
    url.pathname = "/login";
    url.searchParams.set("redirect_url", pathname + (search ?? ""));
    return NextResponse.redirect(url);
  }

  // (B) Đã login mà còn đứng ở /login:
  if (pathname === "/login" && user) {
    const returnTo = safeReturnTo(
      request.nextUrl.searchParams.get("redirect_url"),
    );
    if (returnTo) {
      const destination = returnTo.startsWith("/")
        ? new URL(returnTo, request.url).toString()
        : returnTo;
      return NextResponse.redirect(destination);
    }
    return NextResponse.redirect("https://vntez.vercel.app");
  }

  return response;
}

export const config = {
  matcher: [
    "/((?!_next/static|_next/image|favicon.ico|logo.svg|auth/callback|.*\\.(?:svg|png|jpg|jpeg|gif|webp|ico)$).*)",
  ],
};
