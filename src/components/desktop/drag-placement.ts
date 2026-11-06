import type { Dispatch, SetStateAction } from "react";
import type { Layout, PosMap, Zone, FolderNode } from "./types";
import { srcOf, clonePin } from "./desktop-utils";
import { playUiSound } from "./sound-synth";
import { updateUserApp } from "@/lib/app-actions";

export function handlePlaceItem({
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
}: {
  id: string;
  col: number;
  row: number;
  originZone: Zone;
  layout: Layout;
  setLayout: Dispatch<SetStateAction<Layout>>;
  posMap: PosMap;
  setPosMap: Dispatch<SetStateAction<PosMap>>;
  soundEnabled: boolean;
  showNotification: (msg: string) => void;
  moveToTrash: (id: string) => void;
}) {
  if (originZone === "dock") {
    if (id === "sys-mypc" || id === "sys-trash") {
      setPosMap((prev) => ({ ...prev, [id]: { col, row } }));
      playUiSound("pop", soundEnabled);
      return;
    }

    const dockNode = layout.dock.find((n) => n.id === id);
    if (dockNode) {
      const s = srcOf(dockNode);
      const existing = layout.desktop.find((n) => srcOf(n) === s);
      if (existing) {
        setPosMap((prev) => ({ ...prev, [existing.id]: { col, row } }));
        playUiSound("pop", soundEnabled);
      } else {
        const cloned = clonePin(dockNode);
        setLayout((l) => ({ ...l, desktop: [...l.desktop, cloned] }));
        setPosMap((prev) => ({ ...prev, [cloned.id]: { col, row } }));
        playUiSound("pop", soundEnabled);
        showNotification(`Đã thêm "${cloned.name}" vào Desktop`);
      }
    }
    return;
  }

  const occupiedEntry = Object.entries(posMap).find(
    ([nodeId, p]) => nodeId !== id && p.col === col && p.row === row,
  );

  if (occupiedEntry) {
    const [targetId] = occupiedEntry;

    if (targetId === "sys-trash" && id !== "sys-trash") {
      if (
        id === "sys-mypc" ||
        id === "welcome-file" ||
        layout.desktop.some((n) => n.id === id && n.kind === "app" && n.isSystem)
      ) {
        showNotification("Mục hệ thống không thể xóa vào Thùng rác");
        playUiSound("pop", soundEnabled);
      } else {
        moveToTrash(id);
      }
      return;
    }

    const dragNode = layout.desktop.find((n) => n.id === id);
    const targetNode = layout.desktop.find((n) => n.id === targetId);

    if (
      dragNode &&
      targetNode &&
      targetNode.kind === "folder" &&
      dragNode.kind !== "folder" &&
      id !== "sys-mypc" &&
      id !== "sys-trash" &&
      id !== "welcome-file" &&
      !(dragNode.kind === "app" && dragNode.isSystem)
    ) {
      setLayout((l) => ({
        ...l,
        desktop: l.desktop
          .filter((n) => n.id !== id)
          .map((n) =>
            n.id === targetId
              ? { ...n, children: [...(n as FolderNode).children, dragNode] }
              : n,
          ),
      }));
      setPosMap((prev) => {
        const next = { ...prev };
        delete next[id];
        return next;
      });
      playUiSound("pop", soundEnabled);
      showNotification(`Đã chuyển "${dragNode.name}" vào "${targetNode.name}"`);
      return;
    }

    const myPos = posMap[id] || { col: 0, row: 0 };
    setPosMap((prev) => ({
      ...prev,
      [id]: { col, row },
      [targetId]: myPos,
    }));
    playUiSound("pop", soundEnabled);

    const nodeA = layout.desktop.find((n) => n.id === id);
    if (nodeA && nodeA.kind === "app" && !nodeA.isSystem) {
      updateUserApp(srcOf(nodeA), { grid_col: col, grid_row: row }).catch(
        () => {},
      );
    }
    const nodeB = layout.desktop.find((n) => n.id === targetId);
    if (nodeB && nodeB.kind === "app" && !nodeB.isSystem) {
      updateUserApp(srcOf(nodeB), {
        grid_col: myPos.col,
        grid_row: myPos.row,
      }).catch(() => {});
    }
    return;
  }

  setPosMap((prev) => ({
    ...prev,
    [id]: { col, row },
  }));
  playUiSound("pop", soundEnabled);

  const node = layout.desktop.find((n) => n.id === id);
  if (node && node.kind === "app" && !node.isSystem) {
    updateUserApp(srcOf(node), { grid_col: col, grid_row: row }).catch(
      () => {},
    );
  }
}
