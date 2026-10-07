import Link from 'next/link';
import { MapPin, Clock, Tag, ArrowRight } from 'lucide-react';
import { FALLBACK_DESTINASI } from '@/lib/mockData';

export const metadata = {
  title: 'Jelajahi Wisata Dataran Tinggi Dieng | Panduan Destinasi Ke Dieng Aja',
  description: 'Panduan lengkap destinasi wisata Dieng: Golden Sunrise Sikunir, Telaga Warna, Kawah Sikidang, dan Candi Arjuna dengan tips lokal warga setempat.',
  openGraph: {
    title: 'Jelajahi Wisata Dataran Tinggi Dieng | Ke Dieng Aja',
    description: 'Panduan destinasi ikonik, elevasi, jam terbaik, dan tiket masuk objek wisata Dieng.',
  },
};

export default function JelajahiDiengPage() {
  return (
    <main className="bg-cream/30 min-h-screen py-12 sm:py-20">
      <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="max-w-2xl mb-12">
          <span className="inline-block rounded-md bg-forest/10 px-3 py-1 text-xs font-bold tracking-wider uppercase text-forest">
            Panduan Wisata &amp; Alam
          </span>
          <h1 className="mt-3 font-display text-3xl font-extrabold tracking-tight text-ink sm:text-5xl">
            Jelajahi Keindahan Dieng
          </h1>
          <p className="mt-3 text-sm sm:text-base leading-relaxed text-stone-600">
            Kumpulan destinasi ikonik di dataran tinggi. Lengkap dengan rekomendasi jam berkunjung terbaik, elevasi ketinggian, dan tips praktis langsung dari warga yang tinggal di sini.
          </p>
        </div>

        {/* Destination Cards Grid */}
        <div className="grid grid-cols-1 gap-8 md:grid-cols-2">
          {FALLBACK_DESTINASI.map((item) => (
            <article
              key={item.id}
              className="group flex flex-col overflow-hidden rounded-2xl border border-stone-200/80 bg-white transition hover:border-forest/40 hover:shadow-soft"
            >
              <div className="relative aspect-16/9 w-full overflow-hidden bg-slate-900">
                <img
                  src={item.gambar}
                  alt={item.nama}
                  className="h-full w-full object-cover transition duration-300 group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-slate-950/70 via-transparent to-transparent pointer-events-none" />
                <span className="absolute left-4 top-4 rounded-md bg-white/95 px-2.5 py-1 text-xs font-bold text-forest shadow-xs">
                  {item.elevasi}
                </span>
                <span className="absolute right-4 top-4 rounded-md bg-slate-900/80 px-2.5 py-1 text-xs font-semibold text-white backdrop-blur-xs">
                  {item.kategori}
                </span>
                <div className="absolute bottom-4 left-4 right-4 text-white">
                  <h2 className="font-display text-2xl font-bold">
                    <Link href={`/jelajahi-dieng/${item.slug}`} className="hover:text-stone-200 transition">
                      {item.nama}
                    </Link>
                  </h2>
                </div>
              </div>

              <div className="flex flex-1 flex-col p-6">
                <p className="text-xs sm:text-sm text-stone-600 leading-relaxed">
                  {item.ringkasan}
                </p>

                <div className="mt-6 grid grid-cols-2 gap-3 border-y border-stone-100 py-3 text-xs text-stone-600">
                  <div>
                    <span className="text-[10px] text-stone-400 uppercase font-semibold block">Jam Terbaik</span>
                    <span className="font-bold text-ink">{item.jamTerbaik}</span>
                  </div>
                  <div>
                    <span className="text-[10px] text-stone-400 uppercase font-semibold block">Tiket Masuk</span>
                    <span className="font-bold text-ink">{item.tiketMasuk}</span>
                  </div>
                </div>

                <div className="mt-6 flex items-center justify-between pt-2">
                  <span className="text-xs text-stone-500">
                    {item.durasiKunjungan}
                  </span>
                  <Link
                    href={`/jelajahi-dieng/${item.slug}`}
                    className="inline-flex items-center gap-1.5 text-xs font-bold text-forest hover:text-forest-dark transition"
                  >
                    <span>Baca Panduan Lengkap</span>
                    <ArrowRight className="h-3.5 w-3.5" />
                  </Link>
                </div>
              </div>
            </article>
          ))}
        </div>
      </div>
    </main>
  );
}
