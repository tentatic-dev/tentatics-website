import GetToKnow from "@/components/about-us/get-to-know";
import Introducing from "@/components/about-us/introducing";
import Testimony from "@/components/about-us/testimony";
import WhatDefineUs from "@/components/about-us/what-define-us";
import Footer from "@/components/footer";
import Navbar from "@/components/navbar";
import { siteConfig } from "@/config/site";
import { generateSEO } from "@/lib/seo";
import { Metadata } from "next";

export const metadata: Metadata = generateSEO({
  title: "About Us",
  description:
    "Learn more about Tentatics, our mission, and the team behind our success.",
  url: `${siteConfig.url}/about-us`,
});

export default function Page() {
  return (
    <main className="min-h-screen mx-auto">
      <Navbar variant={2} />
      <Introducing />
      <WhatDefineUs />
      <GetToKnow />
      <Testimony />
      <Footer />
    </main>
  );
}
