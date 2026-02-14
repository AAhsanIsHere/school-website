import Image from "next/image";
import { useTranslations } from "next-intl";

const teacherIds = [1, 2, 3, 4];

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
    <div className="rounded-xl bg-white shadow-sm ring-1 ring-black/5 p-4 text-center">
      <div className="mx-auto h-28 w-28 overflow-hidden rounded bg-slate-100">
        <Image
          src={img}
          alt={name}
          width={112}
          height={112}
          className="h-full w-full object-cover"
        />
      </div>

      <div className="mt-3 text-sm font-semibold">{name}</div>
      <div className="text-xs text-slate-600">{title}</div>
    </div>
  );
}

export default function TeachersPage() {
  const t = useTranslations("teachersPage");

  return (
    <main className="bg-slate-50 px-4 py-6 sm:px-6 lg:px-8">
      <section className="mx-auto max-w-5xl">
        <h1 className="mb-6 text-2xl font-semibold sm:text-3xl">{t("title")}</h1>

        <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-4">
          {teacherIds.map((n) => (
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
