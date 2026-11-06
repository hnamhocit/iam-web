"use client";

import Link from "next/link";
import { Code2, Grid as GridIcon, Volume2, VolumeX, Image as ImageIcon } from "lucide-react";
import { MenuClock } from "./menu-clock";
import { UserMenu } from "./user-menu";
import type { MappedUser } from "./types";

export function DesktopMenubar({
  user,
  showGrid,
  onToggleGrid,
  soundEnabled,
  onToggleSound,
  onOpenWallpaper,
}: {
  user: MappedUser;
  showGrid: boolean;
  onToggleGrid: () => void;
  soundEnabled: boolean;
  onToggleSound: () => void;
  onOpenWallpaper: () => void;
}) {
  return (
    <header className="relative z-20 flex items-center justify-between border-b border-black/5 bg-white/40 px-5 py-2 backdrop-blur-md dark:border-white/5 dark:bg-black/20 lg:px-8">
      <div className="flex items-center gap-3">
        <Link
          href="/"
          className="flex items-center gap-2 font-semibold tracking-tight text-slate-800 transition-opacity hover:opacity-80 dark:text-white/90"
        >
          <img src="/logo.svg" alt="VNTEZ ID" className="h-5 w-5" />
          <span className="text-sm font-bold tracking-tight">VNTEZ ID</span>
        </Link>
        <span className="hidden text-xs text-slate-400 dark:text-white/30 sm:inline">
          • Desktop
        </span>
        <Link
          href="/developers"
          title="Mở VNTEZ Developer Hub & OAuth 2.0 Playground"
          className="ml-2 flex items-center gap-1.5 rounded-lg border border-primary/30 bg-primary/10 px-2.5 py-1 text-xs font-semibold text-primary transition-all hover:bg-primary/20 shadow-sm"
        >
          <Code2 className="h-3.5 w-3.5" />
          <span className="hidden sm:inline">Developer Hub</span>
        </Link>
      </div>

      <div className="flex items-center gap-2.5">
        <button
          onClick={onToggleGrid}
          title={showGrid ? "Ẩn lưới căn chỉnh" : "Hiển thị lưới căn chỉnh ô"}
          className={`flex h-8 w-8 items-center justify-center rounded-lg border transition-colors shadow-sm ${
            showGrid
              ? "border-primary bg-primary text-primary-foreground"
              : "border-slate-200/80 bg-white/40 text-slate-700 hover:bg-white dark:border-white/10 dark:bg-white/5 dark:text-white/80 dark:hover:bg-white/10"
          }`}
        >
          <GridIcon className="h-4 w-4" />
        </button>

        <button
          onClick={onToggleSound}
          title={
            soundEnabled ? "Tắt âm thanh hiệu ứng" : "Bật âm thanh hiệu ứng"
          }
          className="flex h-8 w-8 items-center justify-center rounded-lg border border-slate-200/80 bg-white/40 text-slate-700 shadow-sm transition-colors hover:bg-white dark:border-white/10 dark:bg-white/5 dark:text-white/80 dark:hover:bg-white/10"
        >
          {soundEnabled ? (
            <Volume2 className="h-4 w-4" />
          ) : (
            <VolumeX className="h-4 w-4 opacity-50" />
          )}
        </button>

        <button
          onClick={onOpenWallpaper}
          title="Đổi hình nền Desktop"
          className="flex h-8 w-8 items-center justify-center rounded-lg border border-slate-200/80 bg-white/40 text-slate-700 shadow-sm transition-colors hover:bg-white dark:border-white/10 dark:bg-white/5 dark:text-white/80 dark:hover:bg-white/10"
        >
          <ImageIcon className="h-4 w-4" />
        </button>

        <MenuClock />
        <UserMenu user={user} />
      </div>
    </header>
  );
}
