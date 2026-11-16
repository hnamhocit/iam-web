"use client";

import type React from "react";
import { Button } from "@/components/ui/button";
import { safeReturnTo } from "@/lib/redirect";
import { createClient } from "@/lib/supabase/client";
import { cn } from "@/lib/utils";
import { type Provider, useAuthStore } from "@/stores/auth.store";

interface SocialButtonProps {
  provider: Provider;
  label: string;
  icon: React.ReactNode;
  className?: string;
}

export function SocialButton({
  provider,
  label,
  icon,
  className,
}: SocialButtonProps) {
  const { isLoading, startLoading, stopLoading, setError, clearError } =
    useAuthStore();
  const isThisLoading = isLoading === provider;
  const isAnyLoading = isLoading !== null;

  const handleClick = async () => {
    if (isAnyLoading) return;
    clearError();
    startLoading(provider);
    try {
      const raw = new URLSearchParams(window.location.search).get(
        "redirect_url",
      );
      const returnTo = safeReturnTo(raw);

      // Khởi tạo Supabase client chuẩn trình duyệt để lưu PKCE verifier trực tiếp vào cookie
      const supabase = createClient();
      const redirectUri = new URL(`${window.location.origin}/auth/callback`);
      if (returnTo) {
        redirectUri.searchParams.set("redirect_url", returnTo);
      }

      const { data, error } = await supabase.auth.signInWithOAuth({
        provider,
        options: {
          redirectTo: redirectUri.toString(),
        },
      });

      if (error) {
        throw error;
      }

      if (data?.url) {
        window.location.href = data.url;
        return;
      }
    } catch (err: any) {
      console.error(`[SocialButton] OAuth ${provider} error:`, err);
      stopLoading();
      setError(
        err instanceof Error ? err.message : "Đã xảy ra lỗi khi đăng nhập.",
      );
    }
  };

  const providerStyles = {
    google:
      "hover:border-slate-300 dark:hover:border-slate-700 hover:bg-slate-50/80 dark:hover:bg-slate-900/60 shadow-xs hover:shadow-sm",
    github:
      "hover:border-slate-400 dark:hover:border-slate-600 hover:bg-slate-50/80 dark:hover:bg-slate-900/60 shadow-xs hover:shadow-sm",
    facebook:
      "hover:border-blue-400 dark:hover:border-blue-800 hover:bg-blue-50/50 dark:hover:bg-blue-950/20 shadow-xs hover:shadow-sm",
  }[provider];

  return (
    <Button
      type="button"
      variant="outline"
      onClick={handleClick}
      disabled={isAnyLoading}
      className={cn(
        "group relative flex h-12 w-full items-center justify-center gap-3.5 rounded-2xl border border-border/80 bg-card/90 px-4 text-sm font-semibold text-foreground backdrop-blur-sm transition-all duration-200 active:scale-[0.98] disabled:cursor-not-allowed disabled:opacity-50 cursor-pointer",
        providerStyles,
        className,
      )}
    >
      <span className="flex h-5 w-5 items-center justify-center transition-transform group-hover:scale-105 duration-200 shrink-0">
        {icon}
      </span>
      <span className="tracking-tight text-foreground/90 font-medium">
        {label}
      </span>

      {isThisLoading && (
        <div className="absolute inset-0 flex items-center justify-center rounded-2xl bg-background/85 backdrop-blur-md">
          <span className="h-5 w-5 animate-spin rounded-full border-2 border-primary border-t-transparent" />
        </div>
      )}
    </Button>
  );
}
