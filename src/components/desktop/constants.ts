import type { PosMap, WallpaperKey } from "./types";
export type { WallpaperKey } from "./types";

export type Wallpaper = {
  name: string;
  desc: string;
  lightBg: string;
  lightBlobs: string[];
  darkBg: string;
  darkBlobs: string[];
};

export const CELL_W = 96;
export const CELL_H = 104;
export const PAD_X = 20;
export const PAD_Y = 16;

export const DEFAULT_POSITIONS: PosMap = {
  "sys-mypc": { col: 0, row: 0 },
  "sys-trash": { col: 0, row: 1 },
  "welcome-file": { col: 0, row: 2 },
};

export const WALLPAPER_KEY = "vntez.wallpaper.v1";
export const SOUND_KEY = "vntez.sound.v1";
export const POS_KEY = "vntez.desktop.grid.v6";

export const WALLPAPERS: Record<WallpaperKey, Wallpaper> = {
  aurora: {
    name: "Tím Ánh Cực Quang",
    desc: "Sắc tím đặc trưng VNTEZ hòa quyện ánh cyan",
    lightBg: "from-[#f5f3ff] via-[#eef2ff] to-[#f8fafc]",
    lightBlobs: [
      "bg-purple-400/20 -left-[10%] -top-[15%] h-[750px] w-[750px] blur-[140px]",
      "bg-sky-400/20 -right-[10%] bottom-[-10%] h-[650px] w-[650px] blur-[130px]",
    ],
    darkBg: "from-[#0c0915] via-[#0d1424] to-[#0a1830]",
    darkBlobs: [
      "bg-primary/25 -left-[10%] -top-[15%] h-[700px] w-[700px] blur-[140px]",
      "bg-info/20 -right-[10%] bottom-[-10%] h-[600px] w-[600px] blur-[130px]",
    ],
  },
  sequoia: {
    name: "Bình Minh Sequoia",
    desc: "Ấm áp ánh cam san hô và hồng đào",
    lightBg: "from-[#fff7ed] via-[#fef2f2] to-[#eff6ff]",
    lightBlobs: [
      "bg-amber-300/25 -left-[10%] -top-[15%] h-[750px] w-[750px] blur-[140px]",
      "bg-rose-400/20 -right-[10%] bottom-[-10%] h-[650px] w-[650px] blur-[130px]",
    ],
    darkBg: "from-[#1a0f0a] via-[#1c1218] to-[#0f172a]",
    darkBlobs: [
      "bg-amber-500/20 -left-[10%] -top-[15%] h-[700px] w-[700px] blur-[140px]",
      "bg-rose-500/20 -right-[10%] bottom-[-10%] h-[600px] w-[600px] blur-[130px]",
    ],
  },
  ocean: {
    name: "Đại Dương Sâu Thẳm",
    desc: "Biển xanh vô tận cùng ánh neon xanh lam",
    lightBg: "from-[#ecfeff] via-[#f0f9ff] to-[#f8fafc]",
    lightBlobs: [
      "bg-teal-300/25 -left-[10%] -top-[15%] h-[750px] w-[750px] blur-[140px]",
      "bg-blue-400/20 -right-[10%] bottom-[-10%] h-[650px] w-[650px] blur-[130px]",
    ],
    darkBg: "from-[#05131f] via-[#081b2c] to-[#050e18]",
    darkBlobs: [
      "bg-teal-500/20 -left-[10%] -top-[15%] h-[700px] w-[700px] blur-[140px]",
      "bg-sky-500/20 -right-[10%] bottom-[-10%] h-[600px] w-[600px] blur-[130px]",
    ],
  },
  minimal: {
    name: "Tối Giản Đơn Sắc",
    desc: "Không gian làm việc yên tĩnh, tập trung tối đa",
    lightBg: "from-[#fafafa] via-[#f4f4f5] to-[#e4e4e7]",
    lightBlobs: [
      "bg-slate-200/40 -left-[10%] -top-[15%] h-[750px] w-[750px] blur-[140px]",
      "bg-zinc-200/40 -right-[10%] bottom-[-10%] h-[650px] w-[650px] blur-[130px]",
    ],
    darkBg: "from-[#0a0a0c] via-[#101014] to-[#070709]",
    darkBlobs: [
      "bg-slate-800/30 -left-[10%] -top-[15%] h-[700px] w-[700px] blur-[140px]",
      "bg-zinc-800/30 -right-[10%] bottom-[-10%] h-[600px] w-[600px] blur-[130px]",
    ],
  },
};
