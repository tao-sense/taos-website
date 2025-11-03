import './globals.css';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import Providers from '@/components/Providers';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'TAOS | The Art of Sensuality',
  description:
    'Experience the Art of Sensuality through Tantra Massage, Workshops, and Intimacy Coaching with TAOS.',
  keywords: [
    'Tantra Massage',
    'Intimacy Coaching',
    'Workshops',
    'Sensuality',
    'TAOS',
    'The Art of Sensuality',
  ],
  openGraph: {
    title: 'TAOS | The Art of Sensuality',
    description:
      'Experience the Art of Sensuality through Tantra Massage, Workshops, and Intimacy Coaching with TAOS.',
    url: 'https://taosense.uk', // you can leave this as-is until the site goes live
    siteName: 'TAOS',
    images: [
      {
        url: '/images/og-banner.png',
        width: 1200,
        height: 630,
        alt: 'The Art of Sensuality — Tantra Massage, Workshops, Intimacy Coaching',
      },
    ],
    locale: 'en_GB',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'TAOS | The Art of Sensuality',
    description:
      'Experience the Art of Sensuality through Tantra Massage, Workshops, and Intimacy Coaching.',
    images: ['/images/og-banner.png'],
  },
  icons: {
    icon: [
      '/favicon.ico',
      { url: '/favicon-32x32.png', sizes: '32x32', type: 'image/png' },
      { url: '/favicon-16x16.png', sizes: '16x16', type: 'image/png' },
    ],
    apple: '/apple-touch-icon.png',
    shortcut: '/favicon.ico',
  },
  manifest: '/site.webmanifest',
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
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
