"use client";

import { useEffect, useRef, useState } from "react";
import { Link, usePathname } from "@/i18n/navigation";
import { useTranslations } from "next-intl";

export default function Navbar() {
  const t = useTranslations();
  const pathname = usePathname();

  const [open, setOpen] = useState(false);

  // Desktop dropdowns
  const [noticeDropdownOpen, setNoticeDropdownOpen] = useState(false);
  const [staffDropdownOpen, setStaffDropdownOpen] = useState(false);

  // Mobile collapsibles
  const [noticeMenuOpen, setNoticeMenuOpen] = useState(false);
  const [staffMenuOpen, setStaffMenuOpen] = useState(false);

  const noticeDropdownRef = useRef<HTMLLIElement | null>(null);
  const staffDropdownRef = useRef<HTMLLIElement | null>(null);

  // Close desktop dropdowns on outside click
  useEffect(() => {
    function onDocClick(e: MouseEvent) {
      const target = e.target as Node;
      if (noticeDropdownRef.current && !noticeDropdownRef.current.contains(target)) {
        setNoticeDropdownOpen(false);
      }
      if (staffDropdownRef.current && !staffDropdownRef.current.contains(target)) {
        setStaffDropdownOpen(false);
      }
    }
    document.addEventListener("mousedown", onDocClick);
    return () => document.removeEventListener("mousedown", onDocClick);
  }, []);

  // Close mobile menu when route changes
  useEffect(() => {
    setOpen(false);
    setNoticeMenuOpen(false);
    setStaffMenuOpen(false);
    setNoticeDropdownOpen(false);
    setStaffDropdownOpen(false);
  }, [pathname]);

  const navBg = "bg-[color:var(--bg-card)]";
  const textMain = "text-[color:var(--text-main)]";
  const textMuted = "text-[color:var(--text-muted)]";
  const borderCol = "border-[color:var(--border)]";

  const linkBase =
    "px-2 py-1 rounded-md transition-colors hover:bg-[color:var(--bg-main)] hover:text-sky-600";
  const dropdownItem =
    "block px-3 py-2 text-sm transition-colors hover:bg-[color:var(--bg-main)]";

  const isActive = (href: string) => {
    // pathname looks like "/bn/notices" or "/en/notices"
    // so we check `endsWith` for simple matching
    return pathname === href || pathname.endsWith(href);
  };

  const activeCls = "text-sky-600";

  return (
    <nav className={`${navBg} ${textMain} border-y ${borderCol} shadow-[var(--shadow-card)] relative z-30`}>
      <div className="mx-auto max-w-5xl px-4 sm:px-6 lg:px-8">
        <div className="h-12 flex items-center justify-between">
          {/* Left: mobile label */}
          <div className="md:hidden font-semibold">{t("nav.menu")}</div>

          {/* Mobile toggle */}
          <button
            type="button"
            className={`md:hidden rounded-md border ${borderCol} px-3 py-1 text-sm hover:bg-[color:var(--bg-main)]`}
            onClick={() => {
              setOpen((v) => !v);
              setNoticeMenuOpen(false);
              setStaffMenuOpen(false);
            }}
            aria-expanded={open}
            aria-label="Toggle menu"
          >
            ☰
          </button>

          {/* Desktop menu */}
          <ul className="hidden md:flex items-center gap-2 text-sm">
            <li>
              <Link className={`${linkBase} ${isActive("/") ? activeCls : ""}`} href="/">
                {t("nav.home")}
              </Link>
            </li>

            {/* Notice dropdown */}
            <li className="relative" ref={noticeDropdownRef}>
              <button
                type="button"
                className={`${linkBase} inline-flex items-center gap-1 ${isActive("/notices") || isActive("/office-noc") ? activeCls : ""}`}
                aria-haspopup="menu"
                aria-expanded={noticeDropdownOpen}
                onClick={() => {
                  setNoticeDropdownOpen((v) => !v);
                  setStaffDropdownOpen(false);
                }}
              >
                {t("nav.notice")} <span className="text-xs">▾</span>
              </button>

              {noticeDropdownOpen && (
                <div
                  className={`absolute left-0 top-full mt-2 w-56 overflow-hidden rounded-lg ${navBg} border ${borderCol} shadow-[var(--shadow-card)]`}
                >
                  <Link className={dropdownItem} href="/notices">
                    {t("nav.notice_students")}
                  </Link>
                  <Link className={dropdownItem} href="/office-noc">
                    {t("nav.notice_office")}
                  </Link>
                </div>
              )}
            </li>

            <li>
              <Link className={`${linkBase} ${isActive("/downloads") ? activeCls : ""}`} href="/downloads">
                {t("nav.downloads")}
              </Link>
            </li>

            <li>
              <Link className={`${linkBase} ${isActive("/contact") ? activeCls : ""}`} href="/contact">
                {t("nav.contact")}
              </Link>
            </li>

            {/* Staff dropdown */}
            <li className="relative" ref={staffDropdownRef}>
              <button
                type="button"
                className={`${linkBase} inline-flex items-center gap-1 ${
                  isActive("/principal") || isActive("/teachers") || isActive("/staffs") ? activeCls : ""
                }`}
                aria-haspopup="menu"
                aria-expanded={staffDropdownOpen}
                onClick={() => {
                  setStaffDropdownOpen((v) => !v);
                  setNoticeDropdownOpen(false);
                }}
              >
                {t("nav.staff")} <span className="text-xs">▾</span>
              </button>

              {staffDropdownOpen && (
                <div
                  className={`absolute right-0 top-full mt-2 w-48 overflow-hidden rounded-lg ${navBg} border ${borderCol} shadow-[var(--shadow-card)]`}
                >
                  <Link className={dropdownItem} href="/principal">
                    {t("nav.principal")}
                  </Link>
                  <Link className={dropdownItem} href="/teachers">
                    {t("nav.teachers")}
                  </Link>
                  <Link className={dropdownItem} href="/staffs">
                    {t("nav.staffs")}
                  </Link>
                </div>
              )}
            </li>
          </ul>
        </div>

        {/* Mobile menu */}
        {open && (
          <div className={`md:hidden border-t ${borderCol} py-3`}>
            <div className="flex flex-col gap-2 text-sm">
              <Link className={`${linkBase} ${isActive("/") ? activeCls : ""}`} href="/">
                {t("nav.home")}
              </Link>

              {/* Notice collapsible */}
              <div className="pt-1">
                <button
                  type="button"
                  onClick={() => setNoticeMenuOpen((v) => !v)}
                  className={`w-full flex items-center justify-between ${linkBase} ${textMuted}`}
                  aria-expanded={noticeMenuOpen}
                >
                  <span className="text-[color:var(--text-main)]">{t("nav.notice")}</span>
                  <span className="text-xs">{noticeMenuOpen ? "▴" : "▾"}</span>
                </button>

                {noticeMenuOpen && (
                  <div className="mt-1 ml-3 flex flex-col gap-1">
                    <Link className={linkBase} href="/notices">
                      {t("nav.notice_students")}
                    </Link>
                    <Link className={linkBase} href="/office-noc">
                      {t("nav.notice_office")}
                    </Link>
                  </div>
                )}
              </div>

              <Link className={`${linkBase} ${isActive("/downloads") ? activeCls : ""}`} href="/downloads">
                {t("nav.downloads")}
              </Link>

              <Link className={`${linkBase} ${isActive("/contact") ? activeCls : ""}`} href="/contact">
                {t("nav.contact")}
              </Link>

              {/* Staff collapsible */}
              <div className="pt-1">
                <button
                  type="button"
                  onClick={() => setStaffMenuOpen((v) => !v)}
                  className={`w-full flex items-center justify-between ${linkBase} ${textMuted}`}
                  aria-expanded={staffMenuOpen}
                >
                  <span className="text-[color:var(--text-main)]">{t("nav.staff")}</span>
                  <span className="text-xs">{staffMenuOpen ? "▴" : "▾"}</span>
                </button>

                {staffMenuOpen && (
                  <div className="mt-1 ml-3 flex flex-col gap-1">
                    <Link className={linkBase} href="/principal">
                      {t("nav.principal")}
                    </Link>
                    <Link className={linkBase} href="/teachers">
                      {t("nav.teachers")}
                    </Link>
                    <Link className={linkBase} href="/staffs">
                      {t("nav.staffs")}
                    </Link>
                  </div>
                )}
              </div>
            </div>
          </div>
        )}
      </div>
    </nav>
  );
}
