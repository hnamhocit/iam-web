import React from "react";

export function MyPcDockIcon() {
  return (
    <div className="relative flex h-full w-full items-center justify-center rounded-[22%] bg-gradient-to-b from-sky-400 via-blue-500 to-indigo-600 p-[12%] shadow-lg shadow-blue-500/25 ring-1 ring-white/40 overflow-hidden">
      <div className="absolute inset-x-0 top-0 h-[45%] bg-gradient-to-b from-white/35 to-transparent pointer-events-none rounded-t-[22%]" />
      <svg
        viewBox="0 0 100 100"
        className="h-full w-full drop-shadow-[0_4px_6px_rgba(0,0,0,0.25)]"
      >
        <defs>
          <linearGradient id="pcScreen" x1="0" y1="0" x2="1" y2="1">
            <stop offset="0%" stopColor="#38bdf8" />
            <stop offset="50%" stopColor="#818cf8" />
            <stop offset="100%" stopColor="#c084fc" />
          </linearGradient>
          <linearGradient id="pcStand" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="#e2e8f0" />
            <stop offset="100%" stopColor="#94a3b8" />
          </linearGradient>
        </defs>
        <rect
          x="10"
          y="10"
          width="80"
          height="56"
          rx="8"
          fill="#1e293b"
          stroke="#cbd5e1"
          strokeWidth="2.5"
        />
        <rect
          x="14"
          y="14"
          width="72"
          height="44"
          rx="4"
          fill="url(#pcScreen)"
        />
        <circle cx="64" cy="26" r="8" fill="#fde047" opacity="0.9" />
        <path d="M 20 54 Q 38 32 54 54 Z" fill="#6366f1" opacity="0.8" />
        <path d="M 44 54 Q 60 38 80 54 Z" fill="#4338ca" opacity="0.85" />
        <circle cx="50" cy="12" r="1.5" fill="#64748b" />
        <path d="M 44 66 L 41 82 H 59 L 56 66 Z" fill="url(#pcStand)" />
        <rect x="30" y="82" width="40" height="5" rx="2.5" fill="#cbd5e1" />
      </svg>
    </div>
  );
}

export function TrashDockIcon({ isFull }: { isFull: boolean }) {
  return (
    <div className="relative flex h-full w-full items-center justify-center rounded-[22%] bg-gradient-to-b from-slate-100 via-slate-200 to-slate-300 dark:from-zinc-800 dark:via-zinc-900 dark:to-black p-[12%] shadow-lg shadow-black/20 ring-1 ring-white/40 dark:ring-white/10 overflow-hidden">
      <div className="absolute inset-x-0 top-0 h-[45%] bg-gradient-to-b from-white/35 to-transparent pointer-events-none rounded-t-[22%]" />
      <svg
        viewBox="0 0 100 100"
        className="h-full w-full drop-shadow-[0_4px_6px_rgba(0,0,0,0.25)]"
      >
        <defs>
          <linearGradient id="canBody" x1="0" y1="0" x2="1" y2="0">
            <stop offset="0%" stopColor="#94a3b8" />
            <stop offset="25%" stopColor="#cbd5e1" />
            <stop offset="50%" stopColor="#f8fafc" />
            <stop offset="75%" stopColor="#cbd5e1" />
            <stop offset="100%" stopColor="#64748b" />
          </linearGradient>
          <linearGradient id="canRim" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="#f1f5f9" />
            <stop offset="100%" stopColor="#94a3b8" />
          </linearGradient>
        </defs>

        {isFull && (
          <g>
            <circle
              cx="42"
              cy="22"
              r="10"
              fill="#ffffff"
              stroke="#cbd5e1"
              strokeWidth="1"
            />
            <circle
              cx="58"
              cy="20"
              r="9"
              fill="#fef08a"
              stroke="#facc15"
              strokeWidth="1"
            />
            <circle
              cx="50"
              cy="25"
              r="8"
              fill="#bae6fd"
              stroke="#38bdf8"
              strokeWidth="1"
            />
            <path d="M 40 20 L 46 12 L 52 20 Z" fill="#ffffff" />
          </g>
        )}

        <ellipse
          cx="50"
          cy="30"
          rx="32"
          ry="7"
          fill="url(#canRim)"
          stroke="#64748b"
          strokeWidth="1.5"
        />
        <ellipse cx="50" cy="30" rx="28" ry="5" fill="#334155" />

        <path
          d="M 20 30 L 29 86 Q 30 90 35 90 H 65 Q 70 90 71 86 L 80 30 Z"
          fill="url(#canBody)"
          opacity="0.95"
        />

        <line
          x1="34"
          y1="33"
          x2="39"
          y2="87"
          stroke="#475569"
          strokeWidth="1.5"
          opacity="0.6"
        />
        <line
          x1="42"
          y1="34"
          x2="45"
          y2="88"
          stroke="#475569"
          strokeWidth="1.5"
          opacity="0.6"
        />
        <line
          x1="50"
          y1="35"
          x2="50"
          y2="88"
          stroke="#475569"
          strokeWidth="1.5"
          opacity="0.6"
        />
        <line
          x1="58"
          y1="34"
          x2="55"
          y2="88"
          stroke="#475569"
          strokeWidth="1.5"
          opacity="0.6"
        />
        <line
          x1="66"
          y1="33"
          x2="61"
          y2="87"
          stroke="#475569"
          strokeWidth="1.5"
          opacity="0.6"
        />

        <path
          d="M 23 48 Q 50 56 77 48"
          fill="none"
          stroke="#475569"
          strokeWidth="1.5"
          opacity="0.5"
        />
        <path
          d="M 26 68 Q 50 76 74 68"
          fill="none"
          stroke="#475569"
          strokeWidth="1.5"
          opacity="0.5"
        />

        <ellipse cx="50" cy="88" rx="19" ry="3.5" fill="#475569" />
      </svg>
    </div>
  );
}
