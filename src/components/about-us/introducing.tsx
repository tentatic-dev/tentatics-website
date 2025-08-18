// src/components/about-us/introducing.tsx
import { useTranslations } from "next-intl";
import Image from "next/image";
import Link from "next/link";
import { FiArrowUpRight } from "react-icons/fi";

const images = {
  miracleRay: "/about/miracle-ray.png",
  peterShaan: "/about/peter-shaan.jpg",
};

const teamMembers = [
  {
    name: "Miracle Ray",
    role: "Founder & CEO",
    image: images.miracleRay,
    link: "https://www.linkedin.com/in/christian-miracle-rumawung-8845b2207/",
  },
  {
    name: "Peter Shaan",
    role: "Co Founder & CTO",
    image: images.peterShaan,
    link: "https://www.linkedin.com/in/petershaan/",
  },
];

export default function Introducing() {
  const t = useTranslations("about.introducing");
  return (
    <section
      id="introducing"
      className="relative bg-primary-dark overflow-hidden"
    >
      <div
        aria-hidden
        className="pointer-events-none absolute inset-y-0 left-0 hidden lg:block w-1/3 bg-[url('/about/pattern.svg')] bg-no-repeat bg-left bg-contain opacity-20"
      />
      <div
        aria-hidden
        className="pointer-events-none absolute inset-y-0 right-0 hidden lg:block w-1/3 bg-[url('/about/pattern.svg')] bg-no-repeat bg-right bg-contain opacity-20"
      />

      <div className="relative z-10 container mx-auto px-5 mt-32 mb-28 lg:pb-40 text-center">
        <p className="text-lg mb-3 font-light text-highlight">{t("title")}</p>
        <h2 className="text-3xl sm:text-4xl font-bold text-white mb-10">
          {t("desc")}
        </h2>

        <div className="grid grid-cols-2 gap-16 max-w-xl mx-auto">
          {teamMembers.map((member) => (
            <div key={member.name} className="flex flex-col">
              <div className="relative w-full aspect-[4/5] overflow-hidden ">
                <Image
                  src={member.image}
                  alt={member.name}
                  fill
                  sizes="(max-width: 640px) 90vw, (max-width: 1024px) 45vw, 400px"
                  className="object-cover"
                  priority
                />
              </div>

              <Link
                href={member.link}
                target="_blank"
                className="flex  justify-between w-full mt-4"
              >
                <h5 className="font-bold text-xl text-white">{member.name}</h5>
                <FiArrowUpRight className="text-highlight text-2xl" />
              </Link>
              <p className="text-highlight text-left">{member.role}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
