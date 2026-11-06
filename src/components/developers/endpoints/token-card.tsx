"use client";

import React from "react";
import { Copy, Check } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";

interface Props {
  copiedKey: string | null;
  onCopy: (text: string, key: string) => void;
}

export function TokenEndpointCard({ copiedKey, onCopy }: Props) {
  const curlCmd = `curl -X POST "https://vntez-id.vercel.app/oauth/token" \\
  -H "Content-Type: application/json" \\
  -d '{
    "grant_type": "authorization_code",
    "client_id": "vntez_c18f43a315d368109d4d8aca",
    "code": "AUTH_CODE_RECEIVED",
    "code_verifier": "ORIGINAL_CODE_VERIFIER",
    "redirect_uri": "https://your-app.com/callback"
  }'`;

  return (
    <div
      id="ep-token"
      className="scroll-mt-24 rounded-2xl border border-border bg-card p-6 sm:p-8 space-y-5 shadow-xs"
    >
      <div className="flex flex-wrap items-center justify-between gap-3 pb-3 border-b border-border/60">
        <div className="flex items-center gap-3">
          <span className="rounded-md bg-primary/10 text-primary font-mono text-xs font-bold px-2.5 py-1">
            POST
          </span>
          <h3 className="font-mono text-lg sm:text-xl font-bold text-foreground">
            /oauth/token
          </h3>
        </div>

        <div className="flex items-center gap-2">
          <Badge variant="outline" className="font-mono text-[11px]">
            application/json
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

      <p className="text-sm text-muted-foreground leading-relaxed font-sans">
        Gửi mã xác thực kèm <code>code_verifier</code> gốc lên server để nhận JWT
        Access Token. Cổng xác thực sẽ đối soát băm SHA-256 và lập tức thu hồi mã
        authorization code để chống tấn công phát lại (Replay Attack).
      </p>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
        <div className="rounded-xl bg-[#080d16] border border-white/[0.08] p-4 sm:p-5 font-mono text-xs leading-relaxed text-slate-200 overflow-x-auto space-y-2">
          <span className="text-slate-400 block font-bold text-[11px]">
            {"// Request cURL:"}
          </span>
          <pre className="whitespace-pre">
{`curl -X POST https://vntez-id.vercel.app/oauth/token \\
  -H "Content-Type: application/json" \\
  -d '{
    "grant_type": "authorization_code",
    "client_id": "vntez_c18f43a315d368109d4d8aca",
    "code": "AUTH_CODE",
    "code_verifier": "PKCE_VERIFIER",
    "redirect_uri": "https://your-app.com/callback"
  }'`}
          </pre>
        </div>

        <div className="rounded-xl bg-[#080d16] border border-white/[0.08] p-4 sm:p-5 font-mono text-xs leading-relaxed text-slate-200 overflow-x-auto space-y-2">
          <span className="text-emerald-400 block font-bold text-[11px]">
            {"// Response (200 OK):"}
          </span>
          <pre className="whitespace-pre text-emerald-300">
{`{
  "access_token": "eyJhbGciOiJSUzI1NiIs...",
  "token_type": "Bearer",
  "expires_in": 3600,
  "scope": "openid profile email"
}`}
          </pre>
        </div>
      </div>
    </div>
  );
}
