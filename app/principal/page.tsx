import Image from "next/image";

import TopBar from "@/components/TopBar";
import SiteHeader from "@/components/SiteHeader";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

export default function PrincipalPage() {
  return (
    <div className="min-h-screen bg-slate-100 py-3 sm:py-6">
      <div className="mx-auto max-w-5xl overflow-hidden rounded-2xl bg-white shadow-md">
        <TopBar />
        <SiteHeader />
        <Navbar />

        <main className="bg-white">
          <section className="mx-auto max-w-5xl px-4 sm:px-6 lg:px-8 py-8 sm:py-10">
            <div className="grid grid-cols-1 gap-6 md:grid-cols-12">
              {/* Left: photo */}
              <div className="md:col-span-5">
                <div className="relative overflow-hidden rounded-md border bg-slate-100 shadow-sm">
                  {/* Put your real image in /public/principal.jpg */}
                  <Image
                    src="/principal.jpg"
                    alt="অধ্যক্ষ"
                    width={800}
                    height={600}
                    className="h-auto w-full object-cover"
                    priority
                  />
                </div>
              </div>

              {/* Right: text */}
              <div className="md:col-span-7">
                <h1 className="text-xl sm:text-2xl font-bold text-slate-900">
                  অধ্যক্ষ মহোদয়
                </h1>
                <p className="mt-1 text-sm text-slate-600">
                  শহীদ বুলবুল সরকারি কলেজ, পাবনা
                </p>

                <div className="mt-4 space-y-3 text-[13px] leading-6 text-slate-800">
                  <p>
                    এখানে অধ্যক্ষের পরিচিতি/বার্তা লিখবেন। এই অংশটি আপনি আপনার কলেজের
                    ওয়েবসাইটের মতো করে কপি করে বসাতে পারবেন।
                  </p>
                  <p>
                    উদাহরণ: অধ্যক্ষ হিসেবে দায়িত্ব গ্রহণের তারিখ, শিক্ষা উন্নয়নমূলক কাজ,
                    কলেজের লক্ষ্য-উদ্দেশ্য, শিক্ষার্থীদের প্রতি বার্তা ইত্যাদি।
                  </p>
                  <p>
                    আপনি চাইলে এই লেখা ২–৩টা অনুচ্ছেদে ভাগ করে দিতে পারেন, যেমন ছবির
                    ডান পাশে দেখা যাচ্ছে।
                  </p>
                  <p>
                    (নোট: আমি এখন placeholder টেক্সট দিলাম—আপনি আপনার আসল লেখা এখানে
                    বসিয়ে দিবেন।)
                  </p>
                </div>
              </div>
            </div>
          </section>
        </main>

        <Footer />
      </div>
    </div>
  );
}
