import Link from 'next/link';
import { ArrowUpRight } from 'lucide-react';

const destinations = [
  {
    slug: 'bukit-sikunir',
    title: 'Bukit Sikunir',
    elevation: '2.263 mdpl',
    description: 'Spot berburu golden sunrise terbaik di Asia Tenggara dengan panorama siluet gunung kembar.',
    image: '/images/destinasi/bukit-sikunir.webp',
  },
  {
    slug: 'telaga-warna',
    title: 'Telaga Warna & Pengilon',
    elevation: '2.000 mdpl',
    description: 'Danau vulkanik unik dengan gradasi warna air hijau toska alami dan deretan pohon pinus.',
    image: '/images/destinasi/telaga-warna.webp',
  },
  {
    slug: 'kawah-sikidang',
    title: 'Kawah Sikidang',
    elevation: '2.050 mdpl',
    description: 'Kawah geotermal aktif dengan letupan lumpur panas dan jembatan boardwalk kayu estetik.',
    image: '/images/destinasi/kawah-sikidang.webp',
  },
  {
    slug: 'candi-arjuna',
    title: 'Kompleks Candi Arjuna',
    elevation: '2.093 mdpl',
    description: 'Gugusan candi Hindu tertua di tanah Jawa peninggalan abad ke-7 di tengah lembah berkabut.',
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
            <p className="text-xs font-bold tracking-wider uppercase text-brand-green">
              Wisata Alam &amp; Budaya
            </p>
            <h2 className="mt-1 font-display text-2xl font-bold tracking-tight text-brand-ink sm:text-3xl lg:text-4xl">
              Destinasi Populer di Dieng
            </h2>
            <p className="mt-2 max-w-xl text-sm sm:text-base text-stone-600 leading-relaxed">
              Dari puncak berburu lautan awan emas hingga danau vulkanik dan candi bersejarah yang memikat.
            </p>
          </div>

          <Link
            href="/jelajahi-dieng"
            className="inline-flex items-center gap-1.5 text-xs sm:text-sm font-bold text-brand-dark hover:text-brand-green transition-colors shrink-0"
          >
            <span>Semua Destinasi</span>
            <ArrowUpRight className="h-4 w-4" aria-hidden="true" />
          </Link>
        </div>

        {/* Editorial Photo Grid */}
        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {destinations.map((item) => (
            <Link
              key={item.title}
              href={`/jelajahi-dieng/${item.slug}`}
              className="group relative flex flex-col overflow-hidden rounded-xl bg-slate-900 border border-stone-200/60 shadow-xs transition-all hover:shadow-md"
            >
              {/* Photo */}
              <div className="relative aspect-4/5 w-full overflow-hidden">
                <img
                  src={item.image}
                  alt={item.title}
                  className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
                  loading="lazy"
                />
                {/* Subtle dark gradient for high contrast reading */}
                <div className="absolute inset-0 bg-gradient-to-t from-slate-950/90 via-slate-950/35 to-transparent pointer-events-none" />

                {/* Text overlay bottom aligned */}
                <div className="absolute inset-x-0 bottom-0 p-5 text-white">
                  <div className="flex items-center justify-between">
                    <span className="inline-block rounded-sm bg-white/20 px-2 py-0.5 text-[10px] font-semibold tracking-wider uppercase backdrop-blur-xs">
                      {item.elevation}
                    </span>
                    <ArrowUpRight className="h-4 w-4 text-white/70 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5 group-hover:text-white" />
                  </div>
                  <h3 className="mt-2 font-display text-lg font-bold text-white group-hover:text-brand-orange transition-colors">
                    {item.title}
                  </h3>
                  <p className="mt-1 text-xs text-stone-300 leading-relaxed line-clamp-2">
                    {item.description}
                  </p>
                </div>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}
