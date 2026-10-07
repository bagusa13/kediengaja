"use client";

import { useState } from 'react';
import Link from 'next/link';
import { Calendar, Users, Home, ArrowRight, MessageCircle } from 'lucide-react';
import { FALLBACK_PENGINAPAN } from '@/lib/mockData';
import { formatWaDate, waLink } from '@/lib/site';

export default function QuickAvailabilityCheck() {
  const [selectedVilla, setSelectedVilla] = useState(FALLBACK_PENGINAPAN[0]?.nama || 'Cabin House 1');
  const [checkIn, setCheckIn] = useState('');
  const [checkOut, setCheckOut] = useState('');
  const [guests, setGuests] = useState('2-4 Orang');

  function handleCheck() {
    const text = `Halo Admin Kediengaja, saya ingin cek ketersediaan untuk:\n- Penginapan: ${selectedVilla}\n- Check-in: ${formatWaDate(checkIn) || 'Segera'}\n- Check-out: ${formatWaDate(checkOut) || 'Segera'}\n- Jumlah Tamu: ${guests}\nApakah slot tanggal tersebut masih tersedia?`;
    window.open(waLink(text), '_blank');
  }

  return (
    <section id="cek-ketersediaan" className="scroll-mt-20 border-b border-stone-200/80 bg-white py-16 sm:py-20">
      <div className="mx-auto max-w-5xl px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-2xl mx-auto mb-8">
          <p className="text-xs font-bold tracking-wider uppercase text-brand-green">
            Reservasi Cepat
          </p>
          <h2 className="mt-1 font-display text-2xl font-bold tracking-tight text-brand-ink sm:text-3xl">
            Cek Ketersediaan Penginapan
          </h2>
          <p className="mt-2 text-xs sm:text-sm text-stone-600 leading-relaxed">
            Pilih unit dan perkiraan tanggal liburan Anda untuk memeriksa slot kosong langsung bersama admin.
          </p>
        </div>

        {/* Compact Travel Booking Bar */}
        <div className="rounded-2xl border border-stone-200 bg-brand-cream/40 p-5 sm:p-6 shadow-sm">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {/* 1. Pilih Penginapan */}
            <div>
              <label className="block text-[11px] font-bold uppercase tracking-wider text-stone-600 mb-1.5 flex items-center gap-1.5">
                <Home className="h-3.5 w-3.5 text-brand-green" aria-hidden="true" />
                Pilih Penginapan
              </label>
              <select
                value={selectedVilla}
                onChange={(e) => setSelectedVilla(e.target.value)}
                className="w-full rounded-lg border border-stone-300 bg-white px-3 py-2.5 text-xs sm:text-sm font-medium text-brand-ink focus:border-brand-dark focus:outline-none focus:ring-1 focus:ring-brand-dark"
              >
                {FALLBACK_PENGINAPAN.map((item) => (
                  <option key={item.id} value={item.nama}>
                    {item.nama} ({item.kapasitas} org)
                  </option>
                ))}
              </select>
            </div>

            {/* 2. Check-in */}
            <div>
              <label className="block text-[11px] font-bold uppercase tracking-wider text-stone-600 mb-1.5 flex items-center gap-1.5">
                <Calendar className="h-3.5 w-3.5 text-brand-green" aria-hidden="true" />
                Tanggal Check-in
              </label>
              <input
                type="date"
                value={checkIn}
                onChange={(e) => setCheckIn(e.target.value)}
                className="w-full rounded-lg border border-stone-300 bg-white px-3 py-2 text-xs sm:text-sm font-medium text-brand-ink focus:border-brand-dark focus:outline-none focus:ring-1 focus:ring-brand-dark"
              />
            </div>

            {/* 3. Check-out */}
            <div>
              <label className="block text-[11px] font-bold uppercase tracking-wider text-stone-600 mb-1.5 flex items-center gap-1.5">
                <Calendar className="h-3.5 w-3.5 text-brand-green" aria-hidden="true" />
                Tanggal Check-out
              </label>
              <input
                type="date"
                value={checkOut}
                onChange={(e) => setCheckOut(e.target.value)}
                className="w-full rounded-lg border border-stone-300 bg-white px-3 py-2 text-xs sm:text-sm font-medium text-brand-ink focus:border-brand-dark focus:outline-none focus:ring-1 focus:ring-brand-dark"
              />
            </div>

            {/* 4. Action Button */}
            <div className="flex flex-col justify-end">
              <button
                type="button"
                onClick={handleCheck}
                className="inline-flex min-h-[42px] w-full items-center justify-center gap-2 rounded-lg bg-forest px-4 text-xs font-bold text-white shadow-xs hover:bg-forest-light active:scale-[0.98] transition-all"
              >
                <MessageCircle className="h-4 w-4 text-brand-orange" aria-hidden="true" />
                <span>Cek Ketersediaan</span>
              </button>
            </div>
          </div>

          <div className="mt-4 pt-3 border-t border-stone-200/80 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2 text-xs text-stone-500">
            <span>
              Butuh kalender 6 bulan interaktif?
            </span>
            <Link
              href="/availability"
              className="inline-flex items-center gap-1 font-bold text-brand-dark hover:text-brand-green transition-colors"
            >
              <span>Buka Kalender Jadwal Lengkap</span>
              <ArrowRight className="h-3.5 w-3.5" aria-hidden="true" />
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}
