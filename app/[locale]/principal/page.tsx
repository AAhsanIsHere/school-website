import Image from "next/image";
import { useTranslations } from "next-intl";

export default function PrincipalPage() {
  const t = useTranslations("principal");

  return (
    <main className="px-4 py-6 sm:px-6 lg:px-8 bg-[color:var(--bg-main)] text-[color:var(--text-main)]">
      <section className="mx-auto max-w-5xl py-2 sm:py-4">
        <div className="grid grid-cols-1 gap-6 md:grid-cols-12">
          {/* Left: photo */}
          <div className="md:col-span-5">
            <div className="overflow-hidden rounded-xl border bg-[color:var(--bg-card)] border-[color:var(--border)] shadow-sm">
              <div className="bg-[color:var(--bg-main)]">
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
          </div>

          {/* Right: text */}
          <div className="md:col-span-7">
            <div className="rounded-xl border bg-[color:var(--bg-card)] border-[color:var(--border)] p-4 sm:p-5 shadow-sm">
              <h1 className="text-xl sm:text-2xl font-bold text-[color:var(--text-main)]">
                {t("title")}
              </h1>
              <p className="mt-1 text-sm text-[color:var(--text-muted)]">
                {t("subtitle")}
              </p>

              <div className="mt-4 space-y-3 text-[13px] leading-6 text-[color:var(--text-main)]">
                <p className="text-[color:var(--text-main)]">{t("p1")}</p>
                <p className="text-[color:var(--text-main)]">{t("p2")}</p>
                <p className="text-[color:var(--text-main)]">{t("p3")}</p>

                <div className="mt-4 rounded-lg border border-[color:var(--border)] bg-[color:var(--bg-main)] p-3">
                  <p className="text-[12px] leading-5 text-[color:var(--text-muted)]">
                    {t("note")}
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}
