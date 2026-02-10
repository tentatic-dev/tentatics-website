"use client";

import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useTranslations } from "next-intl";

// Register ScrollTrigger plugin
gsap.registerPlugin(ScrollTrigger);

export default function Solutions() {
  const sectionRef = useRef<HTMLElement>(null);
  const titleRef = useRef<HTMLHeadingElement>(null);
  const subtitleRef = useRef<HTMLParagraphElement>(null);
  const productsRef = useRef<HTMLDivElement>(null);
  const t = useTranslations("home.solution");

  const products = [
    {
      icon: "/icons/software_black.svg",
      title: t("software.title"),
      desc: t("software.desc"),
    },
    {
      icon: "/icons/integration_black.svg",
      title: t("integration.title"),
      desc: t("integration.desc"),
    },
    {
      icon: "/icons/ai_black.svg",
      title: t("ai.title"),
      desc: t("ai.desc"),
    },
  ];

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Animasi untuk title
      gsap.fromTo(
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
          duration: 1,
          ease: "power3.out",
          scrollTrigger: {
            trigger: titleRef.current,
            start: "top 80%",
            toggleActions: "play none none none",
          },
        }
      );

      // Animasi untuk subtitle
      gsap.fromTo(
        subtitleRef.current,
        {
          opacity: 0,
          y: 30,
        },
        {
          opacity: 1,
          y: 0,
          duration: 0.8,
          ease: "power2.out",
          scrollTrigger: {
            trigger: subtitleRef.current,
            start: "top 80%",
            toggleActions: "play none none none",
          },
        }
      );

      // Animasi untuk product cards
      const productCards = productsRef.current?.children || [];
      gsap.fromTo(
        productCards,
        {
          opacity: 0,
          y: 60,
          scale: 0.8,
          rotation: 5,
        },
        {
          opacity: 1,
          y: 0,
          scale: 1,
          rotation: 0,
          duration: 1,
          stagger: 0.2,
          ease: "back.out(1.7)",
          scrollTrigger: {
            trigger: productsRef.current,
            start: "top 80%",
            toggleActions: "play none none none",
          },
        }
      );

      // Floating animation untuk icons
      Array.from(productCards).forEach((card, index) => {
        const icon = card.querySelector(".product-icon");
        const title = card.querySelector(".product-title");
        const desc = card.querySelector(".product-desc");

        // Icon floating animation
        gsap.to(icon, {
          y: -8,
          duration: 2 + index * 0.3,
          ease: "power1.inOut",
          yoyo: true,
          repeat: -1,
          delay: index * 0.5,
        });

        // Hover animations
        card.addEventListener("mouseenter", () => {
          gsap.to(card, {
            scale: 1.05,
            y: -10,
            duration: 0.3,
            ease: "power2.out",
          });

          gsap.to(icon, {
            scale: 1.2,
            rotation: 360,
            duration: 0.6,
            ease: "back.out(1.7)",
          });

          gsap.to([title, desc], {
            y: -5,
            duration: 0.3,
            ease: "power2.out",
          });
        });

        card.addEventListener("mouseleave", () => {
          gsap.to(card, {
            scale: 1,
            y: 0,
            duration: 0.3,
            ease: "power2.out",
          });

          gsap.to(icon, {
            scale: 1,
            rotation: 0,
            duration: 0.4,
            ease: "power2.out",
          });

          gsap.to([title, desc], {
            y: 0,
            duration: 0.3,
            ease: "power2.out",
          });
        });
      });

      // Reveal animation untuk text elements
      Array.from(productCards).forEach((card, index) => {
        const title = card.querySelector(".product-title");
        const desc = card.querySelector(".product-desc");

        gsap.fromTo(
          [title, desc],
          {
            opacity: 0,
            y: 20,
          },
          {
            opacity: 1,
            y: 0,
            duration: 0.8,
            stagger: 0.1,
            ease: "power2.out",
            delay: 0.3 + index * 0.2,
            scrollTrigger: {
              trigger: card,
              start: "top 80%",
              end: "bottom 20%",
              toggleActions: "play none none reverse",
            },
          }
        );
      });
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section ref={sectionRef} className="bg-white py-14 sm:py-16">
      <div className="container mx-auto flex flex-col justify-center text-center gap-8">
        <div className="flex flex-col w-full">
          <h1
            ref={titleRef}
            className="text-2xl sm:text-3xl font-bold text-primary-dark"
          >
            {t("title")}
          </h1>
          <p
            ref={subtitleRef}
            className="text-sm sm:text-base text-primary mt-2"
          >
            {t("desc")}
            <br className="hidden sm:block" />
            {t("desc2")}
          </p>
        </div>
        <div
          ref={productsRef}
          className="grid grid-cols-1 md:grid-cols-3 gap-5 sm:gap-6"
        >
          {products.map((product, i) => (
            <div
              key={i}
              className="product-card flex flex-col items-center cursor-pointer transition-all duration-300 rounded-xl p-6 sm:p-7"
            >
              <img
                src={product.icon}
                alt={product.title}
                className="product-icon w-8 h-8 my-8"
                loading="lazy"
              />
              <h2 className="product-title text-lg sm:text-xl font-semibold text-primary-dark">
                {product.title}
              </h2>
              <p className="product-desc text-sm max-w-xs mt-2 text-slate-700/90">
                {product.desc}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
