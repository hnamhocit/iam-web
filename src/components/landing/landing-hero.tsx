"use client";

import {
  ArrowRight,
  Check,
  CheckCircle2,
  Copy,
  Key,
  Lock,
  ShieldCheck,
  Zap,
} from "lucide-react";
import Link from "next/link";
import { useState } from "react";
import { Button } from "@/components/ui/button";

export function LandingHero() {
  const [copiedToken, setCopiedToken] = useState(false);

  const sampleTokenClaims = {
    iss: "https://iam.vntez.com",
    sub: "usr_9f8241e0a81c",
    app_id: "vntez",
    name: "VNTEZ Developer",
    email: "dev@vntez.com",
    email_verified: true,
    roles: ["developer", "admin"],
    permissions: ["iam:read", "iam:write", "apps:*"],
    exp: 1794856400,
  };

  const handleCopyClaims = () => {
    navigator.clipboard.writeText(JSON.stringify(sampleTokenClaims, null, 2));
    setCopiedToken(true);
    setTimeout(() => setCopiedToken(false), 2000);
  };

  return (
    <section className="relative mx-auto w-full max-w-7xl px-4 sm:px-6 lg:px-8 pt-16 sm:pt-24 pb-16 text-center overflow-hidden">
      {/* Background Ambient Glow & Light Orbs (Dark Mode Only to keep Light Mode clean & crisp) */}
      <div className="pointer-events-none absolute -top-32 left-1/2 -translate-x-1/2 h-[450px] w-[750px] rounded-full bg-[#fb291a]/20 blur-[150px] hidden dark:block" />
      <div className="pointer-events-none absolute top-48 left-1/4 h-[350px] w-[350px] rounded-full bg-sky-500/15 blur-[140px] hidden dark:block" />
      <div className="pointer-events-none absolute top-48 right-1/4 h-[350px] w-[350px] rounded-full bg-indigo-500/15 blur-[140px] hidden dark:block" />

      {/* Subtle Dot Grid */}
      <div
        className="pointer-events-none absolute inset-0 opacity-[0.25] dark:opacity-[0.16] [mask-image:radial-gradient(ellipse_at_center,black_50%,transparent_90%)]"
        style={{
          backgroundImage: "radial-gradient(currentColor 1px, transparent 1px)",
          backgroundSize: "32px 32px",
        }}
      />

      {/* Main Headline */}
      <h1 className="relative z-10 font-display text-4xl sm:text-6xl lg:text-7xl font-extrabold tracking-tight text-foreground leading-[1.15] max-w-5xl mx-auto">
        <span>Một định danh duy nhất cho</span>{" "}
        <span className="bg-gradient-to-r from-[#ff7a50] via-[#fb291a] to-[#e3062a] bg-clip-text text-transparent">
          toàn bộ hệ sinh thái của bạn.
        </span>
      </h1>

      {/* Subtitle */}
      <p className="relative z-10 mx-auto mt-6 max-w-3xl text-sm sm:text-lg text-muted-foreground leading-relaxed font-sans">
        Xác thực một chạm bảo mật chuẩn{" "}
        <strong>OAuth 2.0 & RFC 7636 PKCE</strong> trên hạ tầng phân tán{" "}
        <strong>Cloudflare Workers Edge</strong>. Kết nối liền mạch toàn bộ ứng
        dụng Web, Mobile và API của bạn chỉ với vài dòng mã.
      </p>

      {/* Action Buttons */}
      <div className="relative z-10 mt-8 flex flex-wrap items-center justify-center gap-3 sm:gap-4">
        <Button
          size="lg"
          asChild
          className="rounded-xl gap-2 text-sm sm:text-base font-bold px-7 h-11"
        >
          <Link href="/developers">
            <span>Khám phá Developer Hub</span>
            <ArrowRight className="h-4 w-4" />
          </Link>
        </Button>

        <Button
          variant="outline"
          size="lg"
          asChild
          className="rounded-xl text-sm sm:text-base font-medium px-7 h-11 border-border bg-card hover:bg-muted/50"
        >
          <Link href="/login">
            <span>Đăng nhập tài khoản</span>
          </Link>
        </Button>
      </div>

      {/* HERO VISUAL MOCKUP: Live SSO & Token Inspector Window */}
      <div className="relative z-10 mt-12 mx-auto max-w-5xl rounded-2xl border border-border bg-card overflow-hidden text-left">
        {/* macOS Window Top Bar */}
        <div className="flex items-center justify-between border-b border-border/60 bg-muted/40 px-4 sm:px-6 py-3">
          <div className="flex items-center gap-2">
            <span className="h-3 w-3 rounded-full bg-rose-500/80 inline-block" />
            <span className="h-3 w-3 rounded-full bg-amber-500/80 inline-block" />
            <span className="h-3 w-3 rounded-full bg-emerald-500/80 inline-block" />
            <span className="ml-3 font-mono text-xs text-muted-foreground hidden sm:inline-block">
              https://iam.vntez.com/oauth/authorize
            </span>
          </div>

          <div className="flex items-center gap-2">
            <span className="inline-flex items-center gap-1.5 rounded-full border border-emerald-500/30 bg-emerald-500/10 px-2.5 py-0.5 text-[11px] font-mono text-emerald-600 dark:text-emerald-400">
              <span className="h-1.5 w-1.5 rounded-full bg-emerald-500 animate-pulse" />
              <span>Edge Gateway: 9ms</span>
            </span>
            <span className="rounded-md border border-border/60 bg-background/80 px-2 py-0.5 text-[10px] font-mono text-muted-foreground">
              PKCE S256 Active
            </span>
          </div>
        </div>

        {/* Window Content: 2 Columns (Handshake Flow & Live Token Claims) */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-0 divide-y lg:divide-y-0 lg:divide-x divide-border/60">
          {/* Left: 3-Step Handshake Diagram */}
          <div className="lg:col-span-5 p-5 sm:p-6 space-y-4">
            <div className="flex items-center justify-between">
              <span className="font-mono text-xs font-bold uppercase tracking-wider text-foreground">
                Quy trình xác thực SSO
              </span>
              <span className="text-[11px] font-mono text-primary font-semibold">
                RFC 7636
              </span>
            </div>

            <div className="space-y-3">
              {/* Step 1 */}
              <div className="flex items-start gap-3 rounded-2xl border border-border/60 bg-background/50 p-3 transition-colors hover:border-primary/40">
                <div className="flex h-7 w-7 items-center justify-center rounded-xl bg-primary/10 text-primary font-mono text-xs font-bold shrink-0 mt-0.5">
                  1
                </div>
                <div className="min-w-0 space-y-0.5">
                  <p className="text-xs font-bold text-foreground">
                    Ủy quyền & Thách thức PKCE
                  </p>
                  <p className="text-[11px] text-muted-foreground font-mono truncate">
                    ?app_id=vntez&code_challenge=S256...
                  </p>
                </div>
              </div>

              {/* Step 2 */}
              <div className="flex items-start gap-3 rounded-2xl border border-border/60 bg-background/50 p-3 transition-colors hover:border-emerald-500/40">
                <div className="flex h-7 w-7 items-center justify-center rounded-xl bg-emerald-500/10 text-emerald-500 font-mono text-xs font-bold shrink-0 mt-0.5">
                  2
                </div>
                <div className="min-w-0 space-y-0.5">
                  <p className="text-xs font-bold text-foreground">
                    Xác thực định danh một lần
                  </p>
                  <p className="text-[11px] text-muted-foreground">
                    Google, GitHub hoặc Supabase Session
                  </p>
                </div>
              </div>

              {/* Step 3 */}
              <div className="flex items-start gap-3 rounded-2xl border border-border/60 bg-background/50 p-3 transition-colors hover:border-sky-500/40">
                <div className="flex h-7 w-7 items-center justify-center rounded-xl bg-sky-500/10 text-sky-500 font-mono text-xs font-bold shrink-0 mt-0.5">
                  3
                </div>
                <div className="min-w-0 space-y-0.5">
                  <p className="text-xs font-bold text-foreground">
                    Cấp phát Access Token JWT
                  </p>
                  <p className="text-[11px] text-muted-foreground font-mono truncate">
                    Bearer Token kèm Role & Permissions
                  </p>
                </div>
              </div>
            </div>

            <div className="rounded-xl border border-border/50 bg-muted/20 p-3 text-[11px] text-muted-foreground flex items-center justify-between">
              <span className="flex items-center gap-1.5">
                <ShieldCheck className="h-3.5 w-3.5 text-emerald-500" />
                <span>Bảo vệ chống Replay Attack</span>
              </span>
              <span className="font-mono text-emerald-600 dark:text-emerald-400 font-semibold">
                100% Zero-Trust
              </span>
            </div>
          </div>

          {/* Right: Real-time Claims Visualizer */}
          <div className="lg:col-span-7 p-5 sm:p-6 bg-zinc-950 text-zinc-200 font-mono text-xs space-y-3">
            <div className="flex items-center justify-between border-b border-zinc-800 pb-2.5">
              <div className="flex items-center gap-2 text-zinc-400 text-xs">
                <Key className="h-3.5 w-3.5 text-primary" />
                <span className="text-zinc-300 font-bold">
                  OIDC Claims Payload
                </span>
                <span className="text-[10px] text-zinc-500 hidden sm:inline">
                  (RS256 / Ed25519)
                </span>
              </div>
              <button
                type="button"
                onClick={handleCopyClaims}
                className="flex items-center gap-1.5 rounded-lg border border-zinc-700 bg-zinc-900 px-2.5 py-1 text-[11px] text-zinc-300 hover:text-white transition-colors cursor-pointer"
              >
                {copiedToken ? (
                  <>
                    <Check className="h-3 w-3 text-emerald-400" />
                    <span className="text-emerald-400">Đã chép</span>
                  </>
                ) : (
                  <>
                    <Copy className="h-3 w-3" />
                    <span>Sao chép JSON</span>
                  </>
                )}
              </button>
            </div>

            {/* Code Body */}
            <div className="overflow-x-auto text-[11px] sm:text-xs leading-relaxed space-y-1 py-1">
              <div>
                <span className="text-zinc-500">{"{"}</span>
              </div>
              <div className="pl-4">
                <span className="text-sky-400">&quot;iss&quot;</span>:{" "}
                <span className="text-emerald-300">
                  &quot;https://iam.vntez.com&quot;
                </span>
                ,
              </div>
              <div className="pl-4">
                <span className="text-sky-400">&quot;sub&quot;</span>:{" "}
                <span className="text-emerald-300">
                  &quot;usr_9f8241e0a81c&quot;
                </span>
                ,
              </div>
              <div className="pl-4">
                <span className="text-sky-400">&quot;app_id&quot;</span>:{" "}
                <span className="text-amber-300">&quot;vntez&quot;</span>,
              </div>
              <div className="pl-4">
                <span className="text-sky-400">&quot;name&quot;</span>:{" "}
                <span className="text-emerald-300">
                  &quot;VNTEZ Developer&quot;
                </span>
                ,
              </div>
              <div className="pl-4">
                <span className="text-sky-400">&quot;email&quot;</span>:{" "}
                <span className="text-emerald-300">
                  &quot;dev@vntez.com&quot;
                </span>
                ,
              </div>
              <div className="pl-4">
                <span className="text-sky-400">&quot;roles&quot;</span>:{" "}
                <span className="text-purple-300">
                  [&quot;developer&quot;, &quot;admin&quot;]
                </span>
                ,
              </div>
              <div className="pl-4">
                <span className="text-sky-400">&quot;permissions&quot;</span>:{" "}
                <span className="text-purple-300">
                  [&quot;iam:read&quot;, &quot;iam:write&quot;,
                  &quot;apps:*&quot;]
                </span>
              </div>
              <div>
                <span className="text-zinc-500">{"}"}</span>
              </div>
            </div>

            <div className="border-t border-zinc-800/80 pt-2 flex items-center justify-between text-[10px] text-zinc-500">
              <span className="flex items-center gap-1.5 text-emerald-400">
                <CheckCircle2 className="h-3 w-3" />
                <span>
                  Chữ ký hợp lệ • Verify tại Edge không cần DB roundtrip
                </span>
              </span>
              <span>TTL: 3600s</span>
            </div>
          </div>
        </div>
      </div>

      {/* Trust Indicators Strip */}
      <div className="relative z-10 mt-12 flex flex-wrap items-center justify-center gap-3 text-xs font-medium text-muted-foreground font-sans">
        <div className="flex items-center gap-2 rounded-xl border border-border/60 bg-card/60 px-3.5 py-1.5 shadow-xs backdrop-blur-sm">
          <ShieldCheck className="h-4 w-4 text-emerald-500" />
          <span>Chuẩn OAuth 2.0 (RFC 6749)</span>
        </div>
        <div className="flex items-center gap-2 rounded-xl border border-border/60 bg-card/60 px-3.5 py-1.5 shadow-xs backdrop-blur-sm">
          <Lock className="h-4 w-4 text-primary" />
          <span>Mã hóa PKCE S256 (RFC 7636)</span>
        </div>
        <div className="flex items-center gap-2 rounded-xl border border-border/60 bg-card/60 px-3.5 py-1.5 shadow-xs backdrop-blur-sm">
          <Zap className="h-4 w-4 text-amber-500" />
          <span>Cloudflare Edge (&lt;15ms)</span>
        </div>
        <div className="flex items-center gap-2 rounded-xl border border-border/60 bg-card/60 px-3.5 py-1.5 shadow-xs backdrop-blur-sm">
          <CheckCircle2 className="h-4 w-4 text-sky-500" />
          <span>JWT RS256 / Ed25519</span>
        </div>
      </div>
    </section>
  );
}
