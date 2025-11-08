import type { Metadata } from "next";
import CoachingClient from "./CoachingClient";

export const metadata: Metadata = {
  title:
    "Intimacy Coaching in Stroud for Couples & Singles | Tantra Coaching UK",
  description:
    "Intimacy Coaching with The Art of Sensuality (TAOS) in Stroud and across the UK. A guided, body-based approach to connection, sensual awareness, and conscious communication for individuals and couples.",
  keywords: [
    "Intimacy Coaching",
    "Intimacy Coaching Stroud",
    "Tantra Coaching",
    "Tantra Coaching UK",
    "Conscious Relationship Coaching",
    "Couples Coaching",
    "Embodied Awareness",
    "TAOS",
    "The Art of Sensuality",
  ],
  openGraph: {
    title:
      "Intimacy Coaching | The Art of Sensuality (TAOS) – Stroud & UK",
    description:
      "Explore Intimacy Coaching with The Art of Sensuality (TAOS). Guided sessions for individuals and couples in Stroud and across the UK.",
    url: "https://theartofsensuality.com/offerings/coaching",
    siteName: "The Art of Sensuality",
    images: [
      {
        url: "https://theartofsensuality.com/images/og-banner.jpg",
        width: 1200,
        height: 630,
        alt: "Intimacy Coaching at The Art of Sensuality (TAOS)",
      },
    ],
    locale: "en_GB",
    type: "website",
  },
  alternates: {
    canonical: "https://theartofsensuality.com/offerings/coaching",
  },
};

export default function CoachingPage() {
  return <CoachingClient />;
}