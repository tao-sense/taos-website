"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import { ChevronDown } from "lucide-react";
import ScrollFade from "@/components/ScrollFade";
import { classicTantraStories } from "@/lib/client-stories";

// The full story is always rendered (so it's in the server HTML for crawlers)
// and collapsed visually until "Read more" is pressed.
function StoryMore({
  id,
  open,
  onToggle,
  className,
  children,
}: {
  id: string;
  open: boolean;
  onToggle: () => void;
  className: string;
  children: React.ReactNode;
}) {
  return (
    <>
      <motion.div
        id={id}
        initial={false}
        animate={
          open
            ? { height: "auto", opacity: 1, y: 0 }
            : { height: 0, opacity: 0, y: -10 }
        }
        transition={{ duration: 0.5 }}
        className="overflow-hidden"
        aria-hidden={!open}
      >
        <div className={`pt-4 ${className}`}>{children}</div>
      </motion.div>

      <button
        onClick={onToggle}
        aria-expanded={open}
        aria-controls={id}
        className="mt-4 text-gold hover:underline focus:outline-none"
      >
        {open ? "Read less ▲" : "Read more ▼"}
      </button>
    </>
  );
}

export default function ClientStoriesClient() {
  const [openStory, setOpenStory] = useState<number | null>(null);
  const toggleStory = (index: number) =>
    setOpenStory(openStory === index ? null : index);

  return (
    <main className="bg-black text-white">
      {/* HERO */}
      <section className="relative h-[90vh] flex items-center justify-center text-center">
        <Image
          src="/images/client-stories.webp"
          alt="Tantra Massage Client Stories and Experiences – The Art of Sensuality (TAOS)"
          fill
          className="object-cover opacity-90"
          priority
        />
        <div className="relative z-10 max-w-2xl px-6">
          <h1 className="font-playfair text-4xl md:text-6xl font-semibold text-gold mb-4 leading-none">
  Client Stories
  <span className="block text-white/90 font-light text-2xl md:text-3xl leading-tight mt-1">
    Tantra Massage Experiences with The Art of Sensuality (TAOS)
  </span>
</h1>
          <p className="text-lg text-white/85 max-w-2xl mx-auto">
            Real accounts of safety, release, and rediscovery shared by clients
            who experienced Tantra Massage through TAOS.
          </p>
        </div>

        {/* Scroll Chevron */}
        <div className="absolute bottom-6 z-10 animate-bounce">
          <ChevronDown className="text-gold w-8 h-8 opacity-80" />
        </div>
        <div className="absolute inset-0 bg-black/30"></div>
      </section>

      {/* --- Swirl Divider + Intro --- */}
      <ScrollFade>
        <section className="bg-white text-black py-20 px-6 text-center">
          <div className="flex justify-center mb-10">
            <Image
              src="/images/swirl-divider.png"
              alt="Gold decorative swirl divider – The Art of Sensuality"
              width={200}
              height={60}
              className="h-12 md:h-16 w-auto"
            />
          </div>

          <div className="max-w-3xl mx-auto text-lg leading-relaxed space-y-6 text-justify">
            <p>
              Each story shared here reflects the deeply personal nature of this
              work. Some identifying details have been adjusted to honour
              privacy, yet the emotional truth of every experience remains.
            </p>
            <p>
              These are not traditional testimonials but lived journeys of
              healing, reconnection, and transformation through conscious touch
              and presence.
            </p>
          </div>
        </section>
      </ScrollFade>

      {/* STORIES */}
      <ScrollFade delay={0.1}>
        <section className="bg-white text-black py-20 px-6 border-t border-gray-100">
          <div className="max-w-3xl mx-auto space-y-20">
            {classicTantraStories.map((story, index) => (
              <div key={story.id}>
                <article>
                  <h2 className="font-playfair text-2xl font-semibold text-gold mb-4">
                    {story.title}
                  </h2>
                  <p className="text-lg leading-relaxed">
                    &ldquo;{story.preview}&rdquo;
                  </p>

                  <StoryMore
                    id={`story-${index + 1}-more`}
                    open={openStory === index + 1}
                    onToggle={() => toggleStory(index + 1)}
                    className="space-y-4 text-lg leading-relaxed"
                  >
                    {story.extended.map((para, i) => (
                      <p key={i}>&ldquo;{para}&rdquo;</p>
                    ))}
                    <p className="font-semibold text-gold">— {story.initials}</p>
                  </StoryMore>
                </article>

                {index < classicTantraStories.length - 1 && (
                  <div className="h-px w-full bg-gradient-to-r from-transparent via-gold/60 to-transparent my-10" />
                )}
              </div>
            ))}
          </div>
        </section>
      </ScrollFade>

      {/* CLOSING CTA */}
      <ScrollFade delay={0.2}>
        <section className="bg-black text-center py-20 px-6">
          <h2 className="font-playfair text-3xl md:text-4xl font-semibold text-gold mb-4">
            Begin Your Own Journey
          </h2>
          <p className="max-w-2xl mx-auto text-white/80 text-lg mb-8">
            Every transformation begins with a single step — the courage to
            explore, to feel, and to reconnect. Your path will be your own, but
            you are not alone.
          </p>
          <Link
            href="/contact"
            className="inline-block px-6 py-3 rounded-xl bg-gold text-black font-semibold hover:opacity-90 transition"
          >
            Book a Session →
          </Link>
        </section>
      </ScrollFade>
    </main>
  );
}