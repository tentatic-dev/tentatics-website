import { useTranslations } from "next-intl";
import { IoIosArrowRoundForward } from "react-icons/io";
import Link from "next/link";

export default function GetToKnow() {
  const t = useTranslations("about.get_to_know");
  return (
    <section className="container my-16">
      <p className="text-primary">{t("pre_title")}</p>
      <h1 className="text-3xl sm:text-4xl font-bold text-primary-dark mb-5">
        {t("title")}
      </h1>
      <p>
        {t("desc")}
        projects and excellent development opportunities.
      </p>
      <Link
        href={{ pathname: "/business-customers", hash: "contact" }}
        className="mt-6 px-6 py-3 text-white rounded-lg bg-primary-dark flex items-center gap-2 w-fit"
      >
        {t("join_us")}
        <IoIosArrowRoundForward className="text-xl" />
      </Link>
    </section>
  );
}
