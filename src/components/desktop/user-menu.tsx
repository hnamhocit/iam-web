"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { LogOut } from "lucide-react";
import { ModeToggle } from "@/components/ThemeToggle";
import { signOut } from "@/lib/auth-actions";
import type { MappedUser } from "./types";

export function UserMenu({ user }: { user: MappedUser }) {
  const [open, setOpen] = useState(false);
  const [busy, setBusy] = useState(false);
  const doLogout = async () => {
    setBusy(true);
    try {
      await signOut();
    } catch {
      setBusy(false);
      setOpen(false);
    }
  };

  return (
    <div className="relative">
      <button
        onClick={() => setOpen((v) => !v)}
        className="flex h-8 w-8 items-center justify-center rounded-full ring-2 ring-slate-200 transition-all hover:ring-primary/50 dark:ring-white/15 dark:hover:ring-white/30"
      >
        {user.avatar ? (
          <img
            src={user.avatar}
            alt={user.name}
            className="h-full w-full rounded-full object-cover"
          />
        ) : (
          <div className="flex h-full w-full items-center justify-center rounded-full bg-primary text-xs font-bold text-primary-foreground">
            {user.name.charAt(0).toUpperCase()}
          </div>
        )}
      </button>

      {open && (
        <>
          <div className="fixed inset-0 z-40" onClick={() => setOpen(false)} />
          <motion.div
            initial={{ opacity: 0, y: -6, scale: 0.97 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            transition={{ type: "spring", stiffness: 400, damping: 30 }}
            className="absolute right-0 top-11 z-50 w-64 overflow-hidden rounded-2xl border border-slate-200/90 bg-white/95 text-slate-800 shadow-2xl shadow-slate-900/15 backdrop-blur-2xl dark:border-white/10 dark:bg-black/80 dark:text-white dark:shadow-black/70"
          >
            <div className="flex items-center gap-3 border-b border-slate-200/80 p-3 dark:border-white/10">
              {user.avatar ? (
                <img
                  src={user.avatar}
                  alt=""
                  className="h-10 w-10 rounded-full ring-1 ring-slate-200 object-cover dark:ring-white/15"
                />
              ) : (
                <div className="flex h-10 w-10 items-center justify-center rounded-full bg-primary text-sm font-bold text-primary-foreground">
                  {user.name.charAt(0).toUpperCase()}
                </div>
              )}
              <div className="min-w-0 leading-tight">
                <p className="truncate text-sm font-medium">{user.name}</p>
                <p className="truncate font-mono text-[11px] text-slate-400 dark:text-white/45">
                  {user.email}
                </p>
              </div>
            </div>
            <div className="flex items-center justify-between px-3.5 py-2.5 text-xs text-slate-600 dark:text-white/80">
              <span>Giao diện</span>
              <ModeToggle />
            </div>
            <div className="my-1 h-px bg-slate-200/80 dark:bg-white/10" />
            <button
              onClick={doLogout}
              disabled={busy}
              className="flex w-full items-center gap-2.5 px-3.5 py-2.5 text-xs text-rose-600 transition-colors hover:bg-rose-50 disabled:opacity-50 dark:text-rose-400 dark:hover:bg-rose-500/10"
            >
              <LogOut className="h-4 w-4" />
              {busy ? "Đang đăng xuất..." : "Đăng xuất"}
            </button>
          </motion.div>
        </>
      )}
    </div>
  );
}
