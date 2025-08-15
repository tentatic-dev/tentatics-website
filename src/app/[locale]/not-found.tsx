import Link from "next/link";
import { useTranslations } from "next-intl";
import { Metadata } from "next";
import { generateSEO } from "@/lib/seo";
import Navbar from "@/components/navbar";
import Footer from "@/components/footer";

export const metadata: Metadata = generateSEO({
  title: "404 - Page Not Found",
  description: "The page you are looking for does not exist.",
  noIndex: true,
});

export default function NotFound() {
  const t = useTranslations("not_found");
  return (
    <>
      <section className="min-h-screen flex items-center justify-center bg-base-100 bg-gradient-to-br from-primary/10 to-secondary/10">
        <div className="flex flex-col items-center">
          <h1 className="text-9xl font-semibold text-primary animate-bounce">
            404
          </h1>
          <p className="text-xl text-center mt-5">
            {t("desc1")} <br />
            <span className="text-sm text-gray-500">{t("desc2")}</span>
          </p>
          <Link href="/" className="mt-8 px-6 py-2 ">
            {t("go_back")}
          </Link>
        </div>
      </section>
    </>
  );
}
