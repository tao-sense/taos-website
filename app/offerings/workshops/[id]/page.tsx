import { PrismaClient } from "@prisma/client";
import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import WorkshopBookingForm from "./workshop-booking-form";
import { notFound } from "next/navigation";

const prisma = new PrismaClient();

export async function generateMetadata({
  params,
}: {
  params: Promise<{ id: string }>;
}): Promise<Metadata> {
  const { id } = await params;
  const workshop = await prisma.workshop.findUnique({ where: { id } });

  if (!workshop) return {};

  const title = `${workshop.title} | Tantra Massage Workshop`;
  const description = workshop.description
    ? workshop.description.slice(0, 155)
    : `Join ${workshop.title} — a Tantra Massage Workshop by The Art of Sensuality (TAOS).`;
  const url = `https://theartofsensuality.com/offerings/workshops/${id}`;

  return {
    title,
    description,
    openGraph: {
      title,
      description,
      url,
      siteName: "The Art of Sensuality",
      images: [
        {
          url: "https://theartofsensuality.com/images/og-banner.jpg",
          width: 1200,
          height: 630,
          alt: title,
        },
      ],
      locale: "en_GB",
      type: "website",
    },
    alternates: {
      canonical: url,
    },
  };
}

export default async function WorkshopPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;

  const workshop = await prisma.workshop.findUnique({
    where: { id },
  });

  if (!workshop) return notFound();

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "Event",
    "@id": `https://theartofsensuality.com/offerings/workshops/${id}#event`,
    name: workshop.title,
    description: workshop.description ?? undefined,
    startDate: workshop.date.toISOString(),
    url: `https://theartofsensuality.com/offerings/workshops/${id}`,
    location: workshop.location
      ? {
          "@type": "Place",
          name: workshop.location,
          address: {
            "@type": "PostalAddress",
            addressCountry: "GB",
          },
        }
      : {
          "@type": "Place",
          name: "United Kingdom",
          address: {
            "@type": "PostalAddress",
            addressCountry: "GB",
          },
        },
    organizer: {
      "@type": "LocalBusiness",
      "@id": "https://theartofsensuality.com/#business",
    },
    offers: workshop.priceCents
      ? {
          "@type": "Offer",
          price: (workshop.priceCents / 100).toFixed(2),
          priceCurrency: "GBP",
          url: `https://theartofsensuality.com/offerings/workshops/${id}`,
          availability: "https://schema.org/InStock",
        }
      : undefined,
  };

  return (
    <main className="bg-black text-white">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />

      {/* Hero Section */}
      <section className="relative h-[60vh] w-full flex items-center justify-center text-center overflow-hidden">
        <Image
          src="/images/grouptantra.png"
          alt={workshop.title}
          fill
          className="object-cover opacity-60"
        />
        <div className="relative z-10 px-6">
          <h1 className="font-playfair text-4xl md:text-6xl font-semibold text-gold mb-3">
            {workshop.title}
          </h1>
          <p className="text-lg md:text-2xl text-white/90">
            {workshop.location || "Location TBC"}
          </p>
        </div>
      </section>

      {/* Workshop Info */}
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
          <h2 className="font-playfair text-3xl font-semibold text-gold mb-4">
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

      {/* Booking / Enquiry Form */}
      <section className="bg-black text-white px-6 py-16 border-t border-white/10">
        <div className="max-w-3xl mx-auto">
          <h2 className="font-playfair text-3xl font-semibold text-gold mb-6 text-center">
            Register Your Interest
          </h2>
          <p className="text-center text-white/80 mb-10">
            Please complete the form below to register your interest. We'll get in
            touch to confirm availability and suitability before final booking.
          </p>

          <WorkshopBookingForm workshopId={workshop.id} />
        </div>
      </section>

      <section className="bg-white text-center py-8">
        <Link
          href="/offerings/workshops"
          className="inline-block bg-gold text-black px-6 py-3 rounded-full font-semibold hover:bg-black hover:text-gold transition"
        >
          ← Back to All Workshops
        </Link>
      </section>
    </main>
  );
}