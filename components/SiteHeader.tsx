export default function SiteHeader() {
  return (
    <header className="bg-white">
      <div className="mx-auto max-w-5xl px-3 sm:px-4 lg:px-6 py-4 flex items-center gap-3">
        <div className="h-12 w-12 rounded bg-gray-100 flex-shrink-0" />
        <div className="flex-1 text-center">
          <h1 className="text-lg sm:text-xl font-semibold">
            শহীদ বুলবুল সরকারি কলেজ, পাবনা
          </h1>
          <p className="text-xs sm:text-sm text-gray-600">
            অফিসিয়াল ওয়েবসাইট
          </p>
        </div>
        <div className="h-12 w-12 rounded bg-gray-100 flex-shrink-0 hidden sm:block" />
      </div>
    </header>
  );
}
