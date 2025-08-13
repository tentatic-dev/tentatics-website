"use client";

import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

// Register ScrollTrigger plugin
gsap.registerPlugin(ScrollTrigger);

export default function Solutions() {
  const sectionRef = useRef<HTMLElement>(null);
  const titleRef = useRef<HTMLHeadingElement>(null);
  const subtitleRef = useRef<HTMLParagraphElement>(null);
  const productsRef = useRef<HTMLDivElement>(null);

  const products = [
    {
      icon: "/icons/360_black.svg",
      title: "360 Virtual Tour",
      desc: "Immersive 360° property experiences that engage prospects and accelerate sales decisions.",
    },
    {
      icon: "/icons/ai_black.svg",
      title: "AI Automation",
      desc: "Intelligent agents that handle WhatsApp responses, lead assessment, and task scheduling",
    },
    {
      icon: "/icons/crm_black.svg",
      title: "CRM Integration",
      desc: "Seamless integration with leading CRM platforms for enhanced client management.",
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
    <section
      ref={sectionRef}
      className="bg-white py-12 flex flex-col text-center gap-8 w-full justify-center"
    >
      <div className="flex gap-2 flex-col w-full">
        <h1 ref={titleRef} className="text-3xl font-bold text-primary-dark">
          Comprehensive Digital Solutions
        </h1>
        <p ref={subtitleRef} className="text-sm text-primary">
          From virtual tours to AI automation, we provide everything you <br />
          need for modern property management.
        </p>
      </div>
      <div
        ref={productsRef}
        className="grid grid-cols-1 md:grid-cols-3 gap-4 px-16 md:px-32"
      >
        {products.map((product, index) => (
          <div
            key={index}
            className="flex flex-col items-center cursor-pointer transition-all duration-300"
          >
            <img
              src={product.icon}
              alt={product.title}
              className="product-icon w-8 h-8 my-8"
            />
            <h2 className="product-title text-lg font-semibold text-primary-dark">
              {product.title}
            </h2>
            <p className="product-desc text-sm w-64 mt-2">{product.desc}</p>
          </div>
        ))}
      </div>
    </section>
  );
}
