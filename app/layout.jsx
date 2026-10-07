import './globals.css';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import FloatingWhatsApp from '@/components/FloatingWhatsApp';
import { SITE } from '@/lib/site';

const title = 'Kediengaja | Wisata, Penginapan & Jeep 4x4 Dieng';
const description =
  'Platform terpercaya untuk liburan ke Dieng: sewa cabin & homestay nyaman dengan air panas 24 jam, armada Jeep 4x4, dan paket wisata bersama warga lokal.';

export const metadata = {
  metadataBase: new URL(SITE.url),
  title,
  description,
  icons: {
    icon: '/images/logo/icon-192.webp',
    apple: '/images/logo/icon-192.webp',
  },
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
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link
          href="https://fonts.googleapis.com/css2?family=Poppins:wght@400;500;600;700;800&family=Plus+Jakarta+Sans:wght@400;500;600;700&display=swap"
          rel="stylesheet"
        />
      </head>
      <body className="flex min-h-screen flex-col font-sans bg-paper text-ink antialiased">
        {/* Subtle Organic Film Grain Overlay */}
        <div className="film-grain" aria-hidden="true" />
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
        <Navbar />
        <div className="flex-1">{children}</div>
        <Footer />
        <FloatingWhatsApp />
      </body>
    </html>
  );
}
