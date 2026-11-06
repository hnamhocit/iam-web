"use client";

import { useEffect } from "react";
import { motion } from "framer-motion";

export function Modal({
  onClose,
  children,
  width = 420,
}: {
  onClose: () => void;
  children: React.ReactNode;
  width?: number;
}) {
  useEffect(() => {
    const k = (e: KeyboardEvent) => e.key === "Escape" && onClose();
    window.addEventListener("keydown", k);
    return () => window.removeEventListener("keydown", k);
  }, [onClose]);

  return (
    <div className="fixed inset-0 z-[60] flex items-center justify-center p-4">
      <div
        className="absolute inset-0 bg-black/40 backdrop-blur-sm dark:bg-black/60"
        onClick={onClose}
      />
      <motion.div
        initial={{ opacity: 0, scale: 0.95, y: 12 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        exit={{ opacity: 0, scale: 0.95, y: 12 }}
        transition={{ type: "spring", stiffness: 320, damping: 26 }}
        style={{ width: `min(${width}px, 94vw)` }}
        className="relative max-h-[85vh] overflow-auto rounded-2xl border border-slate-200/90 bg-white/95 p-5 text-slate-900 shadow-2xl shadow-slate-900/15 backdrop-blur-2xl dark:border-white/10 dark:bg-[#14111f]/95 dark:text-white dark:shadow-black/70"
      >
        {children}
      </motion.div>
    </div>
  );
}
