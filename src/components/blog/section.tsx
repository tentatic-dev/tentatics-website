import { useTranslations } from "next-intl";

export default function Section() {
  const t = useTranslations("article");
  return (
    <>
      <div className="flex items-center justify-center gap-10">
        <h1 className="text-2xl sm:text-3xl font-bold mb-4 flex-shrink-0">
          {t("section-1")}
        </h1>
        <hr className="border w-full " />
      </div>

      <div className="flex items-center justify-center h-full">
        <p className="text-lg sm:text-xl">Coming Soon</p>
      </div>
    </>
  );
}
