export default function HeroSlider() {
  return (
    <div className="overflow-hidden rounded-xl bg-white shadow-sm ring-1 ring-black/5">
      <div className="relative h-44 sm:h-56 md:h-72 bg-gradient-to-r from-sky-700 to-indigo-700">
        <div className="absolute inset-0 opacity-20 bg-[radial-gradient(circle_at_20%_20%,white,transparent_50%)]" />

        <div className="absolute inset-0 flex items-center justify-center">
          <div className="text-center text-white">
            <div className="text-lg sm:text-2xl font-semibold">Slider Area</div>
            <div className="text-xs sm:text-sm opacity-90">Replace with images later</div>
          </div>
        </div>

        {/* fake arrows */}
        <button className="absolute left-2 top-1/2 -translate-y-1/2 rounded-full bg-white/20 px-3 py-2 text-white hover:bg-white/30">
          ‹
        </button>
        <button className="absolute right-2 top-1/2 -translate-y-1/2 rounded-full bg-white/20 px-3 py-2 text-white hover:bg-white/30">
          ›
        </button>

        {/* fake dots */}
        <div className="absolute bottom-2 left-1/2 -translate-x-1/2 flex gap-2">
          <span className="h-2 w-2 rounded-full bg-white" />
          <span className="h-2 w-2 rounded-full bg-white/50" />
          <span className="h-2 w-2 rounded-full bg-white/50" />
        </div>
      </div>
    </div>
  );
}
