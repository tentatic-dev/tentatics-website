"use client";

import Link from "next/link";
import Image from "next/image";
import { useLayoutEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useTranslations } from "next-intl";

gsap.registerPlugin(ScrollTrigger);

export default function Projects() {
  const sectionRef = useRef<HTMLElement>(null);
  const titleRef = useRef<HTMLHeadingElement>(null);
  const subtitleRef = useRef<HTMLParagraphElement>(null);
  const gridRef = useRef<HTMLDivElement>(null);
  const t = useTranslations("home.project");

  const projects = t.raw("item") as Array<{
    image: string;
    title: string;
    desc: string;
    url: string;
    color: string;
  }>;

  useLayoutEffect(() => {
    const reduceMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)"
    ).matches;
    if (reduceMotion) return;

    const ctx = gsap.context(() => {
      gsap.fromTo(
        titleRef.current,
        { opacity: 0, y: 40 },
        {
          opacity: 1,
          y: 0,
          duration: 0.9,
          ease: "power3.out",
          scrollTrigger: {
            trigger: titleRef.current,
            start: "top 85%",
            toggleActions: "play none none reverse",
          },
        }
      );

      gsap.fromTo(
        subtitleRef.current,
        { opacity: 0, y: 24 },
        {
          opacity: 1,
          y: 0,
          duration: 0.7,
          ease: "power2.out",
          scrollTrigger: {
            trigger: subtitleRef.current,
            start: "top 85%",
            toggleActions: "play none none reverse",
          },
        }
      );

      const cards = gsap.utils.toArray<HTMLElement>(".project-card");
      gsap.fromTo(
        cards,
        { opacity: 0, y: 56, scale: 0.94, rotateY: 8 },
        {
          opacity: 1,
          y: 0,
          scale: 1,
          rotateY: 0,
          duration: 0.8,
          ease: "back.out(1.6)",
          stagger: 0.12,
          scrollTrigger: {
            trigger: gridRef.current,
            start: "top 85%",
            once: true,
          },
        }
      );
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section ref={sectionRef} className="bg-primary-dark py-20 sm:py-24">
      <div className="container mx-auto flex flex-col text-center gap-8 sm:gap-10">
        <div className="flex flex-col gap-3">
          <h1
            ref={titleRef}
            className="text-white text-xl sm:text-3xl font-bold "
          >
            {t("title")}
          </h1>
          <p
            ref={subtitleRef}
            className="text-highlight font-light text-sm sm:text-base"
          >
            {t("desc")}
          </p>
        </div>

        <div
          ref={gridRef}
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 sm:gap-8"
        >
          {projects.map((p) => (
            <ProjectCard key={p.title} {...p} />
          ))}
        </div>
      </div>
    </section>
  );
}

function ProjectCard({
  image,
  title,
  desc,
  url,
  color,
}: {
  image: string;
  title: string;
  desc: string;
  url: string;
  color: string;
}) {
  return (
    <div
      className="project-card group relative rounded-xl overflow-hidden shadow-lg cursor-pointer will-change-transform"
      aria-label={title}
    >
      <div className="relative aspect-[4/3]">
        <Image
          src={image}
          alt={title}
          fill
          sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw"
          className="object-cover"
          priority={false}
        />
        <div
          className="absolute inset-0 transition-opacity duration-300"
          style={{ backgroundColor: `${color}`, opacity: 0.4 }}
        />
      </div>

      <div className="absolute inset-0 flex items-end p-3 sm:p-4">
        <div className="w-full bg-white/15 backdrop-blur-lg border border-white/30 rounded-lg p-3 sm:p-4 text-white transition-all duration-300 translate-y-0 group-hover:-translate-y-1">
          <h2 className="text-lg sm:text-xl font-semibold text-left">
            {title}
          </h2>
          <div className="mt-2 flex items-center gap-3">
            <p className="text-xs sm:text-sm text-left flex-1">{desc}</p>
            <Link
              href={url}
              className="bg-black/50 hover:bg-black/60 active:scale-[0.98] text-[11px] sm:text-xs px-3 py-2 rounded transition"
            >
              Details
            </Link>
          </div>
        </div>
      </div>

      {/* Hover lift + overlay dim via CSS (tanpa JS listener) */}
      <style jsx>{`
        .project-card:hover {
          transform: translateY(-6px) scale(1.02);
        }
        .project-card > .relative > div:first-child:hover {
          opacity: 0.8;
        }
      `}</style>
    </div>
  );
}
