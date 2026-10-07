import Link from 'next/link';
import { MapPin, ArrowRight } from 'lucide-react';

const destinations = [
  {
    slug: 'bukit-sikunir',
    title: 'Bukit Sikunir',
    elevation: '2.263 mdpl',
    description: 'Golden sunrise fenomenal berlatar siluet deretan gunung di Jawa Tengah.',
    image: '/images/destinasi/bukit-sikunir.webp',
  },
  {
    slug: 'telaga-warna',
    title: 'Telaga Warna & Pengilon',
    elevation: '2.000 mdpl',
    description: 'Gradasi air danau alami bernuansa toska yang dikelilingi hutan pinus pegunungan.',
    image: '/images/destinasi/telaga-warna.webp',
  },
  {
    slug: 'kawah-sikidang',
    title: 'Kawah Sikidang',
    elevation: '2.050 mdpl',
    description: 'Fenomena vulkanik unik dengan uap belerang aktif dan jembatan kayu estetik.',
    image: '/images/destinasi/kawah-sikidang.webp',
  },
  {
    slug: 'candi-arjuna',
    title: 'Kompleks Candi Arjuna',
    elevation: '2.093 mdpl',
    description: 'Warisan peradaban abad ke-7 yang berdiri kokoh di tengah hamparan kabut Dieng.',
    image: '/images/destinasi/candi-arjuna.webp',
  },
];

export default function DestinationSection() {
  return (
    <section id="destinasi" className="scroll-mt-20 border-t border-stone-200/70 bg-cream py-16 sm:py-24">
      <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
        {/* Editorial Heading */}
        <div className="max-w-2xl">
          <p className="text-xs font-bold tracking-wider uppercase text-forest">
            Destinasi Ikonik
          </p>
          <h2 className="mt-2 font-display text-2xl font-bold tracking-tight text-ink sm:text-3xl lg:text-4xl">
            Jelajahi Keindahan Dieng
          </h2>
          <p className="mt-2 text-sm sm:text-base text-stone-600 leading-relaxed">
            Dari puncak berburu lautan awan emas hingga danau vulkanik dan candi bersejarah.
          </p>
        </div>

        {/* Image-First Destination Grid */}
        <div className="mt-12 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {destinations.map((item) => (
            <div
              key={item.title}
              className="group relative flex flex-col overflow-hidden rounded-xl bg-slate-900 border border-stone-200/60 shadow-xs"
            >
              {/* Photo */}
              <div className="relative aspect-4/5 w-full overflow-hidden">
                <img
                  src={item.image}
                  alt={item.title}
                  className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
                  loading="lazy"
                />
                {/* Subtle dark gradient for legible typography */}
                <div className="absolute inset-0 bg-gradient-to-t from-slate-950/90 via-slate-950/30 to-transparent pointer-events-none" />

                {/* Text overlay bottom aligned */}
                <div className="absolute inset-x-0 bottom-0 p-5 text-white">
                  <span className="inline-block rounded-sm bg-white/20 px-2 py-0.5 text-[10px] font-semibold tracking-wider uppercase backdrop-blur-xs">
                    {item.elevation}
                  </span>
                  <h3 className="mt-2 font-display text-lg font-bold text-white">
                    {item.title}
                  </h3>
                  <p className="mt-1 text-xs text-stone-300 leading-relaxed line-clamp-2">
                    {item.description}
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
