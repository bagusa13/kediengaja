import Link from 'next/link';
import { Clock, MapPin, CheckCircle2, ChevronRight, ShieldCheck, Sparkles } from 'lucide-react';
import BookingForm from '@/components/BookingForm';
import ImageGallery from '@/components/ImageGallery';
import { formatRupiah, tourCover } from '@/lib/covers';
import { FALLBACK_TOURS } from '@/lib/mockData';
import { fetchSingleDoc, priceSuffix } from '@/lib/listings';
import { SITE } from '@/lib/site';

export function generateStaticParams() {
  return FALLBACK_TOURS.map((t) => ({ id: t.id }));
}

export async function generateMetadata({ params }) {
  const item = await fetchSingleDoc('tours', params.id, FALLBACK_TOURS);
  if (!item) {
    return {
      title: 'Paket Wisata Tidak Ditemukan | Kediengaja',
    };
  }

  const title = `${item.nama} — Trip & Wisata Dieng`;
  const desc = item.deskripsi
    ? `${item.deskripsi.slice(0, 155)}...`
    : `Eksplorasi Dieng bersama paket ${item.nama}. Fasilitas lengkap, armada prima, driver lokal berpengalaman.`;
  const image = item.gambar || '/images/hero-dieng.webp';
  const ogImage = image.startsWith('http') ? image : `${SITE.url}${image}`;

  return {
    title,
    description: desc,
    alternates: {
      canonical: `${SITE.url}/tours/${params.id}`,
    },
    openGraph: {
      title: `${item.nama} | Kediengaja Dieng`,
      description: desc,
      url: `${SITE.url}/tours/${params.id}`,
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

export default async function TourDetailPage({ params }) {
  const item = await fetchSingleDoc('tours', params.id, FALLBACK_TOURS);

  if (!item) {
    return (
      <main className="mx-auto max-w-lg px-4 py-24 text-center">
        <h1 className="font-display text-3xl text-ink">Paket tidak ditemukan</h1>
        <p className="mt-3 text-stone-600">Data mungkin sudah diperbarui atau tautannya salah.</p>
        <Link href="/tours" className="mt-6 inline-block font-semibold text-forest hover:underline">
          Kembali ke paket wisata
        </Link>
      </main>
    );
  }

  const galleryImages = item.galeri && item.galeri.length > 0 ? item.galeri : [tourCover(item)];
  const destinasi = item.destinasi || [];
  const termasuk = item.termasuk || [];
  const unit = priceSuffix('tour', item.tipe);
  const ogImage = (item.gambar || '').startsWith('http') ? item.gambar : `${SITE.url}${item.gambar || '/images/hero-dieng.webp'}`;

  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'TouristTrip',
    name: item.nama,
    description: item.deskripsi || `${item.nama} di Dataran Tinggi Dieng`,
    image: ogImage,
    touristType: item.tipe || 'Wisata Alam Dieng',
    offers: {
      '@type': 'Offer',
      price: item.harga,
      priceCurrency: 'IDR',
      availability: 'https://schema.org/InStock',
    },
    provider: {
      '@type': 'Organization',
      name: SITE.name,
      url: SITE.url,
      telephone: SITE.waNumber,
    },
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
    <div className="bg-[#F8F7F3] min-h-screen py-8 sm:py-12">
      <main className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
        {/* Breadcrumb */}
        <nav className="flex items-center gap-2 text-xs text-stone-500 mb-6" aria-label="Breadcrumb">
          <Link href="/" className="hover:text-ink">Beranda</Link>
          <ChevronRight className="w-3.5 h-3.5" aria-hidden="true" />
          <Link href="/tours" className="hover:text-ink">Paket Wisata Dieng</Link>
          <ChevronRight className="w-3.5 h-3.5" aria-hidden="true" />
          <span className="text-forest font-semibold truncate max-w-[200px]">{item.nama}</span>
        </nav>

        <div className="grid gap-8 lg:grid-cols-[minmax(0,1.4fr)_minmax(320px,0.8fr)] lg:items-start">
          <article>
            <ImageGallery images={galleryImages} alt={item.nama} />

            <div className="mt-6">
              <span className="inline-block rounded-md bg-stone-100 border border-stone-200 px-3 py-1 text-xs font-semibold text-stone-700">
                {item.tipe || 'Paket Wisata'}
              </span>
              <h1 className="mt-3 font-display text-3xl font-bold tracking-tight text-ink sm:text-4xl">
                {item.nama}
              </h1>

              <div className="mt-3 flex flex-wrap gap-4 text-sm text-stone-600">
                <span className="flex items-center gap-1.5">
                  <MapPin className="h-4 w-4 text-forest" aria-hidden="true" />
                  {item.lokasi}
                </span>
                {item.durasi ? (
                  <span className="flex items-center gap-1.5">
                    <Clock className="h-4 w-4 text-stone-400" aria-hidden="true" />
                    {item.durasi}
                  </span>
                ) : null}
              </div>

              {item.deskripsi ? (
                <div className="mt-6 border-t border-stone-200 pt-6">
                  <h2 className="mb-3 font-display text-xl font-bold text-ink">Tentang Paket Wisata</h2>
                  <p className="leading-relaxed text-sm sm:text-base text-stone-600 whitespace-pre-line">
                    {item.deskripsi}
                  </p>
                </div>
              ) : null}

              {destinasi.length > 0 ? (
                <div className="mt-8 border-t border-stone-200 pt-6">
                  <h2 className="mb-3 font-display text-xl font-bold text-ink flex items-center gap-2">
                    <Sparkles className="w-5 h-5 text-forest" aria-hidden="true" />
                    Spot & Destinasi yang Dikunjungi
                  </h2>
                  <ul className="flex flex-wrap gap-2">
                    {destinasi.map((dest) => (
                      <li
                        key={dest}
                        className="rounded-lg border border-stone-200 bg-stone-100/90 px-3 py-1 text-xs font-medium text-stone-700"
                      >
                        {dest}
                      </li>
                    ))}
                  </ul>
                </div>
              ) : null}

              {termasuk.length > 0 ? (
                <div className="mt-8 border-t border-stone-200 pt-6">
                  <h2 className="mb-4 font-display text-xl font-bold text-ink">Fasilitas Termasuk</h2>
                  <ul className="grid gap-2.5 text-xs sm:text-sm text-stone-700 sm:grid-cols-2">
                    {termasuk.map((row) => (
                      <li
                        key={row}
                        className="flex items-center gap-2.5 rounded-xl border border-stone-200 bg-white px-4 py-3 font-medium text-stone-700"
                      >
                        <CheckCircle2 className="w-4 h-4 text-forest flex-shrink-0" aria-hidden="true" />
                        <span>{row}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              ) : null}

              {/* Host / Local Guide Guarantee */}
              <div className="mt-8 rounded-xl border border-stone-200/90 bg-white p-5 flex items-start gap-4 shadow-xs">
                <ShieldCheck className="w-6 h-6 text-forest flex-shrink-0 mt-0.5" aria-hidden="true" />
                <div className="text-xs sm:text-sm text-stone-700 space-y-1">
                  <p className="font-bold text-ink">Driver & Pemandu Asli Dieng</p>
                  <p className="text-stone-600">
                    Jalur ekstrem pegunungan aman dipandu driver berpengalaman. Siap bantu spot foto terbaik, rekomendasi kuliner lokal, dan penyesuaian jadwal cuaca.
                  </p>
                </div>
              </div>
            </div>
          </article>

          <aside className="rounded-xl border border-stone-200/90 bg-white p-6 shadow-xs lg:sticky lg:top-24">
            <p className="text-xs text-stone-500">Harga mulai dari</p>
            <p className="mb-5 text-2xl font-bold text-forest">
              {formatRupiah(item.harga)}
              <span className="text-xs font-normal text-stone-500">{unit}</span>
            </p>
            <BookingForm kind="tour" itemName={item.nama} defaultPax={2} />
          </aside>
        </div>
      </main>
    </div>
    </>
  );
}