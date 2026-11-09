"use client";

import React from "react";
import Link from "next/link";
import { ModeToggle } from "@/components/ThemeToggle";
import { buttonVariants } from "@/components/ui/button";
import { VntezLogo } from "@/components/ui/vntez-logo";

export function LandingHeader() {
  return (
    <header className="sticky top-0 z-40 bg-white/85 dark:bg-[#080c14]/85 backdrop-blur-md border-b border-black/[0.04] dark:border-white/[0.04] transition-all">
      <div className="mx-auto flex max-w-6xl items-center justify-between px-6 py-3.5">
        {/* Brand */}
        <Link href="/" className="flex items-center gap-2.5 group">
          <VntezLogo size={28} />
          <span className="font-display text-xl font-bold tracking-tight text-slate-900 dark:text-white group-hover:text-[#fb291a] transition-colors">
            vntez <span className="text-[#fb291a] font-mono text-sm ml-0.5">iam</span>
          </span>
        </Link>

        {/* Desktop Navigation */}
        <nav className="hidden md:flex items-center gap-7 text-sm font-medium">
          <Link
            href="/developers"
            className="text-slate-600 dark:text-slate-300 hover:text-slate-900 dark:hover:text-white transition-colors"
          >
            Tài liệu Developers
          </Link>
          <a
            href="#endpoints"
            className="text-slate-600 dark:text-slate-300 hover:text-slate-900 dark:hover:text-white transition-colors"
          >
            Endpoints REST
          </a>
          <Link
            href="/terms"
            className="text-slate-600 dark:text-slate-300 hover:text-slate-900 dark:hover:text-white transition-colors"
          >
            Điều khoản
          </Link>
          <Link
            href="/privacy"
            className="text-slate-600 dark:text-slate-300 hover:text-slate-900 dark:hover:text-white transition-colors"
          >
            Bảo mật
          </Link>
        </nav>

        {/* Action Buttons & Theme Toggle */}
        <div className="flex items-center gap-3">
          <Link
            href="/login"
            className={buttonVariants({
              variant: "default",
              size: "sm",
              className: "hidden sm:inline-flex font-semibold shadow-xs px-5 rounded-full",
            })}
          >
            Đăng nhập
          </Link>
          <ModeToggle />
        </div>
      </div>
    </header>
  );
}
