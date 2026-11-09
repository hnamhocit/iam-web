import type { Metadata } from "next";
import { connection } from "next/server";
import { Suspense } from "react";
import { LandingPage } from "@/components/landing-page";
import { createClient } from "@/lib/supabase/server";

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

async function HomeContent() {
  await connection();
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  let mappedUser = null;
  if (user) {
    const meta = user.user_metadata ?? {};
    mappedUser = {
      id: user.id,
      name: meta.full_name || meta.name || user.email?.split("@")[0] || "User",
      email: user.email ?? "",
      avatar: meta.avatar_url || meta.picture || null,
    };
  }

  // Luôn hiển thị LandingPage / tài liệu cho người dùng dù đã đăng nhập hay chưa (không tự ý redirect)
  return <LandingPage user={mappedUser} />;
}

export default function HomePage() {
  return (
    <Suspense
      fallback={
        <div className="flex h-screen w-full items-center justify-center bg-background">
          <div className="h-8 w-8 animate-spin rounded-full border-2 border-primary border-t-transparent" />
        </div>
      }
    >
      <HomeContent />
    </Suspense>
  );
}
