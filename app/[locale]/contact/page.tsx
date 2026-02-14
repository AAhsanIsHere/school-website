"use client";

import { useState } from "react";
import { useTranslations } from "next-intl";

export default function ContactPage() {
  const t = useTranslations();

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
    alert(t("contact.success"));
    setForm({ name: "", email: "", subject: "", phone: "", message: "" });
  }

  return (
    <main className="bg-[color:var(--bg-main)] text-[color:var(--text-main)]">
      {/* Main section */}
      <section className="mx-auto max-w-5xl px-4 sm:px-6 lg:px-8 py-10">
        <div className="grid grid-cols-1 gap-8 md:grid-cols-12">
          {/* Left: contact info */}
          <div className="md:col-span-5">
            <h1 className="text-2xl font-semibold mb-4 text-[color:var(--text-main)]">
              {t("contact.addressTitle")}
            </h1>

            <ul className="space-y-2 text-sm text-[color:var(--text-main)]">
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

            <p className="mt-3 text-xs text-[color:var(--text-muted)]">
              {t("contact.email")} / {t("contact.phone")}
            </p>
          </div>

          {/* Right: form */}
          <div className="md:col-span-7">
            <form
              onSubmit={onSubmit}
              className="rounded-xl border p-4 shadow-sm bg-[color:var(--bg-card)] border-[color:var(--border)]"
            >
              <div className="grid grid-cols-1 gap-3">
                <input
                  className="w-full rounded border px-3 py-2 text-sm outline-none bg-[color:var(--bg-main)] text-[color:var(--text-main)] border-[color:var(--border)] focus:ring-2 focus:ring-sky-200"
                  placeholder={t("contact.name")}
                  name="name"
                  value={form.name}
                  onChange={onChange}
                  required
                />
                <input
                  className="w-full rounded border px-3 py-2 text-sm outline-none bg-[color:var(--bg-main)] text-[color:var(--text-main)] border-[color:var(--border)] focus:ring-2 focus:ring-sky-200"
                  placeholder={t("contact.email")}
                  name="email"
                  type="email"
                  value={form.email}
                  onChange={onChange}
                  required
                />
                <input
                  className="w-full rounded border px-3 py-2 text-sm outline-none bg-[color:var(--bg-main)] text-[color:var(--text-main)] border-[color:var(--border)] focus:ring-2 focus:ring-sky-200"
                  placeholder={t("contact.subject")}
                  name="subject"
                  value={form.subject}
                  onChange={onChange}
                />
                <input
                  className="w-full rounded border px-3 py-2 text-sm outline-none bg-[color:var(--bg-main)] text-[color:var(--text-main)] border-[color:var(--border)] focus:ring-2 focus:ring-sky-200"
                  placeholder={t("contact.phone")}
                  name="phone"
                  value={form.phone}
                  onChange={onChange}
                />
                <textarea
                  className="min-h-[140px] w-full rounded border px-3 py-2 text-sm outline-none bg-[color:var(--bg-main)] text-[color:var(--text-main)] border-[color:var(--border)] focus:ring-2 focus:ring-sky-200"
                  placeholder={t("contact.message")}
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
                {t("contact.submit")}
              </button>
            </form>
          </div>
        </div>
      </section>

{/* Map */}
<section className="border-t border-[color:var(--border)]">
  <div className="h-[280px] w-full">
<iframe
  title="College Location"
  className="h-full w-full map-embed"
  loading="lazy"
  referrerPolicy="no-referrer-when-downgrade"
  src="https://www.google.com/maps?q=Shahid%20Bulbul%20Govt.%20College%20Pabna&output=embed"
/>
  </div>
</section>
    </main>
  );
}
