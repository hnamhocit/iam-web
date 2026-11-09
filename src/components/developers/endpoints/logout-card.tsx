"use client";

import React from "react";
import { Copy, Check, ShieldAlert, Zap } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { CodeHighlighter } from "../code-highlighter";

interface Props {
  copiedKey: string | null;
  onCopy: (text: string, key: string) => void;
}

export function LogoutEndpointCard({ copiedKey, onCopy }: Props) {
  const curlCmd = `# 1. Đăng xuất bằng trình duyệt (Chuyển hướng người dùng)
# IAM huỷ phiên SSO cookie và redirect về URL của ứng dụng vệ tinh
https://vntez-iam.vercel.app/auth/logout?redirect_url=https://your-app.com/login

# 2. Hoặc gọi bằng cURL / Fetch API (POST JSON)
curl -X POST "https://vntez-iam.vercel.app/auth/logout" \\
  -H "Content-Type: application/json" \\
  -d '{
    "redirect_url": "https://your-app.com/login"
  }'`;

  const responseJson = `{
  "ok": true,
  "message": "Đăng xuất thành công",
  "redirect_url": "https://your-app.com/login"
}`;

  return (
    <div
      id="ep-logout"
      className="scroll-mt-24 rounded-2xl border border-border bg-card p-6 sm:p-8 space-y-5 shadow-xs"
    >
      <div className="flex flex-wrap items-center justify-between gap-3 pb-3 border-b border-border/60">
        <div className="flex items-center gap-3">
          <span className="rounded-md bg-sky-500/10 text-sky-600 dark:text-sky-400 font-mono text-sm font-bold px-3 py-1">
            GET / POST
          </span>
          <h3 className="font-mono text-xl sm:text-2xl font-bold text-foreground">
            /auth/logout <span className="text-muted-foreground text-sm font-normal font-sans">(hoặc /oauth/logout)</span>
          </h3>
        </div>

        <div className="flex items-center gap-2">
          <Badge variant="outline" className="font-mono text-xs text-primary border-primary/30">
            SSO Single Sign-Out (RFC RP-Initiated)
          </Badge>
          <Button
            variant="ghost"
            size="sm"
            onClick={() => onCopy(curlCmd, "ep5")}
            className="gap-1.5 text-xs h-8"
          >
            {copiedKey === "ep5" ? (
              <Check className="h-3.5 w-3.5 text-emerald-500" />
            ) : (
              <Copy className="h-3.5 w-3.5" />
            )}
            <span>{copiedKey === "ep5" ? "Đã sao chép" : "Sao chép lệnh"}</span>
          </Button>
        </div>
      </div>

      <div className="rounded-xl border border-amber-500/30 bg-amber-500/10 p-4 text-xs sm:text-sm text-foreground space-y-1.5 leading-relaxed">
        <div className="flex items-center gap-2 font-bold text-amber-600 dark:text-amber-400">
          <ShieldAlert className="h-4 w-4 shrink-0" />
          <span>Tại sao không nên kết nối Supabase trực tiếp để đăng xuất?</span>
        </div>
        <p className="text-muted-foreground text-xs leading-relaxed">
          Ứng dụng vệ tinh <strong>không cần và không nên</strong> cài đặt SDK Supabase hay giữ API Key để gọi <code>supabase.auth.signOut()</code> thủ công. Điều này làm lộ cấu hình backend và khiến phiên SSO giữa các ứng dụng bị lệch nhau. Hãy chuyển hướng người dùng hoặc gọi tới endpoint <code>/auth/logout</code> của VNTEZ IAM để toàn bộ cookie SSO được xóa sạch đồng bộ.
        </p>
      </div>

      <div className="space-y-3">
        <h4 className="text-xs font-mono font-bold uppercase tracking-wider text-muted-foreground">
          Tham số Hỗ trợ (Query hoặc JSON Body)
        </h4>
        <div className="overflow-x-auto rounded-xl border border-border">
          <table className="w-full text-left text-xs">
            <thead className="bg-muted/50 border-b border-border text-muted-foreground">
              <tr>
                <th className="p-3 font-mono">Tham số</th>
                <th className="p-3">Kiểu</th>
                <th className="p-3">Mô tả</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-border">
              <tr>
                <td className="p-3 font-mono font-semibold text-primary">redirect_url</td>
                <td className="p-3 font-mono text-muted-foreground">string (tùy chọn)</td>
                <td className="p-3 text-muted-foreground">
                  URL ứng dụng tiếp nhận người dùng sau khi huỷ phiên. Phải thuộc whitelist tên miền được cấp phép (<code>*.vntez.cloud</code>, <code>*.vercel.app</code>, localhost...).
                </td>
              </tr>
              <tr>
                <td className="p-3 font-mono font-semibold text-primary">post_logout_redirect_uri</td>
                <td className="p-3 font-mono text-muted-foreground">string (tùy chọn)</td>
                <td className="p-3 text-muted-foreground">
                  Bí danh chuẩn OpenID Connect RP-Initiated Logout (tương đương với <code>redirect_url</code>).
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>

      <div className="grid grid-cols-1 xl:grid-cols-2 gap-6">
        <div className="rounded-xl bg-[#080d16] border border-white/[0.08] p-5 sm:p-6 space-y-3">
          <div className="flex items-center justify-between pb-2 border-b border-white/[0.06]">
            <span className="text-slate-400 font-mono font-bold text-xs">
              {"// Request Logout Ví dụ:"}
            </span>
            <span className="text-[11px] font-mono text-cyan-400">cURL / HTTP</span>
          </div>
          <CodeHighlighter code={curlCmd} language="curl" />
        </div>

        <div className="rounded-xl bg-[#080d16] border border-white/[0.08] p-5 sm:p-6 space-y-3">
          <div className="flex items-center justify-between pb-2 border-b border-white/[0.06]">
            <span className="text-emerald-400 font-mono font-bold text-xs">
              {"// Response JSON khi gọi API qua POST hoặc Accept JSON:"}
            </span>
            <span className="text-[11px] font-mono text-emerald-400">JSON (200 OK)</span>
          </div>
          <CodeHighlighter code={responseJson} language="json" />
        </div>
      </div>
    </div>
  );
}
