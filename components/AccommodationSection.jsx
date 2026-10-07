"use client";

import { useEffect, useState } from 'react';
import Link from 'next/link';
import { ArrowRight, Users, Flame, MapPin, BedDouble, Check, Sparkles } from 'lucide-react';
import { FALLBACK_PENGINAPAN } from '@/lib/mockData';
import { fetchCollection, orFallback } from '@/lib/listings';
import { formatRupiah, villaCover } from '@/lib/covers';

export default function AccommodationSection() {
  const [villas, setVillas] = useState(FALLBACK_PENGINAPAN);
  const [selectedIndex, setSelectedIndex] = useState(0);

  useEffect(() => {
    async function load() {
      try {
        const data = await fetchCollection('penginapan', 4);
        if (data && data.length > 0) {
          setVillas(orFallback(data, FALLBACK_PENGINAPAN));
        }
      } catch (err) {
        console.warn('Fallback to mock penginapan:', err);
      }
    }
    load();
  }, []);

  const activeVilla = villas[selectedIndex] || villas[0];

  return (
    <section id="penginapan" className="scroll-mt-20 border-b border-stone-200/90 bg-[#F4F1EA] py-16 sm:py-24">
      <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
        {/* Chapter Header */}
        <div className="max-w-2xl mb-8 sm:mb-12">
          <p className="text-xs font-semibold tracking-widest uppercase text-forest/90">
            02 / Pilihan Menginap
          </p>
          <h2 className="mt-2 font-display text-3xl font-bold tracking-tight text-ink sm:text-4xl lg:text-[42px] leading-[1.15]">
            Kabin Hangat di Tengah Udara 10°C Dieng
          </h2>
          <p className="mt-3 text-sm sm:text-base text-stone-600 leading-relaxed">
            Setelah menyusuri kawah dan perbukitan dingin, tempat beristirahat harus benar-benar nyaman. Setiap unit dikurasi dengan standar wajib air panas 24 jam.
          </p>
        </div>

        {/* DESKTOP PHOTOGRAPHY-LED SHOWCASE (hidden md:grid) */}
        <div className="hidden md:grid md:grid-cols-12 gap-8 items-stretch">
          {/* Left: Large Architectural Photography (7 cols) */}
          <div className="md:col-span-7 flex flex-col">
            <div className="relative aspect-16/11 w-full overflow-hidden rounded-2xl bg-stone-900 shadow-sm flex-1">
              <img
                src={villaCover(activeVilla)}
                alt={activeVilla.nama}
                className="h-full w-full object-cover transition-all duration-700 hover:scale-105"
                loading="lazy"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-slate-950/80 via-slate-950/20 to-transparent pointer-events-none" />

              {/* Photo Badges */}
              <div className="absolute top-4 left-4 flex items-center gap-2">
                <span className="rounded-lg bg-white/95 px-3 py-1 text-xs font-bold text-forest shadow-xs">
                  {activeVilla.tipe || 'Kabin Wisata'}
                </span>
                <span className="inline-flex items-center gap-1.5 rounded-lg bg-stone-950/80 backdrop-blur-xs px-2.5 py-1 text-xs font-medium text-amber-200 border border-white/10">
                  <Flame className="w-3.5 h-3.5 text-amber-400" aria-hidden="true" />
                  Air Panas 24 Jam
                </span>
              </div>

              {/* Bottom Photo Overlay Info */}
              <div className="absolute bottom-5 left-5 right-5 text-white flex items-end justify-between">
                <div>
                  <p className="text-xs text-stone-300 font-medium">Tarif resmi mulai</p>
                  <p className="font-display text-2xl font-bold text-white">
                    {formatRupiah(activeVilla.harga)}
                    <span className="text-xs font-normal text-stone-200"> / malam</span>
                  </p>
                </div>
                <div className="flex items-center gap-2 text-xs text-stone-200">
                  <Users className="h-4 w-4 text-emerald-400" aria-hidden="true" />
                  <span>Kapasitas {activeVilla.kapasitas} Tamu</span>
                </div>
              </div>
            </div>
          </div>

          {/* Right: Editorial Narrative & Unit Switcher (5 cols) */}
          <div className="md:col-span-5 flex flex-col justify-between rounded-2xl bg-white/70 border border-stone-300/80 p-6 sm:p-7 shadow-xs">
            <div>
              <span className="inline-flex items-center gap-1 text-[11px] font-bold uppercase tracking-wider text-forest">
                <Sparkles className="w-3.5 h-3.5" />
                <span>Unit Terkurasi</span>
              </span>
              <h3 className="mt-1 font-display text-2xl font-bold text-ink">
                {activeVilla.nama}
              </h3>
              <p className="mt-1 flex items-center gap-1 text-xs text-stone-500">
                <MapPin className="h-3.5 w-3.5 text-forest" />
                <span>{activeVilla.lokasi || 'Kawasan Dataran Tinggi Dieng'}</span>
              </p>

              <p className="mt-4 text-xs sm:text-sm text-stone-600 leading-relaxed">
                {activeVilla.deskripsi}
              </p>

              {/* Unit Selector Strip */}
              <div className="mt-6 pt-5 border-t border-stone-200/80">
                <p className="text-[11px] font-bold uppercase tracking-wider text-stone-500 mb-2.5">
                  Pilihan Unit Favorit:
                </p>
                <div className="space-y-2">
                  {villas.slice(0, 3).map((item, idx) => (
                    <button
                      key={item.id}
                      type="button"
                      onClick={() => setSelectedIndex(idx)}
                      className={`w-full flex items-center justify-between p-2.5 rounded-xl text-left transition-all ${
                        selectedIndex === idx
                          ? 'bg-forest text-white shadow-xs'
                          : 'bg-stone-100/90 text-ink hover:bg-stone-200/80'
                      }`}
                    >
                      <div className="min-w-0 pr-2">
                        <p className="font-semibold text-xs truncate">{item.nama}</p>
                        <p className={`text-[10px] ${selectedIndex === idx ? 'text-emerald-100' : 'text-stone-500'}`}>
                          Maks {item.kapasitas} orang · {item.tipe || 'Kabin'}
                        </p>
                      </div>
                      <span className={`text-xs font-bold shrink-0 ${selectedIndex === idx ? 'text-white' : 'text-forest'}`}>
                        {formatRupiah(item.harga)}
                      </span>
                    </button>
                  ))}
                </div>
              </div>
            </div>

            {/* CTAs */}
            <div className="mt-6 pt-4 border-t border-stone-200/80 flex flex-col gap-2">
              <Link
                href={`/penginapan/${activeVilla.id}`}
                className="inline-flex min-h-[44px] w-full items-center justify-center gap-2 rounded-xl bg-forest px-4 text-xs font-semibold text-white shadow-xs hover:bg-forest-light active:scale-[0.98] transition-all"
              >
                <span>Cek Detail &amp; Kalender Kamar Ini</span>
                <ArrowRight className="h-3.5 w-3.5" />
              </Link>
              <Link
                href="/penginapan"
                className="text-center text-xs font-medium text-stone-600 hover:text-forest transition-colors py-1"
              >
                Lihat Seluruh Katalog Penginapan Dieng →
              </Link>
            </div>
          </div>
        </div>

        {/* MOBILE ART-DIRECTED VERTICAL RECOMPOSITION (md:hidden) */}
        <div className="md:hidden flex flex-col space-y-4">
          {/* 1. Large Photography Banner */}
          <div className="relative aspect-16/10 w-full overflow-hidden rounded-2xl bg-stone-900 shadow-xs">
            <img
              src={villaCover(activeVilla)}
              alt={activeVilla.nama}
              className="h-full w-full object-cover"
              loading="lazy"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-slate-950/80 via-transparent to-transparent pointer-events-none" />

            {/* Top Badges */}
            <div className="absolute top-3 left-3 flex items-center gap-1.5">
              <span className="rounded-md bg-white/95 px-2 py-0.5 text-[10px] font-bold text-forest shadow-xs">
                {activeVilla.tipe || 'Kabin'}
              </span>
              <span className="inline-flex items-center gap-1 rounded-md bg-stone-950/80 px-2 py-0.5 text-[10px] font-medium text-amber-200 border border-white/10">
                <Flame className="w-3 h-3 text-amber-400" />
                Air Panas 24 Jam
              </span>
            </div>

            {/* Bottom info on photo */}
            <div className="absolute bottom-3 left-3 right-3 text-white flex items-end justify-between">
              <div>
                <p className="text-[10px] text-stone-300">Mulai dari</p>
                <p className="font-display text-lg font-bold text-white leading-tight">
                  {formatRupiah(activeVilla.harga)}
                  <span className="text-[10px] font-normal text-stone-200"> /malam</span>
                </p>
              </div>
              <span className="text-[11px] text-emerald-300 font-medium">
                Kapasitas {activeVilla.kapasitas} Tamu
              </span>
            </div>
          </div>

          {/* 2. Quick Unit Selector Tabs */}
          <div className="flex gap-2 overflow-x-auto pb-1 no-scrollbar -mx-4 px-4">
            {villas.slice(0, 3).map((item, idx) => (
              <button
                key={item.id}
                type="button"
                onClick={() => setSelectedIndex(idx)}
                className={`shrink-0 rounded-xl px-3.5 py-2 text-xs font-semibold transition-all ${
                  selectedIndex === idx
                    ? 'bg-forest text-white shadow-xs'
                    : 'bg-white text-stone-700 border border-stone-200/90'
                }`}
              >
                {item.nama}
              </button>
            ))}
          </div>

          {/* 3. Intimate Property Info Card */}
          <div className="rounded-2xl border border-stone-200/90 bg-white p-5 shadow-xs space-y-3">
            <div>
              <h3 className="font-display text-lg font-bold text-ink">
                {activeVilla.nama}
              </h3>
              <p className="text-xs text-stone-500 flex items-center gap-1 mt-0.5">
                <MapPin className="h-3 w-3 text-forest" />
                <span>{activeVilla.lokasi || 'Dataran Tinggi Dieng'}</span>
              </p>
            </div>

            <p className="text-xs text-stone-600 leading-relaxed line-clamp-2">
              {activeVilla.deskripsi}
            </p>

            <div className="pt-2 flex flex-col gap-2">
              <Link
                href={`/penginapan/${activeVilla.id}`}
                className="inline-flex min-h-[44px] w-full items-center justify-center gap-1.5 rounded-xl bg-forest px-4 text-xs font-bold text-white shadow-xs active:bg-forest-light"
              >
                <span>Cek Detail &amp; Kalender Kamar</span>
                <ArrowRight className="h-3.5 w-3.5" />
              </Link>
              <Link
                href="/penginapan"
                className="text-center text-xs font-medium text-forest hover:underline py-1"
              >
                Lihat Semua Penginapan →
              </Link>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
