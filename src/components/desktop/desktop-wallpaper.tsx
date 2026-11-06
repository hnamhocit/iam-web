"use client";

import type { Wallpaper } from "./constants";

export function DesktopWallpaper({
  isDark,
  wallpaper,
}: {
  isDark: boolean;
  wallpaper: Wallpaper;
}) {
  return (
    <div className="pointer-events-none fixed inset-0 z-0">
      <div
        className={`absolute inset-0 bg-gradient-to-br transition-all duration-700 ${
          isDark ? wallpaper.darkBg : wallpaper.lightBg
        }`}
      />
      {(isDark ? wallpaper.darkBlobs : wallpaper.lightBlobs).map((blobCls: string, i: number) => (
        <div
          key={i}
          className={`absolute rounded-full transition-all duration-700 ${blobCls}`}
        />
      ))}
      {/* Subtle grid pattern */}
      <div
        className="absolute inset-0 opacity-[0.03] dark:opacity-[0.04]"
        style={{
          backgroundImage:
            "url(\"data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 200 200'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.8' numOctaves='3'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E\")",
        }}
      />
    </div>
  );
}
