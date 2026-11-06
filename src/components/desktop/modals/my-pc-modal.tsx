"use client";

import { useState, useEffect } from "react";
import { Sparkles, RefreshCw, Zap, Coffee, X } from "lucide-react";
import { Modal } from "../modal-base";
import type { MappedUser } from "../types";

const DEV_QUOTES = [
  "Code chạy được là một phép màu, tốt nhất đừng đụng vào nữa! ✨",
  "Hôm nay là ngày đẹp trời để fix 1 bug và sinh ra 3 bug mới 🐞",
  "Không có bug, chỉ có tính năng chưa được document 📝",
  "Cà phê vào, code ra. Đôi khi ra bug ☕",
  "Trên máy em chạy bình thường mà anh... 💻",
  "Thứ 6 không deploy. Đó là quy luật sinh tồn 🛡️",
  "Có 2 điều khó nhất trong IT: Đặt tên biến và xóa cache 🧠",
  "Ngủ là để sạc pin, thức là để commit lúc 3h sáng 🌙",
  "Đời người ngắn ngủi, hãy dùng phím tắt nhiều hơn ⌨️",
  "Đang compile... vui lòng không thở mạnh ⏳",
];

export function MyPcModal({
  user,
  onClose,
}: {
  user: MappedUser;
  onClose: () => void;
}) {
  const [quoteIdx, setQuoteIdx] = useState(0);
  const [caffeine, setCaffeine] = useState(250);
  const [ramBoosted, setRamBoosted] = useState(false);

  useEffect(() => {
    setQuoteIdx(Math.floor(Math.random() * DEV_QUOTES.length));
  }, []);

  const nextQuote = () => {
    setQuoteIdx((prev) => (prev + 1) % DEV_QUOTES.length);
  };

  const boostRam = () => {
    setRamBoosted(true);
    setTimeout(() => setRamBoosted(false), 2000);
  };

  const addCoffee = () => {
    setCaffeine((prev) => prev + 100);
  };

  const Row = ({ k, v }: { k: string; v: React.ReactNode }) => (
    <div className="flex items-center justify-between gap-3 py-1 text-xs">
      <span className="text-slate-400 dark:text-white/45">{k}</span>
      <span className="truncate text-right font-medium text-slate-800 dark:text-white/90">
        {v}
      </span>
    </div>
  );

  return (
    <Modal onClose={onClose} width={450}>
      <div className="mb-3 flex items-center gap-2 border-b border-slate-200/80 pb-3 dark:border-white/10">
        <div className="flex items-center gap-1.5">
          <span className="h-3 w-3 rounded-full bg-rose-500/90 shadow-sm" />
          <span className="h-3 w-3 rounded-full bg-amber-500/90 shadow-sm" />
          <span className="h-3 w-3 rounded-full bg-emerald-500/90 shadow-sm" />
        </div>
        <p className="ml-2 text-xs font-semibold tracking-tight text-slate-700 dark:text-white/90">
          Giới thiệu về VNTEZ OS
        </p>
        <button
          onClick={onClose}
          className="ml-auto rounded-md p-1 text-slate-400 hover:bg-slate-100 hover:text-slate-700 dark:text-white/50 dark:hover:bg-white/10 dark:hover:text-white"
        >
          <X className="h-4 w-4" />
        </button>
      </div>

      <div className="space-y-3">
        <div className="relative overflow-hidden rounded-2xl border border-sky-500/20 bg-gradient-to-br from-sky-500/10 via-indigo-500/10 to-purple-500/10 p-3.5 text-center dark:border-white/10 dark:bg-white/5">
          <div className="mx-auto mb-2 flex h-13 w-13 items-center justify-center rounded-2xl bg-gradient-to-br from-sky-400 via-blue-500 to-indigo-600 shadow-lg shadow-blue-500/30 ring-2 ring-white/50">
            <span className="text-3xl">🪐</span>
          </div>
          <h3 className="text-base font-bold tracking-tight text-slate-900 dark:text-white">
            VNTEZ OS Ultra Pro Max
          </h3>
          <p className="text-[11px] font-mono text-slate-500 dark:text-white/60">
            Phiên bản 2026.4.2 • Mã hiệu:{" "}
            <span className="font-semibold text-primary">Cà Phê Muối</span>
          </p>
        </div>

        <div className="relative rounded-xl border border-amber-500/20 bg-amber-500/5 p-3 dark:border-amber-400/20 dark:bg-amber-400/5">
          <div className="flex items-center justify-between pb-1.5">
            <span className="flex items-center gap-1.5 text-[11px] font-semibold text-amber-600 dark:text-amber-400">
              <Sparkles className="h-3.5 w-3.5" /> Châm ngôn Dev hôm nay
            </span>
            <button
              onClick={nextQuote}
              className="flex items-center gap-1 rounded-md px-1.5 py-0.5 text-[10px] font-medium text-amber-700 hover:bg-amber-500/10 dark:text-amber-300"
            >
              <RefreshCw className="h-3 w-3" /> Đổi câu khác
            </button>
          </div>
          <p className="text-xs italic text-slate-700 dark:text-white/85">
            "{DEV_QUOTES[quoteIdx]}"
          </p>
        </div>

        <div className="rounded-xl border border-slate-200/80 bg-slate-50/70 p-3 dark:border-white/10 dark:bg-white/5">
          <p className="mb-1.5 font-mono text-[10px] uppercase tracking-wider text-slate-400 dark:text-white/45">
            Cấu hình phần cứng vũ trụ
          </p>
          <Row k="Vi xử lý" v="Quantum Core i99-9990K @ 9.9 GHz ⚡" />
          <Row
            k="Bộ nhớ RAM"
            v={
              ramBoosted ? (
                <span className="font-bold text-emerald-500">
                  128 TB (Đã dọn sạch sẽ! ✨)
                </span>
              ) : (
                "128 TB Cloud DDR7 (Chrome ngốn 99%)"
              )
            }
          />
          <Row k="Đồ họa" v="VNTEZ RTX 6090 Ti 128GB (Render Meme 4K)" />
          <Row k="Ổ cứng" v="1,000 PB SSD (Lưu toàn ý tưởng triệu đô 💡)" />
          <Row k="Pin hệ thống" v="99.9% (Tối đi ngủ, sáng chạy tiếp 🔋)" />
          <Row k="Caffeine nạp" v={`${caffeine} mg (Đủ tỉnh táo đến mai ☕)`} />
        </div>

        <div className="flex items-center gap-2 pt-0.5">
          <button
            onClick={boostRam}
            disabled={ramBoosted}
            className="flex flex-1 items-center justify-center gap-1.5 rounded-xl border border-sky-500/30 bg-sky-500/10 py-2 text-xs font-semibold text-sky-600 transition-colors hover:bg-sky-500/20 active:scale-98 dark:text-sky-300"
          >
            <Zap className="h-3.5 w-3.5" />
            {ramBoosted ? "Đang giải phóng RAM..." : "Giải phóng 128TB RAM"}
          </button>
          <button
            onClick={addCoffee}
            className="flex flex-1 items-center justify-center gap-1.5 rounded-xl border border-amber-500/30 bg-amber-500/10 py-2 text-xs font-semibold text-amber-600 transition-colors hover:bg-amber-500/20 active:scale-98 dark:text-amber-300"
          >
            <Coffee className="h-3.5 w-3.5" /> Nạp Cà phê (+100mg)
          </button>
        </div>

        <div className="rounded-xl border border-slate-200/80 bg-slate-50/70 p-3 dark:border-white/10 dark:bg-white/5">
          <div className="flex items-center gap-3">
            {user.avatar ? (
              <img
                src={user.avatar}
                alt=""
                className="h-10 w-10 rounded-full object-cover ring-2 ring-primary/30"
              />
            ) : (
              <div className="flex h-10 w-10 items-center justify-center rounded-full bg-gradient-to-br from-primary to-indigo-600 text-sm font-bold text-white shadow">
                {user.name.charAt(0).toUpperCase()}
              </div>
            )}
            <div className="min-w-0 flex-1 leading-tight">
              <div className="flex items-center gap-1.5">
                <p className="truncate text-sm font-bold text-slate-800 dark:text-white">
                  {user.name}
                </p>
                <span className="rounded-full bg-primary/15 px-2 py-0.5 text-[9px] font-bold text-primary">
                  Tổng tư lệnh 👑
                </span>
              </div>
              <p className="truncate font-mono text-[11px] text-slate-400 dark:text-white/50">
                {user.email || "user@vntez.cloud"}
              </p>
            </div>
          </div>
        </div>
      </div>
    </Modal>
  );
}
