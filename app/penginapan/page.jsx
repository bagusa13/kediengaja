import Link from 'next/link';
import { Users, MapPin, Check, MessageCircle, Calendar } from 'lucide-react';
import { FALLBACK_PENGINAPAN } from '@/lib/mockData';
import { fetchCollection, orFallback } from '@/lib/listings';
import { formatRupiah, villaCover } from '@/lib/covers';
import { waLink } from '@/lib/site';

export const metadata = {
  title: 'Sewa Cabin & Penginapan Dieng | Pilihan Homestay & Villa Ke Dieng Aja',
  description: 'Sewa cabin kayu estetik, homestay keluarga, dan villa di Dataran Tinggi Dieng. Fasilitas water heater 24 jam, view Gunung Prau, kapasitas 2–12 orang, booking langsung ke host.',
  openGraph: {
    title: 'Sewa Cabin & Penginapan Dieng | Ke Dieng Aja',
    description: 'Pilihan sewa cabin kayu dan homestay nyaman di Dataran Tinggi Dieng dengan fasilitas air panas 24 jam dan view pegunungan.',
  },
};

export default async function PenginapanPage() {
  let penginapan = FALLBACK_PENGINAPAN;
  try {
    const data = await fetchCollection('penginapan');
    penginapan = orFallback(data, FALLBACK_PENGINAPAN);
  } catch {
    penginapan = FALLBACK_PENGINAPAN;
  }

  const generalChat = waLink('Halo Ke Dieng Aja, saya ingin tanya ketersediaan dan rekomendasi penginapan/cabin di Dieng.');

  return (
    <main className="bg-cream/30 min-h-screen">
      {/* Editorial Hero Header (Persis seperti format /jeep-dieng) */}
      <section className="relative isolate overflow-hidden bg-slate-950 py-20 sm:py-28 text-white">
        <img
          src="/images/cabin-house-1/bigbed.jpg"
          alt="Cabin House dan Penginapan Hangat Dieng"
          className="absolute inset-0 h-full w-full object-cover opacity-35 object-center"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/60 to-transparent" />

        <div className="relative mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
          <div className="max-w-2xl">
            <span className="inline-block rounded-md bg-white/10 px-3 py-1 text-xs font-bold tracking-wider uppercase backdrop-blur-xs text-stone-200">
              Kabin &amp; Homestay Dieng
            </span>
            <h1 className="mt-4 font-display text-3xl font-extrabold tracking-tight sm:text-5xl lg:text-6xl leading-tight">
              Sewa Cabin &amp; Penginapan Dieng
            </h1>
            <p className="mt-4 text-sm sm:text-base leading-relaxed text-stone-300">
              Istirahat hangat dan nyaman di tengah sejuknya udara pegunungan Dieng. Seluruh unit kami terverifikasi memiliki water heater aktif 24 jam, pemandangan Gunung Prau, dan didampingi langsung oleh host lokal tanpa biaya tersembunyi.
            </p>

            <div className="mt-8 flex flex-wrap items-center gap-4">
              <a
                href={generalChat}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex min-h-[46px] items-center gap-2 rounded-xl bg-wa px-5 text-sm font-bold text-white shadow-lift hover:bg-[#15803d] active:scale-[0.98] transition"
              >
                <MessageCircle className="h-4 w-4" aria-hidden="true" />
                <span>Konsultasi Kamar via WhatsApp</span>
              </a>

              <Link
                href="/availability"
                className="inline-flex min-h-[46px] items-center gap-2 rounded-xl bg-white/10 px-5 text-sm font-semibold text-white backdrop-blur-xs hover:bg-white/20 transition"
              >
                <Calendar className="h-4 w-4" aria-hidden="true" />
                <span>Cek Kalender Ketersediaan</span>
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Package & Stay Grid (Persis seperti format /jeep-dieng) */}
      <section className="mx-auto max-w-6xl px-4 py-16 sm:px-6 sm:py-20 lg:px-8">
        <div className="mb-10 max-w-2xl">
          <p className="text-xs font-bold tracking-wider uppercase text-forest">
            Pilihan Unit Resmi
          </p>
          <h2 className="mt-1 font-display text-2xl font-bold tracking-tight text-ink sm:text-3xl">
            Daftar Cabin &amp; Homestay Dieng
          </h2>
          <p className="mt-2 text-xs sm:text-sm text-stone-600">
            Harga tertera adalah per malam per unit. Sudah termasuk fasilitas water heater 24 jam, peralatan dapur, dan area parkir mobil aman.
          </p>
        </div>

        <div className="grid grid-cols-1 gap-8 md:grid-cols-3">
          {penginapan.map((item) => {
            const bookingHref = waLink(
              `Halo Ke Dieng Aja,\nSaya ingin booking penginapan di Dieng:\n\nUnit: ${item.nama}\nHarga: ${formatRupiah(item.harga)} / malam\nKapasitas: ${item.kapasitas} orang\n\nMohon informasi ketersediaan tanggalnya. Terima kasih.`
            );

            const fasilitasHighlights = Array.isArray(item.fasilitas) && item.fasilitas.length > 0
              ? item.fasilitas.slice(0, 4)
              : [
                  'Water Heater Panas 24 Jam',
                  'View Gunung Prau & Bukit',
                  'Dapur & Peralatan Masak',
                  'Area Parkir Mobil Aman'
                ];

            return (
              <article
                key={item.id}
                className="group flex flex-col overflow-hidden rounded-xl border border-stone-200/80 bg-white transition hover:border-forest/40 hover:shadow-soft"
              >
                {/* Photo container */}
                <div className="relative aspect-16/10 w-full overflow-hidden bg-stone-100">
                  <img
                    src={villaCover(item)}
                    alt={item.nama}
                    className="h-full w-full object-cover transition duration-300 group-hover:scale-105"
                  />
                  <span className="absolute left-3 top-3 rounded-md bg-slate-900/90 px-2.5 py-1 text-[11px] font-bold text-white shadow-xs backdrop-blur-xs">
                    {item.tipe || 'Cabin House'}
                  </span>
                </div>

                {/* Content */}
                <div className="flex flex-1 flex-col p-5">
                  <h3 className="font-display text-lg font-bold text-ink">
                    <Link href={`/penginapan/${item.id}`} className="hover:text-forest transition-colors">
                      {item.nama}
                    </Link>
                  </h3>

                  <div className="mt-3 flex items-center gap-4 text-xs text-stone-500">
                    <span className="flex items-center gap-1.5 truncate">
                      <MapPin className="h-3.5 w-3.5 text-stone-400 shrink-0" />
                      <span className="truncate">{item.lokasi || 'Dataran Tinggi Dieng'}</span>
                    </span>
                    <span className="flex items-center gap-1.5 shrink-0">
                      <Users className="h-3.5 w-3.5 text-stone-400" />
                      Maks. {item.kapasitas} Orang
                    </span>
                  </div>

                  <p className="mt-3 text-xs leading-relaxed text-stone-600 line-clamp-3">
                    {item.deskripsi}
                  </p>

                  {/* Facilities highlight */}
                  <div className="mt-4 border-t border-stone-100 pt-3">
                    <p className="text-[11px] font-bold uppercase tracking-wider text-stone-500 mb-2">
                      Fasilitas Utama:
                    </p>
                    <ul className="space-y-1.5">
                      {fasilitasHighlights.map((f) => (
                        <li key={f} className="flex items-start gap-2 text-xs text-stone-700">
                          <Check className="h-3.5 w-3.5 text-forest shrink-0 mt-0.5" />
                          <span className="truncate">{f}</span>
                        </li>
                      ))}
                    </ul>
                  </div>

                  {/* Price & Action */}
                  <div className="mt-auto border-t border-stone-100 pt-5">
                    <div className="flex items-end justify-between gap-2">
                      <div>
                        <p className="text-[10px] text-stone-500 uppercase tracking-wider">Harga per Malam</p>
                        <p className="font-display text-lg font-black text-forest">
                          {formatRupiah(item.harga)}
                          <span className="text-xs font-normal text-stone-500"> /malam</span>
                        </p>
                      </div>

                      <div className="flex items-center gap-2">
                        <Link
                          href={`/penginapan/${item.id}`}
                          className="inline-flex min-h-[38px] items-center rounded-lg border border-stone-200 bg-stone-50 px-3 text-xs font-semibold text-stone-700 hover:bg-stone-100 transition"
                        >
                          Detail
                        </Link>
                        <a
                          href={bookingHref}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="inline-flex min-h-[38px] items-center gap-1.5 rounded-lg bg-wa px-3.5 text-xs font-bold text-white hover:bg-[#15803d] active:scale-95 transition"
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