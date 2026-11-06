"use client";

import { useState, useEffect } from "react";
import { FileText, Download, Save, X } from "lucide-react";
import { Modal } from "../modal-base";
import type { FileNode } from "../types";

export function FileEditorModal({
  file,
  onSave,
  onClose,
}: {
  file: FileNode;
  onSave: (id: string, name: string, content: string) => void;
  onClose: () => void;
}) {
  const [name, setName] = useState(file.name);
  const [content, setContent] = useState(file.content);
  const [saved, setSaved] = useState(true);

  const save = () => {
    onSave(file.id, name.trim() || "Ghi chú.txt", content);
    setSaved(true);
  };

  const download = () => {
    const blob = new Blob([content], { type: "text/plain;charset=utf-8" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = name.endsWith(".txt") ? name : `${name}.txt`;
    a.click();
    URL.revokeObjectURL(url);
  };

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if ((e.ctrlKey || e.metaKey) && e.key === "s") {
        e.preventDefault();
        save();
      }
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [name, content]);

  return (
    <Modal onClose={onClose} width={580}>
      <div className="mb-3 flex items-center justify-between border-b border-slate-200/80 pb-3 dark:border-white/10">
        <div className="flex items-center gap-2">
          <FileText className="h-4 w-4 text-primary" />
          <input
            value={name}
            onChange={(e) => {
              setName(e.target.value);
              setSaved(false);
            }}
            className="rounded bg-transparent font-semibold text-slate-900 focus:outline-none focus:ring-1 focus:ring-primary/50 dark:text-white"
          />
          {!saved && (
            <span className="text-[10px] text-amber-500">• Chưa lưu</span>
          )}
        </div>
        <div className="flex items-center gap-1.5">
          <button
            onClick={download}
            title="Tải tệp tin về máy"
            className="flex items-center gap-1 rounded-lg border border-slate-200 bg-slate-100 px-2.5 py-1 text-xs font-medium text-slate-700 hover:bg-slate-200 dark:border-white/10 dark:bg-white/5 dark:text-white/80 dark:hover:bg-white/10"
          >
            <Download className="h-3.5 w-3.5" /> Tải về
          </button>
          <button
            onClick={save}
            className="flex items-center gap-1 rounded-lg bg-primary px-3 py-1 text-xs font-medium text-primary-foreground shadow transition-opacity hover:opacity-90"
          >
            <Save className="h-3.5 w-3.5" /> Lưu (Ctrl+S)
          </button>
          <button
            onClick={onClose}
            className="rounded-lg p-1.5 text-slate-400 hover:bg-slate-100 hover:text-slate-700 dark:text-white/50 dark:hover:bg-white/10 dark:hover:text-white"
          >
            <X className="h-4 w-4" />
          </button>
        </div>
      </div>

      <textarea
        autoFocus
        value={content}
        onChange={(e) => {
          setContent(e.target.value);
          setSaved(false);
        }}
        placeholder="Nhập nội dung ghi chú ở đây..."
        className="h-72 w-full resize-none rounded-xl border border-slate-200/80 bg-slate-50/70 p-3.5 font-mono text-xs leading-relaxed text-slate-800 focus:border-primary/60 focus:bg-white focus:outline-none focus:ring-2 focus:ring-primary/25 dark:border-white/10 dark:bg-black/30 dark:text-white/90 dark:focus:bg-black/40"
      />

      <div className="mt-2 flex items-center justify-between text-[11px] text-slate-400 dark:text-white/40">
        <span>
          {content.length} ký tự • {content.split(/\r\n|\r|\n/).length} dòng
        </span>
        <span>Phím tắt: Ctrl + S để lưu</span>
      </div>
    </Modal>
  );
}
