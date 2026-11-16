"use client";

import {
  CheckCircle2,
  Code2,
  Home,
  Lock,
  ShieldCheck,
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
    <div className="relative min-h-screen w-full bg-background text-foreground lg:grid lg:grid-cols-12">
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

      {/* LEFT COLUMN: Rich Brand Showcase Panel (Deep, High-Contrast & Premium) */}
      <div className="relative hidden lg:col-span-6 xl:col-span-5 bg-[#080c14] text-white p-10 xl:p-14 lg:flex lg:flex-col lg:justify-between overflow-hidden border-r border-white/[0.08]">
        {/* Ambient Brand Glowing Mesh */}
        <div className="pointer-events-none absolute -left-20 -top-20 h-[450px] w-[450px] rounded-full bg-[#fb291a]/20 blur-[130px]" />
        <div className="pointer-events-none absolute bottom-0 right-0 h-[400px] w-[400px] rounded-full bg-sky-500/15 blur-[140px]" />

        {/* High-Tech Dot Matrix */}
        <div
          className="pointer-events-none absolute inset-0 opacity-[0.14]"
          style={{
            backgroundImage:
              "radial-gradient(rgba(255, 255, 255, 0.4) 1px, transparent 1px)",
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
            <span className="rounded-md border border-primary/40 bg-primary/20 px-2 py-0.5 text-xs font-mono font-bold text-primary">
              IAM
            </span>
          </div>
        </Link>

        {/* Center Hero Narrative & Feature Pillars */}
        <div className="relative z-10 my-auto max-w-lg space-y-8">
          <div className="space-y-3">
            <h1 className="text-3xl xl:text-4xl font-extrabold tracking-tight text-white leading-[1.2]">
              Một tài khoản cho toàn bộ hệ sinh thái VNTEZ.
            </h1>
            <p className="text-sm text-zinc-400 leading-relaxed font-sans">
              Hạ tầng xác thực định danh tập trung chuẩn OAuth 2.0 PKCE, bảo vệ
              người dùng và đồng bộ phiên làm việc tức thì trên toàn bộ ứng
              dụng.
            </p>
          </div>

          {/* Value Pillars */}
          <div className="space-y-4 pt-2">
            <div className="flex items-start gap-3.5">
              <div className="flex h-8 w-8 items-center justify-center rounded-xl bg-primary/15 border border-primary/30 text-primary shrink-0 mt-0.5">
                <ShieldCheck className="h-4 w-4" />
              </div>
              <div className="space-y-0.5">
                <p className="text-xs font-bold text-zinc-200">
                  Zero-Trust PKCE S256
                </p>
                <p className="text-[11px] text-zinc-400 leading-relaxed">
                  Bảo vệ chống tấn công replay và đánh cắp mã ủy quyền ngay cả
                  trên client public.
                </p>
              </div>
            </div>

            <div className="flex items-start gap-3.5">
              <div className="flex h-8 w-8 items-center justify-center rounded-xl bg-sky-500/15 border border-sky-500/30 text-sky-400 shrink-0 mt-0.5">
                <Zap className="h-4 w-4" />
              </div>
              <div className="space-y-0.5">
                <p className="text-xs font-bold text-zinc-200">
                  Cloudflare Edge Gateway &lt;15ms
                </p>
                <p className="text-[11px] text-zinc-400 leading-relaxed">
                  Phân tán trên 300+ trung tâm dữ liệu toàn cầu, sẵn sàng phục
                  vụ với độ trễ tối thiểu.
                </p>
              </div>
            </div>

            <div className="flex items-start gap-3.5">
              <div className="flex h-8 w-8 items-center justify-center rounded-xl bg-emerald-500/15 border border-emerald-500/30 text-emerald-400 shrink-0 mt-0.5">
                <CheckCircle2 className="h-4 w-4" />
              </div>
              <div className="space-y-0.5">
                <p className="text-xs font-bold text-zinc-200">
                  SSO Liền Mạch Một Chạm
                </p>
                <p className="text-[11px] text-zinc-400 leading-relaxed">
                  Đăng nhập một lần, truy cập an toàn Console, Workers Hub,
                  SoloType và mọi dịch vụ.
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Status Indicator */}
        <div className="relative z-10 flex items-center justify-between border-t border-white/[0.08] pt-4 text-xs font-mono text-zinc-400">
          <div className="flex items-center gap-2">
            <span className="h-2 w-2 rounded-full bg-emerald-400 animate-pulse" />
            <span className="text-zinc-300">Cloudflare Edge: Operational</span>
          </div>
          <span className="text-[11px] text-zinc-500">v2.0.0</span>
        </div>
      </div>

      {/* RIGHT COLUMN: Seamless Flat Login Form (No Box Border, Direct On Background) */}
      <div className="relative lg:col-span-6 xl:col-span-7 flex min-h-screen items-center justify-center p-6 sm:p-12 lg:p-16">
        <div className="relative z-10 w-full max-w-[380px] space-y-6">
          {/* Mobile-only Brand Header */}
          <div className="flex lg:hidden items-center justify-between border-b border-border pb-4 mb-2">
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

          {/* Form Title & Subtitle */}
          <div className="space-y-1.5 text-left">
            <h2 className="font-display text-2xl sm:text-3xl font-extrabold tracking-tight text-foreground">
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

          {/* Social Login Buttons (Seamless Flat Style) */}
          <div className="space-y-3 pt-1">
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

          {/* Subtle Security Footnote */}
          <div className="flex items-center justify-center gap-1.5 text-[11px] font-mono text-muted-foreground pt-1">
            <Lock className="h-3 w-3 text-emerald-500" />
            <span>Mã hóa bảo mật PKCE RFC 7636</span>
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
