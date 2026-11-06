"use client";

import { useState } from "react";
import { X } from "lucide-react";
import { Modal } from "../modal-base";
import type { Layout } from "../types";
import { isUrl, urlTaken } from "../desktop-utils";

export function AddAppModal({
  layout,
  onClose,
  onAdd,
}: {
  layout: Layout;
  onClose: () => void;
  onAdd: (n: string, u: string, i: string) => Promise<void> | void;
}) {
  const [name, setName] = useState("");
  const [url, setUrl] = useState("");
  const [icon, setIcon] = useState("");
  const [err, setErr] = useState<string | null>(null);
  const [submitting, setSubmitting] = useState(false);

  const submit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!name.trim()) return setErr("Vui lòng nhập tên ứng dụng.");
    if (!isUrl(url)) return setErr("Link phải là URL http(s) hợp lệ.");
    if (urlTaken(layout, url.trim()))
      return setErr("Ứng dụng này đã tồn tại trong hệ thống.");

    try {
      setSubmitting(true);
      setErr(null);
      await onAdd(name.trim(), url.trim(), icon.trim());
      onClose();
    } catch (e: unknown) {
      setErr(e instanceof Error ? e.message : "Đã có lỗi xảy ra");
    } finally {
      setSubmitting(false);
    }
  };

  const field =
    "h-10 w-full rounded-lg border border-slate-200/90 bg-white px-3 text-sm text-slate-900 placeholder:text-slate-400 focus:border-primary/60 focus:outline-none focus:ring-2 focus:ring-primary/25 dark:border-white/10 dark:bg-white/5 dark:text-white dark:placeholder:text-white/35 disabled:opacity-50";

  return (
    <Modal onClose={onClose}>
      <div className="mb-3 flex items-center justify-between border-b border-slate-200/80 pb-3 dark:border-white/10">
        <p className="text-sm font-semibold">Thêm lối tắt ứng dụng</p>
        <button
          onClick={onClose}
          disabled={submitting}
          className="rounded-md p-1 text-slate-400 hover:bg-slate-100 hover:text-slate-700 dark:text-white/50 dark:hover:bg-white/10 dark:hover:text-white"
        >
          <X className="h-4 w-4" />
        </button>
      </div>
      <form onSubmit={submit} className="space-y-3">
        <div>
          <label className="mb-1 block text-xs font-medium text-slate-600 dark:text-white/70">
            Tên ứng dụng
          </label>
          <input
            autoFocus
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder="Ví dụ: Google Docs"
            className={field}
            disabled={submitting}
          />
        </div>
        <div>
          <label className="mb-1 block text-xs font-medium text-slate-600 dark:text-white/70">
            Địa chỉ Web (URL)
          </label>
          <input
            value={url}
            onChange={(e) => setUrl(e.target.value)}
            placeholder="https://..."
            className={field}
            disabled={submitting}
          />
        </div>
        <div>
          <label className="mb-1 block text-xs font-medium text-slate-600 dark:text-white/70">
            Icon URL (tùy chọn - mặc định lấy favicon)
          </label>
          <input
            value={icon}
            onChange={(e) => setIcon(e.target.value)}
            placeholder="https://.../icon.png"
            className={field}
            disabled={submitting}
          />
        </div>
        {err && <p className="text-xs text-rose-500">{err}</p>}
        <button
          type="submit"
          disabled={submitting}
          className="flex h-10 w-full items-center justify-center rounded-lg bg-primary text-sm font-medium text-primary-foreground shadow transition-opacity hover:opacity-90 disabled:opacity-50"
        >
          {submitting
            ? "Đang lưu vào Supabase..."
            : "Thêm vào màn hình Desktop"}
        </button>
      </form>
    </Modal>
  );
}
