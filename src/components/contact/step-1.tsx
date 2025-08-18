"use client";
import { useState } from "react";
import {
  FiActivity,
  FiTrendingUp,
  FiMessageSquare,
  FiLayers,
} from "react-icons/fi";

type Props = {
  onNext: (value: string) => void;
  onBack: () => void;
};

export default function Step1({ onNext, onBack }: Props) {
  const [selected, setSelected] = useState<string | null>(null);

  const options = [
    {
      key: "real_estate",
      title: "Real Estate",
      subtitle: "Modern",
      Icon: FiActivity,
    },
    { key: "land", title: "Land", subtitle: "Land Value", Icon: FiTrendingUp },
    { key: "mixed", title: "Mixed", subtitle: "Both", Icon: FiMessageSquare },
    {
      key: "others",
      title: "Others",
      subtitle: "Miscellaneous",
      Icon: FiLayers,
    },
  ];

  return (
    <div>
      <h2 className="text-xl font-bold">Which Property Type ?</h2>
      <p className="text-sm text-slate-600 mb-4">
        Please select your property type
      </p>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {options.map(({ key, title, subtitle, Icon }) => (
          <button
            key={key}
            type="button"
            onClick={() => setSelected(key)}
            className={`rounded-xl border p-5 text-left ${
              selected === key
                ? "border-emerald-600 bg-emerald-50"
                : "border-gray-300"
            }`}
          >
            <Icon className="text-xl mb-2" />
            <p className="font-semibold">{title}</p>
            <p className="text-xs text-slate-500">{subtitle}</p>
          </button>
        ))}
      </div>

      <div className="mt-6 flex justify-between ">
        <button onClick={onBack} className="px-5 py-2 border rounded-full">
          ← Back
        </button>
        <button
          disabled={!selected}
          onClick={() => onNext(selected!)}
          className="bg-emerald-800 text-white px-5 py-2 rounded-full disabled:opacity-50 flex items-center gap-2"
        >
          Next →
        </button>
      </div>
    </div>
  );
}
