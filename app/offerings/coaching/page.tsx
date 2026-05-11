import type { Metadata } from "next";
import CoachingClient from "./CoachingClient";

export const metadata: Metadata = {
  title: "Intimacy Coaching in Stroud for Couples & Singles | Tantra Coaching UK",
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
    title: "Intimacy Coaching | The Art of Sensuality (TAOS) – Stroud & UK",
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

const jsonLd = {
  "@context": "https://schema.org",
  "@type": "Service",
  "@id": "https://theartofsensuality.com/offerings/coaching#service",
  name: "Intimacy Coaching",
  alternateName: "Tantra Coaching",
  description:
    "A guided, body-based approach to connection, sensual awareness, and conscious communication. Intimacy Coaching sessions for individuals and couples in Stroud and across the UK.",
  url: "https://theartofsensuality.com/offerings/coaching",
  provider: {
    "@type": "LocalBusiness",
    "@id": "https://theartofsensuality.com/#business",
  },
  areaServed: [
    { "@type": "City", name: "Stroud" },
    { "@type": "AdministrativeArea", name: "Gloucestershire" },
    { "@type": "Country", name: "United Kingdom" },
  ],
  offers: [
    {
      "@type": "Offer",
      name: "Individual Session – 60 minutes",
      price: "70",
      priceCurrency: "GBP",
      description: "One-to-one Intimacy Coaching session, 60 minutes",
    },
    {
      "@type": "Offer",
      name: "Individual Session – 90 minutes",
      price: "100",
      priceCurrency: "GBP",
      description: "One-to-one Intimacy Coaching session, 90 minutes",
    },
    {
      "@type": "Offer",
      name: "Couples Coaching – 2-hour session",
      price: "150",
      priceCurrency: "GBP",
      description: "2-hour standalone Intimacy Coaching session for couples",
    },
    {
      "@type": "Offer",
      name: "Couples Coaching – 3-session package",
      price: "400",
      priceCurrency: "GBP",
      description: "Prepaid 3-session Intimacy Coaching package for couples",
    },
    {
      "@type": "Offer",
      name: "Initial Consultation",
      price: "60",
      priceCurrency: "GBP",
      description:
        "60-minute initial consultation, credited toward any package if you continue",
    },
    {
      "@type": "Offer",
      name: "Tantra Massage Training for Couples",
      price: "1800",
      priceCurrency: "GBP",
      description:
        "15-hour bespoke Tantra Massage Training for couples, typically 5 × 3-hour sessions",
    },
  ],
  audience: {
    "@type": "Audience",
    audienceType: "Individuals, Couples",
  },
};

export default function CoachingPage() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <CoachingClient />
    </>
  );
}