"use client";

import { useState } from "react";
import { Link } from "@/i18n/navigation";
import { useRouter } from "next/navigation";

export default function LoginPage() {
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
      setError("ইউজারনেম/ইমেইল এবং পাসওয়ার্ড দিন।");
      return;
    }

    try {
      setLoading(true);

      // TODO: Replace this with real auth (API route /api/login)
      // Example later:
      // const res = await fetch("/api/login", { method: "POST", body: JSON.stringify({ emailOrUser, password }) })

      // Temporary demo: just redirect after "login"
      await new Promise((r) => setTimeout(r, 500));
      router.push("/"); // change to "/admin" if you have an admin dashboard
    } catch {
      setError("লগইন ব্যর্থ হয়েছে। আবার চেষ্টা করুন।");
    } finally {
      setLoading(false);
    }
  }

  return (
    <main className="min-h-[70vh] bg-slate-50">
      <div className="mx-auto max-w-5xl px-4 sm:px-6 lg:px-8 py-10">
        <div className="mx-auto max-w-md rounded-2xl bg-white shadow-sm ring-1 ring-black/5 p-6">
          <h1 className="text-xl font-semibold">লগইন</h1>
          <p className="mt-1 text-sm text-slate-600">
            অ্যাডমিন/অফিস ব্যবহারকারীদের জন্য।
          </p>

          {error && (
            <div className="mt-4 rounded-lg border border-red-200 bg-red-50 px-3 py-2 text-sm text-red-700">
              {error}
            </div>
          )}

          <form onSubmit={onSubmit} className="mt-5 space-y-4">
            <div>
              <label className="block text-sm font-medium text-slate-700">
                ইউজারনেম / ইমেইল
              </label>
              <input
                value={emailOrUser}
                onChange={(e) => setEmailOrUser(e.target.value)}
                className="mt-1 w-full rounded-lg border px-3 py-2 text-sm outline-none focus:ring-2 focus:ring-sky-300"
                placeholder="admin@example.com"
                autoComplete="username"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-slate-700">
                পাসওয়ার্ড
              </label>
              <div className="mt-1 flex items-center gap-2">
                <input
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  type={showPass ? "text" : "password"}
                  className="w-full rounded-lg border px-3 py-2 text-sm outline-none focus:ring-2 focus:ring-sky-300"
                  placeholder="••••••••"
                  autoComplete="current-password"
                />
                <button
                  type="button"
                  onClick={() => setShowPass((v) => !v)}
                  className="rounded-lg border px-3 py-2 text-xs hover:bg-slate-50"
                  aria-label="Toggle password visibility"
                >
                  {showPass ? "Hide" : "Show"}
                </button>
              </div>
            </div>

            <button
              type="submit"
              disabled={loading}
              className="w-full rounded-lg bg-sky-700 px-4 py-2.5 text-sm font-semibold text-white hover:bg-sky-800 disabled:opacity-60"
            >
              {loading ? "লগইন হচ্ছে..." : "লগইন করুন"}
            </button>

            <div className="flex items-center justify-between text-xs text-slate-600">
              <Link className="hover:underline" href="/">
                ← হোমে ফিরে যান
              </Link>
              <Link className="hover:underline" href="/contact">
                সাহায্য/যোগাযোগ
              </Link>
            </div>
          </form>
        </div>
      </div>
    </main>
  );
}
