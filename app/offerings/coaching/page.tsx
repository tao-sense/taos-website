"use client";

import Image from "next/image";
import Link from "next/link";
import { ChevronDown } from "lucide-react";
import ScrollFade from "@/components/ScrollFade";

export default function IntimacyCoachingPage() {
  return (
    <main className="bg-black text-white">
      {/* Hero Section */}
      <section className="relative h-[90vh] flex flex-col items-center justify-center text-center overflow-hidden">
        <Image
          src="/images/coaching.png"
          alt="Intimacy Coaching at TAOS"
          fill
          className="object-cover opacity-95"
          priority
        />
        <div className="relative z-10 px-6">
          <h1 className="text-4xl md:text-6xl font-bold text-gold mb-4">
            Intimacy Coaching
          </h1>
          <p className="max-w-2xl mx-auto text-lg text-white/85">
            A guided journey into deeper connection, sensual awareness, and
            embodied presence — rooted in the art and principles of Tantra
            massage.
          </p>
        </div>

        {/* Scroll Chevron */}
        <div className="absolute bottom-6 z-10 animate-bounce">
          <ChevronDown className="text-gold w-8 h-8 opacity-80" />
        </div>

        {/* Overlay */}
        <div className="absolute inset-0 bg-black/30"></div>
      </section>

      {/* Introduction (Full-width White) */}
      <ScrollFade>
        <section className="bg-white text-black">
          {/* Gold Swirl Divider */}
          <div className="flex justify-center mb-10 pt-20">
            <Image
              src="/images/swirl-divider.png"
              alt="Decorative gold swirl"
              width={200}
              height={60}
              className="h-12 md:h-16 w-auto"
            />
          </div>

          <div className="max-w-4xl mx-auto px-6 pb-20 space-y-6 text-center">
            <p className="text-black/80 leading-relaxed text-lg">
              <strong className="text-gold">Intimacy Coaching with TAOS</strong> is
              a guided, experiential approach designed to help individuals and couples
              explore a more conscious, connected, and fulfilling experience of sensuality
              and intimacy. It is{" "}
              <span className="text-gold font-medium">not counselling or psychotherapy</span>{" "}
              but an embodied learning process — where awareness, presence, and
              communication take centre stage.
            </p>

            <p className="text-black/80 leading-relaxed text-lg">
              Through body-based awareness practices and the principles of{" "}
              <span className="text-gold">Tantra massage</span>, you’ll learn to slow
              down, listen, and rediscover the joy of touch and connection — free from
              pressure or performance.
            </p>

            <div className="text-center mt-12 space-x-6">
              <Link href="#couples-coaching" className="text-gold hover:underline font-medium">
                Couples
              </Link>
              <span className="text-black/40">|</span>
              <Link href="#individuals" className="text-gold hover:underline font-medium">
                Individuals
              </Link>
            </div>
          </div>
        </section>
      </ScrollFade>

      {/* Working with Couples (Full-width Soft Grey) */}
      <ScrollFade>
        <section className="bg-black-100 text-white">
          {/* Gold Swirl Divider */}
          <div className="flex justify-center mb-10 pt-20">
            <Image
              src="/images/swirl-divider.png"
              alt="Decorative gold swirl"
              width={200}
              height={60}
              className="h-12 md:h-16 w-auto opacity-90"
            />
          </div>

          <div className="max-w-5xl mx-auto px-6 pb-20 space-y-10 text-center">
            <h2 className="text-3xl md:text-4xl font-bold text-gold">
              Working with Couples
            </h2>
            <p className="text-white/80 leading-relaxed text-lg max-w-3xl mx-auto">
              There are two main ways couples can work with TAOS. You may wish to begin with{" "}
              <Link href="#couples-coaching" className="text-gold hover:underline">
                Intimacy Coaching sessions
              </Link>{" "}
              — a gentle, conversational exploration of Tantra-inspired principles, or
              immerse yourselves more deeply through the{" "}
              <Link href="#couples-training" className="text-gold hover:underline">
                Tantra Massage Training for Couples
              </Link>{" "}
              — a structured and hands-on learning journey. Both are designed to restore trust,
              connection, and playfulness through presence rather than performance.
            </p>
          </div>
        </section>
      </ScrollFade>

      {/* Intimacy Coaching for Couples */}
      <ScrollFade>
        <section
          id="couples-coaching"
          className="bg-white text-black py-20 px-6 border-t border-gray-200"
        >
          {/* Gold Swirl Divider */}
          <div className="flex justify-center mb-10">
            <Image
              src="/images/swirl-divider.png"
              alt="Decorative gold swirl"
              width={200}
              height={60}
              className="h-12 md:h-16 w-auto"
            />
          </div>

          <div className="max-w-5xl mx-auto space-y-10 text-center">
            <h2 className="text-3xl md:text-4xl font-bold text-gold">
              Intimacy Coaching for Couples
            </h2>

            <p className="max-w-3xl mx-auto text-lg leading-relaxed text-black/80">
              Not every couple wishes to learn the Tantra massage ritual itself.
              For many, the first step is to rediscover ease, curiosity, and
              emotional connection. These sessions provide a safe, guided space to
              explore the{" "}
              <strong className="text-gold">principles of Tantra</strong> —
              presence over performance, play over pressure, and communication
              grounded in awareness.
            </p>

            <div className="grid md:grid-cols-2 gap-10 items-center">
              {/* Text Column */}
              <div className="space-y-6 text-left max-w-md mx-auto">
                <ul className="list-disc list-inside space-y-2 text-lg leading-relaxed text-black/80">
                  <li>Guided exploration of trust, presence, and communication</li>
                  <li>Playful, sensual, and mindful connection exercises</li>
                  <li>Reflective dialogue and emotional listening</li>
                  <li>Movement and breath awareness practices (fully clothed)</li>
                  <li>Integration of Tantra principles into daily life</li>
                </ul>

                {/* Pricing Box */}
                <div className="bg-black/5 rounded-2xl p-6 mt-6 text-center border border-black/10">
                  <h3 className="text-2xl font-semibold text-gold mb-3">
                    Investment
                  </h3>
                  <p className="text-lg text-black/80">
                    <strong>£150</strong> – 2-hour standalone session <br />
                    <strong>£400</strong> – 3-session package (prepaid)
                  </p>
                  <p className="text-sm text-black/60 mt-3">
                    Sessions are tailored to each couple’s needs and may include
                    dialogue, movement, and light touch-based awareness work
                    within clear boundaries.
                  </p>
                </div>

                {/* Consultation Box */}
                <div className="bg-black/5 rounded-2xl p-6 mt-6 text-center border border-black/10">
                  <h3 className="text-2xl font-semibold text-gold mb-3">
                    Optional Consultation
                  </h3>
                  <p className="text-lg text-black/80">
                    <strong>£60</strong> – 60-minute initial consultation <br />
                    (credited toward any package if you continue)
                  </p>
                  <p className="text-sm text-black/60 mt-3">
                    A gentle first step to share your story, discuss your
                    intentions, and explore which pathway may serve you best.
                  </p>
                </div>
              </div>

              {/* Image Column */}
              <div className="relative h-80 rounded-2xl overflow-hidden shadow-lg">
                <Image
                  src="/images/hands.png"
                  alt="Intimacy Coaching for Couples"
                  fill
                  className="object-cover opacity-90"
                />
              </div>
            </div>

            <p className="max-w-3xl mx-auto text-base text-black/70 leading-relaxed pt-6">
              These sessions are ideal for couples curious about Tantra who wish
              to strengthen connection without learning the full massage ritual.
            </p>

            <div className="pt-8 text-center">
              <Link
                href="/contact"
                className="inline-block px-8 py-3 rounded-lg bg-gold text-black font-semibold hover:opacity-90 transition"
              >
                Enquire or Book a Consultation
              </Link>
            </div>
          </div>
        </section>
      </ScrollFade>

      {/* Tantra Massage Training for Couples */}
      <ScrollFade>
        <section
          id="couples-training"
          className="bg-black text-white py-20 px-6 border-t border-white/10 border-b border-white/10"
        >
          {/* Gold Swirl Divider */}
          <div className="flex justify-center mb-10">
            <Image
              src="/images/swirl-divider.png"
              alt="Decorative gold swirl"
              width={200}
              height={60}
              className="h-12 md:h-16 w-auto opacity-90"
            />
          </div>

          <div className="max-w-6xl mx-auto space-y-12 text-center">
            <h2 className="text-3xl md:text-4xl font-bold text-gold">
              Tantra Massage Training for Couples
            </h2>

            <p className="max-w-3xl mx-auto text-white/80 text-lg leading-relaxed">
              For couples who wish to go deeper, this bespoke training offers the
              complete Tantra Massage ritual and sequence taught across
              approximately 15 hours of guided tuition. Sessions combine
              demonstration, guided practice, and integration — all within a safe
              and professional environment.
            </p>

            <div className="grid md:grid-cols-2 gap-6 lg:gap-10 items-center max-w-4xl mx-auto">
              {/* Text Column */}
              <div className="space-y-6 text-left max-w-md mx-auto">
                <ul className="list-disc list-inside text-white/80 text-lg leading-relaxed space-y-2">
                  <li>15 hours total (typically 5 × 3-hour sessions)</li>
                  <li>Step-by-step teaching of the full Tantra Massage ritual</li>
                  <li>Personalised pace and progression for each couple</li>
                  <li>Includes discussion, integration, and reflection</li>
                  <li>Confidential, ethical, and boundaried setting</li>
                </ul>

                <div className="bg-white/10 rounded-2xl p-6 mt-6 text-center border border-white/20">
                  <h3 className="text-2xl font-semibold text-gold mb-2">
                    Investment
                  </h3>
                  <p className="text-white/85 text-lg">
                    <strong>£1,800 per couple</strong> <br />
                    (includes all teaching and materials)
                  </p>
                  <p className="text-white/70 text-sm mt-2 leading-relaxed">
                    <span className="text-gold font-medium">Deposit:</span> £350 non-refundable — required to secure your booking.  
                    Remaining balance due before the first session or payable in instalments by arrangement.
                  </p>
                </div>
              </div>

              {/* Image Column */}
              <div className="relative h-[36rem] md:h-[42rem] rounded-2xl overflow-hidden shadow-lg flex items-center justify-center bg-black/10">
                <Image
                  src="/images/oilyhands.png"
                  alt="Tantra Massage Training for Couples"
                  fill
                  className="object-contain md:object-scale-down opacity-95"
                  sizes="(max-width: 768px) 100vw, 50vw"
                  priority
                />
              </div>
            </div>

            <div className="pt-8 text-center">
              <Link
                href="/contact"
                className="inline-block px-8 py-3 rounded-lg bg-gold text-black font-semibold hover:opacity-90 transition"
              >
                Enquire About Training
              </Link>
            </div>
          </div>
        </section>
      </ScrollFade>

      {/* For Individuals */}
      <ScrollFade>
        <section
          id="individuals"
          className="bg-white text-black py-20 px-6 border-t border-gray-200"
        >
          {/* Gold Swirl Divider */}
          <div className="flex justify-center mb-10">
            <Image
              src="/images/swirl-divider.png"
              alt="Decorative gold swirl"
              width={200}
              height={60}
              className="h-12 md:h-16 w-auto"
            />
          </div>

          <div className="max-w-5xl mx-auto space-y-8">
            <h2 className="text-3xl md:text-4xl font-bold text-center text-gold">
              For Individuals
            </h2>
            <p className="text-lg leading-relaxed">
              One-to-one sessions provide a safe and supported space to explore
              your own relationship with sensuality, confidence, and embodied
              awareness. This process may include breathwork, mindfulness, and
              guided touch-based learning (where appropriate and within agreed
              boundaries).
            </p>
            <p className="text-lg leading-relaxed">
              Many people seek this work to navigate common experiences such as:
            </p>
            <ul className="list-disc list-inside space-y-2 text-lg">
              <li>Performance anxiety</li>
              <li>Premature ejaculation</li>
              <li>Difficulty reaching orgasm</li>
              <li>Numbness, shame, or disconnection</li>
            </ul>
            <p className="text-lg leading-relaxed">
              The focus is educational and somatic — an invitation to reconnect
              with the wisdom of your body, not a form of clinical treatment.
            </p>
            <div className="bg-black/5 rounded-2xl p-8 mt-10 text-center border border-black/10">
              <h3 className="text-2xl font-semibold text-gold mb-4">Investment</h3>
              <p className="text-black/80 text-lg">
                <strong>£70</strong> – 60 minutes <br />
                <strong>£100</strong> – 90 minutes <br />
              </p>
              <p className="text-black/60 text-sm mt-4">
                Sessions are guided within clear, ethical boundaries and always
                tailored to your comfort level.
              </p>
            </div>
            <div className="text-center pt-8">
              <Link
                href="/contact"
                className="inline-block px-8 py-3 rounded-lg bg-gold text-black font-semibold hover:opacity-90 transition"
              >
                Enquire or Book
              </Link>
            </div>
          </div>
        </section>
      </ScrollFade>
    </main>
  );
}