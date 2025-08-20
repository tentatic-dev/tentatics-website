"use client";

import { useTranslations } from "next-intl";
import { useEffect, useState } from "react";

type BannerProps = {
  onSearch: (query: string) => void;
  isLoading?: boolean;
};

export default function Banner({ onSearch, isLoading = false }: BannerProps) {
  const t = useTranslations("article");
  const [searchQuery, setSearchQuery] = useState("");

  useEffect(() => {
    const timeoutId = setTimeout(() => {
      onSearch(searchQuery);
    }, 300);

    return () => clearTimeout(timeoutId);
  }, [searchQuery, onSearch]);

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    onSearch(searchQuery);
  };

  const handleClearSearch = () => {
    setSearchQuery("");
  };

  return (
    <section id="banner" className="relative bg-primary-dark overflow-hidden">
      <div
        aria-hidden
        className="pointer-events-none absolute inset-y-0 left-0 hidden lg:block w-1/3 bg-[url('/about/pattern.svg')] bg-no-repeat bg-left bg-contain opacity-20"
      />
      <div
        aria-hidden
        className="pointer-events-none absolute inset-y-0 right-0 hidden lg:block w-1/3 bg-[url('/about/pattern.svg')] bg-no-repeat bg-right bg-contain opacity-20"
      />

      <div className="relative container mt-20 mx-auto space-y-10 py-16 md:py-24 px-16">
        <div>
          <div className="text-white text-center">
            <p className="text-base sm:text-lg mt-4 text-highlight">
              {t("desc")}
            </p>
            <h2
              id="discover-heading"
              className="text-3xl sm:text-4xl font-bold leading-tight mt-2 "
            >
              {t("title")}
            </h2>
          </div>
        </div>
        <div className="mx-auto md:w-fit">
          <form onSubmit={handleSearch}>
            <label className="input w-full lg:min-w-xl rounded-full flex items-center gap-2">
              <svg
                className={`h-[1em] opacity-50 ${
                  isLoading ? "animate-spin" : ""
                }`}
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
              >
                <g
                  strokeLinejoin="round"
                  strokeLinecap="round"
                  strokeWidth="2.5"
                  fill="none"
                  stroke="currentColor"
                >
                  <circle cx="11" cy="11" r="8"></circle>
                  <path d="m21 21-4.3-4.3"></path>
                </g>
              </svg>
              <input
                id="search"
                type="search"
                className="grow"
                placeholder="Search articles..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                disabled={isLoading}
              />
            </label>
          </form>
        </div>
      </div>
    </section>
  );
}
