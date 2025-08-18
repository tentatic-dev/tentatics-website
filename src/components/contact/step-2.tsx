"use client";
import { useState } from "react";

type Props = {
  onNext: (value: string) => void;
  onBack: () => void;
};

export default function Step2({ onNext, onBack }: Props) {
  const [message, setMessage] = useState("");

  return (
    <div>
      <h2 className="text-xl font-bold">Your Request</h2>
      <p className="text-sm text-slate-600 mb-3">
        Describe your request in detail
      </p>

      <textarea
        value={message}
        onChange={(e) => setMessage(e.target.value)}
        className="w-full border rounded-lg p-3 h-32"
        placeholder="Write your request here..."
      />

      <div className="mt-6 flex justify-between">
        <button onClick={onBack} className="px-5 py-2 border rounded-lg">
          ← Back
        </button>
        <button
          disabled={!message}
          onClick={() => onNext(message)}
          className="bg-emerald-800 text-white px-5 py-2 rounded-lg disabled:opacity-50 flex items-center gap-2"
        >
          Next →
        </button>
      </div>
    </div>
  );
}
