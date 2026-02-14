"use client";

import { useTranslations } from "next-intl";
import { Link } from "@/i18n/navigation";

export default function PrincipalCard() {
  const t = useTranslations("home");

  return (
    <div className="rounded-xl bg-[var(--bg-card)] p-4 shadow-sm border border-[var(--border)]">
      <div className="flex items-center justify-between gap-3">
        <div className="flex items-center gap-2">
          <span className="h-4 w-[3px] bg-sky-600" />
          <h2 className="text-lg font-semibold text-[var(--text-main)]">
            {t("principalTitle")}
          </h2>
        </div>

        <Link
          href="/principal"
          className="text-xs font-semibold text-sky-500 hover:text-sky-400 hover:underline"
        >
          বিস্তারিত →
        </Link>
      </div>

      {/* image/placeholder box */}
      <div className="mt-3 overflow-hidden rounded-lg bg-[var(--bg-main)] border border-[var(--border)]">
        <div className="h-44 w-full opacity-90" />
      </div>

      <p className="mt-3 text-sm leading-relaxed text-[var(--text-muted)]">
        {t("principalMessage")}
      </p>
    </div>
  );
}
