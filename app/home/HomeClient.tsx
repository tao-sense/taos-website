"use client";

import Image from "next/image";
import Link from "next/link";
import ScrollFade from "@/components/ScrollFade";
import { motion } from "framer-motion";

// ✅ PAGE-SPECIFIC METADATA
export const metadata = {
  title:
    "Tantra Massage, Workshops & Intimacy Coaching | The Art of Sensuality (TAOS)",
  description:
    "Experience Tantra Massage, Intimacy Coaching, and Tantra Massage Workshops with TAOS — based in Stroud, Gloucestershire and teaching across the UK.",
  keywords: [
    "Tantra Massage",
    "Tantra Massage Workshops",
    "Massage Workshops",
    "Intimacy Coaching",
    "Sensual Massage",
    "Tantra Stroud",
    "TAOS",
    "The Art of Sensuality",
  ],
  openGraph: {
    title: "Tantra Massage Workshops & Intimacy Coaching | TAOS",
    description:
      "Join TAOS for Tantra Massage Workshops, private Tantra sessions, and Intimacy Coaching in Stroud and across the UK.",
    url: "https://theartofsensuality.com",
    siteName: "The Art of Sensuality",
    images: [
      {
        url: "https://theartofsensuality.com/images/og-home.jpg",
        width: 1200,
        height: 630,
        alt: "TAOS Tantra Massage, Workshops and Intimacy Coaching",
      },
    ],
    locale: "en_GB",
    type: "website",
  },
  alternates: {
    canonical: "https://theartofsensuality.com",
  },
};

export default function Home() {
  return (
    <main className="bg-black text-white overflow-x-hidden">
      {/* HERO */}
      <section className="relative w-full">
        <div className="relative w-full text-center">
          <Image
            src="/images/hero-banner2.jpg"
            alt="Tantra Massage, Workshops and Intimacy Coaching with TAOS"
            width={1600}
            height={900}
            className="w-full max-w-full h-[650px] object-cover object-[50%_80%]"
            priority
          />

          <div className="absolute inset-0 flex flex-col items-center justify-center px-6 bg-black/35">
            <ScrollFade>
              <div className="flex flex-col md:flex-row items-center justify-center gap-4 mb-4">
                <Image
                  src="/images/taos-logo.png"
                  alt="TAOS Logo"
                  width={90}
                  height={90}
                  priority
                  className="shrink-0 w-20 h-20 md:w-28 md:h-28"
                />
                <h1 className="text-4xl md:text-6xl font-bold">
                  The <span className="text-gold">Art of Sensuality</span>
                  <br className="hidden md:block" />
                  <span className="text-white/90 text-2xl md:text-3xl block mt-6 font-normal">
                    Tantra Massage, Workshops & Intimacy Coaching
                  </span>
                </h1>
              </div>
            </ScrollFade>

            <ScrollFade delay={0.2}>
              <div className="mt-8">
                <a
                  href="#offerings"
                  className="px-5 py-3 rounded-2xl bg-gold text-black hover:opacity-90"
                >
                  Explore Offerings
                </a>
              </div>
            </ScrollFade>
          </div>

          {/* Scroll Chevron */}
          <div className="absolute bottom-6 left-1/2 transform -translate-x-1/2">
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
        </div>
      </section>

      {/* ABOUT */}
      <ScrollFade>
        <section id="about" className="bg-white text-black px-6 py-20">
          <div className="flex justify-center mb-10">
            <Image
              src="/images/swirl-divider.png"
              alt="Decorative gold swirl divider"
              width={200}
              height={60}
              className="h-12 md:h-16 w-auto"
            />
          </div>

          <div className="flex justify-center mb-10">
            <div className="text-base md:text-lg leading-relaxed text-black/90 text-centre mb-10 mt-2 max-w-2xl ">
              <p>
                Step into a safe, professional space to rediscover presence,
                intimacy, and your deeper self.
              </p>
            </div>
          </div>

          <div className="container mx-auto grid md:grid-cols-2 gap-10 items-center">
            <div>
              <h2 className="text-3xl md:text-4xl font-semibold text-gold mb-6 text-left">
                About TAOS
              </h2>
              <div className="space-y-6 text-base md:text-lg leading-relaxed text-left">
                <p>
                  We are here to re-awaken what makes us truly human: the ability
                  to feel, to connect, to share, to be creative and live with
                  authenticity and compassion.
                </p>
                <p>
                  TAOS is about stripping away conditioning, dissolving shame,
                  and rediscovering the richness of sensuality as a path to
                  deeper connection — with yourself, with others, and with life
                  itself.
                </p>
              </div>
              <blockquote className="mt-8 italic text-black/70 border-l-4 border-gold pl-4">
                “I was nervous at first, but Wesley made me feel completely safe.
                His calming presence gave me peace I hadn’t felt in years.”
              </blockquote>
            </div>
            <div className="relative w-full h-64 md:h-80 rounded-xl overflow-hidden">
              <Image
                src="/images/about-taos.png"
                alt="About TAOS – Tantra Massage and Intimacy Coaching in Stroud"
                fill
                className="object-cover"
              />
            </div>
          </div>
        </section>
      </ScrollFade>

      {/* MODERN DISCONNECT */}
      <ScrollFade>
        <section className="relative w-full">
          <div className="relative w-full h-64 sm:h-80 md:h-[600px]">
            <Image
              src="/images/modern-disconnect.png"
              alt="Modern disconnect – representing isolation and loss of connection in contemporary life
t"
              fill
              className="object-cover object-center"
              priority
            />
          </div>

          <div className="hidden md:flex absolute inset-0 bg-black/30 items-center">
            <div className="container mx-auto px-6 py-20 max-w-3xl text-left">
              <h2 className="text-3xl md:text-4xl font-semibold text-gold mb-6">
                The Modern Disconnect
              </h2>
              <div className="space-y-6 text-white/90 text-base md:text-lg leading-relaxed">
                <p>
                  In today’s modern world, life often moves faster than we can
                  follow. Technology makes many tasks easier, yet it quietly
                  erodes the very fabric of human connection. While we are
                  globally connected, many of us feel more isolated than ever.
                </p>
                <p>
                  Screens replace faces. Messages replace touch. More people work
                  from home than ever before. The pandemic left its mark —
                  causing distrust between friends and families.
                </p>
                <p>
                  Internet pornography has become the reference point for many on
                  matters of sex — leaving out the richness of real intimacy,
                  presence, and tenderness.
                </p>
                <p>
                  In this environment, embodied, loving, intimate touch feels
                  increasingly absent — and for some, past wounds or trauma can
                  make the longing for safe connection feel even further away.
                </p>
              </div>
            </div>
          </div>

          <div className="block md:hidden bg-black px-6 py-12">
            <h2 className="text-2xl font-semibold text-gold mb-4">
              The Modern Disconnect
            </h2>
            <div className="space-y-4 text-white/90 text-base leading-relaxed">
              <p>
                In today’s modern world, life often moves faster than we can
                follow. Technology makes many tasks easier, yet it quietly erodes
                the very fabric of human connection. While we are globally
                connected, many of us feel more isolated than ever.
              </p>
              <p>
                Screens replace faces. Messages replace touch. More people work
                from home than ever before. The pandemic left its mark — causing
                distrust between friends and families.
              </p>
              <p>
                Internet pornography has become the reference point for many on
                matters of sex — leaving out the richness of real intimacy,
                presence, and tenderness.
              </p>
              <p>
                In this environment, embodied, loving, intimate touch feels
                increasingly absent — and for some, past wounds or trauma can make
                the longing for safe connection feel even further away.
              </p>
            </div>
          </div>
        </section>
      </ScrollFade>

      {/* OUR PURPOSE */}
      <ScrollFade>
        <section className="bg-white text-black px-6 py-20">
          <div className="flex justify-center mb-10">
            <Image
              src="/images/swirl-divider.png"
              alt="Decorative gold swirl"
              width={200}
              height={60}
              className="h-12 md:h-16 w-auto"
            />
          </div>

          <div className="container mx-auto grid md:grid-cols-2 gap-10 items-center">
            <div>
              <h2 className="text-3xl md:text-4xl font-semibold text-gold mb-6 text-left">
                Our Purpose
              </h2>
              <div className="space-y-6 text-base md:text-lg leading-relaxed text-left">
                <p>
                  TAOS exists to repair and heal these wounds — not only the
                  modern disconnect, but also the personal scars of shame, fear,
                  or trauma that can linger in our intimate lives.
                </p>
                <p>
                  Through Tantra massage — individual sessions, workshops, and
                  retreats — we guide people back to embodied touch as joy, the
                  natural beauty of the body, self-love and pleasure as gateways
                  to wholeness, and authentic intimacy as a way of life.
                </p>
              </div>
              <blockquote className="mt-8 italic text-black/70 border-l-4 border-gold pl-4">
                “My tantric massage with Wesley was transformative — I felt
                exceptionally safe, deeply cared for, and for the first time in a
                long while, free.”
              </blockquote>
            </div>
            <div className="relative w-full h-64 md:h-80 rounded-xl overflow-hidden">
              <Image
                src="/images/purpose.png"
                alt="Our Purpose – Tantra Massage and Intimacy Coaching with The Art of Sensuality
"
                fill
                className="object-cover"
              />
            </div>
          </div>
        </section>
      </ScrollFade>

      {/* THE TAOS PATH */}
      <ScrollFade>
        <section
          className="relative bg-black text-white px-6 py-24 overflow-hidden"
          style={{
            backgroundImage: "url('/images/taos-path2.png')",
            backgroundSize: "cover",
            backgroundPosition: "center",
          }}
        >
          <div className="absolute inset-0 bg-black/30"></div>
          <div className="relative z-10 max-w-3xl mx-auto text-left">
            <div className="flex justify-center mb-10">
              <Image
                src="/images/swirl-divider.png"
                alt="Decorative gold swirl"
                width={200}
                height={60}
                className="h-12 md:h-16 w-auto opacity-90"
              />
            </div>

            <h2 className="text-3xl md:text-4xl font-semibold text-gold mb-6">
              The TAOS Path
            </h2>
            <p className="text-white/85 text-lg mb-8">
              TAOS is more than an offering — it’s a journey:
            </p>
            <ol className="space-y-6 text-base md:text-lg leading-relaxed">
              <li>
                <span className="text-gold font-semibold">
                  From disconnection → to connection:
                </span>{" "}
                Restore attunement to body and breath; meet others from presence.
              </li>
              <li>
                <span className="text-gold font-semibold">
                  From conditioning → to freedom:
                </span>{" "}
                Soften scripts and shoulds; discover your natural pace and desire.
              </li>
              <li>
                <span className="text-gold font-semibold">
                  From distraction → to presence:
                </span>{" "}
                Return to what’s true, simple, and alive now.
              </li>
            </ol>
            <p className="mt-10 text-white/90 text-lg">
              ✨{" "}
              <span className="text-gold">The Art of Sensuality</span> is your
              path back to love, trust, and authentic living.
            </p>
            <blockquote className="mt-10 italic text-white/70 border-l-4 border-gold pl-4">
              “After my massage I discovered a quiet strength and peace that
              continues to ripple through my life.”
            </blockquote>
          </div>
        </section>
      </ScrollFade>

 {/* OFFERINGS */}
<section
  id="offerings"
  className="bg-white text-black px-6 py-20 scroll-mt-20"
>
  {/* Divider + quote fade in */}
  <ScrollFade>
    <div className="flex justify-center mb-10">
      <Image
        src="/images/swirl-divider.png"
        alt="Decorative gold swirl"
        width={200}
        height={60}
        className="h-12 md:h-16 w-auto"
      />
    </div>

    <div className="max-w-3xl mx-auto mb-16 text-center">
      <blockquote className="italic text-black/80 border-l-4 border-gold pl-4 md:pl-0 md:border-0">
        “For many years I carried a deep trauma response around intimacy.
        My tantric massage with Wesley was a turning point — I felt safe,
        cared for, and free. It opened me to intimacy again, and I’ve since
        stepped into a new relationship with confidence and joy.”
      </blockquote>
    </div>
  </ScrollFade>

  {/* ✅ Explicit stagger container */}
  <ScrollFade type="stagger" staggerChildren={0.3} distance={40}>
    <motion.div
      className="container mx-auto grid md:grid-cols-3 gap-8"
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
      {[
        {
          title: "Tantra Massage Seminars",
          text: "Learn the art of Tantra Massage. Transformational workshop experiences that invite you to feel more alive, nourish connection, trust and pleasure.",
          href: "/offerings/workshops",
          link: "Learn More",
        },
        {
          title: "Intimacy Coaching",
          text: "A guided journey into deeper connection, sensual awareness, and embodied presence — rooted in the art and principles of Tantra massage.",
          href: "/offerings/coaching",
          link: "Begin the Journey",
        },
        {
          title: "Classic Tantra Massage",
          text: "Experience the transformative power of Tantra Massage. Reconnect with your sensual self, free from learned conditions. Awaken the senses & open your heart.",
          href: "/offerings/tantra",
          link: "Book a Session",
        },
      ].map((card, i) => (
        <motion.div
          key={i}
          variants={{
            hidden: { opacity: 0, y: 40 },
            visible: {
              opacity: 1,
              y: 0,
              transition: {
                duration: 0.7,
                ease: [0.25, 0.1, 0.25, 1] as [number, number, number, number],
              },
            },
          }}
          className="rounded-2xl border border-black/10 bg-black/5 p-6 hover:shadow-lg transition text-left"
        >
          <h3 className="text-xl font-semibold text-gold">{card.title}</h3>
          <p className="mt-3 text-black/80 leading-relaxed">{card.text}</p>
          <Link
            href={card.href}
            className="mt-5 inline-block px-4 py-2 rounded-xl bg-gold text-black hover:opacity-90"
          >
            {card.link}
          </Link>
        </motion.div>
      ))}
    </motion.div>
  </ScrollFade>
</section>

      {/* STAY CONNECTED */}
      <ScrollFade>
        <section className="bg-neutral-900 text-center px-6 py-20">
          <div className="flex justify-center mb-10">
            <Image
              src="/images/swirl-divider.png"
              alt="Decorative gold swirl"
              width={200}
              height={60}
              className="h-12 md:h-16 w-auto opacity-90"
            />
          </div>

          <h2 className="text-3xl md:text-4xl font-semibold text-gold mb-4">
            Stay Connected
          </h2>
          <p className="text-white/85 max-w-2xl mx-auto leading-relaxed text-lg">
            Be the first to know about upcoming workshops, retreats, and new
            online experiences as TAOS evolves. You can join our mailing list
            using the form below.
          </p>
        </section>
      </ScrollFade>
    </main>
  );
}