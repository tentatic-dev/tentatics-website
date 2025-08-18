"use client";
import { useState } from "react";
import {
  FiActivity,
  FiTrendingUp,
  FiMessageSquare,
  FiLayers,
  FiArrowRight,
} from "react-icons/fi";

type ServiceKey = "valuation" | "appraisal" | "consultation" | "others";

export default function Step0({
  onNext,
}: {
  onNext: (value: ServiceKey) => void;
}) {
  const [selected, setSelected] = useState<ServiceKey | null>(null);

  const services = [
    {
      key: "valuation",
      title: "Valuation",
      subtitle: "Accurate & Fast",
      Icon: FiActivity,
    },
    {
      key: "appraisal",
      title: "Appraisal",
      subtitle: "Certified",
      Icon: FiTrendingUp,
    },
    {
      key: "consultation",
      title: "Consultation",
      subtitle: "Competent",
      Icon: FiMessageSquare,
    },
    {
      key: "others",
      title: "Others",
      subtitle: "Miscellaneous",
      Icon: FiLayers,
    },
  ] as const;

  return (
    <>
      <h2 className="mt-3 text-2xl md:text-[26px] font-semibold">
        How we can help ?
      </h2>
      <p className="text-sm text-slate-600 -mt-1 mb-4">Select your service</p>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        {services.map(({ key, title, subtitle, Icon }) => {
          const active = selected === key;
          return (
            <button
              key={key}
              type="button"
              onClick={() => setSelected(key)}
              className={[
                "text-left rounded-2xl border px-5 py-6 transition-all",
                "hover:shadow-sm focus:outline-none focus:ring-2 focus:ring-emerald-700/40",
                active
                  ? "border-emerald-700 bg-emerald-50 shadow"
                  : "border-gray-300",
              ].join(" ")}
            >
              <div className="flex items-center gap-3">
                <span
                  className={[
                    "grid place-items-center h-9 w-9 rounded-xl border",
                    active ? "border-emerald-700 bg-white" : "border-gray-300",
                  ].join(" ")}
                >
                  <Icon className="text-lg" />
                </span>
                <div>
                  <p className="font-semibold">{title}</p>
                  <p className="text-xs text-slate-600">{subtitle}</p>
                </div>
              </div>
            </button>
          );
        })}
      </div>

      <div className="mt-5 flex justify-end">
        <button
          type="button"
          disabled={!selected}
          className="inline-flex items-center gap-2 rounded-full bg-emerald-800 text-white px-5 py-2.5 disabled:opacity-50"
          onClick={() => selected && onNext(selected)} // 4) kirim ke parent
        >
          Next <FiArrowRight />
        </button>
      </div>
    </>
  );
}
