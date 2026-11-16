"use client";

import {
  AlertTriangle,
  Check,
  ChevronDown,
  ChevronUp,
  Code2,
  Copy,
  Home,
  RefreshCw,
  Terminal,
} from "lucide-react";
import Link from "next/link";
import { useEffect, useState } from "react";
import { ModeToggle } from "@/components/ThemeToggle";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { VntezLogo } from "@/components/ui/vntez-logo";

export function ErrorBoundaryView({
  error,
  reset,
  appName = "VNTEZ IAM",
  homeHref = "/",
}: {
  error: Error & { digest?: string };
  reset?: () => void;
  appName?: string;
  homeHref?: string;
}) {
  const [showDetails, setShowDetails] = useState(false);
  const [copied, setCopied] = useState(false);

  useEffect(() => {
    console.error("[VNTEZ ErrorBoundary Caught]:", error);
  }, [error]);

  const copyError = () => {
    const errorPayload = {
      name: error.name,
      message: error.message,
      digest: error.digest,
      stack: error.stack,
      timestamp: new Date().toISOString(),
    };
    navigator.clipboard.writeText(JSON.stringify(errorPayload, null, 2));
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="relative min-h-screen w-full flex flex-col justify-between overflow-hidden bg-background text-foreground selection:bg-primary/20 selection:text-primary">
      {/* Background Ambient Glow & Light Orbs */}
      <div className="pointer-events-none absolute -top-40 -left-40 h-[500px] w-[500px] rounded-full bg-rose-500/15 dark:bg-rose-500/20 blur-[130px]" />
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
              System Guard
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

      {/* Centerpiece Error Card */}
      <main className="relative z-10 flex flex-1 items-center justify-center p-4 sm:p-6 my-8">
        <div className="w-full max-w-xl rounded-3xl border border-rose-500/25 dark:border-rose-500/35 bg-card/85 dark:bg-card/70 p-6 sm:p-9 shadow-2xl backdrop-blur-2xl text-center space-y-6 animate-in fade-in zoom-in-95 duration-200">
          {/* Glowing Warning Icon */}
          <div className="relative mx-auto flex h-16 w-16 items-center justify-center rounded-2xl bg-rose-500/10 text-rose-600 ring-8 ring-rose-500/5 dark:bg-rose-500/20 dark:text-rose-400 dark:ring-rose-500/10">
            <span className="absolute inset-0 rounded-2xl bg-rose-500/20 animate-ping opacity-25" />
            <AlertTriangle className="h-8 w-8 relative z-10" />
          </div>

          {/* Error Tag */}
          <div className="inline-flex items-center gap-1.5 rounded-full border border-rose-500/30 bg-rose-500/10 px-3.5 py-1 text-xs font-semibold text-rose-600 dark:text-rose-400">
            <span className="h-1.5 w-1.5 rounded-full bg-rose-500 animate-pulse" />
            <span>Hệ thống gặp sự cố</span>
            {error.digest && (
              <span className="font-mono text-[10px] opacity-80">
                • Digest: {error.digest.slice(0, 8)}
              </span>
            )}
          </div>

          {/* Title and Description */}
          <div className="space-y-2.5">
            <h1 className="text-2xl sm:text-3xl font-extrabold tracking-tight text-foreground">
              Đã xảy ra lỗi không mong muốn
            </h1>
            <p className="text-sm sm:text-base text-muted-foreground leading-relaxed max-w-md mx-auto">
              Hệ thống {appName} đã ghi nhận cảnh báo. Bạn có thể thử tải lại
              tác vụ hoặc quay về trang chủ.
            </p>
          </div>

          {/* Diagnostic Details Accordion */}
          {error.message && (
            <div className="rounded-2xl border border-border/70 bg-muted/30 dark:bg-zinc-950/40 p-3.5 sm:p-4 text-left transition-all">
              <button
                type="button"
                onClick={() => setShowDetails((v) => !v)}
                className="flex w-full items-center justify-between text-xs font-medium text-muted-foreground hover:text-foreground transition-colors cursor-pointer"
              >
                <span className="flex items-center gap-1.5">
                  <Terminal className="h-3.5 w-3.5 text-rose-500" />
                  <span>Thông tin kỹ thuật dành cho nhà phát triển</span>
                </span>
                {showDetails ? (
                  <ChevronUp className="h-4 w-4" />
                ) : (
                  <ChevronDown className="h-4 w-4" />
                )}
              </button>

              {showDetails && (
                <div className="mt-3.5 space-y-2.5 pt-3 border-t border-border/50 text-xs font-mono">
                  <div className="rounded-xl bg-zinc-950/90 p-3 text-rose-300 border border-rose-500/20 max-h-48 overflow-auto">
                    <p className="font-semibold text-rose-400">
                      {error.name}: {error.message}
                    </p>
                    {error.stack && (
                      <pre className="mt-2 text-[10px] text-zinc-400 whitespace-pre-wrap leading-relaxed">
                        {error.stack}
                      </pre>
                    )}
                  </div>
                  <div className="flex justify-end">
                    <Button
                      type="button"
                      variant="ghost"
                      size="sm"
                      onClick={copyError}
                      className="h-7 text-[11px] gap-1.5 text-muted-foreground hover:text-foreground"
                    >
                      {copied ? (
                        <Check className="h-3 w-3 text-emerald-500" />
                      ) : (
                        <Copy className="h-3 w-3" />
                      )}
                      <span>{copied ? "Đã sao chép" : "Sao chép mã lỗi"}</span>
                    </Button>
                  </div>
                </div>
              )}
            </div>
          )}

          {/* Action Buttons */}
          <div className="flex flex-wrap items-center justify-center gap-3 pt-2">
            {reset && (
              <Button
                type="button"
                onClick={() => reset()}
                className="gap-2 rounded-xl h-10 px-5 text-xs font-medium shadow-md shadow-primary/20 cursor-pointer"
              >
                <RefreshCw className="h-3.5 w-3.5" />
                <span>Thử lại ngay</span>
              </Button>
            )}

            <Button
              variant="outline"
              asChild
              className="gap-2 rounded-xl h-10 px-4 text-xs font-medium"
            >
              <Link href={homeHref}>
                <Home className="h-3.5 w-3.5" />
                <span>Trang chủ VNTEZ</span>
              </Link>
            </Button>
          </div>
        </div>
      </main>

      {/* Bottom Footer */}
      <footer className="relative z-20 w-full border-t border-border/40 bg-background/50 py-4 text-center text-xs text-muted-foreground backdrop-blur-sm">
        <p>
          VNTEZ Identity & Access Management Ecosystem • Bảo vệ và giám sát an
          toàn
        </p>
      </footer>
    </div>
  );
}
