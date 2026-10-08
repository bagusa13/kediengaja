import Link from 'next/link';
import { Mountain, Users, Clock, MapPin, Check, ArrowRight, MessageCircle } from 'lucide-react';
import { FALLBACK_JEEP } from '@/lib/mockData';
import { formatRupiah } from '@/lib/covers';
import { waLink } from '@/lib/site';

export const metadata = {
  title: 'Sewa Jeep Dieng 4x4 Offroad | Paket & Rute Wisata Kediengaja',
  description: 'Sewa Jeep 4x4 wisata Dieng untuk rute Kawah Sikidang, Savana Pangonan, Telaga Dringo, dan sunrise Sikunir. Sopir lokal ramah merangkap fotografer.',
  openGraph: {
    title: 'Sewa Jeep Dieng 4x4 Offroad | Kediengaja',
    description: 'Sensasi offroad seru keliling dataran tinggi Dieng dengan armada 4x4 terawat bersama driver lokal.',
  },
};

export default function JeepDiengPage() {
  const generalChat = waLink('Halo Admin Kediengaja, saya ingin tanya ketersediaan dan sewa Jeep 4x4 di Dieng.');

  return (
    <main className="bg-[#F8F7F3] min-h-screen">
      {/* Editorial Hero Header */}
      <section className="relative isolate overflow-hidden bg-slate-950 py-20 sm:py-28 text-white">
        <img
          src="/images/destinasi/kawah-sikidang.webp"
          alt="Armada Jeep 4x4 melintasi savana Dieng"
          className="absolute inset-0 h-full w-full object-cover opacity-35 object-center"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/60 to-transparent" />

        <div className="relative mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
          <div className="max-w-2xl">
            <span className="inline-block rounded-lg bg-white/10 px-3 py-1 text-xs font-semibold tracking-wider uppercase backdrop-blur-xs text-stone-200">
              Offroad &amp; Jelajah Alam
            </span>
            <h1 className="mt-4 font-display text-3xl font-bold tracking-tight sm:text-5xl lg:text-6xl leading-tight">
              Sewa Jeep 4x4 Wisata Dieng
            </h1>
            <p className="mt-4 text-sm sm:text-base leading-relaxed text-stone-300">
              Jelajahi kawah belerang, padang savana, dan telaga tersembunyi yang tidak bisa dijangkau mobil biasa. Didampingi sopir asli Dieng yang siap membantu mengambil foto dan video di spot terbaik.
            </p>

            <div className="mt-8 flex flex-col sm:flex-row items-stretch sm:items-center gap-3">
              <a
                href={generalChat}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex min-h-[46px] w-full sm:w-auto items-center justify-center gap-2 rounded-xl bg-forest px-5 text-sm font-semibold text-white shadow-xs hover:bg-forest-light active:scale-[0.98] transition"
              >
                <MessageCircle className="h-4 w-4" aria-hidden="true" />
                <span>Konsultasi Rute Jeep via WhatsApp</span>
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* Package Grid */}
      <section className="mx-auto max-w-6xl px-4 py-16 sm:px-6 sm:py-20 lg:px-8">
        <div className="mb-10 max-w-2xl">
          <p className="text-xs font-semibold tracking-wider uppercase text-forest">
            Pilihan Rute Resmi
          </p>
          <h2 className="mt-1 font-display text-2xl font-bold tracking-tight text-ink sm:text-3xl">
            Paket Rute Jeep Wisata
          </h2>
          <p className="mt-2 text-xs sm:text-sm text-stone-600">
            Harga tertera adalah per mobil (muat hingga 4 orang penumpang). Sudah termasuk mobil, BBM, dan sopir pemandu.
          </p>
        </div>

        <div className="grid grid-cols-1 gap-8 md:grid-cols-3">
          {FALLBACK_JEEP.map((item) => {
            const bookingHref = waLink(
              `Halo Admin Kediengaja,\nSaya ingin booking paket Jeep 4x4:\n\nPaket: ${item.nama}\nHarga: ${formatRupiah(item.harga)} / mobil\n\nMohon informasi jadwal kosong dan titik jemputnya. Terima kasih.`
            );

            return (
              <article
                key={item.id}
                className="group flex flex-col overflow-hidden rounded-xl border border-stone-200/90 bg-white transition hover:border-forest/40 hover:shadow-xs"
              >
                {/* Photo container */}
                <div className="relative aspect-16/10 w-full overflow-hidden bg-stone-100">
                  <img
                    src={item.gambar}
                    alt={item.nama}
                    className="h-full w-full object-cover transition duration-300 group-hover:scale-105"
                  />
                  <span className="absolute left-3 top-3 rounded-md bg-stone-900/85 px-2.5 py-1 text-[11px] font-semibold text-white shadow-xs backdrop-blur-xs">
                    {item.kategori}
                  </span>
                </div>

                {/* Content */}
                <div className="flex flex-1 flex-col p-5">
                  <h3 className="font-display text-lg font-bold text-ink">
                    <Link href={`/jeep-dieng/${item.slug}`} className="hover:text-forest transition-colors">
                      {item.nama}
                    </Link>
                  </h3>

                  <div className="mt-3 flex items-center gap-4 text-xs text-stone-500">
                    <span className="flex items-center gap-1.5">
                      <Clock className="h-3.5 w-3.5 text-stone-400" />
                      {item.durasi}
                    </span>
                    <span className="flex items-center gap-1.5">
                      <Users className="h-3.5 w-3.5 text-stone-400" />
                      Maks. {item.kapasitas} Orang
                    </span>
                  </div>

                  <p className="mt-3 text-xs leading-relaxed text-stone-600 line-clamp-3">
                    {item.deskripsi}
                  </p>

                  {/* Destinations highlight */}
                  <div className="mt-4 border-t border-stone-100 pt-3">
                    <p className="text-[11px] font-semibold uppercase tracking-wider text-stone-500 mb-2">
                      Destinasi yang Dikunjungi:
                    </p>
                    <ul className="space-y-1.5">
                      {item.rute.map((r) => (
                        <li key={r} className="flex items-start gap-2 text-xs text-stone-700">
                          <Check className="h-3.5 w-3.5 text-forest shrink-0 mt-0.5" />
                          <span>{r}</span>
                        </li>
                      ))}
                    </ul>
                  </div>

                  {/* Price & Action */}
                  <div className="mt-auto border-t border-stone-100 pt-5">
                    <div className="flex flex-col xs:flex-row xs:items-end justify-between gap-3">
                      <div>
                        <p className="text-[10px] text-stone-500 uppercase tracking-wider">Harga per Mobil</p>
                        <p className="font-display text-lg font-bold text-forest">
                          {formatRupiah(item.harga)}
                          <span className="text-xs font-normal text-stone-500"> /jeep</span>
                        </p>
                      </div>

                      <div className="grid grid-cols-2 gap-2 w-full xs:w-auto xs:flex xs:items-center">
                        <Link
                          href={`/jeep-dieng/${item.slug}`}
                          className="inline-flex min-h-[40px] items-center justify-center rounded-xl border border-stone-300 bg-white px-3 text-xs font-semibold text-stone-700 hover:bg-stone-50 transition"
                        >
                          Detail Rute
                        </Link>
                        <a
                          href={bookingHref}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="inline-flex min-h-[40px] items-center justify-center gap-1.5 rounded-xl bg-forest px-3.5 text-xs font-semibold text-white shadow-xs hover:bg-forest-light active:scale-95 transition"
                        >
                          <MessageCircle className="h-3.5 w-3.5" />
                          <span>Pesan</span>
                        </a>
                      </div>
                    </div>
                  </div>
                </div>
              </article>
            );
          })}
        </div>
      </section>
    </main>
  );
}
