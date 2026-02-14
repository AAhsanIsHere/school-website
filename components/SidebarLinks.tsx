import { useTranslations } from "next-intl";

export default function SidebarLinks() {
  const t = useTranslations("sidebarLinks");

  const items = [
    { key: "l1", href: "#" },
    { key: "l2", href: "#" },
    { key: "l3", href: "#" },
    { key: "l4", href: "#" },
  ] as const;

  return (
    <div className="overflow-hidden rounded-xl bg-[color:var(--bg-card)] text-[color:var(--text-main)] shadow-sm ring-1 ring-black/5">
      <div className="bg-red-600 px-4 py-2 text-white font-semibold">
        {t("title")}
      </div>

      <ul className="divide-y divide-[color:var(--border)] text-sm">
        {items.map((it) => (
          <li key={it.key}>
            <a
              href={it.href}
              className="block px-4 py-2 text-[color:var(--text-main)] hover:bg-[color:var(--border)]/40 hover:text-sky-600 transition-colors"
            >
              {t(`items.${it.key}`)}
            </a>
          </li>
        ))}
      </ul>
    </div>
  );
}
