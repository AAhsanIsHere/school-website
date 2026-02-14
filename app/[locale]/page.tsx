import HeroImageSlider from "@/components/HeroImageSlider";
import LatestNoticeSlider from "@/components/LatestNoticeSlider";
import NoticeTable from "@/components/NoticeTable";
import SidebarLinks from "@/components/SidebarLinks";
import { useTranslations } from "next-intl";

export default function Home() {
  const t = useTranslations("home");

  return (
    <main className="mx-auto max-w-5xl px-3 sm:px-4 lg:px-6 py-6">
      <HeroImageSlider />

      <div className="mt-3">
        <LatestNoticeSlider />
      </div>

      <section className="mt-5 grid grid-cols-1 gap-5 md:grid-cols-12">
        <div className="md:col-span-4">
          <div className="rounded-xl bg-white p-4 shadow-sm ring-1 ring-black/5">
            <div className="flex items-center gap-2">
              <span className="h-4 w-[3px] bg-sky-600" />
              <h2 className="text-lg font-semibold">{t("principalTitle")}</h2>
            </div>

            <div className="mt-3 overflow-hidden rounded-lg bg-slate-100 ring-1 ring-black/5">
              <div className="h-44 w-full" />
            </div>

            <p className="mt-3 text-sm text-slate-700 leading-relaxed">
              {t("principalMessage")}
            </p>
          </div>
        </div>

        <div className="md:col-span-5">
          <NoticeTable />
        </div>

        <div className="md:col-span-3">
          <SidebarLinks />
        </div>
      </section>
    </main>
  );
}
