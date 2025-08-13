"use client";

import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

// Register ScrollTrigger plugin
gsap.registerPlugin(ScrollTrigger);

export default function review() {
  const sectionRef = useRef<HTMLElement>(null);
  const titleRef = useRef<HTMLHeadingElement>(null);
  const subtitleRef = useRef<HTMLParagraphElement>(null);
  const buttonsRef = useRef<HTMLDivElement>(null);
  const statsRef = useRef<HTMLDivElement>(null);

  const review = [
    "All",
    "Real estate",
    "Agencies",
    "Hospilaty",
    "Helathcare",
    "Manufactures",
    "Government",
  ];

  const client = [
    {
      value: "500+",
      desc: "Klien Puas(dummy)",
      numValue: 500,
    },
    {
      value: "50+",
      desc: "Industri Berbeda (dummy)",
      numValue: 50,
    },
    {
      value: "98%",
      desc: "Tingkat Kepuasan(dummy)",
      numValue: 98,
    },
    {
      value: "24/7",
      desc: "Dukungan Teknis",
      numValue: 24,
    },
  ];

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Animasi untuk title dan subtitle
      gsap.fromTo(
        titleRef.current,
        {
          opacity: 0,
          y: 50,
        },
        {
          opacity: 1,
          y: 0,
          duration: 1,
          ease: "power3.out",
          scrollTrigger: {
            trigger: titleRef.current,
            start: "top 80%",
            end: "bottom 20%",
            toggleActions: "play none none reverse",
          },
        }
      );

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
            end: "bottom 20%",
            toggleActions: "play none none reverse",
          },
        }
      );

      // Animasi untuk buttons
      gsap.fromTo(
        buttonsRef.current?.children || [],
        {
          opacity: 0,
          y: 20,
          scale: 0.9,
        },
        {
          opacity: 1,
          y: 0,
          scale: 1,
          duration: 0.6,
          stagger: 0.1,
          ease: "back.out(1.7)",
          scrollTrigger: {
            trigger: buttonsRef.current,
            start: "top 80%",
            end: "bottom 20%",
            toggleActions: "play none none reverse",
          },
        }
      );

      // Animasi counter untuk stats
      const statElements = statsRef.current?.children || [];
      Array.from(statElements).forEach((element, index) => {
        const valueElement = element.querySelector(".stat-value");
        const descElement = element.querySelector(".stat-desc");

        if (valueElement && descElement) {
          // Animasi untuk description
          gsap.fromTo(
            descElement,
            {
              opacity: 0,
              y: 20,
            },
            {
              opacity: 1,
              y: 0,
              duration: 0.8,
              ease: "power2.out",
              scrollTrigger: {
                trigger: element,
                start: "top 80%",
                end: "bottom 20%",
                toggleActions: "play none none none",
              },
            }
          );

          // Counter animation untuk value
          const clientData = client[index];
          const targetValue = clientData.numValue;
          const suffix = clientData.value.includes("+")
            ? "+"
            : clientData.value.includes("%")
            ? "%"
            : clientData.value.includes("/")
            ? "/7"
            : "";

          const counterObj = { value: 0 };

          gsap.to(counterObj, {
            value: targetValue,
            duration: 2,
            ease: "power2.out",
            scrollTrigger: {
              trigger: element,
              start: "top 80%",
              toggleActions: "play none none none",
            },
            onUpdate: () => {
              const currentValue = Math.round(counterObj.value);
              valueElement.textContent = currentValue + suffix;
            },
          });

          // Pulse effect untuk stats
          gsap.fromTo(
            valueElement,
            {
              scale: 0.5,
              opacity: 0,
            },
            {
              scale: 1,
              opacity: 1,
              duration: 1,
              ease: "back.out(1.7)",
              scrollTrigger: {
                trigger: element,
                start: "top 80%",
                end: "bottom 20%",
                toggleActions: "play none none reverse",
              },
            }
          );
        }
      });
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={sectionRef}
      className="bg-primary-dark py-24 flex flex-col text-center gap-12 w-full justify-center"
    >
      <div className="flex gap-2 flex-col w-full">
        <h1 ref={titleRef} className="text-3xl font-bold text-white">
          Helping Industry Leaders Transform with Technology
        </h1>
        <p ref={subtitleRef} className="text-highlight font-light">
          We help businesses grow with tailored, innovative technology
          solutions.
        </p>
      </div>

      <div ref={buttonsRef} className="flex gap-5 justify-center">
        {review.map((item, index) => (
          <button
            key={index}
            className="border border-white text-sm text-white py-1 px-5 rounded-lg cursor-pointer hover:bg-white/10 transition-colors hover:scale-105 transform duration-200"
          >
            {item}
          </button>
        ))}
      </div>

      <div ref={statsRef} className="flex flex-wrap justify-around w-full">
        {client.map((item, index) => (
          <div key={index} className="flex flex-col justify-center gap-2 mt-8">
            <h1 className="stat-value text-3xl text-highlight font-bold">
              0
              {item.value.includes("+")
                ? "+"
                : item.value.includes("%")
                ? "%"
                : item.value.includes("/")
                ? "/7"
                : ""}
            </h1>
            <p className="stat-desc text-sm text-white">{item.desc}</p>
          </div>
        ))}
      </div>
    </section>
  );
}
