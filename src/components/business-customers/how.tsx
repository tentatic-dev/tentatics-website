import { useTranslations } from "next-intl";

export default function How() {
  const t = useTranslations("business_customers.how");

  return (
    <section id="how" className="py-16 container">
      <h2
        id="discover-heading"
        className="text-3xl sm:text-4xl font-bold max-w-sm "
      >
        {t("title")}
      </h2>
      <p className="text- base sm:text-lg mt-4 text-accent">{t("desc")}</p>
    </section>
  );
}
