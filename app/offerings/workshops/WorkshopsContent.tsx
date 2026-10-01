"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { ChevronDown } from "lucide-react";
import ScrollFade from "@/components/ScrollFade";
import AtAGlance from "@/components/AtAGlance";
import FaqList from "@/components/FaqList";
import { trainingFaqs } from "@/lib/faq";

type Workshop = {
  id: string;
  title: string;
  description: string | null;
  date: string | Date;
  location: string | null;
  link: string | null;
};

function formatDate(date: string | Date) {
  return new Date(date)
    .toLocaleDateString("en-GB", {
      weekday: "long",
      day: "2-digit",
      month: "long",
      year: "numeric",
    })
    .replace(",", "");
}

function workshopHref(w: Workshop) {
  return w.link || `/offerings/workshops/${w.id}`;
}

function SwirlDivider({ alt }: { alt: string }) {
  return (
    <div className="flex justify-center mb-10">
      <Image
        src="/images/swirl-divider.png"
        alt={alt}
        width={200}
        height={60}
        className="h-12 md:h-16 w-auto"
      />
    </div>
  );
}

const pathway = [
  {
    title: "Foundation training (4 days)",
    text: "Learn the complete ritual. Certificate and manual.",
  },
  {
    title: "Return and deepen",
    text: "Come back to future workshops at a reduced returner rate to keep refining your practice. Returner rates are available on request.",
  },
  {
    title: "Professional mentoring",
    text: "If you want to offer Tantra Massage professionally, ongoing one-to-one mentoring is available on request.",
  },
  {
    title: "Advanced courses (coming)",
    text: "Specific advanced trainings will open once enough people have completed the foundation. Join the interest list to hear first.",
  },
];

export default function WorkshopsContent({ workshops }: { workshops: Workshop[] }) {
  const [firstName, setFirstName] = useState("");
  const [email, setEmail] = useState("");
  const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">("idle");
  const [message, setMessage] = useState("");

  const nextWorkshop = workshops.find((w) => new Date(w.date) >= new Date()) ?? null;

  const handleInterestSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setStatus("loading");
    setMessage("");

    try {
      const res = await fetch("/api/workshop-interest", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          firstName,
          email,
          source: "uk_tantra_workshop_general",
        }),
      });

      const data = await res.json();

      if (!res.ok) {
        throw new Error(data?.error || "Submission failed");
      }

      setStatus("success");
      setMessage("Thank you — you’re on the interest list.");
      setFirstName("");
      setEmail("");
    } catch (error) {
      console.error(error);
      setStatus("error");
      setMessage(
        error instanceof Error ? error.message : "Sorry, something went wrong. Please try again."
      );
    }
  };

  return (
    <main className="bg-black text-white">
      {/* HERO SECTION */}
      <section className="relative h-[90vh] w-full flex items-center justify-center text-center overflow-hidden">
        <Image
          src="/images/workshops.png"
          alt="Tantra massage training workshop UK – The Art of Sensuality (TAOS)"
          fill
          className="object-cover opacity-90"
          priority
        />

        <div className="relative z-10 px-6">
          <ScrollFade>
            <h1 className="font-playfair text-4xl md:text-6xl font-semibold text-gold mb-4">
              Tantra Massage Training — 4-Day Foundation Workshop
            </h1>
          </ScrollFade>

          <ScrollFade delay={0.4}>
            <p className="text-lg md:text-xl text-white/90 max-w-2xl mx-auto">
              Learn the complete Tantra Massage ritual over four days, in a small group of
              singles and couples. You leave with a TAOS certificate, a printed step-by-step
              manual of the full routine, and the ability to give a complete Tantra Massage.
              Whether that’s for your own life and relationships or as the foundation for
              professional practice is up to you.
            </p>
          </ScrollFade>
        </div>

        <div className="absolute bottom-6 z-10 animate-bounce">
          <ChevronDown className="text-gold w-8 h-8 opacity-80" />
        </div>
        <div className="absolute inset-0 bg-black/30"></div>
      </section>

      {/* AT A GLANCE */}
      <section className="bg-gray-50 text-black px-6 py-16 border-t border-gray-200">
        <AtAGlance
          items={[
            {
              label: "Format",
              value: "4 days, residential or day venue, approx. 7 hours/day",
            },
            {
              label: "Who",
              value: "Women and men, singles and couples. No experience needed",
            },
            {
              label: "You receive",
              value:
                "TAOS certificate of attendance and completion of basic training · printed step-by-step manual of the complete routine and ritual",
            },
            {
              label: "Group",
              value:
                "Singles and couples. We aim for a balanced number of women and men. You choose your practice partners.",
            },
            {
              label: "Next date",
              value: nextWorkshop ? (
                <Link href={workshopHref(nextWorkshop)} className="text-gold underline">
                  {nextWorkshop.title}, {formatDate(nextWorkshop.date)}
                </Link>
              ) : (
                "New dates coming soon. Join the interest list for priority notice."
              ),
            },
            { label: "Teacher", value: "Wesley Tan BOst BSc" },
          ]}
        />

        <div className="mt-10 flex flex-col sm:flex-row gap-4 justify-center">
          <a
            href="#upcoming-dates"
            className="inline-block text-center px-8 py-3 rounded-lg bg-gold text-black font-semibold hover:opacity-90 transition"
          >
            See upcoming dates
          </a>
          <a
            href="#interest-list"
            className="inline-block text-center px-8 py-3 rounded-lg border border-gold text-gold font-semibold hover:bg-gold hover:text-black transition"
          >
            Join the interest list
          </a>
        </div>
      </section>

      {/* WHAT THIS TRAINING IS */}
      <ScrollFade>
        <section className="bg-white text-black py-20 px-6 border-t border-gray-200">
          <SwirlDivider alt="Decorative gold swirl divider – Tantra Massage Training" />
          <div className="max-w-3xl mx-auto space-y-6 text-lg leading-relaxed text-black/80">
            <h2 className="font-playfair text-3xl font-semibold text-gold text-center">
              What this training is
            </h2>
            <p>
              This is a hands-on training in the Tantra Massage ritual as it is practised and
              taught in Germany, where it has a long-established teaching tradition. Over four
              days you learn the full ritual from beginning to end: how to open and close it, how
              to structure the touch, and how to hold the space. You practise it fully, both
              giving and receiving.
            </p>
            <p>
              It isn’t a weekend of theory or a taster. By the end you’ll have given and received
              the complete ritual, and you’ll have a manual to keep practising from.
            </p>
          </div>
        </section>
      </ScrollFade>

      {/* WHAT YOU'LL LEARN */}
      <ScrollFade>
        <section className="bg-gray-50 text-black py-20 px-6 border-t border-gray-200">
          <div className="max-w-3xl mx-auto space-y-6 text-lg leading-relaxed text-black/80">
            <h2 className="font-playfair text-3xl font-semibold text-gold text-center">
              What you’ll learn
            </h2>
            <ul className="list-disc pl-6 space-y-2">
              <li>The complete structure of the Tantra Massage ritual, from opening to closing</li>
              <li>Full-body massage techniques and how to sequence them</li>
              <li>
                Yoni and lingam massage, taught as part of the complete ritual sequence, in a
                respectful and professional setting
              </li>
              <li>
                Breath, meditation and movement practices that support presence for giver and
                receiver
              </li>
              <li>
                How to ask for, give and withdraw consent, and how to communicate clearly before,
                during and after
              </li>
              <li>How to hold space: pace, attention, and staying present rather than performing</li>
              <li>How to receive: often the harder half, and just as much part of the training</li>
            </ul>
          </div>
        </section>
      </ScrollFade>

      {/* HOW THE FOUR DAYS RUN */}
      <ScrollFade>
        <section className="bg-white text-black py-20 px-6 border-t border-gray-200">
          <div className="max-w-4xl mx-auto grid md:grid-cols-2 gap-10 items-start">
            <div className="space-y-6 text-lg leading-relaxed text-black/80">
              <h2 className="font-playfair text-3xl font-semibold text-gold">
                How the four days run
              </h2>
              <p>
                Each day is built around guided demonstration followed by paired practice, with
                time for questions, reflection and group integration. The days build on each
                other. Early sessions lay the foundations of touch, breath and presence, and later
                sessions bring it together into the complete ritual.
              </p>
              <p>
                Typical timings (residential format): arrival late afternoon on day one, two full
                days, and a final day finishing mid-afternoon. Exact times are on each event page.
              </p>
            </div>
            <div className="relative h-80 rounded-2xl overflow-hidden shadow-lg">
              <Image
                src="/images/warmoil.png"
                alt="Tantra massage training workshop space – The Art of Sensuality"
                fill
                className="object-cover"
              />
            </div>
          </div>
        </section>
      </ScrollFade>

      {/* HOW PARTNERING WORKS */}
      <ScrollFade>
        <section className="bg-gray-50 text-black py-20 px-6 border-t border-gray-200">
          <div className="max-w-3xl mx-auto space-y-6 text-lg leading-relaxed text-black/80">
            <h2 className="font-playfair text-3xl font-semibold text-gold text-center">
              How partnering works
            </h2>
            <p>
              We aim for a balanced number of women and men in every workshop. That balance gives
              the group a steady, even energy, and it means everyone has a partner to practise
              with.
            </p>
            <p>
              Partnering isn’t assigned. Each person chooses who they practise with, session by
              session. For most of the ritual, such as the back, arms, face and full-body work, any
              pairing works: woman and man, woman and woman, man and man. If you come as a couple,
              you can stay together for the whole workshop or explore practising with other
              participants. Both are completely fine. Everything rests on consent and on your own
              boundaries.
            </p>
            <p>
              Asking yourself the questions is part of the work:{" "}
              <em>
                Do I only want to work with my partner? Who do I feel comfortable working with,
                and why?
              </em>{" "}
              There’s no right or wrong answer. The asking brings presence. It shows you the
              filters and judgements you carry, often without knowing, and brings them into the
              light where you can look at them. That’s a large part of why these workshops change
              people.
            </p>
          </div>
        </section>
      </ScrollFade>

      {/* YONI AND LINGAM MASSAGE */}
      <ScrollFade>
        <section className="bg-white text-black py-20 px-6 border-t border-gray-200">
          <div className="max-w-3xl mx-auto space-y-6 text-lg leading-relaxed text-black/80">
            <h2 className="font-playfair text-3xl font-semibold text-gold text-center">
              Yoni and lingam massage in the training
            </h2>
            <p>
              Yoni and lingam massage are taught as part of the complete ritual. You learn the
              basics, the sequence, and what to pay attention to, and how to bring them into the
              whole massage with respect and awareness.
            </p>
            <p>
              To teach both clearly within four days, these sections follow a set structure: women
              learn lingam massage and men learn yoni massage, practising in woman–man pairs. This
              lets both techniques be taught in a balanced, structured way within the group.
            </p>
            <p>
              Interests vary, of course. A woman may want to learn yoni massage, or a man lingam
              massage. If that’s you,{" "}
              <Link href="/contact" className="text-gold underline">
                get in touch before booking
              </Link>
              , and we’ll talk through what’s possible within the workshop.
            </p>
            <p>
              A clear structure means everyone knows what to expect before they arrive, and both
              techniques can be taught with the calm and care they need.
            </p>
          </div>
        </section>
      </ScrollFade>

      {/* WHAT YOU TAKE HOME */}
      <ScrollFade>
        <section className="bg-gray-50 text-black py-20 px-6 border-t border-gray-200">
          <div className="max-w-3xl mx-auto space-y-6 text-lg leading-relaxed text-black/80">
            <h2 className="font-playfair text-3xl font-semibold text-gold text-center">
              What you take home
            </h2>
            <ul className="list-disc pl-6 space-y-2">
              <li>
                <strong>A TAOS certificate</strong> of attendance and completion of basic training
                in Tantra Massage
              </li>
              <li>
                <strong>A printed, step-by-step manual</strong> of the complete routine and ritual,
                so you can keep practising after the workshop
              </li>
              <li>
                The experience of having given and received the complete ritual, which no manual
                can replace
              </li>
            </ul>
            <p className="text-sm text-black/60">
              The certificate is issued by The Art of Sensuality. It confirms you have completed
              TAOS foundation training in Tantra Massage.
            </p>
          </div>
        </section>
      </ScrollFade>

      {/* WHO IT'S FOR */}
      <ScrollFade>
        <section className="bg-white text-black py-20 px-6 border-t border-gray-200">
          <div className="max-w-3xl mx-auto space-y-6 text-lg leading-relaxed text-black/80">
            <h2 className="font-playfair text-3xl font-semibold text-gold text-center">
              Who it’s for
            </h2>
            <ul className="list-disc pl-6 space-y-3">
              <li>
                <strong>For yourself and your relationships.</strong> If you want to learn to touch
                and be touched with presence, for yourself, a partner or future partners.
              </li>
              <li>
                <strong>As a foundation for professional practice.</strong> If you’re a bodyworker,
                massage therapist or coach, or you’re thinking about offering Tantra Massage
                professionally, this is the first step.
              </li>
              <li>
                <strong>Singles and couples, women and men.</strong> Come alone or with a partner.
                Many people come alone.
              </li>
            </ul>
            <p>
              You don’t need any previous experience. You do need openness, respect, and to be
              comfortable sitting and kneeling on the floor, since practice is floor-based. Minimum
              age 18.
            </p>
          </div>
        </section>
      </ScrollFade>

      {/* AFTER THE FOUNDATION TRAINING */}
      <ScrollFade>
        <section className="bg-black text-white py-20 px-6 border-t border-white/10">
          <div className="max-w-6xl mx-auto">
            <h2 className="font-playfair text-3xl font-semibold text-gold text-center mb-12">
              After the foundation training
            </h2>
            <ol className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {pathway.map((step, i) => (
                <li
                  key={step.title}
                  className="rounded-2xl border border-gold/40 bg-white/5 p-6"
                >
                  <span className="flex h-10 w-10 items-center justify-center rounded-full bg-gold text-black font-semibold mb-4">
                    {i + 1}
                  </span>
                  <h3 className="font-playfair text-xl font-semibold text-gold mb-2">
                    {step.title}
                  </h3>
                  <p className="text-white/80 leading-relaxed">{step.text}</p>
                </li>
              ))}
            </ol>
          </div>
        </section>
      </ScrollFade>

      {/* YOUR TEACHER */}
      <ScrollFade>
        <section className="bg-white text-black py-20 px-6 border-t border-gray-200">
          <div className="max-w-3xl mx-auto space-y-6 text-lg leading-relaxed text-black/80">
            <h2 className="font-playfair text-3xl font-semibold text-gold text-center">
              Your teacher
            </h2>
            <p>
              Wesley Tan BOst BSc trained in osteopathy and has spent most of his working life in
              bodywork and movement teaching. He trained in Tantra Massage with Spiritual Tantra in
              Berlin in 2019 and with the Yindo school, also of Berlin, in 2023. He has offered Tantra
              Massage, workshops and intimacy coaching ever since. He brings an understanding of the
              body from his osteopathy training together with a grounded, practical way of teaching.
              The focus stays on the work, not the teacher.
            </p>
            <p>
              <Link href="/about" className="text-gold font-semibold hover:underline">
                Read more about Wesley →
              </Link>
            </p>
          </div>
        </section>
      </ScrollFade>

      {/* UPCOMING DATES */}
      <ScrollFade>
        <section
          id="upcoming-dates"
          className="bg-gray-50 text-black px-6 py-20 border-t border-gray-200 scroll-mt-20"
        >
          <div className="max-w-6xl mx-auto">
            <h2 className="font-playfair text-3xl md:text-4xl font-semibold text-gold mb-12 text-center">
              Upcoming dates
            </h2>

            {workshops.length === 0 ? (
              <div className="max-w-2xl mx-auto text-center space-y-4">
                <p className="text-black/70">
                  New Tantra Massage Workshop dates coming soon.
                </p>
                <p className="text-black/60">
                  Join the interest list below to receive priority notice when details are released.
                </p>
              </div>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-3 gap-10 text-left">
                {workshops.map((w) => (
                  <ScrollFade key={w.id} delay={0.1}>
                    <Link
                      href={workshopHref(w)}
                      className="border border-gold rounded-xl shadow-lg p-6 hover:shadow-2xl hover:scale-[1.02] transition duration-300 bg-white block"
                    >
                      <h3 className="font-playfair text-2xl font-semibold text-gold mb-3 hover:underline">
                        {w.title}
                      </h3>
                      <p className="text-black/80 mb-3">{formatDate(w.date)}</p>
                      <p className="text-black/80 mb-6">{w.description}</p>
                      <span className="inline-block bg-gold text-black px-5 py-2 rounded-full font-medium hover:bg-black hover:text-gold transition">
                        Details / Booking
                      </span>
                    </Link>
                  </ScrollFade>
                ))}
              </div>
            )}
          </div>
        </section>
      </ScrollFade>

      {/* PRIVATE COUPLES TRAINING */}
      <ScrollFade>
        <section className="bg-black text-white py-20 px-6 border-t border-white/10">
          <div className="max-w-3xl mx-auto text-center space-y-6">
            <h2 className="font-playfair text-3xl font-semibold text-gold">
              Prefer to learn privately as a couple?
            </h2>
            <p className="text-lg leading-relaxed text-white/80">
              Tantra Massage Training for Couples is the same complete ritual, taught privately to
              just the two of you over 15 hours, at your own pace.
            </p>
            <Link
              href="/offerings/couples-tantra-massage-training"
              className="inline-block px-8 py-3 rounded-lg bg-gold text-black font-semibold hover:opacity-90 transition"
            >
              Private training for couples →
            </Link>
          </div>
        </section>
      </ScrollFade>

      {/* FAQ */}
      <ScrollFade>
        <section className="bg-gray-50 py-20 px-6 border-t border-gray-200 text-black">
          <SwirlDivider alt="Decorative gold swirl divider – Tantra massage training FAQ" />
          <div className="max-w-3xl mx-auto">
            <h2 className="font-playfair text-2xl font-semibold text-gold mb-8 text-center">
              Tantra massage training FAQ
            </h2>
            <FaqList items={trainingFaqs} />
            <div className="text-center mt-10">
              <Link href="/faq" className="inline-block text-gold hover:underline font-semibold">
                More questions? See the full FAQ →
              </Link>
            </div>
          </div>
        </section>
      </ScrollFade>

      {/* INTEREST FORM SECTION */}
      <ScrollFade>
        <section
          id="interest-list"
          className="bg-white text-black py-20 px-6 border-t border-gray-200 scroll-mt-20"
        >
          <div className="max-w-3xl mx-auto text-center">
            <h2 className="font-playfair text-3xl md:text-4xl font-semibold text-gold mb-6">
              Don’t See a Date That Works for You?
            </h2>

            <p className="text-lg leading-relaxed text-black/80 max-w-2xl mx-auto mb-10">
              Join our interest list to hear about future Tantra Massage Workshops and retreats
              as soon as they’re announced — often before they’re made public.
            </p>

            <form
              onSubmit={handleInterestSubmit}
              className="max-w-2xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-4"
            >
              <input
                type="text"
                name="firstName"
                placeholder="First name"
                value={firstName}
                onChange={(e) => setFirstName(e.target.value)}
                required
                className="w-full rounded-md border border-black/15 bg-white px-4 py-3 text-black placeholder:text-black/40 focus:outline-none focus:ring-2 focus:ring-gold"
              />

              <input
                type="email"
                name="email"
                placeholder="Email address"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                className="w-full rounded-md border border-black/15 bg-white px-4 py-3 text-black placeholder:text-black/40 focus:outline-none focus:ring-2 focus:ring-gold"
              />

              <button
                type="submit"
                disabled={status === "loading"}
                className="w-full rounded-md bg-gold px-6 py-3 font-semibold text-black transition hover:bg-black hover:text-gold border border-gold disabled:opacity-70"
              >
                {status === "loading" ? "Submitting..." : "Join the Interest List"}
              </button>
            </form>

            {message && (
              <p
                className={`mt-5 text-sm ${
                  status === "success" ? "text-green-700" : "text-red-600"
                }`}
              >
                {message}
              </p>
            )}

            <p className="mt-6 text-sm text-black/60">
              Limited spaces. Early registrants will receive priority notice before public release.
            </p>

            <p className="mt-10 text-black/70">
              Looking for a one-to-one session instead? See{" "}
              <Link href="/offerings/tantra" className="text-gold underline">
                Classic Tantra Massage sessions in Stroud
              </Link>
              .
            </p>
          </div>
        </section>
      </ScrollFade>
    </main>
  );
}
