import { Star } from 'lucide-react';

const reviews = [
  {
    name: "Rani S.",
    origin: "Jakarta",
    rating: 5,
    text: "Penginapannya nyaman dan view-nya langsung ke pegunungan. Udara dingin tapi air panasnya lancar dan kamar tidurnya bersih."
  },
  {
    name: "Dimas & Teman Kantor",
    origin: "Semarang",
    rating: 5,
    text: "Driver jeep ramah dan paham jalur. Kami diajak ke spot foto sunrise yang sepi dan pemandangannya luar biasa."
  },
  {
    name: "Ahmad Fauzi",
    origin: "Surabaya",
    rating: 5,
    text: "Pemesanan lewat WhatsApp sangat praktis. Begitu sampai di Dieng langsung diantar ke homestay tanpa perlu bingung rute."
  }
];

export default function Testimonials() {
  return (
    <section className="border-b border-stone-200/80 bg-[#F8F7F3] py-16 sm:py-20">
      <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
        <div className="max-w-2xl mb-10">
          <p className="text-xs font-semibold tracking-wider uppercase text-forest">
            Ulasan Tamu
          </p>
          <h2 className="mt-1 font-display text-2xl font-bold tracking-tight text-ink sm:text-3xl">
            Cerita Perjalanan Tamu
          </h2>
          <p className="mt-2 text-xs sm:text-sm text-stone-600 leading-relaxed">
            Pengalaman nyata wisatawan yang telah menjelajahi dataran tinggi bersama Kediengaja.
          </p>
        </div>

        {/* DESKTOP REVIEWS GRID (hidden sm:grid) */}
        <div className="hidden sm:grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {reviews.map((rev, i) => (
            <div
              key={i}
              className="rounded-xl border border-stone-200/90 bg-white p-6 shadow-xs flex flex-col justify-between"
            >
              <div>
                <div className="flex items-center gap-1 text-amber-500 mb-3" aria-label={`Rating ${rev.rating} bintang`}>
                  {[...Array(rev.rating)].map((_, s) => (
                    <Star key={s} className="h-4 w-4 fill-amber-400 text-amber-400" aria-hidden="true" />
                  ))}
                </div>
                <p className="text-xs sm:text-sm leading-relaxed text-stone-700">
                  &ldquo;{rev.text}&rdquo;
                </p>
              </div>
              <div className="mt-5 pt-3 border-t border-stone-200/60 flex items-center justify-between">
                <div>
                  <h3 className="font-semibold text-xs text-ink">{rev.name}</h3>
                  <p className="text-[11px] text-stone-500">{rev.origin}</p>
                </div>
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
                className="w-[85vw] max-w-[320px] shrink-0 snap-center rounded-2xl border border-stone-200/90 bg-white p-5 shadow-xs flex flex-col justify-between"
              >
                <div>
                  <div className="flex items-center gap-1 text-amber-500 mb-2.5" aria-label={`Rating ${rev.rating} bintang`}>
                    {[...Array(rev.rating)].map((_, s) => (
                      <Star key={s} className="h-3.5 w-3.5 fill-amber-400 text-amber-400" aria-hidden="true" />
                    ))}
                  </div>
                  <p className="text-xs leading-relaxed text-stone-700">
                    &ldquo;{rev.text}&rdquo;
                  </p>
                </div>
                <div className="mt-4 pt-3 border-t border-stone-100 flex items-center justify-between">
                  <div>
                    <h3 className="font-semibold text-xs text-ink">{rev.name}</h3>
                    <p className="text-[11px] text-stone-500">{rev.origin}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
          <p className="mt-2 text-center text-xs text-stone-400">
            ← Geser untuk cerita tamu lainnya →
          </p>
        </div>
      </div>
    </section>
  );
}
