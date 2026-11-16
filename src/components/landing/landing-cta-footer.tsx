"use client";

import { ArrowRight, ExternalLink } from "lucide-react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { VntezLogo } from "@/components/ui/vntez-logo";

export function LandingCtaFooter() {
  return (
    <>
      {/* 6. PRE-FOOTER CTA SECTION */}
      <section className="relative mx-auto max-w-5xl px-4 sm:px-6 lg:px-8 py-20 sm:py-28 text-center overflow-hidden">
        {/* Ambient Glow (Dark Mode Only) */}
        <div className="pointer-events-none absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 h-[350px] w-[550px] rounded-full bg-primary/15 blur-[140px] hidden dark:block" />

        <div className="relative z-10 rounded-2xl border border-[#E7E5E4] dark:border-stone-800 bg-white dark:bg-card p-8 sm:p-12 shadow-[0_2px_12px_rgba(28,25,23,0.04)] dark:shadow-none space-y-6">
          <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-xl bg-primary/10 text-primary">
            <VntezLogo size={28} />
          </div>

          <div className="space-y-3 max-w-2xl mx-auto">
            <h2 className="font-display text-3xl sm:text-4xl lg:text-5xl font-extrabold tracking-tight text-[#1C1917] dark:text-white leading-tight">
              Sẵn sàng kết nối ứng dụng với VNTEZ IAM?
            </h2>
            <p className="text-sm sm:text-base text-[#57534E] dark:text-stone-300 leading-relaxed font-sans">
              Đăng ký ứng dụng trong cổng quản trị, cấu hình Redirect URI và
              hoàn tất kết nối Single Sign-On chuẩn quốc tế trong chưa đầy 5
              phút.
            </p>
          </div>

          <div className="pt-2 flex flex-col sm:flex-row items-center justify-center gap-3">
            <Button
              size="lg"
              asChild
              className="w-full sm:w-auto rounded-xl px-6 h-11 text-sm sm:text-base font-bold gap-2 bg-[#F03E2F] hover:bg-[#D93224] text-white shadow-[0_4px_14px_rgba(240,62,47,0.22)] border-0 cursor-pointer"
            >
              <Link href="/developers">
                <span>Vào Developer Hub</span>
                <ArrowRight className="h-4 w-4" />
              </Link>
            </Button>
            <Button
              variant="outline"
              size="lg"
              asChild
              className="w-full sm:w-auto rounded-xl px-6 h-11 text-sm sm:text-base font-medium gap-2 border-stone-200 dark:border-stone-800 bg-white dark:bg-card hover:bg-stone-50 dark:hover:bg-stone-800/50 text-[#1C1917] dark:text-stone-100 shadow-[0_1px_2px_rgba(28,25,23,0.03)] cursor-pointer"
            >
              <Link href="/login">
                <span>Đăng nhập</span>
                <ArrowRight className="h-4 w-4" />
              </Link>
            </Button>
          </div>
        </div>
      </section>

      {/* 7. FOOTER */}
      <footer className="border-t border-border/60 bg-muted/20 py-16 text-muted-foreground transition-colors">
        <div className="w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-10">
            {/* Col 1: Brand & Status */}
            <div className="space-y-4">
              <Link href="/" className="flex items-center gap-2.5 group w-fit">
                <VntezLogo size={28} />
                <div className="flex items-center gap-1.5 font-bold tracking-tight">
                  <span className="text-lg text-[#F03E2F] group-hover:opacity-90 transition-opacity">
                    VNTEZ
                  </span>
                  <span className="rounded-md border border-primary/30 bg-primary/10 px-1.5 py-0.2 text-[10px] font-mono font-bold text-primary">
                    IAM
                  </span>
                </div>
              </Link>

              <p className="text-muted-foreground max-w-xs leading-relaxed font-sans text-xs">
                Nền tảng định danh trung tâm và xác thực bảo mật OAuth 2.0 PKCE
                cho hệ sinh thái công nghệ VNTEZ.
              </p>

              <div className="inline-flex items-center gap-2 rounded-full border border-emerald-500/30 bg-emerald-500/10 px-3 py-1 text-xs font-mono font-medium text-emerald-600 dark:text-emerald-400">
                <span className="relative flex size-2">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75" />
                  <span className="relative inline-flex rounded-full size-2 bg-emerald-500" />
                </span>
                <span>All systems operational</span>
              </div>
            </div>

            {/* Col 2: Developers */}
            <div className="space-y-3">
              <h4 className="font-display text-sm font-bold text-foreground">
                Lập trình viên
              </h4>
              <ul className="space-y-2 text-xs text-muted-foreground">
                <li>
                  <Link
                    href="/developers"
                    className="hover:text-primary transition-colors flex items-center gap-1"
                  >
                    <span>Developer Hub</span>
                    <ArrowRight className="h-3 w-3 opacity-60" />
                  </Link>
                </li>
                <li>
                  <a
                    href="#endpoints"
                    className="hover:text-primary transition-colors"
                  >
                    REST API Endpoints
                  </a>
                </li>
                <li>
                  <a
                    href="/.well-known/openid-configuration"
                    target="_blank"
                    rel="noreferrer"
                    className="hover:text-primary transition-colors flex items-center gap-1"
                  >
                    <span>OpenID Configuration</span>
                    <ExternalLink className="h-3 w-3 opacity-60" />
                  </a>
                </li>
              </ul>
            </div>

            {/* Col 3: Ecosystem */}
            <div className="space-y-3">
              <h4 className="font-display text-sm font-bold text-foreground">
                Hệ sinh thái VNTEZ
              </h4>
              <ul className="space-y-2 text-xs text-muted-foreground">
                <li>
                  <a
                    href="https://vntez.com"
                    target="_blank"
                    rel="noreferrer"
                    className="hover:text-primary transition-colors"
                  >
                    VNTEZ Portal
                  </a>
                </li>
                <li>
                  <a
                    href="https://console.vntez.com"
                    target="_blank"
                    rel="noreferrer"
                    className="hover:text-primary transition-colors"
                  >
                    VNTEZ Console
                  </a>
                </li>
                <li>
                  <span className="text-muted-foreground/80">
                    SoloType (Typing Engine)
                  </span>
                </li>
                <li>
                  <span className="text-muted-foreground/80">
                    Workers Hub (Telemetry)
                  </span>
                </li>
              </ul>
            </div>

            {/* Col 4: Pháp lý & An toàn */}
            <div className="space-y-3">
              <h4 className="font-display text-sm font-bold text-foreground">
                Pháp lý & An toàn
              </h4>
              <ul className="space-y-2 text-xs text-muted-foreground">
                <li>
                  <Link
                    href="/terms"
                    className="hover:text-primary transition-colors"
                  >
                    Điều khoản sử dụng
                  </Link>
                </li>
                <li>
                  <Link
                    href="/privacy"
                    className="hover:text-primary transition-colors"
                  >
                    Chính sách bảo mật
                  </Link>
                </li>
                <li>
                  <span className="text-muted-foreground/80">
                    Chuẩn RFC 7636 PKCE S256
                  </span>
                </li>
                <li>
                  <span className="text-muted-foreground/80">
                    Chuẩn OpenID Connect Core
                  </span>
                </li>
              </ul>
            </div>
          </div>

          <div className="mt-12 pt-6 border-t border-border/40 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-muted-foreground">
            <p>
              © {new Date().getFullYear()} VNTEZ Identity & Access Management.
              Mọi quyền được bảo lưu.
            </p>
            <p className="font-mono text-[11px] text-muted-foreground/80">
              Secured by Cloudflare Workers & Supabase Auth
            </p>
          </div>
        </div>
      </footer>
    </>
  );
}
