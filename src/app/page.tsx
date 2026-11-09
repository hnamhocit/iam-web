import type { Metadata } from "next";
import { connection } from "next/server";
import { redirect } from "next/navigation";
import { createClient } from "@/lib/supabase/server";
import { safeReturnTo } from "@/lib/redirect";

export const metadata: Metadata = {
  title: "VNTEZ IAM — Unified Identity & OAuth 2.0 SSO",
  description:
    "Cổng xác thực định danh và phân quyền tập trung OAuth 2.0 PKCE cho toàn bộ hệ sinh thái VNTEZ.",
  alternates: {
    canonical: "/",
  },
  openGraph: {
    title: "VNTEZ IAM — Unified Identity & OAuth 2.0 SSO",
    description:
      "Cổng xác thực định danh và phân quyền tập trung OAuth 2.0 PKCE cho toàn bộ hệ sinh thái VNTEZ.",
    url: "/",
  },
  twitter: {
    card: "summary_large_image",
    title: "VNTEZ IAM — Unified Identity & OAuth 2.0 SSO",
    description:
      "Cổng xác thực định danh và phân quyền tập trung OAuth 2.0 PKCE cho toàn bộ hệ sinh thái VNTEZ.",
  },
};

export default async function HomePage({
  searchParams,
}: {
  searchParams: Promise<{ redirect_url?: string }>;
}) {
  await connection();
  const params = await searchParams;
  const returnTo = safeReturnTo(params.redirect_url);

  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  // Đã đăng nhập: nếu có returnTo thì chuyển tiếp, nếu không có thì trả về VNTEZ Portal
  if (user) {
    if (returnTo) {
      redirect(returnTo);
    }
    redirect("https://vntez.vercel.app");
  }

  // Chưa đăng nhập: chuyển hướng vào trang Login chuyên dụng
  if (returnTo) {
    redirect(`/login?redirect_url=${encodeURIComponent(returnTo)}`);
  }

  redirect("/login");
}
