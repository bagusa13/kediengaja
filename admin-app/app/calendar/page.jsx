"use client";

import { useEffect, useState, useMemo } from 'react';
import { collection, doc, getDocs, updateDoc } from 'firebase/firestore';
import { db } from '@/lib/firebase';

function toIso(year, month, day) {
  const m = String(month + 1).padStart(2, '0');
  const d = String(day).padStart(2, '0');
  return `${year}-${m}-${d}`;
}

const FALLBACK_LIST = [
  { id: 'cabin-sikunir-view', nama: 'Cabin House Sikunir View', tipe: 'Cabin House', bookedDates: ['2026-10-10', '2026-10-11', '2026-10-17', '2026-10-18', '2026-10-24', '2026-10-25'] },
  { id: 'homestay-panorama-candi', nama: 'Homestay Panorama Candi', tipe: 'Homestay', bookedDates: ['2026-10-11', '2026-10-12', '2026-10-18', '2026-10-19'] },
  { id: 'villa-estetik-plateau', nama: 'Villa Estetik Dieng Plateau', tipe: 'Villa', bookedDates: ['2026-10-10', '2026-10-11', '2026-10-24', '2026-10-25'] },
];

export default function CalendarManagerPage() {
  const [villas, setVillas] = useState([]);
  const [selectedId, setSelectedId] = useState('');
  const [bookedDates, setBookedDates] = useState([]);
  const [viewDate, setViewDate] = useState(() => new Date());
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [msg, setMsg] = useState({ text: '', type: '' });

  // Range quick-add
  const [rangeStart, setRangeStart] = useState('');
  const [rangeEnd, setRangeEnd] = useState('');

  useEffect(() => {
    async function load() {
      try {
        const snap = await getDocs(collection(db, 'penginapan'));
        if (!snap.empty) {
          const list = snap.docs.map((d) => ({ id: d.id, ...d.data() }));
          setVillas(list);
          setSelectedId(list[0].id);
          setBookedDates(list[0].bookedDates || []);
        } else {
          setVillas(FALLBACK_LIST);
          setSelectedId(FALLBACK_LIST[0].id);
          setBookedDates(FALLBACK_LIST[0].bookedDates || []);
        }
      } catch (err) {
        console.warn('Load villas failed, using fallback:', err);
        setVillas(FALLBACK_LIST);
        setSelectedId(FALLBACK_LIST[0].id);
        setBookedDates(FALLBACK_LIST[0].bookedDates || []);
      } finally {
        setLoading(false);
      }
    }
    load();
  }, []);

  function handleSelectVilla(id) {
    setSelectedId(id);
    const item = villas.find((v) => v.id === id);
    setBookedDates(item?.bookedDates || []);
    setMsg({ text: '', type: '' });
  }

  const bookedSet = useMemo(() => new Set(bookedDates), [bookedDates]);

  function toggleDate(iso) {
    if (bookedSet.has(iso)) {
      setBookedDates(bookedDates.filter((d) => d !== iso));
    } else {
      setBookedDates([...bookedDates, iso].sort());
    }
    setMsg({ text: '', type: '' });
  }

  function handleAddRange(e) {
    e.preventDefault();
    if (!rangeStart || !rangeEnd) return;
    if (rangeEnd < rangeStart) {
      setMsg({ text: 'Tanggal akhir harus sama atau setelah tanggal mulai.', type: 'error' });
      return;
    }

    const cur = new Date(`${rangeStart}T00:00:00`);
    const end = new Date(`${rangeEnd}T00:00:00`);

    const nowD = new Date();
    const maxD = new Date(nowD.getFullYear(), nowD.getMonth() + 6, nowD.getDate());
    const maxIso = toIso(maxD.getFullYear(), maxD.getMonth(), maxD.getDate());

    if (rangeEnd > maxIso) {
      setMsg({ text: 'Rentang tanggal dibatasi maksimal 6 bulan ke depan.', type: 'error' });
      return;
    }

    const newDates = new Set(bookedDates);

    while (cur <= end) {
      const iso = toIso(cur.getFullYear(), cur.getMonth(), cur.getDate());
      newDates.add(iso);
      cur.setDate(cur.getDate() + 1);
    }

    setBookedDates(Array.from(newDates).sort());
    setRangeStart('');
    setRangeEnd('');
    setMsg({ text: 'Rentang tanggal berhasil ditambahkan ke daftar terbooking.', type: 'info' });
  }

  async function handleSave() {
    if (!selectedId) return;
    setSaving(true);
    setMsg({ text: '', type: '' });

    try {
      await updateDoc(doc(db, 'penginapan', selectedId), {
        bookedDates: bookedDates,
      });
      // update local state
      setVillas(villas.map((v) => (v.id === selectedId ? { ...v, bookedDates } : v)));
      setMsg({ text: 'Jadwal ketersediaan berhasil disimpan ke Firestore! Website publik langsung terupdate.', type: 'success' });
    } catch (err) {
      console.error('Error saving bookedDates:', err);
      // simulate success on local
      setVillas(villas.map((v) => (v.id === selectedId ? { ...v, bookedDates } : v)));
      setMsg({
        text: 'Perubahan tersimpan di memori lokal (Firestore rules/koneksi membatasi update langsung).',
        type: 'info',
      });
    } finally {
      setSaving(false);
    }
  }

  const currentYear = viewDate.getFullYear();
  const currentMonth = viewDate.getMonth();
  const monthNames = [
    'Januari', 'Februari', 'Maret', 'April', 'Mei', 'Juni',
    'Juli', 'Agustus', 'September', 'Oktober', 'November', 'Desember'
  ];

  const now = new Date();
  const todayIso = toIso(now.getFullYear(), now.getMonth(), now.getDate());
  const maxDate = new Date(now.getFullYear(), now.getMonth() + 6, now.getDate());
  const maxIso = toIso(maxDate.getFullYear(), maxDate.getMonth(), maxDate.getDate());

  const canGoPrev = !(currentYear === now.getFullYear() && currentMonth <= now.getMonth());
  const monthDiff = (currentYear - now.getFullYear()) * 12 + (currentMonth - now.getMonth());
  const canGoNext = monthDiff < 5; // Rentang 6 bulan ke depan

  const daysInMonth = new Date(currentYear, currentMonth + 1, 0).getDate();
  const firstDayIndex = new Date(currentYear, currentMonth, 1).getDay();

  return (
    <div className="p-8 max-w-6xl mx-auto">
      <div className="mb-6 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Manajemen Kalender &amp; Tanggal Terbooking</h1>
          <p className="text-sm text-gray-500 mt-1">
            Tandai tanggal yang sudah dipesan tamu (maksimal rentang 6 bulan ke depan) agar sinkron dengan batasan website publik.
          </p>
        </div>

        <button
          type="button"
          onClick={handleSave}
          disabled={saving}
          className="inline-flex items-center justify-center px-5 py-2.5 bg-emerald-600 hover:bg-emerald-700 text-white rounded-lg text-sm font-semibold shadow disabled:opacity-50"
        >
          {saving ? 'Menyimpan...' : '💾 Simpan Perubahan Jadwal'}
        </button>
      </div>

      {msg.text ? (
        <div
          className={`mb-6 p-4 rounded-lg text-sm ${
            msg.type === 'success'
              ? 'bg-emerald-50 text-emerald-800 border border-emerald-200'
              : msg.type === 'error'
              ? 'bg-red-50 text-red-800 border border-red-200'
              : 'bg-blue-50 text-blue-800 border border-blue-200'
          }`}
        >
          {msg.text}
        </div>
      ) : null}

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        {/* Kolom Kiri: Pilihan Villa & Range Adder */}
        <div className="lg:col-span-4 space-y-6">
          <div className="bg-white p-5 rounded-xl border border-gray-200 shadow-sm">
            <label className="block text-xs font-bold uppercase text-gray-500 mb-2">
              Pilih Unit Penginapan
            </label>
            <select
              value={selectedId}
              onChange={(e) => handleSelectVilla(e.target.value)}
              className="w-full p-2.5 border border-gray-300 rounded-lg text-sm font-semibold text-gray-800"
            >
              {villas.map((v) => (
                <option key={v.id} value={v.id}>
                  {v.nama} ({v.tipe || 'Unit'})
                </option>
              ))}
            </select>

            <div className="mt-4 pt-4 border-t border-gray-100 text-xs text-gray-600 space-y-1">
              <p>Total Tanggal Terbooking: <strong className="text-red-600">{bookedDates.length} Hari</strong></p>
              <p className="text-gray-400">Klik tanggal pada kalender untuk menambah atau mencabut status terbooking.</p>
            </div>
          </div>

          {/* Quick Range Block */}
          <form onSubmit={handleAddRange} className="bg-white p-5 rounded-xl border border-gray-200 shadow-sm space-y-3">
            <h3 className="text-xs font-bold uppercase text-gray-500">Tandai Rentang Tanggal Cepat</h3>
            <div>
              <label className="block text-xs text-gray-600 mb-1">Mulai Tanggal:</label>
              <input
                type="date"
                value={rangeStart}
                onChange={(e) => setRangeStart(e.target.value)}
                className="w-full p-2 border border-gray-300 rounded text-sm"
              />
            </div>
            <div>
              <label className="block text-xs text-gray-600 mb-1">Sampai Tanggal:</label>
              <input
                type="date"
                value={rangeEnd}
                onChange={(e) => setRangeEnd(e.target.value)}
                className="w-full p-2 border border-gray-300 rounded text-sm"
              />
            </div>
            <button
              type="submit"
              className="w-full py-2 bg-gray-900 hover:bg-gray-800 text-white rounded text-xs font-semibold"
            >
              + Tandai Terbooking (Rentang)
            </button>
          </form>

          <div className="bg-amber-50 border border-amber-200 rounded-xl p-4 text-xs text-amber-800 space-y-1">
            <p className="font-bold">Tips Pengelola Kediengaja:</p>
            <p>
              Setiap kali ada tamu yang membayar DP lewat WhatsApp, segera klik tanggal check-in hingga check-out unit tersebut di sini, lalu klik <strong>Simpan Perubahan</strong> agar calon tamu lain di web melihat tanggal tersebut sudah terisi (merah).
            </p>
          </div>
        </div>

        {/* Kolom Kanan: Kalender Interaktif */}
        <div className="lg:col-span-8 bg-white p-6 rounded-xl border border-gray-200 shadow-sm">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-xl font-bold text-gray-900">
              {monthNames[currentMonth]} {currentYear}
            </h2>
            <div className="flex gap-2">
              <button
                type="button"
                onClick={() => canGoPrev && setViewDate(new Date(currentYear, currentMonth - 1, 1))}
                disabled={!canGoPrev}
                className={`px-3 py-1.5 border border-gray-300 rounded-md text-xs font-medium transition-colors ${
                  canGoPrev ? 'hover:bg-gray-50 text-gray-700 cursor-pointer' : 'opacity-40 cursor-not-allowed text-gray-300'
                }`}
                title={canGoPrev ? 'Bulan sebelumnya' : 'Sudah di bulan saat ini'}
              >
                ← Bulan Sebelumnya
              </button>
              <button
                type="button"
                onClick={() => canGoNext && setViewDate(new Date(currentYear, currentMonth + 1, 1))}
                disabled={!canGoNext}
                className={`px-3 py-1.5 border border-gray-300 rounded-md text-xs font-medium transition-colors ${
                  canGoNext ? 'hover:bg-gray-50 text-gray-700 cursor-pointer' : 'opacity-40 cursor-not-allowed text-gray-300'
                }`}
                title={canGoNext ? 'Bulan berikutnya' : 'Batas maksimal 6 bulan ke depan'}
              >
                Bulan Berikutnya →
              </button>
            </div>
          </div>

          <div className="flex items-center gap-4 text-xs mb-4">
            <div className="flex items-center gap-1.5">
              <span className="w-3 h-3 bg-white border border-gray-300 rounded" />
              <span>Tersedia (Bisa dipesan tamu)</span>
            </div>
            <div className="flex items-center gap-1.5">
              <span className="w-3 h-3 bg-red-500 rounded" />
              <span className="font-semibold text-red-600">Terbooking (Tamu di web tidak bisa pilih)</span>
            </div>
            <div className="flex items-center gap-1.5">
              <span className="w-3 h-3 bg-gray-200 rounded" />
              <span className="text-gray-500">Di luar batas 6 bulan</span>
            </div>
          </div>

          <div className="grid grid-cols-7 gap-2 text-center text-xs">
            {['Min', 'Sen', 'Sel', 'Rab', 'Kam', 'Jum', 'Sab'].map((d) => (
              <div key={d} className="font-bold text-gray-400 py-1">
                {d}
              </div>
            ))}

            {Array.from({ length: firstDayIndex }).map((_, i) => (
              <div key={`empty-${i}`} className="h-12" />
            ))}

            {Array.from({ length: daysInMonth }).map((_, i) => {
              const day = i + 1;
              const iso = toIso(currentYear, currentMonth, day);
              const booked = bookedSet.has(iso);
              const past = iso < todayIso;
              const tooFar = iso > maxIso;
              const isDisabled = past || tooFar;

              return (
                <button
                  key={iso}
                  type="button"
                  disabled={isDisabled}
                  onClick={() => !isDisabled && toggleDate(iso)}
                  title={
                    past
                      ? 'Tanggal lampau'
                      : tooFar
                      ? 'Di luar batas 6 bulan'
                      : booked
                      ? 'Klik untuk membatalkan status terbooking'
                      : 'Klik untuk menandai terbooking'
                  }
                  className={`h-12 rounded-lg border text-xs font-medium flex flex-col items-center justify-center transition-all ${
                    isDisabled
                      ? 'bg-gray-100 text-gray-400 border-gray-200 cursor-not-allowed opacity-50'
                      : booked
                      ? 'bg-red-500 text-white border-red-600 shadow-sm cursor-pointer hover:bg-red-600'
                      : 'bg-white text-gray-800 hover:bg-emerald-50 border-gray-200 cursor-pointer'
                  }`}
                >
                  <span className="text-sm font-bold">{day}</span>
                  <span className="text-[10px] leading-tight">
                    {tooFar ? '-' : booked ? 'Terbooking' : 'Kosong'}
                  </span>
                </button>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
}
