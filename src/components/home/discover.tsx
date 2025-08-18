"use client";

import Link from "next/link";
import { GrSchedule } from "react-icons/gr";
import { IoIosArrowRoundForward } from "react-icons/io";
import { IoCheckmarkCircleOutline } from "react-icons/io5";
import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useTranslations } from "next-intl";

gsap.registerPlugin(ScrollTrigger);

export default function Discover() {
  const sectionRef = useRef<HTMLElement>(null);
  const headingRef = useRef<HTMLHeadingElement>(null);
  const descriptionRef = useRef<HTMLParagraphElement>(null);
  const featuresRef = useRef<HTMLUListElement>(null);
  const buttonRef = useRef<HTMLAnchorElement>(null);
  const cardRef = useRef<HTMLDivElement>(null);
  const floatingIconRef = useRef<HTMLDivElement>(null);
  const statsRef = useRef<HTMLDivElement>(null);
  const testimonialRef = useRef<HTMLParagraphElement>(null);
  const avatarRef = useRef<HTMLDivElement>(null);
  const t = useTranslations("home.discover");

  const features = t.raw("features") as string[];

  const stats = t.raw("card_item") as Array<{ value: string; label: string }>;

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Set initial states
      gsap.set([headingRef.current, descriptionRef.current], {
        opacity: 0,
        y: 50,
      });

      gsap.set(featuresRef.current?.children || [], {
        opacity: 0,
        x: -30,
      });

      gsap.set(buttonRef.current, {
        opacity: 0,
        y: 20,
        scale: 0.9,
      });

      gsap.set(cardRef.current, {
        opacity: 0,
        y: 60,
        scale: 0.95,
        rotateY: 15,
      });

      gsap.set(floatingIconRef.current, {
        rotation: 12,
        scale: 0,
      });

      gsap.set(statsRef.current?.children || [], {
        opacity: 0,
        scale: 0.8,
        y: 20,
      });

      gsap.set([testimonialRef.current, avatarRef.current], {
        opacity: 0,
        y: 30,
      });

      // Main timeline triggered by scroll
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top 80%",
          end: "bottom 20%",
          toggleActions: "play none none reverse",
        },
      });

      // Left side content animations
      tl.to(headingRef.current, {
        opacity: 1,
        y: 0,
        duration: 0.8,
        ease: "power3.out",
      })
        .to(
          descriptionRef.current,
          {
            opacity: 1,
            y: 0,
            duration: 0.6,
            ease: "power2.out",
          },
          "-=0.4"
        )
        .to(
          featuresRef.current?.children || [],
          {
            opacity: 1,
            x: 0,
            duration: 0.5,
            stagger: 0.1,
            ease: "power2.out",
          },
          "-=0.3"
        )
        .to(
          buttonRef.current,
          {
            opacity: 1,
            y: 0,
            scale: 1,
            duration: 0.6,
            ease: "back.out(1.7)",
          },
          "-=0.2"
        );

      // Right side card animations
      tl.to(
        cardRef.current,
        {
          opacity: 1,
          y: 0,
          scale: 1,
          rotateY: 0,
          duration: 1,
          ease: "power3.out",
        },
        "-=0.8"
      )
        .to(
          floatingIconRef.current,
          {
            scale: 1,
            duration: 0.6,
            ease: "back.out(1.7)",
          },
          "-=0.5"
        )
        .to(
          statsRef.current?.children || [],
          {
            opacity: 1,
            scale: 1,
            y: 0,
            duration: 0.4,
            stagger: 0.1,
            ease: "back.out(1.7)",
          },
          "-=0.4"
        )
        .to(
          [testimonialRef.current, avatarRef.current],
          {
            opacity: 1,
            y: 0,
            duration: 0.6,
            stagger: 0.1,
            ease: "power2.out",
          },
          "-=0.2"
        );

      // Floating animation for the icon
      gsap.to(floatingIconRef.current, {
        y: -10,
        rotation: "+=5",
        duration: 2,
        ease: "power1.inOut",
        yoyo: true,
        repeat: -1,
        delay: 1,
      });

      // Hover animations for interactive elements
      const button = buttonRef.current;
      if (button) {
        button.addEventListener("mouseenter", () => {
          gsap.to(button, {
            scale: 1.05,
            duration: 0.3,
            ease: "power2.out",
          });
        });

        button.addEventListener("mouseleave", () => {
          gsap.to(button, {
            scale: 1,
            duration: 0.3,
            ease: "power2.out",
          });
        });
      }

      // Card hover effect
      const card = cardRef.current;
      if (card) {
        card.addEventListener("mouseenter", () => {
          gsap.to(card, {
            y: -5,
            boxShadow: "0 25px 50px -12px rgba(0, 0, 0, 0.25)",
            duration: 0.4,
            ease: "power2.out",
          });
        });

        card.addEventListener("mouseleave", () => {
          gsap.to(card, {
            y: 0,
            boxShadow: "0 20px 25px -5px rgba(0, 0, 0, 0.1)",
            duration: 0.4,
            ease: "power2.out",
          });
        });
      }

      // Stats counter animation
      const statsElements = statsRef.current?.children;
      if (statsElements) {
        Array.from(statsElements).forEach((stat, index) => {
          const valueElement = stat.querySelector("p:first-child");
          if (valueElement && stats[index]) {
            const targetValue = stats[index].value;

            // Only animate numeric values
            if (targetValue.includes("+")) {
              const numericValue = parseInt(targetValue.replace("+", ""));
              gsap.fromTo(
                valueElement,
                { value: 0 },
                {
                  value: numericValue,
                  duration: 1.5,
                  delay: 0.5 + index * 0.1,
                  ease: "power2.out",
                  onUpdate: function () {
                    valueElement.textContent =
                      Math.round(this.targets()[0].value) + "+";
                  },
                  scrollTrigger: {
                    trigger: stat,
                    start: "top 85%",
                    toggleActions: "play none none none",
                  },
                }
              );
            }
          }
        });
      }
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={sectionRef}
      id="discover"
      aria-labelledby="discover-heading"
      className="overflow-hidden px-6"
    >
      <div className="container mx-auto grid grid-cols-1 md:grid-cols-2 gap-10 py-16 items-center">
        <div className="order-2 md:order-1">
          <header>
            <h2
              ref={headingRef}
              id="discover-heading"
              className="text-3xl sm:text-4xl font-bold leading-tight"
            >
              {t("title")}
            </h2>
            <p
              ref={descriptionRef}
              className="text-base sm:text-lg mt-4 text-slate-700/90"
            >
              {t("desc")}
            </p>
          </header>

          <ul ref={featuresRef} className="mt-5 flex flex-col gap-3">
            {features.map((f, i) => (
              <li key={i} className="flex items-start gap-2 text-slate-800">
                <IoCheckmarkCircleOutline
                  aria-hidden
                  className="mt-0.5 text-xl shrink-0 text-green-600"
                />
                <span>{f}</span>
              </li>
            ))}
          </ul>

          <Link
            ref={buttonRef}
            href={{ pathname: "/business-customers", hash: "contact" }}
            role="button"
            className="btn bg-accent-dark mt-6 text-white text-sm font-medium rounded-lg px-4 xl:px-6 py-3 h-auto border-none shadow-none hover:bg-accent-dark/90 transition-colors inline-flex items-center gap-2 w-full"
          >
            <GrSchedule aria-hidden className="text-base" />
            <span>{t("schedule")}</span>
            <IoIosArrowRoundForward aria-hidden className="text-xl" />
          </Link>
        </div>

        <div className="flex justify-center md:justify-end order-1 md:order-2">
          <div
            ref={cardRef}
            className="relative bg-gradient-to-tr from-slate-200 to-slate-300 p-6 rounded-xl sm:rounded-2xl w-full max-w-sm sm:max-w-md shadow-2xl"
          >
            <div
              ref={floatingIconRef}
              className="absolute right-5 lg:-right-6 -top-8 w-12 h-12 lg:w-20 lg:h-20 rounded-2xl"
              style={{
                background: "linear-gradient(135deg, #42e695 0%, #3bb2b8 100%)",
                boxShadow: "0 6px 20px 0 rgba(0,0,0,0.5)",
                zIndex: 0,
              }}
              aria-hidden
            >
              <div
                className="absolute inset-0 m-auto w-8 h-8 lg:w-12 lg:h-12 rounded-xl"
                style={{ background: "rgba(255,255,255,0.25)" }}
              />
            </div>

            <h3 className="text-2xl sm:text-3xl text-center font-bold">
              {t("card_title")}
            </h3>

            <div
              ref={statsRef}
              className="grid grid-cols-2 gap-6 sm:gap-10 mt-8"
            >
              {stats.map((s, i) => (
                <div key={i}>
                  <p className="text-2xl sm:text-3xl text-center font-bold">
                    {s.value}
                  </p>
                  <p className="text-center text-xs sm:text-sm text-slate-700/90">
                    {s.label}
                  </p>
                </div>
              ))}
            </div>

            <p
              ref={testimonialRef}
              className="text-center text-sm mt-8 text-slate-800"
            >
              {t("testimony")}
            </p>

            <div
              ref={avatarRef}
              className="flex gap-4 sm:gap-5 mt-5 items-center justify-center"
            >
              <div className="avatar">
                <div className="w-10 sm:w-12 rounded-full overflow-hidden">
                  <img
                    src="https://img.daisyui.com/images/profile/demo/yellingcat@192.webp"
                    alt="Foto profil sample"
                    loading="lazy"
                  />
                </div>
              </div>
              <div>
                <p className="font-bold text-sm sm:text-base">
                  {t("testimony_person")}
                </p>
                <p className="text-xs text-slate-700/80">
                  {t("testimony_location")}
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
