"use client";

import { Check, Copy, ExternalLink, Terminal } from "lucide-react";
import Link from "next/link";
import { useState } from "react";
import { CodeHighlighter } from "@/components/developers/code-highlighter";
import { Button } from "@/components/ui/button";
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
    <section className="relative w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
      <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-6 mb-8">
        <div className="space-y-2">
          <div className="inline-flex items-center gap-2 rounded-full border border-primary/20 bg-primary/5 px-3.5 py-1 text-xs font-semibold uppercase tracking-wider text-primary font-mono">
            Tích hợp nhanh
          </div>
          <h2 className="font-display text-3xl sm:text-4xl font-extrabold tracking-tight text-foreground">
            Tích hợp với 3 dòng mã hoặc 1 Prompt AI
          </h2>
          <p className="text-sm sm:text-base text-muted-foreground leading-relaxed max-w-2xl">
            Chọn mã nguồn mẫu hoặc sao chép Master Prompt cho Cursor, Windsurf,
            Claude Code để trợ lý AI tự động cài đặt luồng xác thực an toàn.
          </p>
        </div>

        <Button
          variant="outline"
          size="sm"
          asChild
          className="shrink-0 rounded-2xl h-10 px-5 text-xs font-semibold gap-2 border-border/80"
        >
          <Link href="/developers">
            <Terminal className="h-3.5 w-3.5 text-primary" />
            <span>Vào Developer Hub</span>
            <ExternalLink className="h-3 w-3 opacity-60" />
          </Link>
        </Button>
      </div>

      {/* Modern IDE Container */}
      <div className="rounded-3xl border border-zinc-800 bg-[#090d16] shadow-2xl overflow-hidden text-zinc-200">
        {/* Top Bar: macOS dots + Tabs + Copy */}
        <div className="flex flex-wrap items-center justify-between gap-3 border-b border-zinc-800 bg-[#05080f] px-4 sm:px-6 py-3">
          <div className="flex items-center gap-3 sm:gap-4 overflow-x-auto">
            {/* Window dots */}
            <div className="flex items-center gap-2 shrink-0">
              <div className="size-3 rounded-full bg-rose-500/80" />
              <div className="size-3 rounded-full bg-amber-500/80" />
              <div className="size-3 rounded-full bg-emerald-500/80" />
            </div>

            {/* Language Tabs */}
            <div className="flex items-center gap-1.5 pl-2 overflow-x-auto">
              {(
                Object.keys(CODE_EXAMPLES) as (keyof typeof CODE_EXAMPLES)[]
              ).map((key) => {
                const item = CODE_EXAMPLES[key];
                const Icon = item.icon;
                const isActive = activeTab === key;
                return (
                  <button
                    key={key}
                    onClick={() => setActiveTab(key)}
                    type="button"
                    className={`flex items-center gap-1.5 rounded-xl px-3 py-1.5 text-xs font-medium transition-all duration-150 cursor-pointer whitespace-nowrap ${
                      isActive
                        ? "bg-zinc-800 text-white font-semibold shadow-xs border border-zinc-700/60"
                        : "text-zinc-400 hover:text-zinc-200 hover:bg-zinc-850"
                    }`}
                  >
                    <Icon className="h-3.5 w-3.5 text-primary" />
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
            className="flex items-center gap-1.5 rounded-xl border border-zinc-700 bg-zinc-800/80 hover:bg-zinc-700/80 px-3.5 py-1.5 text-xs font-medium text-zinc-200 hover:text-white transition-all cursor-pointer shadow-xs"
          >
            {copied ? (
              <>
                <Check className="h-3.5 w-3.5 text-emerald-400" />
                <span className="text-emerald-400 font-semibold">
                  Đã sao chép!
                </span>
              </>
            ) : (
              <>
                <Copy className="h-3.5 w-3.5" />
                <span>Sao chép mã</span>
              </>
            )}
          </button>
        </div>

        {/* Code View Area */}
        <div className="p-4 sm:p-6 overflow-x-auto max-h-[500px] font-mono leading-relaxed bg-[#090d16]">
          {activeTab === "curl" ? (
            <CodeHighlighter code={activeSnippet.code} language="curl" />
          ) : (
            <pre className="whitespace-pre-wrap text-zinc-300 font-mono text-xs sm:text-sm leading-relaxed">
              {activeSnippet.code}
            </pre>
          )}
        </div>

        {/* Footer info in IDE */}
        <div className="flex items-center justify-between border-t border-zinc-800 bg-[#05080f] px-4 sm:px-6 py-2.5 text-[11px] font-mono text-zinc-400">
          <span className="flex items-center gap-2">
            <span className="h-2 w-2 rounded-full bg-emerald-500" />
            <span>Ready for production</span>
          </span>
          <span className="text-zinc-500 truncate">
            {activeSnippet.filename}
          </span>
        </div>
      </div>
    </section>
  );
}
