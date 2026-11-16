"use client";

import {
  ArrowRight,
  CheckCircle2,
  Cpu,
  KeyRound,
  Layers,
  LogOut,
  ShieldCheck,
  Zap,
} from "lucide-react";
import Link from "next/link";
import { Button } from "@/components/ui/button";

export function LandingHero() {
  const highlights = [
    {
      icon: KeyRound,
      title: "Đăng nhập một chạm",
      desc: "Chỉ cần đăng nhập một lần duy nhất. Bạn có thể chuyển đổi mượt mà giữa các ứng dụng mà không phải gõ lại mật khẩu.",
      color: "text-primary",
      bg: "bg-primary/10",
      border: "hover:border-primary/40",
    },
    {
      icon: ShieldCheck,
      title: "Bảo mật an tâm tuyệt đối",
      desc: "Mọi phiên đăng nhập đều được mã hóa bảo vệ đa lớp, giữ tài khoản của bạn luôn an toàn trước mọi rủi ro.",
      color: "text-emerald-500",
      bg: "bg-emerald-500/10",
      border: "hover:border-emerald-500/40",
    },
    {
      icon: Zap,
      title: "Tốc độ phản hồi tức thì",
      desc: "Hạ tầng phân tán toàn cầu giúp việc đăng nhập và xác thực diễn ra nhanh như chớp, không một chút độ trễ.",
      color: "text-amber-500",
      bg: "bg-amber-500/10",
      border: "hover:border-amber-500/40",
    },
    {
      icon: Layers,
      title: "Minh bạch quyền riêng tư",
      desc: "Bạn luôn biết rõ và nắm trọn quyền kiểm soát: mỗi ứng dụng chỉ được truy cập đúng những gì bạn cho phép.",
      color: "text-sky-500",
      bg: "bg-sky-500/10",
      border: "hover:border-sky-500/40",
    },
    {
      icon: LogOut,
      title: "Đăng xuất đồng bộ an toàn",
      desc: "Chỉ cần nhấn đăng xuất một nơi, tất cả các phiên đăng nhập trên các ứng dụng vệ tinh sẽ tự động đóng lại an toàn.",
      color: "text-rose-500",
      bg: "bg-rose-500/10",
      border: "hover:border-rose-500/40",
    },
    {
      icon: Cpu,
      title: "Mọi nền tảng, mọi thiết bị",
      desc: "Hoạt động mượt mà và đồng nhất trên máy tính, điện thoại, máy tính bảng hay bất cứ trình duyệt nào bạn đang dùng.",
      color: "text-purple-500",
      bg: "bg-purple-500/10",
      border: "hover:border-purple-500/40",
    },
  ];

  return (
    <section className="relative mx-auto w-full max-w-7xl px-4 sm:px-6 lg:px-8 pt-16 sm:pt-24 pb-16 text-center overflow-hidden">
      {/* Background Ambient Glow & Light Orbs (Dark Mode Only) */}
      <div className="pointer-events-none absolute -top-32 left-1/2 -translate-x-1/2 h-[450px] w-[750px] rounded-full bg-[#fb291a]/20 blur-[150px] hidden dark:block" />
      <div className="pointer-events-none absolute top-48 left-1/4 h-[350px] w-[350px] rounded-full bg-sky-500/15 blur-[140px] hidden dark:block" />
      <div className="pointer-events-none absolute top-48 right-1/4 h-[350px] w-[350px] rounded-full bg-indigo-500/15 blur-[140px] hidden dark:block" />

      {/* Subtle Dot Grid */}
      <div
        className="pointer-events-none absolute inset-0 opacity-[0.25] dark:opacity-[0.16] [mask-image:radial-gradient(ellipse_at_center,black_50%,transparent_90%)]"
        style={{
          backgroundImage: "radial-gradient(currentColor 1px, transparent 1px)",
          backgroundSize: "32px 32px",
        }}
      />

      {/* Main Headline: Who I-Am? */}
      <h1 className="relative z-10 font-display text-5xl sm:text-7xl lg:text-8xl font-black tracking-tight text-foreground leading-[1.1] max-w-4xl mx-auto">
        Who{" "}
        <span className="bg-gradient-to-r from-[#ff7a50] via-[#fb291a] to-[#e3062a] bg-clip-text text-transparent">
          I-Am
        </span>
        ?
      </h1>

      {/* Subtitle: Natural, human, friendly */}
      <p className="relative z-10 mx-auto mt-6 max-w-2xl text-base sm:text-xl text-muted-foreground leading-relaxed font-sans">
        Đăng nhập một chạm để kết nối với tất cả ứng dụng trong hệ sinh thái
        VNTEZ. Nhanh chóng, mượt mà và không còn nỗi lo phải nhớ từng mật khẩu.
      </p>

      {/* Action Buttons */}
      <div className="relative z-10 mt-8 flex flex-wrap items-center justify-center gap-3 sm:gap-4">
        <Button
          size="lg"
          asChild
          className="rounded-xl gap-2 text-sm sm:text-base font-bold px-7 h-11 cursor-pointer"
        >
          <Link href="/developers">
            <span>Khám phá Developer Hub</span>
            <ArrowRight className="h-4 w-4" />
          </Link>
        </Button>

        <Button
          variant="outline"
          size="lg"
          asChild
          className="rounded-xl text-sm sm:text-base font-medium px-7 h-11 border-border bg-card hover:bg-muted/50 cursor-pointer"
        >
          <Link href="/login">
            <span>Đăng nhập tài khoản</span>
          </Link>
        </Button>
      </div>

      {/* THE FLAT HIGHLIGHT GRID DIRECTLY IN HERO (Replaces the old window mockup) */}
      <div className="relative z-10 mt-16 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5 text-left">
        {highlights.map((item) => {
          const Icon = item.icon;
          return (
            <div
              key={item.title}
              className={`group relative rounded-2xl border border-border bg-card p-6 transition-colors ${item.border} flex flex-col justify-between space-y-4`}
            >
              <div className="space-y-3">
                <div
                  className={`flex h-11 w-11 items-center justify-center rounded-xl ${item.bg} ${item.color} ring-4 ring-border/30 transition-transform group-hover:scale-105 duration-200`}
                >
                  <Icon className="h-5 w-5" />
                </div>

                <h3 className="font-display text-base sm:text-lg font-bold text-foreground transition-colors group-hover:text-primary">
                  {item.title}
                </h3>

                <p className="text-xs sm:text-sm text-muted-foreground leading-relaxed font-sans">
                  {item.desc}
                </p>
              </div>

              <div className="pt-3 border-t border-border/40 flex items-center justify-between text-[11px] font-mono text-muted-foreground">
                <span className="flex items-center gap-1.5 text-foreground/80 font-medium">
                  <CheckCircle2 className="h-3.5 w-3.5 text-emerald-500" />
                  <span>Sẵn sàng sử dụng</span>
                </span>
              </div>
            </div>
          );
        })}
      </div>
    </section>
  );
}
