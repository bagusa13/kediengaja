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
    <section id="destinasi" className="scroll-mt-20 border-b border-stone-200/80 bg-white py-16 sm:py-24">
      <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
        {/* Section Heading */}
        <div className="flex flex-col sm:flex-row sm:items-end sm:justify-between gap-4 mb-10">
          <div>
            <p className="text-xs font-bold tracking-wider uppercase text-forest">
              Wisata Alam &amp; Budaya
            </p>
            <h2 className="mt-1 font-display text-2xl font-bold tracking-tight text-ink sm:text-3xl lg:text-4xl">
              Destinasi Pilihan di Dieng
            </h2>
            <p className="mt-2 max-w-xl text-sm sm:text-base text-stone-600 leading-relaxed">
              Panduan destinasi ikonik lengkap dengan elevasi ketinggian, waktu berkunjung terbaik, dan tips langsung dari warga lokal.
            </p>
          </div>

          <Link
            href="/jelajahi-dieng"
            className="inline-flex items-center gap-1.5 text-xs sm:text-sm font-bold text-forest hover:text-forest-dark transition-colors shrink-0"
          >
            <span>Panduan Semua Destinasi</span>
            <ArrowRight className="h-4 w-4" aria-hidden="true" />
          </Link>
        </div>

        {/* Editorial Layout: Large Featured + 3 Secondary Cards (Breaks the generic 4-column repetition) */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-stretch">
          {/* 1. Large Featured Card: Bukit Sikunir */}
          <Link
            href={`/jelajahi-dieng/${featuredDestination.slug}`}
            className="group relative lg:col-span-7 flex flex-col justify-end overflow-hidden rounded-2xl bg-slate-950 min-h-[380px] sm:min-h-[440px] p-6 sm:p-8 text-white shadow-xs transition hover:shadow-md"
          >
            <img
              src={featuredDestination.image}
              alt={featuredDestination.title}
              className="absolute inset-0 h-full w-full object-cover opacity-75 transition-transform duration-700 group-hover:scale-105"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/45 to-transparent pointer-events-none" />

            <div className="relative z-10">
              <div className="flex flex-wrap items-center gap-2 mb-3">
                <span className="rounded-md bg-white/20 backdrop-blur-xs px-2.5 py-1 text-[11px] font-bold uppercase tracking-wider text-white">
                  {featuredDestination.category}
                </span>
                <span className="rounded-md bg-emerald-500/80 px-2.5 py-1 text-[11px] font-bold text-white">
                  {featuredDestination.elevation}
                </span>
                <span className="text-xs text-stone-300 ml-auto hidden sm:inline">
                  Waktu: {featuredDestination.timing}
                </span>
              </div>

              <div className="flex items-start justify-between gap-4">
                <h3 className="font-display text-2xl sm:text-3xl font-extrabold text-white group-hover:text-amber-300 transition-colors">
                  {featuredDestination.title}
                </h3>
                <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-white/20 backdrop-blur-xs text-white transition group-hover:bg-white group-hover:text-ink">
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
      </div>
    </section>
  );
}
