"use client";

import { useEffect, useState } from 'react';
import Link from 'next/link';
import { ArrowRight, Users, Flame, Eye } from 'lucide-react';
import { FALLBACK_PENGINAPAN } from '@/lib/mockData';
import { fetchCollection, orFallback } from '@/lib/listings';
import { formatRupiah, villaCover } from '@/lib/covers';

const categories = [
  {
    title: 'Villa',
    subtitle: 'Privasi & kenyamanan',
    desc: 'Cocok untuk rombongan keluarga besar hingga 12 orang dengan area kumpul luas.',
  },
  {
    title: 'Homestay & Kabin',
    subtitle: 'Suasana hangat seperti rumah',
    desc: 'Kabin kayu estetik berlatar perbukitan dengan fasilitas dapur dan ruang santai.',
  },
  {
    title: 'Kamar Privat',
    subtitle: 'Nyaman untuk perjalanan Anda',
    desc: 'Istirahat tenang dengan jaminan water heater 24 jam di tengah dinginnya Dieng.',
  },
];

export default function AccommodationSection() {
  const [villas, setVillas] = useState(FALLBACK_PENGINAPAN);

  useEffect(() => {
    async function load() {
      try {
        const data = await fetchCollection('penginapan', 3);
        if (data && data.length > 0) {
          setVillas(orFallback(data, FALLBACK_PENGINAPAN));
        }
      } catch (err) {
        console.warn('Fallback to mock penginapan:', err);
      }
    }
    load();
  }, []);

  return (
    <section id="penginapan" className="scroll-mt-20 border-t border-stone-200/70 bg-white py-16 sm:py-24">
      <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
        {/* Editorial Heading */}
        <div className="max-w-3xl">
          <p className="text-xs font-bold tracking-wider uppercase text-forest">
            Akomodasi Terpilih
          </p>
          <h2 className="mt-2 font-display text-2xl font-bold tracking-tight text-ink sm:text-3xl lg:text-4xl">
            Tempat Istirahat Terbaik di Dieng
          </h2>
          <p className="mt-3 text-sm sm:text-base text-stone-600 leading-relaxed">
            Pilih penginapan yang sesuai dengan kebutuhan Anda, dari homestay sederhana hingga villa dengan pemandangan langsung ke pegunungan.
          </p>
        </div>

        {/* 3 Editorial Accommodation Categories */}
        <div className="mt-10 grid grid-cols-1 gap-6 sm:grid-cols-3 border-b border-stone-200/70 pb-10">
          {categories.map((cat) => (
            <div key={cat.title} className="rounded-xl border border-stone-200/80 bg-cream/60 p-5">
              <h3 className="font-display text-base font-bold text-ink">
                {cat.title}
              </h3>
              <p className="mt-0.5 text-xs font-medium text-forest">
                {cat.subtitle}
              </p>
              <p className="mt-2 text-xs text-stone-600 leading-relaxed">
                {cat.desc}
              </p>
            </div>
          ))}
        </div>

        {/* Real Curated Listings Grid */}
        <div className="mt-12">
          <div className="mb-6 flex items-center justify-between">
            <h3 className="font-display text-lg font-bold text-ink sm:text-xl">
              Unit Populer Siap Booking
            </h3>
            <Link
              href="/penginapan"
              className="inline-flex items-center gap-1.5 text-xs font-bold text-forest hover:text-forest-dark transition-colors"
            >
              <span>Lihat Semua Penginapan</span>
              <ArrowRight className="h-3.5 w-3.5" aria-hidden="true" />
            </Link>
          </div>

          <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-3">
            {villas.slice(0, 3).map((item) => (
              <article
                key={item.id}
                className="group flex flex-col overflow-hidden rounded-xl border border-stone-200/80 bg-white transition-all duration-200 hover:border-forest/40 hover:shadow-soft"
              >
                {/* Photo container */}
                <Link
                  href={`/penginapan/${item.id}`}
                  className="relative aspect-4/3 w-full overflow-hidden bg-stone-100"
                >
                  <img
                    src={villaCover(item)}
                    alt={item.nama}
                    className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
                    loading="lazy"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-slate-950/50 via-transparent to-transparent pointer-events-none" />
                  <span className="absolute left-3 bottom-3 rounded-md bg-white/95 px-2.5 py-1 text-[11px] font-bold text-forest shadow-xs">
                    {item.tipe || 'Penginapan'}
                  </span>
                </Link>

                {/* Details */}
                <div className="flex flex-1 flex-col p-5">
                  <div className="flex items-start justify-between gap-2">
                    <h4 className="font-display text-base font-bold text-ink">
                      <Link href={`/penginapan/${item.id}`} className="hover:text-forest transition-colors">
                        {item.nama}
                      </Link>
                    </h4>
                  </div>

                  <p className="mt-2 line-clamp-2 text-xs leading-relaxed text-stone-600">
                    {item.deskripsi}
                  </p>

                  <div className="mt-4 flex items-center gap-4 border-t border-stone-100 pt-3 text-xs text-stone-600">
                    <span className="flex items-center gap-1.5">
                      <Users className="h-3.5 w-3.5 text-stone-400" aria-hidden="true" />
                      Maks. {item.kapasitas} Orang
                    </span>
                    <span className="flex items-center gap-1.5">
                      <Flame className="h-3.5 w-3.5 text-forest" aria-hidden="true" />
                      Water Heater 24J
                    </span>
                  </div>

                  <div className="mt-4 flex items-center justify-between pt-2">
                    <div>
                      <p className="text-[10px] text-stone-500 uppercase tracking-wider">Mulai dari</p>
                      <p className="font-display text-base font-extrabold text-forest">
                        {formatRupiah(item.harga)}
                        <span className="text-[11px] font-normal text-stone-500"> /malam</span>
                      </p>
                    </div>

                    <Link
                      href={`/penginapan/${item.id}`}
                      className="inline-flex min-h-[36px] items-center rounded-lg bg-stone-100 px-3.5 text-xs font-bold text-ink hover:bg-forest hover:text-white transition-all active:scale-95"
                    >
                      Lihat Unit
                    </Link>
                  </div>
                </div>
              </article>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
