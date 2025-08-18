"use client";

import Image from "next/image";
import { useState } from "react";
import { toast } from "react-toastify";
import Step0 from "@/components/contact/step-0";
import Step1 from "@/components/contact/step-1";
import Step2 from "@/components/contact/step-2";
import Step3 from "@/components/contact/step-3";
import Step4 from "@/components/contact/step-4";

export default function Contact() {
  const [step, setStep] = useState(0);
  const progress = (step + 1) / 5;

  const [formData, setFormData] = useState<any>({});

  const next = (payload?: any) => {
    if (payload) setFormData((d: any) => ({ ...d, ...payload }));
    setStep((s) => Math.min(s + 1, 4));
  };
  const back = () => setStep((s) => Math.max(s - 1, 0));

  const handleSubmit = (data: any) => {
    console.log("Form submitted:", data);
    toast.success("Form submitted successfully!");
  };
  return (
    <div className="container mx-auto mt-6 grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-8">
      <Image
        src="/landing/landing-2.png"
        alt="Contact Us"
        className="rounded-3xl object-cover w-full "
        width={600}
        height={400}
      />

      <div>
        {/* Progress */}
        <div className="h-1.5 bg-gray-200 rounded-full overflow-hidden">
          <div
            className="h-full bg-emerald-700"
            style={{ width: `${progress * 100}%` }}
          />
        </div>
        <div className="mt-4">
          {step === 0 && <Step0 onNext={(v) => next({ service: v })} />}
          {step === 1 && (
            <Step1 onNext={(v) => next({ request: v })} onBack={back} />
          )}
          {step === 2 && (
            <Step2 onNext={(v) => next({ location: v })} onBack={back} />
          )}
          {step === 3 && (
            <Step3 onNext={(v) => next({ contact: v })} onBack={back} />
          )}
          {step === 4 && (
            <Step4
              onSubmit={(v) => {
                next({ summary: v });
                handleSubmit({ ...formData, summary: v });
              }}
              onBack={back}
            />
          )}
        </div>
      </div>
    </div>
  );
}
