import Link from 'next/link';
import { ArrowUpRight, ArrowRight, MapPin } from 'lucide-react';

const featuredDestination = {
  slug: 'bukit-sikunir',
  title: 'Bukit Sikunir',
  elevation: '2.263 mdpl',
  category: 'Golden Sunrise',
  timing: '03.30 – 06.30 WIB',
  description:
    'Terletak di Desa Sembungan, desa tertinggi di Pulau Jawa. Jalur trekking tangga batu 20–30 menit menyajikan panorama matahari terbit berbalut lautan awan dengan siluet Gunung Sindoro, Sumbing, Merbabu, dan Merapi.',
  image: '/images/destinasi/bukit-sikunir.webp',
};

const secondaryDestinations = [
  {
    slug: 'telaga-warna',
    title: 'Telaga Warna & Pengilon',
    elevation: '2.000 mdpl',
    category: 'Danau Vulkanik & Pinus',
    description: 'Danau alami dengan gradasi warna hijau toska dan kuning sulfur yang memantulkan sinar matahari di antara perbukitan.',
    image: '/images/destinasi/telaga-warna.webp',
  },
  {
    slug: 'kawah-sikidang',
    title: 'Kawah Sikidang',
    elevation: '2.050 mdpl',
    category: 'Geotermal & Boardwalk',
    description: 'Kawah vulkanik aktif dengan kubangan lumpur mendidih dan jembatan kayu layang estetik sepanjang satu kilometer.',
    image: '/images/destinasi/kawah-sikidang.webp',
  },
  {
    slug: 'candi-arjuna',
    title: 'Kompleks Candi Arjuna',
    elevation: '2.093 mdpl',
    category: 'Peninggalan Abad ke-7',
    description: 'Gugusan candi Hindu tertua di tanah Jawa di tengah lembah berkabut, menjadi titik utama fenomena embun upas saat musim kemarau.',
    image: '/images/destinasi/candi-arjuna.webp',
  },
];

export default function DestinationSection() {
  return (
    <section id="destinasi" className="scroll-mt-20 border-b border-stone-200/90 bg-[#FAF9F6] py-16 sm:py-24">
      <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
        {/* Chapter Heading */}
        <div className="flex flex-col sm:flex-row sm:items-end sm:justify-between gap-4 mb-10 sm:mb-12">
          <div>
            <p className="text-xs font-semibold tracking-widest uppercase text-forest/90">
              04 / Panduan Titik Ikonik
            </p>
            <h2 className="mt-2 font-display text-3xl font-bold tracking-tight text-ink sm:text-4xl lg:text-[42px] leading-[1.15]">
              Empat Sudut Tanah Para Dewa
            </h2>
            <p className="mt-3 max-w-xl text-sm sm:text-base text-stone-600 leading-relaxed">
              Panduan titik lanskap ikonik lengkap dengan ketinggian elevasi, waktu berkunjung terbaik, dan panduan rute langsung dari warga lokal.
            </p>
          </div>

          <Link
            href="/jelajahi-dieng"
            className="inline-flex items-center gap-1.5 text-xs sm:text-sm font-semibold text-forest hover:text-forest-light transition-colors shrink-0"
          >
            <span>Semua Panduan Destinasi</span>
            <ArrowRight className="h-4 w-4" aria-hidden="true" />
          </Link>
        </div>

        {/* DESKTOP EDITORIAL LAYOUT (lg:grid) */}
        <div className="hidden lg:grid lg:grid-cols-12 gap-6 items-stretch">
          {/* 1. Large Featured Card: Bukit Sikunir */}
          <Link
            href={`/jelajahi-dieng/${featuredDestination.slug}`}
            className="group relative lg:col-span-7 flex flex-col justify-end overflow-hidden rounded-xl bg-slate-950 min-h-[380px] sm:min-h-[440px] p-6 sm:p-8 text-white shadow-xs transition hover:shadow-sm"
          >
            <img
              src={featuredDestination.image}
              alt={featuredDestination.title}
              className="absolute inset-0 h-full w-full object-cover opacity-75 transition-transform duration-700 group-hover:scale-105"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/45 to-transparent pointer-events-none" />

            <div className="relative z-10">
              <div className="flex flex-wrap items-center gap-2 mb-3">
                <span className="rounded-lg bg-white/20 backdrop-blur-xs px-2.5 py-1 text-[11px] font-semibold uppercase tracking-wider text-white">
                  {featuredDestination.category}
                </span>
                <span className="rounded-lg bg-emerald-600/80 px-2.5 py-1 text-[11px] font-semibold text-white">
                  {featuredDestination.elevation}
                </span>
                <span className="text-xs text-stone-300 ml-auto hidden sm:inline">
                  Waktu: {featuredDestination.timing}
                </span>
              </div>

              <div className="flex items-start justify-between gap-4">
                <h3 className="font-display text-2xl sm:text-3xl font-bold text-white group-hover:text-emerald-200 transition-colors">
                  {featuredDestination.title}
                </h3>
                <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-xl bg-white/20 backdrop-blur-xs text-white transition group-hover:bg-white group-hover:text-ink">
                  <ArrowUpRight className="h-4 w-4" />
                </span>
              </div>

              <p className="mt-2.5 text-xs sm:text-sm text-stone-200 leading-relaxed max-w-xl">
                {featuredDestination.description}
              </p>
            </div>
          </Link>

          {/* 2. Secondary Stacked Cards */}
          <div className="lg:col-span-5 flex flex-col gap-4 justify-between">
            {secondaryDestinations.map((item) => (
              <Link
                key={item.title}
                href={`/jelajahi-dieng/${item.slug}`}
                className="group flex gap-4 overflow-hidden rounded-xl border border-stone-200/90 bg-white p-3.5 sm:p-4 transition hover:border-forest/50 hover:shadow-sm"
              >
                <div className="relative h-24 w-28 sm:h-28 sm:w-32 shrink-0 overflow-hidden rounded-lg bg-stone-100">
                  <img
                    src={item.image}
                    alt={item.title}
                    className="h-full w-full object-cover transition duration-300 group-hover:scale-105"
                  />
                  <span className="absolute bottom-1 left-1 rounded bg-slate-950/70 px-1.5 py-0.5 text-[9px] font-bold text-white">
                    {item.elevation}
                  </span>
                </div>

                <div className="flex flex-1 flex-col justify-center">
                  <span className="text-[10px] font-bold uppercase tracking-wider text-forest">
                    {item.category}
                  </span>
                  <h4 className="font-display text-sm sm:text-base font-bold text-ink group-hover:text-forest transition-colors mt-0.5">
                    {item.title}
                  </h4>
                  <p className="mt-1 text-xs text-stone-600 line-clamp-2 leading-relaxed">
                    {item.description}
                  </p>
                </div>
              </Link>
            ))}
          </div>
        </div>

        {/* MOBILE EDITORIAL DESTINATION COMPOSITION (lg:hidden) */}
        <div className="lg:hidden flex flex-col space-y-4">
          {/* Featured Spotlight: Bukit Sikunir */}
          <Link
            href={`/jelajahi-dieng/${featuredDestination.slug}`}
            className="group relative flex flex-col justify-end overflow-hidden rounded-2xl bg-slate-950 min-h-[300px] p-5 text-white shadow-xs"
          >
            <img
              src={featuredDestination.image}
              alt={featuredDestination.title}
              className="absolute inset-0 h-full w-full object-cover opacity-75"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/50 to-transparent pointer-events-none" />

            <div className="relative z-10">
              <div className="flex items-center gap-2 mb-2">
                <span className="rounded-md bg-white/20 backdrop-blur-xs px-2 py-0.5 text-[10px] font-semibold uppercase tracking-wider text-white">
                  {featuredDestination.category}
                </span>
                <span className="rounded-md bg-emerald-600/80 px-2 py-0.5 text-[10px] font-semibold text-white">
                  {featuredDestination.elevation}
                </span>
              </div>

              <div className="flex items-start justify-between gap-3">
                <h3 className="font-display text-xl font-bold text-white">
                  {featuredDestination.title}
                </h3>
                <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-xl bg-white/20 text-white">
                  <ArrowUpRight className="h-4 w-4" />
                </span>
              </div>

              <p className="mt-1.5 text-xs text-stone-200 line-clamp-2 leading-relaxed">
                {featuredDestination.description}
              </p>
            </div>
          </Link>

          {/* Secondary Editorial Cards Carousel */}
          <div className="flex overflow-x-auto snap-x snap-mandatory gap-3.5 pb-2 -mx-4 px-4 scrollbar-none">
            {secondaryDestinations.map((item) => (
              <Link
                key={item.title}
                href={`/jelajahi-dieng/${item.slug}`}
                className="w-[82vw] max-w-[320px] shrink-0 snap-center rounded-2xl border border-stone-200/90 bg-white overflow-hidden shadow-xs flex flex-col"
              >
                <div className="relative aspect-16/10 w-full overflow-hidden bg-stone-100">
                  <img
                    src={item.image}
                    alt={item.title}
                    className="h-full w-full object-cover"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-slate-950/60 via-transparent to-transparent pointer-events-none" />
                  <span className="absolute left-2.5 top-2.5 rounded bg-slate-950/75 backdrop-blur-xs px-2 py-0.5 text-[10px] font-bold text-white">
                    {item.elevation}
                  </span>
                  <span className="absolute left-2.5 bottom-2.5 text-[10px] font-semibold uppercase tracking-wider text-emerald-300">
                    {item.category}
                  </span>
                </div>

                <div className="p-4 flex flex-1 flex-col justify-between">
                  <div>
                    <h4 className="font-display text-base font-bold text-ink">
                      {item.title}
                    </h4>
                    <p className="mt-1 text-xs text-stone-600 line-clamp-2 leading-relaxed">
                      {item.description}
                    </p>
                  </div>
                  <div className="mt-3 pt-2 border-t border-stone-100 flex items-center justify-between text-xs font-semibold text-forest">
                    <span>Lihat Panduan &amp; Tips</span>
                    <ArrowRight className="h-3.5 w-3.5" />
                  </div>
                </div>
              </Link>
            ))}
          </div>

          <div className="flex items-center justify-between text-xs text-stone-500 px-1">
            <span>← Geser untuk lihat spot lain →</span>
            <Link href="/jelajahi-dieng" className="font-semibold text-forest">
              Semua Spot
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}
