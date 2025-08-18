"use client";
import { useState } from "react";

type Props = {
  onSubmit: (value: {
    firstName: string;
    lastName: string;
    email: string;
    phone: string;
  }) => void;
  onBack: () => void;
};

export default function Step4({ onSubmit, onBack }: Props) {
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");

  return (
    <div>
      <h2 className="text-xl font-bold">Your Contact Detail</h2>
      <p className="text-sm text-slate-600 mb-3">
        Please enter your contact info
      </p>

      <div className="grid grid-cols-2 gap-4">
        <input
          type="text"
          placeholder="First Name"
          value={firstName}
          onChange={(e) => setFirstName(e.target.value)}
          className="border rounded-lg p-3"
          required
        />
        <input
          type="text"
          placeholder="Last Name"
          value={lastName}
          onChange={(e) => setLastName(e.target.value)}
          className="border rounded-lg p-3"
          required
        />
      </div>

      <input
        type="email"
        placeholder="Business Email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        className="border rounded-lg p-3 mt-4 w-full"
        required
      />

      <input
        type="text"
        placeholder="Phone Number"
        value={phone}
        onChange={(e) => setPhone(e.target.value)}
        className="border rounded-lg p-3 mt-4 w-full"
        required
      />

      <div className="mt-6 flex justify-between">
        <button onClick={onBack} className="px-5 py-2 border rounded-lg">
          ← Back
        </button>
        <button
          disabled={!firstName || !lastName || !email || !phone}
          onClick={() => onSubmit({ firstName, lastName, email, phone })}
          className="bg-emerald-800 text-white px-5 py-2 rounded-lg disabled:opacity-50 flex items-center gap-2"
        >
          Submit →
        </button>
      </div>
    </div>
  );
}
