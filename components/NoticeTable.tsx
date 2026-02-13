const notices = [
  { date: "2026-02-13", title: "নোটিশ নমুনা ১" },
  { date: "2026-02-10", title: "নোটিশ নমুনা ২" },
  { date: "2026-02-02", title: "নোটিশ নমুনা ৩" },
];

export default function NoticeTable() {
  return (
    <div className="rounded border bg-white">
      <div className="bg-sky-600 text-white px-3 py-2 font-semibold">
        নোটিশ
      </div>

      <div className="overflow-x-auto">
        <table className="min-w-[520px] w-full text-sm">
          <thead className="bg-gray-50">
            <tr>
              <th className="text-left p-2 w-32">তারিখ</th>
              <th className="text-left p-2">বিষয়</th>
              <th className="text-left p-2 w-24">ডাউনলোড</th>
            </tr>
          </thead>
          <tbody>
            {notices.map((n) => (
              <tr key={n.title} className="border-t">
                <td className="p-2">{n.date}</td>
                <td className="p-2">{n.title}</td>
                <td className="p-2">
                  <button className="rounded bg-sky-600 px-2 py-1 text-white text-xs">
                    PDF
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <div className="p-3">
        <button className="w-full rounded bg-sky-600 py-2 text-white text-sm">
          সব নোটিশ দেখুন
        </button>
      </div>
    </div>
  );
}
