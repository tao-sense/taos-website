"use client";

import { useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import { ChevronDown } from "lucide-react";
import ScrollFade from "@/components/ScrollFade";

export default function FAQClient() {
  // Smooth scroll for internal links
  useEffect(() => {
    const links = document.querySelectorAll<HTMLAnchorElement>('a[href^="#"]');
    const handleClick = (e: MouseEvent) => {
      const target = e.currentTarget as HTMLAnchorElement;
      const href = target.getAttribute("href");
      if (href?.startsWith("#")) {
        e.preventDefault();
        document.querySelector(href)?.scrollIntoView({
          behavior: "smooth",
          block: "start",
        });
      }
    };
    links.forEach((link) => link.addEventListener("click", handleClick));
    return () =>
      links.forEach((link) => link.removeEventListener("click", handleClick));
  }, []);

  return (
    <main className="bg-black text-white">
      {/* Hero */}
      <section className="relative h-[90vh] flex items-center justify-center text-center">
        <Image
          src="/images/faq.png"
          alt="Tantra Massage FAQ with The Art of Sensuality (TAOS)"
          fill
          className="object-cover opacity-95"
          priority
        />
        <div className="relative z-10 px-6">
          <h1 className="text-4xl md:text-6xl font-bold text-gold mb-4 leading-none">
            Tantra Massage FAQ
            <span className="block text-white/90 font-light text-2xl md:text-3xl mt-1 leading-tight">
              Answers from The Art of Sensuality (TAOS)
            </span>
          </h1>
          <p className="text-lg text-white/85 max-w-xl mx-auto mt-4">
            Everything you may wish to know before your first Tantra Massage or
            workshop — answered with care, clarity, and transparency.
          </p>
        </div>

        {/* Scroll Chevron */}
        <div className="absolute bottom-6 z-10 animate-bounce">
          <ChevronDown className="text-gold w-8 h-8 opacity-80" />
        </div>
        <div className="absolute inset-0 bg-black/30"></div>
      </section>

      {/* Gold Swirl Divider */}
      <ScrollFade>
        <div className="bg-white py-8 flex justify-center">
          <Image
            src="/images/swirl-divider.png"
            alt="Decorative gold swirl divider"
            width={200}
            height={60}
            className="h-12 md:h-16 w-auto"
          />
        </div>
      </ScrollFade>

      {/* FAQ Sections */}
      <section className="bg-white text-black py-16 px-6">
        <div className="max-w-4xl mx-auto">
          {/* Section Navigation */}
          <ScrollFade>
            <div className="text-center mb-16">
              <h2 className="text-3xl font-semibold text-gold mb-6">
                Frequently Asked Questions
              </h2>
              <p className="text-black/70 mb-8">
                Explore answers about both{" "}
                <span className="font-semibold text-gold">
                  Private Sessions
                </span>{" "}
                and{" "}
                <span className="font-semibold text-gold">Workshops</span>.
              </p>
              <div className="flex flex-wrap justify-center gap-6 text-black/70">
                <a href="#sessions" className="hover:text-gold transition">
                  Private Sessions
                </a>
                <a href="#workshops" className="hover:text-gold transition">
                  Workshops
                </a>
              </div>
            </div>
          </ScrollFade>

          {/* Private Sessions */}
          <ScrollFade>
            <div id="sessions" className="space-y-12 border-t border-black/10 pt-12">
              <h2 className="text-3xl font-semibold text-gold mb-8 text-center">
                Private Tantra Massage Sessions
              </h2>

              <Question title="What is Tantra Massage?">
                Tantra Massage is a deeply healing and sensual full-body
                experience that combines breathwork, ritual, and conscious
                touch. It invites you to reconnect with your natural vitality
                and the unconditioned self beneath layers of tension or shame.
                Each session honours your boundaries and invites presence, trust,
                and self-awareness.
              </Question>

              <Question title="Who is Tantra Massage for?">
                Tantra Massage is open to all adults, singles and couples. It can
                help you reconnect with your sensuality, especially if you’ve felt
                disconnected through stress, responsibility, or relationship
                patterns. It’s equally valuable if you already feel attuned and
                wish to explore intimacy more deeply.
              </Question>

              <Question title="What should I expect from my first session?">
                Your session begins with a short conversation to revisit your
                intentions, boundaries, and any concerns we’ve discussed
                beforehand. The space is prepared with warmth, soft light, and
                calming music. We begin clothed in a lunghi (sarong), allowing
                time to settle and relax. As the session unfolds, touch becomes
                slower and more intimate, always guided by consent.
              </Question>

              <Question title="I have suffered sexual abuse in the past. Can Tantra Massage help me?">
                Tantra Massage can be part of a healing journey for those
                rebuilding trust and connection with their bodies. It’s not a
                replacement for therapy, but many find it supportive alongside
                professional guidance. You will always set the pace, and nothing
                happens without your explicit consent.
              </Question>

              <Question title="How should I prepare for my first treatment?">
                Eat something light an hour or more before your session. Take a
                shower at home so you feel fresh and relaxed. Wear comfortable
                clothing, and please arrive on time. The session lasts around two
                hours, so plan a little quiet time afterwards to integrate.
              </Question>

              <Question title="Is the goal of Tantra Massage to have an orgasm?">
                No. The focus is on presence and awareness — awakening energy and
                pleasure throughout the body without seeking a specific outcome.
                Orgasms may happen, but they are neither expected nor required.
                The true aim is to feel more alive and at peace in your body.
              </Question>

              <Question title="Will I be naked during the massage? Will you be naked?">
                Yes. Tantra Massage embraces the natural human form as part of its
                philosophy of acceptance and equality. Both giver and receiver
                begin covered in a lunghi and may gradually undress as trust and
                comfort deepen. Nudity is never sexualised and never forced.
              </Question>

              <Question title="How do I book a session or workshop?">
                You can book via the{" "}
                <Link href="/contact" className="text-gold underline">
                  contact form
                </Link>{" "}
                or explore dates on the{" "}
                <Link href="/offerings/workshops" className="text-gold underline">
                  Workshops
                </Link>{" "}
                page. Once you reach out, you’ll receive confirmation and
                preparation details by email.
              </Question>

              <Question title="Is Tantra Massage safe?">
                Absolutely. Sessions are guided by clear boundaries, active
                consent, and confidentiality. You are always in control, and
                nothing happens without your agreement.
              </Question>

              <Question title="Where do sessions take place?">
                Sessions are held in a calm, private space in Stroud,
                Gloucestershire — designed to feel safe, warm, and grounding.
              </Question>
            </div>
          </ScrollFade>

          {/* Workshops */}
          <ScrollFade>
            <div
              id="workshops"
              className="space-y-12 border-t border-black/10 pt-16 mt-16"
            >
              <h2 className="text-3xl font-semibold text-gold mb-8 text-center">
                Tantra Massage Workshops
              </h2>

              <Question title="What happens during a workshop?">
                Each workshop blends theory, demonstration, and paired practice.
                You’ll learn principles of conscious touch, communication, and
                presence. Sessions include grounding, movement, and breathwork
                to cultivate trust and sensitivity.
              </Question>

              <Question title="Do I need to come with a partner?">
                No, you’re welcome to attend solo. Participants are paired
                mindfully, and boundaries are always respected. Couples may stay
                together unless they choose otherwise.
              </Question>

              <Question title="What should I bring?">
                Bring a sarong, water bottle, notebook, and loose clothing.
                Everything else — mats, towels, oils — is provided. Accommodation
                and meals vary by event; see each listing for details.
              </Question>

              <Question title="Is nudity part of the workshops?">
                Some workshops include optional partial or full nudity, depending
                on the theme. This is always explained in advance, guided with
                sensitivity, and never required — consent is central to the
                experience.
              </Question>

              <Question title="How do I book?">
                Workshop bookings are made through the{" "}
                <Link href="/offerings/workshops" className="text-gold underline">
                  Workshops
                </Link>{" "}
                page. Each listing includes dates, location, and booking details.
                After registering, you’ll receive a welcome email to prepare.
              </Question>
            </div>
          </ScrollFade>
        </div>
      </section>

      {/* CTA */}
      <ScrollFade delay={0.15}>
        <section className="bg-black py-16 text-center border-t border-white/10">
          <h2 className="text-3xl font-semibold text-gold mb-4">
            Still have a question?
          </h2>
          <p className="text-white/80 mb-8">
            If there’s something you’d like to ask privately, please don’t
            hesitate to reach out.
          </p>
          <Link
            href="/contact"
            className="inline-block px-6 py-3 rounded-xl bg-gold text-black font-semibold hover:opacity-90"
          >
            Make Contact →
          </Link>
        </section>
      </ScrollFade>
    </main>
  );
}

/* --- Reusable Question component --- */
function Question({
  title,
  children,
}: {
  title: string;
  children: React.ReactNode;
}) {
  return (
    <div>
      <h3 className="text-2xl font-semibold text-gold mb-3">{title}</h3>
      <p className="text-black/80 leading-relaxed">{children}</p>
    </div>
  );
}