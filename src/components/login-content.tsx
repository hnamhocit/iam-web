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
    <div className="relative min-h-screen w-full bg-background text-foreground lg:grid lg:grid-cols-2">
      {/* Top Floating Action Header */}
      <div className="absolute right-4 top-4 z-50 lg:right-8 lg:top-8 flex items-center gap-2 rounded-xl border border-border bg-background/90 p-1.5 backdrop-blur-md">
        <Button
          variant="ghost"
          size="sm"
          asChild
          className="h-8 gap-1.5 text-xs text-muted-foreground hover:text-foreground"
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
          className="h-8 gap-1.5 text-xs text-muted-foreground hover:text-foreground"
        >
          <Link href="/developers">
            <Code2 className="h-3.5 w-3.5 text-primary" />
            <span className="hidden sm:inline">Developers & API</span>
          </Link>
        </Button>
        <div className="h-4 w-[1px] bg-border mx-0.5" />
        <ModeToggle />
      </div>

      {/* LEFT COLUMN: Clean Minimal Branding */}
      <div className="relative hidden border-r border-border bg-muted/20 p-10 xl:p-14 lg:flex lg:flex-col lg:justify-between">
        {/* Subtle grid pattern */}
        <div
          className="pointer-events-none absolute inset-0 opacity-[0.18] dark:opacity-[0.12]"
          style={{
            backgroundImage:
              "radial-gradient(currentColor 1px, transparent 1px)",
            backgroundSize: "28px 28px",
          }}
        />

        {/* Brand Header */}
        <Link
          href="/"
          className="relative z-10 flex items-center gap-3 transition-opacity hover:opacity-90 w-fit"
        >
          <VntezLogo size={32} />
          <div className="flex items-center gap-2">
            <span className="text-xl font-extrabold tracking-tight bg-gradient-to-r from-[#ff7a50] via-[#fb291a] to-[#e3062a] bg-clip-text text-transparent">
              VNTEZ
            </span>
            <span className="rounded-md border border-primary/30 bg-primary/10 px-2 py-0.5 text-xs font-mono font-bold text-primary">
              IAM
            </span>
          </div>
        </Link>

        {/* Hero Headline: Concise & Punchy */}
        <div className="relative z-10 my-auto max-w-lg space-y-4">
          <h1 className="text-3xl xl:text-4xl font-extrabold tracking-tight text-foreground leading-[1.25]">
            Một tài khoản cho toàn bộ hệ sinh thái VNTEZ.
          </h1>
          <p className="text-sm text-muted-foreground leading-relaxed">
            Đăng nhập một lần an toàn bằng chuẩn OAuth 2.0 PKCE để truy cập liền
            mạch vào mọi ứng dụng và dịch vụ.
          </p>
        </div>

        {/* Left Bottom Footer */}
        <div className="relative z-10 flex items-center justify-between border-t border-border pt-4 text-xs font-mono text-muted-foreground">
          <div className="flex items-center gap-2">
            <span className="h-2 w-2 rounded-full bg-emerald-500" />
            <span>Cloudflare Edge Network: Online</span>
          </div>
          <span className="text-[11px] text-muted-foreground/80">v2.0.0</span>
        </div>
      </div>

      {/* RIGHT COLUMN: Flat Login Form */}
      <div className="relative flex min-h-screen items-center justify-center p-4 sm:p-8 lg:p-14">
        <div className="relative z-10 w-full max-w-[400px] rounded-2xl border border-border bg-card p-6 sm:p-8 space-y-6">
          {/* Mobile-only Brand Header */}
          <div className="flex lg:hidden items-center justify-between border-b border-border pb-4">
            <Link href="/" className="flex items-center gap-2.5">
              <VntezLogo size={28} />
              <div className="flex items-center gap-1.5">
                <span className="font-bold text-base bg-gradient-to-r from-[#ff7a50] to-[#e3062a] bg-clip-text text-transparent">
                  VNTEZ
                </span>
                <span className="text-xs font-mono font-semibold text-primary">
                  IAM
                </span>
              </div>
            </Link>
          </div>

          {/* Form Header */}
          <div className="space-y-1.5 text-center lg:text-left">
            <h2 className="font-display text-2xl font-extrabold tracking-tight text-foreground">
              Đăng nhập
            </h2>
            <p className="text-xs sm:text-sm text-muted-foreground leading-relaxed">
              {isOAuthLogin
                ? "Đăng nhập tài khoản để tiếp tục ủy quyền ứng dụng."
                : "Chọn phương thức xác thực an toàn của bạn."}
            </p>
          </div>

          {/* OAuth Authorize Context Banner */}
          {isOAuthLogin && (
            <div className="rounded-xl border border-primary/30 bg-primary/5 p-3 text-xs text-primary flex items-start gap-2.5">
              <ShieldCheck className="h-4 w-4 shrink-0 mt-0.5" />
              <div className="space-y-0.5">
                <p className="font-semibold text-foreground">
                  Yêu cầu xác thực SSO
                </p>
                <p className="text-muted-foreground leading-relaxed">
                  Ứng dụng đang yêu cầu bạn xác thực để liên kết quyền truy cập
                  tài khoản an toàn.
                </p>
              </div>
            </div>
          )}

          {/* Error Banner */}
          {(urlError || error) && (
            <div className="rounded-xl border border-destructive/40 bg-destructive/10 p-3 text-xs text-destructive space-y-1">
              <div className="flex justify-between items-start gap-2">
                <span className="font-semibold break-words leading-relaxed">
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

          {/* Social Login Buttons */}
          <div className="space-y-2.5">
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

          {/* Legal / Policy Footer */}
          <p className="text-center text-[11px] text-muted-foreground leading-relaxed pt-2">
            Bằng việc tiếp tục, bạn đồng ý với{" "}
            <Link
              href="/terms"
              className="text-foreground font-medium underline underline-offset-4 hover:text-primary transition-colors"
            >
              Điều khoản
            </Link>{" "}
            và{" "}
            <Link
              href="/privacy"
              className="text-foreground font-medium underline underline-offset-4 hover:text-primary transition-colors"
            >
              Bảo mật
            </Link>
            .
          </p>
        </div>
      </div>
    </div>
  );
}
