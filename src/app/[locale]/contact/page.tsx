import Image from "next/image";
import Footer from "@/components/footer";
import { FiBell } from "react-icons/fi";
import Link from "next/link";

import { siteConfig } from "@/config/site";
import { generateSEO } from "@/lib/seo";
import { Metadata } from "next";
import Contact from "@/components/contact/contact";

export const metadata: Metadata = generateSEO({
  title: "Contact",
  description: "Get in touch with Tentatics for any inquiries or support.",
  url: `${siteConfig.url}/contact`,
});

export default function Page() {
  return (
    <main>
      <div className="min-h-screen py-5 px-0 md:p-8">
        {/* Logo */}
        <Link href="/" className="cursor-pointer">
          <Image
            src="/logo-only.svg"
            alt="Logo Tentatics"
            className="w-40 md:w-56 h-auto mx-auto py-6 md:py-10"
            width={1200}
            height={400}
            priority
          />
        </Link>

        {/* Announcement */}
        <div className="container mx-auto">
          <div className="flex items-start gap-3 rounded-xl bg-highlight text-slate-600 px-4 py-8">
            <FiBell className="mt-0.5 shrink-0" />
            <p className="text-sm md:text-base">
              <strong>New this August:</strong> Experience our company’s
              innovation and fresh inspiration that will excite you.
            </p>
          </div>
        </div>

        {/* Content */}
        <Contact />
      </div>
      <Footer />
    </main>
  );
}
