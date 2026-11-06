"use client";

import { RotateCcw, Trash, X } from "lucide-react";
import { Modal } from "../modal-base";
import type { TrashItem } from "../types";
import { FolderGlyph, FileGlyph, Glyph } from "../icons/glyphs";

export function TrashWindow({
  trash,
  onRestore,
  onRestoreAll,
  onDelete,
  onEmpty,
  onClose,
}: {
  trash: TrashItem[];
  onRestore: (i: number) => void;
  onRestoreAll: () => void;
  onDelete: (i: number) => void;
  onEmpty: () => void;
  onClose: () => void;
}) {
  return (
    <Modal onClose={onClose} width={480}>
      <div className="mb-3 flex items-center gap-2 border-b border-slate-200/80 pb-3 dark:border-white/10">
        <span className="text-xl">🗑️</span>
        <div>
          <p className="text-sm font-semibold">Thùng rác</p>
          <p className="text-[11px] text-slate-400 dark:text-white/40">
            {trash.length} mục đã xóa
          </p>
        </div>
        <div className="ml-auto flex items-center gap-2">
          {trash.length > 0 && (
            <>
              <button
                onClick={onRestoreAll}
                className="flex items-center gap-1 rounded-lg border border-slate-200 bg-slate-100 px-2.5 py-1 text-xs font-medium text-slate-700 hover:bg-slate-200 dark:border-white/10 dark:bg-white/5 dark:text-white/80 dark:hover:bg-white/10"
              >
                <RotateCcw className="h-3 w-3" /> Khôi phục tất cả
              </button>
              <button
                onClick={onEmpty}
                className="flex items-center gap-1 rounded-lg bg-rose-500/10 px-2.5 py-1 text-xs font-medium text-rose-600 hover:bg-rose-500/20 dark:text-rose-400"
              >
                <Trash className="h-3 w-3" /> Dọn sạch
              </button>
            </>
          )}
          <button
            onClick={onClose}
            className="rounded-md p-1 text-slate-400 hover:bg-slate-100 hover:text-slate-700 dark:text-white/50 dark:hover:bg-white/10 dark:hover:text-white"
          >
            <X className="h-4 w-4" />
          </button>
        </div>
      </div>

      {trash.length === 0 ? (
        <div className="flex flex-col items-center justify-center py-12 text-center">
          <span className="mb-2 text-4xl opacity-50">✨</span>
          <p className="text-xs font-medium text-slate-400 dark:text-white/40">
            Thùng rác trống.
          </p>
          <p className="text-[11px] text-slate-400/80 dark:text-white/30">
            Kéo bất kỳ ứng dụng hoặc tệp nào vào thùng rác để xóa.
          </p>
        </div>
      ) : (
        <div className="max-h-72 space-y-2 overflow-auto pr-1">
          {trash.map((t, i) => (
            <div
              key={t.id}
              className="flex items-center gap-3 rounded-xl border border-slate-200/80 bg-slate-50/70 p-2.5 dark:border-white/10 dark:bg-white/5"
            >
              <div className="h-10 w-10 shrink-0">
                {t.node.kind === "folder" ? (
                  <FolderGlyph folder={t.node} />
                ) : t.node.kind === "file" ? (
                  <FileGlyph file={t.node} />
                ) : (
                  <Glyph app={t.node} small />
                )}
              </div>
              <div className="min-w-0 flex-1 leading-tight">
                <p className="truncate text-sm font-medium text-slate-800 dark:text-white/95">
                  {t.node.name}
                </p>
                <p className="font-mono text-[10px] text-slate-400 dark:text-white/40">
                  Vị trí gốc: {t.origin === "dock" ? "Dock" : "Desktop"}
                </p>
              </div>
              <div className="flex items-center gap-1">
                <button
                  onClick={() => onRestore(i)}
                  title="Khôi phục lại vị trí cũ"
                  className="flex items-center gap-1 rounded-lg border border-slate-200 bg-white px-2 py-1 text-xs font-medium text-slate-700 shadow-sm hover:bg-slate-50 dark:border-white/10 dark:bg-white/10 dark:text-white/90 dark:hover:bg-white/15"
                >
                  <RotateCcw className="h-3.5 w-3.5 text-primary" /> Khôi phục
                </button>
                <button
                  onClick={() => onDelete(i)}
                  title="Xóa vĩnh viễn"
                  className="rounded-lg p-1.5 text-rose-500 hover:bg-rose-500/10 dark:hover:bg-rose-500/20"
                >
                  <Trash className="h-3.5 w-3.5" />
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </Modal>
  );
}
