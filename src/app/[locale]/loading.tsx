import { useTranslations } from "next-intl";

export default function Loading() {
  const t = useTranslations("loading");
  return (
    <section className="min-h-screen flex items-center justify-center bg-base-100 bg-gradient-to-br from-primary/10 to-secondary/10">
      <div className="flex flex-col items-center">
        <div className="flex space-x-2">
          <span className="loading loading-ball loading-xl"></span>
          <span className="loading loading-ball loading-xl"></span>
          <span className="loading loading-ball loading-xl"></span>
        </div>
        <p className="text-xl text-center mt-5">{t("desc")}</p>
      </div>
    </section>
  );
}
