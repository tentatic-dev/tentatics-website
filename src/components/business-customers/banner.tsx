"use client";

import { useLayoutEffect, useRef } from "react";
import { gsap } from "gsap";
import { useTranslations } from "next-intl";
import Image from "next/image";
import Link from "next/link";
import { GrSchedule } from "react-icons/gr";
import { IoIosArrowRoundForward } from "react-icons/io";
import { IoCheckmarkCircleOutline } from "react-icons/io5";

export default function Banner() {
  const t = useTranslations("business_customers.banner");
  const features = t.raw("features") as string[];

  // Refs
  const sectionRef = useRef<HTMLElement>(null);
  const imgWrapRef = useRef<HTMLDivElement>(null);
  const headingRef = useRef<HTMLHeadingElement>(null);
  const descRef = useRef<HTMLParagraphElement>(null);
  const listRef = useRef<HTMLUListElement>(null);
  const ctaWrapRef = useRef<HTMLDivElement>(null);
  const patternLeftRef = useRef<HTMLDivElement>(null);
  const patternRightRef = useRef<HTMLDivElement>(null);

  useLayoutEffect(() => {
    const reduce = window.matchMedia(
      "(prefers-reduced-motion: reduce)"
    ).matches;
    if (reduce) return;

    const ctx = gsap.context(() => {
      const tl = gsap.timeline({
        defaults: { ease: "power3.out" },
        delay: 0.1, // kecil biar gak ‘kaget’ saat first paint
      });

      // State awal (anti kedip)
      gsap.set(
        [
          imgWrapRef.current,
          headingRef.current,
          descRef.current,
          ctaWrapRef.current,
        ],
        {
          autoAlpha: 0,
        }
      );
      const items = listRef.current
        ? Array.from(listRef.current.querySelectorAll("li"))
        : [];
      gsap.set(items, { autoAlpha: 0, y: 12 });

      // Sequence masuk
      tl.fromTo(
        imgWrapRef.current,
        { x: -40, autoAlpha: 0 },
        { x: 0, autoAlpha: 1, duration: 0.9 }
      )
        .fromTo(
          headingRef.current,
          { y: 18, autoAlpha: 0 },
          { y: 0, autoAlpha: 1, duration: 0.6 },
          "-=0.35"
        )
        .fromTo(
          descRef.current,
          { y: 14, autoAlpha: 0 },
          { y: 0, autoAlpha: 1, duration: 0.5 },
          "-=0.35"
        )
        .fromTo(
          items,
          { y: 12, autoAlpha: 0 },
          { y: 0, autoAlpha: 1, duration: 0.45, stagger: 0.08 },
          "-=0.2"
        )
        .fromTo(
          ctaWrapRef.current,
          { y: 10, autoAlpha: 0 },
          { y: 0, autoAlpha: 1, duration: 0.45 },
          "-=0.15"
        );

      // Background pattern “mengambang” pelan (loop)
      if (patternLeftRef.current) {
        gsap.to(patternLeftRef.current, {
          y: -12,
          rotate: -1,
          duration: 6,
          yoyo: true,
          repeat: -1,
          ease: "sine.inOut",
        });
      }
      if (patternRightRef.current) {
        gsap.to(patternRightRef.current, {
          y: 12,
          rotate: 1,
          duration: 6.5,
          yoyo: true,
          repeat: -1,
          ease: "sine.inOut",
        });
      }
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={sectionRef}
      id="banner"
      className="relative bg-primary-dark overflow-hidden"
    >
      <div
        ref={patternLeftRef}
        aria-hidden
        className="pointer-events-none absolute inset-y-0 left-0 hidden lg:block w-1/3 bg-[url('/about/pattern.svg')] bg-no-repeat bg-left bg-contain opacity-20"
      />
      <div
        ref={patternRightRef}
        aria-hidden
        className="pointer-events-none absolute inset-y-0 right-0 hidden lg:block w-1/3 bg-[url('/about/pattern.svg')] bg-no-repeat bg-right bg-contain opacity-20"
      />

      <div className="relative container mt-20 mb-28 mx-auto grid grid-cols-1 md:grid-cols-2 gap-x-10 gap-y-10 py-24 items-center px-6 md:px-16">
        <div
          ref={imgWrapRef}
          className="flex justify-center md:justify-end will-change-transform"
        >
          <Image
            src={"/landing-4.jpg"}
            alt="Landing Image"
            width={500}
            height={500}
            className="object-contain rounded-2xl w-full"
            priority
          />
        </div>

        <div className="text-white">
          <h2
            ref={headingRef}
            className="text-3xl sm:text-4xl font-bold leading-tight"
          >
            {t("title")}
          </h2>
          <p ref={descRef} className="text-base sm:text-lg mt-4">
            {t("desc")}
          </p>

          <ul ref={listRef} className="mt-5 flex flex-col gap-3">
            {features.map((f, i) => (
              <li key={i} className="flex items-start gap-2">
                <IoCheckmarkCircleOutline
                  aria-hidden
                  className="mt-0.5 text-xl shrink-0"
                />
                <span>{f}</span>
              </li>
            ))}
          </ul>

          <div ref={ctaWrapRef} className="mt-6">
            <Link
              href="/"
              role="button"
              className="btn bg-highlight text-primary-dark text-sm font-medium rounded-lg px-4 xl:px-6 py-3 h-auto border-none shadow-none hover:bg-highlight/50 transition-colors inline-flex items-center gap-2 w-full"
            >
              <GrSchedule aria-hidden className="text-base" />
              <span>{t("schedule")}</span>
              <IoIosArrowRoundForward aria-hidden className="text-xl" />
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}
