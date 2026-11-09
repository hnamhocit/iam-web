"use client";

import React from "react";
import { Copy, Check } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { CodeHighlighter } from "../code-highlighter";

interface Props {
  copiedKey: string | null;
  onCopy: (text: string, key: string) => void;
}

export function UserinfoEndpointCard({ copiedKey, onCopy }: Props) {
  const curlCmd = `curl -X GET "https://vntez-iam.vercel.app/oauth/userinfo" \\
  -H "Authorization: Bearer <access_token>"`;

  const profileJson = `{
  "sub": "usr_94e21a8c-7f5b-42b1",
  "email": "developer@vntez.com",
  "email_verified": true,
  "name": "Hoàng Nam",
  "avatar": "https://avatars.githubusercontent.com/u/102873",
  "picture": "https://avatars.githubusercontent.com/u/102873",
  "app_id": null,
  "role": "admin",
  "roles": [
    "admin"
  ],
  "permissions": [
    "*:*"
  ]
}`;

  return (
    <div
      id="ep-userinfo"
      className="scroll-mt-24 rounded-2xl border border-border bg-card p-6 sm:p-8 space-y-5 shadow-xs"
    >
      <div className="flex flex-wrap items-center justify-between gap-3 pb-3 border-b border-border/60">
        <div className="flex items-center gap-3">
          <span className="rounded-md bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 font-mono text-sm font-bold px-3 py-1">
            GET
          </span>
          <h3 className="font-mono text-xl sm:text-2xl font-bold text-foreground">
            /oauth/userinfo
          </h3>
        </div>

        <div className="flex items-center gap-2">
          <Badge variant="outline" className="font-mono text-xs">
            Bearer Token & App-Scoped RBAC
          </Badge>
          <Button
            variant="ghost"
            size="sm"
            onClick={() => onCopy(curlCmd, "ep3")}
            className="gap-1.5 text-xs h-8"
          >
            {copiedKey === "ep3" ? (
              <Check className="h-3.5 w-3.5 text-emerald-500" />
            ) : (
              <Copy className="h-3.5 w-3.5" />
            )}
            <span>{copiedKey === "ep3" ? "Đã sao chép" : "Sao chép cURL"}</span>
          </Button>
        </div>
      </div>

      <p className="text-sm sm:text-base text-muted-foreground leading-relaxed font-sans">
        Truy vấn thông tin định danh và ma trận quyền hạn (RBAC) đã được đồng bộ.
        Mặc định trả về quyền Root hệ thống (<code>app_id: null</code>). Để lấy quyền chuyên biệt theo từng app vệ tinh, truyền thêm query <code>?app_id=&lt;appId&gt;</code> hoặc header <code>X-App-Id: &lt;appId&gt;</code>.
      </p>

      <div className="grid grid-cols-1 xl:grid-cols-2 gap-6">
        <div className="rounded-xl bg-[#080d16] border border-white/[0.08] p-5 sm:p-6 space-y-3">
          <div className="flex items-center justify-between pb-2 border-b border-white/[0.06]">
            <span className="text-slate-400 font-mono font-bold text-xs">
              {"// Request cURL:"}
            </span>
            <span className="text-[11px] font-mono text-cyan-400">cURL (REST)</span>
          </div>
          <CodeHighlighter code={curlCmd} language="curl" />
        </div>

        <div className="rounded-xl bg-[#080d16] border border-white/[0.08] p-5 sm:p-6 space-y-3">
          <div className="flex items-center justify-between pb-2 border-b border-white/[0.06]">
            <span className="text-emerald-400 font-mono font-bold text-xs">
              {"// Profile & Scoped RBAC JSON (200 OK):"}
            </span>
            <span className="text-[11px] font-mono text-emerald-400">JSON (200 OK)</span>
          </div>
          <CodeHighlighter code={profileJson} language="json" />
        </div>
      </div>
    </div>
  );
}
