import Link from 'next/link';
import { notFound } from 'next/navigation';
import { ArrowLeft, Clock, MapPin, Tag, CheckCircle2, Home, Mountain, MessageCircle } from 'lucide-react';
import { FALLBACK_DESTINASI, FALLBACK_JEEP } from '@/lib/mockData';
import { waLink } from '@/lib/site';

export function generateStaticParams() {
  return FALLBACK_DESTINASI.map((item) => ({
    slug: item.slug,
  }));
}

export function generateMetadata({ params }) {
  const item = FALLBACK_DESTINASI.find((d) => d.slug === params.slug);
  if (!item) return { title: 'Destinasi Tidak Ditemukan' };

  return {
    title: `Panduan Wisata ${item.nama} (${item.elevasi}) | Kediengaja Dieng`,
    description: item.ringkasan,
    openGraph: {
      title: `${item.nama} - Panduan Wisata Dieng`,
      description: item.ringkasan,
      images: [{ url: item.gambar }],
    },
  };
}

export default function DestinasiDetailPage({ params }) {
  const item = FALLBACK_DESTINASI.find((d) => d.slug === params.slug);
  if (!item) notFound();

  const relatedJeep = FALLBACK_JEEP.find((j) => j.slug === item.rekomendasiJeep) || FALLBACK_JEEP[0];
  const consultWa = waLink(`Halo Admin Kediengaja, saya ingin konsultasi rencana berkunjung ke ${item.nama} dan rekomendasi perjalanannya.`);

  return (
    <main className="bg-[#F8F7F3] min-h-screen pt-10 pb-24 sm:py-16">
      <div className="mx-auto max-w-5xl px-4 sm:px-6 lg:px-8">
        <Link
          href="/jelajahi-dieng"
          className="inline-flex items-center gap-1.5 text-xs font-semibold text-forest hover:text-forest-light transition mb-6"
        >
          <ArrowLeft className="h-3.5 w-3.5" />
          <span>Kembali ke Semua Destinasi</span>
        </Link>

        {/* Hero Banner */}
        <div className="relative aspect-21/9 sm:aspect-16/7 w-full overflow-hidden rounded-xl bg-slate-900 shadow-xs">
          <img
            src={item.gambar}
            alt={item.nama}
            className="h-full w-full object-cover object-center"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-slate-950/80 via-transparent to-transparent" />
          <div className="absolute bottom-5 left-5 right-5 text-white">
            <span className="rounded-lg bg-white/20 px-2.5 py-1 text-[11px] font-semibold uppercase backdrop-blur-xs">
              {item.kategori} · {item.elevasi}
            </span>
            <h1 className="mt-2 font-display text-2xl font-bold sm:text-4xl text-white">
              {item.nama}
            </h1>
          </div>
        </div>

        {/* Content Details */}
        <div className="mt-10 grid gap-10 lg:grid-cols-12">
          <div className="space-y-8 lg:col-span-8">
            {/* Practical Metrics */}
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 border-y border-stone-200/80 py-4 text-xs">
              <div>
                <span className="text-[10px] text-stone-500 uppercase font-semibold block">Jam Berkunjung Terbaik</span>
                <span className="font-semibold text-ink text-sm mt-0.5 block">{item.jamTerbaik}</span>
              </div>
              <div>
                <span className="text-[10px] text-stone-500 uppercase font-semibold block">Tiket Masuk</span>
                <span className="font-semibold text-ink text-sm mt-0.5 block">{item.tiketMasuk}</span>
              </div>
              <div>
                <span className="text-[10px] text-stone-500 uppercase font-semibold block">Estimasi Durasi</span>
                <span className="font-semibold text-ink text-sm mt-0.5 block">{item.durasiKunjungan}</span>
              </div>
            </div>

            {/* Description */}
            <div>
              <h2 className="font-display text-xl font-bold text-ink mb-2">
                Tentang {item.nama}
              </h2>
              <p className="text-sm leading-relaxed text-stone-600">
                {item.deskripsi}
              </p>
            </div>

            {/* Local Tips */}
            <div className="rounded-xl border border-stone-200/80 bg-white p-5">
              <h3 className="font-display text-base font-bold text-ink mb-3">
                Tips Praktis dari Warga Lokal:
              </h3>
              <ul className="space-y-2.5">
                {item.tipsLokal.map((tip) => (
                  <li key={tip} className="flex items-start gap-2.5 text-xs sm:text-sm text-stone-700">
                    <CheckCircle2 className="h-4 w-4 text-forest shrink-0 mt-0.5" />
                    <span>{tip}</span>
                  </li>
                ))}
              </ul>
            </div>

            {/* Location context */}
            <div className="text-xs text-stone-500 flex items-center gap-1.5">
              <MapPin className="h-4 w-4 text-stone-400" />
              <span>Lokasi administratif: {item.lokasi}</span>
            </div>
          </div>

          {/* Sidebar Recommendations */}
          <div className="space-y-6 lg:col-span-4">
            {/* Related Stay Card */}
            <div className="rounded-xl border border-stone-200/80 bg-white p-5">
              <span className="text-[10px] font-semibold uppercase tracking-wider text-forest block mb-1">
                Rekomendasi Menginap Dekat Sini
              </span>
              <h3 className="font-display text-base font-bold text-ink">
                {item.rekomendasiStay}
              </h3>
              <p className="mt-1 text-xs text-stone-500">
                Akses mudah menuju lokasi tanpa terjebak antrean jalan raya.
              </p>
              <Link
                href="/penginapan"
                className="mt-3 inline-flex items-center gap-1 text-xs font-semibold text-forest hover:underline"
              >
                <Home className="h-3.5 w-3.5" />
                <span>Lihat Penginapan</span>
              </Link>
            </div>

            {/* Related Jeep Card */}
            <div className="rounded-xl border border-stone-200/80 bg-white p-5">
              <span className="text-[10px] font-semibold uppercase tracking-wider text-forest block mb-1">
                Paket Jelajah Jeep Terkait
              </span>
              <h3 className="font-display text-base font-bold text-ink">
                {relatedJeep.nama}
              </h3>
              <p className="mt-1 text-xs text-stone-500">
                Lewati jalur perbukitan dan kawah bersama armada 4x4 lokal.
              </p>
              <Link
                href={`/jeep-dieng/${relatedJeep.slug}`}
                className="mt-3 inline-flex items-center gap-1 text-xs font-semibold text-forest hover:underline"
              >
                <Mountain className="h-3.5 w-3.5" />
                <span>Cek Detail Rute Jeep</span>
              </Link>
            </div>

            {/* WhatsApp Consultation */}
            <a
              href={consultWa}
              target="_blank"
              rel="noopener noreferrer"
              className="flex min-h-[46px] w-full items-center justify-center gap-2 rounded-xl bg-forest py-3 text-xs font-semibold text-white shadow-xs hover:bg-forest-light active:scale-95 transition"
            >
              <MessageCircle className="h-4 w-4" />
              <span>Tanya Rute Wisata Ini</span>
            </a>
          </div>
        </div>

        {/* MOBILE STICKY CONVERSION BAR (sm:hidden) */}
        <div className="fixed bottom-0 inset-x-0 z-40 bg-white/95 backdrop-blur-md border-t border-stone-200/90 px-4 py-3 sm:hidden shadow-lg flex items-center justify-between gap-3">
          <div className="min-w-0 flex-1">
            <span className="text-[10px] text-stone-500 uppercase font-semibold block">{item.elevasi}</span>
            <p className="font-display text-base font-bold text-forest leading-tight truncate">
              {item.nama}
            </p>
          </div>
          <a
            href={consultWa}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex min-h-[42px] items-center justify-center gap-1.5 rounded-xl bg-forest px-5 text-xs font-bold text-white shadow-xs active:bg-forest-light shrink-0"
          >
            <MessageCircle className="h-3.5 w-3.5" />
            <span>Tanya Rute</span>
          </a>
        </div>
      </div>
    </main>
  );
}
