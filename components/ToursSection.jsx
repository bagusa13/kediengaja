"use client";

import { useEffect, useState } from 'react';
import Link from 'next/link';
import { ArrowRight, Clock, Users, Compass, Check } from 'lucide-react';
import { FALLBACK_TOURS } from '@/lib/mockData';
import { fetchCollection, orFallback } from '@/lib/listings';
import { formatRupiah } from '@/lib/covers';
import { waLink } from '@/lib/site';

export default function ToursSection() {
  const [tours, setTours] = useState(FALLBACK_TOURS);

  useEffect(() => {
    async function load() {
      try {
        const data = await fetchCollection('tours', 3);
        if (data && data.length > 0) {
          setTours(orFallback(data, FALLBACK_TOURS));
        }
      } catch (err) {
        console.warn('Fallback to mock tours:', err);
      }
    }
    load();
  }, []);

  return (
    <section id="paket-wisata" className="scroll-mt-20 border-b border-stone-200/80 bg-brand-cream/40 py-16 sm:py-24">
      <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
        {/* Section Heading */}
        <div className="flex flex-col sm:flex-row sm:items-end sm:justify-between gap-4 mb-10">
          <div>
            <p className="text-xs font-bold tracking-wider uppercase text-brand-green">
              Jelajah Bersama Pemandu Lokal
            </p>
            <h2 className="mt-1 font-display text-2xl font-bold tracking-tight text-brand-ink sm:text-3xl lg:text-4xl">
              Paket Wisata Dieng
            </h2>
            <p className="mt-2 max-w-xl text-sm sm:text-base text-stone-600 leading-relaxed">
              Jelajahi kawah belerang, lautan awan Sikunir, dan candi purba dengan armada jeep atau paket trip terarah.
            </p>
          </div>

          <Link
            href="/tours"
            className="inline-flex items-center gap-1.5 text-xs sm:text-sm font-bold text-brand-dark hover:text-brand-green transition-colors shrink-0"
          >
            <span>Lihat Semua Paket</span>
            <ArrowRight className="h-4 w-4" aria-hidden="true" />
          </Link>
        </div>

        {/* Photo-Led Tours Grid */}
        <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-3">
          {tours.slice(0, 3).map((item) => {
            const bookingHref = waLink(`Halo Kediengaja, saya ingin reservasi ${item.nama}.`);
            return (
              <article
                key={item.id}
                className="group flex flex-col overflow-hidden rounded-xl border border-stone-200/80 bg-white transition-all duration-200 hover:border-brand-green/60 hover:shadow-md"
              >
                {/* Photo container */}
                <div className="relative aspect-4/3 w-full overflow-hidden bg-stone-100">
                  <img
                    src={item.gambar}
                    alt={item.nama}
                    className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
                    loading="lazy"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-slate-950/70 via-transparent to-transparent pointer-events-none" />

                  {/* Tipe pill */}
                  <span className="absolute left-3 top-3 rounded-md bg-slate-950/70 backdrop-blur-xs px-2.5 py-1 text-[11px] font-semibold text-white shadow-xs">
                    {item.tipe || 'Paket Wisata'}
                  </span>

                  {/* Price */}
                  <div className="absolute left-3 bottom-3 text-white">
                    <span className="text-[10px] text-stone-300 block uppercase tracking-wider">Tarif</span>
                    <span className="font-display text-base font-extrabold text-white">
                      {formatRupiah(item.harga)}
                      <span className="text-xs font-normal text-stone-200">
                        {item.tipe?.toLowerCase().includes('jeep') ? ' / armada' : ' / orang'}
                      </span>
                    </span>
                  </div>
                </div>

                {/* Details */}
                <div className="flex flex-1 flex-col p-5">
                  <h3 className="font-display text-lg font-bold text-brand-ink group-hover:text-brand-green transition-colors">
                    <Link href={`/tours/${item.id}`}>
                      {item.nama}
                    </Link>
                  </h3>

                  {/* Meta Chips */}
                  <div className="mt-3 flex items-center gap-4 text-xs text-stone-500">
                    <span className="flex items-center gap-1.5">
                      <Clock className="h-3.5 w-3.5 text-brand-green" aria-hidden="true" />
                      {item.durasi}
                    </span>
                    <span className="flex items-center gap-1.5">
                      <Compass className="h-3.5 w-3.5 text-brand-orange" aria-hidden="true" />
                      Guide / Driver Lokal
                    </span>
                  </div>

                  {/* Destinasi Highlights */}
                  {item.destinasi && item.destinasi.length > 0 && (
                    <div className="mt-4 border-t border-stone-100 pt-3">
                      <p className="text-[11px] font-bold uppercase tracking-wider text-stone-500 mb-1.5">
                        Rute Kunjungan:
                      </p>
                      <ul className="space-y-1 text-xs text-stone-600">
                        {item.destinasi.slice(0, 3).map((dest) => (
                          <li key={dest} className="flex items-center gap-1.5">
                            <Check className="h-3 w-3 text-brand-green shrink-0" aria-hidden="true" />
                            <span className="truncate">{dest}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  )}

                  {/* Action buttons */}
                  <div className="mt-6 pt-3 border-t border-stone-100 flex items-center gap-2">
                    <Link
                      href={`/tours/${item.id}`}
                      className="inline-flex min-h-[38px] flex-1 items-center justify-center rounded-lg border border-stone-200 bg-white px-3 text-xs font-bold text-brand-ink hover:bg-stone-50 transition-all"
                    >
                      Detail Rute
                    </Link>
                    <a
                      href={bookingHref}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex min-h-[38px] flex-1 items-center justify-center rounded-lg bg-forest px-3 text-xs font-bold text-white hover:bg-forest-light transition-all active:scale-[0.98]"
                    >
                      Pesan via WA
                    </a>
                  </div>
                </div>
              </article>
            );
          })}
        </div>
      </div>
    </section>
  );
}
