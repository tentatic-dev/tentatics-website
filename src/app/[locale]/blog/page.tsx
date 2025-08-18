import Banner from "@/components/blog/banner";
import Feature from "@/components/blog/feature";
import Section from "@/components/blog/section";
import Footer from "@/components/footer";
import Navbar from "@/components/navbar";
import { siteConfig } from "@/config/site";
import { generateSEO } from "@/lib/seo";
import { Metadata } from "next";

export const metadata: Metadata = generateSEO({
  title: "Blog",
  description: "Stay updated with the latest news and insights from Tentatics.",
  url: `${siteConfig.url}/blog`,
});

export default function page() {
  return (
    <main>
      <Navbar />
      <Banner />
      <section
        id="articles"
        className="container mx-auto px-5 py-10 grid grid-cols-1 md:grid-cols-3 min-h-screen gap-10"
      >
        <div className="col-span-2">
          <Section />
        </div>
        <div>
          <Feature />
        </div>
      </section>
      <Footer />
    </main>
  );
}
