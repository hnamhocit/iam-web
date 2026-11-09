"use client";

import React from "react";
import Link from "next/link";
import { LogOut } from "lucide-react";
import { ModeToggle } from "@/components/ThemeToggle";
import { buttonVariants } from "@/components/ui/button";
import { VntezLogo } from "@/components/ui/vntez-logo";

interface LandingHeaderProps {
  user?: {
    id: string;
    email: string;
    name: string;
    avatar: string | null;
  } | null;
}

export function LandingHeader({ user }: LandingHeaderProps = {}) {
  return (
    <header className="sticky top-0 z-40 bg-white/85 dark:bg-[#080c14]/85 backdrop-blur-md border-b border-black/[0.04] dark:border-white/[0.04] transition-all">
      <div className="mx-auto flex w-full max-w-[1700px] items-center justify-between px-4 sm:px-8 lg:px-12 xl:px-16 py-3.5">
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
        <div className="flex items-center gap-2 sm:gap-3">
          {user ? (
            <div className="flex items-center gap-2">
              <Link
                href="https://vntez-console.vercel.app"
                className={buttonVariants({
                  variant: "outline",
                  size: "sm",
                  className:
                    "hidden sm:inline-flex items-center gap-2 font-semibold shadow-xs px-3.5 rounded-full border-border/80 hover:bg-secondary/60",
                })}
              >
                {user.avatar ? (
                  // eslint-disable-next-line @next/next/no-img-element
                  <img
                    src={user.avatar}
                    alt={user.name}
                    className="h-4 w-4 rounded-full object-cover"
                  />
                ) : (
                  <div className="h-4 w-4 rounded-full bg-[#fb291a]/15 text-[#fb291a] text-[10px] font-bold flex items-center justify-center">
                    {user.name.charAt(0).toUpperCase()}
                  </div>
                )}
                <span className="max-w-[120px] truncate text-xs">{user.name}</span>
              </Link>
              <a
                href="/auth/logout"
                className={buttonVariants({
                  variant: "ghost",
                  size: "sm",
                  className:
                    "gap-1.5 text-xs text-muted-foreground hover:text-destructive h-8 px-2.5 rounded-full",
                })}
                title="Đăng xuất khỏi IAM"
              >
                <LogOut className="h-3.5 w-3.5" />
                <span className="hidden md:inline">Đăng xuất</span>
              </a>
            </div>
          ) : (
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
          )}
          <ModeToggle />
        </div>
      </div>
    </header>
  );
}
