"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { ChevronDown } from "lucide-react";
import ScrollFade from "@/components/ScrollFade";

export default function ContactPage() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    message: "",
  });
  const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">(
    "idle"
  );

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setStatus("loading");

    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      if (res.ok) {
        setStatus("success");
        setFormData({ name: "", email: "", phone: "", message: "" });
      } else {
        setStatus("error");
      }
    } catch (err) {
      console.error("Form submission error:", err);
      setStatus("error");
    }
  }

  return (
    <main className="text-white">
      {/* Hero Section */}
      <section className="relative h-[90vh] w-full flex flex-col items-center justify-center text-center overflow-hidden">
        <Image
          src="/images/contact.png"
          alt="Writing a letter in candlelight"
          fill
          className="object-cover opacity-90"
          priority
        />

        {/* Hero Text */}
        <div className="relative z-10 max-w-2xl px-6">
          <h1 className="text-4xl md:text-6xl font-bold text-gold mb-4">
            Get in Touch
          </h1>
          <p className="text-lg md:text-xl text-white/90 leading-relaxed">
            There’s no right way to begin. Whatever you wish to ask or share,
            you’ll be met with understanding — no judgement, just connection.
          </p>
        </div>

        {/* Scroll Chevron */}
        <div className="absolute bottom-6 z-10 animate-bounce">
          <ChevronDown className="text-gold w-8 h-8 opacity-80" />
        </div>

        {/* Overlay */}
        <div className="absolute inset-0 bg-black/30"></div>
      </section>

      {/* Contact Form Section */}
      <ScrollFade>
        <section className="bg-white text-black py-20 px-6 flex justify-center">
          <div className="w-full max-w-xl space-y-10">
            {/* Intro */}
            <div className="text-center space-y-4">
              <p className="text-lg text-neutral-700">
                If you’d like to book a session, ask a question, or simply reach
                out, please fill out the form below. I’ll reply as soon as I can.
              </p>
              <p className="mt-6 text-neutral-700">Or contact directly:</p>
              <p>
                <Link
                  href="mailto:touch@taosense.uk"
                  className="text-gold font-semibold hover:underline"
                >
                  touch@taosense.uk
                </Link>
              </p>
              <p>
                <Link
                  href="tel:+447792510682"
                  className="text-gold hover:underline"
                >
                  +44 7792 510682
                </Link>
              </p>
            </div>

            {/* Form */}
            <form
              onSubmit={handleSubmit}
              className="bg-neutral-50 border border-neutral-200 rounded-xl p-8 space-y-6 shadow-lg"
            >
              <div>
                <label htmlFor="name" className="block font-medium mb-1">
                  Name
                </label>
                <input
                  type="text"
                  id="name"
                  value={formData.name}
                  onChange={(e) =>
                    setFormData({ ...formData, name: e.target.value })
                  }
                  required
                  className="w-full border border-gold/60 rounded-md px-4 py-2 focus:outline-none focus:ring-2 focus:ring-gold"
                />
              </div>

              <div>
                <label htmlFor="email" className="block font-medium mb-1">
                  Email
                </label>
                <input
                  type="email"
                  id="email"
                  value={formData.email}
                  onChange={(e) =>
                    setFormData({ ...formData, email: e.target.value })
                  }
                  required
                  className="w-full border border-gold/60 rounded-md px-4 py-2 focus:outline-none focus:ring-2 focus:ring-gold"
                />
              </div>

              <div>
                <label htmlFor="phone" className="block font-medium mb-1">
                  Mobile
                </label>
                <input
                  type="tel"
                  id="phone"
                  value={formData.phone}
                  onChange={(e) =>
                    setFormData({ ...formData, phone: e.target.value })
                  }
                  className="w-full border border-gold/60 rounded-md px-4 py-2 focus:outline-none focus:ring-2 focus:ring-gold"
                />
              </div>

              <div>
                <label htmlFor="message" className="block font-medium mb-1">
                  Message
                </label>
                <textarea
                  id="message"
                  rows={4}
                  value={formData.message}
                  onChange={(e) =>
                    setFormData({ ...formData, message: e.target.value })
                  }
                  required
                  className="w-full border border-gold/60 rounded-md px-4 py-2 focus:outline-none focus:ring-2 focus:ring-gold"
                ></textarea>
              </div>

              <button
                type="submit"
                disabled={status === "loading"}
                className="w-full bg-gold text-black px-6 py-3 rounded-md font-semibold hover:bg-opacity-90 transition disabled:opacity-60"
              >
                {status === "loading" ? "Sending..." : "Send Message"}
              </button>

              {status === "success" && (
                <p className="text-green-600 font-medium mt-2">
                  Message sent successfully ✅
                </p>
              )}
              {status === "error" && (
                <p className="text-red-600 font-medium mt-2">
                  Something went wrong ❌
                </p>
              )}
            </form>
          </div>
        </section>
      </ScrollFade>
    </main>
  );
}