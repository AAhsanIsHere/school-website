"use client";

import { useState } from "react";

import TopBar from "@/components/TopBar";
import SiteHeader from "@/components/SiteHeader";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

export default function ContactPage() {
  const [form, setForm] = useState({
    name: "",
    email: "",
    subject: "",
    phone: "",
    message: "",
  });

  function onChange(
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) {
    setForm((p) => ({ ...p, [e.target.name]: e.target.value }));
  }

  function onSubmit(e: React.FormEvent) {
    e.preventDefault();
    // For school project: just show a message. Later you can connect to email/API.
    alert("ধন্যবাদ! আপনার বার্তা গ্রহণ করা হয়েছে।");
    setForm({ name: "", email: "", subject: "", phone: "", message: "" });
  }

  return (
    <div className="min-h-screen bg-slate-100 py-3 sm:py-6">
      <div className="mx-auto max-w-5xl overflow-hidden rounded-2xl bg-white shadow-md">
        <TopBar />
        <SiteHeader />
        <Navbar />

        <main className="bg-white">
          {/* Main section */}
          <section className="mx-auto max-w-5xl px-4 sm:px-6 lg:px-8 py-10">
            <div className="grid grid-cols-1 gap-8 md:grid-cols-12">
              {/* Left: contact info */}
              <div className="md:col-span-5">
                <h1 className="text-2xl font-semibold mb-4">ঠিকানা</h1>

                <ul className="space-y-2 text-sm text-slate-800">
                  <li className="flex gap-2">
                    <span className="mt-0.5">📍</span>
                    <span>পাবনা সদর রোড, পাবনা, বাংলাদেশ</span>
                  </li>
                  <li className="flex gap-2">
                    <span className="mt-0.5">📞</span>
                    <span>025888-46280</span>
                  </li>
                  <li className="flex gap-2">
                    <span className="mt-0.5">✉️</span>
                    <span>sbgc.govcollege@gmail.com</span>
                  </li>
                </ul>
              </div>

              {/* Right: form */}
              <div className="md:col-span-7">
                <form
                  onSubmit={onSubmit}
                  className="rounded-xl border bg-white p-4 shadow-sm ring-1 ring-black/5"
                >
                  <div className="grid grid-cols-1 gap-3">
                    <input
                      className="w-full rounded border px-3 py-2 text-sm outline-none focus:ring-2 focus:ring-sky-200"
                      placeholder="নাম"
                      name="name"
                      value={form.name}
                      onChange={onChange}
                      required
                    />
                    <input
                      className="w-full rounded border px-3 py-2 text-sm outline-none focus:ring-2 focus:ring-sky-200"
                      placeholder="ইমেইল"
                      name="email"
                      type="email"
                      value={form.email}
                      onChange={onChange}
                      required
                    />
                    <input
                      className="w-full rounded border px-3 py-2 text-sm outline-none focus:ring-2 focus:ring-sky-200"
                      placeholder="বিষয়"
                      name="subject"
                      value={form.subject}
                      onChange={onChange}
                    />
                    <input
                      className="w-full rounded border px-3 py-2 text-sm outline-none focus:ring-2 focus:ring-sky-200"
                      placeholder="ফোন"
                      name="phone"
                      value={form.phone}
                      onChange={onChange}
                    />
                    <textarea
                      className="min-h-[140px] w-full rounded border px-3 py-2 text-sm outline-none focus:ring-2 focus:ring-sky-200"
                      placeholder="বার্তা"
                      name="message"
                      value={form.message}
                      onChange={onChange}
                      required
                    />
                  </div>

                  <button
                    type="submit"
                    className="mt-3 rounded bg-sky-600 px-4 py-2 text-sm font-semibold text-white hover:bg-sky-700"
                  >
                    Submit
                  </button>
                </form>
              </div>
            </div>
          </section>

          {/* Map (like screenshot) */}
          <section className="border-t">
            <div className="h-[280px] w-full">
              <iframe
                title="College Location"
                className="h-full w-full"
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
                src="https://www.google.com/maps?q=Shahid%20Bulbul%20Govt.%20College%20Pabna&output=embed"
              />
            </div>
          </section>
        </main>

        <Footer />
      </div>
    </div>
  );
}
