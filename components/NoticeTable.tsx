"use client";

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

function normalizeUrl(url?: string) {
  const u = (url ?? "").trim();
  if (!u || u === "#") return "";
  return u;
}

function filenameFromUrl(url: string) {
  const clean = url.split("#")[0].split("?")[0];
  const last = clean.substring(clean.lastIndexOf("/") + 1);
  return last || "notice.pdf";
}

function isSameOrigin(url: string) {
  return url.startsWith("/");
}

function TitleLink({ title, url }: { title: string; url: string }) {
  return (
    <a
      href={url}
      target="_blank"
      rel="noreferrer"
      className="hover:underline"
      title={title}
    >
      {title}
    </a>
  );
}

function PdfButton({ url, label }: { url: string; label: string }) {
  const safeUrl = normalizeUrl(url);
  if (!safeUrl)
    return <span className="text-xs text-[color:var(--text-muted)]">N/A</span>;

  return (
    <a
      href={safeUrl}
      download={isSameOrigin(safeUrl) ? filenameFromUrl(safeUrl) : undefined}
      className="inline-flex items-center justify-center rounded bg-red-600 px-2 py-1 text-[11px] font-bold text-white hover:bg-red-700"
      title={label}
    >
      PDF
    </a>
  );
}

export default function NoticeTable() {
  const t = useTranslations("noticeTable");
  const c = useTranslations("common");

  const rows: Notice[] = [...studentNotices]
    .sort((a, b) => b.date.localeCompare(a.date))
    .slice(0, 6);

  return (
    <div className="rounded-xl bg-[color:var(--bg-card)] text-[color:var(--text-main)] shadow-[var(--shadow-card)] overflow-hidden">
      {/* Title */}
      <div className="px-3 pt-3">
        <div className="flex items-center gap-2">
          <span className="h-4 w-[3px] bg-sky-600" />
          <h2 className="text-lg font-semibold">{t("title")}</h2>
        </div>
      </div>

      <div className="mt-3 overflow-x-auto">
        <table className="w-full text-sm">
          <thead className="bg-sky-600 text-white">
            <tr>
              <th className="p-2 text-center w-12">{t("th.sl")}</th>
              <th className="p-2 text-left w-28">{t("th.date")}</th>
              <th className="p-2 text-left">{t("th.title")}</th>
              <th className="p-2 text-center w-24">{t("th.download")}</th>
            </tr>
          </thead>

          <tbody className="divide-y divide-[color:var(--divider)]">
            {rows.map((n, i) => {
              const url = normalizeUrl(n.fileUrl);

              return (
                <tr
                  key={n.id}
                  className="hover:bg-[color:var(--bg-main)] transition-colors"
                >
                  <td className="p-2 text-center">{i + 1}</td>

                  <td className="p-2 whitespace-nowrap text-[color:var(--text-muted)]">
                    {formatDateShort(n.date)}
                  </td>

                  {/* Title opens */}
                  <td className="p-2">
                    {url ? <TitleLink title={n.title} url={url} /> : n.title}
                  </td>

                  {/* Red PDF button */}
                  <td className="p-2 text-center">
                    {url ? (
                      <PdfButton url={url} label={c("downloadPdf")} />
                    ) : (
                      <span className="text-xs text-[color:var(--text-muted)]">
                        {c("na")}
                      </span>
                    )}
                  </td>
                </tr>
              );
            })}

            {rows.length === 0 && (
              <tr>
                <td
                  colSpan={4}
                  className="p-6 text-center text-[color:var(--text-muted)]"
                >
                  {c("emptyNotices")}
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      {/* Bottom button */}
      <div className="p-4 flex justify-center">
        <Link
          href="/notices"
          className="rounded bg-sky-600 px-8 py-2 text-sm font-semibold text-white hover:bg-sky-700"
        >
          {t("allBtn")}
        </Link>
      </div>
    </div>
  );
}
