"use client";

import React, { useState } from "react";
import type { AppNode, FileNode, FolderNode } from "../types";

export function Glyph({ app, small }: { app: AppNode; small?: boolean }) {
  const [broken, setBroken] = useState(false);
  const dim = app.disabled ? "opacity-45 grayscale" : "";
  const r = small ? "rounded-[20%]" : "rounded-[22%]";
  const showImg = app.icon && !broken;
  return showImg ? (
    // eslint-disable-next-line @next/next/no-img-element
    <img
      src={app.icon}
      alt=""
      draggable={false}
      onError={() => setBroken(true)}
      className={`h-full w-full bg-white object-contain p-[10%] shadow-md shadow-black/20 ${r} ${dim}`}
    />
  ) : (
    <div
      className={`flex h-full w-full items-center justify-center bg-gradient-to-br shadow-md shadow-black/20 ${r} ${app.gradient} ${dim}`}
    >
      <span
        className="select-none leading-none"
        style={{ fontSize: small ? "48%" : "54%" }}
      >
        {app.emoji}
      </span>
    </div>
  );
}

export function FileGlyph({ file }: { file: FileNode }) {
  return (
    <div className="relative h-full w-full drop-shadow-[0_4px_8px_rgba(0,0,0,0.18)] dark:drop-shadow-[0_4px_8px_rgba(0,0,0,0.45)]">
      <svg viewBox="0 0 100 100" className="h-full w-full">
        <defs>
          <linearGradient id="pageGrad" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="#ffffff" />
            <stop offset="100%" stopColor="#f1f5f9" />
          </linearGradient>
          <linearGradient id="foldGrad" x1="0" y1="0" x2="1" y2="1">
            <stop offset="0%" stopColor="#cbd5e1" />
            <stop offset="100%" stopColor="#94a3b8" />
          </linearGradient>
        </defs>
        <path
          d="M 22 14 H 58 L 78 34 V 86 Q 78 90 74 90 H 26 Q 22 90 22 86 Z"
          fill="url(#pageGrad)"
          stroke="#cbd5e1"
          strokeWidth="1.5"
        />
        <path d="M 58 14 V 34 H 78 Z" fill="url(#foldGrad)" opacity="0.8" />
        <line
          x1="32"
          y1="44"
          x2="68"
          y2="44"
          stroke="#94a3b8"
          strokeWidth="3"
          strokeLinecap="round"
          opacity="0.7"
        />
        <line
          x1="32"
          y1="54"
          x2="68"
          y2="54"
          stroke="#94a3b8"
          strokeWidth="3"
          strokeLinecap="round"
          opacity="0.7"
        />
        <line
          x1="32"
          y1="64"
          x2="54"
          y2="64"
          stroke="#94a3b8"
          strokeWidth="3"
          strokeLinecap="round"
          opacity="0.7"
        />
        <rect x="28" y="73" width="28" height="12" rx="3" fill="#8b5cf6" />
        <text
          x="42"
          y="82"
          textAnchor="middle"
          fill="#ffffff"
          fontSize="8"
          fontWeight="bold"
          fontFamily="monospace"
        >
          TXT
        </text>
      </svg>
    </div>
  );
}

export function FolderGlyph({ folder }: { folder: FolderNode }) {
  const inside = folder.children.slice(0, 2);
  return (
    <div className="relative h-full w-full drop-shadow-[0_6px_10px_rgba(0,0,0,0.35)]">
      <svg viewBox="0 0 100 100" className="absolute inset-0 h-full w-full">
        <defs>
          <linearGradient id="fg" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="#ffd76a" />
            <stop offset="1" stopColor="#f5a623" />
          </linearGradient>
          <linearGradient id="fgt" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="#ffe79a" />
            <stop offset="1" stopColor="#ffc24d" />
          </linearGradient>
        </defs>
        <path
          d="M8 30 q0-8 8-8 h22 l8 8 h38 q8 0 8 8 v6 H8 Z"
          fill="url(#fgt)"
        />
        {inside.map((c, i) => (
          <foreignObject
            key={c.id}
            x={i === 0 ? 20 : 44}
            y={34}
            width="34"
            height="34"
          >
            <div className="h-full w-full">
              {c.kind === "file" ? (
                <FileGlyph file={c} />
              ) : (
                <Glyph app={c} small />
              )}
            </div>
          </foreignObject>
        ))}
        <path
          d="M8 44 q0-6 6-6 h72 q6 0 6 6 v34 q0 8-8 8 H16 q-8 0-8-8 Z"
          fill="url(#fg)"
          opacity="0.97"
        />
        <path
          d="M8 44 q0-6 6-6 h72 q6 0 6 6"
          fill="none"
          stroke="#fff"
          strokeOpacity="0.4"
          strokeWidth="1.5"
        />
      </svg>
    </div>
  );
}
