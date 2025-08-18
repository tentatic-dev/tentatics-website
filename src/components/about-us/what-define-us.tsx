"use client";

import { useTranslations } from "next-intl";
import Image from "next/image";
import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

export default function WhatDefineUs() {
  const t = useTranslations("about.what_define_us");
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    if (!sectionRef.current) return;

    const prefersReduced =
      typeof window !== "undefined" &&
      window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (prefersReduced) return;

    const ctx = gsap.context(() => {
      // card container muncul halus
      gsap.from(".wdu-card", {
        opacity: 0,
        y: 18,
        duration: 0.45,
        ease: "power1.out",
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top 80%",
          toggleActions: "play none none none",
          once: true,
        },
      });

      // heading & description fade-up pendek
      gsap.from(["#wdu-title", "#wdu-desc"], {
        opacity: 0,
        y: 10,
        duration: 0.4,
        ease: "power1.out",
        stagger: 0.08,
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top 78%",
          toggleActions: "play none none none",
          once: true,
        },
      });

      // gambar sedikit zoom-out (tanpa parallax)
      gsap.from(".wdu-image", {
        scale: 1.04,
        opacity: 0,
        duration: 0.6,
        ease: "power2.out",
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top 75%",
          toggleActions: "play none none none",
          once: true,
        },
      });
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section ref={sectionRef} className="-mt-12 md:-mt-32 relative z-20">
      <div className="container mx-auto px-5">
        <div className="wdu-card mx-auto max-w-6xl grid grid-cols-1 md:grid-cols-5 items-stretch rounded-2xl overflow-hidden bg-accent shadow-xl ring-1 ring-black/5">
          {/* Text */}
          <div className="p-6 sm:p-10 text-white md:col-span-3 flex flex-col">
            <h3 id="wdu-title" className="text-3xl sm:text-4xl font-bold mb-4">
              {t("title")}
            </h3>
            <p
              id="wdu-desc"
              className="mb-4 text-base sm:text-lg font-light leading-relaxed"
            >
              {t("desc")}
            </p>
          </div>

          {/* Image */}
          <div className="relative md:col-span-2 min-h-[220px] md:min-h-[360px]">
            <Image
              src="/about/luxury.png"
              alt="Modern house"
              fill
              sizes="(max-width: 768px) 100vw, 40vw"
              className="wdu-image object-cover"
              priority
            />
          </div>
        </div>
      </div>
    </section>
  );
}
