"use client";

import { motion, AnimatePresence } from "framer-motion";
import { X } from "lucide-react";
import type { Toast } from "./types";

export function DesktopToast({
  toast,
  onClose,
}: {
  toast: Toast | null;
  onClose: () => void;
}) {
  return (
    <AnimatePresence>
      {toast && (
        <motion.div
          initial={{ opacity: 0, y: 24, scale: 0.95 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          exit={{ opacity: 0, y: 24, scale: 0.95 }}
          transition={{ type: "spring", stiffness: 400, damping: 28 }}
          className="fixed bottom-24 right-6 z-50 flex items-center gap-3 rounded-xl border border-slate-200/90 bg-white/95 px-4 py-2.5 text-slate-800 shadow-xl shadow-slate-900/10 backdrop-blur-xl dark:border-white/10 dark:bg-[#181524]/95 dark:text-white dark:shadow-black/50"
        >
          <span className="text-xs font-medium">{toast.message}</span>
          {toast.onAction && (
            <button
              onClick={() => {
                toast.onAction?.();
                onClose();
              }}
              className="rounded-lg bg-primary/10 px-2.5 py-1 text-xs font-semibold text-primary transition-colors hover:bg-primary/20"
            >
              {toast.actionLabel}
            </button>
          )}
          <button
            onClick={onClose}
            className="rounded p-1 text-slate-400 hover:text-slate-700 dark:text-white/40 dark:hover:text-white"
          >
            <X className="h-3.5 w-3.5" />
          </button>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
