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
    <div className="">
      <h2 className="text-xl font-bold mb-4">Your Contact Detail</h2>

      <div className="space-y-4">
        {/* First Name & Last Name Row */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium mb-2">
              First Name <span className="text-red-500">*</span>
            </label>
            <input
              type="text"
              placeholder="First Name"
              value={firstName}
              onChange={(e) => setFirstName(e.target.value)}
              className="input input-bordered w-full rounded-full px-6 py-3 text-base placeholder:text-gray-400"
              required
            />
          </div>
          <div>
            <label className="block text-sm font-medium mb-2">
              Last Name <span className="text-red-500">*</span>
            </label>
            <input
              type="text"
              placeholder="Last Name"
              value={lastName}
              onChange={(e) => setLastName(e.target.value)}
              className="input input-bordered w-full rounded-full px-6 py-3 text-base placeholder:text-gray-400"
              required
            />
          </div>
        </div>

        {/* Business Email */}
        <div>
          <label className="block text-sm font-medium mb-2">
            Business Email <span className="text-red-500">*</span>
          </label>
          <input
            type="email"
            placeholder="example@domain.com"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="input input-bordered w-full rounded-full px-6 py-3 text-base placeholder:text-gray-400"
            required
          />
        </div>

        {/* Phone Number */}
        <div>
          <label className="block text-sm font-medium mb-2">
            Phone number <span className="text-red-500">*</span>
          </label>
          <div className="flex gap-2">
            <select className="select select-bordered rounded-full px-4 w-24">
              <option value="ID">ID</option>
              <option value="US">US</option>
            </select>
            <input
              type="tel"
              placeholder="1234567"
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
              className="input input-bordered flex-1 rounded-full px-6 py-3 text-base placeholder:text-gray-400 tabular-nums"
              pattern="[0-9]*"
              minLength={7}
              maxLength={15}
              required
            />
          </div>
        </div>
      </div>

      <div className="mt-8 flex justify-between">
        <button onClick={onBack} className="btn btn-outline rounded-full px-8">
          ← Back
        </button>
        <button
          disabled={!firstName || !lastName || !email || !phone}
          onClick={() => onSubmit({ firstName, lastName, email, phone })}
          className="btn btn-primary rounded-full px-8 disabled:opacity-50"
        >
          Submit →
        </button>
      </div>
    </div>
  );
}
