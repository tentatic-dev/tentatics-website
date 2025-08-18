import { useTranslations } from "next-intl";
import Image from "next/image";
import Link from "next/link";
import { GrSchedule } from "react-icons/gr";
import { IoIosArrowRoundForward } from "react-icons/io";
import { IoCheckmarkCircleOutline } from "react-icons/io5";

export default function Banner() {
  const t = useTranslations("business_customers.banner");
  const features = t.raw("features") as string[];
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

      <div className="relative container mt-20 mb-28 mx-auto grid grid-cols-1 md:grid-cols-2 space-x-10 space-y-10 py-24 items-center px-16">
        <div className="flex justify-center md:justify-end">
          <Image
            src={"/landing-4.jpg"}
            alt="Landing Image"
            width={500}
            height={500}
            className="object-contain rounded-2xl w-full"
          />
        </div>
        <div>
          <div className="text-white">
            <h2
              id="discover-heading"
              className="text-3xl sm:text-4xl font-bold leading-tight "
            >
              {t("title")}
            </h2>
            <p className="text-base sm:text-lg mt-4">{t("desc")}</p>
          </div>

          <ul className="mt-5 flex flex-col gap-3 text-white">
            {features.map((f, i) => (
              <li key={i} className="flex items-start gap-2 ">
                <IoCheckmarkCircleOutline
                  aria-hidden
                  className="mt-0.5 text-xl shrink-0 "
                />
                <span>{f}</span>
              </li>
            ))}
          </ul>

          <Link
            href="/"
            role="button"
            className="btn bg-highlight mt-6 text-primary-dark text-sm font-medium rounded-lg px-4 xl:px-6 py-3 h-auto border-none shadow-none hover:bg-highlight/50 transition-colors inline-flex items-center gap-2 w-full"
          >
            <GrSchedule aria-hidden className="text-base" />
            <span>{t("schedule")}</span>
            <IoIosArrowRoundForward aria-hidden className="text-xl" />
          </Link>
        </div>
      </div>
    </section>
  );
}
