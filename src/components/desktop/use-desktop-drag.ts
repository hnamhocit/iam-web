"use client";

import { useState, useEffect } from "react";
import type { Dispatch, SetStateAction, RefObject } from "react";
import type { Layout, PosMap, SlotPos, Zone } from "./types";
import { CELL_W, CELL_H, PAD_X, PAD_Y } from "./constants";
import { clonePin, findTop, detachFromFolder } from "./desktop-utils";
import { playUiSound } from "./sound-synth";
import { updateUserApp } from "@/lib/app-actions";
import { handlePlaceItem } from "./drag-placement";

export function useDesktopDrag({
  layout,
  setLayout,
  posMap,
  setPosMap,
  findFreeSlot,
  gridCols,
  gridRows,
  mainRef,
  soundEnabled,
  showNotification,
  moveToTrash,
}: {
  layout: Layout;
  setLayout: Dispatch<SetStateAction<Layout>>;
  posMap: PosMap;
  setPosMap: Dispatch<SetStateAction<PosMap>>;
  findFreeSlot: (currentPosMap: PosMap) => SlotPos;
  gridCols: number;
  gridRows: number;
  mainRef: RefObject<HTMLElement | null>;
  soundEnabled: boolean;
  showNotification: (msg: string) => void;
  moveToTrash: (id: string) => void;
}) {
  const [isDragging, setIsDragging] = useState(false);
  const [draggingId, setDraggingId] = useState<string | null>(null);
  const [dragOriginZone, setDragOriginZone] = useState<Zone | null>(null);
  const [hoverSlot, setHoverSlot] = useState<SlotPos | null>(null);
  const [isOverTrash, setIsOverTrash] = useState(false);

  useEffect(() => {
    const handleWindowDragEnd = () => {
      setIsDragging(false);
      setDraggingId(null);
      setHoverSlot(null);
      setIsOverTrash(false);
    };
    window.addEventListener("dragend", handleWindowDragEnd);
    return () => window.removeEventListener("dragend", handleWindowDragEnd);
  }, []);

  const onDragStart = (
    e: React.DragEvent,
    id: string,
    zone: Zone = "desktop",
  ) => {
    e.dataTransfer.effectAllowed = "move";
    e.dataTransfer.setData("text/plain", id);
    e.dataTransfer.setData("application/vntez-origin", zone);
    setIsDragging(true);
    setDraggingId(id);
    setDragOriginZone(zone);
    playUiSound("click", soundEnabled);
  };

  const onDragEnd = () => {
    setIsDragging(false);
    setDraggingId(null);
    setDragOriginZone(null);
    setHoverSlot(null);
    setIsOverTrash(false);
  };

  const placeItemAt = (
    id: string,
    col: number,
    row: number,
    originZone: Zone = "desktop",
  ) => {
    handlePlaceItem({
      id,
      col,
      row,
      originZone,
      layout,
      setLayout,
      posMap,
      setPosMap,
      soundEnabled,
      showNotification,
      moveToTrash,
    });
  };

  const handleMainDragOver = (e: React.DragEvent) => {
    e.preventDefault();
    e.dataTransfer.dropEffect = "move";
    if (!mainRef.current) return;
    const rect = mainRef.current.getBoundingClientRect();
    const relX = e.clientX - rect.left - PAD_X;
    const relY = e.clientY - rect.top - PAD_Y;
    const c = Math.max(0, Math.min(gridCols - 1, Math.floor(relX / CELL_W)));
    const r = Math.max(0, Math.min(gridRows - 1, Math.floor(relY / CELL_H)));
    if (!hoverSlot || hoverSlot.col !== c || hoverSlot.row !== r) {
      setHoverSlot({ col: c, row: r });
    }
  };

  const handleMainDrop = (e: React.DragEvent) => {
    e.preventDefault();
    const id = e.dataTransfer.getData("text/plain");
    const originZone =
      (e.dataTransfer.getData("application/vntez-origin") as Zone) ||
      dragOriginZone ||
      "desktop";

    if (!id || !mainRef.current) {
      onDragEnd();
      return;
    }
    const rect = mainRef.current.getBoundingClientRect();
    const relX = e.clientX - rect.left - PAD_X;
    const relY = e.clientY - rect.top - PAD_Y;
    const c = Math.max(0, Math.min(gridCols - 1, Math.floor(relX / CELL_W)));
    const r = Math.max(0, Math.min(gridRows - 1, Math.floor(relY / CELL_H)));

    placeItemAt(id, c, r, originZone);
    onDragEnd();
  };

  const dropDock = (e: React.DragEvent) => {
    e.preventDefault();
    const id = e.dataTransfer.getData("text/plain");
    if (id) {
      if (layout.dock.some((n) => n.id === id)) {
        onDragEnd();
        return;
      }
      const top = findTop(layout, id);
      const node = top ? (layout[top.z as keyof Layout][top.i]) : null;
      if (node) {
        setLayout((l) => ({ ...l, dock: [...l.dock, clonePin(node)] }));
        playUiSound("pop", soundEnabled);
        showNotification(`Đã ghim "${node.name}" vào thanh Dock`);
        if (node.kind === "app" && !node.isSystem) {
          updateUserApp(node.id, {
            is_pinned: true,
            dock_order: layout.dock.length,
          }).catch(() => {});
        }
      }
    }
    onDragEnd();
  };

  const dropNode = (e: React.DragEvent, targetId: string) => {
    e.preventDefault();
    e.stopPropagation();
    const id = e.dataTransfer.getData("text/plain");
    const originZone =
      (e.dataTransfer.getData("application/vntez-origin") as Zone) ||
      dragOriginZone ||
      "desktop";

    if (!id || id === targetId) {
      onDragEnd();
      return;
    }

    if (originZone === "dock") {
      const dragDockIndex = layout.dock.findIndex((n) => n.id === id);
      const targetDockIndex = layout.dock.findIndex((n) => n.id === targetId);
      if (dragDockIndex >= 0 && targetDockIndex >= 0) {
        setLayout((l) => {
          const nextDock = [...l.dock];
          const [moved] = nextDock.splice(dragDockIndex, 1);
          nextDock.splice(targetDockIndex, 0, moved);
          return { ...l, dock: nextDock };
        });
        playUiSound("pop", soundEnabled);
        onDragEnd();
        return;
      }
    }

    if (targetId === "sys-trash") {
      if (id === "sys-mypc" || id === "sys-trash" || id === "welcome-file") {
        showNotification("Mục hệ thống không thể xóa vào Thùng rác");
        playUiSound("pop", soundEnabled);
      } else if (originZone === "dock") {
        setLayout((l) => ({
          ...l,
          dock: l.dock.filter((x) => x.id !== id),
        }));
        playUiSound("pop", soundEnabled);
        showNotification("Đã bỏ ghim khỏi thanh Dock");
      } else {
        moveToTrash(id);
      }
      onDragEnd();
      return;
    }

    const targetPos = posMap[targetId];
    if (targetPos) {
      placeItemAt(id, targetPos.col, targetPos.row, originZone);
    }
    onDragEnd();
  };

  const detach = (folderId: string, itemId: string, zone: Zone) => {
    setLayout((l) => detachFromFolder(l, folderId, itemId, zone));
    setPosMap((prev) => {
      const free = findFreeSlot(prev);
      return { ...prev, [itemId]: free };
    });
    playUiSound("pop", soundEnabled);
  };

  return {
    isDragging,
    draggingId,
    hoverSlot,
    isOverTrash,
    setIsOverTrash,
    onDragStart,
    onDragEnd,
    handleMainDragOver,
    handleMainDrop,
    dropDock,
    dropNode,
    detach,
  };
}
