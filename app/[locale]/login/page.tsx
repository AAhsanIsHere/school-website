"use client";

import { useState } from "react";
import { Link, useRouter } from "@/i18n/navigation";
import { useTranslations } from "next-intl";

export default function LoginPage() {
  const t = useTranslations("login");
  const router = useRouter();

  const [emailOrUser, setEmailOrUser] = useState("");
  const [password, setPassword] = useState("");
  const [showPass, setShowPass] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  async function onSubmit(e: React.FormEvent) {
    e.preventDefault();
    setError(null);

    if (!emailOrUser.trim() || !password.trim()) {
      setError(t("errors.missingFields"));
      return;
    }

    try {
      setLoading(true);

      // TODO: Replace this with real auth (API route /api/login)
      await new Promise((r) => setTimeout(r, 500));

      // ✅ locale-safe navigation (stays inside /bn or /en automatically)
      router.push("/"); // later: "/admin"
    } catch {
      setError(t("errors.failed"));
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="bg-slate-50 py-10">
      <div className="mx-auto max-w-md px-4">
        <div className="rounded-2xl bg-white p-6 shadow-sm ring-1 ring-black/5">
          <h1 className="text-xl font-semibold">{t("title")}</h1>
          <p className="mt-1 text-sm text-slate-600">{t("subtitle")}</p>

          {error && (
            <div className="mt-4 rounded-lg border border-red-200 bg-red-50 px-3 py-2 text-sm text-red-700">
              {error}
            </div>
          )}

          <form onSubmit={onSubmit} className="mt-5 space-y-4">
            <div>
              <label className="block text-sm font-medium text-slate-700">
                {t("usernameLabel")}
              </label>
              <input
                value={emailOrUser}
                onChange={(e) => setEmailOrUser(e.target.value)}
                className="mt-1 w-full rounded-lg border px-3 py-2 text-sm outline-none focus:ring-2 focus:ring-sky-300"
                placeholder={t("usernamePlaceholder")}
                autoComplete="username"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-slate-700">
                {t("passwordLabel")}
              </label>
              <div className="mt-1 flex items-center gap-2">
                <input
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  type={showPass ? "text" : "password"}
                  className="w-full rounded-lg border px-3 py-2 text-sm outline-none focus:ring-2 focus:ring-sky-300"
                  placeholder={t("passwordPlaceholder")}
                  autoComplete="current-password"
                />
                <button
                  type="button"
                  onClick={() => setShowPass((v) => !v)}
                  className="rounded-lg border px-3 py-2 text-xs hover:bg-slate-50"
                  aria-label="Toggle password visibility"
                >
                  {showPass ? t("hide") : t("show")}
                </button>
              </div>
            </div>

            <button
              type="submit"
              disabled={loading}
              className="w-full rounded-lg bg-sky-700 px-4 py-2.5 text-sm font-semibold text-white hover:bg-sky-800 disabled:opacity-60"
            >
              {loading ? t("submitting") : t("submit")}
            </button>

            <div className="flex items-center justify-between text-xs text-slate-600">
              <Link className="hover:underline" href="/">
                {t("backHome")}
              </Link>
              <Link className="hover:underline" href="/contact">
                {t("help")}
              </Link>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
