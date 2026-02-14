// app/[locale]/layout.tsx
import "../globals.css";

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
    <html lang={locale} suppressHydrationWarning>
      <body className="min-h-screen bg-[var(--bg-main)] text-[var(--text-main)]">
        <NextIntlClientProvider locale={locale} messages={messages}>
          <div className="mx-auto w-full max-w-5xl min-h-screen flex flex-col bg-[var(--bg-card)] shadow-md">
            <TopBar />
            <SiteHeader />
            <Navbar />

            <div className="flex-1">{children}</div>

            <Footer />
          </div>
        </NextIntlClientProvider>
      </body>
    </html>
  );
}
