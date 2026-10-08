"use client";

import { useMemo, useState } from 'react';
import { Calendar, Users, Compass, Car, MessageCircle, Check, MapPin, Clock, ArrowRight } from 'lucide-react';
import { formatRupiah } from '@/lib/covers';
import { waLink } from '@/lib/site';

const DURATIONS = [
  { id: '1d', label: '1 Hari (One Day Trip)', nights: 0, desc: 'Trip singkat tanpa menginap, fokus sunrise dan spot utama Dieng.' },
  { id: '2d1n', label: '2 Hari 1 Malam', nights: 1, desc: 'Paling diminati. Menginap 1 malam di kabin dengan eksplorasi santai.' },
  { id: '3d2n', label: '3 Hari 2 Malam', nights: 2, desc: 'Liburan lengkap mencakup seluruh kawah, telaga, savana, dan kuliner.' },
];

const GUEST_OPTIONS = [
  { id: '2', label: '2 Orang', desc: 'Pasangan / sahabat (1 kamar privat).' },
  { id: '4', label: '4 - 6 Orang', desc: 'Keluarga kecil / teman (1 cabin house / 1 jeep).' },
  { id: '10', label: '8 - 12 Orang', desc: 'Keluarga besar / rombongan (1 villa privat full).' },
];

const VIBES = [
  { id: 'sunrise', label: 'Sunrise & Lanskap Alam', desc: 'Fokus puncak Sikunir, lautan awan, dan keindahan danau vulkanik.' },
  { id: 'family', label: 'Santai & Ramah Keluarga', desc: 'Jalur nyaman untuk anak & orang tua: Kompleks Candi, Kawah, & Telaga.' },
  { id: 'adventure', label: 'Petualangan Offroad 4x4', desc: 'Jalur tanah savana Pangonan, tanjakan ekstrem, dan telaga tersembunyi.' },
];

const TRANSPORTS = [
  { id: 'own', label: 'Bawa Kendaraan Sendiri', desc: 'Bertemu langsung di homestay atau basecamp Kediengaja.' },
  { id: 'shuttle', label: 'Antar-Jemput Stasiun / Bandara', desc: 'Mobil privat jemput dari Purwokerto / Jogja / Solo / Semarang.' },
];

export default function TripBuilderPage() {
  const [duration, setDuration] = useState('2d1n');
  const [guests, setGuests] = useState('4');
  const [vibe, setVibe] = useState('sunrise');
  const [transport, setTransport] = useState('own');

  const [activeStep, setActiveStep] = useState(1);

  // Dynamic recommendation & pricing logic
  const recommendation = useMemo(() => {
    let stayName = 'Cabin House 1';
    let stayPrice = 1500000;
    if (guests === '2') {
      stayName = 'Kamar Privat Kabin Kayu';
      stayPrice = 450000;
    } else if (guests === '10') {
      stayName = 'Daun Villa Dieng (Privat 12 Orang)';
      stayPrice = 1800000;
    }

    let jeepName = 'Jeep 4x4 Short Trip (Kawah & Candi)';
    let jeepPrice = 450000;
    if (vibe === 'adventure') {
      jeepName = 'Jeep 4x4 Offroad Savana & Telaga Dringo';
      jeepPrice = 550000;
    } else if (vibe === 'sunrise') {
      jeepName = 'Jeep 4x4 Sunrise Sikunir & Curug Sikarim';
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
      stayPrice,
      jeepName,
      jeepPrice,
      nights,
      shuttleEst,
      estTotal,
      hasShuttle: transport === 'shuttle',
    };
  }, [duration, guests, vibe, transport]);

  const selectedDuration = DURATIONS.find((d) => d.id === duration)?.label;
  const selectedGuests = GUEST_OPTIONS.find((g) => g.id === guests)?.label;
  const selectedVibe = VIBES.find((v) => v.id === vibe)?.label;
  const selectedTransport = TRANSPORTS.find((t) => t.id === transport)?.label;

  const waMessage = `Halo Admin Kediengaja,\nSaya membuat rencana liburan lewat Trip Builder di website:\n\nDurasi: ${selectedDuration}\nJumlah Tamu: ${selectedGuests}\nGaya Trip: ${selectedVibe}\nTransportasi: ${selectedTransport}\n\nEstimasi Rencana:\n- Akomodasi: ${recommendation.nights > 0 ? `${recommendation.stayName} (${recommendation.nights} Malam)` : 'Tanpa Menginap'}\n- Aktivitas: ${recommendation.jeepName}\n- Estimasi Total Biaya: ~${formatRupiah(recommendation.estTotal)}\n\nMohon dibantu cek ketersediaan tanggal dan konfirmasi detail perjalanannya. Terima kasih.`;

  return (
    <main className="bg-[#F8F7F3] min-h-screen py-12 sm:py-20">
      <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center max-w-2xl mx-auto mb-12">
          <span className="inline-block rounded-lg bg-white/80 border border-stone-200 px-3 py-1 text-xs font-semibold tracking-wider uppercase text-forest shadow-xs">
            Perencana Liburan Kediengaja
          </span>
          <h1 className="mt-3 font-display text-3xl font-bold tracking-tight text-ink sm:text-5xl">
            Rancang Liburan Dieng Anda
          </h1>
          <p className="mt-3 text-xs sm:text-sm text-stone-600 leading-relaxed">
            Sesuaikan durasi, jumlah rombongan, dan gaya liburan untuk menghasilkan jadwal perjalanan nyata (itinerary) dan estimasi biaya transparan.
          </p>
        </div>

        {/* DESKTOP SIDE-BY-SIDE ITINERARY PLANNER (hidden lg:grid) */}
        <div className="hidden lg:grid gap-10 lg:grid-cols-12 items-start">
          {/* Options Step Column */}
          <div className="space-y-8 lg:col-span-6">
            {/* Step 1: Durasi */}
            <div className="rounded-xl border border-stone-200/90 bg-white p-5 sm:p-6 shadow-xs">
              <label className="font-display text-sm font-bold text-ink uppercase tracking-wider block mb-3 flex items-center gap-2">
                <Calendar className="h-4 w-4 text-forest" />
                <span>1. Durasi Perjalanan</span>
              </label>
              <div className="space-y-2.5">
                {DURATIONS.map((d) => (
                  <button
                    key={d.id}
                    type="button"
                    onClick={() => setDuration(d.id)}
                    className={`flex w-full items-start justify-between rounded-xl border p-4 text-left transition cursor-pointer ${
                      duration === d.id
                        ? 'border-forest bg-forest/5 shadow-xs ring-1 ring-forest'
                        : 'border-stone-200 bg-white hover:border-stone-300'
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
            <div className="rounded-xl border border-stone-200/90 bg-white p-5 sm:p-6 shadow-xs">
              <label className="font-display text-sm font-bold text-ink uppercase tracking-wider block mb-3 flex items-center gap-2">
                <Users className="h-4 w-4 text-forest" />
                <span>2. Jumlah Rombongan</span>
              </label>
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-2.5">
                {GUEST_OPTIONS.map((g) => (
                  <button
                    key={g.id}
                    type="button"
                    onClick={() => setGuests(g.id)}
                    className={`rounded-xl border p-3.5 text-left transition cursor-pointer ${
                      guests === g.id
                        ? 'border-forest bg-forest/5 shadow-xs ring-1 ring-forest'
                        : 'border-stone-200 bg-white hover:border-stone-300'
                    }`}
                  >
                    <p className="font-bold text-ink text-sm">{g.label}</p>
                    <p className="text-[11px] text-stone-500 mt-0.5">{g.desc}</p>
                  </button>
                ))}
              </div>
            </div>

            {/* Step 3: Vibe */}
            <div className="rounded-xl border border-stone-200/90 bg-white p-5 sm:p-6 shadow-xs">
              <label className="font-display text-sm font-bold text-ink uppercase tracking-wider block mb-3 flex items-center gap-2">
                <Compass className="h-4 w-4 text-forest" />
                <span>3. Fokus &amp; Gaya Liburan</span>
              </label>
              <div className="space-y-2.5">
                {VIBES.map((v) => (
                  <button
                    key={v.id}
                    type="button"
                    onClick={() => setVibe(v.id)}
                    className={`flex w-full items-start justify-between rounded-xl border p-4 text-left transition cursor-pointer ${
                      vibe === v.id
                        ? 'border-forest bg-forest/5 shadow-xs ring-1 ring-forest'
                        : 'border-stone-200 bg-white hover:border-stone-300'
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
            <div className="rounded-xl border border-stone-200/90 bg-white p-5 sm:p-6 shadow-xs">
              <label className="font-display text-sm font-bold text-ink uppercase tracking-wider block mb-3 flex items-center gap-2">
                <Car className="h-4 w-4 text-forest" />
                <span>4. Kebutuhan Transportasi</span>
              </label>
              <div className="space-y-2.5">
                {TRANSPORTS.map((t) => (
                  <button
                    key={t.id}
                    type="button"
                    onClick={() => setTransport(t.id)}
                    className={`flex w-full items-start justify-between rounded-xl border p-4 text-left transition cursor-pointer ${
                      transport === t.id
                        ? 'border-forest bg-forest/5 shadow-xs ring-1 ring-forest'
                        : 'border-stone-200 bg-white hover:border-stone-300'
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

          {/* Sticky Visual Itinerary Planner Column */}
          <div className="lg:col-span-6">
            <div className="sticky top-24 rounded-xl border border-stone-200/90 bg-white p-6 sm:p-7 shadow-xs">
              <div className="flex items-center justify-between border-b border-stone-100 pb-4">
                <div>
                  <span className="text-[10px] font-bold uppercase tracking-wider text-forest block">
                    Rencana Perjalanan
                  </span>
                  <h2 className="font-display text-xl font-bold text-ink mt-0.5">
                    Itinerary Rekomendasi
                  </h2>
                </div>
                <span className="rounded-lg bg-stone-100 px-3 py-1 text-xs font-semibold text-stone-700">
                  {selectedDuration}
                </span>
              </div>

              {/* Day-by-day Itinerary Output */}
              <div className="mt-5 space-y-4">
                {/* HARI 1 */}
                <div className="rounded-xl border border-stone-200/80 bg-stone-50/60 p-4">
                  <div className="flex items-center gap-2 text-xs font-bold text-forest uppercase tracking-wider mb-2">
                    <span className="flex h-5 w-5 items-center justify-center rounded-full bg-forest text-white text-[10px]">1</span>
                    <span>Hari Pertama — Kedatangan &amp; Adaptasi Suhu</span>
                  </div>
                  <ul className="space-y-2 text-xs text-stone-700">
                    <li className="flex items-start gap-2">
                      <Clock className="h-3.5 w-3.5 text-stone-400 shrink-0 mt-0.5" />
                      <span>{recommendation.hasShuttle ? 'Penjemputan di stasiun/bandara, perjalanan menuju Dataran Tinggi Dieng.' : 'Tiba di Dieng, temu sapa bersama tim lokal di basecamp.'}</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <MapPin className="h-3.5 w-3.5 text-stone-400 shrink-0 mt-0.5" />
                      <span>Check-in di <strong>{recommendation.stayName}</strong>, istirahat dan adaptasi udara sejuk.</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <Compass className="h-3.5 w-3.5 text-stone-400 shrink-0 mt-0.5" />
                      <span>Sore hari santai: Mengunjungi Kompleks Candi Arjuna dan berburu sunset di Telaga Menjer.</span>
                    </li>
                  </ul>
                </div>

                {/* HARI 2 (if 2D1N or 3D2N) */}
                {duration !== '1d' && (
                  <div className="rounded-xl border border-stone-200/80 bg-stone-50/60 p-4">
                    <div className="flex items-center gap-2 text-xs font-bold text-forest uppercase tracking-wider mb-2">
                      <span className="flex h-5 w-5 items-center justify-center rounded-full bg-forest text-white text-[10px]">2</span>
                      <span>Hari Kedua — Sunrise Sikunir &amp; Jelajah Jeep</span>
                    </div>
                    <ul className="space-y-2 text-xs text-stone-700">
                      <li className="flex items-start gap-2">
                        <Clock className="h-3.5 w-3.5 text-stone-400 shrink-0 mt-0.5" />
                        <span><strong>03.30 WIB:</strong> Berangkat berburu Golden Sunrise Bukit Sikunir di atas lautan awan.</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <Car className="h-3.5 w-3.5 text-stone-400 shrink-0 mt-0.5" />
                        <span>Eksplorasi dengan <strong>{recommendation.jeepName}</strong>: Kawah Sikidang, Savana Pangonan, &amp; Telaga Warna.</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <Check className="h-3.5 w-3.5 text-stone-400 shrink-0 mt-0.5" />
                        <span>{duration === '2d1n' ? 'Siang hari: Belanja oleh-oleh carica khas Dieng & persiapan perjalanan pulang.' : 'Sore hari: Eksplorasi Telaga Dringo yang tenang dan istirahat malam kedua.'}</span>
                      </li>
                    </ul>
                  </div>
                )}

                {/* HARI 3 (if 3D2N) */}
                {duration === '3d2n' && (
                  <div className="rounded-xl border border-stone-200/80 bg-stone-50/60 p-4">
                    <div className="flex items-center gap-2 text-xs font-bold text-forest uppercase tracking-wider mb-2">
                      <span className="flex h-5 w-5 items-center justify-center rounded-full bg-forest text-white text-[10px]">3</span>
                      <span>Hari Ketiga — Puncak Dieng &amp; Kepulangan</span>
                    </div>
                    <ul className="space-y-2 text-xs text-stone-700">
                      <li className="flex items-start gap-2">
                        <Clock className="h-3.5 w-3.5 text-stone-400 shrink-0 mt-0.5" />
                        <span>Pagi hari santai di teras kabin dengan sajian teh hangat khas pegunungan.</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <MapPin className="h-3.5 w-3.5 text-stone-400 shrink-0 mt-0.5" />
                        <span>Kunjungan ke Batu Pandang Ratapan Angin untuk melihat panorama Telaga Warna dari ketinggian.</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <Check className="h-3.5 w-3.5 text-stone-400 shrink-0 mt-0.5" />
                        <span>Check-out dari penginapan, makan siang mie ongklok, dan diantar ke stasiun/terminal.</span>
                      </li>
                    </ul>
                  </div>
                )}
              </div>

              {/* Price Estimation Breakdown */}
              <div className="mt-6 border-t border-stone-100 pt-5">
                <div className="flex items-end justify-between">
                  <div>
                    <span className="text-[10px] text-stone-500 uppercase tracking-wider block font-semibold">
                      Estimasi Total Biaya Rombongan:
                    </span>
                    <p className="font-display text-2xl sm:text-3xl font-bold text-forest mt-0.5">
                      ~{formatRupiah(recommendation.estTotal)}
                    </p>
                  </div>
                  <span className="text-[11px] text-stone-500 text-right">
                    {recommendation.nights > 0 ? `${recommendation.nights} Malam Menginap` : 'Trip Tanpa Nginap'}
                  </span>
                </div>
                <p className="text-[11px] text-stone-400 mt-1">
                  *Perkiraan kasar all-in (akomodasi, armada jeep, dan transportasi). Biaya final dikonfirmasi admin setelah cek ketersediaan tanggal.
                </p>
              </div>

              {/* Action Button */}
              <div className="mt-6">
                <a
                  href={waLink(waMessage)}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex min-h-[46px] w-full items-center justify-center gap-2 rounded-xl bg-forest py-3 text-xs sm:text-sm font-semibold text-white shadow-xs hover:bg-forest-light active:scale-[0.98] transition"
                >
                  <MessageCircle className="h-4.5 w-4.5" />
                  <span>Kirim Rencana ke WhatsApp Admin</span>
                </a>
              </div>
            </div>
          </div>
        </div>

        {/* MOBILE ART-DIRECTED STEP-BY-STEP FLOW (lg:hidden) */}
        <div className="lg:hidden flex flex-col space-y-5 pb-24">
          {/* Step Progress Bar */}
          <div className="rounded-xl border border-stone-200/90 bg-white p-4 shadow-xs">
            <div className="flex items-center justify-between text-xs font-semibold mb-2">
              <span className="text-forest">
                {activeStep <= 4 ? `Langkah ${activeStep} dari 4` : 'Ringkasan Itinerary'}
              </span>
              <span className="text-stone-500">
                {activeStep === 1 && '1. Durasi'}
                {activeStep === 2 && '2. Rombongan'}
                {activeStep === 3 && '3. Gaya Trip'}
                {activeStep === 4 && '4. Transportasi'}
                {activeStep === 5 && '5. Itinerary Selesai'}
              </span>
            </div>
            {/* Visual Progress Bar */}
            <div className="h-2 w-full rounded-full bg-stone-100 overflow-hidden">
              <div
                className="h-full bg-forest rounded-full transition-all duration-300"
                style={{ width: `${Math.min(100, (activeStep / 4) * 100)}%` }}
              />
            </div>
            {/* Quick step jump pills */}
            <div className="mt-3 flex items-center justify-between gap-1 text-[11px]">
              {[1, 2, 3, 4, 5].map((s) => (
                <button
                  key={s}
                  type="button"
                  onClick={() => setActiveStep(s)}
                  className={`flex-1 py-1 text-center rounded-md font-medium transition ${
                    activeStep === s
                      ? 'bg-forest text-white font-bold'
                      : 'bg-stone-50 text-stone-600 hover:bg-stone-100'
                  }`}
                >
                  {s === 5 ? 'Hasil' : `Step ${s}`}
                </button>
              ))}
            </div>
          </div>

          {/* STEP 1: DURASI */}
          {activeStep === 1 && (
            <div className="rounded-2xl border border-stone-200/90 bg-white p-5 shadow-xs animate-in fade-in">
              <div className="flex items-center gap-2 mb-3">
                <Calendar className="h-4 w-4 text-forest" />
                <h3 className="font-display text-base font-bold text-ink">
                  Berapa lama rencana Anda di Dieng?
                </h3>
              </div>
              <div className="space-y-3">
                {DURATIONS.map((d) => (
                  <button
                    key={d.id}
                    type="button"
                    onClick={() => {
                      setDuration(d.id);
                      setActiveStep(2);
                    }}
                    className={`flex w-full items-start justify-between rounded-xl border p-4 text-left transition ${
                      duration === d.id
                        ? 'border-forest bg-forest/5 shadow-xs ring-1 ring-forest'
                        : 'border-stone-200 bg-white active:bg-stone-50'
                    }`}
                  >
                    <div>
                      <p className="font-bold text-ink text-sm">{d.label}</p>
                      <p className="text-xs text-stone-500 mt-1 leading-snug">{d.desc}</p>
                    </div>
                    {duration === d.id && (
                      <span className="flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-forest text-white mt-0.5 ml-2">
                        <Check className="h-3 w-3" />
                      </span>
                    )}
                  </button>
                ))}
              </div>
            </div>
          )}

          {/* STEP 2: JUMLAH ROMBONGAN */}
          {activeStep === 2 && (
            <div className="rounded-2xl border border-stone-200/90 bg-white p-5 shadow-xs animate-in fade-in">
              <div className="flex items-center gap-2 mb-3">
                <Users className="h-4 w-4 text-forest" />
                <h3 className="font-display text-base font-bold text-ink">
                  Berapa orang yang berangkat?
                </h3>
              </div>
              <div className="space-y-3">
                {GUEST_OPTIONS.map((g) => (
                  <button
                    key={g.id}
                    type="button"
                    onClick={() => {
                      setGuests(g.id);
                      setActiveStep(3);
                    }}
                    className={`flex w-full items-start justify-between rounded-xl border p-4 text-left transition ${
                      guests === g.id
                        ? 'border-forest bg-forest/5 shadow-xs ring-1 ring-forest'
                        : 'border-stone-200 bg-white active:bg-stone-50'
                    }`}
                  >
                    <div>
                      <p className="font-bold text-ink text-sm">{g.label}</p>
                      <p className="text-xs text-stone-500 mt-1 leading-snug">{g.desc}</p>
                    </div>
                    {guests === g.id && (
                      <span className="flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-forest text-white mt-0.5 ml-2">
                        <Check className="h-3 w-3" />
                      </span>
                    )}
                  </button>
                ))}
              </div>
            </div>
          )}

          {/* STEP 3: GAYA TRIP */}
          {activeStep === 3 && (
            <div className="rounded-2xl border border-stone-200/90 bg-white p-5 shadow-xs animate-in fade-in">
              <div className="flex items-center gap-2 mb-3">
                <Compass className="h-4 w-4 text-forest" />
                <h3 className="font-display text-base font-bold text-ink">
                  Apa prioritas suasana liburan Anda?
                </h3>
              </div>
              <div className="space-y-3">
                {VIBES.map((v) => (
                  <button
                    key={v.id}
                    type="button"
                    onClick={() => {
                      setVibe(v.id);
                      setActiveStep(4);
                    }}
                    className={`flex w-full items-start justify-between rounded-xl border p-4 text-left transition ${
                      vibe === v.id
                        ? 'border-forest bg-forest/5 shadow-xs ring-1 ring-forest'
                        : 'border-stone-200 bg-white active:bg-stone-50'
                    }`}
                  >
                    <div>
                      <p className="font-bold text-ink text-sm">{v.label}</p>
                      <p className="text-xs text-stone-500 mt-1 leading-snug">{v.desc}</p>
                    </div>
                    {vibe === v.id && (
                      <span className="flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-forest text-white mt-0.5 ml-2">
                        <Check className="h-3 w-3" />
                      </span>
                    )}
                  </button>
                ))}
              </div>
            </div>
          )}

          {/* STEP 4: TRANSPORTASI */}
          {activeStep === 4 && (
            <div className="rounded-2xl border border-stone-200/90 bg-white p-5 shadow-xs animate-in fade-in">
              <div className="flex items-center gap-2 mb-3">
                <Car className="h-4 w-4 text-forest" />
                <h3 className="font-display text-base font-bold text-ink">
                  Bagaimana transportasi menuju Dieng?
                </h3>
              </div>
              <div className="space-y-3">
                {TRANSPORTS.map((t) => (
                  <button
                    key={t.id}
                    type="button"
                    onClick={() => {
                      setTransport(t.id);
                      setActiveStep(5);
                    }}
                    className={`flex w-full items-start justify-between rounded-xl border p-4 text-left transition ${
                      transport === t.id
                        ? 'border-forest bg-forest/5 shadow-xs ring-1 ring-forest'
                        : 'border-stone-200 bg-white active:bg-stone-50'
                    }`}
                  >
                    <div>
                      <p className="font-bold text-ink text-sm">{t.label}</p>
                      <p className="text-xs text-stone-500 mt-1 leading-snug">{t.desc}</p>
                    </div>
                    {transport === t.id && (
                      <span className="flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-forest text-white mt-0.5 ml-2">
                        <Check className="h-3 w-3" />
                      </span>
                    )}
                  </button>
                ))}
              </div>
            </div>
          )}

          {/* STEP 5: HASIL ITINERARY & ESTIMASI */}
          {activeStep === 5 && (
            <div className="rounded-2xl border border-stone-200/90 bg-white p-5 shadow-xs animate-in fade-in space-y-5">
              <div className="flex items-center justify-between border-b border-stone-100 pb-3">
                <div>
                  <span className="text-[10px] font-bold uppercase tracking-wider text-forest block">
                    Itinerary Rekomendasi
                  </span>
                  <h3 className="font-display text-lg font-bold text-ink">
                    Rencana Wisata Anda
                  </h3>
                </div>
                <button
                  type="button"
                  onClick={() => setActiveStep(1)}
                  className="rounded-lg border border-stone-200 bg-stone-50 px-2.5 py-1 text-xs font-semibold text-stone-600 active:bg-stone-100"
                >
                  Ubah Pilihan
                </button>
              </div>

              {/* Day-by-day Itinerary Output */}
              <div className="space-y-3.5">
                {/* HARI 1 */}
                <div className="rounded-xl border border-stone-200/80 bg-stone-50/70 p-3.5">
                  <div className="flex items-center gap-2 text-xs font-bold text-forest uppercase tracking-wider mb-2">
                    <span className="flex h-5 w-5 items-center justify-center rounded-full bg-forest text-white text-[10px]">1</span>
                    <span>Hari 1 — Kedatangan &amp; Adaptasi</span>
                  </div>
                  <ul className="space-y-1.5 text-xs text-stone-700">
                    <li className="flex items-start gap-1.5">
                      <Clock className="h-3.5 w-3.5 text-stone-400 shrink-0 mt-0.5" />
                      <span>{recommendation.hasShuttle ? 'Jemput di stasiun/bandara.' : 'Tiba & temu sapa di basecamp Dieng.'}</span>
                    </li>
                    <li className="flex items-start gap-1.5">
                      <MapPin className="h-3.5 w-3.5 text-stone-400 shrink-0 mt-0.5" />
                      <span>Check-in <strong>{recommendation.stayName}</strong>.</span>
                    </li>
                    <li className="flex items-start gap-1.5">
                      <Compass className="h-3.5 w-3.5 text-stone-400 shrink-0 mt-0.5" />
                      <span>Sore: Candi Arjuna &amp; sunset Telaga Menjer.</span>
                    </li>
                  </ul>
                </div>

                {/* HARI 2 (if 2D1N or 3D2N) */}
                {duration !== '1d' && (
                  <div className="rounded-xl border border-stone-200/80 bg-stone-50/70 p-3.5">
                    <div className="flex items-center gap-2 text-xs font-bold text-forest uppercase tracking-wider mb-2">
                      <span className="flex h-5 w-5 items-center justify-center rounded-full bg-forest text-white text-[10px]">2</span>
                      <span>Hari 2 — Sunrise &amp; Jeep 4x4</span>
                    </div>
                    <ul className="space-y-1.5 text-xs text-stone-700">
                      <li className="flex items-start gap-1.5">
                        <Clock className="h-3.5 w-3.5 text-stone-400 shrink-0 mt-0.5" />
                        <span><strong>03.30 WIB:</strong> Golden Sunrise Bukit Sikunir.</span>
                      </li>
                      <li className="flex items-start gap-1.5">
                        <Car className="h-3.5 w-3.5 text-stone-400 shrink-0 mt-0.5" />
                        <span>Jeep: Kawah Sikidang, Savana Pangonan, &amp; Telaga Warna.</span>
                      </li>
                      <li className="flex items-start gap-1.5">
                        <Check className="h-3.5 w-3.5 text-stone-400 shrink-0 mt-0.5" />
                        <span>{duration === '2d1n' ? 'Belanja oleh-oleh carica & kepulangan.' : 'Eksplorasi Telaga Dringo & istirahat malam 2.'}</span>
                      </li>
                    </ul>
                  </div>
                )}

                {/* HARI 3 (if 3D2N) */}
                {duration === '3d2n' && (
                  <div className="rounded-xl border border-stone-200/80 bg-stone-50/70 p-3.5">
                    <div className="flex items-center gap-2 text-xs font-bold text-forest uppercase tracking-wider mb-2">
                      <span className="flex h-5 w-5 items-center justify-center rounded-full bg-forest text-white text-[10px]">3</span>
                      <span>Hari 3 — Puncak Dieng &amp; Pulang</span>
                    </div>
                    <ul className="space-y-1.5 text-xs text-stone-700">
                      <li className="flex items-start gap-1.5">
                        <Clock className="h-3.5 w-3.5 text-stone-400 shrink-0 mt-0.5" />
                        <span>Pagi santai di kabin dengan teh hangat Dieng.</span>
                      </li>
                      <li className="flex items-start gap-1.5">
                        <MapPin className="h-3.5 w-3.5 text-stone-400 shrink-0 mt-0.5" />
                        <span>Batu Pandang Ratapan Angin (view Telaga Warna).</span>
                      </li>
                      <li className="flex items-start gap-1.5">
                        <Check className="h-3.5 w-3.5 text-stone-400 shrink-0 mt-0.5" />
                        <span>Check-out, makan mie ongklok, dan diantar pulang.</span>
                      </li>
                    </ul>
                  </div>
                )}
              </div>

              {/* Price Breakdown */}
              <div className="border-t border-stone-100 pt-4">
                <span className="text-[10px] text-stone-500 uppercase tracking-wider block font-semibold">
                  Estimasi Total Rombongan:
                </span>
                <p className="font-display text-2xl font-bold text-forest mt-0.5">
                  ~{formatRupiah(recommendation.estTotal)}
                </p>
                <p className="text-[11px] text-stone-400 mt-1">
                  *Perkiraan kasar akomodasi, armada jeep, dan transportasi.
                </p>
              </div>

              {/* Action Button */}
              <div className="pt-2">
                <a
                  href={waLink(waMessage)}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex min-h-[46px] w-full items-center justify-center gap-2 rounded-xl bg-forest py-3 text-xs font-bold text-white shadow-xs active:bg-forest-light transition"
                >
                  <MessageCircle className="h-4.5 w-4.5" />
                  <span>Kirim Rencana ke WhatsApp Admin</span>
                </a>
              </div>
            </div>
          )}

          {/* Sticky Mobile Step Navigation Controls */}
          {activeStep <= 4 && (
            <div className="flex items-center justify-between gap-3 pt-2">
              {activeStep > 1 ? (
                <button
                  type="button"
                  onClick={() => setActiveStep((s) => s - 1)}
                  className="inline-flex min-h-[44px] items-center justify-center rounded-xl border border-stone-300 bg-white px-5 text-xs font-semibold text-stone-700 active:bg-stone-100"
                >
                  ← Kembali
                </button>
              ) : <div />}

              <button
                type="button"
                onClick={() => setActiveStep((s) => s + 1)}
                className="inline-flex min-h-[44px] flex-1 items-center justify-center gap-1.5 rounded-xl bg-forest px-6 text-xs font-bold text-white shadow-xs active:bg-forest-light"
              >
                <span>{activeStep === 4 ? 'Lihat Itinerary & Biaya' : 'Langkah Selanjutnya'}</span>
                <ArrowRight className="h-4 w-4" />
              </button>
            </div>
          )}
        </div>
      </div>
    </main>
  );
}
