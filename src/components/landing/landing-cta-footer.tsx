import React from "react";
import Link from "next/link";
import { buttonVariants } from "@/components/ui/button";
import { VntezLogo } from "@/components/ui/vntez-logo";
import { ArrowRight } from "lucide-react";

export function LandingCtaFooter() {
  return (
    <>
      {/* 6. PRE-FOOTER CTA SECTION */}
      <section className="mx-auto max-w-4xl px-6 py-24 sm:py-28 text-center">
        <h2 className="font-display text-3xl sm:text-4xl lg:text-5xl font-extrabold tracking-tight text-slate-900 dark:text-white leading-tight">
          Sẵn sàng kết nối ứng dụng với VNTEZ IAM?
        </h2>
        <p className="mt-4 text-base sm:text-lg text-slate-600 dark:text-slate-300 leading-relaxed font-sans max-w-2xl mx-auto">
          Tạo tài khoản OAuth Client, cấu hình Redirect URI và bắt đầu xác thực người dùng trong hệ sinh thái VNTEZ trong chưa đầy 5 phút.
        </p>
        <div className="mt-8 flex flex-col sm:flex-row items-center justify-center gap-4">
          <Link
            href="/developers"
            className={buttonVariants({
              variant: "default",
              size: "lg",
              className: "w-full sm:w-auto rounded-full px-8 py-3.5 text-base font-bold shadow-md gap-2",
            })}
          >
            <span>Vào Developer Hub</span>
            <ArrowRight className="h-4 w-4" />
          </Link>
          <Link
            href="/login"
            className={buttonVariants({
              variant: "outline",
              size: "lg",
              className: "w-full sm:w-auto rounded-full px-8 py-3.5 text-base font-semibold gap-2",
            })}
          >
            Đăng nhập tài khoản
          </Link>
        </div>
      </section>

      {/* 7. FOOTER */}
      <footer className="bg-slate-50/70 dark:bg-[#060a10] py-16 text-slate-600 dark:text-slate-400 border-t border-black/[0.04] dark:border-white/[0.04] transition-colors">
        <div className="w-full max-w-[1700px] mx-auto px-4 sm:px-8 lg:px-12 xl:px-16">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-10">
            {/* Col 1: Brand & Status */}
            <div className="space-y-4">
              <Link href="/" className="flex items-center gap-2.5 group w-fit">
                <VntezLogo size={26} />
                <span className="font-display text-xl font-bold text-slate-900 dark:text-white tracking-tight group-hover:text-[#fb291a] transition-colors">
                  vntez <span className="text-[#fb291a] font-mono text-sm ml-0.5">iam</span>
                </span>
              </Link>

              <p className="text-slate-600 dark:text-slate-400 max-w-xs leading-relaxed font-sans text-sm">
                Nền tảng định danh trung tâm và xác thực bảo mật OAuth 2.0 PKCE cho hệ sinh thái công nghệ VNTEZ.
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
              <h4 className="font-display text-sm font-bold text-slate-900 dark:text-white">
                Developers
              </h4>
              <ul className="space-y-2 text-sm text-slate-600 dark:text-slate-400">
                <li>
                  <Link href="/developers" className="hover:text-[#fb291a] transition-colors">
                    Developer Hub
                  </Link>
                </li>
                <li>
                  <a href="#endpoints" className="hover:text-[#fb291a] transition-colors">
                    REST API Endpoints
                  </a>
                </li>
                <li>
                  <a
                    href="/.well-known/openid-configuration"
                    target="_blank"
                    rel="noreferrer"
                    className="hover:text-[#fb291a] transition-colors"
                  >
                    OpenID Configuration
                  </a>
                </li>
              </ul>
            </div>

            {/* Col 3: Ecosystem */}
            <div className="space-y-3">
              <h4 className="font-display text-sm font-bold text-slate-900 dark:text-white">
                Hệ sinh thái VNTEZ
              </h4>
              <ul className="space-y-2 text-sm text-slate-600 dark:text-slate-400">
                <li>
                  <a
                    href="https://vntez.net"
                    target="_blank"
                    rel="noreferrer"
                    className="hover:text-[#fb291a] transition-colors"
                  >
                    VNTEZ Platform
                  </a>
                </li>
                <li>
                  <a
                    href="https://vntez.net/products#storage"
                    target="_blank"
                    rel="noreferrer"
                    className="hover:text-[#fb291a] transition-colors"
                  >
                    Edge S3 Storage
                  </a>
                </li>
                <li>
                  <a
                    href="https://vntez.net/products#bman-pos"
                    target="_blank"
                    rel="noreferrer"
                    className="hover:text-[#fb291a] transition-colors"
                  >
                    BMAN POS Core
                  </a>
                </li>
              </ul>
            </div>

            {/* Col 4: Legal */}
            <div className="space-y-3">
              <h4 className="font-display text-sm font-bold text-slate-900 dark:text-white">
                Chính sách & Pháp lý
              </h4>
              <ul className="space-y-2 text-sm text-slate-600 dark:text-slate-400">
                <li>
                  <Link href="/terms" className="hover:text-[#fb291a] transition-colors">
                    Điều khoản sử dụng
                  </Link>
                </li>
                <li>
                  <Link href="/privacy" className="hover:text-[#fb291a] transition-colors">
                    Chính sách bảo mật
                  </Link>
                </li>
                <li>
                  <a
                    href="https://github.com/hnamhocit"
                    target="_blank"
                    rel="noreferrer"
                    className="hover:text-[#fb291a] transition-colors"
                  >
                    GitHub @hnamhocit
                  </a>
                </li>
              </ul>
            </div>
          </div>

          <div className="mt-12 pt-6 border-t border-black/[0.04] dark:border-white/[0.04] flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-slate-500">
            <p>© {new Date().getFullYear()} VNTEZ LABS — Single Sign-On Platform</p>
            <p>Hạ tầng định danh phân tán tốc độ cao</p>
          </div>
        </div>
      </footer>
    </>
  );
}
