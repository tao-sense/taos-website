"use client";

import Image from "next/image";
import Link from "next/link";
import ScrollFade from "@/components/ScrollFade";
import { tantraPageFaqs } from "@/lib/faq";
import { classicTantraStories } from "@/lib/client-stories";

export default function TantraPage() {
  return (
    <main className="bg-black text-white relative">
      {/* Hero */}
      <section className="relative h-[90vh] flex flex-col items-center justify-center text-center">
        <Image
          src="/images/tantrabed.webp"
          alt="Classic Tantra Massage in Stroud – The Art of Sensuality (TAOS)"
          fill
          className="object-cover opacity-95"
        />

        <div className="relative z-10 max-w-2xl px-6">
          <ScrollFade>
            <h1 className="font-playfair text-4xl md:text-6xl font-semibold text-gold mb-4">
              Tantra Massage
            </h1>
          </ScrollFade>

          <ScrollFade delay={0.1}>
            <p className="text-lg text-white/80 mb-8">
              A sacred journey of ritual, ceremony, and touch — honouring the
              spirit of life within you. Experience professional Tantra Massage
              in Stroud, Gloucestershire with The Art of Sensuality (TAOS).
            </p>
          </ScrollFade>

          {/* Hero CTA */}
          <ScrollFade delay={0.2}>
            <Link
              href="/contact"
              className="inline-block px-8 py-3 rounded-xl bg-gold text-black font-semibold hover:opacity-90 transition"
            >
              Book Your Tantra Massage →
            </Link>
          </ScrollFade>
        </div>

        {/* Scroll Prompt (Chevron) */}
        <div className="absolute bottom-20 left-1/2 transform -translate-x-1/2">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-6 w-6 text-gold animate-bounce"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            strokeWidth={2}
          >
            <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" />
          </svg>
        </div>
      </section>

      {/* Intro */}
      <ScrollFade>
        <section className="bg-white text-black py-20 px-6">
          {/* Gold Swirl Divider */}
          <div className="flex justify-center mb-10">
            <Image
              src="/images/swirl-divider.png"
              alt="Decorative gold swirl divider – Tantra Massage at The Art of Sensuality"
              width={200}
              height={60}
              className="h-12 md:h-16 w-auto"
            />
          </div>

          <div className="max-w-4xl mx-auto grid md:grid-cols-2 gap-10 items-center">
            <div className="space-y-6">
              <p className="text-lg">
                This bodywork blends intuitive touch, breathwork, and energetic
                awareness to gently dissolve tension and shame — making space
                for pleasure, clarity, and deep emotional release. Held in a
                safe, honouring container, the experience invites a deeper
                homecoming to your body, your boundaries, and your authentic
                desire.
              </p>
              <p className="text-lg">
                Each 2-hour session begins with simple ritual and ceremony
                before flowing into deliciously slow and sensual massage of the
                whole body. Every gesture is offered with devotion, honouring
                the wholeness of who you are. Sessions are available in Stroud,
                Gloucestershire, and tailored to your needs.
              </p>
            </div>
            <div className="relative h-80 rounded-2xl overflow-hidden shadow-lg">
              <Image
                src="/images/tantragesture.webp"
                alt="Tantra Massage gesture and technique – Stroud Gloucestershire TAOS"
                fill
                className="object-cover"
              />
            </div>
          </div>
        </section>
      </ScrollFade>

      {/* Credentials */}
      <section className="bg-white text-black py-5 px-6 border-t border-gray-100">
        <div className="max-w-4xl mx-auto text-center">
          <p className="text-sm text-black/55 leading-relaxed">
            <Link href="/about" className="font-medium text-black/75 hover:text-black transition">
              Wesley Tan BOst BSc
            </Link>
            {" · "}Graduated in osteopathy from the British School of Osteopathy (2007){" · "}Co-founded{" "}
            <a
              href="https://maps.app.goo.gl/Gvc7iqfTti9y96Hu6"
              target="_blank"
              rel="noopener"
              className="underline underline-offset-2 hover:text-black/80 transition"
            >
              Forma Massage &amp; Osteopathy
            </a>{" "}
            in Stroud with his wife Claire, a registered osteopath, in 2008{" · "}Trained in Tantra Massage with Spiritual Tantra, Berlin (2019) and the Yindo school, Berlin (2023)
          </p>
        </div>
      </section>

      {/* Session Details */}
      <ScrollFade delay={0.1}>
        <section className="bg-gray-50 py-20 px-6 text-black">
          {/* Gold Swirl Divider */}
          <div className="flex justify-center mb-10">
            <Image
              src="/images/swirl-divider.png"
              alt="Decorative gold swirl divider – Tantra Massage Details"
              width={200}
              height={60}
              className="h-12 md:h-16 w-auto"
            />
          </div>

          <div className="max-w-4xl mx-auto grid md:grid-cols-2 gap-10 items-start">
            <div>
              <h2 className="font-playfair text-2xl font-semibold text-gold mb-6">
                Session Details
              </h2>
              <ul className="list-disc pl-6 space-y-2 text-black/80">
                <li>
                  <strong>Duration:</strong> 2 hours
                </li>
                <li>
                  <strong>Format:</strong> Private 1-to-1 session
                </li>
                <li>
                  <strong>Setting:</strong> The massage takes place on a soft
                  floor bed rather than a table. This accentuates comfort and
                  letting go, and keeps giver and receiver on the same level — a
                  core principle of Tantra Massage.
                </li>
                <li>
                  <strong>Flow:</strong> Sessions begin with a greeting ritual
                  and a touch of ceremony, moving into slow, full-body massage
                  supported by intuitive touch, breathwork, and energetic
                  awareness.
                </li>
                <li>
                  <strong>Equality:</strong> At every stage both giver and
                  receiver remain in equal states of covering or undress — always
                  guided by consent and comfort.
                </li>
                <li>
                  <strong>Atmosphere:</strong> A safe, confidential, and
                  non-judgmental space; the natural wood of our log cabin
                  combined with soothing music, woodburner warmth and soft
                  lighting.
                </li>
              </ul>
            </div>
            <div className="relative h-80 rounded-2xl overflow-hidden shadow-lg">
              <Image
                src="/images/silk.webp"
                alt="Tantra Massage space and environment – The Art of Sensuality Stroud"
                fill
                className="object-cover"
              />
            </div>
          </div>
        </section>
      </ScrollFade>

      {/* Mid-Page CTA */}
      <section className="bg-black text-center py-16">
        <p className="text-white/80 text-lg mb-6">
          Every journey begins with a single step — or in this case, a touch.
        </p>
        <Link
          href="/contact"
          className="inline-block px-8 py-3 rounded-xl bg-gold text-black font-semibold hover:opacity-90 transition"
        >
          Reserve Your Session →
        </Link>
      </section>

      {/* Who I Work With */}
      <ScrollFade delay={0.2}>
        <section className="bg-white text-black py-20 px-6 border-t border-gray-200">
          {/* Gold Swirl Divider */}
          <div className="flex justify-center mb-10">
            <Image
              src="/images/swirl-divider.png"
              alt="Decorative gold swirl divider – Tantra Massage Client Information"
              width={200}
              height={60}
              className="h-12 md:h-16 w-auto"
            />
          </div>

          <div className="max-w-3xl mx-auto text-lg space-y-4">
            <h2 className="font-playfair text-2xl font-semibold text-gold">Who I Work With</h2>

            <p>
              I currently offer 1-to-1{" "}
              <strong>Tantra Massage sessions in Stroud</strong> for women only.
              This boundary allows me to hold a space that remains aligned with
              the nature of my work and my personal experience in this field. For
              couples, see{" "}
              <Link
                href="/offerings/couples-tantra-massage-training"
                className="text-gold font-semibold hover:underline"
              >
                Couples Tantra Massage Training
              </Link>{" "}
              or{" "}
              <Link
                href="/offerings/coaching"
                className="text-gold font-semibold hover:underline"
              >
                Intimacy Coaching
              </Link>
              .
            </p>

            <p>
              The session includes a{" "}
              <strong className="text-gold font-semibold">yoni massage</strong>{" "}
              — the Sanskrit term for the vulva — as an integral part of the
              full-body experience. In Tantra Massage, no part of the body is
              excluded or treated with shame; every area is honoured with
              presence, respect, and care.
            </p>

            <p>
              You always have complete sovereignty over your body. Any
              boundaries or limits you wish to set can be discussed and agreed
              upon before the session begins, and you are free to express, pause,
              or stop at any point. Your comfort, consent, and inner safety
              remain at the heart of the practice.
            </p>
          </div>
        </section>
      </ScrollFade>

      {/* Emotional Arc */}
      <ScrollFade delay={0.3}>
        <section className="bg-black py-20 px-6 text-center border-t border-white/10">
          {/* Gold Swirl Divider */}
          <div className="flex justify-center mb-10">
            <Image
              src="/images/swirl-divider.png"
              alt="Decorative gold swirl divider – Tantra Massage Healing and Transformation"
              width={200}
              height={60}
              className="h-12 md:h-16 w-auto opacity-90"
            />
          </div>

          <div className="max-w-3xl mx-auto space-y-6">
            <p className="text-white/80 text-lg">
              Many of us carry conditioning, shame, trauma, or a sense of
              disconnection from our bodies.{" "}
              <strong>Tantra Massage</strong> is an opportunity to soften those
              layers and return to the simple beauty of being touched — with
              presence, honour, and care.
            </p>
          </div>
        </section>
      </ScrollFade>

      {/* Testimonials */}
      <ScrollFade delay={0.35}>
        <section className="bg-white text-black py-20 px-6 border-t border-gray-200">
          <div className="flex justify-center mb-10">
            <Image
              src="/images/swirl-divider.png"
              alt="Decorative gold swirl divider – Tantra Massage Client Stories"
              width={200}
              height={60}
              className="h-12 md:h-16 w-auto"
            />
          </div>

          <div className="max-w-3xl mx-auto">
            <h2 className="font-playfair text-2xl font-semibold text-gold mb-10 text-center">
              Client Experiences
            </h2>

            <div className="space-y-10">
              {classicTantraStories.map((story) => (
                <blockquote key={story.id} className="border-l-2 border-gold/40 pl-6">
                  <p className="text-lg leading-relaxed text-black/80 italic">
                    &ldquo;{story.preview}&rdquo;
                  </p>
                  <footer className="mt-3 text-sm font-semibold text-gold">— {story.initials}</footer>
                </blockquote>
              ))}
            </div>

            <div className="text-center mt-12">
              <Link
                href="/client-stories"
                className="text-gold hover:underline font-semibold"
              >
                Read more client stories →
              </Link>
            </div>
          </div>
        </section>
      </ScrollFade>

      {/* Mini FAQ Section */}
      <ScrollFade delay={0.4}>
        <section className="bg-gray-50 py-20 px-6 border-t border-gray-200 text-black">
          {/* Gold Swirl Divider */}
          <div className="flex justify-center mb-10">
            <Image
              src="/images/swirl-divider.png"
              alt="Decorative gold swirl divider – Tantra Massage FAQs"
              width={200}
              height={60}
              className="h-12 md:h-16 w-auto"
            />
          </div>

          <div className="max-w-3xl mx-auto">
            <h2 className="font-playfair text-2xl font-semibold text-gold mb-8 text-center">
              Tantra Massage FAQs
            </h2>
            <div className="space-y-6 text-black/80">
              {tantraPageFaqs.map((item) => (
                <div key={item.question}>
                  <h3 className="font-semibold text-black mb-2">{item.question}</h3>
                  {item.answer.map((paragraph, i) => (
                    <p key={i}>{paragraph.map((part) => (typeof part === "string" ? part : part.text))}</p>
                  ))}
                </div>
              ))}
            </div>

            <div className="text-center mt-10">
              <Link
                href="/faq"
                className="inline-block text-gold hover:underline font-semibold"
              >
                View all FAQs →
              </Link>
            </div>
          </div>
        </section>
      </ScrollFade>

      {/* Session Investment */}
      <ScrollFade delay={0.5}>
        <section className="bg-white text-black px-6 py-20 text-center border-t border-gold/30">
          {/* Gold Swirl Divider */}
          <div className="flex justify-center mb-10">
            <Image
              src="/images/swirl-divider.png"
              alt="Decorative gold swirl divider – Tantra Massage Pricing"
              width={200}
              height={60}
              className="h-12 md:h-16 w-auto"
            />
          </div>

          <div className="max-w-2xl mx-auto space-y-6">
            <h2 className="font-playfair text-2xl md:text-3xl font-bold text-gold">
              Session Investment
            </h2>

            <p className="text-lg text-black/80">
              A Tantra Massage session is a sacred meeting — a journey into
              trust, embodiment, and presence. Sessions take place in a private,
              peaceful space in <strong>Stroud, Gloucestershire</strong>, with
              The Art of Sensuality (TAOS).
            </p>

            <p className="text-base text-black/60">
              Clients travel from Stonehouse, Nailsworth, Painswick, Gloucester,
              Cheltenham, Cirencester, Tetbury, Dursley, Bath and Bristol.
            </p>

            <div className="text-3xl font-semibold text-black mt-6">
              £180{" "}
              <span className="text-lg font-normal text-black/70">· 2 hours</span>
            </div>

            <p className="text-md text-neutral-600 italic">
              Longer or personalised sessions are available upon request.
            </p>
          </div>

          {/* Final CTA with increased margin */}
          <div className="bg-gradient-to-b from-gold/10 to-white py-16 px-6 text-center mt-20 rounded-xl shadow-md">
            <h2 className="text-2xl md:text-3xl font-semibold text-black mb-6">
              Ready to experience Tantra Massage in Stroud?
            </h2>
            <Link
              href="/contact"
              className="inline-block px-8 py-3 rounded-xl bg-gold text-black font-semibold hover:opacity-90 transition"
            >
              Book Your Session →
            </Link>
          </div>
        </section>
      </ScrollFade>

      {/* Floating Mobile CTA */}
      <div className="fixed bottom-4 right-4 z-50 md:hidden">
        <Link
          href="/contact"
          className="bg-gold text-black font-semibold px-5 py-3 rounded-full shadow-lg hover:opacity-90 transition"
        >
          Book Now
        </Link>
      </div>
    </main>
  );
}