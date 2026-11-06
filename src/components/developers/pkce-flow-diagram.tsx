import React from "react";
import { Layers } from "lucide-react";
import { Badge } from "@/components/ui/badge";

export function PkceFlowDiagram() {
  return (
    <div
      id="flow"
      className="scroll-mt-24 rounded-2xl border border-border bg-card p-6 sm:p-8 space-y-6 shadow-xs"
    >
      <div className="flex flex-wrap items-center justify-between gap-3 pb-4 border-b border-border/60">
        <div className="flex items-center gap-3">
          <Layers className="size-5 text-primary" />
          <h2 className="font-display text-xl sm:text-2xl font-bold text-foreground">
            1. Sơ đồ Luồng Xác thực OAuth 2.0 PKCE
          </h2>
        </div>
        <Badge variant="outline" className="font-mono text-xs font-semibold">
          RFC 7636 & RFC 6749
        </Badge>
      </div>

      <p className="text-sm text-muted-foreground leading-relaxed font-sans">
        Quy trình ủy quyền 4 bước sử dụng mã bảo vệ động (Proof Key for Code
        Exchange) thay thế hoàn toàn secret tĩnh ở máy khách, triệt tiêu nguy cơ
        bị đánh chặn mã ủy quyền.
      </p>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 pt-1">
        <div className="rounded-xl border border-border/70 bg-muted/30 p-4 space-y-2">
          <div className="flex items-center justify-between">
            <span className="font-mono text-xs font-bold text-primary bg-primary/10 px-2 py-0.5 rounded-md">
              Bước 1
            </span>
            <span className="text-[11px] font-mono text-muted-foreground">
              Client ➔ Gateway
            </span>
          </div>
          <h4 className="font-bold text-sm text-foreground">
            Chuyển hướng đăng nhập
          </h4>
          <p className="text-xs text-muted-foreground leading-relaxed">
            Sinh <code>code_verifier</code> và băm SHA-256 tạo{" "}
            <code>code_challenge</code>, chuyển hướng người dùng tới{" "}
            <code>/oauth/authorize</code>.
          </p>
        </div>

        <div className="rounded-xl border border-border/70 bg-muted/30 p-4 space-y-2">
          <div className="flex items-center justify-between">
            <span className="font-mono text-xs font-bold text-emerald-600 dark:text-emerald-400 bg-emerald-500/10 px-2 py-0.5 rounded-md">
              Bước 2
            </span>
            <span className="text-[11px] font-mono text-muted-foreground">
              VNTEZ ID
            </span>
          </div>
          <h4 className="font-bold text-sm text-foreground">
            Cấp Authorization Code
          </h4>
          <p className="text-xs text-muted-foreground leading-relaxed">
            Xác thực người dùng một chạm, trả về mã <code>code</code> qua URL
            redirect (hết hạn sau 5 phút, chỉ dùng 1 lần).
          </p>
        </div>

        <div className="rounded-xl border border-border/70 bg-muted/30 p-4 space-y-2">
          <div className="flex items-center justify-between">
            <span className="font-mono text-xs font-bold text-primary bg-primary/10 px-2 py-0.5 rounded-md">
              Bước 3
            </span>
            <span className="text-[11px] font-mono text-muted-foreground">
              App ➔ Gateway
            </span>
          </div>
          <h4 className="font-bold text-sm text-foreground">Đổi mã lấy Token</h4>
          <p className="text-xs text-muted-foreground leading-relaxed">
            Gửi POST tới <code>/oauth/token</code> cùng <code>code</code> và{" "}
            <code>code_verifier</code> để nhận JWT Access Token.
          </p>
        </div>

        <div className="rounded-xl border border-border/70 bg-muted/30 p-4 space-y-2">
          <div className="flex items-center justify-between">
            <span className="font-mono text-xs font-bold text-sky-600 dark:text-sky-400 bg-sky-500/10 px-2 py-0.5 rounded-md">
              Bước 4
            </span>
            <span className="text-[11px] font-mono text-muted-foreground">
              Resource API
            </span>
          </div>
          <h4 className="font-bold text-sm text-foreground">
            Lấy hồ sơ tài khoản
          </h4>
          <p className="text-xs text-muted-foreground leading-relaxed">
            Đính kèm Bearer token gửi GET tới <code>/oauth/userinfo</code> để
            nhận thông tin định danh <code>sub</code>, <code>email</code>,{" "}
            <code>name</code>.
          </p>
        </div>
      </div>
    </div>
  );
}
