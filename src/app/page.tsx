import Navbar from "@/components/navbar";
import Banner from "@/components/home/banner";
import Review from "@/components/home/review";
import Solutions from "@/components/home/solutions";
import Projects from "@/components/home/projects";
import { siteConfig } from "@/config/site";
import Discover from "@/components/home/discover";

export default function Home() {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center">
      <Navbar />
      <Banner />
      <Review />
      <Solutions />
      <Projects />
      <Discover />
    </div>
  );
}
