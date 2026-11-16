"use client";

import { ArrowRight } from "lucide-react";
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
      "hover:border-stone-400 dark:hover:border-stone-600 hover:bg-stone-50 dark:hover:bg-stone-900/60",
    github:
      "hover:border-stone-500 dark:hover:border-stone-500 hover:bg-stone-50 dark:hover:bg-stone-900/60",
    facebook:
      "hover:border-blue-500 dark:hover:border-blue-600 hover:bg-blue-50/50 dark:hover:bg-blue-950/25",
  }[provider];

  return (
    <Button
      type="button"
      variant="outline"
      onClick={handleClick}
      disabled={isAnyLoading}
      className={cn(
        "group relative flex h-11 w-full items-center justify-between rounded-xl border border-[#E7E5E4] dark:border-stone-800 bg-white dark:bg-card px-4 text-sm font-medium text-[#1C1917] dark:text-stone-100 shadow-[0_1px_3px_rgba(28,25,23,0.03)] transition-all duration-200 active:scale-[0.99] disabled:cursor-not-allowed disabled:opacity-50 cursor-pointer",
        providerStyles,
        className,
      )}
    >
      <div className="flex items-center gap-3 min-w-0">
        <span className="flex h-5 w-5 items-center justify-center shrink-0">
          {icon}
        </span>
        <span className="tracking-tight text-foreground font-medium truncate">
          {label}
        </span>
      </div>

      <ArrowRight className="h-4 w-4 text-[#78716C] dark:text-stone-400 transition-all duration-200 group-hover:translate-x-0.5 group-hover:text-[#1C1917] dark:group-hover:text-stone-100 shrink-0 ml-2" />

      {isThisLoading && (
        <div className="absolute inset-0 flex items-center justify-center rounded-xl bg-background/90 backdrop-blur-sm">
          <span className="h-4 w-4 animate-spin rounded-full border-2 border-primary border-t-transparent" />
        </div>
      )}
    </Button>
  );
}
