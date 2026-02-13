export default function Footer() {
  return (
    <footer className="mt-8 bg-gray-800 text-gray-200">
      <div className="mx-auto max-w-5xl px-3 sm:px-4 lg:px-6 py-8 grid grid-cols-1 sm:grid-cols-3 gap-6 text-sm">
        <div>
          <div className="font-semibold mb-2">কলেজ</div>
          <p className="text-gray-300">
            ঠিকানা, ফোন, ইমেইল এখানে থাকবে।
          </p>
        </div>
        <div>
          <div className="font-semibold mb-2">দ্রুত লিংক</div>
          <ul className="space-y-1 text-gray-300">
            <li><a href="#" className="hover:underline">নোটিশ</a></li>
            <li><a href="#" className="hover:underline">ডাউনলোড</a></li>
            <li><a href="#" className="hover:underline">যোগাযোগ</a></li>
          </ul>
        </div>
        <div>
          <div className="font-semibold mb-2">কপিরাইট</div>
          <p className="text-gray-300">© {new Date().getFullYear()} স্কুল ওয়েবসাইট</p>
        </div>
      </div>
    </footer>
  );
}
