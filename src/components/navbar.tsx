"use client";

import Image from "next/image";
import Link from "next/link";
import { BiGlobe } from "react-icons/bi";
import { IoIosArrowRoundForward } from "react-icons/io";
import { HiMenu } from "react-icons/hi";
import { useEffect, useState } from "react";

export default function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [language, setLanguage] = useState("EN");
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  useEffect(() => {
    const savedLanguage = localStorage.getItem("language") || "EN";
    setLanguage(savedLanguage);

    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const handleLanguageChange = (lang: string) => {
    setLanguage(lang);
    localStorage.setItem("language", lang);
  };

  return (
    <nav
      className={`navbar fixed top-0 w-full z-50 px-4 md:px-8 lg:px-32 border-none shadow-none transition-all duration-300 ${
        isScrolled ? "bg-primary backdrop-blur-md py-4" : "bg-transparent  py-6"
      }`}
    >
      <div className="navbar-start hidden lg:flex">
        <Image
          src="/logo-tentatics-white.svg"
          alt="tentatics logo putih"
          width={500}
          height={500}
          className="w-20 md:w-24 lg:w-28 h-auto"
        />
      </div>

      <div className="navbar-center hidden lg:flex">
        <ul className="items-center flex menu menu-horizontal gap-6 text-white">
          <li>
            <a className="hover:text-highlight transition-colors">
              Business Customers
            </a>
          </li>
          <li>
            <a className="hover:text-highlight transition-colors">About us</a>
          </li>
          <li>
            <a className="hover:text-highlight transition-colors">Blog</a>
          </li>
        </ul>
      </div>

      {/* Desktop Right Side */}
      <div className="navbar-end hidden lg:flex">
        <ul className="flex px-1 bg-transparent gap-4 xl:gap-6 items-center text-white">
          <li>
            <div className="dropdown dropdown-end ">
              <button
                type="button"
                tabIndex={0}
                className="btn btn-ghost btn-sm gap-2 py-5 rounded-lg text-white hover:bg-white/10 border border-white"
              >
                <BiGlobe className="text-lg" />
                <span className="text-sm">{language}</span>
              </button>
              <ul
                tabIndex={0}
                className="dropdown-content menu bg-black/80 backdrop-blur-sm rounded-lg mt-2 px-3 xl:px-6 py-2 shadow z-[1] text-white min-w-[80px]"
              >
                <li>
                  <button
                    className="hover:bg-white/20 rounded-md"
                    onClick={() => handleLanguageChange("EN")}
                  >
                    EN
                  </button>
                </li>
                <li>
                  <button
                    className="hover:bg-white/20 rounded-md"
                    onClick={() => handleLanguageChange("ID")}
                  >
                    ID
                  </button>
                </li>
              </ul>
            </div>
          </li>
          <li>
            <Link
              href={"/"}
              className="btn bg-accent-dark text-white text-sm font-normal rounded-lg px-4 xl:px-6 py-3 h-auto border-none shadow-none hover:bg-accent-dark/90 transition-colors flex items-center gap-1"
            >
              <span>Konsultasi dengan Kami</span>
              <IoIosArrowRoundForward className="text-xl" />
            </Link>
          </li>
        </ul>
      </div>

      {/* Mobile Right Side */}
      {/* <div className="navbar-end lg:hidden flex items-center gap-2">
        <div className="dropdown dropdown-end">
          <button
            type="button"
            tabIndex={0}
            className="btn btn-ghost btn-sm gap-1 text-white hover:bg-white/10 border border-white"
          >
            <BiGlobe className="text-base" />
            <span className="text-sm">{language}</span>
          </button>
          <ul
            tabIndex={0}
            className="dropdown-content menu bg-black/80 backdrop-blur-sm rounded-lg mt-2 p-2 shadow z-[1] text-white min-w-[70px]"
          >
            <li>
              <button
                className="hover:bg-white/20 rounded-md text-sm"
                onClick={() => handleLanguageChange("EN")}
              >
                EN
              </button>
            </li>
            <li>
              <button
                className="hover:bg-white/20 rounded-md text-sm"
                onClick={() => handleLanguageChange("ID")}
              >
                ID
              </button>
            </li>
          </ul>
        </div>
        <Link
          href={"/"}
          className="btn btn-sm bg-accent-dark text-white px-3 py-1 h-auto border-none shadow-none hover:bg-accent-dark/90 transition-colors"
        >
          <IoIosArrowRoundForward className="text-lg" />
        </Link>
      </div> */}

      {/* Mobile Menu Dropdown */}
      {/* {isMenuOpen && (
        <div className="absolute top-full left-0 w-full bg-primary/95 backdrop-blur-md lg:hidden">
          <ul className="menu menu-vertical p-4 text-white space-y-2">
            <li>
              <a className="hover:text-accent transition-colors">
                Business Customers
              </a>
            </li>
            <li>
              <a className="hover:text-accent transition-colors">About us</a>
            </li>
            <li>
              <a className="hover:text-accent transition-colors">Blog</a>
            </li>
            <li className="pt-2">
              <Link
                href={"/"}
                className="btn bg-accent-dark text-white w-full border-none shadow-none hover:bg-accent-dark/90 transition-colors"
              >
                Konsultasi dengan Kami <IoIosArrowRoundForward />
              </Link>
            </li>
          </ul>
        </div>
      )} */}
    </nav>
  );
}
