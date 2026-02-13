import { notices } from "@/lib/notices";
import Link from "next/link";

export default function NoticeTable() {
  return (
    <div className="overflow-hidden rounded-xl bg-white shadow-sm ring-1 ring-black/5">
      <div className="bg-sky-700 px-4 py-2 text-white font-semibold">নোটিশ</div>

      <div className="overflow-x-auto">
        <table className="w-full text-sm">
          <thead className="bg-slate-50 text-slate-700">
            <tr className="border-b">
              <th className="p-2 text-left w-28">তারিখ</th>
              <th className="p-2 text-left">বিষয়</th>
              <th className="p-2 text-left w-20 hidden sm:table-cell">ফাইল</th>
            </tr>
          </thead>

          <tbody className="divide-y">
            {notices.map((n) => (
              <tr key={n.id} className="hover:bg-slate-50">
                <td className="p-2 whitespace-nowrap text-slate-700">{n.date}</td>

                <td className="p-2 text-slate-800">
                  <div className="flex items-center justify-between gap-2">
                    <span className="leading-snug">{n.title}</span>

                    {/* mobile badge */}
                    <span className="sm:hidden inline-flex items-center rounded bg-sky-100 px-2 py-0.5 text-xs text-sky-700">
                      PDF
                    </span>
                  </div>
                </td>

                <td className="p-2 hidden sm:table-cell">
                  <a
                    href={n.fileUrl ?? "#"}
                    className="inline-flex items-center justify-center rounded bg-sky-600 px-2 py-1 text-xs text-white hover:bg-sky-700"
                  >
                    PDF
                  </a>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <div className="p-3">
<Link
  href="/notices"
  className="block w-full rounded-lg bg-sky-700 py-2 text-center text-sm font-semibold text-white hover:bg-sky-800"
>
  সব নোটিশ দেখুন
</Link>
      </div>
    </div>
  );
}
