import Link from 'next/link';
import { notFound } from 'next/navigation';
import { Clock, Users, MapPin, Check, X, MessageCircle, ArrowLeft, ShieldCheck } from 'lucide-react';
import { FALLBACK_JEEP } from '@/lib/mockData';
import { formatRupiah } from '@/lib/covers';
import { waLink } from '@/lib/site';

export function generateStaticParams() {
  return FALLBACK_JEEP.map((item) => ({
    slug: item.slug,
  }));
}

export function generateMetadata({ params }) {
  const item = FALLBACK_JEEP.find((j) => j.slug === params.slug);
  if (!item) return { title: 'Paket Jeep Tidak Ditemukan' };

  return {
    title: `${item.nama} | Sewa Jeep Dieng 4x4 Kediengaja`,
    description: item.deskripsi,
    openGraph: {
      title: `${item.nama} - Sewa Jeep Dieng`,
      description: item.deskripsi,
      images: [{ url: item.gambar }],
    },
  };
}

export default function JeepDetailPage({ params }) {
  const item = FALLBACK_JEEP.find((j) => j.slug === params.slug);
  if (!item) notFound();

  const bookingHref = waLink(
    `Halo Admin Kediengaja,\nSaya ingin booking paket Jeep 4x4:\n\nPaket: ${item.nama}\nHarga: ${formatRupiah(item.harga)} / mobil\nKapasitas: ${item.kapasitas} orang\nDurasi: ${item.durasi}\n\nMohon dibantu konfirmasi tanggal dan jam penjemputannya. Terima kasih.`
  );

  return (
    <main className="bg-cream/30 min-h-screen py-10 sm:py-16">
      <div className="mx-auto max-w-5xl px-4 sm:px-6 lg:px-8">
        <Link
          href="/jeep-dieng"
          className="inline-flex items-center gap-1.5 text-xs font-bold text-forest hover:text-forest-dark transition mb-6"
        >
          <ArrowLeft className="h-3.5 w-3.5" />
          <span>Kembali ke Semua Paket Jeep</span>
        </Link>

        {/* Hero Photo Banner */}
        <div className="relative aspect-21/9 sm:aspect-16/7 w-full overflow-hidden rounded-2xl bg-slate-900 shadow-md">
          <img
            src={item.gambar}
            alt={item.nama}
            className="h-full w-full object-cover object-center"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-slate-950/80 via-transparent to-transparent" />
          <div className="absolute bottom-5 left-5 right-5 text-white">
            <span className="rounded-md bg-white/20 px-2.5 py-1 text-[11px] font-bold uppercase backdrop-blur-xs">
              {item.kategori}
            </span>
            <h1 className="mt-2 font-display text-2xl font-black sm:text-4xl text-white">
              {item.nama}
            </h1>
          </div>
        </div>

        {/* Main Content & Booking Card Grid */}
        <div className="mt-10 grid gap-10 lg:grid-cols-12">
          {/* Details Column */}
          <div className="space-y-8 lg:col-span-7">
            {/* Quick Metrics */}
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 border-y border-stone-200/80 py-4">
              <div>
                <p className="text-[11px] text-stone-500 uppercase tracking-wider">Durasi Jelajah</p>
                <p className="font-bold text-ink text-sm sm:text-base mt-0.5">{item.durasi}</p>
              </div>
              <div>
                <p className="text-[11px] text-stone-500 uppercase tracking-wider">Kapasitas</p>
                <p className="font-bold text-ink text-sm sm:text-base mt-0.5">Maks. {item.kapasitas} Penumpang</p>
              </div>
              <div>
                <p className="text-[11px] text-stone-500 uppercase tracking-wider">Titik Kumpul</p>
                <p className="font-bold text-ink text-sm sm:text-base mt-0.5">Jemput di Homestay</p>
              </div>
            </div>

            {/* Description */}
            <div>
              <h2 className="font-display text-lg font-bold text-ink mb-2">
                Gambaran Perjalanan
              </h2>
              <p className="text-sm leading-relaxed text-stone-600">
                {item.deskripsi}
              </p>
            </div>

            {/* Itinerary / Rute */}
            <div>
              <h2 className="font-display text-lg font-bold text-ink mb-3">
                Destinasi Rute yang Dilewati
              </h2>
              <div className="space-y-2">
                {item.rute.map((r, i) => (
                  <div key={r} className="flex items-center gap-3 rounded-lg border border-stone-200/80 bg-white p-3 text-xs sm:text-sm text-stone-800">
                    <span className="flex h-5 w-5 items-center justify-center rounded-full bg-forest text-white font-bold text-[10px]">
                      {i + 1}
                    </span>
                    <span className="font-semibold">{r}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Included & Excluded */}
            <div className="grid gap-6 sm:grid-cols-2">
              <div className="rounded-xl border border-stone-200/80 bg-white p-4">
                <h3 className="text-xs font-bold uppercase tracking-wider text-forest mb-3">
                  Sudah Termasuk:
                </h3>
                <ul className="space-y-2 text-xs text-stone-700">
                  {item.termasuk.map((t) => (
                    <li key={t} className="flex items-center gap-2">
                      <Check className="h-4 w-4 text-forest shrink-0" />
                      <span>{t}</span>
                    </li>
                  ))}
                </ul>
              </div>

              <div className="rounded-xl border border-stone-200/80 bg-white p-4">
                <h3 className="text-xs font-bold uppercase tracking-wider text-stone-500 mb-3">
                  Tidak Termasuk:
                </h3>
                <ul className="space-y-2 text-xs text-stone-600">
                  {item.tidakTermasuk.map((t) => (
                    <li key={t} className="flex items-center gap-2">
                      <X className="h-4 w-4 text-stone-400 shrink-0" />
                      <span>{t}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>

          {/* Booking Card Sticky Column */}
          <div className="lg:col-span-5">
            <div className="sticky top-24 rounded-2xl border border-stone-200/80 bg-white p-6 shadow-soft">
              <p className="text-xs font-bold tracking-wider uppercase text-forest">
                Tarif Resmi Wisata
              </p>
              <div className="mt-2 flex items-baseline gap-2">
                <span className="font-display text-3xl font-black text-forest">
                  {formatRupiah(item.harga)}
                </span>
                <span className="text-xs text-stone-500">/ mobil (all-in)</span>
              </div>
              <p className="mt-1 text-xs text-stone-500">
                1 armada muat hingga 4 orang. Tidak digabung rombongan lain.
              </p>

              <div className="mt-6 border-t border-stone-100 pt-6">
                <a
                  href={bookingHref}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex min-h-[46px] w-full items-center justify-center gap-2 rounded-xl bg-wa py-3 text-sm font-bold text-white shadow-lift hover:bg-[#15803d] active:scale-[0.98] transition"
                >
                  <MessageCircle className="h-4.5 w-4.5" />
                  <span>Pesan Jeep via WhatsApp</span>
                </a>
              </div>

              <div className="mt-6 space-y-2.5 rounded-xl bg-stone-50 p-4 text-[11px] text-stone-600">
                <div className="flex items-start gap-2">
                  <ShieldCheck className="h-4 w-4 text-forest shrink-0 mt-0.5" />
                  <span>Sopir asli warga Dieng yang berpengalaman di medan tanjakan dan jalur tanah.</span>
                </div>
                <div className="flex items-start gap-2">
                  <Check className="h-4 w-4 text-forest shrink-0 mt-0.5" />
                  <span>Penjemputan langsung di homestay atau basecamp Kediengaja tanpa biaya tambahan.</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}
