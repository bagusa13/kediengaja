"use client";

import { useEffect, useMemo, useState, useRef } from 'react';
import { Calendar as CalendarIcon, ChevronLeft, ChevronRight, CheckCircle2, XCircle, MessageCircle, AlertTriangle, Loader2 } from 'lucide-react';
import { doc, onSnapshot, getDoc, collection, getDocs } from 'firebase/firestore';
import { db } from '@/lib/firebase';
import { FALLBACK_PENGINAPAN } from '@/lib/mockData';
import { formatRupiah } from '@/lib/covers';
import { formatWaDate, waLink } from '@/lib/site';

// Helper to format date in Asia/Jakarta timezone
function getJakartaDate() {
  const d = new Date();
  const utc = d.getTime() + d.getTimezoneOffset() * 60000;
  return new Date(utc + 3600000 * 7); // UTC+7 (WIB)
}

function toIso(year, month, day) {
  const m = String(month + 1).padStart(2, '0');
  const d = String(day).padStart(2, '0');
  return `${year}-${m}-${d}`;
}

export default function AvailabilityCalendar() {
  const [villas, setVillas] = useState(FALLBACK_PENGINAPAN);
  const [selectedVillaId, setSelectedVillaId] = useState(FALLBACK_PENGINAPAN[0]?.id || '');
  const [liveBookedDates, setLiveBookedDates] = useState(FALLBACK_PENGINAPAN[0]?.bookedDates || []);
  const [viewDate, setViewDate] = useState(() => getJakartaDate());
  const [checkIn, setCheckIn] = useState('');
  const [checkOut, setCheckOut] = useState('');
  const [guestCount, setGuestCount] = useState(2);
  const [errorMsg, setErrorMsg] = useState('');
  const [isVerifying, setIsVerifying] = useState(false);
  const [isLiveConnected, setIsLiveConnected] = useState(false);

  // 1. Initial Load of Villas list from Firestore
  useEffect(() => {
    async function loadVillas() {
      try {
        const snap = await getDocs(collection(db, 'penginapan'));
        if (!snap.empty) {
          const list = snap.docs.map((d) => ({ id: d.id, ...d.data() }));
          setVillas(list);
          if (!selectedVillaId && list[0]) {
            setSelectedVillaId(list[0].id);
          }
        }
      } catch (err) {
        // Fallback to initial mock if firestore unavailable
        console.warn('Using offline mock penginapan:', err);
      }
    }
    loadVillas();
  }, [selectedVillaId]);

  // 2. Real-Time Listener (onSnapshot) for the selected unit
  // Updates public UI instantaneously whenever admin saves in admin-app without page reload
  useEffect(() => {
    if (!selectedVillaId) return;

    // Set initial fallback dates from local list
    const currentVilla = villas.find((v) => v.id === selectedVillaId) || villas[0];
    if (currentVilla && currentVilla.bookedDates) {
      setLiveBookedDates(currentVilla.bookedDates);
    }

    let unsubscribe = () => {};
    try {
      const docRef = doc(db, 'penginapan', selectedVillaId);
      unsubscribe = onSnapshot(
        docRef,
        (docSnap) => {
          if (docSnap.exists()) {
            const data = docSnap.data();
            const booked = Array.isArray(data.bookedDates) ? data.bookedDates : [];
            setLiveBookedDates(booked);
            setIsLiveConnected(true);

            // Re-check current user selection if date was just booked in real-time
            if (checkIn) {
              const outIso = checkOut || checkIn;
              const rangeOccupied = getOccupiedNights(checkIn, outIso);
              const conflict = rangeOccupied.some((d) => booked.includes(d));
              if (conflict) {
                setCheckIn('');
                setCheckOut('');
                setErrorMsg('Jadwal ini baru saja terisi oleh tamu lain. Silakan pilih tanggal lain yang masih tersedia.');
              }
            }
          }
        },
        (err) => {
          console.warn('Realtime listener fallback:', err);
          setIsLiveConnected(false);
        }
      );
    } catch {
      setIsLiveConnected(false);
    }

    return () => unsubscribe();
  }, [selectedVillaId, villas, checkIn, checkOut]);

  const selectedVilla = useMemo(() => {
    return villas.find((v) => v.id === selectedVillaId) || villas[0] || {};
  }, [villas, selectedVillaId]);

  const bookedDatesSet = useMemo(() => {
    return new Set(liveBookedDates);
  }, [liveBookedDates]);

  // Current Jakarta Today
  const todayIso = useMemo(() => {
    const now = getJakartaDate();
    return toIso(now.getFullYear(), now.getMonth(), now.getDate());
  }, []);

  // Limit: 6 months ahead
  const maxIso = useMemo(() => {
    const now = getJakartaDate();
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

  // Navigation limits (up to 6 months)
  const now = getJakartaDate();
  const canGoPrev = !(currentYear === now.getFullYear() && currentMonth <= now.getMonth());
  const monthDiff = (currentYear - now.getFullYear()) * 12 + (currentMonth - now.getMonth());
  const canGoNext = monthDiff < 5;

  function handlePrevMonth() {
    if (!canGoPrev) return;
    setViewDate(new Date(currentYear, currentMonth - 1, 1));
  }

  function handleNextMonth() {
    if (!canGoNext) return;
    setViewDate(new Date(currentYear, currentMonth + 1, 1));
  }

  // Calculate occupied nights in [checkIn, checkOut)
  function getOccupiedNights(inIso, outIso) {
    if (!inIso) return [];
    if (!outIso || outIso === inIso) return [inIso];
    const nights = [];
    const cur = new Date(`${inIso}T00:00:00`);
    const end = new Date(`${outIso}T00:00:00`);
    while (cur < end) {
      nights.push(toIso(cur.getFullYear(), cur.getMonth(), cur.getDate()));
      cur.setDate(cur.getDate() + 1);
    }
    return nights;
  }

  // Handle clicking a date on the calendar
  function handleDateClick(isoString) {
    if (isoString < todayIso) return;
    if (isoString > maxIso) {
      setErrorMsg('Pemesanan jadwal dibuka maksimal 6 bulan ke depan.');
      return;
    }
    if (bookedDatesSet.has(isoString)) {
      setErrorMsg(`Tanggal ${formatWaDate(isoString)} sudah terbooking oleh tamu lain.`);
      return;
    }
    setErrorMsg('');

    if (!checkIn || (checkIn && checkOut)) {
      // First click: select checkIn
      setCheckIn(isoString);
      setCheckOut('');
    } else if (checkIn && !checkOut) {
      // Second click: select checkOut
      if (isoString <= checkIn) {
        // Selected date is before or same as checkIn -> make it new checkIn
        setCheckIn(isoString);
      } else {
        // Check if any occupied night in [checkIn, checkOut) is booked
        const occupied = getOccupiedNights(checkIn, isoString);
        const hasBooked = occupied.some((d) => bookedDatesSet.has(d));
        if (hasBooked) {
          setErrorMsg('Terdapat malam yang sudah terbooking di antara rentang tanggal pilihan Anda.');
          return;
        }
        setCheckOut(isoString);
      }
    }
  }

  const isBooked = (iso) => bookedDatesSet.has(iso);
  const isPast = (iso) => iso < todayIso;
  const isTooFar = (iso) => iso > maxIso;

  // Nights count and price estimation
  const totalNights = useMemo(() => {
    if (!checkIn) return 0;
    if (!checkOut || checkOut === checkIn) return 1;
    const diff = new Date(`${checkOut}T00:00:00`) - new Date(`${checkIn}T00:00:00`);
    return Math.max(1, Math.round(diff / (1000 * 60 * 60 * 24)));
  }, [checkIn, checkOut]);

  const estimatedTotal = useMemo(() => {
    const pricePerNight = Number(selectedVilla.harga || 0);
    return pricePerNight * (totalNights || 1);
  }, [selectedVilla, totalNights]);

  // Anti double-booking validation on CTA click
  async function handleConfirmBooking() {
    if (!checkIn) {
      setErrorMsg('Silakan pilih tanggal check-in terlebih dahulu pada kalender.');
      return;
    }

    setIsVerifying(true);
    setErrorMsg('');

    const outIso = checkOut || checkIn;
    const occupiedNights = getOccupiedNights(checkIn, outIso);

    try {
      // Re-fetch authoritative Firestore state right before booking
      const freshSnap = await getDoc(doc(db, 'penginapan', selectedVillaId));
      if (freshSnap.exists()) {
        const freshData = freshSnap.data();
        const freshBooked = new Set(freshData.bookedDates || []);

        const conflict = occupiedNights.some((d) => freshBooked.has(d));
        if (conflict) {
          // Reject stale selection
          setLiveBookedDates(freshData.bookedDates || []);
          setCheckIn('');
          setCheckOut('');
          setErrorMsg('Jadwal ini baru saja terisi oleh tamu lain. Silakan pilih tanggal lain yang masih tersedia.');
          setIsVerifying(false);
          return;
        }
      }
    } catch (err) {
      console.warn('Pre-check network warning:', err);
    }

    setIsVerifying(false);

    // Proceed to pre-filled WhatsApp confirmation
    const msg = `Halo Admin Kediengaja,\nSaya ingin booking unit penginapan setelah mengecek kalender ketersediaan di website:\n\nUnit: ${selectedVilla.nama || 'Penginapan Dieng'}\nCheck-in: ${formatWaDate(checkIn)}\nCheck-out: ${formatWaDate(outIso)} (${totalNights} Malam)\nJumlah tamu: ${guestCount} orang\nEstimasi Total: ~${formatRupiah(estimatedTotal)}\n\nMohon konfirmasi ketersediaan dan rincian rekeningnya. Terima kasih.`;
    window.open(waLink(msg), '_blank');
  }

  const getDayStatusClass = (iso) => {
    if (isPast(iso) || isTooFar(iso)) {
      return 'bg-stone-100 text-stone-300 cursor-not-allowed';
    }
    if (isBooked(iso)) {
      return 'bg-red-50/80 text-red-500 font-medium cursor-not-allowed border border-red-200/80';
    }
    if (iso === checkIn || iso === checkOut) {
      return 'bg-forest text-white font-bold shadow-xs';
    }
    if (checkIn && checkOut && iso > checkIn && iso < checkOut) {
      return 'bg-forest/15 text-forest font-semibold';
    }
    return 'bg-white text-ink hover:bg-stone-50 border border-stone-200';
  };

  return (
    <div className="rounded-2xl border border-stone-200/90 bg-white p-5 sm:p-7 shadow-xs">
      {/* Header bar: Unit picker + Live indicator */}
      <div className="flex flex-col gap-4 border-b border-stone-100 pb-5 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <div className="flex items-center gap-2">
            <p className="text-xs font-bold tracking-wider uppercase text-forest">
              Jadwal &amp; Ketersediaan Unit
            </p>
            {isLiveConnected && (
              <span className="inline-flex items-center gap-1 rounded-full bg-emerald-100 px-2 py-0.5 text-[10px] font-bold text-forest">
                <span className="h-1.5 w-1.5 rounded-full bg-emerald-600 animate-pulse" />
                Live Sync
              </span>
            )}
          </div>
          <h3 className="mt-1 font-display text-2xl font-bold tracking-tight text-ink sm:text-3xl">
            Cek Tanggal Menginap
          </h3>
          <p className="mt-1 text-xs sm:text-sm text-stone-600">
            Pilih unit untuk melihat tanggal yang masih tersedia dalam 6 bulan ke depan.
          </p>
        </div>

        <div className="w-full sm:w-72">
          <label htmlFor="villa-select" className="mb-1 block text-xs font-semibold text-stone-700">
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
            className="field font-medium text-ink bg-stone-50/50"
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
                className={`flex h-9 w-9 items-center justify-center rounded-lg border border-stone-200 transition-colors ${
                  canGoPrev ? 'text-stone-700 hover:bg-stone-50 cursor-pointer' : 'text-stone-300 cursor-not-allowed opacity-40'
                }`}
                aria-label="Bulan sebelumnya"
              >
                <ChevronLeft className="h-4 w-4" />
              </button>
              <button
                type="button"
                onClick={handleNextMonth}
                disabled={!canGoNext}
                className={`flex h-9 w-9 items-center justify-center rounded-lg border border-stone-200 transition-colors ${
                  canGoNext ? 'text-stone-700 hover:bg-stone-50 cursor-pointer' : 'text-stone-300 cursor-not-allowed opacity-40'
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
              <span className="text-stone-600">Tersedia</span>
            </div>
            <div className="flex items-center gap-1.5">
              <span className="h-3 w-3 rounded-sm bg-red-100 border border-red-300" />
              <span className="text-red-600 font-medium">Terbooking</span>
            </div>
            <div className="flex items-center gap-1.5">
              <span className="h-3 w-3 rounded-sm bg-forest" />
              <span className="text-forest font-semibold">Pilihan Anda</span>
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
                  className={`h-11 rounded-lg transition flex flex-col items-center justify-center text-xs ${getDayStatusClass(
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
            <div className="mt-4 flex items-center gap-2 rounded-xl bg-red-50 p-3 text-xs text-red-700 border border-red-200">
              <AlertTriangle className="h-4 w-4 shrink-0 text-red-600" />
              <span>{errorMsg}</span>
            </div>
          ) : null}
        </div>

        {/* Kolom Summary & Booking Action */}
        <div className="lg:col-span-5 flex flex-col justify-between rounded-xl border border-stone-200/90 bg-stone-50/60 p-5 sm:p-6">
          <div>
            <span className="text-[10px] font-bold uppercase tracking-wider text-forest block">
              Ringkasan Pilihan
            </span>
            <h4 className="font-display text-lg font-bold text-ink mt-0.5">
              {selectedVilla.nama}
            </h4>
            <p className="text-xs text-stone-500 mt-0.5">
              {selectedVilla.lokasi || 'Dataran Tinggi Dieng'}
            </p>

            <div className="mt-4 space-y-3 border-y border-stone-200/80 py-4 text-xs">
              <div className="flex justify-between">
                <span className="text-stone-500">Check-in:</span>
                <span className="font-bold text-ink">
                  {checkIn ? formatWaDate(checkIn) : 'Belum dipilih'}
                </span>
              </div>
              <div className="flex justify-between">
                <span className="text-stone-500">Check-out:</span>
                <span className="font-bold text-ink">
                  {checkOut ? formatWaDate(checkOut) : checkIn ? formatWaDate(checkIn) : 'Belum dipilih'}
                </span>
              </div>
              <div className="flex justify-between">
                <span className="text-stone-500">Durasi Menginap:</span>
                <span className="font-bold text-forest">
                  {totalNights > 0 ? `${totalNights} Malam` : '-'}
                </span>
              </div>
              <div className="flex items-center justify-between pt-1">
                <label htmlFor="guest-select" className="text-stone-500">
                  Jumlah Tamu:
                </label>
                <select
                  id="guest-select"
                  value={guestCount}
                  onChange={(e) => setGuestCount(Number(e.target.value))}
                  className="rounded-md border border-stone-200 bg-white px-2 py-1 text-xs font-bold text-ink"
                >
                  {[2, 4, 6, 8, 10, 12].map((n) => (
                    <option key={n} value={n}>
                      {n} Orang
                    </option>
                  ))}
                </select>
              </div>
            </div>

            {/* Price Preview */}
            <div className="mt-4">
              <div className="flex items-baseline justify-between">
                <span className="text-xs text-stone-500">Estimasi Total Biaya:</span>
                <span className="font-display text-2xl font-extrabold text-forest">
                  {formatRupiah(estimatedTotal)}
                </span>
              </div>
              <p className="text-[10px] text-stone-400 mt-1">
                *Tarif resmi per malam. Bebas biaya tersembunyi, konfirmasi DP langsung melalui WhatsApp resmi.
              </p>
            </div>
          </div>

          <div className="mt-6 pt-4 border-t border-stone-200/80">
            <button
              type="button"
              disabled={isVerifying || !checkIn}
              onClick={handleConfirmBooking}
              className={`flex min-h-[46px] w-full items-center justify-center gap-2 rounded-xl px-4 text-xs sm:text-sm font-bold text-white shadow-xs transition ${
                !checkIn
                  ? 'bg-stone-300 cursor-not-allowed text-stone-500'
                  : 'bg-wa hover:bg-[#15803d] active:scale-[0.98] cursor-pointer'
              }`}
            >
              {isVerifying ? (
                <>
                  <Loader2 className="h-4 w-4 animate-spin" />
                  <span>Memeriksa ketersediaan...</span>
                </>
              ) : (
                <>
                  <MessageCircle className="h-4 w-4" />
                  <span>{checkIn ? 'Pesan Tanggal via WhatsApp' : 'Pilih Tanggal Dahulu'}</span>
                </>
              )}
            </button>
            <p className="mt-2 text-center text-[11px] text-stone-500">
              Sistem akan memverifikasi ketersediaan secara real-time sebelum membuka chat.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
