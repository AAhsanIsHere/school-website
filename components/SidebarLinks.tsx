const items = [
  "গুরুত্বপূর্ণ লিংক ১",
  "গুরুত্বপূর্ণ লিংক ২",
  "গুরুত্বপূর্ণ লিংক ৩",
  "গুরুত্বপূর্ণ লিংক ৪",
];

export default function SidebarLinks() {
  return (
    <div className="rounded border bg-white">
      <div className="bg-red-600 text-white px-3 py-2 font-semibold">
        গুরুত্বপূর্ণ লিংক
      </div>
      <ul className="p-3 space-y-2 text-sm">
        {items.map((t) => (
          <li key={t} className="border-b pb-2 last:border-b-0 last:pb-0">
            <a href="#" className="hover:text-sky-600">{t}</a>
          </li>
        ))}
      </ul>
    </div>
  );
}
