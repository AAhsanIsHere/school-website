"use client";

import Image from "next/image";
import { useEffect, useMemo, useState } from "react";

type Slide = { id: string; src: string; alt: string };

export default function HeroImageSlider() {
  const slides: Slide[] = useMemo(
    () => [
      { id: "p1", src: "/slider/1.jpg", alt: "School photo 1" },
      { id: "p2", src: "/slider/2.png", alt: "School photo 2" },
      { id: "p3", src: "/slider/3.webp", alt: "School photo 3" },
    ],
    []
  );

  const [index, setIndex] = useState(0);
  const prev = () => setIndex((i) => (i - 1 + slides.length) % slides.length);
  const next = () => setIndex((i) => (i + 1) % slides.length);

  useEffect(() => {
    if (slides.length <= 1) return;
    const t = setInterval(() => setIndex((i) => (i + 1) % slides.length), 4500);
    return () => clearInterval(t);
  }, [slides.length]);

  const current = slides[index];

  return (
    <div
      className={[
        "overflow-hidden rounded-xl",
        "bg-[color:var(--bg-card)]",
        "shadow-[0_10px_20px_rgba(0,0,0,0.22)]",
      ].join(" ")}
    >
      <div className="relative h-44 sm:h-56 md:h-72">
        <Image
          src={current.src}
          alt={current.alt}
          fill
          priority
          className="object-cover"
        />

        {/* subtle bottom gradient for readability */}
        <div className="pointer-events-none absolute inset-x-0 bottom-0 h-20 bg-gradient-to-t from-black/40 to-transparent" />

        {/* arrows */}
        <button
          type="button"
          onClick={prev}
          className="absolute left-3 top-1/2 -translate-y-1/2 h-10 w-10 rounded-full bg-black/30 text-white hover:bg-black/40"
          aria-label="Previous photo"
        >
          ‹
        </button>

        <button
          type="button"
          onClick={next}
          className="absolute right-3 top-1/2 -translate-y-1/2 h-10 w-10 rounded-full bg-black/30 text-white hover:bg-black/40"
          aria-label="Next photo"
        >
          ›
        </button>

        {/* dots */}
        <div className="absolute bottom-3 left-0 right-0 flex justify-center gap-2">
          {slides.map((s, i) => (
            <button
              key={s.id}
              type="button"
              onClick={() => setIndex(i)}
              className={[
                "h-2.5 w-2.5 rounded-full",
                i === index ? "bg-white" : "bg-white/50 hover:bg-white/80",
              ].join(" ")}
              aria-label={`Go to photo ${i + 1}`}
            />
          ))}
        </div>
      </div>
    </div>
  );
}
