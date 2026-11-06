"use client";

import { useState } from "react";
import type { Dispatch, SetStateAction } from "react";
import type { Layout, Node, PosMap, SlotPos, TrashItem, Zone } from "./types";
import { uid, purgeSrc, srcOf, findTop } from "./desktop-utils";
import { playUiSound } from "./sound-synth";
import { deleteUserApp } from "@/lib/app-actions";

export function useDesktopTrash({
  layout,
  setLayout,
  setPosMap,
  findFreeSlot,
  soundEnabled,
  showNotification,
  setSelectedId,
}: {
  layout: Layout;
  setLayout: Dispatch<SetStateAction<Layout>>;
  setPosMap: Dispatch<SetStateAction<PosMap>>;
  findFreeSlot: (currentPosMap: PosMap) => SlotPos;
  soundEnabled: boolean;
  showNotification: (
    msg: string,
    actionLabel?: string,
    onAction?: () => void,
  ) => void;
  setSelectedId: (id: string | null) => void;
}) {
  const [trash, setTrash] = useState<TrashItem[]>([]);

  const restoreItem = (index: number) => {
    const t = trash[index];
    if (!t) return;
    setLayout((l) => ({ ...l, [t.origin]: [...l[t.origin], t.node] }));
    setPosMap((prev) => {
      const free = findFreeSlot(prev);
      return { ...prev, [t.node.id]: free };
    });
    setTrash((tr) => tr.filter((_, j) => j !== index));
    playUiSound("restore", soundEnabled);
    showNotification(`Đã khôi phục "${t.node.name}" về màn hình`);
  };

  const restoreLastItem = () => {
    if (trash.length === 0) return;
    restoreItem(trash.length - 1);
  };

  const restoreAll = () => {
    const count = trash.length;
    if (count === 0) return;
    setLayout((l) => {
      const desk = [...l.desktop];
      const dk = [...l.dock];
      trash.forEach((t) => {
        if (t.origin === "dock") dk.push(t.node);
        else desk.push(t.node);
      });
      return { desktop: desk, dock: dk };
    });
    setPosMap((prev) => {
      const next = { ...prev };
      trash.forEach((t) => {
        if (t.origin === "desktop") {
          next[t.node.id] = findFreeSlot(next);
        }
      });
      return next;
    });
    setTrash([]);
    playUiSound("restore", soundEnabled);
    showNotification(`Đã khôi phục toàn bộ ${count} mục`);
  };

  const moveToTrash = (nodeId: string) => {
    if (
      nodeId === "sys-mypc" ||
      nodeId === "sys-trash" ||
      nodeId === "welcome-file"
    ) {
      showNotification("Mục hệ thống không thể xóa vào Thùng rác");
      playUiSound("pop", soundEnabled);
      return;
    }

    const top = findTop(layout, nodeId);
    let targetNode: Node | null = null;
    let originZone: Zone = "desktop";

    if (top) {
      originZone = top.z;
      targetNode = layout[top.z as keyof Layout][top.i];
    } else {
      for (const z of ["desktop", "dock"] as Zone[]) {
        for (const n of layout[z]) {
          if (n.kind === "folder") {
            const child = n.children.find((c) => c.id === nodeId);
            if (child) {
              targetNode = child;
              originZone = z;
              break;
            }
          }
        }
        if (targetNode) break;
      }
    }

    if (!targetNode) return;

    if (
      (targetNode.kind === "app" && targetNode.isSystem) ||
      targetNode.id === "welcome-file"
    ) {
      showNotification("Mục hệ thống không thể xóa vào Thùng rác");
      playUiSound("pop", soundEnabled);
      return;
    }

    const s = srcOf(targetNode);
    setLayout((l) => purgeSrc(l, s));
    setPosMap((prev) => {
      const next = { ...prev };
      delete next[nodeId];
      return next;
    });

    const newTrashItem: TrashItem = {
      id: uid(),
      node: targetNode,
      origin: originZone,
      deletedAt: Date.now(),
    };
    setTrash((t) => [...t, newTrashItem]);
    setSelectedId(null);
    playUiSound("trash", soundEnabled);

    showNotification(
      `Đã chuyển "${targetNode.name}" vào Thùng rác`,
      "Hoàn tác",
      () => restoreLastItem(),
    );
  };

  const permDel = async (index: number) => {
    const t = trash[index];
    if (t && t.node.kind === "app" && !t.node.isSystem) {
      try {
        await deleteUserApp(t.node.id);
        showNotification(`Đã xóa vĩnh viễn "${t.node.name}" trên Supabase`);
      } catch (err) {
        console.error("Lỗi xóa user app trên Supabase:", err);
      }
    }
    setTrash((tr) => tr.filter((_, j) => j !== index));
    playUiSound("trash", soundEnabled);
  };

  const emptyTrash = async () => {
    const count = trash.length;
    const userAppsInTrash = trash.filter(
      (t) => t.node.kind === "app" && !t.node.isSystem,
    );
    for (const t of userAppsInTrash) {
      try {
        await deleteUserApp(t.node.id);
      } catch (err) {
        console.error("Lỗi xóa app trong trash:", err);
      }
    }
    setTrash([]);
    playUiSound("trash", soundEnabled);
    showNotification(`Đã dọn sạch thùng rác (${count} mục)`);
  };

  return {
    trash,
    moveToTrash,
    restoreItem,
    restoreLastItem,
    restoreAll,
    permDel,
    emptyTrash,
  };
}
