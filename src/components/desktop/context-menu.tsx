"use client";

import { motion } from "framer-motion";
import type { Node, Zone } from "./types";

export type Ctx = {
  x: number;
  y: number;
  type: "desktop" | "trash" | "mypc" | "node";
  node?: Node;
  zone?: Zone;
} | null;

export type CtxItem = {
  label: string;
  icon: React.ReactNode;
  danger?: boolean;
  disabled?: boolean;
  onClick: () => void;
};

export function ContextMenu({
  ctx,
  items,
  onClose,
}: {
  ctx: NonNullable<Ctx>;
  items: CtxItem[];
  onClose: () => void;
}) {
  const x = Math.min(
    ctx.x,
    (typeof window !== "undefined" ? window.innerWidth : 9999) - 240,
  );
  const y = Math.min(
    ctx.y,
    (typeof window !== "undefined" ? window.innerHeight : 9999) -
      items.length * 36 -
      20,
  );

  return (
    <>
      <div
        className="fixed inset-0 z-[65]"
        onClick={onClose}
        onContextMenu={(e) => {
          e.preventDefault();
          onClose();
        }}
      />
      <motion.div
        initial={{ opacity: 0, scale: 0.96 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.12 }}
        style={{ left: Math.max(10, x), top: Math.max(10, y) }}
        className="fixed z-[70] w-56 overflow-hidden rounded-xl border border-slate-200/90 bg-white/95 py-1 text-slate-800 shadow-2xl shadow-slate-900/15 backdrop-blur-2xl dark:border-white/10 dark:bg-[#161420]/95 dark:text-white/90 dark:shadow-black/70"
      >
        {items.map((it, i) => (
          <button
            key={i}
            disabled={it.disabled}
            onClick={() => {
              it.onClick();
              onClose();
            }}
            className={`flex w-full items-center gap-2.5 px-3.5 py-2 text-left text-[13px] transition-colors ${
              it.disabled
                ? "cursor-not-allowed opacity-40"
                : it.danger
                  ? "text-rose-600 hover:bg-rose-50 dark:text-rose-400 dark:hover:bg-rose-500/15"
                  : "hover:bg-primary/10 hover:text-primary dark:hover:bg-white/10 dark:hover:text-white"
            }`}
          >
            <span className="h-4 w-4 shrink-0 opacity-80">{it.icon}</span>
            <span className="truncate">{it.label}</span>
          </button>
        ))}
      </motion.div>
    </>
  );
}
