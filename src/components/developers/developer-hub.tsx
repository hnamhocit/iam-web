"use client";

import React, { useEffect, useState } from "react";
import { Sparkles, ExternalLink } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { DeveloperHubHeader } from "./developer-hub-header";
import { PkceFlowDiagram } from "./pkce-flow-diagram";
import { EndpointsSpecCards } from "./endpoints-spec-cards";
import { AiPromptsTab } from "./ai-prompts-tab";

export { MASTER_PROMPT } from "./developer-hub-data";

interface DeveloperHubProps {
  user: {
    id: string;
    email: string;
    name: string;
    avatar: string | null;
  } | null;
  siteUrl?: string;
}

export function DeveloperHub({ user }: DeveloperHubProps) {
  const [activeTab, setActiveTab] = useState<"api" | "prompts">("api");

  // Read query param ?tab=prompts from URL
  useEffect(() => {
    if (typeof window !== "undefined") {
      const params = new URLSearchParams(window.location.search);
      const tab = params.get("tab");
      if (tab === "prompts" || tab === "api") {
        setActiveTab(tab);
      }
    }
  }, []);

  const changeTab = (tab: "api" | "prompts") => {
    setActiveTab(tab);
    if (typeof window !== "undefined") {
      const url = new URL(window.location.href);
      url.searchParams.set("tab", tab);
      window.history.replaceState(null, "", url.toString());
    }
  };

  return (
    <div className="min-h-screen bg-background text-foreground transition-colors selection:bg-primary/25 selection:text-primary">
      <DeveloperHubHeader
        user={user}
        activeTab={activeTab}
        onTabChange={changeTab}
      />

      <main className="w-full max-w-[1700px] mx-auto px-4 sm:px-8 lg:px-12 xl:px-16 py-10 sm:py-16 space-y-12">
        {/* Page Hero Header */}
        <div className="text-center max-w-3xl mx-auto space-y-4">
          <Badge
            variant="brand"
            className="font-mono uppercase tracking-wider text-xs px-3 py-1"
          >
            VNTEZ IAM SPECIFICATION
          </Badge>

          <h1 className="font-display text-3xl sm:text-4xl lg:text-5xl font-extrabold tracking-tight text-foreground leading-[1.15]">
            Tài liệu kỹ thuật & <br />
            <span className="text-primary">OAuth 2.0 PKCE Endpoints.</span>
          </h1>

          <p className="text-sm sm:text-base text-muted-foreground leading-relaxed font-sans max-w-2xl mx-auto">
            Hướng dẫn chi tiết tích hợp Single Sign-On (SSO) theo chuẩn RFC 6749 và
            RFC 7636. Kết nối các ứng dụng trong hệ sinh thái an toàn, không cần
            Client Secret tĩnh ở client.
          </p>

          {/* Quick Links Navigation Pills */}
          <div className="flex flex-wrap items-center justify-center gap-2 pt-2">
            <a
              href="#flow"
              className="rounded-full border border-border bg-card px-3.5 py-1.5 text-xs font-semibold text-muted-foreground hover:border-primary/40 hover:text-primary transition-all"
            >
              Sơ đồ luồng PKCE
            </a>
            <a
              href="#ep-authorize"
              className="rounded-full border border-border bg-card px-3.5 py-1.5 text-xs font-semibold text-muted-foreground hover:border-primary/40 hover:text-primary transition-all"
            >
              GET /oauth/authorize
            </a>
            <a
              href="#ep-token"
              className="rounded-full border border-border bg-card px-3.5 py-1.5 text-xs font-semibold text-muted-foreground hover:border-primary/40 hover:text-primary transition-all"
            >
              POST /oauth/token
            </a>
            <a
              href="#ep-userinfo"
              className="rounded-full border border-border bg-card px-3.5 py-1.5 text-xs font-semibold text-muted-foreground hover:border-primary/40 hover:text-primary transition-all"
            >
              GET /oauth/userinfo
            </a>
            <a
              href="#ep-logout"
              className="rounded-full border border-border bg-card px-3.5 py-1.5 text-xs font-semibold text-muted-foreground hover:border-primary/40 hover:text-primary transition-all"
            >
              GET/POST /auth/logout
            </a>
            <a
              href="#ep-discovery"
              className="rounded-full border border-border bg-card px-3.5 py-1.5 text-xs font-semibold text-muted-foreground hover:border-primary/40 hover:text-primary transition-all"
            >
              Discovery OIDC
            </a>
          </div>
        </div>

        {/* TAB 1: API & Sơ đồ Luồng */}
        {activeTab === "api" && (
          <div className="space-y-10">
            <PkceFlowDiagram />
            <EndpointsSpecCards />

            {/* Support / Quick Action Footer Card */}
            <div className="rounded-2xl border border-border/80 bg-muted/20 p-6 sm:p-8 flex flex-col sm:flex-row items-center justify-between gap-6">
              <div className="space-y-1.5 text-center sm:text-left">
                <h3 className="font-display text-lg sm:text-xl font-bold text-foreground">
                  Cần mẫu Prompt cho AI để sinh mã tự động?
                </h3>
                <p className="text-xs sm:text-sm text-muted-foreground">
                  Chuyển sang tab &quot;Prompts AI&quot; để copy 1-click prompt tối
                  ưu cho Cursor, Claude Code, Windsurf.
                </p>
              </div>

              <div className="flex items-center gap-3 shrink-0">
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => changeTab("prompts")}
                  className="rounded-xl font-semibold gap-1.5 h-9"
                >
                  <Sparkles className="size-4 text-primary" />
                  <span>Xem Prompts AI</span>
                </Button>
                <Button
                  size="sm"
                  asChild
                  className="rounded-xl font-semibold shadow-xs h-9"
                >
                  <a
                    href="https://vntez-console.vercel.app"
                    target="_blank"
                    rel="noreferrer"
                    className="gap-1.5"
                  >
                    <span>Mở VNTEZ Console</span>
                    <ExternalLink className="size-3.5" />
                  </a>
                </Button>
              </div>
            </div>
          </div>
        )}

        {/* TAB 2: Prompts cho AI */}
        {activeTab === "prompts" && <AiPromptsTab />}
      </main>
    </div>
  );
}
