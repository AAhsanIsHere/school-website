import { useTranslations } from "next-intl";
import { Link } from "@/i18n/navigation";

export default function Footer() {
  const t = useTranslations("footer");

  return (
    <footer className="mt-8 bg-gray-800 text-gray-200">
      <div className="mx-auto max-w-5xl px-3 sm:px-4 lg:px-6 py-8 grid grid-cols-1 sm:grid-cols-3 gap-6 text-sm">
        {/* College info */}
        <div>
          <div className="font-semibold mb-2">{t("collegeTitle")}</div>
          <p className="text-gray-300">{t("collegeText")}</p>
        </div>

        {/* Quick links */}
        <div>
          <div className="font-semibold mb-2">{t("quickLinksTitle")}</div>
          <ul className="space-y-1 text-gray-300">
            <li>
              <Link href="/notices" className="hover:underline">
                {t("links.notices")}
              </Link>
            </li>
            <li>
              <Link href="/downloads" className="hover:underline">
                {t("links.downloads")}
              </Link>
            </li>
            <li>
              <Link href="/contact" className="hover:underline">
                {t("links.contact")}
              </Link>
            </li>
          </ul>
        </div>

        {/* Copyright */}
        <div>
          <div className="font-semibold mb-2">{t("copyrightTitle")}</div>
          <p className="text-gray-300">
            © {new Date().getFullYear()} {t("siteName")}
          </p>
        </div>
      </div>
    </footer>
  );
}
