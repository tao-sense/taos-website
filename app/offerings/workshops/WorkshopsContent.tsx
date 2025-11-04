'use client';

import Image from "next/image";
import Link from "next/link";
import { ChevronDown } from "lucide-react";
import ScrollFade from "@/components/ScrollFade";

export default function WorkshopsContent({ workshops }: { workshops: any[] }) {
  return (
    <main className="bg-black text-white">
      {/* Hero Section */}
      <section className="relative h-[90vh] w-full flex items-center justify-center text-center overflow-hidden">
        <Image
          src="/images/workshops.png"
          alt="Workshops Hero"
          fill
          className="object-cover opacity-90"
        />
        <div className="relative z-10 px-6">
          <ScrollFade delay={0.2}>
            <h1 className="text-4xl md:text-6xl font-bold text-gold mb-4">
              Tantra Massage Workshops
            </h1>
          </ScrollFade>
          <ScrollFade delay={0.4}>
            <p className="text-lg md:text-xl text-white/90">
              Shared learning, trust, and connection in a supportive community space.
            </p>
          </ScrollFade>
        </div>

        <div className="absolute bottom-6 z-10 animate-bounce">
          <ChevronDown className="text-gold w-8 h-8 opacity-80" />
        </div>
        <div className="absolute inset-0 bg-black/30"></div>
      </section>

      {/* Intro Section */}
      <ScrollFade>
        <section className="bg-white text-black py-20 px-6 border-t border-gray-200">
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

          <div className="max-w-3xl mx-auto space-y-8 text-lg leading-relaxed text-black/80">
            <h2 className="text-3xl font-semibold text-gold text-center">
              About the Workshops
            </h2>
            <p>
              Our Tantra Massage Workshops welcome women, men, singles, and couples into a
              space of learning, connection, and exploration. Together we explore the full
              Tantra Massage ritual through demonstration, guided practice, and partner work.
            </p>
            <p>
              The teaching includes both{" "}
              <strong className="text-gold font-semibold">yoni and lingam massage</strong> as part of the complete ritual sequence — shared in a respectful, professional, and sacred learning environment. A printed step-by-step script is also provided to support your practice and integration.
            </p>
            <p>
              Each workshop is designed to help you feel more alive, nourished, and connected — supported by clarity, safety, and consent. You’ll discover that intimacy is not about performance, but presence.
            </p>
            <p>
              Our workshops are carefully structured to give you both the{" "}
              <strong className="text-gold font-semibold">practical tools</strong> and the{" "}
              <strong className="text-gold font-semibold">inner attitude</strong> that bring
              this practice to life.
            </p>
          </div>
        </section>
      </ScrollFade>

      {/* Philosophy Section */}
      <ScrollFade>
        <section className="bg-gray-100 text-black py-20 px-6 border-t border-gray-200">
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

          <div className="max-w-3xl mx-auto space-y-8 text-lg leading-relaxed text-black/80">
            <h2 className="text-3xl font-semibold text-gold text-center">
              The Philosophy of Tantra Massage
            </h2>
            <p>
              Tantra Massage is an encounter on the heart level — an experience rooted in awareness, mindfulness, and respect for the person we touch. It embraces the body as a whole and invites us to meet ourselves and others with acceptance and presence.
            </p>
          </div>
        </section>
      </ScrollFade>

      {/* Workshop Details */}
      <ScrollFade>
        <section className="bg-white py-20 px-6 text-black border-t border-gray-200">
        
          <div className="max-w-4xl mx-auto grid md:grid-cols-2 gap-10 items-start">
            <div>
              <h2 className="text-2xl font-semibold text-gold mb-6">Workshop Details</h2>
              <ul className="list-disc pl-6 space-y-2 text-black/80">
                <li><strong>Format:</strong> Group sessions for singles and couples</li>
                <li><strong>Balance:</strong> Equal ratio of men and women for energetic balance</li>
                <li><strong>Focus:</strong> Consent, communication, and embodied presence</li>
                <li><strong>Duration:</strong> 4 days (approx. 34 hours total, with breaks)</li>
                <li><strong>Structure:</strong> Guided demonstrations, partnered practice, and group integration</li>
                <li><strong>Location:</strong> Private, peaceful venue with changing areas and refreshments</li>
                <li><strong>Requirements:</strong> No previous experience required — openness and respect are essential</li>
                <li><strong>Language:</strong> Sessions conducted in English</li>
                <li><strong>Instructor:</strong> Wesley Tan — osteopath, bodyworker, and Tantra educator</li>
                <ul className="space-y-2 text-black/80"></ul>
              </ul>
            </div>
            <div className="relative h-80 rounded-2xl overflow-hidden shadow-lg">
              <Image
                src="/images/warmoil.png"
                alt="Workshop Space"
                fill
                className="object-cover"
              />
            </div>
          </div>
        </section>
      </ScrollFade>

      {/* Upcoming Workshops */}
      <ScrollFade>
        <section className="bg-gray-50 text-black px-6 py-20 border-t border-gray-200">

          <div className="max-w-6xl mx-auto">
            <h2 className="text-3xl md:text-4xl font-semibold text-gold mb-12 text-center">
              Upcoming Workshops
            </h2>
            {workshops.length === 0 ? (
              <p className="text-center text-black/70">No workshops scheduled yet.</p>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-3 gap-10 text-left">
                {workshops.map((w) => (
                  <ScrollFade key={w.id} delay={0.1}>
                    <Link
                      href={`/offerings/workshops/${w.id}`}
                      className="border border-gold rounded-xl shadow-lg p-6 hover:shadow-2xl hover:scale-[1.02] transition duration-300 bg-white block"
                    >
                      <h3 className="text-2xl font-semibold text-gold mb-3 hover:underline">
                        {w.title}
                      </h3>
                      <p className="text-black/80 mb-3">
                        {new Date(w.date).toLocaleDateString("en-GB", {
                          weekday: "long",
                          day: "2-digit",
                          month: "long",
                          year: "numeric",
                        }).replace(",", "")}
                      </p>
                      <p className="text-black/80 mb-6">{w.description}</p>
                      <span className="inline-block bg-gold text-black px-5 py-2 rounded-full font-medium hover:bg-black hover:text-gold transition">
                        Details/Booking
                      </span>
                    </Link>
                  </ScrollFade>
                ))}
              </div>
            )}
          </div>
        </section>
      </ScrollFade>
    </main>
  );
}