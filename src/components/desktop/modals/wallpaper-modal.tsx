"use client";

import { ImageIcon, X, Check } from "lucide-react";
import { Modal } from "../modal-base";
import { WALLPAPERS, type WallpaperKey } from "../constants";

export function WallpaperModal({
  current,
  onSelect,
  onClose,
}: {
  current: WallpaperKey;
  onSelect: (k: WallpaperKey) => void;
  onClose: () => void;
}) {
  return (
    <Modal onClose={onClose} width={480}>
      <div className="mb-4 flex items-center justify-between border-b border-slate-200/80 pb-3 dark:border-white/10">
        <div className="flex items-center gap-2">
          <ImageIcon className="h-4 w-4 text-primary" />
          <p className="text-sm font-semibold">Tùy chọn Hình nền Desktop</p>
        </div>
        <button
          onClick={onClose}
          className="rounded-md p-1 text-slate-400 hover:bg-slate-100 hover:text-slate-700 dark:text-white/50 dark:hover:bg-white/10 dark:hover:text-white"
        >
          <X className="h-4 w-4" />
        </button>
      </div>

      <div className="grid grid-cols-2 gap-3">
        {(Object.keys(WALLPAPERS) as WallpaperKey[]).map((key) => {
          const wp = WALLPAPERS[key];
          const active = current === key;
          return (
            <button
              key={key}
              onClick={() => {
                onSelect(key);
                onClose();
              }}
              className={`group flex flex-col overflow-hidden rounded-xl border text-left transition-all ${
                active
                  ? "border-primary ring-2 ring-primary/40 shadow-md"
                  : "border-slate-200 hover:border-slate-300 dark:border-white/10 dark:hover:border-white/20"
              }`}
            >
              <div
                className={`relative h-24 w-full bg-gradient-to-br ${wp.lightBg} dark:${wp.darkBg} p-2`}
              >
                <div className="absolute right-2 top-2">
                  {active && (
                    <span className="flex h-5 w-5 items-center justify-center rounded-full bg-primary text-white">
                      <Check className="h-3 w-3" />
                    </span>
                  )}
                </div>
              </div>
              <div className="bg-slate-50/90 p-2.5 dark:bg-white/5">
                <p className="text-xs font-semibold text-slate-800 dark:text-white">
                  {wp.name}
                </p>
                <p className="line-clamp-1 text-[10px] text-slate-400 dark:text-white/40">
                  {wp.desc}
                </p>
              </div>
            </button>
          );
        })}
      </div>
    </Modal>
  );
}
