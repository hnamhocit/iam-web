"use client";

import React from "react";
import { Copy, Check } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";

interface Props {
  copiedKey: string | null;
  onCopy: (text: string, key: string) => void;
}

export function UserinfoEndpointCard({ copiedKey, onCopy }: Props) {
  const curlCmd = `curl -X GET "https://vntez-id.vercel.app/oauth/userinfo" \\
  -H "Authorization: Bearer <access_token>"`;

  return (
    <div
      id="ep-userinfo"
      className="scroll-mt-24 rounded-2xl border border-border bg-card p-6 sm:p-8 space-y-5 shadow-xs"
    >
      <div className="flex flex-wrap items-center justify-between gap-3 pb-3 border-b border-border/60">
        <div className="flex items-center gap-3">
          <span className="rounded-md bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 font-mono text-xs font-bold px-2.5 py-1">
            GET
          </span>
          <h3 className="font-mono text-lg sm:text-xl font-bold text-foreground">
            /oauth/userinfo
          </h3>
        </div>

        <div className="flex items-center gap-2">
          <Badge variant="outline" className="font-mono text-[11px]">
            Bearer Token
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

      <p className="text-sm text-muted-foreground leading-relaxed font-sans">
        Truy vấn thông tin hồ sơ tài khoản người dùng đã được định danh và xác thực
        qua header <code>Authorization: Bearer &lt;access_token&gt;</code>.
      </p>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
        <div className="rounded-xl bg-[#080d16] border border-white/[0.08] p-4 sm:p-5 font-mono text-xs leading-relaxed text-slate-200 overflow-x-auto space-y-2">
          <span className="text-slate-400 block font-bold text-[11px]">
            {"// Request cURL:"}
          </span>
          <pre className="whitespace-pre">
{`curl -X GET https://vntez-id.vercel.app/oauth/userinfo \\
  -H "Authorization: Bearer <access_token>"`}
          </pre>
        </div>

        <div className="rounded-xl bg-[#080d16] border border-white/[0.08] p-4 sm:p-5 font-mono text-xs leading-relaxed text-slate-200 overflow-x-auto space-y-2">
          <span className="text-emerald-400 block font-bold text-[11px]">
            {"// Profile JSON (200 OK):"}
          </span>
          <pre className="whitespace-pre text-emerald-300">
{`{
  "sub": "usr_94e21a8c-7f5b-42b1",
  "email": "developer@vntez.com",
  "name": "Hoàng Nam",
  "avatar": "https://avatars.githubusercontent.com/u/102873"
}`}
          </pre>
        </div>
      </div>
    </div>
  );
}
