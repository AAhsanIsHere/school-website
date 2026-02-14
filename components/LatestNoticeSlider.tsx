"use client";

import { useEffect, useMemo, useState } from "react";
import Link from "next/link";
import { notices as allNotices, type Notice } from "@/lib/notices";

export default function LatestNoticeSlider() {
  const notices = useMemo(() => {
    return [...allNotices].sort((a, b) => (a.date < b.date ? 1 : -1)).slice(0, 15);
  }, []);

  const [index, setIndex] = useState(0);
  const prev = () => setIndex((i) => (i - 1 + notices.length) % notices.length);
  const next = () => setIndex((i) => (i + 1) % notices.length);

  useEffect(() => {
    if (notices.length <= 1) return;
    const t = setInterval(() => setIndex((i) => (i + 1) % notices.length), 3500);
    return () => clearInterval(t);
  }, [notices.length]);

  const current: Notice | null = notices.length ? notices[index] : null;

  return (
    <div className="rounded border bg-white shadow-sm">
      <div className="flex items-center gap-2 px-2 py-2">
        {/* Left blue tag */}
        <Link
          href="/notices"
          className="shrink-0 rounded bg-sky-700 px-3 py-2 text-xs font-semibold text-white hover:bg-sky-800"
        >
          কলেজের সর্বশেষ নোটিশ
        </Link>

        {/* Scrolling/caption text */}
        <div className="min-w-0 flex-1 text-sm text-slate-800">
          {current ? (
            <div className="flex items-center gap-2 min-w-0">
              <span className="truncate">{current.title}</span>
              {current.fileUrl ? (
                <a
                  href={current.fileUrl}
                  className="shrink-0 rounded bg-red-600 px-2 py-1 text-[11px] font-bold text-white hover:bg-red-700"
                >
                  PDF
                </a>
              ) : null}
            </div>
          ) : (
            <span className="text-slate-500">এখনো কোনো নোটিশ যোগ করা হয়নি।</span>
          )}
        </div>

        {/* Right arrows */}
        <div className="shrink-0 flex items-center gap-1">
          <button
            type="button"
            onClick={prev}
            disabled={notices.length <= 1}
            className="h-9 w-9 rounded border bg-white hover:bg-slate-50 disabled:opacity-50"
            aria-label="Previous notice"
          >
            ‹
          </button>
          <button
            type="button"
            onClick={next}
            disabled={notices.length <= 1}
            className="h-9 w-9 rounded border bg-white hover:bg-slate-50 disabled:opacity-50"
            aria-label="Next notice"
          >
            ›
          </button>
        </div>
      </div>
    </div>
  );
}
