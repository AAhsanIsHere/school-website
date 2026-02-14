"use client";

import { useEffect, useMemo, useState } from "react";
import { useTranslations } from "next-intl";
import { Link } from "@/i18n/navigation";

import { studentNotices, type Notice } from "@/lib/notices";

function formatDateShort(iso: string) {
  const d = new Date(iso + "T00:00:00");
  return d.toLocaleDateString("en-GB", {
    day: "2-digit",
    month: "short",
    year: "2-digit",
  });
}

export default function LatestNoticeSlider() {
  const t = useTranslations("latestNotice");

  const items = useMemo(() => {
    return [...studentNotices].sort((a, b) => b.date.localeCompare(a.date));
  }, []);

  const [idx, setIdx] = useState(0);

  const current: Notice | undefined = items.length
    ? items[idx % items.length]
    : undefined;

  const prev = () =>
    setIdx((v) =>
      items.length ? (v - 1 + items.length) % items.length : 0
    );
  const next = () =>
    setIdx((v) => (items.length ? (v + 1) % items.length : 0));

  useEffect(() => {
    if (items.length <= 1) return;
    const timer = setInterval(() => {
      setIdx((v) => (v + 1) % items.length);
    }, 5000);
    return () => clearInterval(timer);
  }, [items.length]);

  return (
    <div className="overflow-hidden rounded-xl bg-white shadow-sm ring-1 ring-black/5">
      <div className="flex items-center">
        {/* Left blue label */}
        <div className="bg-sky-600 px-4 py-2 text-sm font-semibold text-white whitespace-nowrap">
          {t("label")}
        </div>

        {/* Middle text */}
        <div className="flex-1 px-4 py-2 text-sm min-w-0">
          {current ? (
            <div className="flex items-center gap-3 min-w-0">
              <span className="text-xs text-slate-600 whitespace-nowrap">
                {formatDateShort(current.date)}
              </span>

              {current.fileUrl ? (
                <a
                  href={current.fileUrl}
                  target="_blank"
                  rel="noreferrer"
                  className="truncate hover:underline"
                  title={current.title}
                >
                  {current.title}
                </a>
              ) : (
                <Link
                  href="/notices"
                  className="truncate hover:underline"
                  title={current.title}
                >
                  {current.title}
                </Link>
              )}
            </div>
          ) : (
            <span className="text-slate-500">{t("empty")}</span>
          )}
        </div>

        {/* Right arrows */}
        <div className="flex items-center gap-1 px-2">
          <button
            type="button"
            onClick={prev}
            className="h-8 w-8 rounded hover:bg-slate-100 flex items-center justify-center"
            aria-label={t("prev")}
            title={t("prev")}
          >
            ‹
          </button>
          <button
            type="button"
            onClick={next}
            className="h-8 w-8 rounded hover:bg-slate-100 flex items-center justify-center"
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
