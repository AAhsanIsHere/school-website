import TopBar from "@/components/TopBar";
import SiteHeader from "@/components/SiteHeader";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

const teachers = [
  { name: "শিক্ষকের নাম ১", title: "পদবি", img: "/placeholder-person.png" },
  { name: "শিক্ষকের নাম ২", title: "পদবি", img: "/placeholder-person.png" },
  { name: "শিক্ষকের নাম ৩", title: "পদবি", img: "/placeholder-person.png" },
  { name: "শিক্ষকের নাম ৪", title: "পদবি", img: "/placeholder-person.png" },
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

export default function TeachersPage() {
  return (
    <div className="min-h-screen bg-slate-100 py-3 sm:py-6">
      <div className="mx-auto max-w-5xl overflow-hidden rounded-2xl bg-white shadow-md">
        <TopBar />
        <SiteHeader />
        <Navbar />

        <main className="bg-slate-50 px-4 py-6 sm:px-6 lg:px-8">
          <h1 className="text-2xl sm:text-3xl font-semibold mb-6">শিক্ষকবৃন্দ</h1>

          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4">
            {teachers.map((t) => (
              <PersonCard key={t.name} name={t.name} title={t.title} />
            ))}
          </div>
        </main>

        <Footer />
      </div>
    </div>
  );
}
