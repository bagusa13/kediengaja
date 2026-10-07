"use client";

import { useCallback, useEffect, useMemo, useState } from 'react';
import { useSearchParams } from 'next/navigation';
import Link from 'next/link';
import { 
  Flame, 
  Mountain, 
  Car, 
  ShieldCheck, 
  Calendar, 
  HelpCircle, 
  ChevronDown, 
  ChevronRight, 
  SlidersHorizontal,
  Sparkles,
  Users
} from 'lucide-react';
import VillaCard from '@/components/VillaCard';
import ListingStatus from '@/components/ListingStatus';
import WhatsAppButton from '@/components/WhatsAppButton';
import { FALLBACK_PENGINAPAN } from '@/lib/mockData';
import { fetchCollection, orFallback } from '@/lib/listings';
import { formatWaDate } from '@/lib/site';

function sortRows(rows, sort) {
  const copy = [...rows];
  if (sort === 'murah') copy.sort((a, b) => Number(a.harga || 0) - Number(b.harga || 0));
  if (sort === 'mahal') copy.sort((a, b) => Number(b.harga || 0) - Number(a.harga || 0));
  if (sort === 'kapasitas') copy.sort((a, b) => Number(b.kapasitas || 0) - Number(a.kapasitas || 0));
  return copy;
}

const FAQS_PENGINAPAN = [
  {
    q: "Apakah seluruh unit dilengkapi water heater (air panas)?",
    a: "Ya, 100% unit cabin dan villa di Kediengaja wajib memiliki water heater aktif 24 jam dan selimut tebal. Suhu Dieng pada malam hingga subuh bisa mencapai 8°–12°C, sehingga fasilitas ini merupakan standar wajib kami."
  },
  {
    q: "Bagaimana akses jalan dan fasilitas parkir untuk mobil?",
    a: "Seluruh listing cabin berada di akses jalan beraspal yang dapat dilalui kendaraan roda empat (City car, Avanza/Innova, hingga HiAce). Area parkir aman tersedia di depan atau di lingkungan dekat kabin."
  },
  {
    q: "Kapan waktu check-in dan check-out standar?",
    a: "Waktu standar check-in mulai pukul 14.00 WIB dan check-out maksimal pukul 12.00 WIB. Jika Anda tiba lebih awal untuk trip sunrise Sikunir, koordinasikan dengan admin via WhatsApp untuk opsi penitipan barang atau early check-in jika kamar tersedia."
  },
  {
    q: "Apakah diperbolehkan memasak di dalam cabin?",
    a: "Sebagian besar unit kami (seperti Cabin House 1 & 2) menyediakan dapur lengkap dengan kompor, peralatan masak, teko air panas, dan piring/sendok. Sangat cocok untuk menyeduh teh/kopi hangat atau memasak bersama keluarga."
  },
  {
    q: "Bagaimana alur reservasi dan serah terima kunci?",
    a: "Pilih unit di website, cek ketersediaan tanggal, lalu klik tombol WhatsApp. Admin lokal kami akan memverifikasi ketersediaan kamar, mengonfirmasi data tamu, dan menyambut Anda langsung di lokasi saat hari kedatangan."
  }
];

export default function PenginapanClient({ initialItems = [] }) {
  const searchParams = useSearchParams();
  const tanggal = searchParams.get('tanggal') || '';
  const paxParam = searchParams.get('pax') || '';

  const [penginapan, setPenginapan] = useState(initialItems.length ? initialItems : FALLBACK_PENGINAPAN);
  const [loading, setLoading] = useState(initialItems.length === 0);
  const [error, setError] = useState('');
  
  // Filters
  const [selectedType, setSelectedType] = useState('semua');
  const [capacityFilter, setCapacityFilter] = useState('semua');
  const [sortOption, setSortOption] = useState('rekomendasi');
  const [openFaq, setOpenFaq] = useState(null);

  const fetchPenginapan = useCallback(async () => {
    setLoading(true);
    setError('');
    try {
      const data = await fetchCollection('penginapan');
      setPenginapan(orFallback(data, FALLBACK_PENGINAPAN));
    } catch (err) {
      console.warn('Firestore fallback activated for penginapan:', err);
      setPenginapan(FALLBACK_PENGINAPAN);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchPenginapan();
  }, [fetchPenginapan]);

  // Distinct types
  const types = useMemo(() => {
    return ['semua', ...new Set(penginapan.map((item) => item.tipe).filter(Boolean))];
  }, [penginapan]);

  // Filtered & sorted items
  const visibleItems = useMemo(() => {
    let result = [...penginapan];

    // Filter by type
    if (selectedType !== 'semua') {
      result = result.filter((item) => item.tipe === selectedType);
    }

    // Filter by capacity
    if (capacityFilter === 'kecil') {
      result = result.filter((item) => Number(item.kapasitas || 0) <= 4);
    } else if (capacityFilter === 'sedang') {
      result = result.filter((item) => Number(item.kapasitas || 0) >= 5 && Number(item.kapasitas || 0) <= 8);
    } else if (capacityFilter === 'besar') {
      result = result.filter((item) => Number(item.kapasitas || 0) >= 9);
    }

    return sortRows(result, sortOption);
  }, [penginapan, selectedType, capacityFilter, sortOption]);

  const waConsultMessage = `Halo Host Kediengaja, saya butuh rekomendasi penginapan di Dieng${tanggal ? ` untuk check-in ${formatWaDate(tanggal)}` : ''}${paxParam ? `, rombongan ${paxParam} orang` : ''}. Boleh minta saran unit yang cocok?`;

  return (
    <div>
      {/* 1. EDITORIAL HEADER SECTION */}
      <section className="relative overflow-hidden border-b border-stone-200 bg-cream py-12 sm:py-16 lg:py-20">
        <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
          {/* Breadcrumb */}
          <nav className="flex items-center gap-2 text-xs text-stone-500 mb-6" aria-label="Breadcrumb">
            <Link href="/" className="hover:text-ink">Beranda</Link>
            <ChevronRight className="w-3.5 h-3.5" aria-hidden="true" />
            <span className="text-forest font-semibold">Penginapan Dieng</span>
          </nav>

          <div className="max-w-3xl">
            <span className="inline-flex items-center gap-1.5 rounded-full border border-forest/20 bg-forest/5 px-3 py-1 text-xs font-semibold text-forest">
              <Sparkles className="h-3.5 w-3.5 text-forest" aria-hidden="true" />
              Katalog Cabin & Homestay Dataran Tinggi (2.093 MDPL)
            </span>

            <h1 className="mt-4 font-display text-3xl font-extrabold tracking-tight text-ink sm:text-4xl lg:text-5xl leading-tight">
              Istirahat Hangat di Tengah Dinginnya Udara Dieng
            </h1>

            <p className="mt-4 text-base sm:text-lg leading-relaxed text-stone-600">
              Pilihan cabin kayu berarsitektur estetik dan homestay keluarga dengan fasilitas water heater 24 jam, pemandangan Gunung Prau & Bukit Pangonan, serta pendampingan host lokal yang ramah.
            </p>

            {tanggal || paxParam ? (
              <div className="mt-5 inline-flex items-center gap-2 rounded-xl bg-forest/10 border border-forest/20 px-3.5 py-2 text-xs text-forest-dark font-medium">
                <Calendar className="w-4 h-4 text-forest" aria-hidden="true" />
                <span>
                  Filter pencarian: {tanggal ? `Check-in ${formatWaDate(tanggal)}` : ''}{tanggal && paxParam ? ' • ' : ''}{paxParam ? `${paxParam} tamu` : ''}
                </span>
              </div>
            ) : null}
          </div>

          {/* 4 Trust Value Pillars */}
          <div className="mt-10 grid grid-cols-2 gap-3 sm:grid-cols-4 sm:gap-4 border-t border-stone-200/80 pt-8">
            <div className="flex items-start gap-2.5">
              <div className="rounded-lg bg-amber-50 p-2 text-amber-700 border border-amber-200/60">
                <Flame className="w-4 h-4" aria-hidden="true" />
              </div>
              <div>
                <h4 className="text-xs font-bold text-ink">Water Heater 24 Jam</h4>
                <p className="text-[11px] text-stone-500 mt-0.5">Suhu 10°–15°C tetap nyaman</p>
              </div>
            </div>

            <div className="flex items-start gap-2.5">
              <div className="rounded-lg bg-emerald-50 p-2 text-emerald-700 border border-emerald-200/60">
                <Mountain className="w-4 h-4" aria-hidden="true" />
              </div>
              <div>
                <h4 className="text-xs font-bold text-ink">View Gn. Prau</h4>
                <p className="text-[11px] text-stone-500 mt-0.5">Panorama perbukitan asri</p>
              </div>
            </div>

            <div className="flex items-start gap-2.5">
              <div className="rounded-lg bg-blue-50 p-2 text-blue-700 border border-blue-200/60">
                <Car className="w-4 h-4" aria-hidden="true" />
              </div>
              <div>
                <h4 className="text-xs font-bold text-ink">Akses Mobil Aman</h4>
                <p className="text-[11px] text-stone-500 mt-0.5">Parkir depan kabin</p>
              </div>
            </div>

            <div className="flex items-start gap-2.5">
              <div className="rounded-lg bg-stone-100 p-2 text-stone-700 border border-stone-200">
                <ShieldCheck className="w-4 h-4" aria-hidden="true" />
              </div>
              <div>
                <h4 className="text-xs font-bold text-ink">Host Lokal Asli</h4>
                <p className="text-[11px] text-stone-500 mt-0.5">Tanpa biaya tersembunyi</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 2. FILTER TOOLBAR & LISTING SECTION */}
      <section className="mx-auto max-w-6xl px-4 py-10 sm:px-6 lg:px-8">
        {/* Loading and Error Feedback */}
        <ListingStatus
          loading={loading}
          error={error}
          empty={!loading && !error && penginapan.length === 0}
          loadingLabel="Memuat katalog penginapan..."
          emptyTitle="Belum ada unit terdaftar"
          emptyBody="Katalog sedang diperbarui oleh host. Hubungi admin untuk rekomendasi kamar hari ini."
          onRetry={fetchPenginapan}
        />

        {!loading && penginapan.length > 0 ? (
          <>
            {/* Interactive Filter Bar */}
            <div className="mb-8 rounded-2xl border border-stone-200 bg-white p-4 sm:p-5 shadow-soft">
              <div className="flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
                
                {/* Tipe Filter Tabs */}
                <div className="flex overflow-x-auto sm:flex-wrap items-center gap-1.5 pb-1 sm:pb-0 no-scrollbar">
                  <span className="text-xs font-semibold text-stone-500 mr-1 sm:mr-2 flex items-center gap-1 shrink-0">
                    <SlidersHorizontal className="w-3.5 h-3.5" aria-hidden="true" />
                    Tipe:
                  </span>
                  {types.map((t) => {
                    const isActive = selectedType === t;
                    const label = t === 'semua' ? 'Semua Tipe' : t;
                    return (
                      <button
                        key={t}
                        type="button"
                        onClick={() => setSelectedType(t)}
                        className={`rounded-xl px-3 py-1.5 text-xs font-semibold shrink-0 transition-all ${
                          isActive
                            ? 'bg-forest text-white shadow-xs'
                            : 'bg-stone-100 text-stone-600 hover:bg-stone-200/80 hover:text-ink'
                        }`}
                      >
                        {label}
                      </button>
                    );
                  })}
                </div>

                {/* Right: Kapasitas & Sorting Dropdowns */}
                <div className="grid grid-cols-2 gap-2 sm:flex sm:items-center sm:gap-3 w-full lg:w-auto">
                  {/* Kapasitas Selector */}
                  <div className="flex flex-col sm:flex-row sm:items-center gap-1 sm:gap-1.5">
                    <label htmlFor="kapasitas-select" className="text-[11px] sm:text-xs font-semibold text-stone-500 flex items-center gap-1">
                      <Users className="w-3.5 h-3.5" aria-hidden="true" />
                      Kapasitas:
                    </label>
                    <select
                      id="kapasitas-select"
                      value={capacityFilter}
                      onChange={(e) => setCapacityFilter(e.target.value)}
                      className="w-full sm:w-auto rounded-xl border border-stone-200 bg-surface px-2.5 py-1.5 text-xs font-medium text-ink focus:border-forest focus:outline-none focus:ring-1 focus:ring-forest"
                    >
                      <option value="semua">Semua Kapasitas</option>
                      <option value="kecil">Pasangan / 2–4 Orang</option>
                      <option value="sedang">Keluarga / 5–8 Orang</option>
                      <option value="besar">Rombongan / 9+ Orang</option>
                    </select>
                  </div>

                  {/* Sort Selector */}
                  <div className="flex flex-col sm:flex-row sm:items-center gap-1 sm:gap-1.5">
                    <label htmlFor="sort-select" className="text-[11px] sm:text-xs font-semibold text-stone-500">
                      Urutan:
                    </label>
                    <select
                      id="sort-select"
                      value={sortOption}
                      onChange={(e) => setSortOption(e.target.value)}
                      className="w-full sm:w-auto rounded-xl border border-stone-200 bg-surface px-2.5 py-1.5 text-xs font-medium text-ink focus:border-forest focus:outline-none focus:ring-1 focus:ring-forest"
                    >
                      <option value="rekomendasi">Rekomendasi Host</option>
                      <option value="murah">Harga: Terendah</option>
                      <option value="mahal">Harga: Tertinggi</option>
                      <option value="kapasitas">Kapasitas: Terbesar</option>
                    </select>
                  </div>
                </div>
              </div>

              {/* Status info bar */}
              <div className="mt-3.5 flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-t border-stone-100 pt-3 text-xs text-stone-500">
                <p>
                  Menampilkan <strong className="text-ink font-semibold">{visibleItems.length}</strong> unit penginapan aktif di Dieng
                </p>
                <Link
                  href="/availability"
                  className="font-medium text-forest hover:underline inline-flex items-center gap-1"
                >
                  <Calendar className="w-3.5 h-3.5" aria-hidden="true" />
                  Lihat Kalender Ketersediaan 6 Bulan
                </Link>
              </div>
            </div>

            {/* Units Grid */}
            {visibleItems.length === 0 ? (
              <div className="rounded-2xl border border-dashed border-stone-300 bg-surface p-10 text-center">
                <p className="font-display text-lg font-bold text-ink">Tidak ada unit yang sesuai filter</p>
                <p className="mt-1 text-sm text-stone-600">
                  Coba ubah filter tipe atau kapasitas di atas untuk melihat pilihan cabin lainnya.
                </p>
                <button
                  type="button"
                  onClick={() => {
                    setSelectedType('semua');
                    setCapacityFilter('semua');
                  }}
                  className="mt-4 inline-flex items-center rounded-xl bg-forest px-4 py-2 text-xs font-bold text-white hover:bg-forest-light"
                >
                  Reset Filter
                </button>
              </div>
            ) : (
              <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
                {visibleItems.map((item) => (
                  <VillaCard key={item.id} {...item} />
                ))}
              </div>
            )}
          </>
        ) : null}

        {/* 3. TIPS PRAKTIS MENGINAP DI DIENG */}
        <div className="mt-16 rounded-2xl border border-stone-200 bg-cream p-6 sm:p-8">
          <div className="max-w-2xl">
            <span className="text-xs font-bold uppercase tracking-wider text-forest">
              Panduan Lokal Dieng
            </span>
            <h2 className="mt-1 font-display text-2xl font-bold text-ink">
              Tips Memilih Penginapan & Persiapan Dingin Dieng
            </h2>
          </div>

          <div className="mt-6 grid gap-4 sm:grid-cols-3">
            <div className="rounded-xl border border-stone-200/80 bg-white p-4">
              <p className="font-display text-sm font-bold text-ink">1. Siapkan Pakaian Hangat</p>
              <p className="mt-1.5 text-xs leading-relaxed text-stone-600">
                Suhu malam di Dieng berkisar 10°–14°C (bahkan bisa lebih dingin saat musim kemarau Juli–Agustus). Bawa jaket tebal, kaus kaki, dan kupluk.
              </p>
            </div>

            <div className="rounded-xl border border-stone-200/80 bg-white p-4">
              <p className="font-display text-sm font-bold text-ink">2. Amankan Jadwal Weekend</p>
              <p className="mt-1.5 text-xs leading-relaxed text-stone-600">
                Jumlah cabin kayu estetik di Dieng terbatas. Untuk akhir pekan dan libur panjang, pastikan reservasi dilakukan 2–3 minggu sebelum kedatangan.
              </p>
            </div>

            <div className="rounded-xl border border-stone-200/80 bg-white p-4">
              <p className="font-display text-sm font-bold text-ink">3. Hubungkan dengan Jeep 4x4</p>
              <p className="mt-1.5 text-xs leading-relaxed text-stone-600">
                Jika Anda ingin mengejar sunrise Bukit Sikunir jam 03.30 subuh, host kami dapat mengatur jemputan Jeep 4x4 langsung di depan pintu cabin.
              </p>
            </div>
          </div>
        </div>

        {/* 4. DIRECT WHATSAPP CONSULTATION BANNER */}
        <div className="mt-12 rounded-2xl border border-forest/20 bg-forest-dark p-6 sm:p-10 text-white">
          <div className="flex flex-col gap-6 lg:flex-row lg:items-center lg:justify-between">
            <div className="max-w-xl">
              <span className="inline-block rounded-full bg-emerald-500/20 px-3 py-1 text-xs font-semibold text-emerald-300">
                Layanan Asistensi Host 24 Jam
              </span>
              <h3 className="mt-3 font-display text-2xl font-extrabold text-white sm:text-3xl">
                Rombongan Besar atau Butuh Rekomendasi Unit Khusus?
              </h3>
              <p className="mt-2 text-sm text-stone-300 leading-relaxed">
                Tuliskan jumlah peserta, tanggal kunjungan, dan preferensi Anda. Tim Kediengaja akan memilihkan cabin terbaik yang masih kosong sesuai kebutuhan Anda.
              </p>
            </div>

            <div className="flex-shrink-0">
              <WhatsAppButton
                message={waConsultMessage}
                variant="primary"
                className="w-full sm:w-auto px-6 py-3.5 text-sm font-bold"
              >
                Konsultasi Kamar via WhatsApp
              </WhatsAppButton>
            </div>
          </div>
        </div>

        {/* 5. FAQ ACCORDION PENGINAPAN */}
        <div className="mt-16 border-t border-stone-200 pt-12">
          <div className="text-center max-w-2xl mx-auto mb-8">
            <span className="text-xs font-bold uppercase tracking-wider text-forest flex items-center justify-center gap-1">
              <HelpCircle className="w-3.5 h-3.5" aria-hidden="true" />
              Pertanyaan Umum
            </span>
            <h2 className="mt-1 font-display text-2xl font-bold text-ink sm:text-3xl">
              Tanya Jawab Seputar Penginapan Kediengaja
            </h2>
          </div>

          <div className="max-w-3xl mx-auto divide-y divide-stone-200 rounded-2xl border border-stone-200 bg-white">
            {FAQS_PENGINAPAN.map((faq, idx) => {
              const isOpen = openFaq === idx;
              return (
                <div key={idx} className="p-5 sm:p-6">
                  <button
                    type="button"
                    onClick={() => setOpenFaq(isOpen ? null : idx)}
                    className="flex w-full items-center justify-between text-left gap-4"
                  >
                    <span className="font-display text-sm sm:text-base font-bold text-ink">
                      {faq.q}
                    </span>
                    <ChevronDown
                      className={`h-4 w-4 text-stone-400 transition-transform duration-200 shrink-0 ${
                        isOpen ? 'rotate-180 text-forest' : ''
                      }`}
                      aria-hidden="true"
                    />
                  </button>
                  {isOpen ? (
                    <p className="mt-3 text-xs sm:text-sm leading-relaxed text-stone-600">
                      {faq.a}
                    </p>
                  ) : null}
                </div>
              );
            })}
          </div>
        </div>
      </section>
    </div>
  );
}
