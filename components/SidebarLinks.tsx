const items = [
  "গুরুত্বপূর্ণ লিংক ১",
  "গুরুত্বপূর্ণ লিংক ২",
  "গুরুত্বপূর্ণ লিংক ৩",
  "গুরুত্বপূর্ণ লিংক ৪",
];

export default function SidebarLinks() {
  return (
    <div className="overflow-hidden rounded-xl bg-white shadow-sm ring-1 ring-black/5">
      <div className="bg-red-600 px-4 py-2 text-white font-semibold">
        গুরুত্বপূর্ণ লিংক
      </div>

      <ul className="divide-y text-sm">
        {items.map((t) => (
          <li key={t}>
            <a
              href="#"
              className="block px-4 py-2 text-slate-800 hover:bg-slate-50 hover:text-sky-700"
            >
              {t}
            </a>
          </li>
        ))}
      </ul>
    </div>
  );
}
