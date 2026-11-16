"use client";

import { ArrowRight, Code2, LogOut } from "lucide-react";
import Link from "next/link";
import { ModeToggle } from "@/components/ThemeToggle";
import { Button, buttonVariants } from "@/components/ui/button";
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
    <div className="sticky top-3 z-50 mx-auto w-[94%] max-w-7xl">
      <header className="rounded-2xl border border-border/70 bg-background/80 dark:bg-card/70 backdrop-blur-xl shadow-lg shadow-black/[0.04] dark:shadow-black/20 transition-all duration-300">
        <div className="flex items-center justify-between px-4 sm:px-6 py-2.5 sm:py-3">
          {/* Brand */}
          <Link href="/" className="flex items-center gap-2.5 group">
            <VntezLogo size={28} />
            <div className="flex items-center gap-1.5 font-bold tracking-tight">
              <span className="text-base sm:text-lg text-[#F03E2F] transition-opacity group-hover:opacity-90">
                VNTEZ
              </span>
              <span className="rounded-md border border-primary/30 bg-primary/10 px-1.5 py-0.2 text-[11px] font-mono font-bold text-primary">
                IAM
              </span>
            </div>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center gap-6 text-xs sm:text-sm font-medium text-muted-foreground">
            <Link
              href="/developers"
              className="hover:text-foreground transition-colors flex items-center gap-1.5"
            >
              <Code2 className="h-3.5 w-3.5 text-primary" />
              <span>Developers & API</span>
            </Link>
            <a
              href="#endpoints"
              className="hover:text-foreground transition-colors"
            >
              REST Endpoints
            </a>
            <a
              href="#features"
              className="hover:text-foreground transition-colors"
            >
              Hệ sinh thái
            </a>
            <Link
              href="/terms"
              className="hover:text-foreground transition-colors"
            >
              Điều khoản
            </Link>
            <Link
              href="/privacy"
              className="hover:text-foreground transition-colors"
            >
              Bảo mật
            </Link>
          </nav>

          {/* Action Buttons & Theme Toggle */}
          <div className="flex items-center gap-2 sm:gap-2.5">
            {user ? (
              <div className="flex items-center gap-2">
                <Link
                  href="https://vntez-console.vercel.app"
                  className={buttonVariants({
                    variant: "outline",
                    size: "sm",
                    className:
                      "hidden sm:inline-flex items-center gap-2 text-xs font-semibold shadow-xs px-3.5 h-8 rounded-xl border-border/80 hover:bg-secondary/60",
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
                    <div className="h-4 w-4 rounded-full bg-primary/15 text-primary text-[10px] font-bold flex items-center justify-center">
                      {user.name.charAt(0).toUpperCase()}
                    </div>
                  )}
                  <span className="max-w-[110px] truncate text-xs">
                    {user.name}
                  </span>
                </Link>
                <a
                  href="/auth/logout"
                  className={buttonVariants({
                    variant: "ghost",
                    size: "sm",
                    className:
                      "gap-1.5 text-xs text-muted-foreground hover:text-destructive h-8 px-2.5 rounded-xl",
                  })}
                  title="Đăng xuất khỏi IAM"
                >
                  <LogOut className="h-3.5 w-3.5" />
                  <span className="hidden md:inline">Đăng xuất</span>
                </a>
              </div>
            ) : (
              <Button
                size="sm"
                asChild
                className="rounded-xl h-8 px-3.5 text-xs font-semibold bg-[#F03E2F] hover:bg-[#D93224] text-white shadow-[0_4px_14px_rgba(240,62,47,0.22)] border-0 gap-1.5 cursor-pointer"
              >
                <Link href="/login">
                  <span>Đăng nhập</span>
                  <ArrowRight className="h-3 w-3" />
                </Link>
              </Button>
            )}

            <div className="h-4 w-[1px] bg-border/60 mx-0.5" />
            <ModeToggle />
          </div>
        </div>
      </header>
    </div>
  );
}
