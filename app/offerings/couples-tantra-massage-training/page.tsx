import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { ChevronDown } from "lucide-react";
import ScrollFade from "@/components/ScrollFade";
import JsonLd from "@/components/JsonLd";
import AtAGlance from "@/components/AtAGlance";
import FaqList from "@/components/FaqList";
import Testimonials, { type Testimonial } from "@/components/Testimonials";
import { couplesTrainingFaqs } from "@/lib/faq";
import {
  breadcrumbJsonLd,
  BUSINESS_ID,
  OFFERINGS_CRUMB,
  SITE_URL,
} from "@/lib/structured-data";

const PAGE_PATH = "/offerings/couples-tantra-massage-training";
const PAGE_URL = `${SITE_URL}${PAGE_PATH}`;
const TITLE = "Tantra Massage Training for Couples | Private Lessons in Stroud | TAOS";
const DESCRIPTION =
  "Learn the complete Tantra Massage ritual together, taught privately to just the two of you. 15 hours of personal teaching with Wesley Tan BOst BSc in Stroud, Gloucestershire.";
const ENQUIRE_HREF = `/contact?subject=${encodeURIComponent("Couples Tantra Massage Training")}`;

// Add couples' quotes here (with permission); the section stays hidden while empty.
const testimonials: Testimonial[] = [];

export const metadata: Metadata = {
  // Absolute: this title already ends with the brand, so skip the layout template.
  title: { absolute: TITLE },
  description: DESCRIPTION,
  openGraph: {
    title: TITLE,
    description: DESCRIPTION,
    url: PAGE_URL,
    siteName: "The Art of Sensuality",
    locale: "en_GB",
    type: "website",
  },
  alternates: { canonical: PAGE_URL },
};

const serviceJsonLd = {
  "@context": "https://schema.org",
  "@type": "Service",
  "@id": `${PAGE_URL}#service`,
  name: "Tantra Massage Training for Couples",
  serviceType: "Private Tantra Massage training for couples",
  url: PAGE_URL,
  provider: { "@id": BUSINESS_ID },
  areaServed: "Stroud, Gloucestershire",
  offers: { "@type": "Offer", price: "1800", priceCurrency: "GBP" },
};

function EnquireButton() {
  return (
    <Link
      href={ENQUIRE_HREF}
      className="inline-block px-8 py-3 rounded-lg bg-gold text-black font-semibold hover:opacity-90 transition"
    >
      Enquire about training
    </Link>
  );
}

export default function CouplesTrainingPage() {
  return (
    <>
      <JsonLd data={serviceJsonLd} />
      <JsonLd
        data={breadcrumbJsonLd([
          OFFERINGS_CRUMB,
          { name: "Couples Tantra Massage Training", path: PAGE_PATH },
        ])}
      />

      <main className="bg-black text-white">
        {/* HERO */}
        <section className="relative h-[90vh] w-full flex items-center justify-center text-center overflow-hidden">
          <Image
            src="/images/oilyhands.webp"
            alt="Tantra Massage Training for Couples in Stroud – The Art of Sensuality (TAOS)"
            fill
            className="object-cover opacity-90"
            priority
          />
          <div className="relative z-10 px-6">
            <ScrollFade>
              <h1 className="font-playfair text-4xl md:text-6xl font-semibold text-gold mb-4">
                Tantra Massage Training for Couples
              </h1>
            </ScrollFade>
            <ScrollFade delay={0.4}>
              <p className="text-lg md:text-xl text-white/90 max-w-2xl mx-auto">
                Learn the complete Tantra Massage ritual together, taught privately to just the
                two of you. Fifteen hours of personal teaching, at your pace, in a confidential
                setting in Stroud, Gloucestershire.
              </p>
            </ScrollFade>
          </div>
          <div className="absolute bottom-6 z-10 animate-bounce">
            <ChevronDown className="text-gold w-8 h-8 opacity-80" />
          </div>
          <div className="absolute inset-0 bg-black/40"></div>
        </section>

        {/* AT A GLANCE */}
        <section className="bg-gray-50 text-black px-6 py-16 border-t border-gray-200">
          <AtAGlance
            items={[
              { label: "Format", value: "Private, one couple only" },
              { label: "Length", value: "15 hours, typically 5 × 3-hour sessions" },
              { label: "Price", value: "£1,800 per couple, all teaching and materials included" },
              {
                label: "Deposit",
                value:
                  "£350 (non-refundable). Balance due before the first session or in instalments by arrangement",
              },
              { label: "Where", value: "Stroud, Gloucestershire" },
              { label: "Teacher", value: "Wesley Tan BOst BSc" },
            ]}
          />
          <div className="mt-10 text-center">
            <EnquireButton />
          </div>
        </section>

        {/* WHY LEARN TOGETHER */}
        <ScrollFade>
          <section className="bg-white text-black py-20 px-6 border-t border-gray-200">
            <div className="flex justify-center mb-10">
              <Image
                src="/images/swirl-divider.png"
                alt="Decorative gold swirl divider – Tantra Massage Training for Couples"
                width={200}
                height={60}
                className="h-12 md:h-16 w-auto"
              />
            </div>
            <div className="max-w-3xl mx-auto space-y-6 text-lg leading-relaxed text-black/80">
              <h2 className="font-playfair text-3xl font-semibold text-gold text-center">
                Why learn together
              </h2>
              <p>
                Most couples were never taught how to touch each other. They learned from habit,
                film, or guesswork, and over time touch drifts towards routine or towards sex as
                the only destination.
              </p>
              <p>
                This training gives you something different: a complete ritual of conscious,
                full-body touch that you both learn to give and to receive. It slows things down.
                It takes the pressure of performance off. And it gives you a shared practice you
                can come back to for years.
              </p>
            </div>
          </section>
        </ScrollFade>

        {/* WHAT YOU'LL LEARN */}
        <ScrollFade>
          <section className="bg-gray-50 text-black py-20 px-6 border-t border-gray-200">
            <div className="max-w-3xl mx-auto space-y-6 text-lg leading-relaxed text-black/80">
              <h2 className="font-playfair text-3xl font-semibold text-gold text-center">
                What you’ll learn
              </h2>
              <ul className="list-disc pl-6 space-y-2">
                <li>The complete Tantra Massage ritual, step by step, from opening to closing</li>
                <li>Full-body massage techniques and how to sequence them</li>
                <li>Yoni and lingam massage, as part of the complete ritual</li>
                <li>How to give: pace, presence and attention rather than technique for its own sake</li>
                <li>How to receive: letting go of the need to respond or perform</li>
                <li>How to talk about what you want, and what you don’t, before, during and after</li>
                <li>Breath and awareness practices to bring you both into the room</li>
              </ul>
            </div>
          </section>
        </ScrollFade>

        {/* HOW THE TRAINING WORKS */}
        <ScrollFade>
          <section className="bg-white text-black py-20 px-6 border-t border-gray-200">
            <div className="max-w-3xl mx-auto space-y-6 text-lg leading-relaxed text-black/80">
              <h2 className="font-playfair text-3xl font-semibold text-gold text-center">
                How the training works
              </h2>
              <p>
                Training runs over around five sessions of three hours each, scheduled with you.
                Each session builds on the last. There’s demonstration, guided practice with each
                other, and time for discussion, reflection and integration. The pace is set by the
                two of you, not by a syllabus.
              </p>
              <p>Everything is confidential, ethical and boundaried. You practise only with each other.</p>
            </div>
          </section>
        </ScrollFade>

        {/* WHO IT'S FOR */}
        <ScrollFade>
          <section className="bg-gray-50 text-black py-20 px-6 border-t border-gray-200">
            <div className="max-w-3xl mx-auto space-y-6 text-lg leading-relaxed text-black/80">
              <h2 className="font-playfair text-3xl font-semibold text-gold text-center">
                Who it’s for
              </h2>
              <ul className="list-disc pl-6 space-y-2">
                <li>Couples who want to deepen intimacy and connection without a group setting</li>
                <li>Couples who’ve found intimacy has become routine, pressured or distant</li>
                <li>Couples who’d like a workshop experience but would rather learn privately</li>
                <li>Couples in any relationship structure</li>
              </ul>
              <p>
                This is teaching, not therapy. If you’d rather focus on communication, trust or
                specific difficulties than learn the ritual,{" "}
                <Link href="/offerings/coaching" className="text-gold underline">
                  intimacy coaching for couples
                </Link>{" "}
                may suit you better.
              </p>
            </div>
          </section>
        </ScrollFade>

        {/* WHAT'S INCLUDED */}
        <ScrollFade>
          <section className="bg-white text-black py-20 px-6 border-t border-gray-200">
            <div className="max-w-3xl mx-auto space-y-6 text-lg leading-relaxed text-black/80">
              <h2 className="font-playfair text-3xl font-semibold text-gold text-center">
                What’s included
              </h2>
              <ul className="list-disc pl-6 space-y-2">
                <li>15 hours of private teaching</li>
                <li>All teaching materials</li>
                <li>Personalised pace and progression</li>
                <li>Discussion, integration and reflection throughout</li>
              </ul>
            </div>
          </section>
        </ScrollFade>

        {/* INVESTMENT */}
        <ScrollFade>
          <section className="bg-black text-white py-20 px-6 border-t border-white/10">
            <div className="max-w-3xl mx-auto text-center space-y-6">
              <h2 className="font-playfair text-3xl font-semibold text-gold">Investment</h2>
              <p className="text-lg leading-relaxed text-white/85">
                <strong>£1,800 per couple.</strong> £350 non-refundable deposit to book. Balance due
                before the first session, or in instalments by arrangement.
              </p>
              <EnquireButton />
            </div>
          </section>
        </ScrollFade>

        {/* PREFER A GROUP */}
        <ScrollFade>
          <section className="bg-gray-50 text-black py-20 px-6 border-t border-gray-200">
            <div className="max-w-3xl mx-auto text-center space-y-6">
              <h2 className="font-playfair text-3xl font-semibold text-gold">
                Prefer to learn in a group?
              </h2>
              <p className="text-lg leading-relaxed text-black/80">
                The 4-day Tantra Massage Training workshop teaches the same complete ritual in a
                small group of singles and couples. Couples can stay together throughout or explore
                working with others. It’s your choice.
              </p>
              <Link
                href="/offerings/workshops"
                className="inline-block px-8 py-3 rounded-lg border border-gold text-gold font-semibold hover:bg-gold hover:text-black transition"
              >
                Tantra massage training workshops →
              </Link>
            </div>
          </section>
        </ScrollFade>

        <Testimonials items={testimonials} />

        {/* FAQ */}
        <ScrollFade>
          <section className="bg-white py-20 px-6 border-t border-gray-200 text-black">
            <div className="max-w-3xl mx-auto">
              <h2 className="font-playfair text-2xl font-semibold text-gold mb-8 text-center">
                Couples training FAQ
              </h2>
              <FaqList items={couplesTrainingFaqs} />
              <div className="text-center mt-10 space-y-3">
                <Link href="/faq" className="block text-gold hover:underline font-semibold">
                  More questions? See the full FAQ →
                </Link>
                <Link href="/about" className="block text-gold hover:underline">
                  About Wesley Tan →
                </Link>
              </div>
            </div>
          </section>
        </ScrollFade>
      </main>
    </>
  );
}
