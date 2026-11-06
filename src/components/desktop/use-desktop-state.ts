"use client";

import { useState, useEffect, useMemo } from "react";
import type {
  SystemApp,
  UserApp,
  Layout,
  PosMap,
  SlotPos,
  FileNode,
  FolderNode,
  Zone,
  Toast,
} from "./types";
import { uid, findTop } from "./desktop-utils";
import { buildLayoutFromApps } from "./layout-helpers";
import { useDesktopStorage } from "./use-desktop-storage";
import { useDesktopTrash } from "./use-desktop-trash";
import { useDesktopCrud } from "./use-desktop-crud";
import { useDesktopDrag } from "./use-desktop-drag";
import { useDesktopContextMenu } from "./use-desktop-context-menu";
import { useGridDimensions } from "./use-grid-dimensions";
import { useDesktopShortcuts } from "./use-desktop-shortcuts";

export function useDesktopState({
  initialSystemApps = [],
  initialUserApps = [],
}: {
  initialSystemApps?: SystemApp[];
  initialUserApps?: UserApp[];
}) {
  const initialData = useMemo(
    () => buildLayoutFromApps(initialSystemApps, initialUserApps),
    [initialSystemApps, initialUserApps],
  );

  const [layout, setLayout] = useState<Layout>(() => initialData.layout);
  const [showGrid, setShowGrid] = useState(false);
  const [selectedId, setSelectedId] = useState<string | null>(null);
  const [toast, setToast] = useState<Toast | null>(null);

  /* Modals */
  const [showAdd, setShowAdd] = useState(false);
  const [openFolderId, setOpenFolderId] = useState<string | null>(null);
  const [openFile, setOpenFile] = useState<FileNode | null>(null);
  const [showTrash, setShowTrash] = useState(false);
  const [showMyPc, setShowMyPc] = useState(false);
  const [showWallpaper, setShowWallpaper] = useState(false);

  const { mainRef, gridCols, gridRows } = useGridDimensions();

  /* Storage */
  const {
    wallpaper,
    setWallpaper,
    soundEnabled,
    setSoundEnabled,
    posMap,
    setPosMap,
  } = useDesktopStorage(initialData.initialPosMap);

  /* Sync with server props */
  useEffect(() => {
    const res = buildLayoutFromApps(initialSystemApps, initialUserApps);
    setLayout(res.layout);
    setPosMap((prev) => ({
      ...res.initialPosMap,
      ...prev,
    }));
  }, [initialSystemApps, initialUserApps, setPosMap]);

  const findFreeSlot = (currentPosMap: PosMap): SlotPos => {
    const occupied = new Set(
      Object.values(currentPosMap).map((p) => `${p.col}-${p.row}`),
    );
    for (let c = 0; c < gridCols; c++) {
      for (let r = 0; r < gridRows; r++) {
        if (!occupied.has(`${c}-${r}`)) return { col: c, row: r };
      }
    }
    return { col: 0, row: gridRows };
  };

  /* Assign slots to new apps and cleanup deleted */
  useEffect(() => {
    setPosMap((prev) => {
      let changed = false;
      const next: PosMap = { ...prev };

      if (!next["sys-mypc"]) {
        next["sys-mypc"] = { col: 0, row: 0 };
        changed = true;
      }
      if (!next["sys-trash"]) {
        next["sys-trash"] = { col: 0, row: 1 };
        changed = true;
      }

      for (const n of layout.desktop) {
        if (!next[n.id]) {
          next[n.id] = findFreeSlot(next);
          changed = true;
        }
      }

      const validDesktopIds = new Set([
        "sys-mypc",
        "sys-trash",
        ...layout.desktop.map((n) => n.id),
      ]);
      for (const id of Object.keys(next)) {
        if (!validDesktopIds.has(id)) {
          delete next[id];
          changed = true;
        }
      }

      return changed ? next : prev;
    });
  }, [layout.desktop, gridCols, gridRows, setPosMap]);

  const showNotification = (
    message: string,
    actionLabel?: string,
    onAction?: () => void,
  ) => {
    const id = uid();
    setToast({ id, message, actionLabel, onAction });
    setTimeout(() => {
      setToast((curr) => (curr?.id === id ? null : curr));
    }, 4000);
  };

  /* Sub-hooks */
  const trashLogic = useDesktopTrash({
    layout,
    setLayout,
    setPosMap,
    findFreeSlot,
    soundEnabled,
    showNotification,
    setSelectedId,
  });

  const crudLogic = useDesktopCrud({
    layout,
    setLayout,
    posMap,
    setPosMap,
    findFreeSlot,
    gridRows,
    gridCols,
    soundEnabled,
    showNotification,
  });

  const dragLogic = useDesktopDrag({
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
    moveToTrash: trashLogic.moveToTrash,
  });

  const ctxMenuLogic = useDesktopContextMenu({
    layout,
    trash: trashLogic.trash,
    showGrid,
    setShowGrid,
    setShowAdd,
    setShowTrash,
    setShowMyPc,
    setShowWallpaper,
    createTextFile: crudLogic.createTextFile,
    createFolder: crudLogic.createFolder,
    restoreLastItem: trashLogic.restoreLastItem,
    emptyTrash: trashLogic.emptyTrash,
    arrangeVertical: crudLogic.arrangeVertical,
    arrangeHorizontal: crudLogic.arrangeHorizontal,
    sortByName: crudLogic.sortByName,
    sortDesktopByType: crudLogic.sortDesktopByType,
    setOpenFile,
    setOpenFolderId,
    pinToggle: crudLogic.pinToggle,
    startRename: crudLogic.startRename,
    moveToTrash: trashLogic.moveToTrash,
  });

  const isModalOpen = Boolean(
    openFile || showAdd || showTrash || showMyPc || showWallpaper,
  );

  useDesktopShortcuts({
    isModalOpen,
    renaming: crudLogic.renaming,
    selectedId,
    setSelectedId,
    soundEnabled,
    showNotification,
    moveToTrash: trashLogic.moveToTrash,
    restoreLastItem: trashLogic.restoreLastItem,
    closeCtx: ctxMenuLogic.closeCtx,
  });

  const zoneOfNode = (id: string): Zone | null => {
    const t = findTop(layout, id);
    return t ? t.z : null;
  };

  const openFolder = openFolderId
    ? ([...layout.desktop, ...layout.dock].find(
        (n) => n.id === openFolderId && n.kind === "folder",
      ) as FolderNode | undefined)
    : undefined;
  const openFolderZone = openFolderId ? zoneOfNode(openFolderId) : null;

  const isOccupied = (c: number, r: number) => {
    return Object.values(posMap).some((p) => p.col === c && p.row === r);
  };

  const handleSaveFile = (id: string, name: string, content: string) => {
    crudLogic.saveFile(id, name, content);
    setOpenFile((prev) =>
      prev?.id === id ? { ...prev, name, content, updatedAt: Date.now() } : prev,
    );
  };

  return {
    layout,
    setLayout,
    wallpaper,
    setWallpaper,
    soundEnabled,
    setSoundEnabled,
    posMap,
    showGrid,
    setShowGrid,
    selectedId,
    setSelectedId,
    toast,
    setToast,
    showNotification,
    mainRef,
    gridCols,
    gridRows,
    isOccupied,
    showAdd,
    setShowAdd,
    openFolderId,
    setOpenFolderId,
    openFolder,
    openFolderZone,
    openFile,
    setOpenFile,
    showTrash,
    setShowTrash,
    showMyPc,
    setShowMyPc,
    showWallpaper,
    setShowWallpaper,
    handleSaveFile,
    ...trashLogic,
    ...crudLogic,
    ...dragLogic,
    ...ctxMenuLogic,
  };
}
