"use client";

import React, { useState } from "react";
import Link from "next/link";
import { buttonVariants } from "@/components/ui/button";
import { ExternalLink, Copy, Check } from "lucide-react";
import { CODE_EXAMPLES } from "./code-examples-data";

export function LandingCodeSandbox() {
  const [activeTab, setActiveTab] =
    useState<keyof typeof CODE_EXAMPLES>("aiPrompt");
  const [copied, setCopied] = useState(false);

  const activeSnippet = CODE_EXAMPLES[activeTab];

  const handleCopy = () => {
    navigator.clipboard.writeText(activeSnippet.code);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <section className="mx-auto max-w-6xl px-6 py-16">
      <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 mb-6">
        <div>
          <div className="inline-flex items-center gap-2 rounded-full border border-black/[0.08] dark:border-white/[0.08] bg-black/[0.02] dark:bg-white/[0.03] px-3.5 py-1 text-xs font-semibold uppercase tracking-wider text-[#fb291a] mb-2">
            Dành cho lập trình viên
          </div>
          <h2 className="font-display text-2xl sm:text-3xl font-bold tracking-tight text-slate-900 dark:text-white">
            Tích hợp chỉ với 3 dòng mã hoặc 1 Prompt AI
          </h2>
          <p className="mt-1 text-sm text-slate-600 dark:text-slate-300">
            Chọn mẫu mã tích hợp hoặc sao chép Master Prompt cho Cursor, Windsurf, Claude Code để AI tự sinh mã xác thực.
          </p>
        </div>

        <Link
          href="/developers"
          className={buttonVariants({
            variant: "outline",
            size: "sm",
            className: "shrink-0 rounded-full gap-1.5 px-4 font-semibold",
          })}
        >
          <span>Vào Developer Hub</span>
          <ExternalLink className="h-3.5 w-3.5" />
        </Link>
      </div>

      {/* IDE Container */}
      <div className="rounded-2xl border border-black/[0.08] dark:border-white/[0.08] bg-[#0c121e] shadow-xl overflow-hidden text-slate-200">
        {/* Top Bar: macOS dots + Tabs + Copy */}
        <div className="flex flex-wrap items-center justify-between gap-3 border-b border-white/[0.08] bg-[#080d16] px-4 py-2.5">
          <div className="flex items-center gap-3">
            {/* Window dots */}
            <div className="flex items-center gap-1.5">
              <div className="size-3 rounded-full bg-rose-500/80" />
              <div className="size-3 rounded-full bg-amber-500/80" />
              <div className="size-3 rounded-full bg-emerald-500/80" />
            </div>

            {/* Language Tabs */}
            <div className="flex items-center gap-1 pl-2">
              {(Object.keys(CODE_EXAMPLES) as (keyof typeof CODE_EXAMPLES)[]).map((key) => {
                const item = CODE_EXAMPLES[key];
                const Icon = item.icon;
                const isActive = activeTab === key;
                return (
                  <button
                    key={key}
                    onClick={() => setActiveTab(key)}
                    type="button"
                    className={`flex items-center gap-1.5 rounded-lg px-3 py-1 text-xs font-medium transition-colors cursor-pointer ${
                      isActive
                        ? "bg-white/[0.1] text-white font-semibold"
                        : "text-slate-400 hover:text-slate-200 hover:bg-white/[0.04]"
                    }`}
                  >
                    <Icon className="h-3.5 w-3.5" />
                    <span>{item.label}</span>
                  </button>
                );
              })}
            </div>
          </div>

          {/* Right: Copy Button */}
          <button
            onClick={handleCopy}
            type="button"
            className="flex items-center gap-1.5 rounded-lg border border-white/[0.1] bg-white/[0.05] hover:bg-white/[0.1] px-3 py-1 text-xs font-medium text-slate-300 hover:text-white transition-all cursor-pointer"
          >
            {copied ? (
              <>
                <Check className="h-3.5 w-3.5 text-emerald-400" />
                <span className="text-emerald-400">Đã sao chép!</span>
              </>
            ) : (
              <>
                <Copy className="h-3.5 w-3.5" />
                <span>Sao chép mã</span>
              </>
            )}
          </button>
        </div>

        {/* Code Viewer */}
        <div className="p-4 sm:p-5 font-mono text-xs sm:text-[13px] leading-relaxed max-h-[360px] overflow-y-auto scrollbar-thin">
          <pre className="whitespace-pre-wrap text-slate-300">{activeSnippet.code}</pre>
        </div>
      </div>
    </section>
  );
}
