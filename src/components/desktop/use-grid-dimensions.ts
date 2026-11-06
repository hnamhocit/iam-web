"use client";

import { useState, useEffect, useRef } from "react";
import { CELL_W, CELL_H, PAD_X, PAD_Y } from "./constants";

export function useGridDimensions() {
  const mainRef = useRef<HTMLElement>(null);
  const [canvasDim, setCanvasDim] = useState({ width: 1200, height: 750 });

  const gridCols = Math.max(
    4,
    Math.floor((canvasDim.width - PAD_X * 2) / CELL_W),
  );
  const gridRows = Math.max(
    4,
    Math.floor((canvasDim.height - PAD_Y * 2) / CELL_H),
  );

  useEffect(() => {
    const updateSize = () => {
      if (mainRef.current) {
        setCanvasDim({
          width: mainRef.current.clientWidth || window.innerWidth,
          height: mainRef.current.clientHeight || window.innerHeight - 110,
        });
      }
    };
    updateSize();
    const ro = new ResizeObserver(updateSize);
    if (mainRef.current) ro.observe(mainRef.current);
    window.addEventListener("resize", updateSize);
    return () => {
      ro.disconnect();
      window.removeEventListener("resize", updateSize);
    };
  }, []);

  return {
    mainRef,
    gridCols,
    gridRows,
  };
}
