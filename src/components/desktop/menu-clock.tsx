"use client";

import { useState, useEffect } from "react";

export function MenuClock() {
  const [now, setNow] = useState<Date | null>(null);
  useEffect(() => {
    setNow(new Date());
    const t = setInterval(() => setNow(new Date()), 10000);
    return () => clearInterval(t);
  }, []);

  if (!now) {
    return (
      <span className="hidden font-mono text-xs opacity-60 sm:block">...</span>
    );
  }
  return (
    <span className="hidden font-mono text-xs font-medium tracking-tight sm:block">
      {now.toLocaleString("vi-VN", {
        weekday: "short",
        day: "2-digit",
        month: "2-digit",
        hour: "2-digit",
        minute: "2-digit",
      })}
    </span>
  );
}
