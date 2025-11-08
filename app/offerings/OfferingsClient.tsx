"use client";

import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import { ChevronDown } from "lucide-react";
import ScrollFade from "@/components/ScrollFade";

export default function OfferingsClient() {
  return (
    <main className="bg-black text-white">
      {/* HERO */}
      <section className="relative h-[90vh] flex items-center justify-center text-center">
        <Image
          src="/images/offeringsgold.png"
          alt="Tantra Massage Workshops and Offerings by TAOS in Stroud, Gloucestershire"
          fill
          className="object-cover opacity-100"
          priority
        />

        <div className="relative z-10 max-w-2xl px-6">
          <ScrollFade>
            <h1 className="text-4xl md:text-6xl font-bold text-gold mb-4">
              Our Offerings
            </h1>
          </ScrollFade>

          <ScrollFade delay={0.1}>
            <p className="text-lg text-white/80">
              Three distinct paths — massage, seminars, and coaching — each
              designed to invite you deeper into connection, pleasure, and
              authentic presence. These are the core services of TAOS.
            </p>
          </ScrollFade>
        </div>

        <div className="absolute bottom-6 z-10 animate-bounce">
          <ChevronDown className="text-gold w-8 h-8 opacity-80" />
        </div>

        <div className="absolute inset-0 bg-black/30" />
      </section>

      {/* OFFERINGS GRID */}
      <ScrollFade type="stagger" staggerChildren={0.3} distance={40}>
        <section className="bg-white py-20 text-black">
          <div className="flex justify-center mb-10">
            <Image
              src="/images/swirl-divider.png"
              alt="Decorative gold swirl divider – The Art of Sensuality TAOS"
              width={200}
              height={60}
              className="h-12 md:h-16 w-auto"
            />
          </div>

          <motion.div
            className="container mx-auto px-6 grid md:grid-cols-3 gap-10"
            variants={{
              hidden: {},
              visible: {
                transition: { staggerChildren: 0.3, delayChildren: 0.2 },
              },
            }}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.15 }}
          >
            {/* Card 1 */}
            <motion.div
              variants={{
                hidden: { opacity: 0, y: 40 },
                visible: {
                  opacity: 1,
                  y: 0,
                  transition: { duration: 0.8, ease: [0.25, 0.1, 0.25, 1] },
                },
              }}
              className="bg-white rounded-2xl overflow-hidden border border-gray-200 shadow-xl hover:shadow-2xl transition-shadow duration-300"
            >
              <Image
                src="/images/workshop-card.png"
                alt="Tantra Massage Workshops across the UK – Learn Tantra Massage with TAOS"
                width={600}
                height={400}
                className="w-full h-56 object-cover"
              />
              <div className="p-6">
                <h2 className="text-2xl font-semibold text-gold mb-3">
                  Tantra Massage Seminars
                </h2>
                <p className="mb-4">
                  For men, women, singles, and couples — learn the art of Tantra
                  Massage in transformative workshops that nourish connection,
                  trust, and pleasure. Safety and consent form the foundation
                  for authentic meeting.
                </p>
                <Link
                  href="/offerings/workshops"
                  className="inline-block px-4 py-2 rounded-xl bg-gold text-black hover:opacity-90"
                >
                  Explore Events →
                </Link>
              </div>
            </motion.div>

            {/* Card 2 */}
            <motion.div
              variants={{
                hidden: { opacity: 0, y: 40 },
                visible: {
                  opacity: 1,
                  y: 0,
                  transition: { duration: 0.8, ease: [0.25, 0.1, 0.25, 1] },
                },
              }}
              className="bg-white rounded-2xl overflow-hidden border border-gray-200 shadow-xl hover:shadow-2xl transition-shadow duration-300"
            >
              <Image
                src="/images/coaching.png"
                alt="Intimacy Coaching in Stroud – Personal and Couples Sessions by The Art of Sensuality"
                width={600}
                height={400}
                className="w-full h-56 object-cover"
              />
              <div className="p-6">
                <h2 className="text-2xl font-semibold text-gold mb-3">
                  Intimacy Coaching
                </h2>
                <p className="mb-4">
                  Guidance for couples and singles to move through blockages
                  around sex and intimacy. Rekindle curiosity, see one another
                  anew, and bring deeper dimensions into your intimate life.
                </p>
                <Link
                  href="/offerings/coaching"
                  className="inline-block px-4 py-2 rounded-xl bg-gold text-black hover:opacity-90"
                >
                  Read More →
                </Link>
              </div>
            </motion.div>

            {/* Card 3 */}
            <motion.div
              variants={{
                hidden: { opacity: 0, y: 40 },
                visible: {
                  opacity: 1,
                  y: 0,
                  transition: { duration: 0.8, ease: [0.25, 0.1, 0.25, 1] },
                },
              }}
              className="bg-white rounded-2xl overflow-hidden border border-gray-200 shadow-xl hover:shadow-2xl transition-shadow duration-300"
            >
              <Image
                src="/images/tantrabed.png"
                alt="Classic Tantra Massage in Stroud – Sensual Full-Body Healing by TAOS"
                width={600}
                height={400}
                className="w-full h-56 object-cover"
              />
              <div className="p-6">
                <h2 className="text-2xl font-semibold text-gold mb-3">
                  Classic Tantra Massage
                </h2>
                <p className="mb-4">
                  Held in a safe space and taken at your own pace,
                  unconditional touch with no expectations. A deeply nourishing
                  full-body experience designed to awaken energy, promote
                  healing, and reconnect you with your sensual self.
                </p>
                <Link
                  href="/offerings/tantra"
                  className="inline-block px-4 py-2 rounded-xl bg-gold text-black hover:opacity-90"
                >
                  Discover Tantra Massage →
                </Link>
              </div>
            </motion.div>
          </motion.div>
        </section>
      </ScrollFade>

      {/* TESTIMONIALS */}
      <ScrollFade delay={0.1}>
        <section className="bg-black py-20 px-6 text-center border-t border-white/10">
          <div className="flex justify-center mb-10">
            <Image
              src="/images/swirl-divider.png"
              alt="Decorative gold swirl divider – TAOS Testimonials Section"
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
                “I hadn’t heard of tantra massage before and was quite nervous.
                Wesley made me feel more than safe — calm, cared for, and
                supported every step. The session brought a release of emotions
                and a deep peace I hadn’t known in years.”
              </blockquote>

              <blockquote className="italic text-white/80 border-l-4 border-gold pl-4">
                “For many years I carried a deep trauma response around
                intimacy. My tantric massage with Wesley was transformative — I
                felt exceptionally safe, deeply cared for, and for the first
                time in a long while, free. It opened me to intimacy again, and
                I’ve since stepped into a new relationship with confidence and
                joy.”
              </blockquote>

              <blockquote className="italic text-white/80 border-l-4 border-gold pl-4">
                “After my massage with Wesley, I felt amazing — as though I’d
                discovered a quiet strength within me. His connection and
                insight are invaluable, and the sense of peace I left with
                continues to ripple through my life.”
              </blockquote>
            </div>
          </div>
        </section>
      </ScrollFade>

      {/* PHILOSOPHY */}
      <ScrollFade delay={0.2}>
        <section className="bg-black py-20 px-6 text-center border-t border-white/10">
          <h2 className="text-3xl font-semibold text-gold mb-4">
            Why These Offerings?
          </h2>
          <p className="max-w-3xl mx-auto text-white/80 text-lg leading-relaxed">
            Each offering is an invitation to strip away conditioning, dissolve
            shame, and embrace sensuality as a path to connection — with
            yourself, with others, and with life.
          </p>
        </section>
      </ScrollFade>

      {/* CTA */}
      <ScrollFade delay={0.3}>
        <section className="bg-white py-20 px-6 text-center">
          <div className="flex justify-center mb-10">
            <Image
              src="/images/swirl-divider.png"
              alt="Decorative gold swirl divider – Call to Action Section"
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