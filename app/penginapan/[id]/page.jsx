import Link from 'next/link';
import { MapPin, Users, CheckCircle2, ChevronRight, ShieldCheck } from 'lucide-react';
import BookingForm from '@/components/BookingForm';
import ImageGallery from '@/components/ImageGallery';
import { formatRupiah, villaCover } from '@/lib/covers';
import { FALLBACK_PENGINAPAN } from '@/lib/mockData';
import { fetchSingleDoc } from '@/lib/listings';
import { SITE } from '@/lib/site';

export function generateStaticParams() {
  return FALLBACK_PENGINAPAN.map((p) => ({ id: p.id }));
}

export async function generateMetadata({ params }) {
  const item = await fetchSingleDoc('penginapan', params.id, FALLBACK_PENGINAPAN);
  if (!item) {
    return {
      title: 'Penginapan Tidak Ditemukan | Kediengaja',
    };
  }

  const title = `${item.nama} — Sewa Cabin & Homestay Dieng`;
  const desc = item.deskripsi
    ? `${item.deskripsi.slice(0, 155)}...`
    : `Sewa ${item.nama} di Dataran Tinggi Dieng. Kapasitas ${item.kapasitas || 2} orang, fasilitas air panas 24 jam, view pegunungan asri.`;
  const image = item.gambar || '/images/hero-dieng.webp';
  const ogImage = image.startsWith('http') ? image : `${SITE.url}${image}`;

  return {
    title,
    description: desc,
    alternates: {
      canonical: `${SITE.url}/penginapan/${params.id}`,
    },
    openGraph: {
      title: `${item.nama} | Kediengaja Dieng`,
      description: desc,
      url: `${SITE.url}/penginapan/${params.id}`,
      siteName: SITE.name,
      images: [
        {
          url: ogImage,
          width: 1200,
          height: 630,
          alt: item.nama,
        },
      ],
      locale: 'id_ID',
      type: 'website',
    },
    twitter: {
      card: 'summary_large_image',
      title: `${item.nama} | Kediengaja Dieng`,
      description: desc,
      images: [ogImage],
    },
  };
}

export default async function PenginapanDetailPage({ params }) {
  const item = await fetchSingleDoc('penginapan', params.id, FALLBACK_PENGINAPAN);

  if (!item) {
    return (
      <main className="mx-auto max-w-lg px-4 py-24 text-center">
        <h1 className="font-display text-3xl text-ink">Penginapan tidak ditemukan</h1>
        <p className="mt-3 text-stone-600">Data mungkin sudah diperbarui atau tautannya salah.</p>
        <Link href="/penginapan" className="mt-6 inline-block font-semibold text-forest hover:underline">
          Kembali ke katalog penginapan
        </Link>
      </main>
    );
  }

  const galleryImages = item.galeri && item.galeri.length > 0 ? item.galeri : [villaCover(item)];
  const fasilitas = Array.isArray(item.fasilitas) ? item.fasilitas : [];
  const ogImage = (item.gambar || '').startsWith('http') ? item.gambar : `${SITE.url}${item.gambar || '/images/hero-dieng.webp'}`;

  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'LodgingBusiness',
    name: item.nama,
    description: item.deskripsi || `${item.nama} di Dataran Tinggi Dieng`,
    image: ogImage,
    priceRange: formatRupiah(item.harga),
    address: {
      '@type': 'PostalAddress',
      addressLocality: item.lokasi || 'Dataran Tinggi Dieng',
      addressRegion: 'Jawa Tengah',
      addressCountry: 'ID',
    },
    telephone: SITE.waNumber,
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
    <div className="bg-[#F8F7F3] min-h-screen py-8 sm:py-12 pb-24 sm:pb-12">
      <main className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
        {/* Breadcrumb */}
        <nav className="flex items-center gap-2 text-xs text-stone-500 mb-6" aria-label="Breadcrumb">
          <Link href="/" className="hover:text-ink">Beranda</Link>
          <ChevronRight className="w-3.5 h-3.5" aria-hidden="true" />
          <Link href="/penginapan" className="hover:text-ink">Penginapan Dieng</Link>
          <ChevronRight className="w-3.5 h-3.5" aria-hidden="true" />
          <span className="text-forest font-semibold truncate max-w-[200px]">{item.nama}</span>
        </nav>

        <div className="grid gap-8 lg:grid-cols-[minmax(0,1.4fr)_minmax(320px,0.8fr)] lg:items-start">
          <article>
            <ImageGallery images={galleryImages} alt={item.nama} />

            <div className="mt-6">
              <span className="inline-block rounded-md bg-stone-100 border border-stone-200 px-3 py-1 text-xs font-semibold text-stone-700">
                {item.tipe || 'Penginapan'}
              </span>
              <h1 className="mt-3 font-display text-3xl font-bold tracking-tight text-ink sm:text-4xl">
                {item.nama}
              </h1>

              <div className="mt-3 flex flex-wrap gap-4 text-sm text-stone-600">
                <span className="flex items-center gap-1.5">
                  <MapPin className="h-4 w-4 text-forest" aria-hidden="true" />
                  {item.lokasi}
                </span>
                {item.kapasitas ? (
                  <span className="flex items-center gap-1.5">
                    <Users className="h-4 w-4 text-stone-400" aria-hidden="true" />
                    Kapasitas {item.kapasitas} orang
                  </span>
                ) : null}
              </div>

              {item.deskripsi ? (
                <div className="mt-6 border-t border-stone-200 pt-6">
                  <h2 className="mb-3 font-display text-xl font-bold text-ink">Tentang Penginapan</h2>
                  <p className="leading-relaxed text-sm sm:text-base text-stone-600 whitespace-pre-line">
                    {item.deskripsi}
                  </p>
                </div>
              ) : null}

              {fasilitas.length > 0 ? (
                <div className="mt-8 border-t border-stone-200 pt-6">
                  <h2 className="mb-4 font-display text-xl font-bold text-ink">Fasilitas Lengkap</h2>
                  <ul className="grid grid-cols-1 gap-2.5 sm:grid-cols-2">
                    {fasilitas.map((row) => (
                      <li key={row} className="flex items-center gap-2.5 rounded-xl border border-stone-200 bg-white px-4 py-3 text-xs sm:text-sm font-medium text-stone-700">
                        <CheckCircle2 className="w-4 h-4 text-forest flex-shrink-0" aria-hidden="true" />
                        <span>{row}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              ) : null}

              {/* Host guarantee card */}
              <div className="mt-8 rounded-xl border border-stone-200/90 bg-white p-5 flex items-start gap-4 shadow-xs">
                <ShieldCheck className="w-6 h-6 text-forest flex-shrink-0 mt-0.5" aria-hidden="true" />
                <div className="text-xs sm:text-sm text-stone-700 space-y-1">
                  <p className="font-bold text-ink">Jaminan Host Langsung Kediengaja</p>
                  <p className="text-stone-600">
                    Setiap unit dikelola dan diverifikasi langsung oleh tim lokal kami di Dieng. Reservasi bebas biaya tersembunyi, dipandu hingga check-in dan serah kunci.
                  </p>
                </div>
              </div>
            </div>
          </article>

          <aside id="booking-form" className="rounded-xl border border-stone-200/90 bg-white p-6 shadow-xs lg:sticky lg:top-24 scroll-mt-24">
            <p className="text-xs text-stone-500">Harga mulai dari</p>
            <p className="mb-5 text-2xl font-bold text-forest">
              {formatRupiah(item.harga)}
              <span className="text-xs font-normal text-stone-500">/malam</span>
            </p>
            <BookingForm
              kind="stay"
              itemName={item.nama}
              defaultPax={item.kapasitas ? Math.min(Number(item.kapasitas), 4) : 2}
            />
          </aside>
        </div>

        {/* MOBILE STICKY CONVERSION BAR (sm:hidden) */}
        <div className="fixed bottom-0 inset-x-0 z-40 bg-white/95 backdrop-blur-md border-t border-stone-200/90 px-4 py-3 sm:hidden shadow-lg flex items-center justify-between gap-3">
          <div className="min-w-0 flex-1">
            <span className="text-[10px] text-stone-500 uppercase font-semibold block">Mulai</span>
            <p className="font-display text-base font-bold text-forest leading-tight truncate">
              {formatRupiah(item.harga)}
              <span className="text-[11px] font-normal text-stone-500"> /malam</span>
            </p>
          </div>
          <a
            href="#booking-form"
            className="inline-flex min-h-[42px] items-center justify-center rounded-xl bg-forest px-5 text-xs font-bold text-white shadow-xs active:bg-forest-light shrink-0"
          >
            Pesan Sekarang
          </a>
        </div>
      </main>
    </div>
    </>
  );
}