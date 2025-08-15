import Banner from "@/components/business-customers/banner";
import Help from "@/components/business-customers/help";
import How from "@/components/business-customers/how";
import Navbar from "@/components/navbar";

export default function page() {
  return (
    <main className="min-h-screen mx-auto">
      <Navbar variant={2} />
      <Banner />
      <Help />
      <How />
    </main>
  );
}
