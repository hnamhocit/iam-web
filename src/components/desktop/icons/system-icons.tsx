"use client";

import React from "react";
import { motion } from "framer-motion";

export function SysIcon({
  emoji,
  label,
  selected,
  onClick,
  onContextMenu,
}: {
  emoji: string;
  label: string;
  selected?: boolean;
  onClick: () => void;
  onContextMenu?: (e: React.MouseEvent) => void;
}) {
  return (
    <button
      onClick={onClick}
      onContextMenu={onContextMenu}
      className={`group flex h-full w-full flex-col items-center justify-center gap-1.5 rounded-xl p-2 text-center transition-all focus:outline-none cursor-pointer ${
        selected
          ? "bg-primary/20 ring-1 ring-primary/45 shadow-sm"
          : "hover:bg-black/5 dark:hover:bg-white/10"
      }`}
    >
      <div className="relative flex h-14 w-14 items-center justify-center">
        <span className="select-none text-[40px] leading-none drop-shadow-[0_4px_6px_rgba(0,0,0,0.3)] transition-transform group-hover:scale-105">
          {emoji}
        </span>
      </div>
      <span className="line-clamp-2 text-[11px] font-medium leading-tight text-slate-800 dark:text-white/95 drop-shadow-[0_1px_2px_rgba(255,255,255,0.9)] dark:drop-shadow-[0_1px_3px_rgba(0,0,0,0.85)]">
        {label}
      </span>
    </button>
  );
}

export function TrashSysIcon({
  badge,
  isOver,
  selected,
  onClick,
  onContextMenu,
  onDragOver,
  onDragLeave,
  onDrop,
}: {
  badge: number;
  isOver: boolean;
  selected?: boolean;
  onClick: () => void;
  onContextMenu: (e: React.MouseEvent) => void;
  onDragOver: (e: React.DragEvent) => void;
  onDragLeave: () => void;
  onDrop: (e: React.DragEvent) => void;
}) {
  return (
    <div
      onDragOver={onDragOver}
      onDragLeave={onDragLeave}
      onDrop={onDrop}
      onContextMenu={onContextMenu}
      onClick={onClick}
      className={`group relative flex h-full w-full flex-col items-center justify-center gap-1.5 rounded-xl p-2 text-center transition-all cursor-pointer ${
        isOver
          ? "scale-110 bg-rose-500/20 ring-2 ring-rose-500 shadow-[0_0_24px_rgba(244,63,94,0.4)]"
          : selected
          ? "bg-primary/20 ring-1 ring-primary/45 shadow-sm"
          : "hover:bg-black/5 dark:hover:bg-white/10"
      }`}
    >
      <div className="relative flex h-14 w-14 items-center justify-center">
        <motion.span
          animate={
            isOver
              ? { scale: [1, 1.25, 1.15], rotate: [-8, 8, 0] }
              : { scale: 1, rotate: 0 }
          }
          transition={{ duration: 0.3 }}
          className="select-none text-[42px] leading-none drop-shadow-[0_4px_6px_rgba(0,0,0,0.3)] transition-transform group-hover:scale-105"
        >
          🗑️
        </motion.span>
        {badge > 0 && (
          <motion.span
            key={badge}
            initial={{ scale: 0 }}
            animate={{ scale: [0, 1.35, 1] }}
            transition={{ type: "spring", stiffness: 450, damping: 20 }}
            className="absolute -right-1 -top-1 flex h-5 min-w-5 items-center justify-center rounded-full bg-rose-500 px-1.5 text-[10px] font-bold text-white shadow-md ring-2 ring-white dark:ring-[#15101f]"
          >
            {badge}
          </motion.span>
        )}
      </div>
      <span className="line-clamp-2 text-[11px] font-medium leading-tight text-slate-800 dark:text-white/95 drop-shadow-[0_1px_2px_rgba(255,255,255,0.9)] dark:drop-shadow-[0_1px_3px_rgba(0,0,0,0.85)]">
        {isOver ? "Thả để xóa" : "Thùng rác"}
      </span>
    </div>
  );
}
