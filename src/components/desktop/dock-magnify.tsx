"use client";

import { useRef } from "react";
import { motion, useMotionValue, useSpring, useTransform } from "framer-motion";
import type { Node, FileNode, FolderNode, AppNode } from "./types";
import { launch } from "./desktop-utils";
import { MyPcDockIcon, TrashDockIcon } from "./icons/system-dock-icons";
import { FolderGlyph, FileGlyph, Glyph } from "./icons/glyphs";

export function DockMagnify({
  node,
  mouseX,
  onDragStart,
  onDropNode,
  onCtx,
  onOpenFile,
  onOpenFolder,
  onOpenMyPc,
  onOpenTrash,
  trashBadge,
}: {
  node: Node;
  mouseX: ReturnType<typeof useMotionValue<number>>;
  onDragStart: (e: React.DragEvent, id: string) => void;
  onDropNode: (e: React.DragEvent, targetId: string) => void;
  onCtx: (e: React.MouseEvent, node: Node) => void;
  onOpenFile: (file: FileNode) => void;
  onOpenFolder: (id: string) => void;
  onOpenMyPc?: () => void;
  onOpenTrash?: () => void;
  trashBadge?: number;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const distance = useTransform(mouseX, (v) => {
    const b = ref.current?.getBoundingClientRect() ?? { x: 0, width: 0 };
    return v - b.x - b.width / 2;
  });
  const size = useSpring(useTransform(distance, [-190, 0, 190], [52, 92, 52]), {
    mass: 0.1,
    stiffness: 150,
    damping: 14,
  });
  const lift = useSpring(useTransform(distance, [-190, 0, 190], [0, -18, 0]), {
    mass: 0.1,
    stiffness: 150,
    damping: 14,
  });
  const op = useSpring(
    useTransform(distance, [-90, -40, 40, 90], [0, 1, 1, 0]),
    { mass: 0.1, stiffness: 200, damping: 20 },
  );

  const isFolder = node.kind === "folder";
  const isFile = node.kind === "file";

  return (
    <motion.div
      ref={ref}
      draggable
      onDragStart={(e) => onDragStart(e as unknown as React.DragEvent, node.id)}
      onDragOver={(e) => e.preventDefault()}
      onDrop={(e) => {
        e.preventDefault();
        e.stopPropagation();
        onDropNode(e as unknown as React.DragEvent, node.id);
      }}
      onContextMenu={(e) => onCtx(e as unknown as React.MouseEvent, node)}
      onClick={() => {
        if (node.id === "sys-mypc") onOpenMyPc?.();
        else if (node.id === "sys-trash") onOpenTrash?.();
        else if (isFolder) onOpenFolder(node.id);
        else if (isFile) onOpenFile(node as FileNode);
        else launch(node as AppNode);
      }}
      style={{ width: size, height: size, y: lift }}
      className="group relative flex shrink-0 items-end justify-center cursor-pointer"
    >
      <motion.span
        style={{ opacity: op }}
        className="pointer-events-none absolute -top-9 left-1/2 -translate-x-1/2 whitespace-nowrap rounded-md bg-slate-900/90 px-2.5 py-1 text-[11px] font-medium text-white shadow-lg backdrop-blur-md dark:bg-white/90 dark:text-slate-900"
      >
        {node.name}
      </motion.span>
      {node.id === "sys-mypc" ? (
        <MyPcDockIcon />
      ) : node.id === "sys-trash" ? (
        <TrashDockIcon isFull={Boolean(trashBadge && trashBadge > 0)} />
      ) : isFolder ? (
        <FolderGlyph folder={node as FolderNode} />
      ) : isFile ? (
        <FileGlyph file={node as FileNode} />
      ) : (
        <Glyph app={node as AppNode} />
      )}
      {node.id === "sys-trash" &&
        typeof trashBadge === "number" &&
        trashBadge > 0 && (
          <span className="pointer-events-none absolute -top-1 -right-1 z-10 flex h-4 min-w-4 items-center justify-center rounded-full bg-rose-500 px-1 text-[9px] font-bold text-white shadow ring-2 ring-white dark:ring-[#15101f]">
            {trashBadge}
          </span>
        )}
    </motion.div>
  );
}
