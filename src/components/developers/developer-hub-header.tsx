"use client";

import React from "react";
import { LogIn, FileCode, Sparkles } from "lucide-react";
import { ModeToggle } from "@/components/ThemeToggle";
import { Button } from "@/components/ui/button";
import { VntezLogo } from "@/components/ui/vntez-logo";
import { cn } from "@/lib/utils";

interface DeveloperHubHeaderProps {
  user: {
    id: string;
    email: string;
    name: string;
    avatar: string | null;
  } | null;
  activeTab: "api" | "prompts";
  onTabChange: (tab: "api" | "prompts") => void;
}

export function DeveloperHubHeader({
  user,
  activeTab,
  onTabChange,
}: DeveloperHubHeaderProps) {
  return (
    <header className="sticky top-0 z-40 border-b border-border bg-background/85 backdrop-blur-md">
      <div className="mx-auto flex h-14 max-w-5xl items-center justify-between px-4 sm:px-6 gap-3">
        {/* Left: Brand & Breadcrumb */}
        <div className="flex items-center gap-2.5 sm:gap-3 shrink-0">
          <a
            href="/"
            className="flex items-center gap-2 shrink-0 transition-opacity hover:opacity-85 group"
          >
            <VntezLogo size={24} />
            <span className="font-display font-bold text-base tracking-tight text-foreground group-hover:text-primary transition-colors">
              vntez <span className="text-primary font-mono text-xs">id</span>
            </span>
          </a>
          <span className="text-muted-foreground/30 font-light select-none">/</span>
          <span className="text-xs sm:text-sm font-semibold text-foreground/80 whitespace-nowrap">
            Developers
          </span>
        </div>

        {/* Center Tabs (Desktop) */}
        <div className="hidden md:flex items-center rounded-lg border border-border/60 bg-muted/60 p-1 text-muted-foreground">
          <button
            type="button"
            onClick={() => onTabChange("api")}
            className={cn(
              "inline-flex items-center gap-1.5 rounded-md px-3 py-1 text-xs font-medium transition-all cursor-pointer",
              activeTab === "api"
                ? "bg-background text-foreground font-semibold shadow-xs"
                : "text-muted-foreground hover:text-foreground hover:bg-background/40"
            )}
          >
            <FileCode
              className={cn(
                "h-3.5 w-3.5",
                activeTab === "api" ? "text-primary" : "text-muted-foreground"
              )}
            />
            <span>Tài liệu API</span>
          </button>

          <button
            type="button"
            onClick={() => onTabChange("prompts")}
            className={cn(
              "inline-flex items-center gap-1.5 rounded-md px-3 py-1 text-xs font-medium transition-all cursor-pointer",
              activeTab === "prompts"
                ? "bg-background text-foreground font-semibold shadow-xs"
                : "text-muted-foreground hover:text-foreground hover:bg-background/40"
            )}
          >
            <Sparkles
              className={cn(
                "h-3.5 w-3.5",
                activeTab === "prompts" ? "text-primary" : "text-muted-foreground"
              )}
            />
            <span>Prompts AI</span>
            <span className="rounded-full bg-primary/10 text-primary px-1.5 py-0.2 text-[10px] font-bold">
              Mới
            </span>
          </button>
        </div>

        {/* Right Actions */}
        <div className="flex items-center gap-2 shrink-0">
          {user ? (
            <Button
              variant="ghost"
              size="sm"
              asChild
              className="gap-2 px-2.5 h-8 rounded-lg border border-border/60 hover:bg-secondary/60"
            >
              <a href="https://vntez-console.vercel.app">
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
                <span className="text-xs font-semibold text-foreground max-w-[90px] sm:max-w-[120px] truncate">
                  {user.name}
                </span>
              </a>
            </Button>
          ) : (
            <Button
              size="sm"
              asChild
              className="gap-1.5 rounded-lg text-xs font-semibold h-8"
            >
              <a href="/login">
                <LogIn className="h-3.5 w-3.5" />
                <span>Đăng nhập</span>
              </a>
            </Button>
          )}

          <ModeToggle />
        </div>
      </div>

      {/* Mobile Tab Subnav */}
      <div className="flex md:hidden border-t border-border px-4 py-2 overflow-x-auto gap-1.5 bg-muted/40 scrollbar-none">
        <button
          type="button"
          onClick={() => onTabChange("api")}
          className={cn(
            "inline-flex items-center gap-1.5 rounded-md px-3 py-1.5 text-xs font-medium whitespace-nowrap transition-colors",
            activeTab === "api"
              ? "bg-background text-foreground font-semibold shadow-xs"
              : "text-muted-foreground hover:text-foreground"
          )}
        >
          <FileCode
            className={cn(
              "h-3.5 w-3.5",
              activeTab === "api" ? "text-primary" : "text-muted-foreground"
            )}
          />
          <span>Tài liệu API</span>
        </button>
        <button
          type="button"
          onClick={() => onTabChange("prompts")}
          className={cn(
            "inline-flex items-center gap-1.5 rounded-md px-3 py-1.5 text-xs font-medium whitespace-nowrap transition-colors",
            activeTab === "prompts"
              ? "bg-background text-foreground font-semibold shadow-xs"
              : "text-muted-foreground hover:text-foreground"
          )}
        >
          <Sparkles
            className={cn(
              "h-3.5 w-3.5",
              activeTab === "prompts" ? "text-primary" : "text-muted-foreground"
            )}
          />
          <span>Prompts AI</span>
        </button>
      </div>
    </header>
  );
}
