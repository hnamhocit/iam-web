"use client";

import React from "react";
import { Copy, Check } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { CANONICAL_GATEWAY_URL } from "../developer-hub-data";

interface Props {
  copiedKey: string | null;
  onCopy: (text: string, key: string) => void;
}

export function AuthorizeEndpointCard({ copiedKey, onCopy }: Props) {
  const url = `${CANONICAL_GATEWAY_URL}/oauth/authorize?client_id=vntez_c18f43a315d368109d4d8aca&redirect_uri=https://your-app.com/callback&response_type=code&state=xyz123abc&code_challenge=E9Melhoa2OwvFrEMTJguCHaoeK1t8URWbuGJSstw-cM&code_challenge_method=S256`;

  return (
    <div
      id="ep-authorize"
      className="scroll-mt-24 rounded-2xl border border-border bg-card p-6 sm:p-8 space-y-5 shadow-xs"
    >
      <div className="flex flex-wrap items-center justify-between gap-3 pb-3 border-b border-border/60">
        <div className="flex items-center gap-3">
          <span className="rounded-md bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 font-mono text-xs font-bold px-2.5 py-1">
            GET
          </span>
          <h3 className="font-mono text-lg sm:text-xl font-bold text-foreground">
            /oauth/authorize
          </h3>
        </div>

        <div className="flex items-center gap-2">
          <Badge variant="outline" className="font-mono text-[11px]">
            RFC 6749 §4.1.1
          </Badge>
          <Button
            variant="ghost"
            size="sm"
            onClick={() => onCopy(url, "ep1")}
            className="gap-1.5 text-xs h-8"
          >
            {copiedKey === "ep1" ? (
              <Check className="h-3.5 w-3.5 text-emerald-500" />
            ) : (
              <Copy className="h-3.5 w-3.5" />
            )}
            <span>{copiedKey === "ep1" ? "Đã sao chép" : "Sao chép URL"}</span>
          </Button>
        </div>
      </div>

      <p className="text-sm text-muted-foreground leading-relaxed font-sans">
        Màn hình xác thực và phê duyệt ủy quyền. Sau khi người dùng đồng ý, cổng
        VNTEZ ID phát sinh mã <code>code</code> và chuyển hướng trình duyệt về{" "}
        <code>redirect_uri?code=...&state=...</code>.
      </p>

      <div className="rounded-xl border border-border/60 bg-muted/20 p-4 space-y-2.5 text-xs">
        <div className="font-semibold text-foreground text-xs uppercase tracking-wider font-mono">
          Tham số Query (Query Parameters):
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-muted-foreground">
          <div>
            <code className="text-foreground font-semibold">client_id</code>:
            Client ID đã được cấp (bắt buộc)
          </div>
          <div>
            <code className="text-foreground font-semibold">redirect_uri</code>:
            URL callback đã đăng ký (bắt buộc)
          </div>
          <div>
            <code className="text-foreground font-semibold">response_type</code>:
            Cố định là <code>code</code> (bắt buộc)
          </div>
          <div>
            <code className="text-foreground font-semibold">state</code>: Chuỗi
            ngẫu nhiên 32 ký tự chống CSRF (bắt buộc)
          </div>
          <div>
            <code className="text-foreground font-semibold">code_challenge</code>:
            SHA-256 base64url của verifier (bắt buộc)
          </div>
          <div>
            <code className="text-foreground font-semibold">
              code_challenge_method
            </code>
            : Cố định là <code>S256</code> (bắt buộc)
          </div>
        </div>
      </div>

      <div className="rounded-xl bg-[#080d16] border border-white/[0.08] p-4 sm:p-5 font-mono text-xs sm:text-[13px] leading-relaxed text-slate-200 overflow-x-auto">
        <pre className="whitespace-pre">
{`GET https://vntez-id.vercel.app/oauth/authorize
  ?client_id=vntez_c18f43a315d368109d4d8aca
  &redirect_uri=https://your-app.com/callback
  &response_type=code
  &state=xyz123abc
  &code_challenge=E9Melhoa2OwvFrEMTJguCHaoeK1t8URWbuGJSstw-cM
  &code_challenge_method=S256`}
        </pre>
      </div>
    </div>
  );
}
