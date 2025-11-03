"use client";

import Image from "next/image";
import Link from "next/link";
import ScrollFade from "@/components/ScrollFade";

export default function Home() {
  return (
    <main className="bg-black text-white overflow-x-hidden">
      {/* HERO */}
      <section className="relative w-full">
        <div className="relative w-full text-center">
          <Image
            src="/images/hero-banner2.jpg"
            alt="Tantra massage"
            width={1600}
            height={900}
            className="w-full max-w-full h-[650px] object-cover object-[50%_80%]"
            priority
          />

          <div className="absolute inset-0 flex flex-col items-center justify-center px-6 bg-black/35">
            {/* Logo + Title */}
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
                </h1>
              </div>
            </ScrollFade>

            <ScrollFade delay={0.1}>
              <p className="mt-2 max-w-2xl text-lg md:text-xl text-white/90">
                Step into a safe, professional space to rediscover presence,
                intimacy, and your deeper self.
              </p>
            </ScrollFade>

            <ScrollFade delay={0.2}>
              <div className="mt-8">
                <Link
                  href="/offerings"
                  className="px-5 py-3 rounded-2xl bg-gold text-black hover:opacity-90"
                >
                  Explore Offerings
                </Link>
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
                alt="About Tao-S"
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
              alt="Modern disconnect"
              fill
              className="object-cover object-center"
              priority
            />
          </div>

          {/* Desktop overlay */}
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

          {/* Mobile stacked text */}
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
                alt="Our Purpose"
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
              <span className="text-gold">
                The Art of Sensuality
              </span>{" "}
              is your path back to love, trust, and authentic living.
            </p>
            <blockquote className="mt-10 italic text-white/70 border-l-4 border-gold pl-4">
              “After my massage I discovered a quiet strength and peace that
              continues to ripple through my life.”
            </blockquote>
          </div>
        </section>
      </ScrollFade>

      {/* OFFERINGS */}
      <ScrollFade>
        <section className="bg-white text-black px-6 py-20">
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

          <div className="max-w-3xl mx-auto mb-16 text-center">
            <blockquote className="italic text-black/80 border-l-4 border-gold pl-4 md:pl-0 md:border-0">
              “For many years I carried a deep trauma response around intimacy.
              My tantric massage with Wesley was a turning point — I felt safe,
              cared for, and free. It opened me to intimacy again, and I’ve since
              stepped into a new relationship with confidence and joy.”
            </blockquote>
          </div>

          <div className="container mx-auto grid md:grid-cols-3 gap-8">
            {/* Cards */}
            <div className="rounded-2xl border border-black/10 bg-black/5 p-6 hover:shadow-lg transition text-left">
              <h3 className="text-xl font-semibold text-gold">
                Tantra Massage Seminars
              </h3>
              <p className="mt-3 text-black/80 leading-relaxed">
                Learn the art of Tantra Massage. Transformational workshop
                experiences that invite you to feel more alive, nourish
                connection, trust and pleasure.
              </p>
              <Link
                href="/offerings/workshops"
                className="mt-5 inline-block px-4 py-2 rounded-xl bg-gold text-black hover:opacity-90"
              >
                Learn More
              </Link>
            </div>

            <div className="rounded-2xl border border-black/10 bg-black/5 p-6 hover:shadow-lg transition text-left">
              <h3 className="text-xl font-semibold text-gold">
                Intimacy Coaching
              </h3>
              <p className="mt-3 text-black/80 leading-relaxed">
                A guided journey into deeper connection, sensual awareness, and
                embodied presence — rooted in the art and principles of Tantra
                massage.
              </p>
              <Link
                href="/offerings/coaching"
                className="mt-5 inline-block px-4 py-2 rounded-xl bg-gold text-black hover:opacity-90"
              >
                Begin the Journey
              </Link>
            </div>

            <div className="rounded-2xl border border-black/10 bg-black/5 p-6 hover:shadow-lg transition text-left">
              <h3 className="text-xl font-semibold text-gold">
                Classic Tantra Massage
              </h3>
              <p className="mt-3 text-black/80 leading-relaxed">
                Experience the transformative power of Tantra Massage. Reconnect
                with your sensual self, free from learned conditions. Awaken the
                senses & open your heart.
              </p>
              <Link
                href="/offerings/tantra"
                className="mt-5 inline-block px-4 py-2 rounded-xl bg-gold text-black hover:opacity-90"
              >
                Book a Session
              </Link>
            </div>
          </div>
        </section>
      </ScrollFade>

      {/* STAY CONNECTED */}
      <ScrollFade>
        <section className="bg-neutral-900 text-center px-6 py-20">
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