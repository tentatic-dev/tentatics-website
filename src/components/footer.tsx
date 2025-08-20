"use client";

import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import { FaLinkedin, FaTwitter, FaFacebook, FaInstagram } from "react-icons/fa";
import { HiLocationMarker, HiPhone, HiMail } from "react-icons/hi";
import { useTranslations } from "next-intl";
import { siteConfig } from "@/config/site";
import { toast } from "react-toastify";

export default function Footer() {
  const [email, setEmail] = useState("");
  const t = useTranslations("footer");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      const response = await fetch("/api/newsletter", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email }),
      });

      const result = await response.json();

      if (result.success) {
        toast.success("Thank you for subscribing to our newsletter!");
        setEmail("");
      } else {
        toast.error("Failed to subscribe. Please try again.");
      }
    } catch (error) {
      console.error("Error subscribing to newsletter:", error);
      toast.error("An error occurred. Please try again.");
    }
  };

  const platformLinks = t.raw("platformLinks") as Array<{
    label: string;
    url: string;
  }>;
  const companyLinks = t.raw("companyLinks") as Array<{
    label: string;
    url: string;
  }>;
  const resourceLinks = t.raw("resourceLinks") as Array<{
    label: string;
    url: string;
  }>;
  const legalLinks = t.raw("legalLinks") as Array<{
    label: string;
    url: string;
  }>;

  const socialLinks = [
    {
      icon: <FaLinkedin className="text-2xl" />,
      href: siteConfig.social.linkedin,
    },
    {
      icon: <FaTwitter className="text-2xl" />,
      href: siteConfig.social.twitter,
    },
    { icon: <FaFacebook className="text-2xl" />, href: "#" },
    {
      icon: <FaInstagram className="text-2xl" />,
      href: siteConfig.social.instagram,
    },
  ];

  return (
    <footer className="bg-primary-dark text-white relative overflow-hidden">
      <div className="absolute inset-0 opacity-10">
        <div className="absolute right-0 top-0 w-96 h-96 bg-gradient-to-l from-white/20 to-transparent rounded-full translate-x-32 -translate-y-32"></div>
        <div className="absolute right-20 bottom-20 w-64 h-64 bg-gradient-to-l from-white/10 to-transparent rounded-full"></div>
      </div>

      <div className="container mx-auto py-12 relative z-10">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {/* Company Info */}
          <div>
            <Image
              src="/logo-tentatics-white.svg"
              alt="Tentatics Logo"
              width={200}
              height={60}
              className="mb-4"
            />
            <p className="text-gray-300 mb-6 max-w-sm font-light text-sm">
              {t("desc")}
            </p>

            <div className="space-y-3 text-sm">
              <div className="flex items-start gap-3">
                <HiLocationMarker className="mt-1 text-lg" />
                <div>
                  <p className="font-medium">{siteConfig.location}</p>
                  <p className="text-gray-300">{t("location")}</p>
                </div>
              </div>
              <div className="flex items-center gap-3">
                <HiPhone className="text-lg" />
                <div>
                  <p className="font-medium">{siteConfig.phone}</p>
                  <p className="text-gray-300">{t("phone_support")}</p>
                </div>
              </div>
              <div className="flex items-center gap-3">
                <HiMail className="text-lg" />
                <div>
                  <p className="font-medium">{siteConfig.email}</p>
                  <p className="text-gray-300">{t("mail_support")}</p>
                </div>
              </div>
            </div>
          </div>

          {/* Platform */}
          <FooterList title="Platform" items={platformLinks} />

          {/* Company & Resources */}
          <div>
            <FooterList title="Company" items={companyLinks} />
            <FooterList
              title="Resources"
              items={resourceLinks}
              className="mt-6"
            />
          </div>

          {/* Newsletter & Legal */}
          <div>
            <h3 className="font-semibold text-lg mb-4">Stay Updated</h3>
            <form onSubmit={handleSubmit} className="mb-6">
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder={t("email_placeholder")}
                className="w-full px-4 py-3 rounded-full bg-white text-slate-700 placeholder-gray-300 focus:outline-none focus:ring-2 focus:ring-white/30 mb-2"
                required
              />
              <p className="text-xs text-gray-300 italic">
                {t("placeholder_email")}
              </p>
            </form>

            <FooterList title="Legal" items={legalLinks} />

            <div className="flex gap-6 mt-6">
              {socialLinks.map((s, i) => (
                <Link key={i} href={s.href} className="hover:text-highlight">
                  {s.icon}
                </Link>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Bottom Section */}
      <div className="border-t border-white/20 mt-12 py-4">
        <div className="container mx-auto flex flex-col md:flex-row justify-between items-center gap-4">
          <p className="text-gray-300 text-sm">{t("copyright1")}</p>
          <div className="flex items-center gap-2">
            <span className="w-2 h-2 bg-green-400 rounded-full"></span>
            <span className="text-gray-300 text-sm">{t("copyright2")}</span>
          </div>
        </div>
      </div>
    </footer>
  );
}

function FooterList({
  title,
  items,
  className = "",
}: {
  title: string;
  items: Array<{
    label: string;
    url: string;
  }>;
  className?: string;
}) {
  return (
    <div className={className}>
      <h3 className="font-semibold text-lg mb-4">{title}</h3>
      <ul className="space-y-3 text-gray-300 text-sm">
        {items.map((item, idx) => (
          <li key={idx}>
            <Link
              href={item.url}
              className="hover:text-highlight transition-colors"
            >
              {item.label}
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
}
