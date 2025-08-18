import { useTranslations } from "next-intl";
import Image from "next/image";

export default function How() {
  const t = useTranslations("business_customers.how");

  const step = (
    t.raw("steps") as Array<{
      number: number;
      title: string;
      desc: string;
    }>
  ).slice(0, 3);

  const positions: Array<{
    left: string;
    top: string;
    align: "left" | "right";
  }> = [
    { left: "25%", top: "100%", align: "right" },
    { left: "53%", top: "70%", align: "left" },
    { left: "81%", top: "20%", align: "left" },
  ];

  return (
    <section id="how" className="py-16 container">
      <div>
        <h2
          id="discover-heading"
          className="text-3xl sm:text-4xl font-bold max-w-sm "
        >
          {t("title")}
        </h2>
        <p className="text- base sm:text-lg mt-4 text-accent">{t("desc")}</p>
      </div>

      <div className="relative mt-10 hidden h-[520px] lg:block">
        <Image
          src="/business_customers/line.svg"
          height={500}
          width={500}
          alt="line_how"
          className="w-[1100px] h-full absolute "
        />

        <div className="w-[1100px]">
          {step.map((s, i) => {
            const p = positions[i] || positions[positions.length - 1];
            return (
              <div
                key={i}
                className="absolute"
                style={{
                  left: p.left,
                  top: p.top,
                  transform: "translate(-50%, -50%)",
                }}
              >
                <div className="relative grid place-items-left">
                  <div className="pointer-events-none absolute -z-10 right-0 top-10 select-none text-[160px] font-black leading-none text-slate-200">
                    {t.rich(`steps.${i}.number`) as React.ReactNode}
                  </div>
                  {/* Node */}
                  <div className="grid h-14 w-14 place-items-center rounded-xl bg-accent">
                    <div className="h-4 w-4 rounded-full bg-highlight" />
                  </div>
                </div>
                <div className="mt-3 max-w-xs p-4 ">
                  <h3 className="text-base font-semibold">
                    {t(`steps.${i}.title`)}
                  </h3>
                  <p className="mt-2 text-sm leading-relaxed text-slate-700">
                    {t(`steps.${i}.desc`)}
                  </p>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Mobile/tablet stacked list (your original) */}
      <div className="lg:hidden">
        {step.map((s, i) => (
          <div
            key={i}
            className="py-4 border-b border-accent max-w-lg relative"
          >
            <div className="absolute font-bold text-8xl right-20 text-slate-600 opacity-40">
              {t.rich(`steps.${i}.number`)}
            </div>
            <div className="z-10 relative">
              <div className="bg-accent w-10 h-10 rounded-xl flex items-center justify-center">
                <div className="bg-highlight w-4 h-4 rounded-full" />
              </div>
              <h3 className="text-xl font-semibold mt-5">
                {t(`steps.${i}.title`)}
              </h3>
              <p className="text-base">{t(`steps.${i}.desc`)}</p>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
