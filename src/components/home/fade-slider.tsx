"use client";

import Image from "next/image";
import { useEffect, useMemo, useRef, useState } from "react";

type FadeSliderProps = {
  images: string[];
  intervalMs: number;
  fadeMs: number;
};

export default function FadeSlider({
  images,
  intervalMs = 5000,
  fadeMs = 800,
}: FadeSliderProps) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [nextIndex, setNextIndex] = useState(1);
  const [isTransitioning, setIsTransitioning] = useState(false);
  const timerRef = useRef<number | null>(null);

  // Preload next image
  useEffect(() => {
    const next = (currentIndex + 1) % images.length;
    const img = new window.Image();
    img.src = images[next];
  }, [currentIndex, images]);

  useEffect(() => {
    if (images.length <= 1) return;

    timerRef.current = window.setInterval(() => {
      setIsTransitioning(true);
      setNextIndex((currentIndex + 1) % images.length);

      window.setTimeout(() => {
        setCurrentIndex((currentIndex + 1) % images.length);
        setIsTransitioning(false);
      }, fadeMs);
    }, intervalMs);

    return () => {
      if (timerRef.current) window.clearInterval(timerRef.current);
    };
  }, [currentIndex, images.length, intervalMs, fadeMs]);

  const currentSrc = useMemo(
    () => images[currentIndex] ?? "",
    [images, currentIndex]
  );
  const nextSrc = useMemo(() => images[nextIndex] ?? "", [images, nextIndex]);

  return (
    <div className="relative md:absolute inset-0 h-[374px] w-full md:h-full overflow-hidden order-1 md:order-2 rounded-2xl md:rounded-none">
      <div className="absolute inset-0 bg-primary/60 z-20 hidden md:block" />
      <div
        className="relative md:absolute inset-0 z-[10] pointer-events-none "
        style={{
          backgroundImage:
            "radial-gradient(circle at center, transparent 20%, rgba(0,0,0,0.3) 80%)",
        }}
        aria-hidden="true"
      />

      {/* Current Image */}
      <Image
        key={`current-${currentSrc}`}
        src={currentSrc}
        alt="tentatics banner background"
        fill
        sizes="100vw"
        priority
        className="object-cover"
        style={{
          transition: `opacity ${fadeMs}ms ease-in-out`,
          opacity: isTransitioning ? 0 : 1,
        }}
      />

      {/* Next Image */}
      <Image
        key={`next-${nextSrc}`}
        src={nextSrc}
        alt="tentatics banner background"
        fill
        sizes="100vw"
        className="object-cover"
        style={{
          transition: `opacity ${fadeMs}ms ease-in-out`,
          opacity: isTransitioning ? 1 : 0,
        }}
      />

      {/* Indicators */}
      <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex gap-2 z-30">
        {images.map((_, i) => (
          <span
            key={i}
            className={`h-2 w-2 rounded-full transition-all duration-300 ${
              i === currentIndex
                ? "bg-white opacity-100 scale-110"
                : "bg-white/60 opacity-60"
            }`}
          />
        ))}
      </div>
    </div>
  );
}
