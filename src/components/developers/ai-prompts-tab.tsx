"use client";

import React, { useState } from "react";
import { Bot, Copy, Check } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
} from "@/components/ui/card";
import { MASTER_PROMPT } from "./developer-hub-data";

export function AiPromptsTab() {
  const [copied, setCopied] = useState(false);

  const copy = () => {
    navigator.clipboard.writeText(MASTER_PROMPT);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="space-y-8">
      <Card className="border-border">
        <CardHeader className="border-b border-border/60">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
            <div className="flex items-center gap-2">
              <Bot className="h-5 w-5 text-primary" />
              <div>
                <CardTitle className="text-base sm:text-lg">
                  Master Integration Prompt (Dùng cho mọi AI Assistant)
                </CardTitle>
                <CardDescription>
                  Copy và dán trực tiếp vào Cursor Composer, Claude Code, Windsurf hoặc ChatGPT
                </CardDescription>
              </div>
            </div>

            <Button onClick={copy} size="sm" className="gap-1.5 shrink-0">
              {copied ? (
                <>
                  <Check className="h-4 w-4 text-emerald-500" />
                  <span>Đã sao chép!</span>
                </>
              ) : (
                <>
                  <Copy className="h-4 w-4" />
                  <span>Sao chép Prompt</span>
                </>
              )}
            </Button>
          </div>
        </CardHeader>

        <CardContent className="pt-4 space-y-3">
          <div className="relative rounded-xl bg-[#080d16] p-6 font-mono text-[18px] text-slate-200 border border-white/[0.08] max-h-[680px] overflow-y-auto leading-[1.75] scrollbar-thin select-text">
            <pre className="whitespace-pre-wrap">{MASTER_PROMPT}</pre>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
