"use client";
import { useTranslations } from "next-intl";
import Link from "next/link";

export default function Footer() {
  const t = useTranslations("chat");
  return (
    <ul className="flex justify-center gap-10 items-center text-white font-light text-sm">
      <li>
        <Link href="/privacy" className="hover:text-highlight">
          {t("policy_privacy")}
        </Link>
      </li>
      <li>
        <Link href="/about-us" className="hover:text-highlight">
          {t("about_is")}
        </Link>
      </li>
    </ul>
  );
}
