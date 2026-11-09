import React from "react";

export function LandingEndpoints() {
  return (
    <section
      id="endpoints"
      className="w-full max-w-[1700px] mx-auto px-4 sm:px-8 lg:px-12 xl:px-16 py-16 border-t border-black/[0.04] dark:border-white/[0.04]"
    >
      <div className="text-center max-w-2xl mx-auto mb-10">
        <h2 className="font-display text-2xl sm:text-3xl font-bold tracking-tight text-slate-900 dark:text-white">
          4 Endpoints Chuẩn REST Tích hợp Độc lập
        </h2>
        <p className="mt-2 text-sm text-slate-600 dark:text-slate-300">
          Không cần cài đặt SDK nặng nề. Bất kỳ ngôn ngữ lập trình nào hỗ trợ HTTP request đều có thể kết nối ngay lập tức.
        </p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {/* Endpoint 1 */}
        <div className="rounded-2xl border border-black/[0.08] dark:border-white/[0.08] bg-white dark:bg-[#0c121e]/80 p-6 shadow-xs flex flex-col justify-between">
          <div>
            <div className="flex items-center justify-between gap-2 mb-3">
              <span className="rounded-md bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 font-mono text-xs font-bold px-2 py-0.5">
                GET
              </span>
              <span className="text-[11px] font-mono text-slate-500">Bước 1</span>
            </div>
            <h4 className="font-mono text-sm font-bold text-slate-900 dark:text-white">
              /oauth/authorize
            </h4>
            <p className="mt-2 text-xs text-slate-600 dark:text-slate-300 leading-relaxed font-sans">
              Chuyển hướng người dùng sang trang cấp quyền kèm <code>client_id</code>, <code>redirect_uri</code> và <code>code_challenge</code> PKCE.
            </p>
          </div>
        </div>

        {/* Endpoint 2 */}
        <div className="rounded-2xl border border-black/[0.08] dark:border-white/[0.08] bg-white dark:bg-[#0c121e]/80 p-6 shadow-xs flex flex-col justify-between">
          <div>
            <div className="flex items-center justify-between gap-2 mb-3">
              <span className="rounded-md bg-[#fb291a]/10 text-[#fb291a] font-mono text-xs font-bold px-2 py-0.5">
                POST
              </span>
              <span className="text-[11px] font-mono text-slate-500">Bước 2</span>
            </div>
            <h4 className="font-mono text-sm font-bold text-slate-900 dark:text-white">
              /oauth/token
            </h4>
            <p className="mt-2 text-xs text-slate-600 dark:text-slate-300 leading-relaxed font-sans">
              Gửi payload gồm <code>code</code> và <code>code_verifier</code>. Cổng VNTEZ IAM xác thực băm SHA-256 và cấp phát JWT Access Token.
            </p>
          </div>
        </div>

        {/* Endpoint 3 */}
        <div className="rounded-2xl border border-black/[0.08] dark:border-white/[0.08] bg-white dark:bg-[#0c121e]/80 p-6 shadow-xs flex flex-col justify-between">
          <div>
            <div className="flex items-center justify-between gap-2 mb-3">
              <span className="rounded-md bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 font-mono text-xs font-bold px-2 py-0.5">
                GET
              </span>
              <span className="text-[11px] font-mono text-slate-500">Bước 3</span>
            </div>
            <h4 className="font-mono text-sm font-bold text-slate-900 dark:text-white">
              /oauth/userinfo
            </h4>
            <p className="mt-2 text-xs text-slate-600 dark:text-slate-300 leading-relaxed font-sans">
              Header <code>Authorization: Bearer &lt;token&gt;</code> (kèm <code>?app_id=&lt;app&gt;</code>) nhận hồ sơ OIDC và ma trận quyền hạn: <code>sub</code>, <code>email</code>, <code>name</code>, <code>avatar</code>, <code>role</code>, <code>permissions</code>.
            </p>
          </div>
        </div>

        {/* Endpoint 4 */}
        <div className="rounded-2xl border border-black/[0.08] dark:border-white/[0.08] bg-white dark:bg-[#0c121e]/80 p-6 shadow-xs flex flex-col justify-between">
          <div>
            <div className="flex items-center justify-between gap-2 mb-3">
              <span className="rounded-md bg-sky-500/10 text-sky-600 dark:text-sky-400 font-mono text-xs font-bold px-2 py-0.5">
                GET / POST
              </span>
              <span className="text-[11px] font-mono text-slate-500">Bước 4</span>
            </div>
            <h4 className="font-mono text-sm font-bold text-slate-900 dark:text-white">
              /auth/logout
            </h4>
            <p className="mt-2 text-xs text-slate-600 dark:text-slate-300 leading-relaxed font-sans">
              Đăng xuất SSO tập trung (RP-Initiated). Kèm <code>redirect_url</code> để điều hướng người dùng trở lại app. Tuyệt đối không cần gọi Supabase thủ công.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
