import { Fraunces, Plus_Jakarta_Sans } from 'next/font/google';
import './globals.css';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import FloatingWhatsApp from '@/components/FloatingWhatsApp';
import { SITE } from '@/lib/site';

const display = Fraunces({
  subsets: ['latin'],
  variable: '--font-display',
});

const sans = Plus_Jakarta_Sans({
  subsets: ['latin'],
  variable: '--font-sans',
});

const title = 'Kediengaja | Penginapan & paket wisata Dieng';
const description =
  'Katalog villa, homestay, cabin, dan paket trip Dieng. Pilih di web, konfirmasi ketersediaan dan bayar lewat WhatsApp.';

export const metadata = {
  metadataBase: new URL(SITE.url),
  title,
  description,
  robots: 'index, follow',
  alternates: { canonical: SITE.url },
  openGraph: {
    title,
    description,
    url: SITE.url,
    siteName: SITE.name,
    locale: 'id_ID',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title,
    description,
  },
  other: {
    'geo.region': 'ID-JT',
    'geo.placename': 'Wonosobo, Jawa Tengah',
  },
};

const jsonLd = {
  '@context': 'https://schema.org',
  '@type': 'TravelAgency',
  name: SITE.name,
  url: SITE.url,
  telephone: SITE.waNumber ? `+${SITE.waNumber}` : undefined,
  email: SITE.email,
  sameAs: [SITE.instagram],
  areaServed: 'Dieng Plateau, Wonosobo, Jawa Tengah',
  address: {
    '@type': 'PostalAddress',
    addressLocality: 'Wonosobo',
    addressRegion: 'Jawa Tengah',
    addressCountry: 'ID',
  },
};

export default function RootLayout({ children }) {
  return (
    <html lang="id">
      <body className={`${sans.variable} ${display.variable} flex min-h-screen flex-col font-sans`}>
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
        <Navbar />
        <div className="flex-1">{children}</div>
        <Footer />
        <FloatingWhatsApp />
      </body>
    </html>
  );
}
