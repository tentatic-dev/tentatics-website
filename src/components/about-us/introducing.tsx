"use client";

import { useTranslations } from "next-intl";
import Image from "next/image";
import Link from "next/link";
import { FiArrowUpRight } from "react-icons/fi";
import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const images = {
  miracleRay: "/about/miracle-ray.png",
  peterShaan: "/about/peter-shaan.jpg",
};

const teamMembers = [
  {
    name: "Miracle Ray",
    role: "Founder & CEO",
    image: images.miracleRay,
    link: "https://www.linkedin.com/in/christian-miracle-rumawung-8845b2207/",
  },
  {
    name: "Peter Shaan",
    role: "Co Founder & CTO",
    image: images.peterShaan,
    link: "https://www.linkedin.com/in/petershaan/",
  },
];

export default function Introducing() {
  const t = useTranslations("about.introducing");
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    if (!sectionRef.current) return;

    // Skip animasi jika user pilih reduced motion
    const prefersReduced =
      typeof window !== "undefined" &&
      window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (prefersReduced) return;

    const ctx = gsap.context(() => {
      // Subtle fade-up utk heading & desc
      gsap.from(["#intro-title", "#intro-desc"], {
        opacity: 0,
        y: 12,
        duration: 0.45,
        ease: "power1.out",
        stagger: 0.08,
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top 80%",
          toggleActions: "play none none none", // sekali jalan, no reverse
          once: true,
        },
      });

      // Cards: kecilkan gerakannya, cepat, sekali jalan
      const cards = gsap.utils.toArray<HTMLElement>(".intro-card");
      gsap.from(cards, {
        opacity: 0,
        y: 16,
        duration: 0.4,
        ease: "power1.out",
        stagger: 0.08,
        scrollTrigger: {
          trigger: ".intro-grid",
          start: "top 85%",
          toggleActions: "play none none none",
          once: true,
        },
      });
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      id="introducing"
      ref={sectionRef}
      className="relative bg-primary-dark overflow-hidden"
    >
      {/* patterns tetap tapi tanpa parallax */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-y-0 left-0 hidden lg:block w-1/3 bg-[url('/about/pattern.svg')] bg-no-repeat bg-left bg-contain opacity-20"
      />
      <div
        aria-hidden
        className="pointer-events-none absolute inset-y-0 right-0 hidden lg:block w-1/3 bg-[url('/about/pattern.svg')] bg-no-repeat bg-right bg-contain opacity-20"
      />

      <div className="relative z-10 container mx-auto px-5 mt-32 mb-28 lg:pb-40 text-center">
        <p id="intro-title" className="text-lg mb-3 font-light text-highlight">
          {t("title")}
        </p>
        <h2
          id="intro-desc"
          className="text-3xl sm:text-4xl font-bold text-white mb-10"
        >
          {t("desc")}
        </h2>

        <div className="intro-grid grid md:grid-cols-2 gap-16 max-w-xl mx-auto">
          {teamMembers.map((member) => (
            <div
              key={member.name}
              className="intro-card group flex flex-col transition-transform duration-200 will-change-transform hover:-translate-y-0.5"
            >
              <div className="relative w-full aspect-[4/5] overflow-hidden rounded-2xl">
                <Image
                  src={member.image}
                  alt={member.name}
                  fill
                  sizes="(max-width: 640px) 90vw, (max-width: 1024px) 45vw, 400px"
                  className="object-cover"
                  priority
                />
              </div>

              <Link
                href={member.link}
                target="_blank"
                className="flex justify-between w-full mt-4"
                aria-label={`${member.name} LinkedIn`}
              >
                <h5 className="font-bold text-xl text-white transition-colors">
                  {member.name}
                </h5>
                <FiArrowUpRight className="text-highlight text-2xl group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
              </Link>
              <p className="text-highlight text-left">{member.role}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
