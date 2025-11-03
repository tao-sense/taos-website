'use client';

import Image from "next/image";
import Link from "next/link";
import ScrollFade from "@/components/ScrollFade";
import WorkshopBookingForm from "./workshop-booking-form";

export default function WorkshopContent({ workshop }: { workshop: any }) {
  return (
    <main className="bg-black text-white">
      {/* Hero Section */}
      <section className="relative h-[60vh] w-full flex items-center justify-center text-center overflow-hidden">
        <Image
          src="/images/grouptantra.png"
          alt={workshop.title}
          fill
          className="object-cover opacity-60"
        />
        <div className="relative z-10 px-6">
          <ScrollFade>
            <h1 className="text-4xl md:text-6xl font-bold text-gold mb-3">
              {workshop.title}
            </h1>
          </ScrollFade>
          <ScrollFade delay={0.1}>
            <p className="text-lg md:text-2xl text-white/90">
              {workshop.location || "Location TBC"}
            </p>
          </ScrollFade>
        </div>
      </section>

      {/* Workshop Info */}
      <ScrollFade>
        <section className="bg-white text-black px-6 py-16">
          <div className="flex justify-center mb-8">
            <Image
              src="/images/swirl-divider.png"
              alt="Decorative gold swirl"
              width={200}
              height={60}
              className="h-12 md:h-16 w-auto"
            />
          </div>

          <div className="max-w-3xl mx-auto text-lg leading-relaxed space-y-8">
            <h2 className="text-3xl font-semibold text-gold mb-4">
              About This Workshop
            </h2>

            <p className="whitespace-pre-line text-black/80">
              {workshop.description}
            </p>

            <div className="border-t border-gold my-8"></div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 text-black/80">
              <p>
                <strong className="text-gold">Date:</strong>{" "}
                {new Date(workshop.date).toLocaleDateString("en-GB", {
                  weekday: "long",
                  day: "numeric",
                  month: "long",
                  year: "numeric",
                })}
              </p>
              {workshop.location && (
                <p>
                  <strong className="text-gold">Location:</strong>{" "}
                  {workshop.location}
                </p>
              )}
            </div>
          </div>
        </section>
      </ScrollFade>

      {/* Booking / Enquiry Form */}
      <ScrollFade delay={0.1}>
        <section className="bg-black text-white px-6 py-16 border-t border-white/10">
          <div className="max-w-3xl mx-auto">
            <h2 className="text-3xl font-semibold text-gold mb-6 text-center">
              Register Your Interest
            </h2>
            <p className="text-center text-white/80 mb-10">
              Please complete the form below to register your interest. We’ll
              get in touch to confirm availability and suitability before final
              booking.
            </p>

            <WorkshopBookingForm workshopId={workshop.id} />
          </div>
        </section>
      </ScrollFade>

      {/* Back Link */}
      <ScrollFade delay={0.2}>
        <section className="bg-white text-center py-8">
          <Link
            href="/offerings/workshops"
            className="inline-block bg-gold text-black px-6 py-3 rounded-full font-semibold hover:bg-black hover:text-gold transition"
          >
            ← Back to All Workshops
          </Link>
        </section>
      </ScrollFade>
    </main>
  );
}