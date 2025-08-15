"use client";

import { useTranslations } from "next-intl";
import { useState, useEffect } from "react";

export default function Testimony() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const t = useTranslations("about.testimony");

  const testimony = t.raw("items") as Array<{
    name: string;
    position: string;
    company: string;
    message: string;
  }>;

  // Auto-scroll functionality
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentIndex((prevIndex) =>
        prevIndex === testimony.length - 1 ? 0 : prevIndex + 1
      );
    }, 5000); // Change slide every 5 seconds

    return () => clearInterval(interval);
  }, [testimony.length]);

  const goToPrevious = () => {
    setCurrentIndex(
      currentIndex === 0 ? testimony.length - 1 : currentIndex - 1
    );
  };

  const goToNext = () => {
    setCurrentIndex(
      currentIndex === testimony.length - 1 ? 0 : currentIndex + 1
    );
  };

  // Create an array with duplicated items for infinite scroll effect
  const extendedTestimony = [...testimony, ...testimony, ...testimony];
  const startIndex = testimony.length + currentIndex;

  return (
    <section className="py-16 w-full">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-2xl mx-auto mb-12">
          <h1 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-primary-dark mb-4">
            {t("title")}
          </h1>
          <p className="text-sm sm:text-base text-primary-dark">{t("desc")}</p>
        </div>

        <div className="relative mx-auto">
          {/* Desktop View - 3 cards */}
          <div className="hidden md:block">
            <div className="overflow-hidden">
              <div
                className="flex transition-transform duration-500 ease-in-out"
                style={{
                  transform: `translateX(-${(startIndex - 1) * 33.333}%)`,
                }}
              >
                {extendedTestimony.map((item, index) => {
                  const initials = item.name
                    .split(" ")
                    .map((s) => s[0])
                    .slice(0, 2)
                    .join("");

                  // Determine if this card is the center one
                  const isCenter = index === startIndex;
                  const isVisible = Math.abs(index - startIndex) <= 1;

                  return (
                    <article
                      key={index}
                      className={`w-1/3 flex-shrink-0 px-3 lg:px-4 transition-all duration-500 ${
                        isVisible ? "opacity-100" : "opacity-0"
                      } ${isCenter ? "scale-100 z-10" : "scale-90 z-0"}`}
                    >
                      <div
                        className={`bg-primary-dark text-white rounded-2xl p-4 lg:p-6 transition-all duration-500 max-w-xl mx-auto ${
                          isCenter ? "opacity-100 shadow-xl" : "opacity-50"
                        }`}
                      >
                        <p className="text-sm lg:text-lg mb-4 lg:mb-6">
                          {item.message}
                        </p>

                        <div className="flex items-center gap-3 lg:gap-4 mt-auto">
                          <div className="flex-shrink-0">
                            <div className="h-10 w-10 lg:h-12 lg:w-12 rounded-full bg-white text-primary-dark font-bold flex items-center justify-center text-sm lg:text-base">
                              {initials}
                            </div>
                          </div>

                          <div>
                            <div className="font-semibold text-sm lg:text-base">
                              {item.name}
                            </div>
                            <div className="text-xs lg:text-sm">
                              {item.position} &middot;{" "}
                              <span className="text-primary-200 font-medium">
                                {item.company}
                              </span>
                            </div>
                          </div>
                        </div>
                      </div>
                    </article>
                  );
                })}
              </div>
            </div>
          </div>

          {/* Mobile View - 1 card */}
          <div className="block md:hidden">
            <div className="overflow-hidden">
              <div
                className="flex transition-transform duration-500 ease-in-out"
                style={{
                  transform: `translateX(-${currentIndex * 100}%)`,
                }}
              >
                {testimony.map((item, index) => {
                  const initials = item.name
                    .split(" ")
                    .map((s) => s[0])
                    .slice(0, 2)
                    .join("");

                  return (
                    <article key={index} className="w-full flex-shrink-0 px-4">
                      <div className="bg-primary-dark text-white rounded-2xl p-6 max-w-sm mx-auto shadow-xl">
                        <p className="text-base mb-6">{item.message}</p>

                        <div className="flex items-center gap-4 mt-auto">
                          <div className="flex-shrink-0">
                            <div className="h-12 w-12 rounded-full bg-white text-primary-dark font-bold flex items-center justify-center">
                              {initials}
                            </div>
                          </div>

                          <div>
                            <div className="font-semibold">{item.name}</div>
                            <div className="text-sm">
                              {item.position} &middot;{" "}
                              <span className="text-primary-200 font-medium">
                                {item.company}
                              </span>
                            </div>
                          </div>
                        </div>
                      </div>
                    </article>
                  );
                })}
              </div>
            </div>
          </div>

          {/* Navigation Arrows - Desktop Only */}
          <div className="hidden md:block">
            <button
              onClick={goToPrevious}
              className="absolute left-0 top-1/2 -translate-y-1/2 z-20 bg-white hover:bg-gray-50 border border-primary-light rounded-full p-2 lg:p-3 shadow-lg transition-all hover:scale-110"
              aria-label="Previous testimony"
            >
              <svg
                className="w-4 h-4 lg:w-5 lg:h-5 text-primary-dark"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M15 19l-7-7 7-7"
                />
              </svg>
            </button>

            <button
              onClick={goToNext}
              className="absolute right-0 top-1/2 -translate-y-1/2 z-20 bg-white hover:bg-gray-50 border border-primary-light rounded-full p-2 lg:p-3 shadow-lg transition-all hover:scale-110"
              aria-label="Next testimony"
            >
              <svg
                className="w-4 h-4 lg:w-5 lg:h-5 text-primary-dark"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M9 5l7 7-7 7"
                />
              </svg>
            </button>
          </div>

          {/* Navigation Dots */}
          <div className="flex justify-center gap-2 mt-8">
            {testimony.map((_, index) => (
              <button
                key={index}
                onClick={() => setCurrentIndex(index)}
                className={`w-2 h-2 sm:w-3 sm:h-3 rounded-full transition-colors ${
                  index === currentIndex
                    ? "bg-primary-dark"
                    : "bg-slate-200 hover:bg-primary-dark"
                }`}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
