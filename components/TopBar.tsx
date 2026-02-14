"use client";

import { useLocale, useTranslations } from "next-intl";
import { usePathname, useRouter, Link } from "@/i18n/navigation";

export default function TopBar() {
  const t = useTranslations("topbar");

  const locale = useLocale();
  const pathname = usePathname();
  const router = useRouter();

  const nextLocale = locale === "bn" ? "en" : "bn";

  return (
    <div className="bg-sky-700 text-white">
      <div className="mx-auto max-w-5xl px-4 sm:px-6 lg:px-8 py-1 text-xs flex items-center justify-between">
        <div className="flex items-center gap-3">
          <span>📞 01XXXXXXXXX</span>
          <span className="hidden sm:inline">|</span>
          <span className="hidden sm:inline">✉️ info@example.com</span>
        </div>

        <div className="flex items-center gap-3">
          <Link className="hover:underline" href="/login">
            {t("login")}
          </Link>

          <Link className="hover:underline hidden sm:inline" href="/contact">
            {t("contact")}
          </Link>

          <button
            type="button"
            className="rounded bg-white/10 px-2 py-1 hover:bg-white/20"
            onClick={() => router.replace(pathname, { locale: nextLocale })}
            aria-label={t("switchAria")}
          >
            {t("lang")}
          </button>
        </div>
      </div>
    </div>
  );
}
