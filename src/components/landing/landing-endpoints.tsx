"use client";

import { ArrowRight, Code2 } from "lucide-react";
import Link from "next/link";
import { Button } from "@/components/ui/button";

export function LandingEndpoints() {
  const endpoints = [
    {
      step: "01",
      method: "GET",
      methodColor:
        "bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 border-emerald-500/20",
      path: "/oauth/authorize",
      title: "Giao diện Ủy quyền SSO",
      desc: "Chuyển hướng trình duyệt tới cổng xác thực. Hỗ trợ nhận diện qua app_id (hoặc client_id) kèm code_challenge PKCE.",
      params: "app_id, redirect_uri, response_type, code_challenge",
    },
    {
      step: "02",
      method: "POST",
      methodColor: "bg-[#fb291a]/10 text-[#fb291a] border-[#fb291a]/20",
      path: "/oauth/token",
      title: "Trao đổi Authorization Code",
      desc: "Xác thực băm SHA-256 của code_verifier ngay tại Cloudflare Edge và cấp phát Access Token JWT cùng thời hạn hiệu lực.",
      params: "grant_type, code, app_id, code_verifier, redirect_uri",
    },
    {
      step: "03",
      method: "GET",
      methodColor:
        "bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 border-emerald-500/20",
      path: "/oauth/userinfo",
      title: "Truy vấn Hồ sơ & Quyền hạn",
      desc: "Gửi kèm Header Authorization: Bearer <token> và X-App-Id để nhận hồ sơ OIDC cùng Role và ma trận quyền hạn tương ứng.",
      params: "Authorization: Bearer <token>, X-App-Id",
    },
    {
      step: "04",
      method: "GET",
      methodColor:
        "bg-sky-500/10 text-sky-600 dark:text-sky-400 border-sky-500/20",
      path: "/oauth/logout",
      title: "Đăng xuất Tập trung (OIDC)",
      desc: "Đăng xuất RP-Initiated đồng bộ. Tự động thanh lọc toàn bộ cookie và token phiên làm việc, chuyển hướng về redirect_url an toàn.",
      params: "post_logout_redirect_uri, redirect_url",
    },
  ];

  return (
    <section
      id="endpoints"
      className="relative w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 border-t border-border/50"
    >
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-10">
        <div className="space-y-2 max-w-2xl">
          <h2 className="font-display text-3xl sm:text-4xl font-extrabold tracking-tight text-[#1C1917] dark:text-white">
            4 Endpoints Chuẩn REST Kết nối Độc lập
          </h2>
          <p className="text-sm sm:text-base text-[#57534E] dark:text-stone-300 leading-relaxed">
            Tuân thủ hoàn toàn đặc tả OAuth 2.0 (RFC 6749) và OpenID Connect
            Core. Tương thích ngay với mọi thư viện HTTP tiêu chuẩn.
          </p>
        </div>

        <Button
          variant="outline"
          size="sm"
          asChild
          className="rounded-xl h-9 px-4 text-xs font-medium shrink-0 gap-2 border-stone-200 dark:border-stone-800 bg-white dark:bg-card hover:bg-stone-50 text-[#1C1917] dark:text-stone-100 shadow-[0_1px_2px_rgba(28,25,23,0.03)] cursor-pointer"
        >
          <Link href="/developers">
            <Code2 className="h-3.5 w-3.5 text-primary" />
            <span>Xem thông số đầy đủ (Spec)</span>
            <ArrowRight className="h-3 w-3" />
          </Link>
        </Button>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
        {endpoints.map((ep) => (
          <div
            key={ep.path}
            className="group relative rounded-2xl border border-[#E7E5E4] dark:border-stone-800 bg-white dark:bg-card p-5 shadow-[0_2px_12px_rgba(28,25,23,0.04)] dark:shadow-none transition-all flex flex-col justify-between space-y-4"
          >
            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <span
                  className={`rounded-lg border px-2.5 py-0.5 font-mono text-xs font-bold ${ep.methodColor}`}
                >
                  {ep.method}
                </span>
                <span className="font-mono text-xs text-[#78716C] dark:text-stone-400 font-semibold">
                  Bước {ep.step}
                </span>
              </div>

              <div>
                <h4 className="font-mono text-sm font-bold text-[#1C1917] dark:text-stone-100 group-hover:text-primary transition-colors">
                  {ep.path}
                </h4>
                <p className="text-xs font-semibold text-[#1C1917]/90 dark:text-stone-200 mt-1">
                  {ep.title}
                </p>
              </div>

              <p className="text-xs text-[#57534E] dark:text-stone-400 leading-relaxed font-sans">
                {ep.desc}
              </p>
            </div>

            <div className="pt-3 border-t border-border/40 font-mono text-[10px] text-muted-foreground/80 truncate">
              <span className="text-foreground/70 font-semibold block mb-0.5">
                Tham số chính:
              </span>
              <span className="text-muted-foreground truncate block">
                {ep.params}
              </span>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
