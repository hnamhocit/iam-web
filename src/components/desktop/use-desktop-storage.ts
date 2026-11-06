"use client";

import { useState, useEffect, useRef } from "react";
import {
  WALLPAPER_KEY,
  SOUND_KEY,
  POS_KEY,
  WALLPAPERS,
} from "./constants";
import type { PosMap, WallpaperKey } from "./types";

export function useDesktopStorage(initialPosMap: PosMap) {
  const [wallpaper, setWallpaper] = useState<WallpaperKey>("aurora");
  const [soundEnabled, setSoundEnabled] = useState(true);
  const [posMap, setPosMap] = useState<PosMap>(initialPosMap);
  const hydrated = useRef(false);

  useEffect(() => {
    try {
      localStorage.removeItem("povixa.desktop.v4");
      localStorage.removeItem("povixa.desktop.v3");
      localStorage.removeItem("povixa.desktop.grid.v3");
      localStorage.removeItem("povixa.desktop.grid.v4");
      localStorage.removeItem("povixa.desktop.grid.v5");

      const savedWp = localStorage.getItem(WALLPAPER_KEY) as WallpaperKey;
      if (savedWp && savedWp in WALLPAPERS) setWallpaper(savedWp);
      const savedSound = localStorage.getItem(SOUND_KEY);
      if (savedSound !== null) setSoundEnabled(savedSound === "true");
      const savedPos = localStorage.getItem(POS_KEY);
      if (savedPos) {
        try {
          const parsed = JSON.parse(savedPos);
          setPosMap((prev) => ({
            ...prev,
            ...parsed,
          }));
        } catch {
          /* ignore */
        }
      }
    } catch {
      /* ignore */
    }
    hydrated.current = true;
  }, []);

  useEffect(() => {
    if (!hydrated.current) return;
    try {
      localStorage.setItem(WALLPAPER_KEY, wallpaper);
    } catch {
      /* ignore */
    }
  }, [wallpaper]);

  useEffect(() => {
    if (!hydrated.current) return;
    try {
      localStorage.setItem(SOUND_KEY, String(soundEnabled));
    } catch {
      /* ignore */
    }
  }, [soundEnabled]);

  useEffect(() => {
    if (!hydrated.current) return;
    try {
      localStorage.setItem(POS_KEY, JSON.stringify(posMap));
    } catch {
      /* ignore */
    }
  }, [posMap]);

  return {
    wallpaper,
    setWallpaper,
    soundEnabled,
    setSoundEnabled,
    posMap,
    setPosMap,
  };
}
