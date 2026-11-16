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
        {/* Ambient Glow */}
        <div className="pointer-events-none absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 h-[350px] w-[550px] rounded-full bg-primary/10 dark:bg-primary/15 blur-[140px]" />

        <div className="relative z-10 rounded-3xl border border-border/80 bg-card/75 dark:bg-card/50 p-8 sm:p-14 shadow-2xl backdrop-blur-2xl space-y-6">
          <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-2xl bg-primary/10 text-primary ring-8 ring-primary/5 shadow-xs">
            <VntezLogo size={32} />
          </div>

          <div className="space-y-3 max-w-2xl mx-auto">
            <h2 className="font-display text-3xl sm:text-4xl lg:text-5xl font-extrabold tracking-tight text-foreground leading-tight">
              Sẵn sàng kết nối ứng dụng với VNTEZ IAM?
            </h2>
            <p className="text-sm sm:text-base text-muted-foreground leading-relaxed font-sans">
              Đăng ký ứng dụng trong cổng quản trị, cấu hình Redirect URI và
              hoàn tất kết nối Single Sign-On chuẩn quốc tế trong chưa đầy 5
              phút.
            </p>
          </div>

          <div className="pt-2 flex flex-col sm:flex-row items-center justify-center gap-3.5">
            <Button
              size="lg"
              asChild
              className="w-full sm:w-auto rounded-2xl px-7 h-12 text-sm sm:text-base font-bold shadow-lg shadow-primary/20 gap-2"
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
              className="w-full sm:w-auto rounded-2xl px-7 h-12 text-sm sm:text-base font-semibold gap-2 border-border/80 bg-background/50 hover:bg-background/80"
            >
              <Link href="/login">
                <span>Đăng nhập tài khoản</span>
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
                  <span className="text-lg bg-gradient-to-r from-[#ff7a50] via-[#fb291a] to-[#e3062a] bg-clip-text text-transparent group-hover:opacity-90 transition-opacity">
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
                  <Link
                    href="/oauth/tester/callback"
                    className="hover:text-primary transition-colors"
                  >
                    OAuth 2.0 Tester
                  </Link>
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
