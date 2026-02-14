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

export default function NoticeTable() {
  const t = useTranslations("noticeTable");

  const rows: Notice[] = [...studentNotices]
    .sort((a, b) => b.date.localeCompare(a.date))
    .slice(0, 6);

  return (
    <div className="rounded-xl bg-white shadow-sm ring-1 ring-black/5 overflow-hidden">
      {/* Title like screenshot */}
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

          <tbody className="divide-y">
            {rows.map((n, i) => (
              <tr key={n.id} className="hover:bg-slate-50">
                <td className="p-2 text-center">{i + 1}</td>
                <td className="p-2 whitespace-nowrap">
                  {formatDateShort(n.date)}
                </td>
                <td className="p-2">{n.title}</td>
                <td className="p-2 text-center">
                  {n.fileUrl ? (
                    <a
                      href={n.fileUrl}
                      target="_blank"
                      rel="noreferrer"
                      className="inline-flex items-center justify-center rounded bg-red-600 px-2 py-1 text-[11px] font-bold text-white hover:bg-red-700"
                    >
                      {t("pdf")}
                    </a>
                  ) : (
                    <span className="text-xs text-slate-400">{t("na")}</span>
                  )}
                </td>
              </tr>
            ))}

            {rows.length === 0 && (
              <tr>
                <td colSpan={4} className="p-6 text-center text-slate-600">
                  {t("empty")}
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      {/* Bottom button like screenshot */}
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
