import { title } from "process";

export default function Solutions() {
  const products = [
    {
      icon: "/icons/360_black.svg",
      title: "360 Virtual Tour",
      desc: "Immersive 360° property experiences that engage prospects and accelerate sales decisions.",
    },
    {
      icon: "/icons/ai_black.svg",
      title: "AI Automation",
      desc: "Intelligent agents that handle WhatsApp responses, lead assessment, and task scheduling",
    },
    {
      icon: "/icons/crm_black.svg",
      title: "CRM Integration",
      desc: "Seamless integration with leading CRM platforms for enhanced client management.",
    },
  ];

  return (
    <section className="bg-white py-12 flex flex-col text-center gap-8 w-full justify-center">
      <div className="flex gap-2 flex-col w-full">
        <h1 className="text-3xl font-bold text-primary-dark">
          Comprehensive Digital Solutions
        </h1>
        <p className="text-sm text-primary">
          From virtual tours to AI automation, we provide everything you <br />
          need for modern property management.
        </p>
      </div>
      <div className="flex justify-around gap-4 px-32">
        {products.map((product, index) => (
          <div key={index} className="flex flex-col items-center">
            <img
              src={product.icon}
              alt={product.title}
              className="w-8 h-8 my-8"
            />
            <h2 className="text-lg font-semibold text-primary-dark">
              {product.title}
            </h2>
            <p className="text-sm w-64 mt-2">{product.desc}</p>
          </div>
        ))}
      </div>
    </section>
  );
}
