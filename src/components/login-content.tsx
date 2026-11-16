"use client";

import { Code2, Home, ShieldCheck } from "lucide-react";
import Link from "next/link";
import { useEffect, useState } from "react";
import {
  FacebookIcon,
  GithubIcon,
  GoogleIcon,
} from "@/components/icons/oauth-icons";
import { SocialButton } from "@/components/social-button";
import { ModeToggle } from "@/components/ThemeToggle";
import { Button } from "@/components/ui/button";
import { VntezLogo } from "@/components/ui/vntez-logo";
import { useAuthStore } from "@/stores/auth.store";

export function LoginContent() {
  const { error, clearError } = useAuthStore();
  const [isOAuthLogin, setIsOAuthLogin] = useState(false);
  const [urlError, setUrlError] = useState<string | null>(null);

  useEffect(() => {
    if (typeof window !== "undefined") {
      const params = new URLSearchParams(window.location.search);
      const redirectUrl = params.get("redirect_url");
      if (redirectUrl?.includes("/oauth/authorize")) {
        setIsOAuthLogin(true);
      }

      const err = params.get("error");
      const errDesc = params.get("error_description");
      if (err) {
        console.error("[Login Auth Error]", {
          error: err,
          description: errDesc,
        });
        if (errDesc) {
          setUrlError(`${err}: ${errDesc}`);
        } else if (err === "auth_failed") {
          setUrlError(
            "Xác thực thất bại (auth_failed): Không thể đổi mã phiên làm việc. Vui lòng thử lại.",
          );
        } else {
          setUrlError(`Lỗi xác thực: ${err}`);
        }
      }
    }
  }, []);

  return (
    <div className="relative min-h-screen w-full flex flex-col justify-between bg-background text-foreground overflow-hidden">
      {/* Background Subtle Warm Stone Dot Grid with Smooth Radial Fade */}
      <div
        className="pointer-events-none absolute inset-0 text-[#D6D3D1] opacity-45 dark:text-foreground dark:opacity-[0.14] [mask-image:radial-gradient(ellipse_at_top,black_40%,transparent_75%)]"
        style={{
          backgroundImage: "radial-gradient(currentColor 1.25px, transparent 1.25px)",
          backgroundSize: "28px 28px",
        }}
      />

      {/* Ambient Glow (Dark Mode Only) */}
      <div className="pointer-events-none absolute -top-32 left-1/2 -translate-x-1/2 h-[400px] w-[600px] rounded-full bg-[#fb291a]/15 blur-[140px] hidden dark:block" />

      {/* 1. UNIFIED TOP HEADER BAR */}
      <header className="relative z-20 w-full border-b border-border/40 bg-background/60 backdrop-blur-md">
        <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-8">
          <Link
            href="/"
            className="flex items-center gap-2.5 transition-opacity hover:opacity-90"
          >
            <VntezLogo size={28} />
            <div className="flex items-center gap-1.5 font-bold tracking-tight">
              <span className="text-lg text-[#F03E2F]">
                VNTEZ
              </span>
              <span className="text-sm font-semibold text-foreground/80">
                IAM
              </span>
            </div>
          </Link>

          <div className="flex items-center gap-2 sm:gap-3">
            <Button
              variant="ghost"
              size="sm"
              asChild
              className="text-xs h-8 gap-1.5 text-muted-foreground hover:text-foreground"
            >
              <Link href="/">
                <Home className="h-3.5 w-3.5" />
                <span>Trang chủ</span>
              </Link>
            </Button>
            <Button
              variant="ghost"
              size="sm"
              asChild
              className="text-xs h-8 gap-1.5 text-muted-foreground hover:text-foreground"
            >
              <Link href="/developers">
                <Code2 className="h-3.5 w-3.5 text-primary" />
                <span className="hidden sm:inline">Developers & API</span>
              </Link>
            </Button>
            <div className="h-4 w-[1px] bg-border mx-0.5" />
            <ModeToggle />
          </div>
        </div>
      </header>

      {/* 2. MAIN CONTENT AREA (Centered & Proportionally Balanced) */}
      <main className="relative z-10 flex flex-1 flex-col items-center justify-center px-4 py-12 sm:px-6 sm:py-16">
        <div className="w-full max-w-[400px] space-y-6">
          {/* Headline & Warm Human Copy */}
          <div className="space-y-2 text-center">
            <h1 className="font-display text-3xl sm:text-4xl font-extrabold tracking-tight text-[#1C1917] dark:text-stone-100">
              Who <span className="text-[#F03E2F]">I-Am</span>
              <span className="text-[#1C1917] dark:text-stone-100">?</span>
            </h1>
            <p className="text-sm text-[#57534E] dark:text-stone-300 leading-relaxed font-sans max-w-sm mx-auto">
              Đăng nhập một chạm để vào toàn bộ ứng dụng của bạn. Nhanh gọn,
              liền mạch và không cần nhớ thêm mật khẩu.
            </p>
          </div>

          {/* Elevated Login Card */}
          <div className="rounded-2xl border border-[#E7E5E4] dark:border-stone-800 bg-white dark:bg-card p-6 sm:p-8 shadow-[0_2px_12px_rgba(28,25,23,0.04)] dark:shadow-none space-y-5">
            {/* OAuth Authorize Context Banner */}
            {isOAuthLogin && (
              <div className="rounded-xl border border-primary/30 bg-primary/5 p-3 text-xs text-primary flex items-start gap-2.5">
                <ShieldCheck className="h-4 w-4 shrink-0 mt-0.5" />
                <div className="space-y-0.5 text-left">
                  <p className="font-semibold text-foreground">
                    Yêu cầu kết nối ứng dụng
                  </p>
                  <p className="text-muted-foreground leading-relaxed">
                    Đăng nhập tài khoản của bạn để tiếp tục chuyển đến ứng dụng
                    đang yêu cầu.
                  </p>
                </div>
              </div>
            )}

            {/* Error Banner */}
            {(urlError || error) && (
              <div className="rounded-xl border border-destructive/40 bg-destructive/10 p-3 text-xs text-destructive space-y-1">
                <div className="flex justify-between items-start gap-2">
                  <span className="font-semibold break-words leading-relaxed text-left">
                    {urlError || error}
                  </span>
                  <button
                    type="button"
                    onClick={() => {
                      setUrlError(null);
                      clearError();
                    }}
                    className="hover:text-destructive/80 font-bold shrink-0 text-base leading-none p-1 cursor-pointer"
                  >
                    ×
                  </button>
                </div>
              </div>
            )}

            {/* Interactive OAuth Buttons */}
            <div className="space-y-3">
              <SocialButton
                provider="google"
                label="Tiếp tục với Google"
                icon={<GoogleIcon />}
              />
              <SocialButton
                provider="github"
                label="Tiếp tục với GitHub"
                icon={<GithubIcon />}
              />
              <SocialButton
                provider="facebook"
                label="Tiếp tục với Facebook"
                icon={<FacebookIcon />}
              />
            </div>

            {/* Refined Legal Footer Links */}
            <p className="text-center text-[11px] text-[#78716C] dark:text-stone-400 leading-relaxed pt-2">
              Bằng việc tiếp tục, bạn đồng ý với{" "}
              <Link
                href="/terms"
                className="text-[#78716C] dark:text-stone-400 hover:text-[#1C1917] dark:hover:text-stone-200 hover:underline transition-colors font-medium"
              >
                Điều khoản
              </Link>{" "}
              và{" "}
              <Link
                href="/privacy"
                className="text-[#78716C] dark:text-stone-400 hover:text-[#1C1917] dark:hover:text-stone-200 hover:underline transition-colors font-medium"
              >
                Bảo mật
              </Link>
              .
            </p>
          </div>
        </div>
      </main>

      {/* 3. MINIMAL CLEAN FOOTER */}
      <footer className="relative z-10 py-6 text-center text-xs text-muted-foreground/80 font-mono">
        <div className="flex items-center justify-center gap-2">
          <span>© {new Date().getFullYear()} VNTEZ Cloud</span>
          <span>•</span>
          <span>v2.0.0</span>
        </div>
      </footer>
    </div>
  );
}
