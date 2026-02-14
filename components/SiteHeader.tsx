import Image from "next/image";
import { useTranslations } from "next-intl";
import { Link } from "@/i18n/navigation";

export default function SiteHeader() {
  const t = useTranslations("siteHeader");

  return (
    <header className="bg-white">
      <div className="mx-auto max-w-5xl px-4 sm:px-6 lg:px-8 py-4">
        <div className="grid grid-cols-12 items-center gap-2">
          {/* Left logo (click to home) */}
          <div className="col-span-3 sm:col-span-2 flex items-center justify-start">
            <Link
              href="/"
              aria-label={t("homeAria")}
              className="relative h-12 w-12 sm:h-14 sm:w-14 cursor-pointer"
            >
              <Image
                src="/logo-left.png"
                alt={t("logoAlt")}
                fill
                className="object-contain"
                priority
              />
            </Link>
          </div>

          {/* Title */}
          <div className="col-span-6 sm:col-span-8 text-center">
            <h1 className="text-lg sm:text-2xl font-semibold leading-snug">
              {t("title")}
            </h1>
            <p className="mt-1 text-xs sm:text-sm text-gray-600">
              {t("subtitle")}
            </p>
          </div>

          {/* Right logo */}
          <div className="col-span-3 sm:col-span-2 flex items-center justify-end">
            <div className="relative h-12 w-12 sm:h-14 sm:w-14">
              <div className="h-full w-full rounded bg-gray-100" />
              {/* Later replace with:
              <Image src="/logo-right.png" alt={t("rightLogoAlt")} fill className="object-contain" />
              */}
            </div>
          </div>
        </div>
      </div>
    </header>
  );
}
