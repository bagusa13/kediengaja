"use client";

import Link from 'next/link';
import { ArrowRight, ArrowUpRight, MessageCircle, Clock, ShieldCheck, Compass } from 'lucide-react';
import { formatRupiah } from '@/lib/covers';
import { waLink } from '@/lib/site';

const featuredTour = {
  slug: 'open-trip-sunrise-sikunir',
  title: 'Paket Golden Sunrise Sikunir',
  elevation: '2.263 mdpl',
  category: 'Open Trip & Privat',
  timing: '03.00 – 09.00 WIB',
  harga: 175000,
  unit: '/ orang',
  description:
    'Menyaksikan momen terbitnya matahari emas berbalut lautan awan dari puncak tertinggi Desa Sembungan. Didampingi pemandu lokal asli Dieng, sudah termasuk tiket masuk dan transportasi lokal.',
  image: '/images/destinasi/bukit-sikunir.webp',
};

const secondaryTours = [
  {
    slug: 'fun-jeep-kawah-savana',
    title: 'Fun Jeep Wisata Kawah & Savana',
    elevation: '2.050 mdpl',
    category: 'Jeep 4x4 Offroad',
    harga: 450000,
    unit: '/ armada (maks. 4 org)',
    description: 'Menjelajah kawah vulkanik aktif Sikidang, jembatan kayu estetik, dan padang savana Pangonan bersama armada 4x4 & driver pemandu.',
    image: '/images/destinasi/kawah-sikidang.webp',
  },
  {
    slug: 'private-trip-dieng-2d1n',
    title: 'Private Trip Dieng 2D1N All-In',
    elevation: '2.000 mdpl',
    category: 'Paket Keluarga 2D1N',
    harga: 650000,
    unit: '/ orang (all-in)',
    description: 'Liburan santai tanpa ribet lengkap dengan penginapan, mobil privat antar-jemput stasiun/bandara, keliling Telaga Warna, dan kuliner khas.',
    image: '/images/destinasi/telaga-warna.webp',
  },
  {
    slug: '',
    href: '/tours',
    title: 'Wisata Candi Arjuna & Budaya',
    elevation: '2.093 mdpl',
    category: 'Heritage & Alam',
    harga: null,
    unit: 'Guide & Tiket Masuk',
    description: 'Gugusan candi Hindu tertua abad ke-7 di tengah lembah berkabut, titik utama fenomena embun upas dan sejarah tanah para dewa.',
    image: '/images/destinasi/candi-arjuna.webp',
  },
];

export default function ToursSection() {
  const sikunirWa = waLink(
    'Halo Admin Kediengaja,\nSaya ingin booking Paket Golden Sunrise Sikunir (Rp 175.000/orang).\nMohon info ketersediaan slot tanggal perjalanan. Terima kasih.'
  );

  return (
    <section id="paket-wisata" className="scroll-mt-20 border-b border-stone-200/90 bg-[#FAF9F6] py-16 sm:py-24">
      <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
        {/* Chapter Heading */}
        <div className="flex flex-col sm:flex-row sm:items-end sm:justify-between gap-4 mb-10 sm:mb-12">
          <div>
            <p className="text-xs font-semibold tracking-widest uppercase text-forest/90">
              03 / Paket Wisata Pilihan
            </p>
            <h2 className="mt-2 font-display text-3xl font-bold tracking-tight text-ink sm:text-4xl lg:text-[42px] leading-[1.15]">
              Pilihan Paket Wisata &amp; Rute Ikonik
            </h2>
            <p className="mt-3 max-w-xl text-sm sm:text-base text-stone-600 leading-relaxed">
              Jelajahi lanskap terbaik Dieng dalam paket terpadu—dari golden sunrise Sikunir, petualangan jeep kawah, hingga private trip keluarga bersama pemandu lokal.
            </p>
          </div>

          <Link
            href="/tours"
            className="inline-flex items-center gap-1.5 text-xs sm:text-sm font-semibold text-forest hover:text-forest-light transition-colors shrink-0"
          >
            <span>Semua Paket Wisata</span>
            <ArrowRight className="h-4 w-4" aria-hidden="true" />
          </Link>
        </div>

        {/* DESKTOP EDITORIAL LAYOUT (lg:grid) */}
        <div className="hidden lg:grid lg:grid-cols-12 gap-6 items-stretch">
          {/* 1. Large Featured Card: Paket Golden Sunrise Sikunir */}
          <div className="group relative lg:col-span-7 flex flex-col justify-between overflow-hidden rounded-xl bg-slate-950 min-h-[420px] p-6 sm:p-8 text-white shadow-xs">
            <img
              src={featuredTour.image}
              alt={featuredTour.title}
              className="absolute inset-0 h-full w-full object-cover opacity-75 transition-transform duration-700 group-hover:scale-105"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/45 to-transparent pointer-events-none" />

            {/* Top Badges */}
            <div className="relative z-10 flex flex-wrap items-center gap-2">
              <span className="rounded-lg bg-white/20 backdrop-blur-xs px-2.5 py-1 text-[11px] font-semibold uppercase tracking-wider text-white">
                {featuredTour.category}
              </span>
              <span className="rounded-lg bg-emerald-600/90 px-2.5 py-1 text-[11px] font-semibold text-white">
                {featuredTour.elevation}
              </span>
              <span className="text-xs text-stone-300 ml-auto">
                Waktu: {featuredTour.timing}
              </span>
            </div>

            {/* Bottom Content & CTAs */}
            <div className="relative z-10 mt-16">
              <div className="flex items-baseline justify-between gap-4 mb-1">
                <Link
                  href={`/tours/${featuredTour.slug}`}
                  className="font-display text-2xl sm:text-3xl font-bold text-white hover:text-emerald-300 transition-colors"
                >
                  {featuredTour.title}
                </Link>
              </div>

              <p className="font-display text-xl sm:text-2xl font-bold text-emerald-400 mt-1">
                {formatRupiah(featuredTour.harga)}
                <span className="text-xs font-normal text-stone-300"> {featuredTour.unit}</span>
              </p>

              <p className="mt-2 text-xs sm:text-sm text-stone-200 leading-relaxed max-w-xl">
                {featuredTour.description}
              </p>

              <div className="mt-5 pt-4 border-t border-white/15 flex items-center gap-3">
                <Link
                  href={`/tours/${featuredTour.slug}`}
                  className="inline-flex min-h-[38px] items-center gap-1.5 rounded-xl bg-white px-4 text-xs font-semibold text-ink hover:bg-stone-100 transition shadow-xs"
                >
                  <span>Detail Paket</span>
                  <ArrowRight className="h-3.5 w-3.5" />
                </Link>
                <a
                  href={sikunirWa}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex min-h-[38px] items-center gap-1.5 rounded-xl bg-forest px-4 text-xs font-semibold text-white hover:bg-forest-light transition shadow-xs border border-emerald-500/30"
                >
                  <MessageCircle className="h-3.5 w-3.5 text-emerald-300" />
                  <span>Booking via WhatsApp</span>
                </a>
              </div>
            </div>
          </div>

          {/* 2. Secondary Stacked Cards (3 items) */}
          <div className="lg:col-span-5 flex flex-col gap-4 justify-between">
            {secondaryTours.map((item) => {
              const href = item.href || `/tours/${item.slug}`;
              return (
                <Link
                  key={item.title}
                  href={href}
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
                    <div className="flex items-center justify-between">
                      <span className="text-[10px] font-bold uppercase tracking-wider text-forest">
                        {item.category}
                      </span>
                    </div>
                    <h4 className="font-display text-sm sm:text-base font-bold text-ink group-hover:text-forest transition-colors mt-0.5">
                      {item.title}
                    </h4>
                    {item.harga ? (
                      <p className="text-xs font-bold text-forest mt-0.5">
                        {formatRupiah(item.harga)}
                        <span className="text-[10px] font-normal text-stone-500"> {item.unit}</span>
                      </p>
                    ) : (
                      <p className="text-xs font-medium text-stone-500 mt-0.5">{item.unit}</p>
                    )}
                    <p className="mt-1 text-xs text-stone-600 line-clamp-2 leading-relaxed">
                      {item.description}
                    </p>
                  </div>
                </Link>
              );
            })}
          </div>
        </div>

        {/* MOBILE EDITORIAL TOURS COMPOSITION (lg:hidden) */}
        <div className="lg:hidden flex flex-col space-y-4">
          {/* Featured Spotlight: Sikunir */}
          <div className="group relative flex flex-col justify-end overflow-hidden rounded-2xl bg-slate-950 min-h-[320px] p-5 text-white shadow-xs">
            <img
              src={featuredTour.image}
              alt={featuredTour.title}
              className="absolute inset-0 h-full w-full object-cover opacity-75"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/50 to-transparent pointer-events-none" />

            <div className="relative z-10">
              <div className="flex items-center gap-2 mb-2">
                <span className="rounded-md bg-white/20 backdrop-blur-xs px-2 py-0.5 text-[10px] font-semibold uppercase tracking-wider text-white">
                  {featuredTour.category}
                </span>
                <span className="rounded-md bg-emerald-600/80 px-2 py-0.5 text-[10px] font-semibold text-white">
                  {featuredTour.elevation}
                </span>
              </div>

              <h3 className="font-display text-xl font-bold text-white">
                {featuredTour.title}
              </h3>
              <p className="text-base font-bold text-emerald-400 mt-0.5">
                {formatRupiah(featuredTour.harga)}
                <span className="text-xs font-normal text-stone-300"> {featuredTour.unit}</span>
              </p>

              <p className="mt-1.5 text-xs text-stone-200 line-clamp-2 leading-relaxed">
                {featuredTour.description}
              </p>

              <div className="mt-4 pt-3 border-t border-white/15 grid grid-cols-2 gap-2">
                <Link
                  href={`/tours/${featuredTour.slug}`}
                  className="inline-flex min-h-[38px] items-center justify-center gap-1 rounded-xl bg-white px-3 text-xs font-semibold text-ink active:bg-stone-100 transition"
                >
                  <span>Detail Paket</span>
                  <ArrowRight className="h-3 w-3" />
                </Link>
                <a
                  href={sikunirWa}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex min-h-[38px] items-center justify-center gap-1.5 rounded-xl bg-forest px-3 text-xs font-semibold text-white active:bg-forest-light transition border border-emerald-500/30"
                >
                  <MessageCircle className="h-3.5 w-3.5 text-emerald-300" />
                  <span>WhatsApp</span>
                </a>
              </div>
            </div>
          </div>

          {/* Secondary Editorial Cards Carousel */}
          <div className="flex overflow-x-auto snap-x snap-mandatory gap-3.5 pb-2 -mx-4 px-4 scrollbar-none">
            {secondaryTours.map((item) => {
              const href = item.href || `/tours/${item.slug}`;
              return (
                <Link
                  key={item.title}
                  href={href}
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
                      {item.harga ? (
                        <p className="text-xs font-bold text-forest mt-0.5">
                          {formatRupiah(item.harga)}
                          <span className="text-[10px] font-normal text-stone-500"> {item.unit}</span>
                        </p>
                      ) : (
                        <p className="text-xs font-medium text-stone-500 mt-0.5">{item.unit}</p>
                      )}
                      <p className="mt-1 text-xs text-stone-600 line-clamp-2 leading-relaxed">
                        {item.description}
                      </p>
                    </div>
                    <div className="mt-3 pt-2 border-t border-stone-100 flex items-center justify-between text-xs font-semibold text-forest">
                      <span>Lihat Rute &amp; Paket</span>
                      <ArrowRight className="h-3.5 w-3.5" />
                    </div>
                  </div>
                </Link>
              );
            })}
          </div>

          <div className="flex items-center justify-between text-xs text-stone-500 px-1">
            <span>← Geser untuk paket lain →</span>
            <Link href="/tours" className="font-semibold text-forest">
              Semua Paket
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}
