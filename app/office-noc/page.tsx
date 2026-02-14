"use client";

import { useMemo, useState } from "react";
import Link from "next/link";

import TopBar from "@/components/TopBar";
import SiteHeader from "@/components/SiteHeader";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

import { officeNocs as allNotices, type Notice } from "@/lib/notices";

function formatDateShort(iso: string) {
  const d = new Date(iso + "T00:00:00");
  return d.toLocaleDateString("en-GB", {
    day: "2-digit",
    month: "short",
    year: "2-digit",
  });
}

function RowMenu({ fileUrl }: { fileUrl?: string }) {
  const [open, setOpen] = useState(false);

  return (
    <div className="relative inline-block">
      <button
        type="button"
        onClick={() => setOpen((v) => !v)}
        className="rounded bg-slate-100 px-2 py-1 text-sm hover:bg-slate-200"
        aria-expanded={open}
        aria-haspopup="menu"
      >
        ⋮
      </button>

      {open && (
        <>
          <button
            type="button"
            className="fixed inset-0 cursor-default"
            onClick={() => setOpen(false)}
            aria-label="Close"
          />

          <div
            className="absolute right-0 z-10 mt-2 w-44 overflow-hidden rounded-lg bg-white shadow-lg ring-1 ring-black/10"
            role="menu"
          >
            <a
              href={fileUrl ?? "#"}
              className="block px-3 py-2 text-sm hover:bg-slate-50"
              role="menuitem"
              onClick={() => setOpen(false)}
            >
              PDF ডাউনলোড
            </a>
          </div>
        </>
      )}
    </div>
  );
}

export default function OfficeNocPage() {
  const sorted = useMemo(
    () => [...allNotices].sort((a, b) => (a.date < b.date ? 1 : -1)),
    []
  );

  return (
    <div className="min-h-screen bg-slate-100 py-3 sm:py-6">
      <div className="mx-auto max-w-5xl overflow-hidden rounded-2xl bg-white shadow-md">
        <TopBar />
        <SiteHeader />
        <Navbar />

        <main className="bg-slate-50 px-4 py-6 sm:px-6 lg:px-8">
          <div className="py-4">
            <h1 className="text-2xl sm:text-3xl font-semibold">অফিস NOC</h1>
          </div>

          <div className="overflow-hidden rounded-xl bg-white shadow-sm ring-1 ring-black/5">
            <div className="bg-sky-600 px-4 py-2 text-white font-semibold">
              অফিস NOC তালিকা
            </div>

            {/* Mobile */}
            <div className="sm:hidden divide-y">
              {sorted.map((n: Notice, idx: number) => (
                <div
                  key={n.id}
                  className="flex items-start justify-between gap-3 p-3"
                >
                  <div className="min-w-0">
                    <div className="text-xs text-slate-600">
                      {idx + 1}. {formatDateShort(n.date)}
                    </div>
                    <div className="mt-1 font-medium text-slate-900 leading-snug">
                      {n.title}
                    </div>
                  </div>
                  <RowMenu fileUrl={n.fileUrl} />
                </div>
              ))}

              {sorted.length === 0 && (
                <div className="p-6 text-center text-slate-600">
                  কোনো অফিস NOC পাওয়া যায়নি।
                </div>
              )}
            </div>

            {/* Desktop */}
            <div className="hidden sm:block overflow-x-auto">
              <table className="w-full text-sm">
                <thead className="bg-slate-50 text-slate-700">
                  <tr className="border-b">
                    <th className="p-2 text-center w-16">ক্রমিক</th>
                    <th className="p-2 text-left w-28">তারিখ</th>
                    <th className="p-2 text-left min-w-[240px]">শিরোনাম</th>
                    <th className="p-2 text-center w-28">ডাউনলোড</th>
                  </tr>
                </thead>

                <tbody className="divide-y">
                  {sorted.map((n: Notice, idx: number) => (
                    <tr key={n.id} className="hover:bg-slate-50">
                      <td className="p-2 text-center text-slate-700">
                        {idx + 1}
                      </td>
                      <td className="p-2 text-slate-700 whitespace-nowrap">
                        {formatDateShort(n.date)}
                      </td>
                      <td className="p-2 text-slate-900">{n.title}</td>
                      <td className="p-2 text-center">
                        <a
                          href={n.fileUrl ?? "#"}
                          className="inline-flex items-center justify-center rounded bg-red-600 px-2 py-1 text-[11px] font-bold text-white hover:bg-red-700"
                        >
                          PDF
                        </a>
                      </td>
                    </tr>
                  ))}

                  {sorted.length === 0 && (
                    <tr>
                      <td className="p-6 text-center text-slate-600" colSpan={4}>
                        কোনো অফিস NOC পাওয়া যায়নি।
                      </td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>
          </div>

          <div className="mt-4">
            <Link className="text-sm text-sky-700 hover:underline" href="/">
              ← হোমে ফিরে যান
            </Link>
          </div>
        </main>

        <Footer />
      </div>
    </div>
  );
}
