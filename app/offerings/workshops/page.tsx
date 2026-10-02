import type { Metadata } from "next";
import { prisma } from "@/lib/prisma";
import WorkshopsContent from "./WorkshopsContent";
import JsonLd from "@/components/JsonLd";
import {
  breadcrumbJsonLd,
  personRef,
  BUSINESS_ID,
  OFFERINGS_CRUMB,
  SITE_URL,
  WORKSHOPS_CRUMB,
} from "@/lib/structured-data";

export const revalidate = 20;

export const metadata: Metadata = {
  // Absolute: this title already ends with the brand, so skip the layout template.
  title: {
    absolute: "Tantra Massage Training & Workshops UK | 4-Day Foundation Course | TAOS",
  },
  description:
    "Learn the complete Tantra Massage ritual on a 4-day foundation training for singles and couples. TAOS certificate, printed step-by-step manual, and a path to professional practice.",
  keywords: [
    "Tantra Massage Training UK",
    "Tantra Massage Workshops UK",
    "Tantra Massage Course",
    "Tantra Massage Foundation Training",
    "Tantra Workshops UK",
    "Yoni and Lingam Massage Training",
    "The Art of Sensuality",
  ],
  openGraph: {
    title: "Tantra Massage Training & Workshops UK | 4-Day Foundation Course | TAOS",
    description:
      "Learn the complete Tantra Massage ritual on a 4-day foundation training for singles and couples. TAOS certificate, printed step-by-step manual, and a path to professional practice.",
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

const FOUNDATION_DAYS = 4;

type CourseWorkshop = { id: string; date: Date; location: string | null; link: string | null };

// Course schema, with one CourseInstance per upcoming published workshop.
// Workshops only store a start date, so the end date is start + 3 days (4-day format).
function courseJsonLd(workshops: CourseWorkshop[]) {
  const upcoming = workshops.filter((w) => w.date >= new Date());
  return {
    "@context": "https://schema.org",
    "@type": "Course",
    "@id": `${SITE_URL}/offerings/workshops#course`,
    name: "Tantra Massage Training — 4-Day Foundation Workshop",
    description:
      "A 4-day foundation training in the complete Tantra Massage ritual for singles and couples. Includes a TAOS certificate of completion and a printed step-by-step manual.",
    url: `${SITE_URL}/offerings/workshops`,
    provider: { "@id": BUSINESS_ID },
    hasCourseInstance: upcoming.map((w) => {
      const end = new Date(w.date);
      end.setUTCDate(end.getUTCDate() + FOUNDATION_DAYS - 1);
      return {
        "@type": "CourseInstance",
        courseMode: "onsite",
        startDate: w.date.toISOString().slice(0, 10),
        endDate: end.toISOString().slice(0, 10),
        url: w.link ? `${SITE_URL}${w.link}` : `${SITE_URL}/offerings/workshops/${w.id}`,
        ...(w.location && {
          location: {
            "@type": "Place",
            name: w.location,
            address: { "@type": "PostalAddress", addressCountry: "GB" },
          },
        }),
        instructor: personRef,
      };
    }),
  };
}

export default async function WorkshopsPage() {
  const workshops = await prisma.workshop.findMany({
    where: { published: true },
    orderBy: { date: "asc" },
  });

  return (
    <>
      <JsonLd data={courseJsonLd(workshops)} />
      <JsonLd data={breadcrumbJsonLd([OFFERINGS_CRUMB, WORKSHOPS_CRUMB])} />
      <WorkshopsContent workshops={workshops} />
    </>
  );
}