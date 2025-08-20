"use client";

import { useState, FormEvent, useEffect } from "react";
import Image from "next/image";
import { useTranslations } from "next-intl";
import { FiArrowUpRight } from "react-icons/fi";
import { usePathname } from "next/navigation";
import { toast } from "react-toastify";

type ServiceFor = "me" | "company";

export default function Contact() {
  const t = useTranslations("business_customers.contact");
  const [serviceFor, setServiceFor] = useState<ServiceFor>("me");
  const [loading, setLoading] = useState(false);

  const pathname = usePathname();

  useEffect(() => {
    if (window.location.hash) {
      const el = document.querySelector(window.location.hash);
      if (el) {
        el.scrollIntoView({ behavior: "smooth" });
      }
    }
  }, [pathname]);

  async function onSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const form = e.currentTarget;
    const data = {
      fullName: (form.elements.namedItem("fullName") as HTMLInputElement).value,
      email: (form.elements.namedItem("email") as HTMLInputElement).value,
      message: (form.elements.namedItem("message") as HTMLTextAreaElement)
        .value,
      serviceFor,
      requestFreeQuota: true,
    };

    try {
      setLoading(true);
      const response = await fetch("/api/email", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      });
      const result = await response.json();
      if (result.success) {
        toast.success("Thanks! We'll get back to you soon.");
      } else {
        toast.error("Failed to submit form. Please try again.");
      }
    } catch (error) {
      console.error("Error submitting form:", error);
      toast.error("An error occurred. Please try again.");
    } finally {
      setLoading(false);
    }
  }

  return (
    <section id="contact" className="">
      <div className="grid grid-cols-1 md:grid-cols-3 items-center">
        <div className="px-5 md:px-32 py-10 col-span-2 gap-5">
          <h1 className="text-3xl sm:text-4xl font-bold text-primary-dark">
            {t("title")}
          </h1>

          <form onSubmit={onSubmit} className="mt-6">
            {/* Full name */}
            <label
              htmlFor="fullName"
              className="block text-sm font-medium text-primary-dark"
            >
              {t("full_name")}
            </label>
            <input
              id="fullName"
              name="fullName"
              type="text"
              required
              placeholder={t("full_name_placeholder")}
              className="mt-1 w-full rounded-md border border-gray-300 bg-gray-100/50 px-4 py-3 outline-none focus:border-primary-dark"
            />

            {/* Email */}
            <label
              htmlFor="email"
              className="mt-4 block text-sm font-medium text-primary-dark"
            >
              {t("email")}
            </label>
            <input
              id="email"
              name="email"
              type="email"
              required
              placeholder={t("email_placeholder")}
              className="mt-1 w-full rounded-md border border-gray-300 bg-gray-100/50 px-4 py-3 outline-none focus:border-primary-dark"
            />

            {/* Message */}
            <label
              htmlFor="message"
              className="mt-4 block text-sm font-medium text-primary-dark"
            >
              {t("message")}
            </label>
            <textarea
              id="message"
              name="message"
              rows={4}
              placeholder={t("message_placeholder")}
              className="mt-1 w-full rounded-md border border-gray-300 bg-gray-100/50 px-4 py-3 outline-none focus:border-primary-dark"
            />

            {/* Radio: service for */}
            <p className="mt-4 text-sm font-medium text-primary-dark">
              {t("who_this_service_for")}
            </p>
            <div className="mt-2 flex items-center gap-6">
              <RadioOption
                id="forMe"
                label={t("for_me") || "For Me"}
                checked={serviceFor === "me"}
                onChange={() => setServiceFor("me")}
              />
              <RadioOption
                id="forCompany"
                label={t("for_my_company") || "For My Company"}
                checked={serviceFor === "company"}
                onChange={() => setServiceFor("company")}
                muted
              />
            </div>

            {/* Submit */}
            <button
              type="submit"
              disabled={loading}
              className="mt-6 inline-flex w-full items-center justify-center gap-2 rounded-md bg-primary-dark px-6 py-3 text-white disabled:opacity-60"
            >
              {t("request")}
              <FiArrowUpRight />
            </button>
          </form>
        </div>
        <Image
          src="/business_customers/contact.png"
          alt="Tentatics contact promo"
          width={640}
          height={800}
          className="h-full w-full object-cover"
          priority
        />
      </div>
    </section>
  );
}

/** Radio bulat custom agar mirip mockup */
function RadioOption({
  id,
  label,
  checked,
  onChange,
  muted = false,
}: {
  id: string;
  label: string;
  checked: boolean;
  onChange: () => void;
  muted?: boolean;
}) {
  return (
    <label
      htmlFor={id}
      className="flex cursor-pointer items-center gap-3 select-none"
    >
      <input
        id={id}
        type="radio"
        className="sr-only"
        checked={checked}
        onChange={onChange}
      />
      <span
        aria-hidden
        className={[
          "grid h-5 w-5 place-items-center rounded-full border",
          checked ? "border-primary-dark" : "border-gray-300",
          checked ? "bg-white" : "bg-gray-100",
        ].join(" ")}
      >
        <span
          className={[
            "h-2.5 w-2.5 rounded-full",
            checked ? "bg-primary-dark" : "bg-transparent",
          ].join(" ")}
        />
      </span>
      <span
        className={`text-sm ${
          muted && !checked ? "text-gray-400" : "text-primary-dark"
        }`}
      >
        {label}
      </span>
    </label>
  );
}
