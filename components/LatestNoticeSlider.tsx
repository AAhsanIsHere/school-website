"use client";

import { useEffect, useMemo, useState } from "react";
import { Link } from "@/i18n/navigation";
import { useTranslations } from "next-intl";
import { studentNotices, type Notice } from "@/lib/notices";

function normalizeUrl(url?: string) {
  const u = (url ?? "").trim();
  if (!u || u === "#") return "";
  return u;
}

function filenameFromUrl(url: string) {
  try {
    const clean = url.split("#")[0].split("?")[0];
    const last = clean.substring(clean.lastIndexOf("/") + 1);
    return last || "notice.pdf";
  } catch {
    return "notice.pdf";
  }
}

function isSameOrigin(url: string) {
  // same-origin = files in /public or your own domain routes
  return url.startsWith("/");
}

export default function LatestNoticeSlider() {
  const t = useTranslations("latestNotice");

  const items: Notice[] = useMemo(() => {
    return [...studentNotices]
      .sort((a, b) => b.date.localeCompare(a.date))
      .slice(0, 10);
  }, []);

  const [idx, setIdx] = useState(0);

  useEffect(() => {
    if (items.length <= 1) return;
    const id = setInterval(() => setIdx((p) => (p + 1) % items.length), 6000);
    return () => clearInterval(id);
  }, [items.length]);

  if (items.length === 0) return null;

  const current = items[idx];
  const fileUrl = normalizeUrl(current.fileUrl);
  const hasFile = !!fileUrl;

  const prev = () => setIdx((p) => (p - 1 + items.length) % items.length);
  const next = () => setIdx((p) => (p + 1) % items.length);

  return (
    <div className="w-full overflow-hidden rounded-md border border-[color:var(--border)] bg-[var(--bg-card)] shadow-[var(--shadow-card)]">      <div className="flex items-center">
        {/* Left label */}
        <div className="shrink-0 bg-sky-600 px-4 py-2 text-sm font-semibold text-white">
          {t("label")}
        </div>

        {/* Middle text (OPEN in new tab) */}
        <div className="min-w-0 flex-1 px-4 py-2">
          {hasFile ? (
            <a
              href={fileUrl}
              target="_blank"
              rel="noreferrer"
              className="block truncate text-sm text-[var(--text-main)] hover:underline"
              title={current.title}
            >
              {current.title}
            </a>
          ) : (
            <Link
              href="/notices"
              className="block truncate text-sm text-[var(--text-main)] hover:underline"
              title={current.title}
            >
              {current.title}
            </Link>
          )}
        </div>

        {/* Right controls */}
        <div className="flex shrink-0 items-stretch border-l border-[color:var(--border)]">
          {/* DOWNLOAD button (separate) */}
          {hasFile && (
            <a
              href={fileUrl}
              // download works reliably only for same-origin files
              download={isSameOrigin(fileUrl) ? filenameFromUrl(fileUrl) : undefined}
              className="inline-flex items-center justify-center bg-red-600 px-3 text-[11px] font-bold text-white hover:bg-red-700"
              title="PDF"
            >
              PDF
            </a>
          )}

          <button
            type="button"
            onClick={prev}
            className="px-3 py-2 text-[var(--text-main)] hover:bg-[var(--bg-main)]"
            aria-label={t("prev")}
            title={t("prev")}
          >
            ‹
          </button>

          <button
            type="button"
            onClick={next}
            className="px-3 py-2 text-[var(--text-main)] hover:bg-[var(--bg-main)]"
            aria-label={t("next")}
            title={t("next")}
          >
            ›
          </button>
        </div>
      </div>
    </div>
  );
}
