'use client';

import Image from 'next/image';
import Link from 'next/link';
import { ChevronDown } from "lucide-react";
import ScrollFade from '@/components/ScrollFade';

export default function OfferingsPage() {
  return (
    <main className="bg-black text-white">
      {/* Hero */}
      <section className="relative h-[90vh] flex items-center justify-center text-center">
        <Image
          src="/images/offeringsgold.png"
          alt="TAOS Offerings"
          fill
          className="object-cover opacity-100"
        />
        <div className="relative z-10 max-w-2xl px-6">
          <ScrollFade>
            <h1 className="text-4xl md:text-6xl font-bold text-gold mb-4">
              Our Offerings
            </h1>
          </ScrollFade>

          <ScrollFade delay={0.1}>
            <p className="text-lg text-white/80">
              Three distinct paths — massage, seminars, and coaching — each designed to
              invite you deeper into connection, pleasure, and authentic presence. These are the core services of TAOS.
            </p>
          </ScrollFade>
        </div>

        {/* Scroll Chevron */}
        <div className="absolute bottom-6 z-10 animate-bounce">
          <ChevronDown className="text-gold w-8 h-8 opacity-80" />
        </div>

        {/* Overlay */}
        <div className="absolute inset-0 bg-black/30"></div>
      </section>

      {/* Offerings Grid */}
      <ScrollFade>
        <section className="bg-white py-20 text-black">
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

          <div className="container mx-auto px-6 grid md:grid-cols-3 gap-10">
            {/* Tantra Massage Workshops */}
            <div className="bg-white rounded-2xl overflow-hidden border border-gray-200 shadow-xl hover:shadow-2xl transition-shadow duration-300">
              <Image
                src="/images/workshop-card.png"
                alt="Tantra Massage Workshops"
                width={600}
                height={400}
                className="w-full h-56 object-cover"
              />
              <div className="p-6">
                <h2 className="text-2xl font-semibold text-gold mb-3">
                  Tantra Massage Seminars
                </h2>
                <p className="mb-4">
                  For men, women, singles, and couples — learn the art of Tantra Massage in
                  transformative workshops that nourish connection, trust, and pleasure.
                  Safety and consent form the foundation for authentic meeting.
                </p>
                <Link
                  href="/offerings/workshops"
                  className="inline-block px-4 py-2 rounded-xl bg-gold text-black hover:opacity-90"
                >
                  Explore Events →
                </Link>
              </div>
            </div>

            {/* Intimacy Coaching */}
            <div className="bg-white rounded-2xl overflow-hidden border border-gray-200 shadow-xl hover:shadow-2xl transition-shadow duration-300">
              <Image
                src="/images/coaching.png"
                alt="Intimacy Coaching"
                width={600}
                height={400}
                className="w-full h-56 object-cover"
              />
              <div className="p-6">
                <h2 className="text-2xl font-semibold text-gold mb-3">
                  Intimacy Coaching
                </h2>
                <p className="mb-4">
                  Guidance for couples and singles to move through blockages around sex and
                  intimacy. Rekindle curiosity, see one another anew, and bring deeper
                  dimensions into your intimate life.
                </p>
                <Link
                  href="/offerings/coaching"
                  className="inline-block px-4 py-2 rounded-xl bg-gold text-black hover:opacity-90"
                >
                  Read More →
                </Link>
              </div>
            </div>

            {/* Classic Tantra Massage */}
            <div className="bg-white rounded-2xl overflow-hidden border border-gray-200 shadow-xl hover:shadow-2xl transition-shadow duration-300">
              <Image
                src="/images/tantrabed.png"
                alt="Classic Tantra Massage"
                width={600}
                height={400}
                className="w-full h-56 object-cover"
              />
              <div className="p-6">
                <h2 className="text-2xl font-semibold text-gold mb-3">
                  Classic Tantra Massage
                </h2>
                <p className="mb-4">
                  Held in a safe space and taken at your own pace, unconditional touch with no expectations. 
                  A deeply nourishing full-body experience designed to awaken energy, promote healing, 
                  and reconnect you with your sensual self. These can be single sessions or part of 
                  an ongoing series for deeper exploration.
                </p>
                <Link
                  href="/offerings/tantra"
                  className="inline-block px-4 py-2 rounded-xl bg-gold text-black hover:opacity-90"
                >
                  Discover Tantra Massage →
                </Link>
              </div>
            </div>
          </div>
        </section>
      </ScrollFade>

      {/* Testimonials Section */}
      <ScrollFade delay={0.1}>
        <section className="bg-black py-20 px-6 text-center border-t border-white/10">
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

          <div className="max-w-4xl mx-auto">
            <h2 className="text-3xl md:text-4xl font-semibold text-gold mb-10">
              What Clients Say
            </h2>
            <div className="space-y-12 text-left">
              <blockquote className="italic text-white/80 border-l-4 border-gold pl-4">
                “I hadn’t heard of tantra massage before and was quite nervous. Wesley made me feel more than safe —
                calm, cared for, and supported every step. The session brought a release of emotions and a deep peace
                I hadn’t known in years. I even stopped having the nightmares that had troubled me for so long.”
              </blockquote>

              <blockquote className="italic text-white/80 border-l-4 border-gold pl-4">
                “For many years I carried a deep trauma response around intimacy. My tantric massage with Wesley
                was transformative — I felt exceptionally safe, deeply cared for, and for the first time in a long while, free.
                It opened me to intimacy again, and I’ve since stepped into a new relationship with confidence and joy.”
              </blockquote>

              <blockquote className="italic text-white/80 border-l-4 border-gold pl-4">
                “After my massage with Wesley, I felt amazing — as though I’d discovered a quiet strength within me.
                His connection and insight are invaluable, and the sense of peace I left with continues to ripple through my life.”
              </blockquote>
            </div>
          </div>
        </section>
      </ScrollFade>

      {/* Philosophy Section */}
      <ScrollFade delay={0.2}>
        <section className="bg-black py-20 px-6 text-center border-t border-white/10">

          <h2 className="text-3xl font-semibold text-gold mb-4">
            Why These Offerings?
          </h2>
          <p className="max-w-3xl mx-auto text-white/80 text-lg leading-relaxed">
            Each offering is an invitation to strip away conditioning, dissolve shame, and
            embrace sensuality as a path to connection — with yourself, with others, and with
            life.
          </p>
        </section>
      </ScrollFade>

      {/* CTA Banner */}
      <ScrollFade delay={0.3}>
        <section className="bg-white py-20 px-6 text-center">
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

          <h2 className="text-2xl md:text-3xl font-semibold text-black mb-6">
            Ready to begin your journey?
          </h2>
          <Link
            href="/contact"
            className="inline-block px-6 py-3 rounded-xl bg-gold text-black font-semibold hover:opacity-90"
          >
            Book a Session →
          </Link>
        </section>
      </ScrollFade>
    </main>
  );
}