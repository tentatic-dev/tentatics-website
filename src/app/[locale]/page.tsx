import Navbar from "@/components/navbar";
import Banner from "@/components/home/banner";
import Review from "@/components/home/review";
import Solutions from "@/components/home/solutions";
import Projects from "@/components/home/projects";
import Discover from "@/components/home/discover";
import Footer from "@/components/footer";
import { Metadata } from "next";
import { generateSEO } from "@/lib/seo";
import { siteConfig } from "@/config/site";

export const metadata: Metadata = generateSEO({
  title: "Home",
  description: `Tentatics - Your Partner in Digital Transformation`,
  url: `${siteConfig.url}`,
});

export default function Home() {
  return (
    <main className="min-h-screen mx-auto">
      <Navbar />
      <Banner />
      <Review />
      <Solutions />
      <Projects />
      <Discover />
      <Footer />
    </main>
  );
}
