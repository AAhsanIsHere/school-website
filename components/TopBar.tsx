export default function TopBar() {
  return (
    <div className="bg-sky-600 text-white">
      <div className="mx-auto max-w-5xl px-3 sm:px-4 lg:px-6 py-1 text-xs flex items-center justify-between">
        <div className="truncate">
          📞 01XXXXXXXXX &nbsp; ✉️ info@example.com
        </div>
        <div className="hidden sm:flex gap-3">
          <a className="hover:underline" href="#">লগইন</a>
          <a className="hover:underline" href="#">যোগাযোগ</a>
        </div>
      </div>
    </div>
  );
}
