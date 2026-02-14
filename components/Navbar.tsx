"use client";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";

const links = [
  { label: "হোম", href: "/" },
  { label: "নোটিশ", href: "/notices" },
  { label: "ডাউনলোড", href: "/downloads" },
  { label: "যোগাযোগ", href: "/contact" },
];

export default function Navbar() {
  const [open, setOpen] = useState(false);
  const [dropdownOpen, setDropdownOpen] = useState(false); // desktop dropdown
  const [staffMenuOpen, setStaffMenuOpen] = useState(false); // mobile dropdown

  // desktop dropdown click-outside close
  const dropdownRef = useRef<HTMLLIElement | null>(null);

  useEffect(() => {
    function onDocClick(e: MouseEvent) {
      if (!dropdownRef.current) return;
      if (!dropdownRef.current.contains(e.target as Node)) {
        setDropdownOpen(false);
      }
    }
    document.addEventListener("mousedown", onDocClick);
    return () => document.removeEventListener("mousedown", onDocClick);
  }, []);

  return (
    <nav className="bg-white border-t border-b">
      <div className="mx-auto max-w-5xl px-4 sm:px-6 lg:px-8 py-2 flex items-center justify-between">
        <div className="font-semibold">মেনু</div>

        {/* Mobile toggle */}
        <button
          className="md:hidden rounded border px-3 py-1 text-sm"
          onClick={() => {
            setOpen((v) => !v);
            setStaffMenuOpen(false);
          }}
          aria-expanded={open}
        >
          ☰
        </button>

        {/* Desktop menu */}
        <ul className="hidden md:flex items-center gap-5 text-sm">
          {links.map((l) => (
            <li key={l.href}>
              <Link className="hover:text-sky-700" href={l.href}>
                {l.label}
              </Link>
            </li>
          ))}

          {/* Desktop Dropdown */}
          <li className="relative" ref={dropdownRef}>
            <button
              type="button"
              className="hover:text-sky-700 inline-flex items-center gap-1"
              aria-haspopup="menu"
              aria-expanded={dropdownOpen}
              onClick={() => setDropdownOpen((v) => !v)}
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
        <div className="md:hidden bg-white border-t">
          <div className="mx-auto max-w-5xl px-4 py-2 text-sm flex flex-col gap-2">
            {links.map((l) => (
              <Link
                key={l.href}
                className="py-1 hover:text-sky-700"
                href={l.href}
                onClick={() => setOpen(false)}
              >
                {l.label}
              </Link>
            ))}

            {/* Mobile collapsible dropdown */}
            <div className="pt-2 border-t">
              <button
                type="button"
                onClick={() => setStaffMenuOpen((v) => !v)}
                className="w-full flex items-center justify-between py-1 font-semibold"
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
