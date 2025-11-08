"use client";

import Image from 'next/image';
import Link from 'next/link';
import ScrollFade from '@/components/ScrollFade';

export default function TantraPage() {
  return (
    <main className="bg-black text-white">
      {/* Hero */}
      <section className="relative h-[90vh] flex items-center justify-center text-center">
        <Image
          src="/images/tantrabed.png"
          alt="Classic Tantra Massage in Stroud – The Art of Sensuality (TAOS)"
          fill
          className="object-cover opacity-95"
        />

        <div className="relative z-10 max-w-2xl px-6">
          <ScrollFade>
            <h1 className="text-4xl md:text-6xl font-bold text-gold mb-4">
              Tantra Massage
            </h1>
          </ScrollFade>

          <ScrollFade delay={0.1}>
            <p className="text-lg text-white/80">
              A sacred journey of ritual, ceremony, and touch — honouring the spirit of life
              within you. Experience professional Tantra Massage in Stroud, Gloucestershire
              with The Art of Sensuality (TAOS).
            </p>
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
                This bodywork blends intuitive touch, breathwork, and energetic awareness to
                gently dissolve tension and shame — making space for pleasure, clarity, and
                deep emotional release. Held in a safe, honouring container, the experience
                invites a deeper homecoming to your body, your boundaries, and your authentic
                desire.
              </p>
              <p className="text-lg">
                Each 2-hour session begins with simple ritual and ceremony before flowing
                into deliciously slow and sensual massage of the whole body. Every gesture is
                offered with devotion, honouring the wholeness of who you are. Sessions are
                available in Stroud, Gloucestershire, and tailored to your needs.
              </p>
            </div>
            <div className="relative h-80 rounded-2xl overflow-hidden shadow-lg">
              <Image
                src="/images/tantragesture.png"
                alt="Tantra Massage gesture and technique – Stroud Gloucestershire TAOS"
                fill
                className="object-cover"
              />
            </div>
          </div>
        </section>
      </ScrollFade>

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
              <h2 className="text-2xl font-semibold text-gold mb-6">Session Details</h2>
              <ul className="list-disc pl-6 space-y-2 text-black/80">
                <li><strong>Duration:</strong> 2 hours</li>
                <li><strong>Format:</strong> Private 1-to-1 session</li>
                <li>
                  <strong>Setting:</strong> The massage takes place on a soft floor bed
                  rather than a table. This accentuates comfort and letting go, and keeps
                  giver and receiver on the same level — a core principle of Tantra Massage.
                </li>
                <li>
                  <strong>Flow:</strong> Sessions begin with a greeting ritual and a touch of
                  ceremony, moving into slow, full-body massage supported by intuitive touch,
                  breathwork, and energetic awareness.
                </li>
                <li>
                  <strong>Equality:</strong> At every stage both giver and receiver remain in
                  equal states of covering or undress — always guided by consent and comfort.
                </li>
                <li>
                  <strong>Atmosphere:</strong> A safe, confidential, and non-judgmental
                  space; the natural wood of our log cabin combined with soothing music, woodburner warmth and soft lighting.
                </li>
              </ul>
            </div>
            <div className="relative h-80 rounded-2xl overflow-hidden shadow-lg">
              <Image
                src="/images/silk.png"
                alt="Tantra Massage space and environment – The Art of Sensuality Stroud"
                fill
                className="object-cover"
              />
            </div>
          </div>
        </section>
      </ScrollFade>

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
            <h2 className="text-2xl font-semibold text-gold">Who I Work With</h2>

            <p>
              I currently offer 1-to-1 <strong>Tantra Massage sessions in Stroud</strong> for women only. 
              This boundary allows me to hold a space that remains aligned with the nature of my work and my
              personal experience in this field. I also offer a service for couples (where at least
              one partner is a woman); more details about this offering can be found in the{' '}
              <Link href="/offerings/coaching" className="text-gold font-semibold hover:underline">
                Intimacy Coaching
              </Link>{' '}
              section.
            </p>

            <p>
              The session includes a <strong className="text-gold font-semibold">yoni massage</strong> — the
              Sanskrit term for the vulva — as an integral part of the full-body experience.
              In Tantra Massage, no part of the body is excluded or treated with shame; every area
              is honoured with presence, respect, and care.
            </p>

            <p>
              You always have complete sovereignty over your body. Any boundaries or limits you
              wish to set can be discussed and agreed upon before the session begins, and you are
              free to express, pause, or stop at any point. Your comfort, consent, and inner safety
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
              Many of us carry conditioning, shame, trauma, or a sense of disconnection from
              our bodies. <strong>Tantra Massage</strong> is an opportunity to soften those layers 
              and return to the simple beauty of being touched — with presence, honour, and care.
            </p>
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
            <h2 className="text-2xl font-semibold text-gold mb-8 text-center">
              Tantra Massage FAQs
            </h2>
            <div className="space-y-6 text-black/80">
              <div>
                <h3 className="font-semibold text-black mb-2">Will I be naked during the massage?</h3>
                <p>
                  The session begins with both of us covered in a lunghi (sarong). As the
                  massage progresses, clothing may be removed — always at your pace, and
                  always with equal states of dress. You will never be pushed beyond what
                  feels right for you.
                </p>
              </div>

              <div>
                <h3 className="font-semibold text-black mb-2">Is orgasm the goal of Tantra Massage?</h3>
                <p>
                  No. The focus is on presence, connection, and awakening the body’s natural
                  flow of energy. Orgasms may happen, but they are not expected or required.
                  What matters is how you feel in your body — relaxed, alive, and more
                  connected to yourself.
                </p>
              </div>

              <div>
                <h3 className="font-semibold text-black mb-2">What if I feel uncomfortable at any point?</h3>
                <p>
                  You are always in charge of the session. You can pause, adjust, or stop at
                  any time. Consent and clear communication are the foundation of Tantra
                  Massage, so your boundaries are fully respected.
                </p>
              </div>

              <div>
                <h3 className="font-semibold text-black mb-2">Can Tantra Massage help if I’ve experienced trauma?</h3>
                <p>
                  Tantra Massage can be a gentle support for reconnecting with your body and
                  rebuilding trust in intimacy. While it is not a substitute for therapy,
                  many people find it helps them soften protective tension and rediscover
                  the pleasure of being touched in a safe, honouring way.
                </p>
              </div>
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
            <h2 className="text-2xl md:text-3xl font-bold text-gold">
              Session Investment
            </h2>

            <p className="text-lg text-black/80">
              A Tantra Massage session is a sacred meeting — a journey into trust,
              embodiment, and presence. Sessions take place in a private, peaceful
              space in <strong>Stroud, Gloucestershire</strong>, with The Art of Sensuality (TAOS).
            </p>

            <div className="text-3xl font-semibold text-black mt-6">
              £180 <span className="text-lg font-normal text-black/70">· 2 hours</span>
            </div>

            <p className="text-md text-neutral-600 italic">
              Longer or personalised sessions are available upon request.
            </p>
          </div>

          <div className="bg-white py-12 px-6 text-center">
            <h2 className="text-2xl md:text-3xl font-semibold text-black mb-6">
              Ready to experience Tantra Massage in Stroud?
            </h2>
            <Link
              href="/contact"
              className="inline-block px-6 py-3 rounded-xl bg-gold text-black font-semibold hover:opacity-90"
            >
              Book Your Session →
            </Link>
          </div>
        </section>
      </ScrollFade>
    </main>
  );
}