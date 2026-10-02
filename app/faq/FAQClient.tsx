"use client";

import { useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import { ChevronDown } from "lucide-react";
import ScrollFade from "@/components/ScrollFade";
import { sessionFaqs, workshopFaqs, type FaqItem, type FaqPart } from "@/lib/faq";

export default function FAQClient() {
  // Smooth scroll for internal links
  useEffect(() => {
    const links = document.querySelectorAll<HTMLAnchorElement>('a[href^="#"]');
    const handleClick = (e: MouseEvent) => {
      const target = e.currentTarget as HTMLAnchorElement;
      const href = target.getAttribute("href");
      if (href?.startsWith("#")) {
        e.preventDefault();
        document.querySelector(href)?.scrollIntoView({
          behavior: "smooth",
          block: "start",
        });
      }
    };
    links.forEach((link) => link.addEventListener("click", handleClick));
    return () =>
      links.forEach((link) => link.removeEventListener("click", handleClick));
  }, []);

  return (
    <main className="bg-black text-white">
      {/* Hero */}
      <section className="relative h-[90vh] flex items-center justify-center text-center">
        <Image
          src="/images/faq.webp"
          alt="Tantra Massage FAQ with The Art of Sensuality (TAOS)"
          fill
          className="object-cover opacity-95"
          priority
        />
        <div className="relative z-10 px-6">
          <h1 className="font-playfair text-4xl md:text-6xl font-semibold text-gold mb-4 leading-none">
            Tantra Massage FAQ
            <span className="block text-white/90 font-light text-2xl md:text-3xl mt-1 leading-tight">
              Answers from The Art of Sensuality (TAOS)
            </span>
          </h1>
          <p className="text-lg text-white/85 max-w-xl mx-auto mt-4">
            Everything you may wish to know before your first Tantra Massage or
            workshop — answered with care, clarity, and transparency.
          </p>
        </div>

        {/* Scroll Chevron */}
        <div className="absolute bottom-6 z-10 animate-bounce">
          <ChevronDown className="text-gold w-8 h-8 opacity-80" />
        </div>
        <div className="absolute inset-0 bg-black/30"></div>
      </section>

      {/* Gold Swirl Divider */}
      <ScrollFade>
        <div className="bg-white py-8 flex justify-center">
          <Image
            src="/images/swirl-divider.png"
            alt="Decorative gold swirl divider"
            width={200}
            height={60}
            className="h-12 md:h-16 w-auto"
          />
        </div>
      </ScrollFade>

      {/* FAQ Sections */}
      <section className="bg-white text-black py-16 px-6">
        <div className="max-w-4xl mx-auto">
          {/* Section Navigation */}
          <ScrollFade>
            <div className="text-center mb-16">
              <h2 className="font-playfair text-3xl font-semibold text-gold mb-6">
                Frequently Asked Questions
              </h2>
              <p className="text-black/70 mb-8">
                Explore answers about both{" "}
                <span className="font-semibold text-gold">
                  Private Sessions
                </span>{" "}
                and{" "}
                <span className="font-semibold text-gold">Workshops</span>.
              </p>
              <div className="flex flex-wrap justify-center gap-6 text-black/70">
                <a href="#sessions" className="hover:text-gold transition">
                  Private Sessions
                </a>
                <a href="#workshops" className="hover:text-gold transition">
                  Workshops
                </a>
              </div>
            </div>
          </ScrollFade>

          {/* Private Sessions */}
          <ScrollFade>
            <div id="sessions" className="space-y-12 border-t border-black/10 pt-12">
              <h2 className="font-playfair text-3xl font-semibold text-gold mb-8 text-center">
                Private Tantra Massage Sessions
              </h2>

              {sessionFaqs.map((item) => (
                <Question key={item.question} title={item.question}>
                  <FaqAnswer item={item} />
                </Question>
              ))}
            </div>
          </ScrollFade>

          {/* Workshops */}
          <ScrollFade>
            <div
              id="workshops"
              className="space-y-12 border-t border-black/10 pt-16 mt-16"
            >
              <h2 className="font-playfair text-3xl font-semibold text-gold mb-8 text-center">
                Tantra Massage Workshops
              </h2>

              {workshopFaqs.map((item) => (
                <Question key={item.question} title={item.question}>
                  <FaqAnswer item={item} />
                </Question>
              ))}
            </div>
          </ScrollFade>
        </div>
      </section>

      {/* CTA */}
      <ScrollFade delay={0.15}>
        <section className="bg-black py-16 text-center border-t border-white/10">
          <h2 className="font-playfair text-3xl font-semibold text-gold mb-4">
            Still have a question?
          </h2>
          <p className="text-white/80 mb-8">
            If there’s something you’d like to ask privately, please don’t
            hesitate to reach out.
          </p>
          <Link
            href="/contact"
            className="inline-block px-6 py-3 rounded-xl bg-gold text-black font-semibold hover:opacity-90"
          >
            Make Contact →
          </Link>
        </section>
      </ScrollFade>
    </main>
  );
}

/* --- Reusable Question component --- */
function Question({
  title,
  children,
}: {
  title: string;
  children: React.ReactNode;
}) {
  return (
    <div>
      <h3 className="font-playfair text-2xl font-semibold text-gold mb-3">{title}</h3>
      <div className="text-black/80 leading-relaxed space-y-4">{children}</div>
    </div>
  );
}

/* --- Renders an answer from lib/faq.ts: one paragraph inline, several as <p> --- */
function FaqAnswer({ item }: { item: FaqItem }) {
  if (item.answer.length === 1) return <FaqParts parts={item.answer[0]} />;
  return (
    <>
      {item.answer.map((paragraph, i) => (
        <p key={i}>
          <FaqParts parts={paragraph} />
        </p>
      ))}
    </>
  );
}

function FaqParts({ parts }: { parts: FaqPart[] }) {
  return (
    <>
      {parts.map((part, i) =>
        typeof part === "string" ? (
          part
        ) : (
          <Link key={i} href={part.href} className="text-gold underline">
            {part.text}
          </Link>
        )
      )}
    </>
  );
}
