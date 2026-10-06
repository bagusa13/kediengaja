"use client";

import { useEffect, useMemo, useState } from 'react';
import { Calendar as CalendarIcon, ChevronLeft, ChevronRight, CheckCircle2, XCircle, Info, MessageCircle } from 'lucide-react';
import { FALLBACK_PENGINAPAN } from '@/lib/mockData';
import { fetchCollection, orFallback } from '@/lib/listings';
import { formatWaDate, waLink } from '@/lib/site';

function toIso(year, month, day) {
  const m = String(month + 1).padStart(2, '0');
  const d = String(day).padStart(2, '0');
  return `${year}-${m}-${d}`;
}

export default function AvailabilityCalendar() {
  const [villas, setVillas] = useState(FALLBACK_PENGINAPAN);
  const [selectedVillaId, setSelectedVillaId] = useState(FALLBACK_PENGINAPAN[0]?.id || '');
  const [viewDate, setViewDate] = useState(() => new Date());
  const [checkIn, setCheckIn] = useState('');
  const [checkOut, setCheckOut] = useState('');
  const [guestCount, setGuestCount] = useState(2);
  const [errorMsg, setErrorMsg] = useState('');

  // Fetch real-time from Firestore if available
  useEffect(() => {
    async function load() {
      try {
        const data = await fetchCollection('penginapan');
        if (data && data.length > 0) {
          setVillas(orFallback(data, FALLBACK_PENGINAPAN));
        }
      } catch (err) {
        console.warn('Calendar Firestore fallback:', err);
      }
    }
    load();
  }, []);

  const selectedVilla = useMemo(() => {
    return villas.find((v) => v.id === selectedVillaId) || villas[0] || {};
  }, [villas, selectedVillaId]);

  const bookedDatesSet = useMemo(() => {
    const list = selectedVilla?.bookedDates || [];
    return new Set(list);
  }, [selectedVilla]);

  const todayIso = useMemo(() => {
    const now = new Date();
    return toIso(now.getFullYear(), now.getMonth(), now.getDate());
  }, []);

  // Limit kalender: Maksimal 6 bulan ke depan dari hari ini
  const maxIso = useMemo(() => {
    const now = new Date();
    const maxD = new Date(now.getFullYear(), now.getMonth() + 6, now.getDate());
    return toIso(maxD.getFullYear(), maxD.getMonth(), maxD.getDate());
  }, []);

  const currentYear = viewDate.getFullYear();
  const currentMonth = viewDate.getMonth();

  const monthNames = [
    'Januari', 'Februari', 'Maret', 'April', 'Mei', 'Juni',
    'Juli', 'Agustus', 'September', 'Oktober', 'November', 'Desember'
  ];

  const daysInMonth = new Date(currentYear, currentMonth + 1, 0).getDate();
  const firstDayIndex = new Date(currentYear, currentMonth, 1).getDay(); // 0 is Sunday

  // Batasan navigasi maksimal 6 bulan ke depan
  const now = new Date();
  const canGoPrev = !(currentYear === now.getFullYear() && currentMonth <= now.getMonth());
  const monthDiff = (currentYear - now.getFullYear()) * 12 + (currentMonth - now.getMonth());
  const canGoNext = monthDiff < 5; // Bulan sekarang + 5 bulan ke depan = rentang 6 bulan

  function handlePrevMonth() {
    if (!canGoPrev) return;
    setViewDate(new Date(currentYear, currentMonth - 1, 1));
  }

  function handleNextMonth() {
    if (!canGoNext) return;
    setViewDate(new Date(currentYear, currentMonth + 1, 1));
  }

  function handleDateClick(isoString) {
    if (isoString < todayIso) return;
    if (isoString > maxIso) {
      setErrorMsg('Pemesanan jadwal dibatasi maksimal 6 bulan ke depan.');
      return;
    }
    if (bookedDatesSet.has(isoString)) {
      setErrorMsg(`Tanggal ${formatWaDate(isoString)} sudah terbooking oleh tamu lain.`);
      return;
    }
    setErrorMsg('');

    if (!checkIn || (checkIn && checkOut)) {
      setCheckIn(isoString);
      setCheckOut('');
    } else if (checkIn && !checkOut) {
      if (isoString <= checkIn) {
        // Reset checkIn to newly selected earlier date
        setCheckIn(isoString);
      } else {
        // Check if any date in between is booked
        let hasBookedInRange = false;
        const cur = new Date(`${checkIn}T00:00:00`);
        const end = new Date(`${isoString}T00:00:00`);
        while (cur < end) {
          const checkStr = toIso(cur.getFullYear(), cur.getMonth(), cur.getDate());
          if (bookedDatesSet.has(checkStr)) {
            hasBookedInRange = true;
            break;
          }
          cur.setDate(cur.getDate() + 1);
        }
        if (hasBookedInRange) {
          setErrorMsg('Terdapat tanggal yang sudah terisi di antara rentang pilihan Anda.');
          return;
        }
        setCheckOut(isoString);
      }
    }
  }

  const isBooked = (iso) => bookedDatesSet.has(iso);
  const isPast = (iso) => iso < todayIso;
  const isTooFar = (iso) => iso > maxIso;

  const getDayStatusClass = (iso) => {
    if (isPast(iso) || isTooFar(iso)) {
      return 'bg-stone-100 text-stone-300 cursor-not-allowed';
    }
    if (isBooked(iso)) {
      return 'bg-red-50 text-red-500 font-medium cursor-not-allowed border border-red-200';
    }
    if (iso === checkIn || iso === checkOut) {
      return 'bg-moss text-white font-bold shadow-sm';
    }
    if (checkIn && checkOut && iso > checkIn && iso < checkOut) {
      return 'bg-moss/15 text-moss font-semibold';
    }
    return 'bg-white text-ink hover:bg-stone-100 border border-stone-200';
  };

  const bookingWaUrl = useMemo(() => {
    if (!checkIn) return '';
    const outStr = checkOut || checkIn;
    const msg = `Halo Admin Kediengaja,\nSaya ingin booking unit penginapan setelah mengecek kalender ketersediaan di website:\n\nUnit: ${selectedVilla.nama || 'Penginapan Dieng'}\nCheck-in: ${formatWaDate(checkIn)}\nCheck-out: ${formatWaDate(outStr)}\nJumlah tamu: ${guestCount} orang\n\nMohon konfirmasi ketersediaan dan rincian pembayaran rekeningnya. Terima kasih.`;
    return waLink(msg);
  }, [checkIn, checkOut, selectedVilla, guestCount]);

  return (
    <div className="rounded-xl border border-stone-200/80 bg-white p-5 sm:p-7 shadow-xs">
      <div className="flex flex-col gap-4 border-b border-stone-200/80 pb-5 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <p className="text-xs font-bold tracking-wider uppercase text-forest">
            Jadwal &amp; Ketersediaan
          </p>
          <h3 className="mt-1.5 font-display text-2xl font-bold tracking-tight text-ink sm:text-3xl">
            Cek Tanggal Menginap
          </h3>
          <p className="mt-1 text-xs sm:text-sm text-stone-600">
            Pilih unit di bawah untuk mengecek tanggal yang tersedia dalam 6 bulan ke depan.
          </p>
        </div>

        <div className="w-full sm:w-72">
          <label htmlFor="villa-select" className="mb-1 block text-xs font-medium text-stone-600">
            Pilih Unit Penginapan:
          </label>
          <select
            id="villa-select"
            value={selectedVillaId}
            onChange={(e) => {
              setSelectedVillaId(e.target.value);
              setCheckIn('');
              setCheckOut('');
              setErrorMsg('');
            }}
            className="field font-medium text-ink"
          >
            {villas.map((v) => (
              <option key={v.id} value={v.id}>
                {v.nama} ({v.tipe || 'Unit'})
              </option>
            ))}
          </select>
        </div>
      </div>

      <div className="mt-6 grid gap-8 lg:grid-cols-12">
        {/* Kolom Kalender */}
        <div className="lg:col-span-7">
          <div className="mb-4 flex items-center justify-between">
            <h4 className="font-display text-lg font-bold text-ink">
              {monthNames[currentMonth]} {currentYear}
            </h4>
            <div className="flex items-center gap-1">
              <button
                type="button"
                onClick={handlePrevMonth}
                disabled={!canGoPrev}
                className={`flex h-9 w-9 items-center justify-center rounded-md border border-stone-200 transition-colors ${
                  canGoPrev ? 'text-stone-600 hover:bg-stone-50 cursor-pointer' : 'text-stone-300 cursor-not-allowed opacity-40'
                }`}
                aria-label="Bulan sebelumnya"
              >
                <ChevronLeft className="h-4 w-4" />
              </button>
              <button
                type="button"
                onClick={handleNextMonth}
                disabled={!canGoNext}
                className={`flex h-9 w-9 items-center justify-center rounded-md border border-stone-200 transition-colors ${
                  canGoNext ? 'text-stone-600 hover:bg-stone-50 cursor-pointer' : 'text-stone-300 cursor-not-allowed opacity-40'
                }`}
                aria-label="Bulan berikutnya"
                title={canGoNext ? 'Bulan berikutnya' : 'Batas maksimal 6 bulan ke depan'}
              >
                <ChevronRight className="h-4 w-4" />
              </button>
            </div>
          </div>

          {/* Legend */}
          <div className="mb-4 flex flex-wrap items-center gap-4 text-xs">
            <div className="flex items-center gap-1.5">
              <span className="h-3 w-3 rounded-sm bg-white border border-stone-300" />
              <span className="text-stone-600">Tersedia (Kosong)</span>
            </div>
            <div className="flex items-center gap-1.5">
              <span className="h-3 w-3 rounded-sm bg-red-100 border border-red-300" />
              <span className="text-red-600 font-medium">Terbooking (Penuh)</span>
            </div>
            <div className="flex items-center gap-1.5">
              <span className="h-3 w-3 rounded-sm bg-moss" />
              <span className="text-moss font-semibold">Pilihan Anda</span>
            </div>
          </div>

          {/* Grid Kalender */}
          <div className="grid grid-cols-7 gap-1.5 text-center text-xs">
            {['Min', 'Sen', 'Sel', 'Rab', 'Kam', 'Jum', 'Sab'].map((d) => (
              <div key={d} className="py-1 font-semibold text-stone-400">
                {d}
              </div>
            ))}

            {Array.from({ length: firstDayIndex }).map((_, i) => (
              <div key={`empty-${i}`} className="h-10" />
            ))}

            {Array.from({ length: daysInMonth }).map((_, i) => {
              const day = i + 1;
              const iso = toIso(currentYear, currentMonth, day);
              const booked = isBooked(iso);
              const past = isPast(iso);
              const tooFar = isTooFar(iso);

              return (
                <button
                  key={iso}
                  type="button"
                  disabled={past || booked || tooFar}
                  onClick={() => handleDateClick(iso)}
                  className={`h-11 rounded-md transition flex flex-col items-center justify-center text-xs ${getDayStatusClass(
                    iso
                  )}`}
                  title={
                    past
                      ? 'Tanggal lampau'
                      : tooFar
                      ? 'Maksimal 6 bulan ke depan'
                      : booked
                      ? 'Sudah terbooking tamu lain'
                      : 'Tersedia - klik untuk memilih'
                  }
                >
                  <span className="text-[13px]">{day}</span>
                  {booked ? (
                    <span className="text-[9px] uppercase tracking-tighter text-red-600 leading-none">Penuh</span>
                  ) : !past && !tooFar ? (
                    <span className="h-1 w-1 rounded-full bg-emerald-500 mt-0.5" />
                  ) : null}
                </button>
              );
            })}
          </div>

          {errorMsg ? (
            <div className="mt-4 flex items-center gap-2 rounded-md bg-red-50 p-3 text-xs text-red-700">
              <XCircle className="h-4 w-4 shrink-0" />
              <span>{errorMsg}</span>
            </div>
          ) : null}
        </div>

        {/* Kolom Status & Action Booking WA */}
        <div className="flex flex-col justify-between rounded-xl border border-stone-200 bg-surface p-5 lg:col-span-5">
          <div>
            <h5 className="font-display text-lg font-bold text-ink">Pilihan Jadwal Anda</h5>
            <p className="mt-1 text-xs text-stone-600">
              Klik tanggal pada kalender untuk menentukan jadwal check-in &amp; check-out.
            </p>

            <div className="mt-4 space-y-3 rounded-xl bg-white p-4 border border-stone-200 text-sm shadow-soft">
              <div className="flex justify-between items-center pb-2 border-b border-stone-100">
                <span className="text-stone-500 text-xs">Penginapan:</span>
                <span className="font-bold text-ink text-right">{selectedVilla.nama}</span>
              </div>
              <div className="flex justify-between items-center pb-2 border-b border-stone-100">
                <span className="text-stone-500 text-xs">Check-in:</span>
                <span className="font-bold text-moss">
                  {checkIn ? formatWaDate(checkIn) : 'Belum dipilih'}
                </span>
              </div>
              <div className="flex justify-between items-center pb-2 border-b border-stone-100">
                <span className="text-stone-500 text-xs">Check-out:</span>
                <span className="font-bold text-moss">
                  {checkOut ? formatWaDate(checkOut) : checkIn ? `${formatWaDate(checkIn)} (1 malam)` : 'Belum dipilih'}
                </span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-stone-500 text-xs">Jumlah Tamu:</span>
                <div className="flex items-center gap-2">
                  <input
                    type="number"
                    min="1"
                    max={selectedVilla.kapasitas || 20}
                    value={guestCount}
                    onChange={(e) => setGuestCount(Number(e.target.value) || 1)}
                    className="w-16 h-8 text-center border border-stone-300 rounded-lg text-xs font-semibold"
                  />
                  <span className="text-xs text-stone-600">Orang</span>
                </div>
              </div>
            </div>

            <div className="mt-4 flex items-start gap-2 text-xs text-stone-600">
              <Info className="h-4 w-4 shrink-0 text-moss mt-0.5" />
              <p>
                Admin akan memastikan kamar kosong dan memandu transfer DP lewat WhatsApp.
              </p>
            </div>
          </div>

          <div className="mt-6">
            {checkIn ? (
              <a
                href={bookingWaUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="flex min-h-[46px] w-full items-center justify-center gap-2 rounded-xl bg-wa px-4 py-3 text-sm font-bold text-white shadow hover:bg-[#15803d] active:scale-[0.98] transition-all"
              >
                <MessageCircle className="h-4 w-4" aria-hidden="true" />
                Pesan Tanggal Ini via WhatsApp
              </a>
            ) : (
              <div className="text-center p-3 rounded-xl border border-dashed border-stone-300 text-xs text-stone-500 bg-white">
                Silakan pilih tanggal di kalender terlebih dahulu
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
