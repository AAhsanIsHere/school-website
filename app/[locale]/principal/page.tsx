import Image from "next/image";
import { useTranslations } from "next-intl";

export default function PrincipalPage() {
  const t = useTranslations("principal");

  return (
    <main className="bg-white px-4 py-6 sm:px-6 lg:px-8">
      <section className="mx-auto max-w-5xl py-2 sm:py-4">
        <div className="grid grid-cols-1 gap-6 md:grid-cols-12">
          {/* Left: photo */}
          <div className="md:col-span-5">
            <div className="overflow-hidden rounded-xl bg-slate-100 ring-1 ring-black/5">
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
  );
}
