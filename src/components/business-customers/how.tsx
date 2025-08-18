"use client";

import Image from "next/image";
import { useTranslations } from "next-intl";
import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

export default function How() {
  const t = useTranslations("business_customers.how");

  const step = (
    t.raw("steps") as Array<{
      number: number;
      title: string;
      desc: string;
    }>
  ).slice(0, 3);

  const positions: Array<{
    left: string;
    top: string;
    align: "left" | "right";
  }> = [
    { left: "25%", top: "100%", align: "right" },
    { left: "53%", top: "70%", align: "left" },
    { left: "81%", top: "20%", align: "left" },
  ];

  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    if (!sectionRef.current) return;

    const ctx = gsap.context(() => {
      // Heading & desc
      gsap.from(["#discover-heading", "#discover-desc"], {
        opacity: 0,
        y: 24,
        duration: 0.8,
        stagger: 0.15,
        ease: "power2.out",
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top 75%",
          toggleActions: "play none none reverse",
        },
      });

      // Desktop: nodes, badges, text boxes stagger bareng
      const desktopItems = gsap.utils.toArray<HTMLElement>(".how-desktop-item");
      gsap.from(desktopItems, {
        opacity: 0,
        y: 40,
        scale: 0.96,
        duration: 0.7,
        ease: "power2.out",
        stagger: 0.15,
        scrollTrigger: {
          trigger: ".how-desktop",
          start: "top 70%",
          toggleActions: "play none none reverse",
        },
      });

      // Parallax halus untuk angka besar (desktop & mobile)
      gsap.utils.toArray<HTMLElement>(".how-number").forEach((el) => {
        gsap.to(el, {
          yPercent: -15,
          ease: "none",
          scrollTrigger: {
            trigger: el,
            start: "top bottom",
            end: "bottom top",
            scrub: true,
          },
        });
      });

      // Mobile: tiap item animate saat masuk viewport
      gsap.utils.toArray<HTMLElement>(".how-mobile-item").forEach((item, i) => {
        gsap.from(item, {
          opacity: 0,
          y: 28,
          duration: 0.6,
          delay: i * 0.05, // sedikit delay biar berasa cascade
          ease: "power2.out",
          scrollTrigger: {
            trigger: item,
            start: "top 85%",
            toggleActions: "play none none reverse",
          },
        });
      });
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section id="how" ref={sectionRef} className="py-16 container">
      <div>
        <h2
          id="discover-heading"
          className="text-3xl sm:text-4xl font-bold max-w-sm"
        >
          {t("title")}
        </h2>
        <p id="discover-desc" className="text-base sm:text-lg mt-4 text-accent">
          {t("desc")}
        </p>
      </div>

      {/* Desktop / Large */}
      <div className="relative mt-10 hidden h-[520px] lg:block how-desktop">
        <Image
          src="/business_customers/line.svg"
          height={500}
          width={1100}
          alt="line_how"
          className="w-[1100px] h-full absolute"
          priority
        />

        <div className="w-[1100px]">
          {step.map((s, i) => {
            const p = positions[i] || positions[positions.length - 1];
            return (
              <div
                key={i}
                className="absolute how-desktop-item"
                style={{
                  left: p.left,
                  top: p.top,
                  transform: "translate(-50%, -50%)",
                }}
              >
                <div className="relative grid place-items-left">
                  {/* Angka besar untuk parallax */}
                  <div className="pointer-events-none absolute -z-10 right-0 top-10 select-none text-[160px] font-black leading-none text-slate-200 how-number">
                    {t.rich(`steps.${i}.number`) as React.ReactNode}
                  </div>

                  {/* Node */}
                  <div className="grid h-14 w-14 place-items-center rounded-xl bg-accent how-node">
                    <div className="h-4 w-4 rounded-full bg-highlight" />
                  </div>
                </div>

                <div className="mt-3 max-w-xs p-4 how-card">
                  <h3 className="text-base font-semibold">
                    {t(`steps.${i}.title`)}
                  </h3>
                  <p className="mt-2 text-sm leading-relaxed text-slate-700">
                    {t(`steps.${i}.desc`)}
                  </p>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Mobile / Tablet */}
      <div className="lg:hidden">
        {step.map((s, i) => (
          <div
            key={i}
            className="py-6 border-b border-accent max-w-lg relative how-mobile-item"
          >
            <div className="absolute font-bold text-8xl right-20 text-slate-600/40 how-number">
              {t.rich(`steps.${i}.number`) as React.ReactNode}
            </div>
            <div className="z-10 relative">
              <div className="bg-accent w-10 h-10 rounded-xl flex items-center justify-center">
                <div className="bg-highlight w-4 h-4 rounded-full" />
              </div>
              <h3 className="text-xl font-semibold mt-5">
                {t(`steps.${i}.title`)}
              </h3>
              <p className="text-base mt-1">{t(`steps.${i}.desc`)}</p>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
