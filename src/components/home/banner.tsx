"use client";

import Link from "next/link";
import FadeSlider from "./fade-slider";
import Image from "next/image";
import { IoIosArrowDown } from "react-icons/io";
import { MdOutlinePlayCircle } from "react-icons/md";
import { useEffect, useRef, useState } from "react";
import { gsap } from "gsap";
import { useTranslations } from "next-intl";
import { useRouter } from "next/navigation";

export default function Banner() {
  const bannerRef = useRef<HTMLElement>(null);
  const titleRef = useRef<HTMLHeadingElement>(null);
  const buttonsRef = useRef<HTMLDivElement>(null);
  const exploreRef = useRef<HTMLDivElement>(null);
  const [textareaValue, setTextareaValue] = useState("");
  const t = useTranslations("home.banner");
  const router = useRouter();

  const imgs = [
    "/landing/landing-1.png",
    "/landing/landing-2.png",
    "/landing/landing-3.png",
  ];

  useEffect(() => {
    const ctx = gsap.context(() => {
      const tl = gsap.timeline();

      tl.fromTo(
        titleRef.current,
        {
          opacity: 0,
          y: 50,
          scale: 0.9,
        },
        {
          opacity: 1,
          y: 0,
          scale: 1,
          duration: 1.2,
          ease: "power3.out",
        }
      );

      // Fade in untuk suggestion buttons
      tl.fromTo(
        buttonsRef.current?.children || [],
        {
          opacity: 0,
          x: -20,
        },
        {
          opacity: 1,
          x: 0,
          duration: 0.6,
          stagger: 0.1,
          ease: "power2.out",
        },
        "-=0.4"
      );

      // Bounce in untuk explore section
      tl.fromTo(
        exploreRef.current,
        {
          opacity: 0,
          y: 20,
        },
        {
          opacity: 1,
          y: 0,
          duration: 0.8,
          ease: "bounce.out",
        },
        "-=0.3"
      );
    }, bannerRef);

    return () => ctx.revert();
  }, []);

  const handleScrollDown = () => {
    const nextSection = document.querySelector("#discover");
    if (nextSection) {
      nextSection.scrollIntoView({ behavior: "smooth" });
    }
  };

  const handleSendToChat = () => {
    if (textareaValue.trim()) {
      router.push(`/chat?q=${encodeURIComponent(textareaValue.trim())}`);
    }
  };

  return (
    <section
      ref={bannerRef}
      id="banner"
      className="md:min-h-screen relative overflow-hidden bg-primary-dark"
    >
      <div className="p-5 md:px-0">
        <FadeSlider images={imgs} intervalMs={5000} fadeMs={800} />
      </div>
      <div className="container mx-auto relative z-30 flex flex-col items-center justify-center md:min-h-screen order-2 md:order-1">
        <h1
          ref={titleRef}
          className="opacity-0 text-2xl lg:text-5xl font-bold mb-6 drop-shadow-lg text-gradient-highlight h-auto md:h-16 text-center"
        >
          {t("title")}
        </h1>
        <div className="flex gap-8 flex-wrap text-white justify-center">
          <div className="flex items-center gap-2 ">
            <button
              className="border border-white/60 rounded-full p-3 bg-white/15 backdrop-blur-md"
              aria-label="360° View"
            >
              <Image
                src="/icons/360.svg"
                alt="360° View"
                width={24}
                height={24}
              />
            </button>
            {t("360")}
          </div>
          <div className="flex items-center gap-2">
            <button
              className="border border-white/60 rounded-full p-3 bg-white/15 backdrop-blur-md"
              aria-label="3D View"
            >
              <Image src="/icons/3d.svg" alt="3D View" width={18} height={18} />
            </button>
            {t("3D")}
          </div>
          <div className="flex items-center gap-2">
            <button
              className="border border-white/60 rounded-full p-3 bg-white/15 backdrop-blur-md"
              aria-label="AI-Supported"
            >
              <Image src="/icons/ai.svg" alt="AI" width={18} height={18} />
            </button>
            {t("AI")}
          </div>
        </div>
        <div className="flex flex-col items-center gap-3 mt-8">
          <div className="relative w-[140%]">
            <textarea
              className="textarea bg-white/15 backdrop-blur-md text-white rounded-2xl w-full h-24 sm:h-32 border-none outline-none resize-none pr-14 p-4 placeholder:text-white/70 text-sm sm:text-base active:outline-none focus:outline-none"
              placeholder={t("placeholder")}
              value={textareaValue}
              onChange={(e) => setTextareaValue(e.target.value)}
            ></textarea>

            <button
              type="button"
              onClick={handleSendToChat}
              aria-label="Kirim"
              className="absolute right-3 bottom-3 bg-primary-dark rounded-full p-2 backdrop-blur-md text-white hover:bg-white/25 transition"
            >
              <Image src="/icons/send.svg" alt="Kirim" width={20} height={20} />
            </button>
          </div>

          <div
            ref={buttonsRef}
            className="flex flex-wrap flex-col md:flex-row gap-3 w-full"
          >
            <button
              type="button"
              className="rounded-full px-3 py-2 bg-[#f1f8a9] text-black/80 shadow text-xs md:text-sm text-center cursor-pointer"
              onClick={() => setTextareaValue(t("question1"))}
            >
              {t("question1")}
            </button>
            <button
              type="button"
              className="rounded-full px-3 py-2 bg-[#f1f8a9] text-black/80 shadow text-xs md:text-sm text-center cursor-pointer"
              onClick={() => setTextareaValue(t("question2"))}
            >
              {t("question2")}
            </button>
          </div>
        </div>
        <div
          ref={exploreRef}
          className="flex flex-col items-center gap-6 mt-8 z-50 text-white"
        >
          <Link
            href="/ask"
            className="border border-white rounded-xl px-3 py-2 flex items-center gap-2 text-sm"
          >
            <MdOutlinePlayCircle className="h-6 w-6" />
            {t("see")}
          </Link>
          <button
            onClick={handleScrollDown}
            className="flex flex-col items-center gap-2 cursor-pointer"
          >
            <p>{t("more")}</p>
            <p>
              <IoIosArrowDown className="w-6 h-6" />
            </p>
          </button>
        </div>
      </div>
    </section>
  );
}
