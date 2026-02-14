import Image from "next/image";
import { useTranslations } from "next-intl";

import TopBar from "@/components/TopBar";
import SiteHeader from "@/components/SiteHeader";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

export default function PrincipalPage() {
  const t = useTranslations("principal");

  return (
    <div className="min-h-screen bg-slate-100 py-3 sm:py-6">
      <div className="mx-auto max-w-5xl overflow-hidden rounded-2xl bg-white shadow-md">
        <TopBar />
        <SiteHeader />
        <Navbar />

        <main className="bg-white">
          <section className="mx-auto max-w-5xl px-4 sm:px-6 lg:px-8 py-8 sm:py-10">
            <div className="grid grid-cols-1 gap-6 md:grid-cols-12">
              {/* Left: photo */}
              <div className="md:col-span-5">
                <div className="relative overflow-hidden rounded-md border bg-slate-100 shadow-sm">
                  <Image
                    src="/principal.jpg"
                    alt={t("imageAlt")}
                    width={800}
                    height={600}
                    className="h-auto w-full object-cover"
                    priority
                  />
                </div>
              </div>

              {/* Right: text */}
              <div className="md:col-span-7">
                <h1 className="text-xl sm:text-2xl font-bold text-slate-900">
                  {t("title")}
                </h1>
                <p className="mt-1 text-sm text-slate-600">{t("subtitle")}</p>

                <div className="mt-4 space-y-3 text-[13px] leading-6 text-slate-800">
                  <p>{t("p1")}</p>
                  <p>{t("p2")}</p>
                  <p>{t("p3")}</p>
                  <p>{t("note")}</p>
                </div>
              </div>
            </div>
          </section>
        </main>

        <Footer />
      </div>
    </div>
  );
}
