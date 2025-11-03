'use client';

import { useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronDown } from 'lucide-react';
import ScrollFade from '@/components/ScrollFade';

export default function ClientStoriesPage() {
  const [openStory, setOpenStory] = useState<number | null>(null);
  const toggleStory = (index: number) => {
    setOpenStory(openStory === index ? null : index);
  };

  return (
    <main className="bg-black text-white">
      {/* HERO */}
      <section className="relative h-[90vh] flex items-center justify-center text-center">
        <Image
          src="/images/client-stories.png"
          alt="Client Stories - TAOS"
          fill
          className="object-cover opacity-90"
        />
        <div className="relative z-10 max-w-2xl px-6">
          <h1 className="text-4xl md:text-6xl font-bold text-gold mb-4">
            Client Stories
          </h1>
          <p className="text-lg text-white/85">
            Real experiences from those who have walked the TAOS path — stories of
            safety, release, and rediscovery.
          </p>
        </div>

        {/* Scroll Chevron */}
        <div className="absolute bottom-6 z-10 animate-bounce">
          <ChevronDown className="text-gold w-8 h-8 opacity-80" />
        </div>

        {/* Overlay */}
        <div className="absolute inset-0 bg-black/30"></div>
      </section>

      {/* --- Swirl + Intro Section --- */}
      <ScrollFade>
        <section className="bg-white text-black py-20 px-6 text-center">
          <div className="flex justify-center mb-10">
            <Image
              src="/images/swirl-divider.png"
              alt="Decorative gold swirl"
              width={200}
              height={60}
              className="h-12 md:h-16 w-auto"
            />
          </div>

          <div className="max-w-3xl mx-auto text-lg leading-relaxed space-y-6 text-justify">
            <p>
              Each story below was shared with permission and reflects the deeply
              personal nature of this work. Some identifying details have been
              adjusted to honour privacy, yet the essence of each experience remains
              true.
            </p>
            <p>
              These are not testimonials in the traditional sense, but lived accounts
              of transformation — glimpses into what it means to reconnect with one’s
              body, heart, and authentic sensuality.
            </p>
          </div>
        </section>
      </ScrollFade>

      {/* STORIES */}
      <ScrollFade delay={0.1}>
        <section className="bg-white text-black py-20 px-6 border-t border-gray-100">
          <div className="max-w-3xl mx-auto space-y-20">
            {/* Story 1 */}
            <article>
              <h2 className="text-2xl font-semibold text-gold mb-4">
                Finding Safety and Peace
              </h2>
              <p className="text-lg leading-relaxed">
                “I hadn’t heard of a Tantra Massage and was quite nervous, but Wesley
                made me feel more than safe. He was professional, considerate, and
                checked in often to ensure I was comfortable.”
              </p>

              <AnimatePresence initial={false}>
                {openStory === 1 && (
                  <motion.div
                    key="story1"
                    initial={{ opacity: 0, y: -10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -10 }}
                    transition={{ duration: 0.5 }}
                    className="mt-4 space-y-4 text-lg leading-relaxed"
                  >
                    <p>
                      “He has a very calming presence and healing energy. I have never
                      experienced such a release, celebration, and healing of feelings
                      and emotions. Wesley provides a safe space and time to express
                      emotions freely.”
                    </p>
                    <p>
                      “I am still feeling a deep peace. Prior to my Tantra Massage, I
                      was having frequent nightmares, but since the massage I no longer
                      have them. I am so grateful — thank you, Wesley.”
                    </p>
                    <p className="font-semibold text-gold">— C.A.</p>
                  </motion.div>
                )}
              </AnimatePresence>

              <button
                onClick={() => toggleStory(1)}
                className="mt-4 text-gold hover:underline focus:outline-none"
              >
                {openStory === 1 ? 'Read less ▲' : 'Read more ▼'}
              </button>
            </article>

            <div className="h-px w-full bg-gradient-to-r from-transparent via-gold/60 to-transparent my-10" />

            {/* Story 2 */}
            <article>
              <h2 className="text-2xl font-semibold text-gold mb-4">
                From Trauma to Freedom
              </h2>
              <p className="text-lg leading-relaxed">
                “For many years, I grappled with a deep-seated trauma response around
                intimacy and my root chakra. My journey eventually brought me to
                Wesley Tan, whose expertise in Tantra Massage therapy presented a new
                path forward.”
              </p>

              <AnimatePresence initial={false}>
                {openStory === 2 && (
                  <motion.div
                    key="story2"
                    initial={{ opacity: 0, y: -10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -10 }}
                    transition={{ duration: 0.5 }}
                    className="mt-4 space-y-4 text-lg leading-relaxed"
                  >
                    <p>
                      “My session with Wes was nothing short of transformative.
                      Lasting two hours, the Tantra Massage was conducted with utmost
                      care, creating an environment where I felt exceptionally safe,
                      held, and deeply cared for. For the first time in a long while,
                      I experienced a profound sense of release and a genuine orgasm —
                      a moment of liberation I hadn’t thought possible.”
                    </p>
                    <p>
                      “The impact has been far-reaching in my life. It acted as a
                      catalyst not only for sexual awakening but also for personal
                      empowerment and emotional healing. I’ve since ventured into the
                      world of dating and, to my delight, entered a relationship —
                      something I previously thought unattainable due to my past
                      trauma.”
                    </p>
                    <p>
                      “Wesley’s skilled approach helped me break through the
                      stagnation in my root chakra, bringing newfound freedom and
                      openness in both my sexual and personal life. His therapy was one
                      of the key elements in my journey towards healing and
                      rediscovery.”
                    </p>
                    <p className="font-semibold text-gold">— C.B.</p>
                  </motion.div>
                )}
              </AnimatePresence>

              <button
                onClick={() => toggleStory(2)}
                className="mt-4 text-gold hover:underline focus:outline-none"
              >
                {openStory === 2 ? 'Read less ▲' : 'Read more ▼'}
              </button>
            </article>

            <div className="h-px w-full bg-gradient-to-r from-transparent via-gold/60 to-transparent my-10" />

            {/* Story 3 */}
            <article>
              <h2 className="text-2xl font-semibold text-gold mb-4">
                A Quiet Strength Awakened
              </h2>
              <p className="text-lg leading-relaxed">
                “After my massage I felt amazing — Wesley’s connection and insight are
                invaluable, and the sense of peace I left with continues to ripple
                through my life.”
              </p>

              <AnimatePresence initial={false}>
                {openStory === 3 && (
                  <motion.div
                    key="story3"
                    initial={{ opacity: 0, y: -10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -10 }}
                    transition={{ duration: 0.5 }}
                    className="mt-4 text-lg leading-relaxed"
                  >
                    <p>
                      “I have felt a quiet strength since my massage — not sure what to
                      do with it, but it makes me feel peaceful. I can’t say how
                      privileged I feel for this experience. Thank you.”
                    </p>
                    <p className="font-semibold text-gold">— C.C.</p>
                  </motion.div>
                )}
              </AnimatePresence>

              <button
                onClick={() => toggleStory(3)}
                className="mt-4 text-gold hover:underline focus:outline-none"
              >
                {openStory === 3 ? 'Read less ▲' : 'Read more ▼'}
              </button>
            </article>
          </div>
        </section>
      </ScrollFade>

      {/* CLOSING CTA */}
      <ScrollFade delay={0.2}>
        <section className="bg-black text-center py-20 px-6">
          <h2 className="text-3xl md:text-4xl font-semibold text-gold mb-4">
            Begin Your Own Journey
          </h2>
          <p className="max-w-2xl mx-auto text-white/80 text-lg mb-8">
            These stories began with a single decision — the courage to explore, to
            feel, and to trust. Your path will be your own, but you are not alone.
          </p>
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