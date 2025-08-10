export default function review() {
  const review = [
    "All",
    "Real estate",
    "Agencies",
    "Hospilaty",
    "Helathcare",
    "Manufactures",
    "Government",
  ];

  const client = [
    {
      value: "500+",
      desc: "Klien Puas(dummy)",
    },
    {
      value: "50+",
      desc: "Industri Berbeda (dummy)",
    },
    {
      value: "98%",
      desc: "Tingkat Kepuasan(dummy)",
    },
    {
      value: "24/7",
      desc: "Dukungan Teknis",
    },
  ];

  return (
    <section className="bg-primary-dark py-24 flex flex-col text-center gap-12 w-full justify-center">
      <div className="flex gap-2 flex-col w-full">
        <h1 className="text-3xl font-bold text-white">
          Helping Industry Leaders Transform with Technology
        </h1>
        <p className="text-highlight font-light">
          We help businesses grow with tailored, innovative technology
          solutions.
        </p>
      </div>

      <div className="flex gap-5 justify-center">
        {review.map((item, index) => (
          <button
            key={index}
            className="border border-white text-sm text-white py-1 px-5 rounded-lg cursor-pointer hover:bg-white/10 transition-colors"
          >
            {item}
          </button>
        ))}
      </div>

      <div className="flex flex-wrap justify-around w-full">
        {client.map((item, index) => (
          <div key={index} className="flex flex-col justify-center gap-2 mt-8">
            <h1 className="text-3xl text-highlight font-bold ">{item.value}</h1>
            <p className="text-sm text-white">{item.desc}</p>
          </div>
        ))}
      </div>
    </section>
  );
}
