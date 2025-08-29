"use client";

import { useTranslations } from "next-intl";
import { useRouter } from "next/navigation";
import { useState } from "react";
import Image from "next/image";

export default function Chat() {
  const t = useTranslations("business_customers.chat");
  const [textareaValue, setTextareaValue] = useState("");
  const router = useRouter();

  const handleSendToChat = () => {
    if (textareaValue.trim()) {
      router.push(`/chat?q=${encodeURIComponent(textareaValue.trim())}`);
    }
  };
  return (
    <section id="chat" className="bg-primary-dark xl:my-24 py-10">
      <div className="container mx-auto grid grid-cols-1 md:grid-cols-2 items-center gap-10">
        <div>
          <h1 className="text-3xl md:text-4xl font-bold text-white">
            {t("title")} <span className="text-highlight">{t("title2")}</span>
          </h1>
          <p className="text-white font-light mt-2">{t("desc")}</p>
        </div>
        <div className="flex flex-col items-center gap-3">
          <div className="relative w-full">
            <textarea
              className="textarea bg-white/15 backdrop-blur-md text-white rounded-2xl w-full h-24 sm:h-32 border-none outline-none resize-none pr-14 p-4 placeholder:text-white/70 text-sm sm:text-base active:outline-none focus:outline-none"
              placeholder={t("placeholder")}
              value={textareaValue}
              onChange={(e) => setTextareaValue(e.target.value)}
            ></textarea>

            <button
              type="button"
              onClick={handleSendToChat}
              aria-label="Kirim"
              className="absolute right-3 bottom-3 bg-primary-dark rounded-full p-2 backdrop-blur-md text-white hover:bg-white/25 transition"
            >
              <Image src="/icons/send.svg" alt="Kirim" width={20} height={20} />
            </button>
          </div>

          <div className="flex flex-wrap flex-col md:flex-row gap-3 w-full">
            <button
              type="button"
              className="rounded-full px-3 py-2 bg-[#f1f8a9] text-black/80 shadow text-xs md:text-sm text-center cursor-pointer"
              onClick={() => setTextareaValue(t("question1"))}
            >
              {t("question1")}
            </button>
            <button
              type="button"
              className="rounded-full px-3 py-2 bg-[#f1f8a9] text-black/80 shadow text-xs md:text-sm text-center cursor-pointer"
              onClick={() => setTextareaValue(t("question2"))}
            >
              {t("question2")}
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}
