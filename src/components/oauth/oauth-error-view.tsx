"use client";

import {
  ArrowLeft,
  Check,
  ChevronDown,
  ChevronUp,
  Code2,
  Copy,
  ExternalLink,
  Home,
  Info,
  ShieldAlert,
  Terminal,
} from "lucide-react";
import Link from "next/link";
import { useState } from "react";
import { ModeToggle } from "@/components/ThemeToggle";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { VntezLogo } from "@/components/ui/vntez-logo";

export interface OAuthErrorViewProps {
  title: string;
  desc: string;
  errorCode?: string;
  appId?: string | null;
  redirectUri?: string | null;
  hint?: string;
}

export function OAuthErrorView({
  title,
  desc,
  errorCode = "OAUTH_REQUEST_ERROR",
  appId,
  redirectUri,
  hint,
}: OAuthErrorViewProps) {
  const [showTechnical, setShowTechnical] = useState(false);
  const [copied, setCopied] = useState(false);

  const debugInfo = {
    error_code: errorCode,
    app_id: appId || "(không có)",
    redirect_uri: redirectUri || "(không có)",
    timestamp: new Date().toISOString(),
  };

  const copyDebugJson = () => {
    navigator.clipboard.writeText(JSON.stringify(debugInfo, null, 2));
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="relative min-h-screen w-full flex flex-col justify-between overflow-hidden bg-background text-foreground selection:bg-primary/20 selection:text-primary">
      {/* Background Ambient Glow & Light Orbs */}
      <div className="pointer-events-none absolute -top-40 -left-40 h-[500px] w-[500px] rounded-full bg-destructive/15 dark:bg-destructive/20 blur-[130px]" />
      <div className="pointer-events-none absolute top-1/3 -right-40 h-[450px] w-[450px] rounded-full bg-primary/10 dark:bg-primary/15 blur-[140px]" />
      <div className="pointer-events-none absolute -bottom-40 left-1/3 h-[450px] w-[450px] rounded-full bg-sky-500/10 dark:bg-sky-500/15 blur-[130px]" />

      {/* Background subtle dot pattern */}
      <div
        className="pointer-events-none absolute inset-0 opacity-[0.25] dark:opacity-[0.18]"
        style={{
          backgroundImage: "radial-gradient(currentColor 1px, transparent 1px)",
          backgroundSize: "28px 28px",
        }}
      />

      {/* Top Header / Brand Bar */}
      <header className="relative z-20 w-full border-b border-border/40 bg-background/60 backdrop-blur-md">
        <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-8">
          <Link
            href="/"
            className="flex items-center gap-2.5 transition-opacity hover:opacity-90"
          >
            <VntezLogo size={28} />
            <div className="flex items-center gap-1.5 font-bold tracking-tight">
              <span className="text-base sm:text-lg bg-gradient-to-r from-[#ff7a50] via-[#fb291a] to-[#e3062a] bg-clip-text text-transparent">
                VNTEZ
              </span>
              <span className="text-sm font-semibold text-foreground/80">
                IAM
              </span>
            </div>
            <Badge
              variant="outline"
              className="hidden sm:inline-flex text-[10px] uppercase font-mono px-1.5 py-0 border-border/60 text-muted-foreground"
            >
              SSO Auth
            </Badge>
          </Link>

          <div className="flex items-center gap-2 sm:gap-3">
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
            <Button
              variant="outline"
              size="sm"
              asChild
              className="text-xs h-8 gap-1.5"
            >
              <Link href="/">
                <Home className="h-3.5 w-3.5" />
                <span>Trang chủ</span>
              </Link>
            </Button>
            <ModeToggle />
          </div>
        </div>
      </header>

      {/* Main Error Centerpiece */}
      <main className="relative z-10 flex flex-1 items-center justify-center p-4 sm:p-6 my-8">
        <div className="w-full max-w-xl rounded-2xl border border-destructive/30 bg-card p-6 sm:p-8 text-center space-y-6 animate-in fade-in zoom-in-95 duration-200">
          {/* Glowing Shield Icon */}
          <div className="relative mx-auto flex h-16 w-16 items-center justify-center rounded-2xl bg-destructive/10 text-destructive ring-8 ring-destructive/5 dark:bg-destructive/20 dark:ring-destructive/10">
            <span className="absolute inset-0 rounded-2xl bg-destructive/20 animate-ping opacity-25" />
            <ShieldAlert className="h-8 w-8 relative z-10" />
          </div>

          {/* Error Tag */}
          <div className="inline-flex items-center gap-1.5 rounded-full border border-destructive/30 bg-destructive/10 px-3.5 py-1 text-xs font-semibold text-destructive">
            <span className="h-1.5 w-1.5 rounded-full bg-destructive animate-pulse" />
            <span className="font-mono text-[11px] uppercase tracking-wider">
              {errorCode}
            </span>
          </div>

          {/* Title and Description */}
          <div className="space-y-2.5">
            <h1 className="text-2xl sm:text-3xl font-extrabold tracking-tight text-foreground">
              {title}
            </h1>
            <p className="text-sm sm:text-base text-muted-foreground leading-relaxed max-w-md mx-auto">
              {desc}
            </p>
          </div>

          {/* Technical Details Accordion */}
          <div className="rounded-2xl border border-border/70 bg-muted/30 dark:bg-zinc-950/40 p-3.5 sm:p-4 text-left transition-all">
            <button
              type="button"
              onClick={() => setShowTechnical((v) => !v)}
              className="flex w-full items-center justify-between text-xs font-medium text-muted-foreground hover:text-foreground transition-colors cursor-pointer"
            >
              <span className="flex items-center gap-1.5">
                <Terminal className="h-3.5 w-3.5 text-primary" />
                <span>Chi tiết kỹ thuật dành cho nhà phát triển</span>
              </span>
              {showTechnical ? (
                <ChevronUp className="h-4 w-4" />
              ) : (
                <ChevronDown className="h-4 w-4" />
              )}
            </button>

            {showTechnical && (
              <div className="mt-3.5 space-y-3 pt-3 border-t border-border/50 text-xs">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 font-mono text-[11px]">
                  <div className="rounded-lg bg-background/80 p-2.5 border border-border/50">
                    <span className="text-muted-foreground block text-[10px] uppercase">
                      App ID:
                    </span>
                    <span className="font-bold text-foreground break-all">
                      {appId || "(chưa truyền)"}
                    </span>
                  </div>
                  <div className="rounded-lg bg-background/80 p-2.5 border border-border/50">
                    <span className="text-muted-foreground block text-[10px] uppercase">
                      Mã lỗi (Code):
                    </span>
                    <span className="font-bold text-destructive break-all">
                      {errorCode}
                    </span>
                  </div>
                </div>

                {redirectUri && (
                  <div className="rounded-lg bg-background/80 p-2.5 border border-border/50 font-mono text-[11px]">
                    <span className="text-muted-foreground block text-[10px] uppercase">
                      Redirect URI:
                    </span>
                    <span className="text-foreground break-all">
                      {redirectUri}
                    </span>
                  </div>
                )}

                {hint && (
                  <div className="flex items-start gap-2 rounded-lg bg-primary/5 p-2.5 border border-primary/20 text-foreground text-[11px] leading-relaxed">
                    <Info className="h-4 w-4 text-primary shrink-0 mt-0.5" />
                    <span>{hint}</span>
                  </div>
                )}

                <div className="flex items-center justify-end pt-1">
                  <Button
                    type="button"
                    variant="ghost"
                    size="sm"
                    onClick={copyDebugJson}
                    className="h-7 text-[11px] gap-1.5 text-muted-foreground hover:text-foreground"
                  >
                    {copied ? (
                      <Check className="h-3 w-3 text-emerald-500" />
                    ) : (
                      <Copy className="h-3 w-3" />
                    )}
                    <span>
                      {copied ? "Đã chép JSON" : "Sao chép thông tin lỗi"}
                    </span>
                  </Button>
                </div>
              </div>
            )}
          </div>

          {/* Action Buttons */}
          <div className="flex flex-wrap items-center justify-center gap-3 pt-2">
            <Button
              type="button"
              variant="outline"
              onClick={() => {
                if (
                  typeof window !== "undefined" &&
                  window.history.length > 1
                ) {
                  window.history.back();
                } else {
                  window.location.href = "/";
                }
              }}
              className="gap-2 rounded-xl h-10 px-4 text-xs font-medium cursor-pointer"
            >
              <ArrowLeft className="h-3.5 w-3.5" />
              <span>Quay lại</span>
            </Button>

            <Button
              asChild
              className="gap-2 rounded-xl h-10 px-5 text-xs font-medium shadow-md shadow-primary/20"
            >
              <Link href="/">
                <Home className="h-3.5 w-3.5" />
                <span>Trang chủ VNTEZ IAM</span>
              </Link>
            </Button>

            <Button
              variant="secondary"
              asChild
              className="gap-2 rounded-xl h-10 px-4 text-xs font-medium"
            >
              <Link href="/developers">
                <Code2 className="h-3.5 w-3.5 text-primary" />
                <span>Tài liệu API</span>
                <ExternalLink className="h-3 w-3 opacity-60" />
              </Link>
            </Button>
          </div>
        </div>
      </main>

      {/* Bottom Footer */}
      <footer className="relative z-20 w-full border-t border-border/40 bg-background/50 py-4 text-center text-xs text-muted-foreground backdrop-blur-sm">
        <p>
          VNTEZ Identity & Access Management Ecosystem • Bảo mật theo tiêu chuẩn
          OAuth 2.0 PKCE & OIDC
        </p>
      </footer>
    </div>
  );
}
