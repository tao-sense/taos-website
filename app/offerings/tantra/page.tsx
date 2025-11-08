import type { Metadata } from "next";
import TantraClient from "./TantraClient";

export const metadata: Metadata = {
  title:
    "Tantra Massage in Stroud | Sensual Massage | Tantra Massage UK",
  description:
    "Experience professional Tantra Massage in Stroud with The Art of Sensuality (TAOS). A deeply nourishing full-body journey that reconnects you with sensuality, presence, and self-awareness. Private sessions for singles and couples.",
  keywords: [
    "Tantra Massage",
    "Tantra Massage Stroud",
    "Tantra Massage UK",
    "Tantra Massage Gloucestershire",
    "Classic Tantra Massage",
    "Sensual Massage",
    "Intimacy Massage",
    "Tantra Bodywork",
    "TAOS",
    "The Art of Sensuality",
  ],
  openGraph: {
    title:
      "Classic Tantra Massage | The Art of Sensuality (TAOS) – Stroud & UK",
    description:
      "Experience Tantra Massage in Stroud with TAOS. A professional, safe, and heart-centred space for connection, sensuality, and healing through conscious touch.",
    url: "https://theartofsensuality.com/offerings/tantra",
    siteName: "The Art of Sensuality",
    images: [
      {
        url: "https://theartofsensuality.com/images/og-banner.jpg",
        width: 1200,
        height: 630,
        alt: "Classic Tantra Massage in Stroud – The Art of Sensuality",
      },
    ],
    locale: "en_GB",
    type: "website",
  },
  alternates: {
    canonical: "https://theartofsensuality.com/offerings/tantra",
  },
};

export default function TantraPage() {
  return <TantraClient />;
}