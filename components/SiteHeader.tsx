import Image from "next/image";

export default function SiteHeader() {
  return (
    <header className="bg-white">
      <div className="mx-auto max-w-5xl px-4 sm:px-6 lg:px-8 py-4">
        <div className="grid grid-cols-12 items-center gap-2">
          {/* Left logo */}
          <div className="col-span-3 sm:col-span-2 flex items-center justify-start">
            <div className="relative h-12 w-12 sm:h-14 sm:w-14">
              <Image
                src="/logo-left.png"
                alt="কলেজ লোগো"
                fill
                className="object-contain"
                priority
              />
            </div>
          </div>

          {/* Title */}
          <div className="col-span-6 sm:col-span-8 text-center">
            <h1 className="text-lg sm:text-2xl font-semibold leading-snug">
              শহীদ বুলবুল সরকারি কলেজ, পাবনা
            </h1>
            <p className="mt-1 text-xs sm:text-sm text-gray-600">
              অফিসিয়াল ওয়েবসাইট
            </p>
          </div>

          {/* Right logo */}
          <div className="col-span-3 sm:col-span-2 flex items-center justify-end">
            <div className="relative h-12 w-12 sm:h-14 sm:w-14">
              <div className="h-full w-full rounded bg-gray-100" />
              {/* Later replace with:
              <Image src="/logo-right.png" alt="Logo" fill className="object-contain" />
              */}
            </div>
          </div>
        </div>
      </div>
    </header>
  );
}
