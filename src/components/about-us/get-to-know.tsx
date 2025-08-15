import { IoIosArrowRoundForward } from "react-icons/io";
export default function GetToKnow() {
  return (
    <section className="container my-16">
      <p className="text-primary">Get To know About Us</p>
      <h1 className="text-3xl sm:text-4xl font-bold text-primary-dark mb-5">
        Our Expertise, Mission and Values
      </h1>
      <p>
        Apply now and become part of our dedicated team — benefit from exciting
        projects and excellent development opportunities.
      </p>
      <button className="mt-6 px-6 py-3 text-white rounded-lg bg-primary-dark flex items-center gap-2">
        Join Us
        <IoIosArrowRoundForward className="text-xl" />
      </button>
    </section>
  );
}
