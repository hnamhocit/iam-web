"use client";

import {
  ArrowRight,
  Code2,
  Home,
  Lock,
  ShieldCheck,
  Sparkles,
  Zap,
} from "lucide-react";
import Link from "next/link";
import { useEffect, useState } from "react";
import {
  FacebookIcon,
  GithubIcon,
  GoogleIcon,
} from "@/components/icons/oauth-icons";
import { SocialButton } from "@/components/social-button";
import { ModeToggle } from "@/components/ThemeToggle";
import { Badge } from "@/components/ui/badge";
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
    <div className="relative min-h-screen w-full overflow-hidden bg-background text-foreground lg:grid lg:grid-cols-2">
      {/* Top Floating Action Pill */}
      <div className="absolute right-4 top-4 z-50 lg:right-8 lg:top-8 flex items-center gap-2 rounded-2xl border border-border/60 bg-background/80 p-1.5 shadow-sm backdrop-blur-md">
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
        <div className="h-4 w-[1px] bg-border/60 mx-0.5" />
        <ModeToggle />
      </div>

      {/* LEFT COLUMN (Brand Showcase & Ecosystem Experience) */}
      <div className="relative hidden overflow-hidden border-r border-border/70 bg-muted/15 p-10 xl:p-14 lg:flex lg:flex-col lg:justify-between">
        {/* Ambient Gradient Meshes */}
        <div className="pointer-events-none absolute -left-28 -top-28 h-[550px] w-[550px] rounded-full bg-primary/15 dark:bg-primary/20 blur-[140px]" />
        <div className="pointer-events-none absolute bottom-10 right-10 h-[500px] w-[500px] rounded-full bg-sky-500/10 dark:bg-sky-500/15 blur-[150px]" />

        {/* Subtle grid pattern */}
        <div
          className="pointer-events-none absolute inset-0 opacity-[0.22] dark:opacity-[0.14]"
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
          <VntezLogo size={34} />
          <div className="flex items-center gap-2">
            <span className="text-xl font-extrabold tracking-tight bg-gradient-to-r from-[#ff7a50] via-[#fb291a] to-[#e3062a] bg-clip-text text-transparent">
              VNTEZ
            </span>
            <span className="rounded-md border border-primary/30 bg-primary/10 px-2 py-0.5 text-xs font-mono font-bold text-primary">
              IAM
            </span>
          </div>
        </Link>

        {/* Hero Narrative */}
        <div className="relative z-10 my-auto max-w-lg space-y-6">
          <Badge
            variant="outline"
            className="inline-flex items-center gap-2 rounded-full border-primary/30 bg-primary/10 px-3.5 py-1 text-xs font-semibold text-primary shadow-xs"
          >
            <Sparkles className="h-3.5 w-3.5 animate-pulse" />
            <span>VNTEZ Unified Identity & SSO 2.0</span>
          </Badge>

          <div className="space-y-3">
            <h1 className="text-3xl xl:text-4xl font-extrabold tracking-tight text-foreground leading-[1.2]">
              Một định danh cho toàn bộ hệ sinh thái của bạn.
            </h1>
            <p className="text-sm xl:text-base leading-relaxed text-muted-foreground">
              Đăng nhập một lần an toàn bằng chuẩn OAuth 2.0 PKCE & OIDC để truy
              cập liền mạch vào Console, SoloType, Workers Hub, GitVN và mọi ứng
              dụng vệ tinh.
            </p>
          </div>

          {/* Interactive Ecosystem Card Showcase */}
          <div className="rounded-3xl border border-border/80 bg-card/75 dark:bg-card/45 p-5 shadow-xl backdrop-blur-xl space-y-4">
            <div className="flex items-center justify-between border-b border-border/50 pb-3">
              <div className="flex items-center gap-2">
                <span className="flex h-2.5 w-2.5 rounded-full bg-emerald-500 animate-pulse" />
                <span className="font-mono text-xs font-semibold text-foreground">
                  VNTEZ Ecosystem Mesh
                </span>
              </div>
              <span className="font-mono text-[10px] uppercase tracking-wider text-muted-foreground bg-muted/70 px-2 py-0.5 rounded-md border border-border/40">
                Zero-Trust Auth
              </span>
            </div>

            {/* Connected Apps Grid */}
            <div className="grid grid-cols-2 gap-2.5 text-xs">
              <div className="flex items-center gap-2.5 rounded-xl border border-border/50 bg-background/50 p-2.5 transition-colors hover:border-primary/40">
                <div className="flex h-7 w-7 items-center justify-center rounded-lg bg-primary/10 text-primary font-bold text-xs shrink-0">
                  ST
                </div>
                <div className="min-w-0">
                  <p className="font-semibold text-foreground truncate">
                    SoloType
                  </p>
                  <p className="text-[10px] text-muted-foreground truncate">
                    Luyện gõ phím
                  </p>
                </div>
              </div>

              <div className="flex items-center gap-2.5 rounded-xl border border-border/50 bg-background/50 p-2.5 transition-colors hover:border-sky-500/40">
                <div className="flex h-7 w-7 items-center justify-center rounded-lg bg-sky-500/10 text-sky-500 font-bold text-xs shrink-0">
                  WH
                </div>
                <div className="min-w-0">
                  <p className="font-semibold text-foreground truncate">
                    Workers Hub
                  </p>
                  <p className="text-[10px] text-muted-foreground truncate">
                    Edge Telemetry
                  </p>
                </div>
              </div>

              <div className="flex items-center gap-2.5 rounded-xl border border-border/50 bg-background/50 p-2.5 transition-colors hover:border-emerald-500/40">
                <div className="flex h-7 w-7 items-center justify-center rounded-lg bg-emerald-500/10 text-emerald-500 font-bold text-xs shrink-0">
                  GV
                </div>
                <div className="min-w-0">
                  <p className="font-semibold text-foreground truncate">
                    GitVN
                  </p>
                  <p className="text-[10px] text-muted-foreground truncate">
                    Git Repository
                  </p>
                </div>
              </div>

              <div className="flex items-center gap-2.5 rounded-xl border border-border/50 bg-background/50 p-2.5 transition-colors hover:border-amber-500/40">
                <div className="flex h-7 w-7 items-center justify-center rounded-lg bg-amber-500/10 text-amber-500 font-bold text-xs shrink-0">
                  BR
                </div>
                <div className="min-w-0">
                  <p className="font-semibold text-foreground truncate">
                    Bonsai Reader
                  </p>
                  <p className="text-[10px] text-muted-foreground truncate">
                    Đọc sách ePub
                  </p>
                </div>
              </div>
            </div>

            {/* Security Pills */}
            <div className="flex items-center justify-between pt-1 border-t border-border/40 text-[11px] font-mono text-muted-foreground">
              <span className="flex items-center gap-1.5">
                <ShieldCheck className="h-3.5 w-3.5 text-emerald-500" />
                <span>PKCE S256 Verified</span>
              </span>
              <span className="flex items-center gap-1.5">
                <Zap className="h-3.5 w-3.5 text-primary" />
                <span>Cloudflare Edge (&lt;15ms)</span>
              </span>
            </div>
          </div>
        </div>

        {/* Left Bottom Footer */}
        <div className="relative z-10 flex items-center justify-between border-t border-border/60 pt-4 text-xs font-mono text-muted-foreground">
          <div className="flex items-center gap-2">
            <span className="h-2 w-2 rounded-full bg-emerald-500" />
            <span>Cloudflare Edge Network: Online</span>
          </div>
          <span className="text-[11px] text-muted-foreground/80">v2.0.0</span>
        </div>
      </div>

      {/* RIGHT COLUMN (The Elevated Login Card) */}
      <div className="relative flex min-h-screen items-center justify-center p-4 sm:p-8 lg:p-14">
        {/* Ambient glow in right column */}
        <div className="pointer-events-none absolute right-1/4 top-1/4 h-[350px] w-[350px] rounded-full bg-primary/10 dark:bg-primary/15 blur-[120px]" />
        <div className="pointer-events-none absolute bottom-1/4 left-1/4 h-[350px] w-[350px] rounded-full bg-sky-500/10 dark:bg-sky-500/15 blur-[120px]" />

        <div className="relative z-10 w-full max-w-[420px] rounded-3xl border border-border/80 bg-card/85 dark:bg-card/65 p-7 sm:p-9 shadow-2xl backdrop-blur-2xl space-y-6">
          {/* Mobile-only Brand Header */}
          <div className="flex lg:hidden items-center justify-between border-b border-border/50 pb-4">
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
            <Badge variant="outline" className="text-[10px] font-mono">
              OAuth 2.0
            </Badge>
          </div>

          {/* Form Header */}
          <div className="space-y-2 text-center lg:text-left">
            <div className="inline-flex lg:hidden mx-auto mb-1 h-12 w-12 items-center justify-center rounded-2xl bg-primary/10 text-primary ring-6 ring-primary/5">
              <Lock className="h-6 w-6" />
            </div>
            <h2 className="font-display text-2xl sm:text-3xl font-extrabold tracking-tight text-foreground">
              Đăng nhập
            </h2>
            <p className="text-xs sm:text-sm text-muted-foreground leading-relaxed">
              {isOAuthLogin
                ? "Đăng nhập tài khoản VNTEZ IAM để tiếp tục ủy quyền ứng dụng."
                : "Chọn phương thức xác thực an toàn của bạn."}
            </p>
          </div>

          {/* OAuth Authorize Context Banner */}
          {isOAuthLogin && (
            <div className="rounded-2xl border border-primary/30 bg-primary/10 p-3.5 text-xs text-primary flex items-start gap-2.5 shadow-xs">
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
            <div className="animate-in fade-in slide-in-from-top-2 rounded-2xl border border-destructive/40 bg-destructive/10 p-3.5 text-xs text-destructive space-y-1">
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

          {/* Divider */}
          <div className="relative my-2">
            <div className="absolute inset-0 flex items-center">
              <div className="w-full border-t border-border/60" />
            </div>
            <div className="relative flex justify-center text-[10px] uppercase font-mono">
              <span className="bg-card px-3 text-muted-foreground">
                Bảo vệ bởi OAuth 2.0 PKCE
              </span>
            </div>
          </div>

          {/* Developer Callout Card */}
          <div className="group rounded-2xl border border-border/70 bg-muted/30 hover:bg-muted/60 p-3.5 transition-all duration-200">
            <div className="flex items-start gap-3">
              <div className="flex h-8 w-8 items-center justify-center rounded-xl bg-primary/10 text-primary shrink-0 mt-0.5">
                <Code2 className="h-4 w-4" />
              </div>
              <div className="space-y-0.5 min-w-0">
                <p className="text-xs font-semibold text-foreground">
                  Dành cho nhà phát triển
                </p>
                <p className="text-[11px] text-muted-foreground leading-relaxed">
                  Tích hợp VNTEZ SSO và quản trị phân quyền cho dịch vụ của bạn.
                </p>
                <Link
                  href="/developers"
                  className="inline-flex items-center gap-1 text-xs font-semibold text-primary pt-1 hover:underline"
                >
                  <span>Khám phá Developer Hub</span>
                  <ArrowRight className="h-3 w-3" />
                </Link>
              </div>
            </div>
          </div>

          {/* Legal / Policy Footer */}
          <p className="text-center text-[11px] text-muted-foreground leading-relaxed">
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
