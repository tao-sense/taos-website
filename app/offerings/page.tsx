import type { Metadata } from "next";
import OfferingsClient from "./OfferingsClient";

export const metadata: Metadata = {
  title:
    "Tantra Massage Workshops & Offerings | The Art of Sensuality (TAOS) Stroud, UK",
  description:
    "Explore Tantra Massage Workshops across the UK, Intimacy Coaching in Stroud, and Sensual Massage experiences with TAOS — The Art of Sensuality. Learn the art of Tantra Massage through transformative workshops, private sessions, and coaching to awaken connection, trust, and embodied pleasure.",
  keywords: [
    "Tantra Massage",
    "Tantra Massage Workshops",
    "Massage Workshops",
    "Intimacy Coaching",
    "Sensual Massage",
    "Tantra Stroud",
    "Tantra Massage UK",
    "TAOS",
    "The Art of Sensuality",
    "Tantra Massage Gloucestershire",
  ],
  openGraph: {
    title:
      "Tantra Massage Workshops & Intimacy Coaching | The Art of Sensuality (TAOS)",
    description:
      "Join TAOS for Tantra Massage Workshops across the UK, private Tantra sessions, and Intimacy Coaching in Stroud — designed to cultivate connection, trust, and sensual awareness.",
    url: "https://theartofsensuality.com/offerings",
    siteName: "The Art of Sensuality",
    images: [
      {
        url: "https://theartofsensuality.com/images/og-offerings.jpg",
        width: 1200,
        height: 630,
        alt: "TAOS Tantra Massage Workshops and Offerings in Stroud, Gloucestershire, UK",
      },
    ],
    locale: "en_GB",
    type: "website",
  },
  alternates: {
    canonical: "https://theartofsensuality.com/offerings",
  },
};

export default function OfferingsPage() {
  return <OfferingsClient />;
}