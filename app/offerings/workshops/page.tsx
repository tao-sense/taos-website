import type { Metadata } from "next";
import { PrismaClient } from "@prisma/client";
import WorkshopsContent from "./WorkshopsContent";

export const revalidate = 20;

export const metadata: Metadata = {
  title:
    "Tantra Massage Workshops & Training UK | The Art of Sensuality (TAOS)",
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
    title:
      "Tantra Massage Workshops & Training UK | The Art of Sensuality (TAOS)",
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

const prisma = new PrismaClient();

export default async function WorkshopsPage() {
  const workshops = await prisma.workshop.findMany({
    orderBy: { date: "asc" },
  });

  return <WorkshopsContent workshops={workshops} />;
}