"use client";

import { useEffect } from "react";
import { playUiSound } from "./sound-synth";

export function useDesktopShortcuts({
  isModalOpen,
  renaming,
  selectedId,
  setSelectedId,
  soundEnabled,
  showNotification,
  moveToTrash,
  restoreLastItem,
  closeCtx,
}: {
  isModalOpen: boolean;
  renaming: string | null;
  selectedId: string | null;
  setSelectedId: (id: string | null) => void;
  soundEnabled: boolean;
  showNotification: (msg: string) => void;
  moveToTrash: (id: string) => void;
  restoreLastItem: () => void;
  closeCtx: () => void;
}) {
  useEffect(() => {
    const handleKey = (e: KeyboardEvent) => {
      if (renaming || isModalOpen) return;

      if ((e.key === "Delete" || e.key === "Backspace") && selectedId) {
        if (
          selectedId === "sys-mypc" ||
          selectedId === "sys-trash" ||
          selectedId === "welcome-file"
        ) {
          showNotification("Mục hệ thống không thể xóa vào Thùng rác");
          playUiSound("pop", soundEnabled);
          return;
        }
        moveToTrash(selectedId);
      } else if ((e.ctrlKey || e.metaKey) && e.key === "z") {
        e.preventDefault();
        restoreLastItem();
      } else if (e.key === "Escape") {
        setSelectedId(null);
        closeCtx();
      }
    };
    window.addEventListener("keydown", handleKey);
    return () => window.removeEventListener("keydown", handleKey);
  }, [
    selectedId,
    renaming,
    isModalOpen,
    soundEnabled,
    setSelectedId,
    showNotification,
    moveToTrash,
    restoreLastItem,
    closeCtx,
  ]);
}
