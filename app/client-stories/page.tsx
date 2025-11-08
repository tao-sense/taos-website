import type { Metadata } from "next";
import ClientStoriesClient from "./ClientStoriesClient";

export const metadata: Metadata = {
  title:
    "Client Stories | Tantra Massage Experiences with The Art of Sensuality (TAOS)",
  description:
    "Read real Tantra Massage client stories and experiences shared with The Art of Sensuality (TAOS). Discover how people describe feeling safe, seen, and deeply transformed through conscious touch and connection.",
  keywords: [
    "Tantra Massage Client Stories",
    "Tantra Massage Reviews",
    "Tantra Massage Experiences",
    "Tantra Massage Testimonials",
    "Tantra Massage Healing",
    "TAOS Client Stories",
    "The Art of Sensuality Reviews",
  ],
  openGraph: {
    title:
      "Client Stories | Real Tantra Massage Experiences – The Art of Sensuality (TAOS)",
    description:
      "Explore client stories from The Art of Sensuality (TAOS) — real journeys of healing, intimacy, and transformation through Tantra Massage in the UK.",
    url: "https://theartofsensuality.com/client-stories",
    siteName: "The Art of Sensuality",
    images: [
      {
        url: "https://theartofsensuality.com/images/og-banner.jpg",
        width: 1200,
        height: 630,
        alt: "Client Stories – Tantra Massage Experiences by The Art of Sensuality (TAOS)",
      },
    ],
    locale: "en_GB",
    type: "website",
  },
  alternates: {
    canonical: "https://theartofsensuality.com/client-stories",
  },
};

export default function ClientStoriesPage() {
  return <ClientStoriesClient />;
}