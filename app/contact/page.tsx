import ContactClient from "./ContactClient";

export const metadata = {
  title: "Contact | The Art of Sensuality (TAOS)",
  description:
    "Get in touch with The Art of Sensuality (TAOS) to enquire about Tantra Massage, Workshops, or Intimacy Coaching with Wesley Tan in Stroud and across the UK.",
  keywords: [
    "Contact TAOS",
    "Tantra Massage Contact",
    "Intimacy Coaching Enquiries",
    "Tantra Workshops Stroud",
    "The Art of Sensuality Contact",
  ],
  openGraph: {
    title: "Contact | The Art of Sensuality (TAOS)",
    description:
      "Reach out to The Art of Sensuality (TAOS) to book Tantra Massage sessions, join Workshops, or explore Intimacy Coaching with Wesley Tan in Stroud, UK.",
    url: "https://theartofsensuality.com/contact",
    siteName: "The Art of Sensuality",
    images: [
      {
        url: "https://theartofsensuality.com/images/og-banner.jpg",
        width: 1200,
        height: 630,
        alt: "Contact The Art of Sensuality — Tantra Massage, Workshops, and Intimacy Coaching in Stroud, UK",
      },
    ],
    locale: "en_GB",
    type: "website",
  },
  alternates: {
    canonical: "https://theartofsensuality.com/contact",
  },
};

export default function ContactPage() {
  return <ContactClient />;
}