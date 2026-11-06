"use client";

import React from "react";
import type { AppNode, FileNode, FolderNode, Node } from "../types";
import { Glyph, FileGlyph, FolderGlyph } from "./glyphs";
import { launch } from "../desktop-utils";

export function DesktopIcon({
  node,
  selected,
  renaming,
  renameVal,
  setRenameVal,
  commitRename,
  onSelect,
  onDragStart,
  onDragEnd,
  onDropNode,
  onCtx,
  onOpenFolder,
  onOpenFile,
}: {
  node: Node;
  selected: boolean;
  renaming: boolean;
  renameVal: string;
  setRenameVal: (v: string) => void;
  commitRename: () => void;
  onSelect: (id: string) => void;
  onDragStart: (e: React.DragEvent, id: string) => void;
  onDragEnd: () => void;
  onDropNode: (e: React.DragEvent, targetId: string) => void;
  onCtx: (e: React.MouseEvent, node: Node) => void;
  onOpenFolder: (id: string) => void;
  onOpenFile: (file: FileNode) => void;
}) {
  const isFolder = node.kind === "folder";
  const isFile = node.kind === "file";

  return (
    <div
      draggable={!renaming}
      onDragStart={(e) => !renaming && onDragStart(e, node.id)}
      onDragEnd={onDragEnd}
      onDragOver={(e) => e.preventDefault()}
      onDrop={(e) => {
        e.preventDefault();
        e.stopPropagation();
        onDropNode(e, node.id);
      }}
      onContextMenu={(e) => {
        onSelect(node.id);
        onCtx(e, node);
      }}
      onClick={(e) => {
        e.stopPropagation();
        onSelect(node.id);
      }}
      onDoubleClick={() => {
        if (isFolder) onOpenFolder(node.id);
        else if (isFile) onOpenFile(node as FileNode);
        else launch(node as AppNode);
      }}
      className={`group flex h-full w-full flex-col items-center justify-center gap-1.5 rounded-xl p-2 text-center transition-all ${
        selected
          ? "bg-primary/20 ring-1 ring-primary/45 shadow-sm"
          : "hover:bg-black/5 dark:hover:bg-white/10"
      } ${renaming ? "" : "cursor-pointer"}`}
    >
      <div className="h-14 w-14">
        {isFolder ? (
          <FolderGlyph folder={node as FolderNode} />
        ) : isFile ? (
          <FileGlyph file={node as FileNode} />
        ) : (
          <Glyph app={node as AppNode} />
        )}
      </div>
      {renaming ? (
        <input
          autoFocus
          value={renameVal}
          onChange={(e) => setRenameVal(e.target.value)}
          onBlur={commitRename}
          onKeyDown={(e) => {
            if (e.key === "Enter" || e.key === "Escape") commitRename();
          }}
          onClick={(e) => e.stopPropagation()}
          className="w-full rounded-md border border-primary/60 bg-white/90 px-1 text-center text-[11px] text-slate-900 shadow-sm focus:outline-none dark:bg-black/80 dark:text-white"
        />
      ) : (
        <span className="line-clamp-2 text-[11px] font-medium leading-tight text-slate-800 dark:text-white/95 drop-shadow-[0_1px_2px_rgba(255,255,255,0.9)] dark:drop-shadow-[0_1px_3px_rgba(0,0,0,0.85)]">
          {node.name}
        </span>
      )}
    </div>
  );
}
