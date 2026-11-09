"use client";

import React from "react";

interface CodeHighlighterProps {
  code: string;
  language?: "curl" | "json" | "http";
  className?: string;
}

function highlightCurlLine(line: string, index: number) {
  const trimmed = line.trim();
  if (trimmed.startsWith("#")) {
    return (
      <div key={index} className="text-slate-500 italic select-none">
        {line}
      </div>
    );
  }

  const parts: React.ReactNode[] = [];
  let keyIdx = 0;

  const tokenRegex =
    /(curl\b)|(-[XHDd]\b)|(\b(?:GET|POST|OPTIONS|PUT|DELETE)\b)|(https?:\/\/[^\s"'\\]+)|("[^"]*"|'[^']*')|(\\)$/g;

  let match: RegExpExecArray | null;
  let lastIndex = 0;

  while ((match = tokenRegex.exec(line)) !== null) {
    if (match.index > lastIndex) {
      parts.push(
        <span key={keyIdx++} className="text-slate-300">
          {line.slice(lastIndex, match.index)}
        </span>
      );
    }

    const token = match[0];
    if (match[1]) {
      // curl
      parts.push(
        <span key={keyIdx++} className="text-cyan-400 font-bold">
          {token}
        </span>
      );
    } else if (match[2]) {
      // flags (-X, -H, -d)
      parts.push(
        <span key={keyIdx++} className="text-amber-400 font-semibold">
          {token}
        </span>
      );
    } else if (match[3]) {
      // HTTP verbs
      parts.push(
        <span key={keyIdx++} className="text-emerald-400 font-bold">
          {token}
        </span>
      );
    } else if (match[4]) {
      // URL
      parts.push(
        <span key={keyIdx++} className="text-sky-300 underline underline-offset-2 decoration-sky-500/40">
          {token}
        </span>
      );
    } else if (match[5]) {
      // String in quotes
      parts.push(
        <span key={keyIdx++} className="text-teal-300">
          {token}
        </span>
      );
    } else if (match[6]) {
      // Backslash at end of line
      parts.push(
        <span key={keyIdx++} className="text-slate-500 font-bold">
          {token}
        </span>
      );
    } else {
      parts.push(<span key={keyIdx++}>{token}</span>);
    }

    lastIndex = tokenRegex.lastIndex;
  }

  if (lastIndex < line.length) {
    parts.push(
      <span key={keyIdx++} className="text-slate-300">
        {line.slice(lastIndex)}
      </span>
    );
  }

  return (
    <div key={index} className="min-h-[1.75rem]">
      {parts.length > 0 ? parts : "\u00A0"}
    </div>
  );
}

function highlightJsonLine(line: string, index: number) {
  const parts: React.ReactNode[] = [];
  let keyIdx = 0;

  // 1: Key "foo":
  // 2: String value "bar"
  // 3: Number 1234
  // 4: Boolean (true, false)
  // 5: null
  // 6: syntax braces { } [ ] , :
  const jsonRegex =
    /("(\w+)":)|("[^"]*")|(-?\b\d+(?:\.\d+)?\b)|(\b(?:true|false)\b)|(\bnull\b)|([{}[\],:])/g;

  let match: RegExpExecArray | null;
  let lastIndex = 0;

  while ((match = jsonRegex.exec(line)) !== null) {
    if (match.index > lastIndex) {
      parts.push(
        <span key={keyIdx++} className="text-slate-400">
          {line.slice(lastIndex, match.index)}
        </span>
      );
    }

    const token = match[0];
    if (match[1]) {
      // "key":
      parts.push(
        <span key={keyIdx++} className="text-sky-300 font-medium">
          &quot;{match[2]}&quot;
        </span>
      );
      parts.push(
        <span key={keyIdx++} className="text-slate-400">
          :{" "}
        </span>
      );
    } else if (match[3]) {
      // "string value"
      const isWildcard = token.includes("*:*");
      parts.push(
        <span
          key={keyIdx++}
          className={isWildcard ? "text-amber-300 font-bold" : "text-emerald-300"}
        >
          {token}
        </span>
      );
    } else if (match[4]) {
      // number
      parts.push(
        <span key={keyIdx++} className="text-amber-400 font-mono">
          {token}
        </span>
      );
    } else if (match[5]) {
      // boolean
      parts.push(
        <span key={keyIdx++} className="text-purple-400 font-semibold font-mono">
          {token}
        </span>
      );
    } else if (match[6]) {
      // null
      parts.push(
        <span key={keyIdx++} className="text-rose-400 italic font-semibold font-mono">
          {token}
        </span>
      );
    } else if (match[7]) {
      // syntax
      parts.push(
        <span key={keyIdx++} className="text-slate-400 font-bold">
          {token}
        </span>
      );
    } else {
      parts.push(<span key={keyIdx++}>{token}</span>);
    }

    lastIndex = jsonRegex.lastIndex;
  }

  if (lastIndex < line.length) {
    parts.push(
      <span key={keyIdx++} className="text-slate-400">
        {line.slice(lastIndex)}
      </span>
    );
  }

  return (
    <div key={index} className="min-h-[1.75rem]">
      {parts.length > 0 ? parts : "\u00A0"}
    </div>
  );
}

export function CodeHighlighter({
  code,
  language = "curl",
  className = "",
}: CodeHighlighterProps) {
  const lines = code.trim().split("\n");

  const isJson = language === "json" || code.trim().startsWith("{") || code.trim().startsWith("[");

  return (
    <div
      className={`font-mono text-[18px] leading-[1.75] overflow-x-auto text-slate-200 select-text ${className}`}
    >
      <pre className="whitespace-pre">
        {lines.map((line, idx) =>
          isJson ? highlightJsonLine(line, idx) : highlightCurlLine(line, idx)
        )}
      </pre>
    </div>
  );
}
