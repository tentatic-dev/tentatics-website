import Image from "next/image";
import Link from "next/link";
import type { Metadata } from "next";
import { generateSEO } from "@/lib/seo";
import { siteConfig } from "@/config/site";
import { ChatProvider } from "@/components/chat/chat-provider";
import Chatbox from "@/components/chat/chatbox";
import Textbox from "@/components/chat/textbox";
import { useTranslations } from "next-intl";

export const metadata: Metadata = generateSEO({
  title: "Chat with Us",
  description: `Chat with us and get instant answers to your questions.`,
  url: `${siteConfig.url}/chat`,
});

export default function Page({
  searchParams,
}: {
  searchParams: { [key: string]: string | string[] | undefined };
}) {
  const q = typeof searchParams.q === "string" ? searchParams.q : undefined;
  const sendFlag =
    typeof searchParams.send === "string" ? searchParams.send : undefined;
  const autoSend = sendFlag === "1" || sendFlag === "true";
  const t = useTranslations("chat");

  return (
    <ChatProvider initialQuery={q ?? null} autoSend={autoSend}>
      <section className="min-h-screen bg-primary-dark bg-[url('/landing/landing-1.png')] bg-cover bg-no-repeat bg-center flex flex-col">
        <Link
          href={"/"}
          className="bg-white/15 backdrop-blur py-5 fixed top-0 left-0 right-0 z-50"
        >
          <Image
            src="/logo-tentatics-white.svg"
            alt="Tentatics logo"
            width={160}
            height={40}
            className="w-24 md:w-32 h-auto mx-auto"
            priority
          />
        </Link>
        <div className="absolute inset-0 bg-primary/60 z-20" />

        <div className="flex flex-col h-[68vh] relative z-30 mt-30">
          <Chatbox />
        </div>

        <div className="fixed bottom-0 left-0 right-0 z-30 px-5 py-4">
          <Textbox placeholder={t("placeholder")} />
          <ul className="flex justify-center gap-10 items-center text-white font-light text-sm">
            <li>
              <Link href="/privacy" className="hover:text-highlight">
                {t("policy_privacy")}
              </Link>
            </li>
            <li>
              <Link href="/about" className="hover:text-highlight">
                {t("about_is")}
              </Link>
            </li>
          </ul>
        </div>
      </section>
    </ChatProvider>
  );
}
