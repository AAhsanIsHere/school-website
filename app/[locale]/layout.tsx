// app/[locale]/layout.tsx
import { NextIntlClientProvider } from "next-intl";
import { getMessages, setRequestLocale } from "next-intl/server";
import { notFound } from "next/navigation";
import { routing } from "@/i18n/routing";

import TopBar from "@/components/TopBar";
import SiteHeader from "@/components/SiteHeader";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

export default async function LocaleLayout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: Promise<{ locale: string }> | { locale: string };
}) {
  const { locale } = await Promise.resolve(params);

  if (!routing.locales.includes(locale as any)) notFound();

  setRequestLocale(locale);
  const messages = await getMessages();

  return (
    <NextIntlClientProvider locale={locale} messages={messages}>
      {/* full viewport height */}
      <div className="min-h-screen bg-slate-100 p-3 sm:p-6 flex flex-col">
        {/* stretch the "site card" to full height */}
        <div className="mx-auto w-full max-w-5xl flex-1 flex flex-col bg-white shadow-md overflow-hidden md:rounded-none sm:rounded-2xl">
          <TopBar />
          <SiteHeader />
          <Navbar />

          {/* this grows and pushes footer down */}
          <div className="flex-1">{children}</div>

          <Footer />
        </div>
      </div>
    </NextIntlClientProvider>
  );
}
