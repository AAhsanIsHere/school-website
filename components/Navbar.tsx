"use client";

import { useState } from "react";

const links = [
  { label: "হোম", href: "#" },
  { label: "কলেজ পরিচিতি", href: "#" },
  { label: "শিক্ষক/কর্মচারী", href: "#" },
  { label: "নোটিশ", href: "#" },
  { label: "ডাউনলোড", href: "#" },
  { label: "যোগাযোগ", href: "#" },
];

export default function Navbar() {
  const [open, setOpen] = useState(false);

  return (
    <nav className="border-y bg-white">
      <div className="mx-auto max-w-5xl px-3 sm:px-4 lg:px-6 py-2 flex items-center justify-between">
        <div className="font-semibold">মেনু</div>

        <button
          className="md:hidden rounded border px-3 py-1 text-sm"
          onClick={() => setOpen(v => !v)}
          aria-expanded={open}
        >
          ☰
        </button>

        <ul className="hidden md:flex gap-4 text-sm">
          {links.map(l => (
            <li key={l.label}>
              <a className="hover:text-sky-600" href={l.href}>{l.label}</a>
            </li>
          ))}
        </ul>
      </div>

      {open && (
        <div className="md:hidden border-t bg-white">
          <ul className="mx-auto max-w-5xl px-3 sm:px-4 lg:px-6 py-2 flex flex-col gap-2 text-sm">
            {links.map(l => (
              <li key={l.label}>
                <a className="block py-1" href={l.href}>{l.label}</a>
              </li>
            ))}
          </ul>
        </div>
      )}
    </nav>
  );
}
