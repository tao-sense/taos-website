import "./globals.css";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import Providers from "@/components/Providers";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: {
    default: "The Art of Sensuality | TAOS - Tantra Massage & Workshops ",
    template: "%s | The Art of Sensuality (TAOS)",
  },
  description:
    "Experience the Art of Sensuality through Tantra Massage, Workshops, and Intimacy Coaching with TAOS — Stroud, Gloucestershire, UK.",
  keywords: [
    "Tantra Massage",
    "Intimacy Coaching",
    "Workshops",
    "Sensuality",
    "TAOS",
    "The Art of Sensuality",
    "Tantra Massage Stroud",
    "Tantra Massage UK",
    "Tantric Workshops",
  ],

  openGraph: {
    title: "The Art of Sensuality | TAOS",
    description:
      "Experience the Art of Sensuality through Tantra Massage, Workshops, and Intimacy Coaching with TAOS — Stroud, UK.",
    url: "https://theartofsensuality.com",
    siteName: "The Art of Sensuality",
    images: [
      {
        url: '/images/og-banner.jpg',
        width: 1200,
        height: 630,
        alt: "The Art of Sensuality — Tantra Massage, Workshops, and Intimacy Coaching in Stroud, UK",
      },
    ],
    locale: "en_GB",
    type: "website",
  },

  twitter: {
    card: "summary_large_image",
    title: "The Art of Sensuality | TAOS",
    description:
      "Tantra Massage, Intimacy Coaching, and Workshops by The Art of Sensuality (TAOS).",
    images: ["https://theartofsensuality.com/images/og-banner.jpg"],
  },

  alternates: {
    canonical: "https://theartofsensuality.com",
  },

  icons: {
    icon: [
      { url: "/favicon.ico" },
      { url: "/favicon-32x32.png", sizes: "32x32", type: "image/png" },
      { url: "/favicon-16x16.png", sizes: "16x16", type: "image/png" },
      { url: "/apple-touch-icon.png", sizes: "180x180", type: "image/png" },
    ],
    shortcut: "/favicon.ico",
    apple: "/apple-touch-icon.png",
  },

  manifest: "/site.webmanifest",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className="min-h-screen flex flex-col">
        <Providers>
          <Navbar />
          <main className="flex-1">{children}</main>
          <Footer />
        </Providers>
      </body>
    </html>
  );
}