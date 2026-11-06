export type { SystemApp, UserApp } from "@/lib/app-actions";

export type MappedUser = {
  name: string;
  email: string;
  avatar: string | null;
  provider: string;
  role?: string;
};

export type Zone = "desktop" | "dock";

export type AppNode = {
  id: string;
  kind: "app";
  name: string;
  url: string;
  icon?: string;
  emoji?: string;
  gradient?: string;
  disabled?: boolean;
  src?: string;
  isSystem?: boolean;
  isPinned?: boolean;
  dockOrder?: number;
  gridCol?: number | null;
  gridRow?: number | null;
};

export type FileNode = {
  id: string;
  kind: "file";
  name: string;
  content: string;
  fileType?: "txt" | "md";
  updatedAt?: number;
  src?: string;
};

export type FolderNode = {
  id: string;
  kind: "folder";
  name: string;
  children: (AppNode | FileNode)[];
  src?: string;
};

export type Node = AppNode | FileNode | FolderNode;
export type Layout = { desktop: Node[]; dock: Node[] };
export type TrashItem = { id: string; node: Node; origin: Zone; deletedAt: number };
export type Toast = {
  id: string;
  message: string;
  actionLabel?: string;
  onAction?: () => void;
};

export type SlotPos = { col: number; row: number };
export type PosMap = Record<string, SlotPos>; // nodeId -> { col, row }

export type WallpaperKey = "aurora" | "sequoia" | "ocean" | "minimal";
