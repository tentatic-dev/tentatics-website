"use client";
import { useState } from "react";

type Props = {
  onNext: (value: string) => void;
  onBack: () => void;
};

export default function Step3Location({ onNext, onBack }: Props) {
  const [location, setLocation] = useState("");

  return (
    <div>
      <h2 className="text-xl font-bold">Your Location</h2>
      <p className="text-sm text-slate-600 mb-3">
        Please enter postal code and country
      </p>

      <input
        type="text"
        value={location}
        onChange={(e) => setLocation(e.target.value)}
        className="w-full border rounded-full p-3 placeholder:text-gray-400"
        placeholder="Enter postal code and country..."
      />

      <div className="mt-6 flex justify-between">
        <button onClick={onBack} className="px-5 py-2 border rounded-full">
          ← Back
        </button>
        <button
          disabled={!location}
          onClick={() => onNext(location)}
          className="bg-emerald-800 text-white px-5 py-2 rounded-full disabled:opacity-50 flex items-center gap-2"
        >
          Next →
        </button>
      </div>
    </div>
  );
}
