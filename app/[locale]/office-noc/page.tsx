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
        className={[
          "rounded px-2 py-1 text-sm border",
          "bg-[color:var(--bg-main)] text-[color:var(--text-main)] border-[color:var(--border)]",
          disabled ? "opacity-50 cursor-not-allowed" : "hover:bg-[color:var(--border)]",
        ].join(" ")}
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
            className="absolute right-0 z-10 mt-2 w-44 overflow-hidden rounded-lg border bg-[color:var(--bg-card)] shadow-lg border-[color:var(--border)]"
            role="menu"
          >
            <a
              href={fileUrl}
              target="_blank"
              rel="noreferrer"
              className="block px-3 py-2 text-sm text-[color:var(--text-main)] hover:bg-[color:var(--bg-main)]"
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
    <main className="px-4 py-6 sm:px-6 lg:px-8 bg-[color:var(--bg-main)] text-[color:var(--text-main)]">
      <div className="py-4">
        <h1 className="text-2xl sm:text-3xl font-semibold">{t("title")}</h1>
      </div>

      <div className="overflow-hidden rounded-xl border bg-[color:var(--bg-card)] border-[color:var(--border)] shadow-sm">
        <div className="bg-sky-600 px-4 py-2 text-white font-semibold">
          {t("listTitle")}
        </div>

        {/* Mobile */}
        <div className="sm:hidden divide-y divide-[color:var(--border)]">
          {sorted.map((n: Notice, idx: number) => (
            <div key={n.id} className="flex items-start justify-between gap-3 p-3">
              <div className="min-w-0">
                <div className="text-xs text-[color:var(--text-muted)]">
                  {idx + 1}. {formatDateShort(n.date)}
                </div>
                <div className="mt-1 font-medium leading-snug text-[color:var(--text-main)]">
                  {n.title}
                </div>
              </div>
              <RowMenu fileUrl={n.fileUrl} />
            </div>
          ))}

          {sorted.length === 0 && (
            <div className="p-6 text-center text-[color:var(--text-muted)]">
              {t("empty")}
            </div>
          )}
        </div>

        {/* Desktop */}
        <div className="hidden sm:block overflow-x-auto">
          <table className="w-full text-sm">
            <thead className="bg-[color:var(--bg-main)] text-[color:var(--text-muted)]">
              <tr className="border-b border-[color:var(--border)]">
                <th className="p-2 text-center w-16">{t("th.sl")}</th>
                <th className="p-2 text-left w-28">{t("th.date")}</th>
                <th className="p-2 text-left min-w-[240px]">{t("th.title")}</th>
                <th className="p-2 text-center w-28">{t("th.download")}</th>
              </tr>
            </thead>

            <tbody className="divide-y divide-[color:var(--border)]">
              {sorted.map((n: Notice, idx: number) => (
                <tr key={n.id} className="hover:bg-[color:var(--bg-main)]">
                  <td className="p-2 text-center text-[color:var(--text-muted)]">
                    {idx + 1}
                  </td>

                  <td className="p-2 whitespace-nowrap text-[color:var(--text-muted)]">
                    {formatDateShort(n.date)}
                  </td>

                  <td className="p-2 text-[color:var(--text-main)]">{n.title}</td>

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
                      <span className="text-xs text-[color:var(--text-muted)]">
                        {c("na")}
                      </span>
                    )}
                  </td>
                </tr>
              ))}

              {sorted.length === 0 && (
                <tr>
                  <td className="p-6 text-center text-[color:var(--text-muted)]" colSpan={4}>
                    {t("empty")}
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>

      <div className="mt-4">
        <Link className="text-sm text-sky-600 hover:underline" href="/">
          {c("backHome")}
        </Link>
      </div>
    </main>
  );
}
