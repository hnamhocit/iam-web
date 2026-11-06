"use client";

import { useState, useEffect } from "react";
import { useTheme } from "next-themes";
import { useMotionValue } from "framer-motion";
import { WALLPAPERS } from "./desktop/constants";
import type { MappedUser, SystemApp, UserApp } from "./desktop/types";
import { useDesktopState } from "./desktop/use-desktop-state";
import { DesktopWallpaper } from "./desktop/desktop-wallpaper";
import { DesktopMenubar } from "./desktop/desktop-menubar";
import { DesktopCanvas } from "./desktop/desktop-canvas";
import { DesktopDock } from "./desktop/desktop-dock";
import { DesktopToast } from "./desktop/desktop-toast";
import { ContextMenu } from "./desktop/context-menu";
import { AddAppModal } from "./desktop/modals/add-app-modal";
import { FileEditorModal } from "./desktop/modals/file-editor-modal";
import { FolderWindow } from "./desktop/modals/folder-window";
import { TrashWindow } from "./desktop/modals/trash-window";
import { MyPcModal } from "./desktop/modals/my-pc-modal";
import { WallpaperModal } from "./desktop/modals/wallpaper-modal";

export function AccountDashboard({
  user,
  initialSystemApps = [],
  initialUserApps = [],
}: {
  user: MappedUser;
  initialSystemApps?: SystemApp[];
  initialUserApps?: UserApp[];
}) {
  const { resolvedTheme } = useTheme();
  const [mounted, setMounted] = useState(false);
  const mouseX = useMotionValue(Infinity);

  useEffect(() => {
    setMounted(true);
  }, []);

  const state = useDesktopState({
    initialSystemApps,
    initialUserApps,
  });

  const activeWp =
    WALLPAPERS[state.wallpaper as keyof typeof WALLPAPERS] || WALLPAPERS.aurora;
  const isDark = mounted ? resolvedTheme === "dark" : true;

  return (
    <div
      onClick={() => state.setSelectedId(null)}
      className="relative flex h-screen w-full flex-col overflow-hidden bg-background text-foreground select-none"
    >
      {/* ================= WALLPAPER BACKGROUND ================= */}
      <DesktopWallpaper isDark={isDark} wallpaper={activeWp} />

      {/* ================= TOP MENUBAR ================= */}
      <DesktopMenubar
        user={user}
        showGrid={state.showGrid}
        onToggleGrid={() => state.setShowGrid((v) => !v)}
        soundEnabled={state.soundEnabled}
        onToggleSound={() => state.setSoundEnabled((v) => !v)}
        onOpenWallpaper={() => state.setShowWallpaper(true)}
      />

      {/* ================= DESKTOP CANVAS ================= */}
      <DesktopCanvas
        mainRef={state.mainRef}
        gridCols={state.gridCols}
        gridRows={state.gridRows}
        isDragging={state.isDragging}
        showGrid={state.showGrid}
        hoverSlot={state.hoverSlot}
        isOccupied={state.isOccupied}
        posMap={state.posMap}
        draggingId={state.draggingId}
        selectedId={state.selectedId}
        setSelectedId={state.setSelectedId}
        isOverTrash={state.isOverTrash}
        trashCount={state.trash.length}
        desktopNodes={state.layout.desktop}
        renaming={state.renaming}
        renameVal={state.renameVal}
        setRenameVal={state.setRenameVal}
        commitRename={state.commitRename}
        onMainDragOver={state.handleMainDragOver}
        onMainDragLeave={() => {}}
        onMainDrop={state.handleMainDrop}
        onContextMenu={(e) => state.openCtx(e, "desktop")}
        onDragStart={state.onDragStart}
        onDragEnd={state.onDragEnd}
        onDropNode={state.dropNode}
        onOpenMyPc={() => state.setShowMyPc(true)}
        onOpenTrash={() => state.setShowTrash(true)}
        onOpenFolder={state.setOpenFolderId}
        onOpenFile={(f) => state.setOpenFile(f)}
        onOpenCtx={state.openCtx}
        onTrashOverChange={state.setIsOverTrash}
        onTrashDrop={(e) => {
          e.preventDefault();
          e.stopPropagation();
          state.setIsOverTrash(false);
          const id = e.dataTransfer.getData("text/plain");
          if (id && id !== "sys-trash") {
            if (id === "sys-mypc" || id === "welcome-file") {
              state.showNotification("Mục hệ thống không thể xóa vào Thùng rác");
            } else {
              state.moveToTrash(id);
            }
          }
          state.onDragEnd();
        }}
      />

      {/* ================= DOCK ================= */}
      <DesktopDock
        dockNodes={state.layout.dock}
        mouseX={mouseX}
        onDropDock={state.dropDock}
        onDragStart={(e, id) => state.onDragStart(e, id, "dock")}
        onDropNode={state.dropNode}
        onOpenCtx={(e, nd) => {
          if (nd.id === "sys-mypc") state.openCtx(e, "mypc");
          else if (nd.id === "sys-trash") state.openCtx(e, "trash");
          else state.openCtx(e, "node", nd, "dock");
        }}
        onOpenFile={(f) => state.setOpenFile(f)}
        onOpenFolder={state.setOpenFolderId}
        onOpenMyPc={() => state.setShowMyPc(true)}
        onOpenTrash={() => state.setShowTrash(true)}
        trashCount={state.trash.length}
      />

      {/* ================= TOAST NOTIFICATION ================= */}
      <DesktopToast
        toast={state.toast}
        onClose={() => state.setToast(null)}
      />

      {/* ================= OVERLAYS & MODALS ================= */}
      {state.ctx && (
        <ContextMenu
          ctx={state.ctx}
          items={state.ctxItems}
          onClose={state.closeCtx}
        />
      )}
      {state.showAdd && (
        <AddAppModal
          layout={state.layout}
          onClose={() => state.setShowAdd(false)}
          onAdd={state.addApp}
        />
      )}
      {state.openFile && (
        <FileEditorModal
          file={state.openFile}
          onSave={state.handleSaveFile}
          onClose={() => state.setOpenFile(null)}
        />
      )}
      {state.openFolder && state.openFolderZone && (
        <FolderWindow
          folder={state.openFolder}
          zone={state.openFolderZone}
          onDetach={state.detach}
          onDragStart={state.onDragStart}
          onOpenFile={(f) => state.setOpenFile(f)}
          onClose={() => state.setOpenFolderId(null)}
        />
      )}
      {state.showTrash && (
        <TrashWindow
          trash={state.trash}
          onRestore={state.restoreItem}
          onRestoreAll={state.restoreAll}
          onDelete={state.permDel}
          onEmpty={state.emptyTrash}
          onClose={() => state.setShowTrash(false)}
        />
      )}
      {state.showMyPc && (
        <MyPcModal user={user} onClose={() => state.setShowMyPc(false)} />
      )}
      {state.showWallpaper && (
        <WallpaperModal
          current={state.wallpaper}
          onSelect={(k) => {
            state.setWallpaper(k);
            state.showNotification(
              `Đã đổi sang hình nền "${WALLPAPERS[k as keyof typeof WALLPAPERS].name}"`,
            );
          }}
          onClose={() => state.setShowWallpaper(false)}
        />
      )}
    </div>
  );
}
