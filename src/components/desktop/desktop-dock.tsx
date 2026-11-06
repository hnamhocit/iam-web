"use client";

import { motion, useMotionValue } from "framer-motion";
import type { Node, FileNode } from "./types";
import { DockMagnify } from "./dock-magnify";

export function DesktopDock({
  dockNodes,
  mouseX,
  onDropDock,
  onDragStart,
  onDropNode,
  onOpenCtx,
  onOpenFile,
  onOpenFolder,
  onOpenMyPc,
  onOpenTrash,
  trashCount,
}: {
  dockNodes: Node[];
  mouseX: ReturnType<typeof useMotionValue<number>>;
  onDropDock: (e: React.DragEvent) => void;
  onDragStart: (e: React.DragEvent, id: string) => void;
  onDropNode: (e: React.DragEvent, targetId: string) => void;
  onOpenCtx: (e: React.MouseEvent, node: Node) => void;
  onOpenFile: (f: FileNode) => void;
  onOpenFolder: (id: string) => void;
  onOpenMyPc: () => void;
  onOpenTrash: () => void;
  trashCount: number;
}) {
  return (
    <motion.div
      initial={{ y: 100, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ type: "spring", stiffness: 260, damping: 24, delay: 0.2 }}
      onMouseMove={(e) => mouseX.set(e.pageX)}
      onMouseLeave={() => mouseX.set(Infinity)}
      onDragOver={(e) => e.preventDefault()}
      onDrop={onDropDock}
      className="fixed bottom-5 left-1/2 z-30 flex -translate-x-1/2 items-end gap-2.5 rounded-[22px] border border-white/70 bg-white/60 px-3.5 py-2 shadow-xl shadow-slate-900/10 backdrop-blur-2xl dark:border-white/10 dark:bg-black/35 dark:shadow-2xl dark:shadow-black/60"
    >
      {dockNodes.map((n) => (
        <DockMagnify
          key={n.id}
          node={n}
          mouseX={mouseX}
          onDragStart={(e, id) => onDragStart(e, id)}
          onDropNode={onDropNode}
          onCtx={(e, nd) => onOpenCtx(e, nd)}
          onOpenFile={onOpenFile}
          onOpenFolder={onOpenFolder}
          onOpenMyPc={onOpenMyPc}
          onOpenTrash={onOpenTrash}
          trashBadge={trashCount}
        />
      ))}
    </motion.div>
  );
}
