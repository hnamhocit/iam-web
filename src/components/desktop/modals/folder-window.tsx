"use client";

import { FolderOpen, X } from "lucide-react";
import { Modal } from "../modal-base";
import type { FolderNode, FileNode, AppNode, Zone } from "../types";
import { FileGlyph, Glyph } from "../icons/glyphs";
import { launch } from "../desktop-utils";

export function FolderWindow({
  folder,
  zone,
  onDetach,
  onDragStart,
  onOpenFile,
  onClose,
}: {
  folder: FolderNode;
  zone: Zone;
  onDetach: (folderId: string, itemId: string, zone: Zone) => void;
  onDragStart: (e: React.DragEvent, id: string) => void;
  onOpenFile: (f: FileNode) => void;
  onClose: () => void;
}) {
  return (
    <Modal onClose={onClose} width={420}>
      <div className="mb-3 flex items-center gap-2 border-b border-slate-200/80 pb-3 dark:border-white/10">
        <FolderOpen className="h-4 w-4 text-primary" />
        <p className="text-sm font-semibold">{folder.name}</p>
        <span className="text-xs text-slate-400 dark:text-white/40">
          ({folder.children.length} mục)
        </span>
        <button
          onClick={onClose}
          className="ml-auto rounded-md p-1 text-slate-400 hover:bg-slate-100 hover:text-slate-700 dark:text-white/50 dark:hover:bg-white/10 dark:hover:text-white"
        >
          <X className="h-4 w-4" />
        </button>
      </div>

      {folder.children.length === 0 ? (
        <p className="py-8 text-center text-xs text-slate-400 dark:text-white/40">
          Thư mục trống. Kéo ứng dụng hoặc tệp vào đây.
        </p>
      ) : (
        <div className="grid grid-cols-3 gap-3 py-2">
          {folder.children.map((c) => (
            <div
              key={c.id}
              draggable
              onDragStart={(e) => onDragStart(e, c.id)}
              onDragEnd={() => onDetach(folder.id, c.id, zone)}
              onClick={() => {
                if (c.kind === "file") onOpenFile(c as FileNode);
                else launch(c as AppNode);
              }}
              className="flex cursor-grab flex-col items-center gap-1.5 rounded-xl p-2 transition-colors hover:bg-black/5 active:cursor-grabbing dark:hover:bg-white/10"
            >
              <div className="h-12 w-12">
                {c.kind === "file" ? <FileGlyph file={c} /> : <Glyph app={c} />}
              </div>
              <span className="line-clamp-1 text-[11px] font-medium text-slate-800 dark:text-white/90">
                {c.name}
              </span>
            </div>
          ))}
        </div>
      )}
      <p className="mt-3 text-center text-[10px] text-slate-400 dark:text-white/40">
        Kéo ứng dụng hoặc tệp ra ngoài để chuyển về Desktop.
      </p>
    </Modal>
  );
}
