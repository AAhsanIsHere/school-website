"use client";

import { useMemo, useState } from "react";
import { Link } from "@/i18n/navigation";
import { useTranslations } from "next-intl";

import { officeNocs as allNotices, type Notice } from "@/lib/notices";

function formatDateShort(iso: string) {
  const d = new Date(iso + "T00:00:00");
  return d.toLocaleDateString("en-GB", {
    day: "2-digit",
    month: "short",
    year: "2-digit",
  });
}

function RowMenu({ fileUrl }: { fileUrl?: string }) {
  const c = useTranslations("common");
  const [open, setOpen] = useState(false);
  const disabled = !fileUrl;

  return (
    <div className="relative inline-block">
      <button
        type="button"
        disabled={disabled}
        onClick={() => setOpen((v) => !v)}
        className={`rounded px-2 py-1 text-sm ${
          disabled
            ? "bg-slate-100 text-slate-400 cursor-not-allowed"
            : "bg-slate-100 hover:bg-slate-200"
        }`}
        aria-expanded={open}
        aria-haspopup="menu"
      >
        ⋮
      </button>

      {open && !disabled && (
        <>
          <button
            type="button"
            className="fixed inset-0 cursor-default"
            onClick={() => setOpen(false)}
            aria-label="Close"
          />

          <div
            className="absolute right-0 z-10 mt-2 w-44 overflow-hidden rounded-lg bg-white shadow-lg ring-1 ring-black/10"
            role="menu"
          >
            <a
              href={fileUrl}
              target="_blank"
              rel="noreferrer"
              className="block px-3 py-2 text-sm hover:bg-slate-50"
              role="menuitem"
              onClick={() => setOpen(false)}
            >
              {c("downloadPdf")}
            </a>
          </div>
        </>
      )}
    </div>
  );
}

export default function OfficeNocPage() {
  const t = useTranslations("officeNoc");
  const c = useTranslations("common");

  const sorted = useMemo(
    () => [...allNotices].sort((a, b) => (a.date < b.date ? 1 : -1)),
    []
  );

  return (
    <main className="bg-slate-50 px-4 py-6 sm:px-6 lg:px-8">
      <div className="py-4">
        <h1 className="text-2xl sm:text-3xl font-semibold">{t("title")}</h1>
      </div>

      <div className="overflow-hidden rounded-xl bg-white shadow-sm ring-1 ring-black/5">
        <div className="bg-sky-600 px-4 py-2 text-white font-semibold">
          {t("listTitle")}
        </div>

        {/* Mobile */}
        <div className="sm:hidden divide-y">
          {sorted.map((n: Notice, idx: number) => (
            <div key={n.id} className="flex items-start justify-between gap-3 p-3">
              <div className="min-w-0">
                <div className="text-xs text-slate-600">
                  {idx + 1}. {formatDateShort(n.date)}
                </div>
                <div className="mt-1 font-medium text-slate-900 leading-snug">
                  {n.title}
                </div>
              </div>
              <RowMenu fileUrl={n.fileUrl} />
            </div>
          ))}

          {sorted.length === 0 && (
            <div className="p-6 text-center text-slate-600">
              {t("empty")}
            </div>
          )}
        </div>

        {/* Desktop */}
        <div className="hidden sm:block overflow-x-auto">
          <table className="w-full text-sm">
            <thead className="bg-slate-50 text-slate-700">
              <tr className="border-b">
                <th className="p-2 text-center w-16">{t("th.sl")}</th>
                <th className="p-2 text-left w-28">{t("th.date")}</th>
                <th className="p-2 text-left min-w-[240px]">{t("th.title")}</th>
                <th className="p-2 text-center w-28">{t("th.download")}</th>
              </tr>
            </thead>

            <tbody className="divide-y">
              {sorted.map((n: Notice, idx: number) => (
                <tr key={n.id} className="hover:bg-slate-50">
                  <td className="p-2 text-center text-slate-700">{idx + 1}</td>

                  <td className="p-2 text-slate-700 whitespace-nowrap">
                    {formatDateShort(n.date)}
                  </td>

                  <td className="p-2 text-slate-900">{n.title}</td>

                  <td className="p-2 text-center">
                    {n.fileUrl ? (
                      <a
                        href={n.fileUrl}
                        target="_blank"
                        rel="noreferrer"
                        className="inline-flex items-center justify-center rounded bg-red-600 px-2 py-1 text-[11px] font-bold text-white hover:bg-red-700"
                      >
                        {c("pdf")}
                      </a>
                    ) : (
                      <span className="text-xs text-slate-400">{c("na")}</span>
                    )}
                  </td>
                </tr>
              ))}

              {sorted.length === 0 && (
                <tr>
                  <td className="p-6 text-center text-slate-600" colSpan={4}>
                    {t("empty")}
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>

      <div className="mt-4">
        <Link className="text-sm text-sky-700 hover:underline" href="/">
          {c("backHome")}
        </Link>
      </div>
    </main>
  );
}
