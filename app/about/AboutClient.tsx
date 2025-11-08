"use client";

import Image from "next/image";
import Link from "next/link";
import ScrollFade from "@/components/ScrollFade";

export default function AboutClient() {
  return (
    <main className="bg-black text-white">
      {/* Hero Section */}
      <section className="relative w-full text-center overflow-hidden bg-[#f3d08b]">
        {/* --- Mobile Version --- */}
        <div className="block md:hidden relative w-full">
          <Image
            src="/images/journey.png"
            alt="Wesley Tan – The Art of Sensuality Journey toward connection"
            width={1920}
            height={1080}
            className="w-full h-auto object-contain object-center"
            priority
          />

          {/* Overlay Text */}
          <div className="absolute inset-0 flex flex-col items-center justify-center z-10 px-6 space-y-4">
            <ScrollFade>
              <h1 className="text-4xl font-bold text-white/90 leading-tight">
                My Journey
                <br />
                <span className="text-white/90 font-light text-2xl">
                  The Story Behind The Art of Sensuality (TAOS)
                </span>
              </h1>
            </ScrollFade>

            <ScrollFade delay={0.1}>
              <p className="text-lg text-white/85 max-w-2xl mx-auto mt-3">
                A path toward connection, love, and an open heart — Tantra Massage in Stroud.
              </p>
            </ScrollFade>

            {/* Scroll Chevron */}
            <div className="absolute bottom-8 animate-bounce z-10">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-6 w-6 text-white"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                strokeWidth={3}
              >
                <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" />
              </svg>
            </div>
          </div>
        </div>

        {/* --- Desktop Version --- */}
        <div className="hidden md:block relative w-full h-[90vh] lg:h-[90vh]">
          <Image
            src="/images/journey.png"
            alt="The Art of Sensuality – My Journey by Wesley Tan"
            fill
            className="object-cover object-[50%_25%]"
            priority
          />

          {/* Overlay Text */}
          <div className="absolute inset-0 flex flex-col items-center justify-center z-10 px-6 space-y-4">
            <ScrollFade>
              <h1 className="text-5xl lg:text-6xl font-bold text-white/90 leading-tight">
                My Journey
                <br />
                <span className="text-white/90 font-light text-3xl">
                  The Story Behind The Art of Sensuality (TAOS)
                </span>
              </h1>
            </ScrollFade>

            <ScrollFade delay={0.1}>
              <p className="text-lg lg:text-xl text-white/85 max-w-2xl mx-auto mt-3">
                A path toward connection, love, and an open heart — Tantra Massage in Stroud.
              </p>
            </ScrollFade>

            {/* Scroll Chevron */}
            <div className="absolute bottom-8 animate-bounce z-10">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-6 w-6 text-white"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                strokeWidth={3}
              >
                <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" />
              </svg>
            </div>
          </div>
        </div>
      </section>

      {/* My Journey */}
      <ScrollFade>
        <section className="bg-white text-black px-6 py-16">
          <div className="flex justify-center mb-6">
            <Image
              src="/images/swirl-divider.png"
              alt="Decorative gold swirl divider from The Art of Sensuality"
              width={200}
              height={60}
              className="h-12 md:h-16 w-auto"
            />
          </div>

          <div className="max-w-3xl mx-auto space-y-10 text-lg leading-relaxed">
            <h2 className="text-3xl font-bold text-gold text-center mb-8 tracking-wide">
              My Journey
            </h2>

            {/* Author Intro */}
            <div className="flex flex-col md:flex-row items-center md:items-start gap-6 mb-10">
              <div className="w-40 h-40 rounded-full overflow-hidden border-4 border-gold shadow-lg">
                <Image
                  src="/images/wesley-tan.jpg"
                  alt="Portrait of Wesley Tan – Founder of The Art of Sensuality (TAOS)"
                  width={160}
                  height={160}
                  className="object-cover w-full h-full"
                />
              </div>

              <div className="text-center md:text-left space-y-1">
                <h3 className="text-2xl font-semibold text-black">Wesley Tan</h3>
                <p className="text-gold font-medium">
                  Founder & Practitioner, TAOS – The Art of Sensuality
                </p>
                <p className="text-black/80 max-w-lg">
                  I’m a qualified osteopath, bodyworker, and teacher of gymnastic
                  fitness with over two decades of experience helping people
                  reconnect with their bodies through movement, awareness, and touch.
                  TAOS is the synthesis of this lifelong journey — blending science,
                  presence, and sensuality into a path of healing and connection.
                </p>
              </div>
            </div>

            {/* Martial Arts & Early Studies */}
            <ScrollFade>
              <div className="space-y-4">
                <p className="italic text-gold/80">
                  “A broader perspective as the path unfolds.”
                </p>
                <p>
                  My path into bodywork and conscious healing began long before I ever
                  heard the word “Tantra.”
                </p>
                <p>
                  In 1994, I stepped into my first Kung Fu class. What began as a
                  physical discipline soon became a gateway into Eastern philosophy,
                  expanded awareness, and alternative approaches to health and the
                  body.
                </p>
                <p>
                  Six years into dedicated training — alongside a degree in Biology —
                  I felt a strong pull to deepen my understanding. This led me to study
                  osteopathy from 2003 to 2007.
                </p>
              </div>
            </ScrollFade>

            {/* Osteopathy & Bodywork */}
            <ScrollFade delay={0.1}>
              <div className="space-y-4">
                <h3 className="text-2xl font-semibold text-gold">
                  Osteopathy & Bodywork
                </h3>
                <p>
                  For over 18 years, I’ve worked with a blend of osteopathy,
                  therapeutic massage, and teaching gymnastic fitness. These
                  modalities gave me an incredible foundation: helping people
                  understand pain, heal injuries, and process emotions stored in the
                  body.
                </p>
                <p className="bg-gold/10 border-l-4 border-gold p-4 italic rounded-md">
                  Yet I often encountered something beyond what these frameworks could
                  fully embrace:{" "}
                  <span className="font-semibold text-black">
                    a longing in some clients for attuned, non-clinical touch.
                  </span>{" "}
                  For care that welcomed sensual and sexual dimensions of being —
                  aspects so often taboo, neglected, or suppressed.
                </p>
              </div>
            </ScrollFade>

            {/* Personal Life & Expansion */}
            <ScrollFade delay={0.2}>
              <div className="space-y-4">
                <h3 className="text-2xl font-semibold text-gold">Meeting the Edges</h3>
                <p>
                  Alongside this professional path, my life with my wife Claire and our
                  two sons has been central. Together, we’ve built our private practice
                  and explored relationship models that invite honesty, reflection, and
                  growth — experiences that continue to deepen my understanding of
                  intimacy and authentic connection.
                </p>
                <p>
                  In 2019, I travelled to Berlin to study with{" "}
                  <Link
                    href="https://www.spiritual-tantra.de"
                    target="_blank"
                    className="text-gold underline"
                  >
                    Spiritual Tantra
                  </Link>
                  . This first immersion into Tantra Massage opened my mind to an
                  entirely new dimension of awareness — one rooted in{" "}
                  <span className="font-semibold text-black">
                    conscious presence
                  </span>
                  , non-judgmental connection, and authentic human touch.
                </p>
                <p>
                  I realised that <span className="italic">loving touch</span> —
                  something that sounds so simple — is, for many of us, an enigma. We
                  long for it, yet we’re rarely shown how to give or receive it without
                  expectation, agenda, or fear.
                </p>
                <p>
                  In 2023, I joined a 10-day retreat in Poland with{" "}
                  <Link
                    href="https://www.yindo-school.com/en/"
                    target="_blank"
                    className="text-gold underline"
                  >
                    Yindo School
                  </Link>
                  . This immersion gave me the clarity to answer the question I had been
                  sitting with since my training with Spiritual Tantra:{" "}
                  <span className="font-semibold text-black">
                    Tantra massage was not only for my personal exploration — it was
                    something I could offer professionally to others.
                  </span>
                </p>
              </div>
            </ScrollFade>

            {/* Today */}
            <ScrollFade delay={0.3}>
              <div className="space-y-4">
                <h3 className="text-2xl font-semibold text-gold">Where I Am Now</h3>
                <p>
                  Today, alongside my therapy practice, I offer the sensitivity and
                  depth of Tantra massage. My approach is{" "}
                  <span className="font-semibold text-black/90">
                    heart-led, trauma-informed, and rooted in presence
                  </span>
                  .
                </p>
                <p>
                  I am deeply grateful to my first clients who, over the past four
                  years, have trusted me with their bodies, emotions, and stories.
                  Their progress and encouragement gave me the confidence to share this
                  work more openly.
                </p>
                <p className="italic text-gold/80">
                  This path is not about quick fixes. It is about reconnection — to your
                  body, your emotions, your sensuality, and ultimately, to your deeper
                  self.
                </p>
              </div>
            </ScrollFade>
          </div>
        </section>
      </ScrollFade>

      {/* History of Tantra */}
      <ScrollFade>
        <section className="bg-black text-white px-6 py-16">
          <div className="flex justify-center mb-6">
            <Image
              src="/images/swirl-divider.png"
              alt="Gold swirl divider – The Art of Sensuality symbol"
              width={200}
              height={60}
              className="h-10 md:h-14 w-auto"
            />
          </div>

          <div className="max-w-3xl mx-auto space-y-8 text-lg leading-relaxed">
            <h2 className="text-3xl font-bold text-gold text-center mb-8 tracking-wide">
              A History of Modern Tantra
            </h2>

            <p>
              Tantra Massage is a contemporary synthesis of ancient wisdom and
              conscious bodywork. Rooted in the spiritual traditions of India, it
              recognises sexual energy not as something to repress or exploit, but as a
              potent force for{" "}
              <span className="font-semibold text-gold">
                healing, awakening, and transformation
              </span>
              .
            </p>

            <p>
              In the late 20th century, Tantra began influencing Western spirituality
              through Neo-Tantra movements, which embraced sensuality, presence, and
              intimacy. In Germany,{" "}
              <strong className="text-gold font-semibold">
                Andro (Andreas Rothe)
              </strong>{" "}
              played a pivotal role in shaping Tantra Massage as a therapeutic
              practice. In the 1990s, he founded the{" "}
              <strong className="text-gold font-semibold">
                Diamond Lotus Institute in Berlin
              </strong>
              , where he developed a ceremonial and deeply healing form of full-body
              massage known as{" "}
              <em className="text-gold font-semibold">
                Tantra Massage according to Andro®
              </em>
              .
            </p>

            <p>
              This approach wove together ritual, energy work, slow conscious touch, and
              emotional release — offering clients a safe space to reconnect beyond
              shame or conditioning. Today, Germany remains a hub for Tantra Massage
              education, with respected institutions such as{" "}
              <strong className="text-gold font-semibold">Diamond Lotus</strong>,{" "}
              <strong className="text-gold font-semibold">AnandaWave</strong>, and the{" "}
              <strong className="text-gold font-semibold">
                Spiritual Tantra Lounge
              </strong>{" "}
              continuing this lineage.
            </p>

            <p className="italic text-gold/80">
              At its heart, Tantra Massage is guided by principles of consent, presence,
              and deep listening — an invitation to awaken not only the body, but the
              soul.
            </p>
          </div>
        </section>
      </ScrollFade>

      {/* CTA Footer */}
      <ScrollFade>
        <section className="bg-white text-black px-6 py-16 text-center">
          <div className="max-w-2xl mx-auto space-y-6">
            <h2 className="text-2xl md:text-3xl font-bold text-gold">
              Ready to Experience This Work?
            </h2>
            <p className="text-lg text-black/80">
              Explore our offerings and discover how Tantra massage can support you in
              reconnecting with your body, your emotions, and your deeper self.
            </p>
            <Link
              href="/offerings"
              className="inline-block bg-gold text-black font-semibold px-6 py-3 rounded-lg hover:bg-black hover:text-gold transition"
            >
              Explore Offerings
            </Link>
          </div>
        </section>
      </ScrollFade>
    </main>
  );
}