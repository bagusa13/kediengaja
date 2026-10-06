"use client";

import { useMemo, useState } from 'react';
import { Calendar, Users, Sparkles, Car, MessageCircle, Check, ArrowRight } from 'lucide-react';
import { formatRupiah } from '@/lib/covers';
import { waLink } from '@/lib/site';

const DURATIONS = [
  { id: '1d', label: '1 Hari (One Day Trip)', desc: 'Tanpa menginap, berburu sunrise dan keliling spot utama Dieng.' },
  { id: '2d1n', label: '2 Hari 1 Malam', desc: 'Pilihan paling populer. Menginap 1 malam dan eksplorasi santai.' },
  { id: '3d2n', label: '3 Hari 2 Malam', desc: 'Liburan puas mencakup seluruh destinasi alam dan kuliner khas.' },
];

const GUEST_OPTIONS = [
  { id: '2', label: '2 Orang', desc: 'Trip pasangan / sahabat.' },
  { id: '4', label: '4 - 6 Orang', desc: 'Keluarga kecil / grup teman (1 kabin/jeep).' },
  { id: '10', label: '8 - 12 Orang', desc: 'Keluarga besar / rombongan (1 villa privat).' },
];

const VIBES = [
  { id: 'sunrise', label: 'Sunrise & Spot Foto', desc: 'Fokus puncak Sikunir, lautan awan, dan lanskap danau.' },
  { id: 'family', label: 'Santai & Ramah Keluarga', desc: 'Jalur nyaman untuk anak/lansia: Candi Arjuna, Kawah, & Telaga.' },
  { id: 'adventure', label: 'Petualangan Offroad', desc: 'Jalur tanah savana Pangonan dan tanjakan bukit dengan Jeep 4x4.' },
];

const TRANSPORTS = [
  { id: 'own', label: 'Bawa Kendaraan Sendiri', desc: 'Bertemu langsung di homestay atau basecamp Dieng.' },
  { id: 'shuttle', label: 'Butuh Antar-Jemput Stasiun / Bandara', desc: 'Mobil privat jemput langsung dari Jogja / Solo / Semarang / Purwokerto.' },
];

export default function TripBuilderPage() {
  const [duration, setDuration] = useState('2d1n');
  const [guests, setGuests] = useState('4');
  const [vibe, setVibe] = useState('sunrise');
  const [transport, setTransport] = useState('own');

  // Deterministic calculation
  const recommendation = useMemo(() => {
    let stayName = 'Cabin House 1';
    let stayPrice = 1500000;
    if (guests === '2') {
      stayName = 'Kamar Privat Kabin';
      stayPrice = 450000;
    } else if (guests === '10') {
      stayName = 'Kediengaja by Daun Villa (12 Orang)';
      stayPrice = 1800000;
    }

    let jeepName = 'Jeep 4x4 Short Trip';
    let jeepPrice = 450000;
    if (vibe === 'adventure') {
      jeepName = 'Jeep 4x4 Medium Savana & Telaga Dringo';
      jeepPrice = 550000;
    } else if (vibe === 'sunrise') {
      jeepName = 'Jeep 4x4 Long Trip Sunrise Sikunir';
      jeepPrice = 750000;
    }

    let shuttleEst = 0;
    if (transport === 'shuttle') {
      shuttleEst = guests === '10' ? 1400000 : 700000;
    }

    const nights = duration === '3d2n' ? 2 : duration === '2d1n' ? 1 : 0;
    const estTotal = stayPrice * nights + jeepPrice + shuttleEst;

    return {
      stayName,
      jeepName,
      nights,
      estTotal,
      hasShuttle: transport === 'shuttle',
    };
  }, [duration, guests, vibe, transport]);

  const selectedDuration = DURATIONS.find((d) => d.id === duration)?.label;
  const selectedGuests = GUEST_OPTIONS.find((g) => g.id === guests)?.label;
  const selectedVibe = VIBES.find((v) => v.id === vibe)?.label;
  const selectedTransport = TRANSPORTS.find((t) => t.id === transport)?.label;

  const waMessage = `Halo Admin Kediengaja,\nSaya membuat rencana liburan lewat Trip Builder di website:\n\nDurasi: ${selectedDuration}\nJumlah Tamu: ${selectedGuests}\nFokus Trip: ${selectedVibe}\nTransportasi: ${selectedTransport}\n\nEstimasi Pilihan:\n- Akomodasi: ${recommendation.stayName}\n- Aktivitas: ${recommendation.jeepName}\n- Perkiraan Biaya: ~${formatRupiah(recommendation.estTotal)}\n\nMohon dibantu cek ketersediaan jadwal dan penyesuaian detailnya. Terima kasih.`;

  return (
    <main className="bg-cream/30 min-h-screen py-12 sm:py-20">
      <div className="mx-auto max-w-5xl px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center max-w-2xl mx-auto mb-12">
          <span className="inline-block rounded-md bg-forest/10 px-3 py-1 text-xs font-bold tracking-wider uppercase text-forest">
            Kalkulator Liburan Mandiri
          </span>
          <h1 className="mt-3 font-display text-3xl font-extrabold tracking-tight text-ink sm:text-5xl">
            Rancang Liburan Dieng Anda
          </h1>
          <p className="mt-3 text-xs sm:text-sm text-stone-600 leading-relaxed">
            Sesuaikan durasi, jumlah orang, dan gaya liburan untuk mendapatkan estimasi rencana perjalanan dan biaya yang transparan.
          </p>
        </div>

        <div className="grid gap-10 lg:grid-cols-12">
          {/* Options Step Column */}
          <div className="space-y-8 lg:col-span-7">
            {/* Step 1: Durasi */}
            <div>
              <label className="font-display text-sm font-bold text-ink uppercase tracking-wider block mb-3">
                1. Berapa lama rencana liburan Anda?
              </label>
              <div className="space-y-2.5">
                {DURATIONS.map((d) => (
                  <button
                    key={d.id}
                    type="button"
                    onClick={() => setDuration(d.id)}
                    className={`flex w-full items-start justify-between rounded-xl border p-4 text-left transition cursor-pointer ${
                      duration === d.id
                        ? 'border-forest bg-white shadow-soft ring-1 ring-forest'
                        : 'border-stone-200/80 bg-white/70 hover:bg-white'
                    }`}
                  >
                    <div>
                      <p className="font-bold text-ink text-sm">{d.label}</p>
                      <p className="text-xs text-stone-500 mt-0.5">{d.desc}</p>
                    </div>
                    {duration === d.id && (
                      <span className="flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-forest text-white">
                        <Check className="h-3 w-3" />
                      </span>
                    )}
                  </button>
                ))}
              </div>
            </div>

            {/* Step 2: Tamu */}
            <div>
              <label className="font-display text-sm font-bold text-ink uppercase tracking-wider block mb-3">
                2. Berapa orang yang akan berangkat?
              </label>
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-2.5">
                {GUEST_OPTIONS.map((g) => (
                  <button
                    key={g.id}
                    type="button"
                    onClick={() => setGuests(g.id)}
                    className={`rounded-xl border p-3.5 text-left transition cursor-pointer ${
                      guests === g.id
                        ? 'border-forest bg-white shadow-soft ring-1 ring-forest'
                        : 'border-stone-200/80 bg-white/70 hover:bg-white'
                    }`}
                  >
                    <p className="font-bold text-ink text-sm">{g.label}</p>
                    <p className="text-[11px] text-stone-500 mt-0.5">{g.desc}</p>
                  </button>
                ))}
              </div>
            </div>

            {/* Step 3: Vibe */}
            <div>
              <label className="font-display text-sm font-bold text-ink uppercase tracking-wider block mb-3">
                3. Fokus aktivitas liburan?
              </label>
              <div className="space-y-2.5">
                {VIBES.map((v) => (
                  <button
                    key={v.id}
                    type="button"
                    onClick={() => setVibe(v.id)}
                    className={`flex w-full items-start justify-between rounded-xl border p-4 text-left transition cursor-pointer ${
                      vibe === v.id
                        ? 'border-forest bg-white shadow-soft ring-1 ring-forest'
                        : 'border-stone-200/80 bg-white/70 hover:bg-white'
                    }`}
                  >
                    <div>
                      <p className="font-bold text-ink text-sm">{v.label}</p>
                      <p className="text-xs text-stone-500 mt-0.5">{v.desc}</p>
                    </div>
                    {vibe === v.id && (
                      <span className="flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-forest text-white">
                        <Check className="h-3 w-3" />
                      </span>
                    )}
                  </button>
                ))}
              </div>
            </div>

            {/* Step 4: Transport */}
            <div>
              <label className="font-display text-sm font-bold text-ink uppercase tracking-wider block mb-3">
                4. Kebutuhan transportasi antar-jemput?
              </label>
              <div className="space-y-2.5">
                {TRANSPORTS.map((t) => (
                  <button
                    key={t.id}
                    type="button"
                    onClick={() => setTransport(t.id)}
                    className={`flex w-full items-start justify-between rounded-xl border p-4 text-left transition cursor-pointer ${
                      transport === t.id
                        ? 'border-forest bg-white shadow-soft ring-1 ring-forest'
                        : 'border-stone-200/80 bg-white/70 hover:bg-white'
                    }`}
                  >
                    <div>
                      <p className="font-bold text-ink text-sm">{t.label}</p>
                      <p className="text-xs text-stone-500 mt-0.5">{t.desc}</p>
                    </div>
                    {transport === t.id && (
                      <span className="flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-forest text-white">
                        <Check className="h-3 w-3" />
                      </span>
                    )}
                  </button>
                ))}
              </div>
            </div>
          </div>

          {/* Sticky Estimate Result Summary */}
          <div className="lg:col-span-5">
            <div className="sticky top-24 rounded-2xl border border-stone-200/80 bg-white p-6 shadow-soft">
              <span className="text-[10px] font-bold uppercase tracking-wider text-forest block">
                Hasil Rekomendasi Liburan
              </span>
              <h2 className="font-display text-xl font-bold text-ink mt-1">
                Ringkasan Rencana Trip
              </h2>

              <div className="mt-5 space-y-4 border-y border-stone-100 py-5 text-xs">
                <div>
                  <span className="text-stone-400 block font-medium">Rekomendasi Penginapan:</span>
                  <span className="font-bold text-ink text-sm block mt-0.5">
                    {recommendation.nights > 0 ? `${recommendation.stayName} (${recommendation.nights} Malam)` : 'Trip Tanpa Menginap'}
                  </span>
                </div>

                <div>
                  <span className="text-stone-400 block font-medium">Rekomendasi Aktivitas:</span>
                  <span className="font-bold text-ink text-sm block mt-0.5">
                    {recommendation.jeepName}
                  </span>
                </div>

                {recommendation.hasShuttle && (
                  <div>
                    <span className="text-stone-400 block font-medium">Layanan Transportasi:</span>
                    <span className="font-bold text-ink text-sm block mt-0.5">
                      Mobil Privat Antar-Jemput Stasiun/Bandara
                    </span>
                  </div>
                )}
              </div>

              {/* Price Estimation */}
              <div className="mt-5">
                <span className="text-[10px] text-stone-400 uppercase tracking-wider block font-semibold">
                  Estimasi Total Biaya Rombongan:
                </span>
                <p className="font-display text-3xl font-black text-forest mt-0.5">
                  ~{formatRupiah(recommendation.estTotal)}
                </p>
                <p className="text-[11px] text-stone-400 mt-1">
                  *Perkiraan kasar paket all-in. Harga pasti dikonfirmasi admin setelah cek ketersediaan tanggal.
                </p>
              </div>

              {/* Action Button */}
              <div className="mt-6 border-t border-stone-100 pt-5">
                <a
                  href={waLink(waMessage)}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex min-h-[46px] w-full items-center justify-center gap-2 rounded-xl bg-wa py-3 text-xs sm:text-sm font-bold text-white shadow-lift hover:bg-[#15803d] active:scale-[0.98] transition"
                >
                  <MessageCircle className="h-4.5 w-4.5" />
                  <span>Kirim Rencana ke WhatsApp Admin</span>
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}
