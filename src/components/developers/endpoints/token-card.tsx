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

export function TokenEndpointCard({ copiedKey, onCopy }: Props) {
  const curlCmd = `curl -X POST "https://vntez-iam.vercel.app/oauth/token" \\
  -H "Content-Type: application/json" \\
  -d '{
    "grant_type": "authorization_code",
    "client_id": "vntez_c18f43a315d368109d4d8aca",
    "code": "AUTH_CODE",
    "code_verifier": "PKCE_VERIFIER",
    "redirect_uri": "https://your-app.com/callback"
  }'`;

  const responseJson = `{
  "access_token": "eyJhbGciOiJSUzI1NiIs...",
  "token_type": "Bearer",
  "expires_in": 3600,
  "scope": "openid profile email roles permissions"
}`;

  return (
    <div
      id="ep-token"
      className="scroll-mt-24 rounded-2xl border border-border bg-card p-6 sm:p-8 space-y-5 shadow-xs"
    >
      <div className="flex flex-wrap items-center justify-between gap-3 pb-3 border-b border-border/60">
        <div className="flex items-center gap-3">
          <span className="rounded-md bg-primary/10 text-primary font-mono text-sm font-bold px-3 py-1">
            POST
          </span>
          <h3 className="font-mono text-xl sm:text-2xl font-bold text-foreground">
            /oauth/token
          </h3>
        </div>

        <div className="flex items-center gap-2">
          <Badge variant="outline" className="font-mono text-xs">
            RFC 7636 PKCE S256
          </Badge>
          <Button
            variant="ghost"
            size="sm"
            onClick={() => onCopy(curlCmd, "ep2")}
            className="gap-1.5 text-xs h-8"
          >
            {copiedKey === "ep2" ? (
              <Check className="h-3.5 w-3.5 text-emerald-500" />
            ) : (
              <Copy className="h-3.5 w-3.5" />
            )}
            <span>{copiedKey === "ep2" ? "Đã sao chép" : "Sao chép cURL"}</span>
          </Button>
        </div>
      </div>

      <p className="text-sm sm:text-base text-muted-foreground leading-relaxed font-sans">
        Gửi mã xác thực kèm <code>code_verifier</code> gốc lên server để nhận JWT
        Access Token. Cổng xác thực sẽ đối soát băm SHA-256 và lập tức thu hồi mã
        authorization code để chống tấn công phát lại (Replay Attack).
      </p>

      <div className="grid grid-cols-1 xl:grid-cols-2 gap-6">
        <div className="rounded-xl bg-[#080d16] border border-white/[0.08] p-5 sm:p-6 space-y-3">
          <div className="flex items-center justify-between pb-2 border-b border-white/[0.06]">
            <span className="text-slate-400 font-mono font-bold text-xs">
              {"// Request cURL:"}
            </span>
            <span className="text-[11px] font-mono text-cyan-400">cURL (POST)</span>
          </div>
          <CodeHighlighter code={curlCmd} language="curl" />
        </div>

        <div className="rounded-xl bg-[#080d16] border border-white/[0.08] p-5 sm:p-6 space-y-3">
          <div className="flex items-center justify-between pb-2 border-b border-white/[0.06]">
            <span className="text-emerald-400 font-mono font-bold text-xs">
              {"// Token Response (200 OK):"}
            </span>
            <span className="text-[11px] font-mono text-emerald-400">JSON (200 OK)</span>
          </div>
          <CodeHighlighter code={responseJson} language="json" />
        </div>
      </div>
    </div>
  );
}
