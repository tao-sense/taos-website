import type { Metadata } from "next";
import FAQClient from "./FAQClient";

export const metadata: Metadata = {
  title:
    "Tantra Massage FAQ | The Art of Sensuality (TAOS) | Tantra Workshops & Intimacy Coaching",
  description:
    "Find answers to your questions about Tantra Massage, workshops, and intimacy coaching with The Art of Sensuality (TAOS). Learn what to expect from sessions, how to prepare, and how we ensure a safe and supportive environment.",
  keywords: [
    "Tantra Massage FAQ",
    "Tantra Massage Questions",
    "Tantra Workshops UK",
    "Tantra Massage Stroud",
    "Tantra Massage Gloucestershire",
    "Intimacy Coaching",
    "TAOS",
    "The Art of Sensuality",
  ],
  openGraph: {
    title:
      "Tantra Massage FAQ | The Art of Sensuality (TAOS) | Tantra Workshops & Coaching",
    description:
      "Answers to frequently asked questions about Tantra Massage and workshops with The Art of Sensuality (TAOS). Discover what to expect, how to prepare, and the philosophy behind each experience.",
    url: "https://theartofsensuality.com/faq",
    siteName: "The Art of Sensuality",
    images: [
      {
        url: "https://theartofsensuality.com/images/og-banner.jpg",
        width: 1200,
        height: 630,
        alt: "FAQ about Tantra Massage and Workshops with The Art of Sensuality (TAOS)",
      },
    ],
    locale: "en_GB",
    type: "website",
  },
  alternates: {
    canonical: "https://theartofsensuality.com/faq",
  },
};

export default function FAQPage() {
  return <FAQClient />;
}