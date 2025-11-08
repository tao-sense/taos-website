import AboutClient from "./AboutClient";

export const metadata = {
  title: "About Wesley Tan | The Art of Sensuality (TAOS)",
  description:
    "Discover the journey of Wesley Tan — founder of The Art of Sensuality (TAOS). Combining osteopathy, bodywork, and Tantra massage to guide others toward deeper connection, awareness, and healing.",
  keywords: [
    "About Wesley Tan",
    "The Art of Sensuality",
    "TAOS",
    "Tantra Massage Practitioner",
    "Tantra Massage Stroud",
    "Intimacy Coaching UK",
  ],
  openGraph: {
    title: "About Wesley Tan | The Art of Sensuality (TAOS)",
    description:
      "Meet Wesley Tan, osteopath, bodyworker, and Tantra educator — founder of The Art of Sensuality (TAOS) in Stroud, Gloucestershire.",
    url: "https://theartofsensuality.com/about",
    siteName: "The Art of Sensuality",
    images: [
      {
        url: "https://theartofsensuality.com/images/og-banner.jpg",
        width: 1200,
        height: 630,
        alt: "About Wesley Tan — The Art of Sensuality, Tantra Massage and Intimacy Coaching UK",
      },
    ],
    locale: "en_GB",
    type: "website",
  },
  alternates: {
    canonical: "https://theartofsensuality.com/about",
  },
};

export default function AboutPage() {
  return <AboutClient />;
}