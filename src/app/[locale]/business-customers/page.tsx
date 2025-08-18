import Banner from "@/components/business-customers/banner";
import Chat from "@/components/business-customers/chat";
import Contact from "@/components/business-customers/contact";
import FAQ from "@/components/business-customers/faq";
import Help from "@/components/business-customers/help";
import How from "@/components/business-customers/how";
import Footer from "@/components/footer";
import Projects from "@/components/home/projects";
import Navbar from "@/components/navbar";
import { siteConfig } from "@/config/site";
import { generateSEO } from "@/lib/seo";
import { Metadata } from "next";

export const metadata: Metadata = generateSEO({
  title: "Business Customers",
  description:
    "Discover how Tentatics can help your business thrive with our tailored solutions and expert support.",
  url: `${siteConfig.url}/business-customers`,
});

export default function page() {
  return (
    <main className="min-h-screen mx-auto">
      <Navbar variant={2} />
      <Banner />
      <Help />
      <How />
      <Chat />
      <FAQ />
      <Projects />
      <Contact />
      <Footer />
    </main>
  );
}
