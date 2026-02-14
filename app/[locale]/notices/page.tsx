"use client";

import { useMemo, useState } from "react";
import { Link } from "@/i18n/navigation";
import { useTranslations } from "next-intl";

import { studentNotices as allNotices, type Notice } from "@/lib/notices";

const preferredOrderBn = ["পরীক্ষা", "ছুটি", "ক্লাস নোটিশ", "সাধারণ", "অন্যান্য"] as const;

const categoryMap: Record<string, "exam" | "holiday" | "class" | "general" | "other"> = {
  পরীক্ষা: "exam",
  ছুটি: "holiday",
  "ক্লাস নোটিশ": "class",
  সাধারণ: "general",
  অন্যান্য: "other",
};

function categoryKey(bn: string) {
  return categoryMap[bn] ?? "other";
}

function formatDateShort(iso: string) {
  const d = new Date(iso + "T00:00:00");
  return d.toLocaleDateString("en-GB", { day: "2-digit", month: "short", year: "2-digit" });
}

function RowMenu({ fileUrl, downloadLabel }: { fileUrl?: string; downloadLabel: string }) {
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
              {downloadLabel}
            </a>
          </div>
        </>
      )}
    </div>
  );
}

export default function NoticesPage() {
  const t = useTranslations("notices");
  const c = useTranslations("common");

  const [category, setCategory] = useState<string>("ALL");
  const [visible, setVisible] = useState<number>(10);

  const getStudentCategoryBn = (n: Notice) => String((n as any).studentCategory ?? "সাধারণ");

  const categoriesBn = useMemo(() => {
    const set = new Set<string>();
    for (const n of allNotices) set.add(getStudentCategoryBn(n));

    const list = Array.from(set);

    list.sort((a, b) => {
      const ia = preferredOrderBn.indexOf(a as any);
      const ib = preferredOrderBn.indexOf(b as any);

      if (ia !== -1 && ib !== -1) return ia - ib;
      if (ia !== -1) return -1;
      if (ib !== -1) return 1;
      return a.localeCompare(b);
    });

    return list;
  }, []);

  const filtered = useMemo(() => {
    const sorted = [...allNotices].sort((a, b) => b.date.localeCompare(a.date));
    if (category === "ALL") return sorted;
    return sorted.filter((n) => getStudentCategoryBn(n) === category);
  }, [category]);

  const shown = filtered.slice(0, visible);

  return (
    <main className="px-4 py-6 sm:px-6 lg:px-8 bg-[color:var(--bg-main)] text-[color:var(--text-main)]">
      <div className="py-4">
        <h1 className="text-2xl sm:text-3xl font-semibold">{t("studentsTitle")}</h1>

        <div className="mt-3 flex flex-wrap items-center gap-3">
          <select
            className="w-56 rounded border px-3 py-2 text-sm bg-[color:var(--bg-card)] text-[color:var(--text-main)] border-[color:var(--border)]"
            value={category}
            onChange={(e) => {
              setCategory(e.target.value);
              setVisible(10);
            }}
          >
            <option value="ALL">{t("all")}</option>
            {categoriesBn.map((bn) => (
              <option key={bn} value={bn}>
                {t(`categories.${categoryKey(bn)}`)}
              </option>
            ))}
          </select>

          {category !== "ALL" && (
            <span className="text-xs text-[color:var(--text-muted)]">
              {t("categoryLabel")}{" "}
              <span className="font-semibold">{t(`categories.${categoryKey(category)}`)}</span>
            </span>
          )}
        </div>
      </div>

      <div className="overflow-hidden rounded-xl border bg-[color:var(--bg-card)] border-[color:var(--border)] shadow-sm">
        <div className="bg-sky-600 px-4 py-2 text-white font-semibold">{t("sectionTitle")}</div>

        {/* MOBILE */}
        <div className="sm:hidden divide-y divide-[color:var(--border)]">
          {shown.map((n: Notice, idx: number) => {
            const catBn = getStudentCategoryBn(n);
            return (
              <div key={n.id} className="flex items-start justify-between gap-3 p-3">
                <div className="min-w-0">
                  <div className="text-xs text-[color:var(--text-muted)]">
                    {idx + 1}. {formatDateShort(n.date)}
                  </div>

                  <div className="mt-1 font-medium leading-snug text-[color:var(--text-main)]">
                    {n.title}
                  </div>

                  <div className="mt-1 text-[11px] text-[color:var(--text-muted)]">
                    {t(`categories.${categoryKey(catBn)}`)}
                  </div>
                </div>

                <RowMenu fileUrl={n.fileUrl} downloadLabel={c("downloadPdf")} />
              </div>
            );
          })}

          {shown.length === 0 && (
            <div className="p-6 text-center text-[color:var(--text-muted)]">{c("emptyNotices")}</div>
          )}
        </div>

        {/* DESKTOP/TABLET */}
        <div className="hidden sm:block overflow-x-auto">
          <table className="w-full text-sm">
            <thead className="bg-[color:var(--bg-main)] text-[color:var(--text-muted)]">
              <tr className="border-b border-[color:var(--border)]">
                <th className="p-2 text-center w-16">{t("th.sl")}</th>
                <th className="p-2 text-left w-28">{t("th.date")}</th>
                <th className="p-2 text-left min-w-[240px]">{t("th.title")}</th>
                <th className="p-2 text-left w-32">{t("th.category")}</th>
                <th className="p-2 text-center w-28">{t("th.download")}</th>
              </tr>
            </thead>

            <tbody className="divide-y divide-[color:var(--border)]">
              {shown.map((n: Notice, idx: number) => {
                const catBn = getStudentCategoryBn(n);
                return (
                  <tr key={n.id} className="hover:bg-[color:var(--bg-main)]">
                    <td className="p-2 text-center text-[color:var(--text-muted)]">{idx + 1}</td>
                    <td className="p-2 whitespace-nowrap text-[color:var(--text-muted)]">
                      {formatDateShort(n.date)}
                    </td>
                    <td className="p-2 text-[color:var(--text-main)]">{n.title}</td>
                    <td className="p-2 text-[color:var(--text-muted)]">
                      {t(`categories.${categoryKey(catBn)}`)}
                    </td>
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
                        <span className="text-xs text-[color:var(--text-muted)]">{c("na")}</span>
                      )}
                    </td>
                  </tr>
                );
              })}

              {shown.length === 0 && (
                <tr>
                  <td className="p-6 text-center text-[color:var(--text-muted)]" colSpan={5}>
                    {c("emptyNotices")}
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>

        <div className="p-4 flex justify-center">
          {visible < filtered.length ? (
            <button
              onClick={() => setVisible((v) => v + 10)}
              className="rounded bg-sky-600 px-6 py-2 text-sm font-semibold text-white hover:bg-sky-700"
            >
              {c("loadMore")}
            </button>
          ) : (
            <span className="text-xs text-[color:var(--text-muted)]">{c("noMore")}</span>
          )}
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
