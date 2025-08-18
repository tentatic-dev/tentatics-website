import { useTranslations } from "next-intl";

export default function Feature() {
  const t = useTranslations("article");
  return (
    <>
      <div className="flex items-center gap-10 justify-center">
        <h1 className="text-2xl sm:text-3xl font-bold mb-4">{t("feature")}</h1>
        <hr className="border w-full" />
      </div>
      <div className="flex items-center justify-center h-full">
        <p className="text-lg sm:text-xl">Coming Soon</p>
      </div>
    </>
  );
}
