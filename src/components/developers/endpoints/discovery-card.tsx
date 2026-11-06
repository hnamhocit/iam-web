"use client";

import React from "react";
import { Copy, Check } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";

interface Props {
  copiedKey: string | null;
  onCopy: (text: string, key: string) => void;
}

export function DiscoveryEndpointCard({ copiedKey, onCopy }: Props) {
  const url = "https://vntez-id.vercel.app/.well-known/openid-configuration";

  return (
    <div
      id="ep-discovery"
      className="scroll-mt-24 rounded-2xl border border-border bg-card p-6 sm:p-8 space-y-5 shadow-xs"
    >
      <div className="flex flex-wrap items-center justify-between gap-3 pb-3 border-b border-border/60">
        <div className="flex items-center gap-3">
          <span className="rounded-md bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 font-mono text-xs font-bold px-2.5 py-1">
            GET
          </span>
          <h3 className="font-mono text-lg sm:text-xl font-bold text-foreground">
            /.well-known/openid-configuration
          </h3>
        </div>

        <div className="flex items-center gap-2">
          <Badge variant="outline" className="font-mono text-[11px]">
            OIDC Discovery 1.0
          </Badge>
          <Button
            variant="ghost"
            size="sm"
            onClick={() => onCopy(url, "ep4")}
            className="gap-1.5 text-xs h-8"
          >
            {copiedKey === "ep4" ? (
              <Check className="h-3.5 w-3.5 text-emerald-500" />
            ) : (
              <Copy className="h-3.5 w-3.5" />
            )}
            <span>{copiedKey === "ep4" ? "Đã sao chép" : "Sao chép URL"}</span>
          </Button>
        </div>
      </div>

      <p className="text-sm text-muted-foreground leading-relaxed font-sans">
        Metadata cấu hình chuẩn OpenID Connect. Thư viện OAuth Client (NextAuth,
        Passport, Auth.js) có thể đọc endpoint này để tự động cấu hình toàn bộ URL
        xác thực.
      </p>

      <div className="rounded-xl bg-[#080d16] border border-white/[0.08] p-4 sm:p-5 font-mono text-xs sm:text-[13px] leading-relaxed text-slate-200 overflow-x-auto">
        <pre className="whitespace-pre">
{`curl -X GET https://vntez-id.vercel.app/.well-known/openid-configuration`}
        </pre>
      </div>
    </div>
  );
}
