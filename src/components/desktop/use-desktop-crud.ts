"use client";

import { useState } from "react";
import type { Dispatch, SetStateAction } from "react";
import type { Layout, Node, FileNode, PosMap, SlotPos, Zone } from "./types";
import { uid, srcOf, clonePin } from "./desktop-utils";
import { playUiSound } from "./sound-synth";
import { mapUserAppToNode } from "./layout-helpers";
import { addUserApp, updateUserApp } from "@/lib/app-actions";

export function useDesktopCrud({
  layout,
  setLayout,
  posMap,
  setPosMap,
  findFreeSlot,
  gridRows,
  gridCols,
  soundEnabled,
  showNotification,
}: {
  layout: Layout;
  setLayout: Dispatch<SetStateAction<Layout>>;
  posMap: PosMap;
  setPosMap: Dispatch<SetStateAction<PosMap>>;
  findFreeSlot: (currentPosMap: PosMap) => SlotPos;
  gridRows: number;
  gridCols: number;
  soundEnabled: boolean;
  showNotification: (msg: string) => void;
}) {
  const [renaming, setRenaming] = useState<string | null>(null);
  const [renameVal, setRenameVal] = useState("");

  const createFolder = () => {
    const newId = uid();
    const free = findFreeSlot(posMap);
    setLayout((l) => ({
      ...l,
      desktop: [
        ...l.desktop,
        { id: newId, kind: "folder", name: "Thư mục mới", children: [] },
      ],
    }));
    setPosMap((prev) => ({ ...prev, [newId]: free }));
    setRenaming(newId);
    setRenameVal("Thư mục mới");
    playUiSound("pop", soundEnabled);
  };

  const createTextFile = () => {
    const newId = uid();
    const free = findFreeSlot(posMap);
    const newFile: FileNode = {
      id: newId,
      src: newId,
      kind: "file",
      name: "Ghi chú mới.txt",
      content: "",
      fileType: "txt",
      updatedAt: Date.now(),
    };
    setLayout((l) => ({ ...l, desktop: [...l.desktop, newFile] }));
    setPosMap((prev) => ({ ...prev, [newId]: free }));
    setRenaming(newId);
    setRenameVal("Ghi chú mới.txt");
    playUiSound("pop", soundEnabled);
  };

  const addApp = async (name: string, url: string, icon: string) => {
    try {
      const free = findFreeSlot(posMap);
      const savedApp = await addUserApp({
        name,
        url,
        icon_url: icon || null,
        is_pinned: false,
        dock_order: 0,
        grid_col: free.col,
        grid_row: free.row,
      });

      const newAppNode = mapUserAppToNode(savedApp);

      setLayout((l) => ({
        ...l,
        desktop: [...l.desktop, newAppNode],
      }));
      setPosMap((prev) => ({ ...prev, [newAppNode.id]: free }));
      playUiSound("pop", soundEnabled);
      showNotification(`Đã lưu ứng dụng "${name}" vào Supabase`);
    } catch (err: unknown) {
      const msg =
        err instanceof Error ? err.message : "Không thể thêm ứng dụng";
      showNotification(`Lỗi: ${msg}`);
      throw err;
    }
  };

  const saveFile = (id: string, name: string, content: string) => {
    setLayout((l) => {
      const updateNode = (n: Node): Node => {
        if (n.id === id && n.kind === "file")
          return { ...n, name, content, updatedAt: Date.now() };
        if (n.kind === "folder") {
          return {
            ...n,
            children: n.children.map((c) =>
              c.id === id && c.kind === "file"
                ? { ...c, name, content, updatedAt: Date.now() }
                : c,
            ),
          };
        }
        return n;
      };
      return {
        desktop: l.desktop.map(updateNode),
        dock: l.dock.map(updateNode),
      };
    });
    showNotification(`Đã lưu "${name}"`);
  };

  const startRename = (n: Node) => {
    setRenaming(n.id);
    setRenameVal(n.name);
  };

  const commitRename = async () => {
    if (!renaming) return;
    const v = renameVal.trim() || "Không tên";
    const targetNode = [...layout.desktop, ...layout.dock].find(
      (n) => n.id === renaming,
    );

    if (targetNode && targetNode.kind === "app" && !targetNode.isSystem) {
      try {
        await updateUserApp(renaming, { name: v });
      } catch (err) {
        console.error("Lỗi đổi tên app trên Supabase:", err);
      }
    }

    setLayout((l) => {
      const update = (n: Node): Node =>
        n.id === renaming ? { ...n, name: v } : n;
      return { desktop: l.desktop.map(update), dock: l.dock.map(update) };
    });
    setRenaming(null);
  };

  const arrangeVertical = () => {
    const allIds = [
      "sys-mypc",
      "sys-trash",
      ...layout.desktop.map((n) => n.id),
    ];
    const newPos: PosMap = {};
    allIds.forEach((id, index) => {
      const col = Math.floor(index / gridRows);
      const row = index % gridRows;
      newPos[id] = { col, row };
    });
    setPosMap(newPos);
    playUiSound("pop", soundEnabled);
    showNotification("Đã sắp xếp biểu tượng thành 1 cột dọc");
  };

  const arrangeHorizontal = () => {
    const allIds = [
      "sys-mypc",
      "sys-trash",
      ...layout.desktop.map((n) => n.id),
    ];
    const newPos: PosMap = {};
    allIds.forEach((id, index) => {
      const row = Math.floor(index / gridCols);
      const col = index % gridCols;
      newPos[id] = { col, row };
    });
    setPosMap(newPos);
    playUiSound("pop", soundEnabled);
    showNotification("Đã sắp xếp biểu tượng thành 1 hàng ngang");
  };

  const sortByName = () => {
    const sorted = [...layout.desktop].sort((a, b) =>
      a.name.localeCompare(b.name, "vi"),
    );
    setLayout((l) => ({ ...l, desktop: sorted }));
    const allIds = ["sys-mypc", "sys-trash", ...sorted.map((n) => n.id)];
    const newPos: PosMap = {};
    allIds.forEach((id, index) => {
      const col = Math.floor(index / gridRows);
      const row = index % gridRows;
      newPos[id] = { col, row };
    });
    setPosMap(newPos);
    playUiSound("click", soundEnabled);
    showNotification("Đã sắp xếp biểu tượng theo tên A-Z");
  };

  const sortDesktopByType = () => {
    const sorted = [...layout.desktop].sort((a, b) => {
      const order = { folder: 1, file: 2, app: 3 };
      return (order[a.kind] || 9) - (order[b.kind] || 9);
    });
    setLayout((l) => ({ ...l, desktop: sorted }));
    const allIds = ["sys-mypc", "sys-trash", ...sorted.map((n) => n.id)];
    const newPos: PosMap = {};
    allIds.forEach((id, index) => {
      const col = Math.floor(index / gridRows);
      const row = index % gridRows;
      newPos[id] = { col, row };
    });
    setPosMap(newPos);
    playUiSound("click", soundEnabled);
    showNotification(
      "Đã sắp xếp biểu tượng theo loại (Thư mục ➔ Tệp ➔ Ứng dụng)",
    );
  };

  const pinToggle = (n: Node, zone: Zone) => {
    if (n.id === "sys-mypc" || n.id === "sys-trash") {
      showNotification("Mục hệ thống luôn được ghim trên thanh Dock");
      return;
    }

    const isCurrentlyPinned = layout.dock.some(
      (x) => x.id === n.id || srcOf(x) === srcOf(n),
    );
    const willPin = !isCurrentlyPinned;

    setLayout((l) => {
      if (isCurrentlyPinned) {
        return {
          ...l,
          dock: l.dock.filter((x) => x.id !== n.id && srcOf(x) !== srcOf(n)),
        };
      }
      return { ...l, dock: [...l.dock, clonePin(n)] };
    });
    playUiSound("pop", soundEnabled);
    showNotification(
      willPin
        ? `Đã ghim "${n.name}" vào thanh Dock`
        : `Đã bỏ ghim "${n.name}" khỏi thanh Dock`,
    );

    if (n.kind === "app" && !n.isSystem) {
      updateUserApp(srcOf(n), {
        is_pinned: willPin,
        dock_order: willPin ? layout.dock.length : 0,
      }).catch((err: unknown) => console.warn("Lỗi đồng bộ ghim lên Supabase:", err));
    }
  };

  return {
    renaming,
    renameVal,
    setRenameVal,
    createFolder,
    createTextFile,
    addApp,
    saveFile,
    startRename,
    commitRename,
    arrangeVertical,
    arrangeHorizontal,
    sortByName,
    sortDesktopByType,
    pinToggle,
  };
}
