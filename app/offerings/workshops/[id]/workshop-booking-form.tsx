"use client";

import { trackWorkshopEnquiry } from "@/lib/fpixel";
import { event as gtagEvent } from "@/lib/gtag";
import { useState } from "react";

export default function WorkshopBookingForm({ workshopId }: { workshopId: string }) {
  const [form, setForm] = useState({
    name: "",
    email: "",
    phone: "",
    city: "",
    age: "",
    heightCm: "",
    weightKg: "",
    healthNotes: "",
    motivation: "",
    experience: "",
    consentPrivacy: false,
    consentTerms: false,
    consentHealth: false,
    website: "", // honeypot — must stay empty
  });

  const [loading, setLoading] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [errorMsg, setErrorMsg] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMsg("");

    if (!form.consentPrivacy || !form.consentTerms || !form.consentHealth) {
      setErrorMsg("Please tick all three consent boxes before submitting.");
      return;
    }

    setLoading(true);
    const res = await fetch("/api/workshop-enquiry", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        workshopId,
        name: form.name,
        email: form.email,
        phone: form.phone,
        city: form.city,
        age: form.age,
        heightCm: form.heightCm,
        weightKg: form.weightKg,
        healthNotes: form.healthNotes,
        motivation: form.motivation,
        experience: form.experience,
        consentPrivacy: form.consentPrivacy,
        consentTerms: form.consentTerms,
        consentHealth: form.consentHealth,
        website: form.website,
      }),
    });
    setLoading(false);

    if (res.ok) {
      trackWorkshopEnquiry(workshopId);
      gtagEvent("generate_lead", {
        event_category: "workshop",
        event_label: "workshop_application_form",
        workshop_id: workshopId,
      });
      setSubmitted(true);
    } else {
      const body = await res.json().catch(() => ({}));
      setErrorMsg(
        body.error || "Something went wrong. Please try again or email touch@taosense.uk."
      );
    }
  };

  if (submitted) {
    return (
      <div className="text-center space-y-3 py-8">
        <p className="text-xl text-gold font-medium">Application received.</p>
        <p className="text-white/80">
          Thank you, {form.name.split(" ")[0]}. We&rsquo;ll review your application
          and be in touch within a few days.
        </p>
      </div>
    );
  }

  return (
    <form
      onSubmit={handleSubmit}
      className="space-y-5 text-black bg-white p-8 rounded-lg shadow-lg"
    >
      {/* Honeypot — hidden from real users, filled by bots */}
      <input
        type="text"
        name="website"
        value={form.website}
        onChange={(e) => setForm({ ...form, website: e.target.value })}
        tabIndex={-1}
        autoComplete="off"
        aria-hidden="true"
        className="hidden"
      />

      {/* Full name */}
      <input
        type="text"
        placeholder="Full name"
        value={form.name}
        onChange={(e) => setForm({ ...form, name: e.target.value })}
        className="w-full border p-2 rounded"
        required
      />

      {/* Email + Phone */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <input
          type="email"
          placeholder="Email"
          value={form.email}
          onChange={(e) => setForm({ ...form, email: e.target.value })}
          className="w-full border p-2 rounded"
          required
        />
        <input
          type="tel"
          placeholder="Phone number"
          value={form.phone}
          onChange={(e) => setForm({ ...form, phone: e.target.value })}
          className="w-full border p-2 rounded"
          required
        />
      </div>

      {/* Town/City */}
      <input
        type="text"
        placeholder="Town / City"
        value={form.city}
        onChange={(e) => setForm({ ...form, city: e.target.value })}
        className="w-full border p-2 rounded"
        required
      />

      {/* Age + Height + Weight */}
      <div className="grid grid-cols-3 gap-4">
        <div>
          <label className="block text-xs text-black/60 mb-1">Age</label>
          <input
            type="number"
            min={18}
            max={99}
            placeholder="e.g. 34"
            value={form.age}
            onChange={(e) => setForm({ ...form, age: e.target.value })}
            className="w-full border p-2 rounded"
            required
          />
        </div>
        <div>
          <label className="block text-xs text-black/60 mb-1">Height (cm)</label>
          <input
            type="number"
            min={100}
            max={250}
            placeholder="e.g. 170"
            value={form.heightCm}
            onChange={(e) => setForm({ ...form, heightCm: e.target.value })}
            className="w-full border p-2 rounded"
            required
          />
        </div>
        <div>
          <label className="block text-xs text-black/60 mb-1">Weight (kg)</label>
          <input
            type="number"
            min={30}
            max={300}
            placeholder="e.g. 70"
            value={form.weightKg}
            onChange={(e) => setForm({ ...form, weightKg: e.target.value })}
            className="w-full border p-2 rounded"
            required
          />
        </div>
      </div>

      {/* Health information */}
      <div className="space-y-1">
        <textarea
          placeholder="Health information — any conditions, injuries, medications or anything that could affect your participation. This helps us keep everyone safe."
          value={form.healthNotes}
          onChange={(e) => setForm({ ...form, healthNotes: e.target.value })}
          className="w-full border p-2 rounded min-h-[100px]"
          required
        />
        <p className="text-xs text-black/50">
          This information is seen only by Wesley. Declined applicants&rsquo; data is
          deleted on request and within 90 days of the retreat.
        </p>
      </div>

      {/* Why do you want to attend? */}
      <textarea
        placeholder="Why do you want to attend this workshop?"
        value={form.motivation}
        onChange={(e) => setForm({ ...form, motivation: e.target.value })}
        className="w-full border p-2 rounded min-h-[100px]"
        required
      />

      {/* Experience (optional) */}
      <textarea
        placeholder="Experience with bodywork or tantra (optional)"
        value={form.experience}
        onChange={(e) => setForm({ ...form, experience: e.target.value })}
        className="w-full border p-2 rounded min-h-[80px]"
      />

      {/* Consent tickboxes */}
      <div className="space-y-3 pt-2 border-t border-black/10">
        <label className="flex items-start gap-3 text-sm text-black/80 cursor-pointer">
          <input
            type="checkbox"
            checked={form.consentPrivacy}
            onChange={(e) =>
              setForm({ ...form, consentPrivacy: e.target.checked })
            }
            className="mt-0.5 w-4 h-4 shrink-0"
            required
          />
          <span>
            I have read and agree to the{" "}
            <a
              href="/privacy"
              className="text-gold underline"
              target="_blank"
              rel="noopener noreferrer"
            >
              Privacy Policy
            </a>
            .
          </span>
        </label>

        <label className="flex items-start gap-3 text-sm text-black/80 cursor-pointer">
          <input
            type="checkbox"
            checked={form.consentTerms}
            onChange={(e) =>
              setForm({ ...form, consentTerms: e.target.checked })
            }
            className="mt-0.5 w-4 h-4 shrink-0"
            required
          />
          <span>
            I agree to the{" "}
            <a
              href="/terms"
              className="text-gold underline"
              target="_blank"
              rel="noopener noreferrer"
            >
              Terms &amp; Conditions
            </a>
            .
          </span>
        </label>

        <label className="flex items-start gap-3 text-sm text-black/80 cursor-pointer">
          <input
            type="checkbox"
            checked={form.consentHealth}
            onChange={(e) =>
              setForm({ ...form, consentHealth: e.target.checked })
            }
            className="mt-0.5 w-4 h-4 shrink-0"
            required
          />
          <span>
            I consent to you storing the health information I provide, for the
            purpose of assessing my application. I understand I can ask for it
            to be deleted at any time.
          </span>
        </label>
      </div>

      {errorMsg && (
        <p className="text-red-600 text-sm" role="alert">
          {errorMsg}
        </p>
      )}

      <button
        type="submit"
        disabled={loading}
        className="bg-gold text-black font-semibold px-6 py-3 rounded hover:bg-black hover:text-gold transition w-full sm:w-auto"
      >
        {loading ? "Submitting…" : "Submit Application"}
      </button>
    </form>
  );
}
