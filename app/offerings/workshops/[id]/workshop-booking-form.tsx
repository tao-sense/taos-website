"use client";

import { useState } from "react";

export default function WorkshopBookingForm({ workshopId }: { workshopId: string }) {
  const [form, setForm] = useState({
    name: "",
    street: "",
    city: "",
    postcode: "",
    email: "",
    phone: "",
    ageHeightWeight: "",
    about: "",
    privacy: false,
    terms: false,
  });

  const [loading, setLoading] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!form.privacy || !form.terms) {
      alert("Please agree to our Privacy Policy and Terms & Conditions.");
      return;
    }
    setLoading(true);
    const res = await fetch("/api/workshop-enquiry", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ ...form, workshopId }),
    });
    setLoading(false);
    if (res.ok) setSubmitted(true);
    else alert("Error submitting form");
  };

  if (submitted)
    return (
      <p className="text-center text-lg text-gold">
        Thank you for your enquiry — we’ll be in touch soon.
      </p>
    );

  return (
    <form onSubmit={handleSubmit} className="space-y-4 text-black bg-white p-8 rounded-lg shadow-lg">
      <input
        type="text"
        placeholder="Full Name"
        value={form.name}
        onChange={(e) => setForm({ ...form, name: e.target.value })}
        className="w-full border p-2 rounded"
        required
      />
      <input
        type="text"
        placeholder="Street Address"
        value={form.street}
        onChange={(e) => setForm({ ...form, street: e.target.value })}
        className="w-full border p-2 rounded"
        required
      />
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <input
          type="text"
          placeholder="Town / City"
          value={form.city}
          onChange={(e) => setForm({ ...form, city: e.target.value })}
          className="w-full border p-2 rounded"
          required
        />
        <input
          type="text"
          placeholder="Postcode"
          value={form.postcode}
          onChange={(e) => setForm({ ...form, postcode: e.target.value })}
          className="w-full border p-2 rounded"
          required
        />
      </div>
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
        placeholder="Phone Number"
        value={form.phone}
        onChange={(e) => setForm({ ...form, phone: e.target.value })}
        className="w-full border p-2 rounded"
        required
      />
      <input
        type="text"
        placeholder="Age, Height & Weight"
        value={form.ageHeightWeight}
        onChange={(e) => setForm({ ...form, ageHeightWeight: e.target.value })}
        className="w-full border p-2 rounded"
        required
      />
      <textarea
        placeholder="Tell us a little about yourself..."
        value={form.about}
        onChange={(e) => setForm({ ...form, about: e.target.value })}
        className="w-full border p-2 rounded min-h-[120px]"
        required
      />

      <div className="flex flex-col sm:flex-row sm:items-center gap-3 text-sm text-black/80">
        <label className="flex items-center gap-2">
          <input
            type="checkbox"
            checked={form.privacy}
            onChange={(e) => setForm({ ...form, privacy: e.target.checked })}
          />
          I agree to the{" "}
          <a href="/privacy" className="text-gold underline">
            Privacy Policy
          </a>
        </label>

        <label className="flex items-center gap-2">
          <input
            type="checkbox"
            checked={form.terms}
            onChange={(e) => setForm({ ...form, terms: e.target.checked })}
          />
          I agree to the{" "}
          <a href="/terms" className="text-gold underline">
            Terms & Conditions
          </a>
        </label>
      </div>

      <button
        type="submit"
        disabled={loading}
        className="bg-gold text-black font-semibold px-6 py-3 rounded hover:bg-black hover:text-gold transition"
      >
        {loading ? "Submitting..." : "Submit Enquiry"}
      </button>
    </form>
  );
}