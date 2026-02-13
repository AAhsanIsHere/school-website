export default function TopBar() {
  return (
    <div className="bg-sky-700 text-white">
      <div className="mx-auto max-w-5xl px-4 sm:px-6 lg:px-8 py-1 text-xs flex items-center justify-between">
        <div className="flex items-center gap-3">
          <span>📞 01XXXXXXXXX</span>
          <span className="hidden sm:inline">|</span>
          <span className="hidden sm:inline">✉️ info@example.com</span>
        </div>

        <div className="flex items-center gap-3">
          <a className="hover:underline" href="#">
            লগইন
          </a>
          <a className="hover:underline hidden sm:inline" href="#">
            যোগাযোগ
          </a>
        </div>
      </div>
    </div>
  );
}
