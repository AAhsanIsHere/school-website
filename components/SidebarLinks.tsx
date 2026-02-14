import { useTranslations } from "next-intl";

export default function SidebarLinks() {
  const t = useTranslations("sidebarLinks");

  // Keep the links as IDs so the text comes from JSON
  const items = [
    { key: "l1", href: "#" },
    { key: "l2", href: "#" },
    { key: "l3", href: "#" },
    { key: "l4", href: "#" }
  ] as const;

  return (
    <div className="overflow-hidden rounded-xl bg-white shadow-sm ring-1 ring-black/5">
      <div className="bg-red-600 px-4 py-2 text-white font-semibold">
        {t("title")}
      </div>

      <ul className="divide-y text-sm">
        {items.map((it) => (
          <li key={it.key}>
            <a
              href={it.href}
              className="block px-4 py-2 text-slate-800 hover:bg-slate-50 hover:text-sky-700"
            >
              {t(`items.${it.key}`)}
            </a>
          </li>
        ))}
      </ul>
    </div>
  );
}
