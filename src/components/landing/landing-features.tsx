import React from "react";
import { KeyRound, ShieldCheck, Zap } from "lucide-react";

export function LandingFeatures() {
  return (
    <section className="mx-auto max-w-6xl px-6 py-12">
      <div className="text-center max-w-2xl mx-auto mb-10">
        <h2 className="font-display text-2xl sm:text-3xl font-bold tracking-tight text-slate-900 dark:text-white">
          Được thiết kế cho Hệ sinh thái Doanh nghiệp Hiện đại
        </h2>
        <p className="mt-2 text-sm text-slate-600 dark:text-slate-300">
          Giải quyết triệt để phân mảnh tài khoản, tối ưu trải nghiệm người dùng và bảo đảm toàn vẹn định danh.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {/* Card 1 */}
        <div className="group relative rounded-2xl border border-black/[0.08] dark:border-white/[0.08] bg-white dark:bg-[#0c121e]/80 p-7 shadow-xs hover:shadow-md hover:border-[#fb291a]/40 transition-all duration-200">
          <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-[#fb291a]/10 text-[#fb291a] mb-5">
            <KeyRound className="h-6 w-6" />
          </div>
          <h3 className="font-display text-lg font-bold text-slate-900 dark:text-white group-hover:text-[#fb291a] transition-colors">
            Single Sign-On (SSO)
          </h3>
          <p className="mt-2.5 text-sm text-slate-600 dark:text-slate-300 leading-relaxed font-sans">
            Người dùng chỉ cần đăng nhập một lần duy nhất. Phiên làm việc được chia sẻ liền mạch giữa các ứng dụng vệ tinh mà không phải nhập lại mật khẩu.
          </p>
        </div>

        {/* Card 2 */}
        <div className="group relative rounded-2xl border border-black/[0.08] dark:border-white/[0.08] bg-white dark:bg-[#0c121e]/80 p-7 shadow-xs hover:shadow-md hover:border-emerald-500/40 transition-all duration-200">
          <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-emerald-500/10 text-emerald-500 mb-5">
            <ShieldCheck className="h-6 w-6" />
          </div>
          <h3 className="font-display text-lg font-bold text-slate-900 dark:text-white group-hover:text-emerald-500 transition-colors">
            Bảo mật PKCE S256
          </h3>
          <p className="mt-2.5 text-sm text-slate-600 dark:text-slate-300 leading-relaxed font-sans">
            Áp dụng chuẩn RFC 7636 Proof Key for Code Exchange. Mã ủy quyền được thu hồi ngay lập tức sau khi đổi token, triệt tiêu nguy cơ tấn công đánh chặn.
          </p>
        </div>

        {/* Card 3 */}
        <div className="group relative rounded-2xl border border-black/[0.08] dark:border-white/[0.08] bg-white dark:bg-[#0c121e]/80 p-7 shadow-xs hover:shadow-md hover:border-[#fb291a]/40 transition-all duration-200">
          <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-[#fb291a]/10 text-[#fb291a] mb-5">
            <Zap className="h-6 w-6" />
          </div>
          <h3 className="font-display text-lg font-bold text-slate-900 dark:text-white group-hover:text-[#fb291a] transition-colors">
            Hạ tầng Edge Tốc độ cao
          </h3>
          <p className="mt-2.5 text-sm text-slate-600 dark:text-slate-300 leading-relaxed font-sans">
            Xác thực phân phối tốc độ cao với độ trễ phản hồi cực thấp &lt; 20ms, đảm bảo tính sẵn sàng cao và bảo vệ toàn diện hệ sinh thái.
          </p>
        </div>
      </div>
    </section>
  );
}
