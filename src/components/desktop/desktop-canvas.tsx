"use client";

import type { RefObject } from "react";
import type { Node, PosMap, SlotPos, FileNode } from "./types";
import { CELL_W, CELL_H, PAD_X, PAD_Y } from "./constants";
import { SysIcon, TrashSysIcon } from "./icons/system-icons";
import { DesktopIcon } from "./icons/desktop-icon";

export function DesktopCanvas({
  mainRef,
  gridCols,
  gridRows,
  isDragging,
  showGrid,
  hoverSlot,
  isOccupied,
  posMap,
  draggingId,
  selectedId,
  setSelectedId,
  isOverTrash,
  trashCount,
  desktopNodes,
  renaming,
  renameVal,
  setRenameVal,
  commitRename,
  onMainDragOver,
  onMainDragLeave,
  onMainDrop,
  onContextMenu,
  onDragStart,
  onDragEnd,
  onDropNode,
  onOpenMyPc,
  onOpenTrash,
  onOpenFolder,
  onOpenFile,
  onOpenCtx,
  onTrashOverChange,
  onTrashDrop,
}: {
  mainRef: RefObject<HTMLElement | null>;
  gridCols: number;
  gridRows: number;
  isDragging: boolean;
  showGrid: boolean;
  hoverSlot: SlotPos | null;
  isOccupied: (c: number, r: number) => boolean;
  posMap: PosMap;
  draggingId: string | null;
  selectedId: string | null;
  setSelectedId: (id: string | null) => void;
  isOverTrash: boolean;
  trashCount: number;
  desktopNodes: Node[];
  renaming: string | null;
  renameVal: string;
  setRenameVal: (v: string) => void;
  commitRename: () => void;
  onMainDragOver: (e: React.DragEvent) => void;
  onMainDragLeave: () => void;
  onMainDrop: (e: React.DragEvent) => void;
  onContextMenu: (e: React.MouseEvent) => void;
  onDragStart: (e: React.DragEvent, id: string, zone?: "desktop" | "dock") => void;
  onDragEnd: () => void;
  onDropNode: (e: React.DragEvent, targetId: string) => void;
  onOpenMyPc: () => void;
  onOpenTrash: () => void;
  onOpenFolder: (id: string) => void;
  onOpenFile: (f: FileNode) => void;
  onOpenCtx: (
    e: React.MouseEvent,
    type: "desktop" | "trash" | "mypc" | "node",
    node?: Node,
  ) => void;
  onTrashOverChange: (over: boolean) => void;
  onTrashDrop: (e: React.DragEvent) => void;
}) {
  return (
    <main
      ref={mainRef as RefObject<HTMLElement>}
      onDragOver={onMainDragOver}
      onDragLeave={onMainDragLeave}
      onDrop={onMainDrop}
      onContextMenu={onContextMenu}
      className="relative z-10 flex-1 overflow-auto p-4 select-none"
    >
      <div
        className="relative"
        style={{
          minWidth: Math.max(gridCols * CELL_W, 700),
          minHeight: Math.max(gridRows * CELL_H + 80, 500),
        }}
      >
        {/* ── 2D GRID SLOTS (hiển thị khi kéo thả hoặc khi bật chế độ lưới) ── */}
        {(isDragging || showGrid) && (
          <div className="pointer-events-none absolute inset-0 z-0">
            {Array.from({ length: gridRows }).map((_, r) =>
              Array.from({ length: gridCols }).map((_, c) => {
                const isHover = hoverSlot?.col === c && hoverSlot?.row === r;
                const occupied = isOccupied(c, r);
                return (
                  <div
                    key={`guide-${c}-${r}`}
                    style={{
                      position: "absolute",
                      left: PAD_X + c * CELL_W + 4,
                      top: PAD_Y + r * CELL_H + 4,
                      width: CELL_W - 8,
                      height: CELL_H - 8,
                    }}
                    className={`rounded-2xl transition-all duration-150 flex flex-col items-center justify-center ${
                      isHover
                        ? "border-2 border-primary bg-primary/20 shadow-lg shadow-primary/25 scale-105"
                        : occupied
                          ? "border border-dashed border-primary/20 bg-primary/[0.02]"
                          : "border border-dashed border-primary/30 bg-primary/[0.04]"
                    }`}
                  >
                    {!occupied && (
                      <span className="font-mono text-xs font-bold text-primary/40 select-none">
                        +
                      </span>
                    )}
                  </div>
                );
              }),
            )}
          </div>
        )}

        {/* ── SYSTEM ICON: MÁY CỦA TÔI ── */}
        <div
          style={{
            position: "absolute",
            left: PAD_X + (posMap["sys-mypc"]?.col ?? 0) * CELL_W,
            top: PAD_Y + (posMap["sys-mypc"]?.row ?? 0) * CELL_H,
            width: CELL_W,
            height: CELL_H,
            transition: isDragging
              ? "none"
              : "left 0.2s cubic-bezier(0.2,0.8,0.2,1), top 0.2s cubic-bezier(0.2,0.8,0.2,1)",
            zIndex: draggingId === "sys-mypc" ? 40 : 20,
            opacity: draggingId === "sys-mypc" ? 0.4 : 1,
          }}
          draggable
          onDragStart={(e) => onDragStart(e, "sys-mypc", "desktop")}
          onDragEnd={onDragEnd}
        >
          <SysIcon
            emoji="🖥️"
            label="Máy của tôi"
            selected={selectedId === "sys-mypc"}
            onClick={() => {
              setSelectedId("sys-mypc");
              onOpenMyPc();
            }}
            onContextMenu={(e) => onOpenCtx(e, "mypc")}
          />
        </div>

        {/* ── SYSTEM ICON: THÙNG RÁC ── */}
        <div
          style={{
            position: "absolute",
            left: PAD_X + (posMap["sys-trash"]?.col ?? 0) * CELL_W,
            top: PAD_Y + (posMap["sys-trash"]?.row ?? 1) * CELL_H,
            width: CELL_W,
            height: CELL_H,
            transition: isDragging
              ? "none"
              : "left 0.2s cubic-bezier(0.2,0.8,0.2,1), top 0.2s cubic-bezier(0.2,0.8,0.2,1)",
            zIndex: draggingId === "sys-trash" ? 40 : 20,
            opacity: draggingId === "sys-trash" ? 0.4 : 1,
          }}
          draggable
          onDragStart={(e) => onDragStart(e, "sys-trash", "desktop")}
          onDragEnd={onDragEnd}
        >
          <TrashSysIcon
            badge={trashCount}
            isOver={isOverTrash}
            selected={selectedId === "sys-trash"}
            onClick={() => {
              setSelectedId("sys-trash");
              onOpenTrash();
            }}
            onContextMenu={(e) => onOpenCtx(e, "trash")}
            onDragOver={(e) => {
              e.preventDefault();
              e.stopPropagation();
              if (draggingId !== "sys-trash") {
                e.dataTransfer.dropEffect = "move";
                onTrashOverChange(true);
              }
            }}
            onDragLeave={() => onTrashOverChange(false)}
            onDrop={onTrashDrop}
          />
        </div>

        {/* ── DESKTOP NODES ── */}
        {desktopNodes
          .filter((n) => n.id !== "sys-mypc" && n.id !== "sys-trash")
          .map((n) => {
            const pos = posMap[n.id] ?? { col: 0, row: 2 };
            const isThisDragging = draggingId === n.id;
            return (
              <div
                key={n.id}
                style={{
                  position: "absolute",
                  left: PAD_X + pos.col * CELL_W,
                  top: PAD_Y + pos.row * CELL_H,
                  width: CELL_W,
                  height: CELL_H,
                  transition: isDragging
                    ? "none"
                    : "left 0.2s cubic-bezier(0.2,0.8,0.2,1), top 0.2s cubic-bezier(0.2,0.8,0.2,1)",
                  zIndex: isThisDragging ? 40 : 20,
                  opacity: isThisDragging ? 0.4 : 1,
                }}
              >
                <DesktopIcon
                  node={n}
                  selected={selectedId === n.id}
                  renaming={renaming === n.id}
                  renameVal={renameVal}
                  setRenameVal={setRenameVal}
                  commitRename={commitRename}
                  onSelect={setSelectedId}
                  onDragStart={(e, id) => onDragStart(e, id, "desktop")}
                  onDragEnd={onDragEnd}
                  onDropNode={onDropNode}
                  onCtx={(e, nd) => onOpenCtx(e, "node", nd)}
                  onOpenFolder={onOpenFolder}
                  onOpenFile={onOpenFile}
                />
              </div>
            );
          })}
      </div>
    </main>
  );
}
