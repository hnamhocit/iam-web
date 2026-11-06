"use client";

import React from "react";
import Link from "next/link";
import { buttonVariants } from "@/components/ui/button";
import {
  ShieldCheck,
  ArrowRight,
  Lock,
  Zap,
  CheckCircle2,
} from "lucide-react";

export function LandingHero() {
  return (
    <section className="relative mx-auto max-w-5xl px-6 pt-20 pb-14 text-center">
      {/* Ambient Top Glow */}
      <div className="pointer-events-none absolute -top-24 left-1/2 -translate-x-1/2 h-[350px] w-[600px] rounded-full bg-[#fb291a]/10 blur-[130px] dark:bg-[#fb291a]/15" />

      {/* Subtle Pill Badge */}
      <div className="mb-6 inline-flex items-center gap-2 rounded-full border border-black/[0.06] dark:border-white/[0.08] bg-black/[0.02] dark:bg-white/[0.03] px-4 py-1.5 text-xs font-medium text-slate-600 dark:text-slate-300 backdrop-blur-xs">
        <span className="relative flex size-2">
          <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#fb291a] opacity-75" />
          <span className="relative inline-flex rounded-full size-2 bg-[#fb291a]" />
        </span>
        <span>Nền tảng Định danh Tập trung & SSO OAuth 2.0 PKCE</span>
      </div>

      {/* Main Headline */}
      <h1 className="font-display text-4xl sm:text-6xl lg:text-[4.25rem] font-extrabold tracking-tight text-slate-900 dark:text-white leading-[1.12] max-w-4xl mx-auto">
        <span>Một định danh duy nhất cho</span>{" "}
        <span className="text-[#fb291a]">toàn bộ hệ sinh thái.</span>
      </h1>

      {/* Subtitle */}
      <p className="mx-auto mt-6 max-w-2xl text-base sm:text-lg text-slate-600 dark:text-slate-300 leading-relaxed font-sans">
        Xác thực một chạm bảo mật chuẩn OAuth 2.0 & RFC 7636 PKCE trên hạ tầng phân tán tốc độ cao.
        Kết nối liền mạch toàn bộ ứng dụng Web, Mobile và dịch vụ của bạn chỉ với vài dòng mã.
      </p>

      {/* Action Buttons */}
      <div className="mt-8 flex flex-wrap items-center justify-center gap-4">
        <Link
          href="/developers"
          className={buttonVariants({
            variant: "default",
            size: "xl",
            className: "rounded-full shadow-md hover:shadow-lg gap-2 text-sm sm:text-base font-bold px-7 py-3",
          })}
        >
          <span>Khám phá Developer Hub</span>
          <ArrowRight className="h-4 w-4" />
        </Link>

        <Link
          href="/login"
          className={buttonVariants({
            variant: "outline",
            size: "xl",
            className: "rounded-full text-sm sm:text-base font-semibold px-7 py-3",
          })}
        >
          Đăng nhập tài khoản
        </Link>
      </div>

      {/* Trust Indicators Strip */}
      <div className="mt-14 pt-8 border-t border-black/[0.04] dark:border-white/[0.06] flex flex-wrap items-center justify-center gap-y-3 gap-x-8 text-xs font-medium text-slate-500 dark:text-slate-400 font-sans">
        <div className="flex items-center gap-1.5">
          <ShieldCheck className="h-4 w-4 text-emerald-500" />
          <span>Chuẩn OAuth 2.0 (RFC 6749)</span>
        </div>
        <span className="hidden sm:inline text-slate-300 dark:text-slate-700">•</span>
        <div className="flex items-center gap-1.5">
          <Lock className="h-4 w-4 text-[#fb291a]" />
          <span>Mã hóa PKCE S256 (RFC 7636)</span>
        </div>
        <span className="hidden sm:inline text-slate-300 dark:text-slate-700">•</span>
        <div className="flex items-center gap-1.5">
          <Zap className="h-4 w-4 text-amber-500" />
          <span>High-Performance Edge CDN</span>
        </div>
        <span className="hidden sm:inline text-slate-300 dark:text-slate-700">•</span>
        <div className="flex items-center gap-1.5">
          <CheckCircle2 className="h-4 w-4 text-sky-500" />
          <span>JWT Token RS256 / Ed25519</span>
        </div>
      </div>
    </section>
  );
}
