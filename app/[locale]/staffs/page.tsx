import Image from "next/image";
import { useTranslations } from "next-intl";

const staffIds = [1, 2, 3, 4];

function PersonCard({
  name,
  title,
  img,
}: {
  name: string;
  title: string;
  img: string;
}) {
  return (
    <div className="rounded-xl border p-4 text-center shadow-sm bg-[color:var(--bg-card)] border-[color:var(--border)]">
      <div className="mx-auto h-28 w-28 overflow-hidden rounded bg-[color:var(--bg-main)] border border-[color:var(--border)]">
        <Image
          src={img}
          alt={name}
          width={112}
          height={112}
          className="h-full w-full object-cover"
        />
      </div>

      <div className="mt-3 text-sm font-semibold text-[color:var(--text-main)]">
        {name}
      </div>
      <div className="text-xs text-[color:var(--text-muted)]">{title}</div>
    </div>
  );
}

export default function StaffsPage() {
  const t = useTranslations("staffsPage");

  return (
    <main className="px-4 py-6 sm:px-6 lg:px-8 bg-[color:var(--bg-main)] text-[color:var(--text-main)]">
      <section className="mx-auto max-w-5xl">
        <h1 className="mb-6 text-2xl font-semibold sm:text-3xl text-[color:var(--text-main)]">
          {t("title")}
        </h1>

        <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-4">
          {staffIds.map((n) => (
            <PersonCard
              key={n}
              name={t("placeholderName", { n })}
              title={t("placeholderTitle")}
              img="/placeholder-person.png"
            />
          ))}
        </div>
      </section>
    </main>
  );
}
