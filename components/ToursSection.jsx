"use client";

import Link from 'next/link';
import { ArrowRight, Clock, Users, Compass, Check, MessageCircle, ShieldCheck, Flame } from 'lucide-react';
import { FALLBACK_TOURS, FALLBACK_JEEP } from '@/lib/mockData';
import { formatRupiah } from '@/lib/covers';
import { waLink } from '@/lib/site';

export default function ToursSection() {
  const featuredJeep = FALLBACK_JEEP[1] || FALLBACK_JEEP[0]; // Jeep Medium Savana
  const secondaryTours = FALLBACK_TOURS.slice(0, 2);

  const featuredWa = waLink(
    `Halo Admin Kediengaja,\nSaya ingin booking paket Jeep 4x4:\n\nPaket: ${featuredJeep.nama}\nHarga: ${formatRupiah(featuredJeep.harga)} / mobil\n\nMohon konfirmasi jadwal dan jam penjemputan. Terima kasih.`
  );

  return (
    <section id="paket-wisata" className="scroll-mt-20 border-b border-stone-800 bg-[#0B120F] text-white py-16 sm:py-24">
      <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
        {/* Chapter Header */}
        <div className="flex flex-col sm:flex-row sm:items-end sm:justify-between gap-4 mb-10 sm:mb-12">
          <div className="max-w-2xl">
            <p className="text-xs font-semibold tracking-widest uppercase text-emerald-400">
              03 / Jelajah Alam &amp; Offroad
            </p>
            <h2 className="mt-2 font-display text-3xl font-bold tracking-tight text-white sm:text-4xl lg:text-[42px] leading-[1.15]">
              Menembus Medan Ekstrem Bersama Sopir Asli Dieng
            </h2>
            <p className="mt-3 text-sm sm:text-base text-stone-300 leading-relaxed">
              Kawah belerang, padang savana sunyi, dan lautan awan Sikunir. Armada 4x4 tangguh siap melibas tanjakan terjal yang tak terjangkau kendaraan biasa.
            </p>
          </div>

          <Link
            href="/jeep-dieng"
            className="inline-flex items-center gap-1.5 text-xs sm:text-sm font-semibold text-emerald-400 hover:text-emerald-300 transition-colors shrink-0"
          >
            <span>Semua Rute Jeep &amp; Tur</span>
            <ArrowRight className="h-4 w-4" aria-hidden="true" />
          </Link>
        </div>

        {/* VISUAL HIERARCHY GRID: 1 DOMINANT FEATURED EXPERIENCE + 2 SUPPORTING EXPERIENCES */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-stretch">
          {/* 1. DOMINANT FEATURED JEEP EXPERIENCE (7 cols) */}
          <article className="lg:col-span-7 flex flex-col overflow-hidden rounded-2xl bg-stone-900/90 border border-stone-800 shadow-md">
            {/* Large Photography Banner */}
            <div className="relative aspect-16/10 w-full overflow-hidden bg-slate-950">
              <img
                src={featuredJeep.gambar}
                alt={featuredJeep.nama}
                className="h-full w-full object-cover transition-transform duration-700 hover:scale-105"
                loading="lazy"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-stone-900 via-transparent to-transparent pointer-events-none" />

              <span className="absolute top-4 left-4 rounded-lg bg-emerald-600/90 backdrop-blur-xs px-3 py-1 text-xs font-bold text-white shadow-xs">
                Rute Paling Populer
              </span>

              <div className="absolute bottom-4 left-4 right-4 flex items-end justify-between text-white">
                <div>
                  <span className="text-[10px] text-stone-300 uppercase tracking-wider block">Tarif All-in</span>
                  <p className="font-display text-2xl sm:text-3xl font-bold text-white leading-tight">
                    {formatRupiah(featuredJeep.harga)}
                    <span className="text-xs font-normal text-stone-300"> / armada</span>
                  </p>
                </div>
                <span className="text-xs font-medium text-emerald-300">
                  Maks. 4 Orang
                </span>
              </div>
            </div>

            {/* Featured Details */}
            <div className="flex flex-1 flex-col p-6 sm:p-7 justify-between">
              <div>
                <h3 className="font-display text-xl sm:text-2xl font-bold text-white">
                  {featuredJeep.nama}
                </h3>
                <p className="mt-2 text-xs sm:text-sm text-stone-300 leading-relaxed">
                  {featuredJeep.deskripsi}
                </p>

                {/* Key Points */}
                <div className="mt-4 grid grid-cols-2 gap-3 border-y border-stone-800 py-3 text-xs text-stone-300">
                  <div className="flex items-center gap-2">
                    <Clock className="h-4 w-4 text-emerald-400 shrink-0" />
                    <span>Durasi {featuredJeep.durasi}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <ShieldCheck className="h-4 w-4 text-emerald-400 shrink-0" />
                    <span>Sopir Merangkap Fotografer</span>
                  </div>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="mt-6 pt-2 flex flex-col xs:flex-row items-center gap-3">
                <a
                  href={featuredWa}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex min-h-[46px] w-full xs:w-auto flex-1 items-center justify-center gap-2 rounded-xl bg-forest px-5 text-xs sm:text-sm font-bold text-white shadow-xs hover:bg-forest-light active:scale-[0.98] transition-all"
                >
                  <MessageCircle className="h-4 w-4" />
                  <span>Pesan Jeep via WhatsApp</span>
                </a>
                <Link
                  href={`/jeep-dieng/${featuredJeep.slug}`}
                  className="inline-flex min-h-[46px] w-full xs:w-auto items-center justify-center rounded-xl border border-stone-700 bg-stone-800/80 px-4 text-xs font-semibold text-stone-200 hover:bg-stone-700 transition-all"
                >
                  Detail Rute
                </Link>
              </div>
            </div>
          </article>

          {/* 2. SECONDARY EXPERIENCES (5 cols) */}
          <div className="lg:col-span-5 flex flex-col justify-between gap-5">
            {secondaryTours.map((item) => (
              <article
                key={item.id}
                className="group flex flex-col sm:flex-row lg:flex-col overflow-hidden rounded-2xl bg-stone-900/70 border border-stone-800/80 p-5 gap-4 transition hover:border-emerald-500/40"
              >
                <div className="relative h-44 sm:h-auto sm:w-48 lg:w-full lg:h-40 shrink-0 overflow-hidden rounded-xl bg-slate-950">
                  <img
                    src={item.gambar}
                    alt={item.nama}
                    className="h-full w-full object-cover transition duration-500 group-hover:scale-105"
                    loading="lazy"
                  />
                  <span className="absolute top-2.5 left-2.5 rounded bg-slate-950/80 px-2 py-0.5 text-[10px] font-semibold text-emerald-300">
                    {item.tipe || 'Tur Pilihan'}
                  </span>
                  <div className="absolute bottom-2.5 left-2.5 text-white">
                    <span className="font-display text-base font-bold text-white">
                      {formatRupiah(item.harga)}
                    </span>
                    <span className="text-[10px] text-stone-300"> / pax</span>
                  </div>
                </div>

                <div className="flex flex-1 flex-col justify-between">
                  <div>
                    <h4 className="font-display text-base font-bold text-white group-hover:text-emerald-300 transition-colors">
                      <Link href={`/tours/${item.id}`}>
                        {item.nama}
                      </Link>
                    </h4>
                    <p className="mt-1.5 text-xs text-stone-400 line-clamp-2 leading-relaxed">
                      {item.ringkasan || item.deskripsi}
                    </p>
                  </div>

                  <div className="mt-4 pt-3 border-t border-stone-800/80 flex items-center justify-between">
                    <span className="text-[11px] text-stone-400 flex items-center gap-1">
                      <Clock className="h-3 w-3 text-emerald-400" />
                      {item.durasi}
                    </span>
                    <Link
                      href={`/tours/${item.id}`}
                      className="text-xs font-semibold text-emerald-400 hover:text-emerald-300 inline-flex items-center gap-1"
                    >
                      <span>Lihat Rute</span>
                      <ArrowRight className="h-3 w-3" />
                    </Link>
                  </div>
                </div>
              </article>
            ))}

            {/* Custom Itinerary / Konsultasi Rombongan Callout */}
            <div className="rounded-2xl border border-dashed border-stone-700 bg-stone-900/40 p-5 text-center">
              <p className="text-xs font-semibold text-stone-200">
                Punya rencana atau rombongan khusus?
              </p>
              <p className="mt-1 text-[11px] text-stone-400">
                Konsultasikan jadwal, kombinasi jeep, dan penginapan sesuai jumlah peserta dan budget Anda.
              </p>
              <a
                href={waLink('Halo Kediengaja, saya ingin konsultasi rencana perjalanan rombongan khusus ke Dieng.')}
                target="_blank"
                rel="noopener noreferrer"
                className="mt-3 inline-flex min-h-[38px] items-center gap-1.5 rounded-xl border border-emerald-400/30 bg-emerald-950/40 px-4 text-xs font-semibold text-emerald-300 hover:bg-emerald-900/50 transition"
              >
                <MessageCircle className="h-3.5 w-3.5" />
                <span>Konsultasi Rombongan</span>
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
