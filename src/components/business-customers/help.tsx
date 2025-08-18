"use client";

import Image from "next/image";
import { useEffect, useRef } from "react";
import { useTranslations } from "next-intl";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

export default function Help() {
  const t = useTranslations("business_customers");
  const help = t.raw("help") as {
    image: string;
    title: string;
    desc: string;
  }[];

  const sectionRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const cards = sectionRef.current?.querySelectorAll(".help-card");
    if (cards) {
      cards.forEach((card, i) => {
        gsap.from(card, {
          opacity: 0,
          y: 50,
          duration: 0.8,
          delay: i * 0.2,
          scrollTrigger: {
            trigger: card,
            start: "top 80%", // mulai animasi saat card masuk 80% dari viewport
            toggleActions: "play none none reverse",
          },
        });
      });
    }
  }, []);

  return (
    <section
      id="help"
      className="text-white -mt-12 md:-mt-32 relative z-20"
      ref={sectionRef}
    >
      <div className="container mx-auto px-5">
        <div className="grid md:grid-cols-3 grid-cols-1 gap-7">
          {help.map((item, index) => (
            <div
              key={index}
              className="help-card p-6 bg-accent rounded-2xl text-center"
            >
              <div className="flex justify-center mb-4">
                <Image
                  src={item.image}
                  width={50}
                  height={50}
                  alt={item.title}
                  className="object-contain"
                />
              </div>
              <h3 className="text-lg font-semibold">{item.title}</h3>
              <p className="mt-2">{item.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
