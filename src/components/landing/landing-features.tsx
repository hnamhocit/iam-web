"use client";

import {
  CheckCircle,
  Cpu,
  KeyRound,
  Layers,
  LogOut,
  ShieldCheck,
  Zap,
} from "lucide-react";

export function LandingFeatures() {
  const features = [
    {
      icon: KeyRound,
      badge: "Unified SSO",
      title: "Single Sign-On (SSO) Liền mạch",
      description:
        "Người dùng chỉ cần đăng nhập một lần duy nhất. Phiên làm việc được chia sẻ và xác thực tức thì giữa các ứng dụng vệ tinh mà không phải nhập lại mật khẩu.",
      color: "text-primary",
      bg: "bg-primary/10",
      border: "hover:border-primary/40",
    },
    {
      icon: ShieldCheck,
      badge: "RFC 7636",
      title: "Bảo mật Tuyệt đối PKCE S256",
      description:
        "Áp dụng chuẩn Proof Key for Code Exchange (S256). Authorization code chỉ dùng một lần và thu hồi ngay lập tức, triệt tiêu hoàn toàn nguy cơ tấn công replay.",
      color: "text-emerald-500",
      bg: "bg-emerald-500/10",
      border: "hover:border-emerald-500/40",
    },
    {
      icon: Zap,
      badge: "Edge Latency <15ms",
      title: "Cloudflare Workers Edge Network",
      description:
        "Hạ tầng xác thực phân tán trên hơn 300 điểm hiện diện (PoP) của Cloudflare toàn cầu, đảm bảo tốc độ phản hồi tính bằng miligiây và uptime 99.99%.",
      color: "text-amber-500",
      bg: "bg-amber-500/10",
      border: "hover:border-amber-500/40",
    },
    {
      icon: Layers,
      badge: "App-Scoped RBAC",
      title: "Ma trận Phân quyền Tách biệt",
      description:
        "Hỗ trợ gán Role và Permission chuyên biệt theo từng app_id. Ngăn chặn triệt để nguy cơ lộ quyền hạn chéo giữa các hệ thống vệ tinh trong hệ sinh thái.",
      color: "text-sky-500",
      bg: "bg-sky-500/10",
      border: "hover:border-sky-500/40",
    },
    {
      icon: LogOut,
      badge: "Centralized Logout",
      title: "Đăng xuất Tập trung (RP-Initiated)",
      description:
        "Giao thức OpenID Connect Logout đồng bộ phiên. Khi người dùng bấm đăng xuất tại cổng IAM hoặc app vệ tinh, toàn bộ token phiên sẽ được thanh lọc an toàn.",
      color: "text-rose-500",
      bg: "bg-rose-500/10",
      border: "hover:border-rose-500/40",
    },
    {
      icon: Cpu,
      badge: "Zero-Dependency",
      title: "REST Chuẩn Quốc tế Không Kén SDK",
      description:
        "Tích hợp với bất kỳ ngôn ngữ nào (Next.js, React, Bun, Python, Go, Rust, Flutter) mà không phụ thuộc thư viện cồng kềnh. Chỉ cần gọi HTTP thông thường.",
      color: "text-purple-500",
      bg: "bg-purple-500/10",
      border: "hover:border-purple-500/40",
    },
  ];

  return (
    <section
      id="features"
      className="relative w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20"
    >
      {/* Background glow (Dark mode only) */}
      <div className="pointer-events-none absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 h-[450px] w-[650px] rounded-full bg-primary/10 blur-[160px] hidden dark:block" />

      <div className="text-center max-w-3xl mx-auto mb-12 space-y-3">
        <h2 className="font-display text-3xl sm:text-4xl font-extrabold tracking-tight text-foreground">
          Được thiết kế cho Hệ sinh thái Doanh nghiệp Hiện đại
        </h2>
        <p className="text-sm sm:text-base text-muted-foreground leading-relaxed">
          Giải quyết triệt để phân mảnh tài khoản, tối ưu trải nghiệm người dùng
          và bảo đảm tính toàn vẹn định danh dữ liệu trên toàn hệ thống.
        </p>
      </div>

      {/* Modern Flat Bento Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
        {features.map((f) => {
          const Icon = f.icon;
          return (
            <div
              key={f.title}
              className={`group relative rounded-2xl border border-border bg-card p-6 sm:p-7 transition-colors ${f.border} flex flex-col justify-between`}
            >
              <div>
                <div className="flex items-center justify-between mb-5">
                  <div
                    className={`flex h-12 w-12 items-center justify-center rounded-2xl ${f.bg} ${f.color} ring-6 ring-border/40 transition-transform group-hover:scale-105 duration-200`}
                  >
                    <Icon className="h-6 w-6" />
                  </div>
                  <span className="font-mono text-[10px] uppercase font-bold tracking-wider px-2.5 py-1 rounded-full border border-border/60 bg-muted/40 text-muted-foreground">
                    {f.badge}
                  </span>
                </div>

                <h3 className="font-display text-lg font-bold text-foreground transition-colors group-hover:text-primary">
                  {f.title}
                </h3>
                <p className="mt-2.5 text-xs sm:text-sm text-muted-foreground leading-relaxed font-sans">
                  {f.description}
                </p>
              </div>

              <div className="mt-6 pt-4 border-t border-border/40 flex items-center justify-between text-[11px] font-mono text-muted-foreground">
                <span className="flex items-center gap-1.5 text-foreground/80 font-medium">
                  <CheckCircle className="h-3 w-3 text-emerald-500" />
                  <span>Sẵn sàng sử dụng</span>
                </span>
                <span className="opacity-0 group-hover:opacity-100 transition-opacity text-primary font-semibold">
                  Chi tiết →
                </span>
              </div>
            </div>
          );
        })}
      </div>
    </section>
  );
}
