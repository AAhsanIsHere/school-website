import TopBar from "@/components/TopBar";
import SiteHeader from "@/components/SiteHeader";
import Navbar from "@/components/Navbar";

import HeroImageSlider from "@/components/HeroImageSlider";
import LatestNoticeSlider from "@/components/LatestNoticeSlider";

import NoticeTable from "@/components/NoticeTable";
import SidebarLinks from "@/components/SidebarLinks";
import Footer from "@/components/Footer";

export default function Home() {
  return (
    <>
      <TopBar />
      <SiteHeader />
      <Navbar />

      <main className="mx-auto max-w-5xl px-3 sm:px-4 lg:px-6 py-4">
        {/* 1) Photo slider */}
        <HeroImageSlider />

        {/* 2) Notice slider (below photo slider) */}
        <div className="mt-3">
          <LatestNoticeSlider />
        </div>

        <section className="mt-4 grid grid-cols-1 gap-4 md:grid-cols-12">
          <div className="md:col-span-4">
            <div className="rounded border bg-white p-3">
              <h2 className="mb-2 text-lg font-semibold">অধ্যক্ষ</h2>
              <div className="h-40 rounded bg-gray-100" />
              <p className="mt-2 text-sm text-gray-700">
                এখানে অধ্যক্ষের সংক্ষিপ্ত বার্তা থাকবে…
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

      <Footer />
    </>
  );
}
