// src/components/about-us/what-define-us.tsx
import Image from "next/image";

export default function WhatDefineUs() {
  return (
    // Tarik sedikit ke atas supaya “nyelip” rapi setelah Introducing
    <section className="-mt-12 md:-mt-32 relative z-20">
      <div className="container mx-auto px-5">
        <div className="mx-auto max-w-6xl grid grid-cols-1 md:grid-cols-5 items-stretch rounded-2xl overflow-hidden bg-accent shadow-xl ring-1 ring-black/5">
          {/* Text */}
          <div className="p-6 sm:p-10 text-white md:col-span-3 flex flex-col">
            <h3 className="text-3xl sm:text-4xl font-bold mb-4">
              What Defines us
            </h3>
            <p className="mb-4 text-base sm:text-lg font-light leading-relaxed">
              At Tentatics, we believe that every property is more than just
              real estate it’s a key business asset. That’s why we empower real
              estate professionals and enterprises with clarity, efficiency, and
              cutting-edge digital tools. By combining powerful technology with
              a deep understanding of industry needs, we help our clients sell
              faster, manage smarter, and grow stronger.
            </p>
          </div>

          {/* Image */}
          <div className="relative md:col-span-2 min-h-[220px] md:min-h-[360px]">
            <Image
              src="/about/luxury.png"
              alt="Modern house"
              fill
              sizes="(max-width: 768px) 100vw, 40vw"
              className="object-cover"
              priority
            />
          </div>
        </div>
      </div>
    </section>
  );
}
