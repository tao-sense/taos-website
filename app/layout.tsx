import "./globals.css";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import Providers from "@/components/Providers";
import { CookieConsentProvider } from "@/context/CookieConsent";
import GoogleAnalytics from "@/components/GoogleAnalytics";
import MetaPixel from "@/components/MetaPixel";
import CookieBanner from "@/components/CookieBanner";
import { Analytics } from "@vercel/analytics/next";
import type { Metadata } from "next";
import { Playfair_Display, Inter } from "next/font/google";

const playfair = Playfair_Display({
  subsets: ["latin"],
  variable: "--font-playfair",
  display: "swap",
});

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL("https://theartofsensuality.com"),
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
        url: "/images/og-banner.jpg",
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
    images: ["/images/og-banner.jpg"],
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
  verification: {
    google: "UXAMeJx0DLyBIRkR",
  },
};

const jsonLd = {
  "@context": "https://schema.org",
  "@type": "LocalBusiness",
  "@id": "https://theartofsensuality.com/#business",
  name: "The Art of Sensuality (TAOS)",
  description:
    "Professional Tantra Massage, Intimacy Coaching, and Workshops in Stroud, Gloucestershire, UK.",
  url: "https://theartofsensuality.com",
  telephone: "+447792510682",
  email: "touch@taosense.uk",
  image: "https://theartofsensuality.com/images/og-banner.jpg",
  priceRange: "££",
  currenciesAccepted: "GBP",
  paymentAccepted: "Cash, Bank Transfer",
  areaServed: [
    { "@type": "City", name: "Stroud" },
    { "@type": "AdministrativeArea", name: "Gloucestershire" },
    { "@type": "Country", name: "United Kingdom" },
  ],
  address: {
    "@type": "PostalAddress",
    addressLocality: "Stroud",
    addressRegion: "Gloucestershire",
    addressCountry: "GB",
  },
  founder: {
    "@type": "Person",
    name: "Wesley Tan",
  },
  hasOfferCatalog: {
    "@type": "OfferCatalog",
    name: "Services",
    itemListElement: [
      {
        "@type": "Offer",
        itemOffered: {
          "@type": "Service",
          name: "Tantra Massage",
          url: "https://theartofsensuality.com/offerings/tantra",
        },
      },
      {
        "@type": "Offer",
        itemOffered: {
          "@type": "Service",
          name: "Intimacy Coaching",
          url: "https://theartofsensuality.com/offerings/coaching",
        },
      },
      {
        "@type": "Offer",
        itemOffered: {
          "@type": "Service",
          name: "Tantra Massage Workshops",
          url: "https://theartofsensuality.com/offerings/workshops",
        },
      },
    ],
  },
  sameAs: ["https://www.instagram.com/tao_sense"],
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className={`${playfair.variable} ${inter.variable}`}>
      <body className="min-h-screen flex flex-col font-inter">
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
        <CookieConsentProvider>
          <Providers>
            <GoogleAnalytics />
            <MetaPixel />
            <Navbar />
            <main className="flex-1">{children}</main>
            <Footer />
            <CookieBanner />
            <Analytics />
          </Providers>
        </CookieConsentProvider>
      </body>
    </html>
  );
}