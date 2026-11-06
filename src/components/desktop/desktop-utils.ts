import type { AppNode, Node } from "./types";

export {
  urlTaken,
  clonePin,
  findTop,
  purgeSrc,
  detachFromFolder,
} from "./layout-helpers";

export const fav = (host: string) =>
  `https://www.google.com/s2/favicons?domain=${host}&sz=128`;

export const hostOf = (u: string) => {
  try {
    return new URL(u).hostname;
  } catch {
    return "";
  }
};

let _idCounter = 0;
export const uid = () =>
  globalThis.crypto?.randomUUID?.() ?? `id-${++_idCounter}`;

export const isUrl = (s: string) => {
  try {
    const u = new URL(s);
    return u.protocol === "http:" || u.protocol === "https:";
  } catch {
    return false;
  }
};

export const launch = (n: AppNode) => {
  if (!n.disabled && n.url && n.url !== "#")
    window.open(n.url, "_blank", "noopener,noreferrer");
};

export const srcOf = (n: Node) => n.src ?? n.id;

export const mk = (
  id: string,
  name: string,
  url: string,
  emoji: string,
  gradient: string,
  disabled = false,
): AppNode => ({
  id,
  kind: "app",
  name,
  url,
  icon: fav(hostOf(url)),
  emoji,
  gradient,
  disabled,
  src: id,
});
