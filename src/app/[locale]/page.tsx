import Navbar from "@/components/navbar";
import Banner from "@/components/home/banner";
import Review from "@/components/home/review";
import Solutions from "@/components/home/solutions";
import Projects from "@/components/home/projects";
import Discover from "@/components/home/discover";
import Footer from "@/components/footer";
import { siteConfig } from "@/config/site";
import { generateSEO } from "@/lib/seo";
import { Metadata } from "next";

export const metadata: Metadata = generateSEO({
  title: "Home",
  description: "Show Better. Sell Quicker. Manage Smarter.",
  url: `${siteConfig.url}/`,
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
