"use client";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";

const links = [
  { label: "হোম", href: "/" },
  { label: "ডাউনলোড", href: "/downloads" },
  { label: "যোগাযোগ", href: "/contact" },
];

export default function Navbar() {
  const [open, setOpen] = useState(false);

  const [dropdownOpen, setDropdownOpen] = useState(false); // teacher/staff desktop
  const [staffMenuOpen, setStaffMenuOpen] = useState(false); // teacher/staff mobile

  // Notice dropdown states
  const [noticeDropdownOpen, setNoticeDropdownOpen] = useState(false); // desktop
  const [noticeMenuOpen, setNoticeMenuOpen] = useState(false); // mobile

  // desktop dropdown click-outside close
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
    <nav className="bg-white shadow-sm">
      <div className="mx-auto max-w-5xl px-4 sm:px-6 lg:px-8 py-2 flex items-center justify-between">
        <div className="font-semibold">মেনু</div>

        {/* Mobile toggle */}
        <button
          className="md:hidden rounded border px-3 py-1 text-sm"
          onClick={() => {
            setOpen((v) => !v);
            setStaffMenuOpen(false);
            setNoticeMenuOpen(false);
          }}
          aria-expanded={open}
        >
          ☰
        </button>

        {/* Desktop menu */}
        <ul className="hidden md:flex items-center gap-5 text-sm">
          {/* Home */}
          <li>
            <Link className="hover:text-sky-700" href="/">
              হোম
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
              নোটিশ <span className="text-xs">▾</span>
            </button>

            {noticeDropdownOpen && (
              <div className="absolute left-0 top-full z-20 mt-2 w-52 overflow-hidden rounded-lg bg-white shadow-lg ring-1 ring-black/10">
                <Link
                  className="block px-3 py-2 text-sm hover:bg-slate-50"
                  href="/notices"
                  onClick={() => setNoticeDropdownOpen(false)}
                >
                  শিক্ষার্থীদের নোটিশ
                </Link>
                <Link
                  className="block px-3 py-2 text-sm hover:bg-slate-50"
                  href="/office-noc"
                  onClick={() => setNoticeDropdownOpen(false)}
                >
                  অফিস NOC
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
              শিক্ষক/কর্মচারী <span className="text-xs">▾</span>
            </button>

            {dropdownOpen && (
              <div className="absolute left-0 top-full z-20 mt-2 w-44 overflow-hidden rounded-lg bg-white shadow-lg ring-1 ring-black/10">
                <Link
                  className="block px-3 py-2 text-sm hover:bg-slate-50"
                  href="/principal"
                  onClick={() => setDropdownOpen(false)}
                >
                  অধ্যক্ষ
                </Link>
                <Link
                  className="block px-3 py-2 text-sm hover:bg-slate-50"
                  href="/teachers"
                  onClick={() => setDropdownOpen(false)}
                >
                  শিক্ষকবৃন্দ
                </Link>
                <Link
                  className="block px-3 py-2 text-sm hover:bg-slate-50"
                  href="/staffs"
                  onClick={() => setDropdownOpen(false)}
                >
                  কর্মচারীবৃন্দ
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
            {/* Home */}
            <Link className="py-1 hover:text-sky-700" href="/" onClick={() => setOpen(false)}>
              হোম
            </Link>

            {/* Notice collapsible dropdown (Mobile) */}
            <div className="pt-2">
              <button
                type="button"
                onClick={() => setNoticeMenuOpen((v) => !v)}
                className="w-full flex items-center justify-between py-1 font-normal"
                aria-expanded={noticeMenuOpen}
              >
                <span>নোটিশ</span>
                <span className="text-xs">{noticeMenuOpen ? "▴" : "▾"}</span>
              </button>

              {noticeMenuOpen && (
                <div className="mt-1 pl-3 flex flex-col gap-1">
                  <Link
                    className="block py-1 hover:text-sky-700"
                    href="/notices"
                    onClick={() => setOpen(false)}
                  >
                    শিক্ষার্থীদের নোটিশ
                  </Link>
                  <Link
                    className="block py-1 hover:text-sky-700"
                    href="/office-noc"
                    onClick={() => setOpen(false)}
                  >
                    অফিস NOC
                  </Link>
                </div>
              )}
            </div>

            {/* Other normal links */}
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
                <span>শিক্ষক/কর্মচারী</span>
                <span className="text-xs">{staffMenuOpen ? "▴" : "▾"}</span>
              </button>

              {staffMenuOpen && (
                <div className="mt-1 pl-3 flex flex-col gap-1">
                  <Link
                    className="block py-1 hover:text-sky-700"
                    href="/principal"
                    onClick={() => setOpen(false)}
                  >
                    অধ্যক্ষ
                  </Link>
                  <Link
                    className="block py-1 hover:text-sky-700"
                    href="/teachers"
                    onClick={() => setOpen(false)}
                  >
                    শিক্ষকবৃন্দ
                  </Link>
                  <Link
                    className="block py-1 hover:text-sky-700"
                    href="/staffs"
                    onClick={() => setOpen(false)}
                  >
                    কর্মচারীবৃন্দ
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
