// app/[locale]/page.tsx
import HeroImageSlider from "@/components/HeroImageSlider";
import LatestNoticeSlider from "@/components/LatestNoticeSlider";
import NoticeTable from "@/components/NoticeTable";
import SidebarLinks from "@/components/SidebarLinks";
import PrincipalCard from "@/components/PrincipalCard"; // ✅ add this
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
        {/* ✅ replace your old bg-white principal div with this */}
        <div className="md:col-span-4">
          <PrincipalCard />
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
