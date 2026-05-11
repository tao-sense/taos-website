import type { Metadata } from "next";
import { PrismaClient } from "@prisma/client";
import WorkshopsContent from "./WorkshopsContent";

export const revalidate = 20;

export const metadata: Metadata = {
  title: "Tantra Massage Workshops & Training UK | The Art of Sensuality (TAOS)",
  description:
    "Join Tantra Massage Workshops and professional Tantra Massage Training with The Art of Sensuality (TAOS). Held in beautiful venues across the South West, South East, and wider UK — guided by Wesley Tan. Learn the art of conscious touch, presence, and authentic connection.",
  keywords: [
    "Tantra Massage Workshops UK",
    "Tantra Massage Training UK",
    "Tantra Massage Courses",
    "Tantra Workshops UK",
    "Tantra Massage Retreats",
    "Tantra Massage Seminars",
    "Tantra Massage South West",
    "Tantra Massage South East",
    "Tantra Massage Events",
    "The Art of Sensuality",
    "TAOS Tantra Workshops",
  ],
  openGraph: {
    title: "Tantra Massage Workshops & Training UK | The Art of Sensuality (TAOS)",
    description:
      "Transformative Tantra Massage Workshops and Training held across the UK by The Art of Sensuality (TAOS). Learn conscious touch, trust, and embodied connection in a supportive space.",
    url: "https://theartofsensuality.com/offerings/workshops",
    siteName: "The Art of Sensuality",
    images: [
      {
        url: "https://theartofsensuality.com/images/og-banner.jpg",
        width: 1200,
        height: 630,
        alt: "Tantra Massage Workshops & Training Across the UK by The Art of Sensuality (TAOS)",
      },
    ],
    locale: "en_GB",
    type: "website",
  },
  alternates: {
    canonical: "https://theartofsensuality.com/offerings/workshops",
  },
};

const jsonLd = {
  "@context": "https://schema.org",
  "@type": "Service",
  "@id": "https://theartofsensuality.com/offerings/workshops#service",
  name: "Tantra Massage Workshops & Training",
  alternateName: "Tantra Workshops UK",
  description:
    "Transformative Tantra Massage Workshops and Training held across the UK by The Art of Sensuality (TAOS). Learn conscious touch, trust, and embodied connection in a supportive space guided by Wesley Tan.",
  url: "https://theartofsensuality.com/offerings/workshops",
  provider: {
    "@type": "LocalBusiness",
    "@id": "https://theartofsensuality.com/#business",
  },
  areaServed: [
    { "@type": "AdministrativeArea", name: "South West England" },
    { "@type": "AdministrativeArea", name: "South East England" },
    { "@type": "Country", name: "United Kingdom" },
  ],
  audience: {
    "@type": "Audience",
    audienceType: "Individuals, Couples",
  },
};

const prisma = new PrismaClient();

export default async function WorkshopsPage() {
  const workshops = await prisma.workshop.findMany({
    orderBy: { date: "asc" },
  });

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <WorkshopsContent workshops={workshops} />
    </>
  );
}