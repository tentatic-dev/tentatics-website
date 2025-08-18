import Article from "@/components/blog/article";
import Footer from "@/components/footer";
import Navbar from "@/components/navbar";
import { siteConfig } from "@/config/site";
import { generateSEO } from "@/lib/seo";
import { Metadata } from "next";

export const metadata: Metadata = generateSEO({
  title: "Blog",
  description: `Tentatics - Your Partner in Digital Transformation`,
  url: `${siteConfig.url}/blog`,
});

export default function Page() {
  return (
    <main>
      <Navbar />
      <Article />
      <Footer />
    </main>
  );
}
