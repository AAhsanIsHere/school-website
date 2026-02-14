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

  const navBg = "bg-[color:var(--bg-card)]";
  const textMain = "text-[color:var(--text-main)]";
  const borderCol = "border-[color:var(--border)]";
  const hoverBg = "hover:bg-[color:var(--border)]";
  const hoverText = "hover:text-sky-600";

  return (
    <nav className={`${navBg} ${textMain} border-b ${borderCol} relative z-30`}>
      <div className="mx-auto max-w-5xl px-4 sm:px-6 lg:px-8 py-2 flex items-center justify-between">
        {/* mobile label */}
        <div className="font-semibold md:hidden">{t("nav.menu")}</div>

        {/* Mobile toggle */}
        <button
          className={`md:hidden rounded border ${borderCol} px-3 py-1 text-sm ${hoverBg}`}
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
            <Link className={hoverText} href="/">
              {t("nav.home")}
            </Link>
          </li>

          {/* Notice dropdown (Desktop) */}
          <li className="relative" ref={noticeDropdownRef}>
            <button
              type="button"
              className={`${hoverText} inline-flex items-center gap-1`}
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
              <div
                className={`absolute left-0 top-full z-40 mt-2 w-52 overflow-hidden rounded-lg ${navBg} shadow-lg ring-1 ring-black/10`}
              >
                <Link
                  className={`block px-3 py-2 text-sm ${hoverBg}`}
                  href="/notices"
                  onClick={() => setNoticeDropdownOpen(false)}
                >
                  {t("nav.notice_students")}
                </Link>
                <Link
                  className={`block px-3 py-2 text-sm ${hoverBg}`}
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
                <Link className={hoverText} href={l.href}>
                  {l.label}
                </Link>
              </li>
            ))}

          {/* Teacher/Staff Dropdown (Desktop) */}
          <li className="relative" ref={dropdownRef}>
            <button
              type="button"
              className={`${hoverText} inline-flex items-center gap-1`}
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
              <div
                className={`absolute right-0 top-full z-40 mt-2 w-44 overflow-hidden rounded-lg ${navBg} shadow-lg ring-1 ring-black/10`}
              >
                <Link
                  className={`block px-3 py-2 text-sm ${hoverBg}`}
                  href="/principal"
                  onClick={() => setDropdownOpen(false)}
                >
                  {t("nav.principal")}
                </Link>
                <Link
                  className={`block px-3 py-2 text-sm ${hoverBg}`}
                  href="/teachers"
                  onClick={() => setDropdownOpen(false)}
                >
                  {t("nav.teachers")}
                </Link>
                <Link
                  className={`block px-3 py-2 text-sm ${hoverBg}`}
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
        <div className={`${navBg} md:hidden border-t ${borderCol}`}>
          <div className="mx-auto max-w-5xl px-4 py-2 text-sm flex flex-col gap-2">
            <Link className={hoverText} href="/" onClick={() => setOpen(false)}>
              {t("nav.home")}
            </Link>

            {/* Notice collapsible dropdown (Mobile) */}
            <div className="pt-2">
              <button
                type="button"
                onClick={() => setNoticeMenuOpen((v) => !v)}
                className={`w-full flex items-center justify-between py-1 font-normal ${hoverText}`}
                aria-expanded={noticeMenuOpen}
              >
                <span>{t("nav.notice")}</span>
                <span className="text-xs">{noticeMenuOpen ? "▴" : "▾"}</span>
              </button>

              {noticeMenuOpen && (
                <div className="mt-1 pl-3 flex flex-col gap-1">
                  <Link className={hoverText} href="/notices" onClick={() => setOpen(false)}>
                    {t("nav.notice_students")}
                  </Link>
                  <Link className={hoverText} href="/office-noc" onClick={() => setOpen(false)}>
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
                  className={hoverText}
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
                className={`w-full flex items-center justify-between py-1 font-normal ${hoverText}`}
                aria-expanded={staffMenuOpen}
              >
                <span>{t("nav.staff")}</span>
                <span className="text-xs">{staffMenuOpen ? "▴" : "▾"}</span>
              </button>

              {staffMenuOpen && (
                <div className="mt-1 pl-3 flex flex-col gap-1">
                  <Link className={hoverText} href="/principal" onClick={() => setOpen(false)}>
                    {t("nav.principal")}
                  </Link>
                  <Link className={hoverText} href="/teachers" onClick={() => setOpen(false)}>
                    {t("nav.teachers")}
                  </Link>
                  <Link className={hoverText} href="/staffs" onClick={() => setOpen(false)}>
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
