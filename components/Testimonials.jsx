import { Star, CheckCircle2 } from 'lucide-react';

const reviews = [
  {
    name: "Keluarga Besar Bpk. Ahmad",
    origin: "Surabaya",
    trip: "Golden Sunrise Sikunir",
    image: "/images/dokumentasi/tamu-1.jpg",
    rating: 5,
    text: "Koordinasi via WhatsApp sangat rapi dan tepat waktu. Dari penjemputan subuh untuk berburu fajar di Sikunir sampai kembali ke homestay semuanya teratur tanpa repot."
  },
  {
    name: "Rani & Rekan",
    origin: "Jakarta",
    trip: "Private Stay Cabin House",
    image: "/images/dokumentasi/tamu-2.jpg",
    rating: 5,
    text: "Penginapannya estetik dan view-nya langsung ke kabut pegunungan. Udara dingin Dieng tapi water heater 24 jam lancar, kasur bersih, dan suasananya sangat tenang."
  },
  {
    name: "Dimas & Teman Kantor",
    origin: "Semarang",
    trip: "Offroad Jeep 4x4 Kawah Sikidang",
    image: "/images/dokumentasi/tamu-3.jpg",
    rating: 5,
    text: "Driver jeep ramah dan paham karakter jalur. Kami diajak ke spot foto terbuka yang jarang didatangi wisatawan lain, sekaligus dibantu ambil foto dokumentasi."
  }
];

export default function Testimonials() {
  return (
    <section className="border-b border-stone-200/80 bg-[#F8F7F3] py-16 sm:py-20">
      <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
        <div className="max-w-2xl mb-10">
          <p className="text-xs font-semibold tracking-widest uppercase text-forest/90">
            07 / Cerita Tamu
          </p>
          <h2 className="mt-2 font-display text-2xl font-bold tracking-tight text-ink sm:text-3xl lg:text-4xl">
            Momen Nyata Wisatawan
          </h2>
          <p className="mt-2.5 text-xs sm:text-sm text-stone-600 leading-relaxed">
            Dokumentasi dan ulasan asli dari para tamu yang telah mempercayakan perjalanan Dieng bersama Kediengaja.
          </p>
        </div>

        {/* DESKTOP REVIEWS GRID (hidden sm:grid) */}
        <div className="hidden sm:grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {reviews.map((rev, i) => (
            <div
              key={i}
              className="rounded-2xl border border-stone-200/90 bg-white overflow-hidden shadow-xs flex flex-col justify-between transition hover:border-forest/40 hover:shadow-sm"
            >
              <div>
                <div className="relative aspect-16/10 w-full overflow-hidden bg-stone-100">
                  <img
                    src={rev.image}
                    alt={`Dokumentasi trip ${rev.name}`}
                    className="h-full w-full object-cover transition duration-300 hover:scale-105"
                  />
                  <span className="absolute left-3 top-3 rounded-md bg-stone-900/80 px-2.5 py-0.5 text-[11px] font-semibold text-white shadow-xs backdrop-blur-xs">
                    {rev.trip}
                  </span>
                </div>

                <div className="p-5 sm:p-6">
                  <div className="flex items-center gap-1 text-amber-500 mb-3" aria-label={`Rating ${rev.rating} bintang`}>
                    {[...Array(rev.rating)].map((_, s) => (
                      <Star key={s} className="h-4 w-4 fill-amber-400 text-amber-400" aria-hidden="true" />
                    ))}
                  </div>
                  <p className="text-xs sm:text-sm leading-relaxed text-stone-700">
                    &ldquo;{rev.text}&rdquo;
                  </p>
                </div>
              </div>

              <div className="px-5 sm:px-6 pb-5 pt-3 border-t border-stone-100 flex items-center justify-between">
                <div>
                  <h3 className="font-semibold text-xs text-ink">{rev.name}</h3>
                  <p className="text-[11px] text-stone-500">{rev.origin}</p>
                </div>
                <span className="inline-flex items-center gap-1 text-[11px] font-medium text-emerald-700">
                  <CheckCircle2 className="h-3.5 w-3.5" aria-hidden="true" />
                  <span>Tamu Terverifikasi</span>
                </span>
              </div>
            </div>
          ))}
        </div>

        {/* MOBILE ART-DIRECTED REVIEWS CAROUSEL (sm:hidden) */}
        <div className="sm:hidden">
          <div className="flex overflow-x-auto snap-x snap-mandatory gap-4 pb-2 -mx-4 px-4 scrollbar-none">
            {reviews.map((rev, i) => (
              <div
                key={i}
                className="w-[85vw] max-w-[320px] shrink-0 snap-center rounded-2xl border border-stone-200/90 bg-white overflow-hidden shadow-xs flex flex-col justify-between"
              >
                <div>
                  <div className="relative aspect-16/10 w-full overflow-hidden bg-stone-100">
                    <img
                      src={rev.image}
                      alt={`Dokumentasi trip ${rev.name}`}
                      className="h-full w-full object-cover"
                    />
                    <span className="absolute left-2.5 top-2.5 rounded-md bg-stone-900/80 px-2 py-0.5 text-[10px] font-semibold text-white backdrop-blur-xs">
                      {rev.trip}
                    </span>
                  </div>

                  <div className="p-4">
                    <div className="flex items-center gap-1 text-amber-500 mb-2" aria-label={`Rating ${rev.rating} bintang`}>
                      {[...Array(rev.rating)].map((_, s) => (
                        <Star key={s} className="h-3.5 w-3.5 fill-amber-400 text-amber-400" aria-hidden="true" />
                      ))}
                    </div>
                    <p className="text-xs leading-relaxed text-stone-700">
                      &ldquo;{rev.text}&rdquo;
                    </p>
                  </div>
                </div>

                <div className="px-4 pb-4 pt-2.5 border-t border-stone-100 flex items-center justify-between">
                  <div>
                    <h3 className="font-semibold text-xs text-ink">{rev.name}</h3>
                    <p className="text-[11px] text-stone-500">{rev.origin}</p>
                  </div>
                  <span className="inline-flex items-center gap-1 text-[10px] font-medium text-emerald-700">
                    <CheckCircle2 className="h-3 w-3" aria-hidden="true" />
                    <span>Terverifikasi</span>
                  </span>
                </div>
              </div>
            ))}
          </div>
          <p className="mt-2 text-center text-xs text-stone-400">
            ← Geser untuk dokumentasi lainnya →
          </p>
        </div>
      </div>
    </section>
  );
}
