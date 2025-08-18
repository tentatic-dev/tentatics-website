import { useTranslations } from "next-intl";

export default function FAQ() {
  const t = useTranslations("business_customers.faq");

  const faq = t.raw("questions") as Array<{
    question: string;
    answer: string;
  }>;

  return (
    <section id="faq" className="container py-7 sm:py-16 mx-auto">
      <div className="text-center">
        <h1 className="text-3xl sm:text-4xl font-bold text-primary-dark">
          {t("title")}
        </h1>
        <p className="mt-2">{t("desc")}</p>
      </div>
      <div className="mt-10">
        {faq.map((item, index) => (
          <div key={index} className="mt-4">
            <div className="collapse collapse-plus bg-base-100 border border-base-300">
              <input
                type="radio"
                name="my-accordion-3"
                defaultChecked={index === 0}
              />
              <div className="collapse-title font-semibold text-lg">
                {item.question}
              </div>
              <div className="collapse-content text-sm">{item.answer}</div>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
