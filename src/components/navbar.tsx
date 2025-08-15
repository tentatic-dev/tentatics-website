"use client";

import Image from "next/image";
import Link from "next/link";
import { BiGlobe } from "react-icons/bi";
import { IoIosArrowRoundForward } from "react-icons/io";
import { useEffect, useState } from "react";
import { useTranslations, useLocale } from "next-intl";
import { useRouter, usePathname } from "next/navigation";

type NavbarProps = {
  variant?: number; // Optional prop to handle different styles
};

export default function Navbar({ variant = 1 }: NavbarProps) {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const t = useTranslations("navbar");
  const locale = useLocale();
  const router = useRouter();
  const pathname = usePathname();

  useEffect(() => {
    const onScroll = () => setIsScrolled(window.scrollY > 50 || isMenuOpen);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, [isMenuOpen]);

  const handleLanguageChange = (lang: string) => {
    // Hapus locale dari pathname
    const pathWithoutLocale = pathname.replace(/^\/[a-z]{2}/, "") || "/";
    router.push(`/${lang}${pathWithoutLocale}`);
  };

  const toggleMenu = () => {
    setIsMenuOpen((prev) => !prev);
    setIsScrolled(true);
    if (typeof document !== "undefined") {
      document.body.style.overflow = !isMenuOpen ? "hidden" : "";
    }
  };

  return (
    <nav
      className={[
        "fixed inset-x-0 top-0 z-50 transition-all duration-300",
        isScrolled
          ? "bg-primary shadow-lg py-2 md:py-4"
          : "bg-transparent py-6",
      ].join(" ")}
    >
      <div className="container mx-auto navbar border-none shadow-none justify-around">
        <div className="navbar-start">
          <Image
            src="/logo-tentatics-white.svg"
            alt="Tentatics logo"
            width={160}
            height={40}
            className="w-24 md:w-32 h-auto"
            priority
          />
        </div>

        {/* Desktop menu */}
        <div className="navbar-center hidden lg:flex">
          <ul className="items-center flex menu menu-horizontal gap-6 text-white">
            <li>
              <a className="hover:text-highlight transition-colors text-base">
                {t("business")}
              </a>
            </li>
            <li>
              <a className="hover:text-highlight transition-colors text-base">
                {t("about")}
              </a>
            </li>
            <li>
              <a className="hover:text-highlight transition-colors text-base">
                {t("blog")}
              </a>
            </li>
          </ul>
        </div>

        {/* Desktop right */}
        <div className="navbar-end hidden lg:flex">
          <ul className="flex px-1 bg-transparent gap-4 xl:gap-6 items-center text-white">
            <li>
              <div className="dropdown dropdown-end">
                <button
                  type="button"
                  tabIndex={0}
                  className={[
                    "btn btn-sm gap-2 py-5 rounded-lg shadow-none border-none ",
                    variant === 2
                      ? "bg-highlight text-primary-dark hover:bg-highlight/50"
                      : "btn-ghost text-white border border-white hover:bg-white/10",
                  ].join(" ")}
                >
                  <BiGlobe className="text-lg" />
                  <span className="text-sm">{locale.toUpperCase()}</span>
                </button>
                <ul
                  tabIndex={0}
                  className="dropdown-content menu bg-black/80 rounded-lg mt-2 px-3 xl:px-6 py-2 shadow z-[1] text-white min-w-[80px]"
                >
                  <li>
                    <button
                      className="hover:bg-white/20 rounded-md"
                      onClick={() => handleLanguageChange("en")}
                    >
                      EN
                    </button>
                  </li>
                  <li>
                    <button
                      className="hover:bg-white/20 rounded-md"
                      onClick={() => handleLanguageChange("id")}
                    >
                      ID
                    </button>
                  </li>
                </ul>
              </div>
            </li>
            <li>
              <Link
                href="/"
                className={[
                  "btn text-sm rounded-lg px-4 xl:px-6 py-3 h-auto border-none shadow-none transition-colors flex items-center gap-1",
                  variant === 2
                    ? "bg-highlight hover:bg-highlight/50 text-primary-dark"
                    : "bg-accent-dark hover:bg-accent-dark/90 text-white",
                ].join(" ")}
              >
                <span>{t("consultation")}</span>
                <IoIosArrowRoundForward className="text-xl" />
              </Link>
            </li>
          </ul>
        </div>

        {/* Mobile right */}
        <div className="navbar-end lg:hidden flex items-center gap-2">
          <div className="dropdown dropdown-end">
            <button
              type="button"
              tabIndex={0}
              className="btn btn-ghost btn-sm gap-1 text-white hover:bg-white/10 border border-white"
            >
              <BiGlobe className="text-base" />
              <span className="text-sm">{locale.toUpperCase()}</span>
            </button>
            <ul
              tabIndex={0}
              className="dropdown-content menu bg-black/80 rounded-lg mt-2 p-2 shadow z-[1] text-white min-w-[70px]"
            >
              <li>
                <button
                  className="hover:bg-white/20 rounded-md text-sm"
                  onClick={() => handleLanguageChange("en")}
                >
                  EN
                </button>
              </li>
              <li>
                <button
                  className="hover:bg-white/20 rounded-md text-sm"
                  onClick={() => handleLanguageChange("id")}
                >
                  ID
                </button>
              </li>
            </ul>
          </div>

          {/* HAMBURGER with morph to X */}
          <button
            aria-label={isMenuOpen ? "Close menu" : "Open menu"}
            aria-expanded={isMenuOpen}
            onClick={toggleMenu}
            className="relative h-5 w-10 grid place-items-center"
          >
            <span
              className={[
                "block w-6 h-[2px] bg-white rounded transition-all duration-300 origin-center",
                isMenuOpen
                  ? "rotate-45 translate-y-[5px]"
                  : "rotate-0 translate-y-0",
              ].join(" ")}
            />
            <span
              className={[
                "block w-6 h-[2px] bg-white rounded transition-all duration-300 origin-center",
                isMenuOpen
                  ? "-rotate-45 -translate-y-[5px]"
                  : "rotate-0 translate-y-0",
              ].join(" ")}
            />
          </button>
        </div>
      </div>

      {/* Mobile menu */}
      <div
        className={[
          "lg:hidden overflow-hidden origin-top transition-all duration-300",
          "absolute left-0 right-0 top-full",
          isMenuOpen
            ? "max-h-[80vh] opacity-100 translate-y-0"
            : "max-h-0 opacity-0 -translate-y-2 pointer-events-none",
        ].join(" ")}
      >
        <div className="bg-primary">
          <ul className="menu menu-vertical p-4 text-white space-y-2">
            <li>
              <a className="hover:text-accent transition-colors">
                {t("business")}
              </a>
            </li>
            <li>
              <a className="hover:text-accent transition-colors">
                {t("about")}
              </a>
            </li>
            <li>
              <a className="hover:text-accent transition-colors">{t("blog")}</a>
            </li>
            <li className="pt-2">
              <Link
                href="/"
                className={[
                  "btn w-full border-none shadow-none transition-colors",
                  variant === 2
                    ? "bg-highlight hover:bg-highlight/90 text-primary"
                    : "bg-accent-dark hover:bg-accent-dark/90 text-white",
                ].join(" ")}
                onClick={() => setIsMenuOpen(false)}
              >
                {t("consultation")} <IoIosArrowRoundForward />
              </Link>
            </li>
          </ul>
        </div>
      </div>
    </nav>
  );
}
