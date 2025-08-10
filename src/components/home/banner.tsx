"use client";

import Link from "next/link";
import FadeSlider from "./fade-slider";
import Image from "next/image";
import { IoIosArrowDown } from "react-icons/io";
import { MdOutlinePlayCircle } from "react-icons/md";

export default function Banner() {
  const imgs = [
    "/landing/landing-1.png",
    "/landing/landing-2.png",
    "/landing/landing-3.png",
  ];
  return (
    <section
      id="banner"
      className="min-h-dvh w-full flex flex-col items-center justify-around px-6 pt-6 relative overflow-hidden"
    >
      <div></div>
      <FadeSlider images={imgs} intervalMs={5000} fadeMs={800} />

      <div className="flex text-white flex-col z-22 items-center gap-5">
        <h1 className="text-3xl md:text-5xl font-bold mb-6 drop-shadow-lg text-gradient-highlight h-16">
          Show Better. Sell Quicker. Manage Smarter.
        </h1>
        <div className="flex gap-8">
          <div className="flex items-center gap-2">
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
            360 View
          </div>
          <div className="flex items-center gap-2">
            <button
              className="border border-white/60 rounded-full p-3 bg-white/15 backdrop-blur-md"
              aria-label="3D View"
            >
              <Image src="/icons/3d.svg" alt="3D View" width={18} height={18} />
            </button>
            3D Design
          </div>
          <div className="flex items-center gap-2">
            <button
              className="border border-white/60 rounded-full p-3 bg-white/15 backdrop-blur-md"
              aria-label="AI-Supported"
            >
              <Image src="/icons/ai.svg" alt="AI" width={18} height={18} />
            </button>
            AI-Supported
          </div>
        </div>
        <div className="flex flex-col items-center gap-3">
          <div className="relative">
            <textarea
              className="textarea bg-white/15 backdrop-blur-md text-white rounded-2xl w-[581px] h-32 border-none outline-none resize-none pr-14 placeholder:text-white/70"
              placeholder="Saya ingin menanyakan apa itu Tentatics....."
            ></textarea>

            <button
              type="button"
              aria-label="Kirim"
              className="absolute right-3 bottom-3 bg-primary-dark rounded-full p-2 backdrop-blur-md text-white hover:bg-white/25 transition"
            >
              <Image src="/icons/send.svg" alt="Kirim" width={20} height={20} />
            </button>
          </div>

          <div className="flex flex-wrap gap-3">
            <button
              type="button"
              className="rounded-full px-3 py-1 bg-[#f1f8a9] text-black/80 shadow text-sm"
            >
              Can you evaluate my listing now?
            </button>
            <button
              type="button"
              className="rounded-full px-3 py-1 bg-[#f1f8a9] text-black/80 shadow text-sm"
            >
              How Tentatics help me sell faster?
            </button>
          </div>
        </div>
        <div className="flex flex-col items-center gap-6 mt-8 z-25 text-white">
          <Link
            href="/ask"
            className="border border-white rounded-xl px-3 py-2 flex items-center gap-2 text-sm"
          >
            <MdOutlinePlayCircle className="h-6 w-6" />
            Lihat Demo
          </Link>
          <div className="flex flex-col items-center gap-2">
            <p>Jelajahi Lebih Lanjut</p>
            <button>
              <IoIosArrowDown className="w-6 h-6" />
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}
