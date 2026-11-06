import type {
  AppNode,
  FileNode,
  FolderNode,
  Layout,
  Node,
  PosMap,
  SlotPos,
  Zone,
} from "./types";
import type { SystemApp, UserApp } from "@/lib/app-actions";
import { fav, hostOf, srcOf, uid } from "./desktop-utils";
import {
  FALLBACK_SYSTEM_APPS,
  SYS_MYPC_NODE,
  SYS_TRASH_NODE,
  WELCOME_TXT,
} from "./seed-data";

export function mapSystemAppToNode(app: SystemApp): AppNode {
  const host = hostOf(app.url);
  let emoji = "⚡";
  let gradient = "from-violet-500 to-indigo-600";
  const disabled = false;

  if (app.url.includes("pomoduo")) {
    emoji = "⏱️";
    gradient = "from-violet-500 to-fuchsia-600";
  } else if (app.url.includes("bonsai")) {
    emoji = "📚";
    gradient = "from-emerald-500 to-teal-600";
  } else if (app.url.includes("solotype")) {
    emoji = "⌨️";
    gradient = "from-amber-500 to-orange-600";
  } else if (
    app.url.includes("vntez") ||
    app.name.toLowerCase().includes("vntez") ||
    app.url.includes("developers")
  ) {
    emoji = "🪐";
    gradient = "from-sky-500 to-indigo-600";
  }

  const cleanId = app.id || app.name.toLowerCase().replace(/\s+/g, "-");
  return {
    id: cleanId,
    src: cleanId,
    kind: "app",
    name: app.name,
    url: app.url,
    icon: app.icon_url || fav(host),
    emoji,
    gradient,
    disabled,
    isSystem: true,
    isPinned: Boolean(app.is_pinned),
    dockOrder: app.dock_order ?? 0,
    gridCol: app.grid_col,
    gridRow: app.grid_row,
  };
}

export function mapUserAppToNode(app: UserApp): AppNode {
  const host = hostOf(app.url);
  return {
    id: app.id,
    src: app.id,
    kind: "app",
    name: app.name,
    url: app.url,
    icon: app.icon_url || fav(host),
    emoji: "🔗",
    gradient: "from-zinc-500 to-zinc-700",
    disabled: false,
    isSystem: false,
    isPinned: Boolean(app.is_pinned),
    dockOrder: app.dock_order ?? 0,
    gridCol: app.grid_col,
    gridRow: app.grid_row,
  };
}

export function buildLayoutFromApps(
  systemApps: SystemApp[] = [],
  userApps: UserApp[] = []
): { layout: Layout; initialPosMap: PosMap } {
  const dockItems: { order: number; node: AppNode }[] = [
    { order: 0, node: SYS_MYPC_NODE },
    { order: 999, node: SYS_TRASH_NODE },
  ];
  const deskApps: AppNode[] = [];
  const initialPosMap: PosMap = {
    "sys-mypc": { col: 0, row: 0 },
    "sys-trash": { col: 0, row: 1 },
    "welcome-file": { col: 0, row: 2 },
  };

  const allocateSlot = (currentPosMap: PosMap): SlotPos => {
    const occupied = new Set(
      Object.values(currentPosMap).map((p) => `${p.col}-${p.row}`)
    );
    for (let c = 0; c < 20; c++) {
      for (let r = 0; r < 8; r++) {
        if (!occupied.has(`${c}-${r}`)) return { col: c, row: r };
      }
    }
    return { col: 0, row: 8 };
  };

  systemApps.forEach((app) => {
    const node = mapSystemAppToNode(app);
    if (app.is_pinned) {
      dockItems.push({ order: app.dock_order ?? 10, node });
    }
    deskApps.push(node);
    if (app.grid_col !== null && app.grid_row !== null) {
      initialPosMap[node.id] = { col: app.grid_col, row: app.grid_row };
    } else {
      initialPosMap[node.id] = allocateSlot(initialPosMap);
    }
  });

  userApps.forEach((app) => {
    const node = mapUserAppToNode(app);
    if (app.is_pinned) {
      dockItems.push({ order: (app.dock_order ?? 0) + 100, node });
    }
    deskApps.push(node);
    if (app.grid_col !== null && app.grid_row !== null) {
      initialPosMap[node.id] = { col: app.grid_col, row: app.grid_row };
    } else {
      initialPosMap[node.id] = allocateSlot(initialPosMap);
    }
  });

  dockItems.sort((a, b) => a.order - b.order);
  const dockApps = dockItems.map((d) => d.node);

  const welcomeFile: FileNode = {
    id: "welcome-file",
    src: "welcome-file",
    kind: "file",
    name: "Chào mừng.txt",
    content: WELCOME_TXT,
    fileType: "txt",
    updatedAt: 1735689600000,
  };

  return {
    layout: {
      dock: dockApps,
      desktop: [...deskApps, welcomeFile],
    },
    initialPosMap,
  };
}

export function allApps(l: Layout): AppNode[] {
  const out: AppNode[] = [];
  const walk = (arr: Node[]) =>
    arr.forEach((n) => {
      if (n.kind === "app") out.push(n);
      else if (n.kind === "folder")
        n.children.forEach((c) => {
          if (c.kind === "app") out.push(c);
        });
    });
  walk(l.desktop);
  walk(l.dock);
  return out;
}

export const urlTaken = (l: Layout, url: string, exceptSrc?: string) =>
  allApps(l).some((a) => a.url === url && srcOf(a) !== exceptSrc);

export const clonePin = (n: Node): Node => {
  if (n.kind === "app") {
    return {
      ...n,
      id: uid(),
      src: srcOf(n),
      isSystem: n.isSystem,
      isPinned: n.isPinned,
      dockOrder: n.dockOrder,
      gridCol: n.gridCol,
      gridRow: n.gridRow,
    };
  }
  if (n.kind === "file") return { ...n, id: uid(), src: srcOf(n) };
  return {
    ...n,
    id: uid(),
    src: srcOf(n),
    children: n.children.map((c) => ({ ...c, id: uid(), src: srcOf(c) })),
  };
};

export function findTop(l: Layout, id: string) {
  for (const z of ["desktop", "dock"] as Zone[]) {
    const i = l[z].findIndex((n) => n.id === id);
    if (i >= 0) return { z, i };
  }
  return null;
}

export function purgeSrc(l: Layout, src: string): Layout {
  const stripTop = (arr: Node[]) => arr.filter((n) => srcOf(n) !== src);
  const stripFolder = (arr: Node[]) =>
    arr.map((n) =>
      n.kind === "folder"
        ? { ...n, children: n.children.filter((c) => srcOf(c) !== src) }
        : n
    );
  const dissolve = (arr: Node[]): Node[] => {
    const res: Node[] = [];
    for (const n of arr) {
      if (n.kind === "folder") {
        if (n.children.length >= 1) res.push(n);
      } else res.push(n);
    }
    return res;
  };
  return {
    desktop: dissolve(stripFolder(stripTop(l.desktop))),
    dock: dissolve(stripFolder(stripTop(l.dock))),
  };
}

export function detachFromFolder(
  l0: Layout,
  folderId: string,
  itemId: string,
  zone: Zone
): Layout {
  const l: Layout = { desktop: [...l0.desktop], dock: [...l0.dock] };
  const f = l[zone].find((n) => n.id === folderId) as FolderNode | undefined;
  if (!f || f.kind !== "folder") return l0;
  const item = f.children.find((c) => c.id === itemId);
  if (!item) return l0;
  const rest = f.children.filter((c) => c.id !== itemId);
  l[zone] = l[zone].filter((n) => n.id !== folderId);
  if (rest.length > 0) l[zone] = [...l[zone], { ...f, children: rest }, item];
  else l[zone] = [...l[zone], item];
  return l;
}
