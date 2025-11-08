import HomeClient from "./HomeClient";

export const metadata = {
  title:
    "Tantra Massage Workshops & Intimacy Coaching | The Art of Sensuality (TAOS)",
  description:
    "Experience Tantra Massage, Intimacy Coaching, and Tantra Massage Workshops with TAOS — based in Stroud, Gloucestershire and teaching across the UK.",
  openGraph: {
    title: "Tantra Massage Workshops & Intimacy Coaching | TAOS",
    description:
      "Join TAOS for Tantra Massage Workshops, private Tantra sessions, and Intimacy Coaching in Stroud and across the UK.",
    url: "https://theartofsensuality.com",
    images: [
      {
        url: "https://theartofsensuality.com/images/og-banner.jpg",
        width: 1200,
        height: 630,
        alt: "TAOS Tantra Massage Workshops and Intimacy Coaching",
      },
    ],
  },
  alternates: {
    canonical: "https://theartofsensuality.com",
  },
};

export default function HomePage() {
  return <HomeClient />;
}