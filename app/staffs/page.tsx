import TopBar from "@/components/TopBar";
import SiteHeader from "@/components/SiteHeader";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

const staffs = [
  { name: "কর্মচারীর নাম ১", title: "পদবি", img: "/placeholder-person.png" },
  { name: "কর্মচারীর নাম ২", title: "পদবি", img: "/placeholder-person.png" },
  { name: "কর্মচারীর নাম ৩", title: "পদবি", img: "/placeholder-person.png" },
  { name: "কর্মচারীর নাম ৪", title: "পদবি", img: "/placeholder-person.png" },
];

function PersonCard({ name, title }: { name: string; title: string }) {
  return (
    <div className="rounded-xl bg-white shadow-sm ring-1 ring-black/5 p-4 text-center">
      <div className="mx-auto h-28 w-28 rounded bg-slate-100" />
      <div className="mt-3 font-semibold text-sm">{name}</div>
      <div className="text-xs text-slate-600">{title}</div>
    </div>
  );
}

export default function StaffsPage() {
  return (
    <div className="min-h-screen bg-slate-100 py-3 sm:py-6">
      <div className="mx-auto max-w-5xl overflow-hidden rounded-2xl bg-white shadow-md">
        <TopBar />
        <SiteHeader />
        <Navbar />

        <main className="bg-slate-50 px-4 py-6 sm:px-6 lg:px-8">
          <h1 className="text-2xl sm:text-3xl font-semibold mb-6">কর্মচারীবৃন্দ</h1>

          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4">
            {staffs.map((s) => (
              <PersonCard key={s.name} name={s.name} title={s.title} />
            ))}
          </div>
        </main>

        <Footer />
      </div>
    </div>
  );
}
