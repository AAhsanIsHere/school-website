"use client";

import { useEffect, useRef, useState } from "react";
import { Link } from "@/i18n/navigation";
import { useTranslations } from "next-intl";

export default function Navbar() {
  const t = useTranslations();

  const links = [
    { label: t("nav.home"), href: "/" },
    { label: t("nav.downloads"), href: "/downloads" },
    { label: t("nav.contact"), href: "/contact" },
  ];

  const [open, setOpen] = useState(false);

  const [dropdownOpen, setDropdownOpen] = useState(false); // staff desktop
  const [staffMenuOpen, setStaffMenuOpen] = useState(false); // staff mobile

  const [noticeDropdownOpen, setNoticeDropdownOpen] = useState(false); // notice desktop
  const [noticeMenuOpen, setNoticeMenuOpen] = useState(false); // notice mobile

  const dropdownRef = useRef<HTMLLIElement | null>(null);
  const noticeDropdownRef = useRef<HTMLLIElement | null>(null);

  useEffect(() => {
    function onDocClick(e: MouseEvent) {
      const target = e.target as Node;

      if (dropdownRef.current && !dropdownRef.current.contains(target)) {
        setDropdownOpen(false);
      }

      if (noticeDropdownRef.current && !noticeDropdownRef.current.contains(target)) {
        setNoticeDropdownOpen(false);
      }
    }

    document.addEventListener("mousedown", onDocClick);
    return () => document.removeEventListener("mousedown", onDocClick);
  }, []);

  return (
    <nav className="bg-white shadow-sm relative z-30">
      <div className="mx-auto max-w-5xl px-4 sm:px-6 lg:px-8 py-2 flex items-center justify-between">
        {/* ✅ show only on mobile */}
        <div className="font-semibold md:hidden">{t("nav.menu")}</div>

        {/* Mobile toggle */}
        <button
          className="md:hidden rounded border px-3 py-1 text-sm"
          onClick={() => {
            setOpen((v) => !v);
            setStaffMenuOpen(false);
            setNoticeMenuOpen(false);
          }}
          aria-expanded={open}
          aria-label="Toggle menu"
        >
          ☰
        </button>

        {/* Desktop menu */}
        <ul className="hidden md:flex items-center gap-5 text-sm">
          <li>
            <Link className="hover:text-sky-700" href="/">
              {t("nav.home")}
            </Link>
          </li>

          {/* Notice dropdown (Desktop) */}
          <li className="relative" ref={noticeDropdownRef}>
            <button
              type="button"
              className="hover:text-sky-700 inline-flex items-center gap-1"
              aria-haspopup="menu"
              aria-expanded={noticeDropdownOpen}
              onClick={() => {
                setNoticeDropdownOpen((v) => !v);
                setDropdownOpen(false);
              }}
            >
              {t("nav.notice")} <span className="text-xs">▾</span>
            </button>

            {noticeDropdownOpen && (
              <div className="absolute left-0 top-full z-40 mt-2 w-52 overflow-hidden rounded-lg bg-white shadow-lg ring-1 ring-black/10">
                <Link
                  className="block px-3 py-2 text-sm hover:bg-slate-50"
                  href="/notices"
                  onClick={() => setNoticeDropdownOpen(false)}
                >
                  {t("nav.notice_students")}
                </Link>
                <Link
                  className="block px-3 py-2 text-sm hover:bg-slate-50"
                  href="/office-noc"
                  onClick={() => setNoticeDropdownOpen(false)}
                >
                  {t("nav.notice_office")}
                </Link>
              </div>
            )}
          </li>

          {/* Other normal links */}
          {links
            .filter((l) => l.href !== "/")
            .map((l) => (
              <li key={l.href}>
                <Link className="hover:text-sky-700" href={l.href}>
                  {l.label}
                </Link>
              </li>
            ))}

          {/* Teacher/Staff Dropdown (Desktop) */}
          <li className="relative" ref={dropdownRef}>
            <button
              type="button"
              className="hover:text-sky-700 inline-flex items-center gap-1"
              aria-haspopup="menu"
              aria-expanded={dropdownOpen}
              onClick={() => {
                setDropdownOpen((v) => !v);
                setNoticeDropdownOpen(false);
              }}
            >
              {t("nav.staff")} <span className="text-xs">▾</span>
            </button>

            {dropdownOpen && (
              /* ✅ changed left-0 -> right-0 so it won’t clip on the right edge */
              <div className="absolute right-0 top-full z-40 mt-2 w-44 overflow-hidden rounded-lg bg-white shadow-lg ring-1 ring-black/10">
                <Link
                  className="block px-3 py-2 text-sm hover:bg-slate-50"
                  href="/principal"
                  onClick={() => setDropdownOpen(false)}
                >
                  {t("nav.principal")}
                </Link>
                <Link
                  className="block px-3 py-2 text-sm hover:bg-slate-50"
                  href="/teachers"
                  onClick={() => setDropdownOpen(false)}
                >
                  {t("nav.teachers")}
                </Link>
                <Link
                  className="block px-3 py-2 text-sm hover:bg-slate-50"
                  href="/staffs"
                  onClick={() => setDropdownOpen(false)}
                >
                  {t("nav.staffs")}
                </Link>
              </div>
            )}
          </li>
        </ul>
      </div>

      {/* Mobile menu */}
      {open && (
        <div className="md:hidden bg-white">
          <div className="mx-auto max-w-5xl px-4 py-2 text-sm flex flex-col gap-2">
            <Link className="py-1 hover:text-sky-700" href="/" onClick={() => setOpen(false)}>
              {t("nav.home")}
            </Link>

            {/* Notice collapsible dropdown (Mobile) */}
            <div className="pt-2">
              <button
                type="button"
                onClick={() => setNoticeMenuOpen((v) => !v)}
                className="w-full flex items-center justify-between py-1 font-normal"
                aria-expanded={noticeMenuOpen}
              >
                <span>{t("nav.notice")}</span>
                <span className="text-xs">{noticeMenuOpen ? "▴" : "▾"}</span>
              </button>

              {noticeMenuOpen && (
                <div className="mt-1 pl-3 flex flex-col gap-1">
                  <Link className="block py-1 hover:text-sky-700" href="/notices" onClick={() => setOpen(false)}>
                    {t("nav.notice_students")}
                  </Link>
                  <Link className="block py-1 hover:text-sky-700" href="/office-noc" onClick={() => setOpen(false)}>
                    {t("nav.notice_office")}
                  </Link>
                </div>
              )}
            </div>

            {links
              .filter((l) => l.href !== "/")
              .map((l) => (
                <Link
                  key={l.href}
                  className="py-1 hover:text-sky-700"
                  href={l.href}
                  onClick={() => setOpen(false)}
                >
                  {l.label}
                </Link>
              ))}

            {/* Teacher/Staff collapsible dropdown (Mobile) */}
            <div className="pt-2">
              <button
                type="button"
                onClick={() => setStaffMenuOpen((v) => !v)}
                className="w-full flex items-center justify-between py-1 font-normal"
                aria-expanded={staffMenuOpen}
              >
                <span>{t("nav.staff")}</span>
                <span className="text-xs">{staffMenuOpen ? "▴" : "▾"}</span>
              </button>

              {staffMenuOpen && (
                <div className="mt-1 pl-3 flex flex-col gap-1">
                  <Link className="block py-1 hover:text-sky-700" href="/principal" onClick={() => setOpen(false)}>
                    {t("nav.principal")}
                  </Link>
                  <Link className="block py-1 hover:text-sky-700" href="/teachers" onClick={() => setOpen(false)}>
                    {t("nav.teachers")}
                  </Link>
                  <Link className="block py-1 hover:text-sky-700" href="/staffs" onClick={() => setOpen(false)}>
                    {t("nav.staffs")}
                  </Link>
                </div>
              )}
            </div>
          </div>
        </div>
      )}
    </nav>
  );
}
