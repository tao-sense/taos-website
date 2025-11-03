"use client";

import { useState } from "react";

export default function SubscribeForm() {
  const [email, setEmail] = useState("");
  const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">("idle");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatus("loading");

    try {
      const res = await fetch("/api/subscribe", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email }),
      });

      if (res.ok) {
        setStatus("success");
        setEmail("");
      } else {
        setStatus("error");
      }
    } catch (error) {
      console.error("Subscription error:", error);
      setStatus("error");
    }
  };

  return (
    <form onSubmit={handleSubmit} className="flex flex-col w-full space-y-3">
      <input
        type="email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        placeholder="Your email"
        required
        className="w-full px-4 py-2 rounded-lg bg-neutral-800 text-white placeholder-white/50 focus:outline-none focus:ring-2 focus:ring-gold"
      />

      <button
        type="submit"
        disabled={status === "loading"}
        className="w-full px-4 py-2 rounded-lg bg-gold text-black font-medium hover:opacity-90 transition disabled:opacity-50"
      >
        {status === "loading" ? "Subscribing..." : "Subscribe"}
      </button>

      {status === "success" && (
        <p className="text-sm text-gold">Thank you for subscribing!</p>
      )}
      {status === "error" && (
        <p className="text-sm text-red-500">
          Something went wrong — please try again.
        </p>
      )}

      <p className="text-xs text-white/60 mt-2">
        By subscribing, you agree to receive occasional updates from The Art of
        Sensuality. You can unsubscribe at any time. See our{" "}
        <a href="/privacy" className="text-gold underline">
          Privacy Policy
        </a>.
      </p>
    </form>
  );
}