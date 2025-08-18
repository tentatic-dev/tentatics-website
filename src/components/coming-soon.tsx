"use client";
import { useTranslations } from "use-intl";

export default function ComingSoon() {
  const t = useTranslations("coming-soon");
  return (
    <section
      id="coming-soon"
      className="container mx-auto py-16 text-center min-h-screen bg-primary-dark
      flex flex-col items-center justify-center text-white"
    >
      <h2 className="text-3xl font-bold mb-4">{t("title")}</h2>
      <p className="text-lg">{t("desc")}</p>
    </section>
  );
}
