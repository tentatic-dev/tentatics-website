"use client";

import Link from "next/link";
import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

// Register ScrollTrigger plugin
gsap.registerPlugin(ScrollTrigger);

const projects = [
  {
    image: "/projects/real-estate.jpg",
    title: "Real Estate",
    desc: "Rata-rata pengurangan waktu untuk closing deal",
    url: "/real-estate",
    color: "#1736FF",
  },
  {
    image: "/projects/hospitality.jpg",
    title: "Hospitality",
    desc: "Peningkatan interaksi pembeli dengan properti",
    url: "/hospitality",
    color: "#B917FF",
  },
  {
    image: "/projects/malls.jpg",
    title: "Shopping Mall",
    desc: "Prospek lebih berkualitas melalui AI dan otomasi",
    url: "/shopping-mall",
    color: "#00A23B",
  },
  {
    image: "/projects/manufacturing.jpg",
    title: "Manufacturing",
    desc: "Penghematan operasional dan efisiensi proses",
    url: "/manufacturing",
    color: "#87A200",
  },
];

export default function Projects() {
  const sectionRef = useRef<HTMLElement>(null);
  const titleRef = useRef<HTMLHeadingElement>(null);
  const subtitleRef = useRef<HTMLParagraphElement>(null);
  const gridRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Animasi untuk title
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
            end: "bottom 20%",
            toggleActions: "play none none reverse",
          },
        }
      );

      // Animasi untuk project cards
      gsap.fromTo(
        gridRef.current?.children || [],
        {
          opacity: 0,
          y: 60,
          scale: 0.8,
          rotationY: 15,
        },
        {
          opacity: 1,
          y: 0,
          scale: 1,
          rotationY: 0,
          duration: 1,
          stagger: 0.2,
          ease: "back.out(1.7)",
          scrollTrigger: {
            trigger: gridRef.current,
            start: "top 80%",
            toggleActions: "play none none none",
          },
        }
      );

      // Hover animations untuk project cards
      const projectCards = gridRef.current?.children || [];
      Array.from(projectCards).forEach((card) => {
        const overlay = card.querySelector(".color-overlay");
        const content = card.querySelector(".project-content");
        const detailBtn = card.querySelector(".detail-btn");

        // Hover in
        card.addEventListener("mouseenter", () => {
          gsap.to(card, {
            scale: 1.05,
            y: -10,
            duration: 0.3,
            ease: "power2.out",
          });

          gsap.to(overlay, {
            opacity: 0.5,
            duration: 0.3,
            ease: "power2.out",
          });

          gsap.to(content, {
            y: -5,
            duration: 0.3,
            ease: "power2.out",
          });

          gsap.to(detailBtn, {
            scale: 1.1,
            duration: 0.2,
            ease: "power2.out",
          });
        });

        // Hover out
        card.addEventListener("mouseleave", () => {
          gsap.to(card, {
            scale: 1,
            y: 0,
            duration: 0.3,
            ease: "power2.out",
          });

          gsap.to(overlay, {
            opacity: 0.9,
            duration: 0.3,
            ease: "power2.out",
          });

          gsap.to(content, {
            y: 0,
            duration: 0.3,
            ease: "power2.out",
          });

          gsap.to(detailBtn, {
            scale: 1,
            duration: 0.2,
            ease: "power2.out",
          });
        });
      });
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={sectionRef}
      className="bg-primary-dark p-24 flex flex-col text-center gap-12 w-full justify-center"
    >
      <div className="flex gap-2 flex-col w-full">
        <h1 ref={titleRef} className="text-3xl font-bold text-white">
          Project of Tentatics
        </h1>
        <p ref={subtitleRef} className="text-highlight font-light">
          See how property professionals elevate their business with Tentatics.
        </p>
      </div>

      <div
        ref={gridRef}
        className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10"
      >
        {projects.map((project) => (
          <div
            key={project.title}
            className="bg-white p-4 rounded-lg shadow flex items-end relative overflow-hidden cursor-pointer"
            style={{
              backgroundImage: `url(${project.image})`,
              backgroundSize: "cover",
              backgroundPosition: "center",
              height: "280px",
            }}
          >
            {/* Color overlay */}
            <div
              className="color-overlay absolute inset-0 transition-opacity duration-300"
              style={{ backgroundColor: `${project.color}80` }}
            ></div>

            {/* Item */}
            <div className="project-content bg-[#ECECEC]/20 backdrop-blur-lg rounded-lg border border-white text-white p-3 relative z-10 w-full">
              <h2 className="text-xl font-semibold text-start">
                {project.title}
              </h2>
              <div className="flex mt-2 items-center gap-5">
                <p className="text-sm text-start flex-1">{project.desc}</p>
                <Link
                  href={project.url}
                  className="detail-btn bg-black/50 backdrop-blur-lg text-xs px-3 py-2 rounded transition-transform duration-200"
                >
                  Details
                </Link>
              </div>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
