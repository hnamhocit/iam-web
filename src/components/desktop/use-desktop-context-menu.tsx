"use client";

import { useState, useMemo } from "react";
import {
  FileText,
  FolderOpen,
  ExternalLink,
  Undo2,
  ArrowDown,
  ArrowRight,
  ArrowUpDown,
  Grid as GridIcon,
  Image as ImageIcon,
  Trash,
  Monitor,
  Download,
  Pin,
  PinOff,
  Pencil,
} from "lucide-react";
import type { Layout, Node, Zone, FileNode, AppNode, TrashItem } from "./types";
import type { Ctx, CtxItem } from "./context-menu";
import { launch, srcOf } from "./desktop-utils";

export function useDesktopContextMenu({
  layout,
  trash,
  showGrid,
  setShowGrid,
  setShowAdd,
  setShowTrash,
  setShowMyPc,
  setShowWallpaper,
  createTextFile,
  createFolder,
  restoreLastItem,
  emptyTrash,
  arrangeVertical,
  arrangeHorizontal,
  sortByName,
  sortDesktopByType,
  setOpenFile,
  setOpenFolderId,
  pinToggle,
  startRename,
  moveToTrash,
}: {
  layout: Layout;
  trash: TrashItem[];
  showGrid: boolean;
  setShowGrid: (cb: (v: boolean) => boolean) => void;
  setShowAdd: (v: boolean) => void;
  setShowTrash: (v: boolean) => void;
  setShowMyPc: (v: boolean) => void;
  setShowWallpaper: (v: boolean) => void;
  createTextFile: () => void;
  createFolder: () => void;
  restoreLastItem: () => void;
  emptyTrash: () => void;
  arrangeVertical: () => void;
  arrangeHorizontal: () => void;
  sortByName: () => void;
  sortDesktopByType: () => void;
  setOpenFile: (f: FileNode) => void;
  setOpenFolderId: (id: string) => void;
  pinToggle: (n: Node, zone: Zone) => void;
  startRename: (n: Node) => void;
  moveToTrash: (id: string) => void;
}) {
  const [ctx, setCtx] = useState<Ctx>(null);

  const openCtx = (
    e: React.MouseEvent,
    type: "desktop" | "trash" | "mypc" | "node",
    node?: Node,
    zone?: Zone,
  ) => {
    e.preventDefault();
    e.stopPropagation();
    setCtx({ x: e.clientX, y: e.clientY, type, node, zone });
  };

  const closeCtx = () => setCtx(null);

  const ctxItems = useMemo((): CtxItem[] => {
    if (!ctx) return [];

    if (ctx.type === "desktop") {
      return [
        {
          label: "Tạo tệp ghi chú mới",
          icon: <FileText className="h-4 w-4" />,
          onClick: createTextFile,
        },
        {
          label: "Tạo thư mục mới",
          icon: <FolderOpen className="h-4 w-4" />,
          onClick: createFolder,
        },
        {
          label: "Thêm lối tắt ứng dụng",
          icon: <ExternalLink className="h-4 w-4" />,
          onClick: () => setShowAdd(true),
        },
        {
          label:
            trash.length > 0
              ? `Khôi phục: "${trash[trash.length - 1].node.name}"`
              : "Khôi phục mục vừa xóa",
          icon: <Undo2 className="h-4 w-4" />,
          disabled: trash.length === 0,
          onClick: restoreLastItem,
        },
        {
          label: "Sắp xếp thành cột dọc",
          icon: <ArrowDown className="h-4 w-4" />,
          onClick: arrangeVertical,
        },
        {
          label: "Sắp xếp thành hàng ngang",
          icon: <ArrowRight className="h-4 w-4" />,
          onClick: arrangeHorizontal,
        },
        {
          label: "Sắp xếp theo tên (A-Z)",
          icon: <ArrowUpDown className="h-4 w-4" />,
          onClick: sortByName,
        },
        {
          label: "Sắp xếp theo loại",
          icon: <ArrowUpDown className="h-4 w-4" />,
          onClick: sortDesktopByType,
        },
        {
          label: showGrid ? "Ẩn lưới ô Desktop" : "Hiển thị lưới ô Desktop",
          icon: <GridIcon className="h-4 w-4" />,
          onClick: () => setShowGrid((v) => !v),
        },
        {
          label: "Đổi hình nền Desktop",
          icon: <ImageIcon className="h-4 w-4" />,
          onClick: () => setShowWallpaper(true),
        },
        ...(trash.length > 0
          ? [
              {
                label: "Dọn sạch thùng rác",
                icon: <Trash className="h-4 w-4" />,
                danger: true,
                onClick: emptyTrash,
              },
            ]
          : []),
      ];
    }

    if (ctx.type === "trash") {
      return [
        {
          label: "Mở thùng rác",
          icon: <FolderOpen className="h-4 w-4" />,
          onClick: () => setShowTrash(true),
        },
        {
          label: "Khôi phục mục vừa xóa",
          icon: <Undo2 className="h-4 w-4" />,
          disabled: trash.length === 0,
          onClick: restoreLastItem,
        },
        {
          label: "Dọn sạch thùng rác",
          icon: <Trash className="h-4 w-4" />,
          danger: true,
          disabled: trash.length === 0,
          onClick: emptyTrash,
        },
      ];
    }

    if (ctx.type === "mypc") {
      return [
        {
          label: "Xem thông tin máy tính",
          icon: <Monitor className="h-4 w-4" />,
          onClick: () => setShowMyPc(true),
        },
      ];
    }

    const n = ctx.node!;
    const zone = ctx.zone ?? "desktop";

    const baseActions: CtxItem[] = [];

    if (n.kind === "file") {
      baseActions.push(
        {
          label: "Mở & chỉnh sửa",
          icon: <FileText className="h-4 w-4" />,
          onClick: () => setOpenFile(n),
        },
        {
          label: "Tải xuống (.txt)",
          icon: <Download className="h-4 w-4" />,
          onClick: () => {
            const blob = new Blob([n.content], {
              type: "text/plain;charset=utf-8",
            });
            const url = URL.createObjectURL(blob);
            const a = document.createElement("a");
            a.href = url;
            a.download = n.name.endsWith(".txt") ? n.name : `${n.name}.txt`;
            a.click();
            URL.revokeObjectURL(url);
          },
        },
      );
    } else if (n.kind === "folder") {
      baseActions.push({
        label: "Mở thư mục",
        icon: <FolderOpen className="h-4 w-4" />,
        onClick: () => setOpenFolderId(n.id),
      });
    } else {
      baseActions.push({
        label: "Mở ứng dụng",
        icon: <ExternalLink className="h-4 w-4" />,
        onClick: () => launch(n as AppNode),
      });
    }

    const isCurrentlyPinned = layout.dock.some(
      (d) => d.id === n.id || srcOf(d) === srcOf(n),
    );

    const isSystemItem =
      n.id === "sys-mypc" ||
      n.id === "sys-trash" ||
      n.id === "welcome-file" ||
      (n.kind === "app" && Boolean(n.isSystem));

    const extraActions: CtxItem[] = [];

    if (n.id !== "sys-mypc" && n.id !== "sys-trash") {
      extraActions.push({
        label: isCurrentlyPinned
          ? "Bỏ ghim khỏi thanh Dock"
          : "Ghim vào thanh Dock",
        icon: isCurrentlyPinned ? (
          <PinOff className="h-4 w-4" />
        ) : (
          <Pin className="h-4 w-4" />
        ),
        onClick: () => pinToggle(n, zone),
      });
    }

    if (!isSystemItem) {
      extraActions.push(
        {
          label: "Đổi tên",
          icon: <Pencil className="h-4 w-4" />,
          onClick: () => startRename(n),
        },
        {
          label: "Bỏ vào thùng rác",
          icon: <Trash className="h-4 w-4" />,
          danger: true,
          onClick: () => moveToTrash(n.id),
        },
      );
    }

    return [...baseActions, ...extraActions];
  }, [ctx, layout, trash, showGrid]);

  return {
    ctx,
    openCtx,
    closeCtx,
    ctxItems,
  };
}
