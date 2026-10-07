"use client";

import { useEffect, useState } from 'react';
import Link from 'next/link';
import { ArrowRight, Users, Flame, MapPin, BedDouble } from 'lucide-react';
import { FALLBACK_PENGINAPAN } from '@/lib/mockData';
import { fetchCollection, orFallback } from '@/lib/listings';
import { formatRupiah, villaCover } from '@/lib/covers';

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
    <section id="penginapan" className="scroll-mt-20 border-b border-stone-200/80 bg-white py-16 sm:py-24">
      <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
        {/* Section Heading */}
        <div className="flex flex-col sm:flex-row sm:items-end sm:justify-between gap-4 mb-10">
          <div>
            <p className="text-xs font-bold tracking-wider uppercase text-brand-green">
              Akomodasi Pilihan
            </p>
            <h2 className="mt-1 font-display text-2xl font-bold tracking-tight text-brand-ink sm:text-3xl lg:text-4xl">
              Penginapan Pilihan di Dieng
            </h2>
            <p className="mt-2 max-w-xl text-sm sm:text-base text-stone-600 leading-relaxed">
              Kabin kayu hangat dan villa privat dengan fasilitas air panas aktif 24 jam untuk kenyamanan istirahat di udara dingin Dieng.
            </p>
          </div>

          <Link
            href="/penginapan"
            className="inline-flex items-center gap-1.5 text-xs sm:text-sm font-bold text-brand-dark hover:text-brand-green transition-colors shrink-0"
          >
            <span>Lihat Semua Penginapan</span>
            <ArrowRight className="h-4 w-4" aria-hidden="true" />
          </Link>
        </div>

        {/* Real Curated Listings Grid */}
        <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-3">
          {villas.slice(0, 3).map((item) => (
            <article
              key={item.id}
              className="group flex flex-col overflow-hidden rounded-xl border border-stone-200/80 bg-white transition-all duration-200 hover:border-brand-green/60 hover:shadow-md"
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
                <div className="absolute inset-0 bg-gradient-to-t from-slate-950/60 via-transparent to-transparent pointer-events-none" />
                
                {/* Tipe badge */}
                <span className="absolute left-3 top-3 rounded-md bg-slate-950/70 backdrop-blur-xs px-2.5 py-1 text-[11px] font-semibold text-white shadow-xs">
                  {item.tipe || 'Kabin Wisata'}
                </span>

                {/* Price pill */}
                <div className="absolute left-3 bottom-3 text-white">
                  <span className="text-[10px] text-stone-300 block uppercase tracking-wider">Mulai</span>
                  <span className="font-display text-base font-extrabold text-white">
                    {formatRupiah(item.harga)}
                    <span className="text-xs font-normal text-stone-200"> / malam</span>
                  </span>
                </div>
              </Link>

              {/* Property Details */}
              <div className="flex flex-1 flex-col p-5">
                <div className="flex items-start justify-between gap-2">
                  <h3 className="font-display text-lg font-bold text-brand-ink">
                    <Link href={`/penginapan/${item.id}`} className="hover:text-brand-green transition-colors">
                      {item.nama}
                    </Link>
                  </h3>
                </div>

                {/* Location */}
                <p className="mt-1 flex items-center gap-1.5 text-xs text-stone-500">
                  <MapPin className="h-3.5 w-3.5 text-brand-green shrink-0" aria-hidden="true" />
                  <span className="truncate">{item.lokasi || 'Kawasan Wisata Dieng'}</span>
                </p>

                {/* Key Spec */}
                <div className="mt-4 grid grid-cols-3 gap-2 border-y border-stone-100 py-3 text-xs text-stone-600">
                  <div className="flex flex-col items-center justify-center p-1.5 rounded-lg bg-brand-cream/60 text-center">
                    <Users className="h-4 w-4 text-brand-dark mb-1" aria-hidden="true" />
                    <span className="font-semibold text-[11px] text-brand-ink">{item.kapasitas} Orang</span>
                  </div>
                  <div className="flex flex-col items-center justify-center p-1.5 rounded-lg bg-brand-cream/60 text-center">
                    <BedDouble className="h-4 w-4 text-brand-dark mb-1" aria-hidden="true" />
                    <span className="font-semibold text-[11px] text-brand-ink">Bed Lengkap</span>
                  </div>
                  <div className="flex flex-col items-center justify-center p-1.5 rounded-lg bg-brand-cream/60 text-center">
                    <Flame className="h-4 w-4 text-brand-orange mb-1" aria-hidden="true" />
                    <span className="font-semibold text-[11px] text-brand-ink">Water Heater</span>
                  </div>
                </div>

                {/* Summary */}
                <p className="mt-3 line-clamp-2 text-xs leading-relaxed text-stone-600 flex-1">
                  {item.deskripsi}
                </p>

                {/* Action button */}
                <div className="mt-4 pt-2">
                  <Link
                    href={`/penginapan/${item.id}`}
                    className="inline-flex min-h-[40px] w-full items-center justify-center rounded-lg border border-brand-dark bg-transparent px-4 text-xs font-bold text-brand-dark hover:bg-brand-dark hover:text-white transition-all active:scale-[0.99]"
                  >
                    Lihat Detail
                  </Link>
                </div>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
