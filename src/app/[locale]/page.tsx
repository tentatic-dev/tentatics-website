import Navbar from "@/components/navbar";
import Banner from "@/components/home/banner";
import Review from "@/components/home/review";
import Solutions from "@/components/home/solutions";
import Projects from "@/components/home/projects";
import Discover from "@/components/home/discover";
import Footer from "@/components/footer";

export default function Home() {
  return (
    <div className="min-h-screen mx-auto">
      <Navbar />
      <Banner />
      <Review />
      <Solutions />
      <Projects />
      <Discover />
      <Footer />
    </div>
  );
}
