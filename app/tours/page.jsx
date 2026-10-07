"use client";

import { Suspense, useCallback, useEffect, useMemo, useState } from 'react';
import { useSearchParams } from 'next/navigation';
import Link from 'next/link';
import { MessageCircle, Calendar, Sparkles } from 'lucide-react';
import TourCard from '@/components/TourCard';
import ListingStatus from '@/components/ListingStatus';
import CatalogToolbar from '@/components/CatalogToolbar';
import { FALLBACK_TOURS } from '@/lib/mockData';
import { fetchCollection, orFallback } from '@/lib/listings';
import { formatWaDate, waLink } from '@/lib/site';

function sortRows(rows, sort) {
  const copy = [...rows];
  if (sort === 'murah') copy.sort((a, b) => Number(a.harga || 0) - Number(b.harga || 0));
  if (sort === 'mahal') copy.sort((a, b) => Number(b.harga || 0) - Number(a.harga || 0));
  return copy;
}

function ToursSkeleton() {
  return (
    <div className="grid grid-cols-1 gap-8 md:grid-cols-3">
      {[1, 2, 3].map((i) => (
        <div key={i} className="flex flex-col rounded-2xl border border-stone-200/80 bg-white p-4 animate-pulse">
          <div className="aspect-16/10 w-full rounded-xl bg-stone-200" />
          <div className="mt-4 space-y-2">
            <div className="h-4 w-3/4 rounded bg-stone-200" />
            <div className="h-3 w-1/2 rounded bg-stone-100" />
            <div className="h-3 w-full rounded bg-stone-100" />
          </div>
          <div className="mt-6 flex items-center justify-between border-t border-stone-100 pt-4">
            <div className="h-5 w-24 rounded bg-stone-200" />
            <div className="h-8 w-16 rounded-lg bg-stone-200" />
          </div>
        </div>
      ))}
    </div>
  );
}

function ToursList() {
  const searchParams = useSearchParams();
  const tanggal = searchParams.get('tanggal') || '';
  const pax = searchParams.get('pax') || '';
  const [tours, setTours] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [type, setType] = useState('semua');
  const [sort, setSort] = useState('baru');

  const fetchTours = useCallback(async () => {
    setLoading(true);
    setError('');
    try {
      const data = await fetchCollection('tours');
      setTours(orFallback(data, FALLBACK_TOURS));
    } catch (err) {
      console.warn('Firestore fallback activated:', err);
      setTours(FALLBACK_TOURS);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchTours();
  }, [fetchTours]);

  const types = useMemo(
    () => [...new Set(tours.map((item) => item.tipe).filter(Boolean))],
    [tours]
  );

  const visible = useMemo(() => {
    const filtered = type === 'semua' ? tours : tours.filter((item) => item.tipe === type);
    return sortRows(filtered, sort);
  }, [tours, type, sort]);

  const hintParts = [];
  if (tanggal) hintParts.push(`Tanggal ${formatWaDate(tanggal)}`);
  if (pax) hintParts.push(`${pax} orang`);
  const hint = hintParts.length ? `Filter: ${hintParts.join(', ')}. Slot jadwal dikonfirmasi langsung oleh admin.` : '';
  const waMessage = `Halo Admin Kediengaja, saya ingin konsultasi paket trip atau sewa Jeep di Dieng${tanggal ? ` untuk ${formatWaDate(tanggal)}` : ''}${pax ? `, ${pax} orang` : ''}.`;
  const generalChat = waLink(waMessage);

  return (
    <main className="bg-[#F8F7F3] min-h-screen">
      {/* Editorial Hero Header */}
      <section className="relative isolate overflow-hidden bg-slate-950 py-20 sm:py-28 text-white">
        <img
          src="https://images.unsplash.com/photo-1469474968028-56623f02e42e?auto=format&fit=crop&w=1920&q=80"
          alt="Lanskap Dataran Tinggi Dieng"
          className="absolute inset-0 h-full w-full object-cover opacity-35 object-center"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/60 to-transparent" />

        <div className="relative mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
          <div className="max-w-2xl">
            <span className="inline-block rounded-lg bg-white/10 px-3 py-1 text-xs font-semibold tracking-wider uppercase backdrop-blur-xs text-stone-200">
              Paket Trip &amp; Wisata Dieng
            </span>
            <h1 className="mt-4 font-display text-3xl font-bold tracking-tight sm:text-5xl lg:text-6xl leading-tight">
              Paket Wisata &amp; Fun Jeep Dieng
            </h1>
            <p className="mt-4 text-sm sm:text-base leading-relaxed text-stone-300">
              Pilihan trip privat rombongan, open trip sunrise Bukit Sikunir, dan petualangan fun jeep offroad keliling kawah belerang. Didampingi pemandu lokal asli Dieng.
            </p>

            <div className="mt-8 flex flex-col sm:flex-row items-stretch sm:items-center gap-3 max-w-md sm:max-w-none">
              <a
                href={generalChat}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex min-h-[46px] items-center justify-center gap-2 rounded-xl bg-forest px-5 text-sm font-semibold text-white shadow-xs hover:bg-forest-light active:scale-[0.98] transition"
              >
                <MessageCircle className="h-4 w-4" aria-hidden="true" />
                <span>Konsultasi Trip via WhatsApp</span>
              </a>

              <Link
                href="/trip-builder"
                className="inline-flex min-h-[46px] items-center justify-center gap-2 rounded-xl bg-white/10 px-5 text-sm font-semibold text-white backdrop-blur-xs hover:bg-white/20 transition"
              >
                <Sparkles className="h-4 w-4" aria-hidden="true" />
                <span>Rancang Rencana Sendiri</span>
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Main Tour Catalog Grid */}
      <section className="mx-auto max-w-6xl px-4 py-16 sm:px-6 sm:py-20 lg:px-8">
        <div className="mb-10 max-w-2xl">
          <p className="text-xs font-semibold tracking-wider uppercase text-forest">
            Pilihan Paket Resmi
          </p>
          <h2 className="mt-1 font-display text-2xl font-bold tracking-tight text-ink sm:text-3xl">
            Daftar Paket Wisata &amp; Trip
          </h2>
          <p className="mt-2 text-xs sm:text-sm text-stone-600">
            Armada prima dengan driver dan guide lokal ramah yang siap membantu dokumentasi di setiap spot terbaik.
          </p>
        </div>

        <ListingStatus
          loading={loading}
          error={error}
          empty={!loading && !error && tours.length === 0}
          emptyTitle="Belum ada paket di katalog"
          emptyBody="Paket sedang diperbarui. Hubungi admin untuk informasi slot armada Jeep atau open trip."
          onRetry={fetchTours}
        />

        {!loading && tours.length > 0 ? (
          <>
            <CatalogToolbar
              types={types}
              type={type}
              onType={setType}
              sort={sort}
              onSort={setSort}
              resultCount={visible.length}
              hint={hint}
            />
            {visible.length === 0 ? (
              <p className="text-sm text-stone-600">Tidak ada paket yang sesuai dengan filter ini.</p>
            ) : (
              <div className="grid grid-cols-1 gap-8 md:grid-cols-3">
                {visible.map((item) => (
                  <TourCard key={item.id} {...item} />
                ))}
              </div>
            )}
          </>
        ) : null}

        {/* Custom Route or Jeep Consultation Card */}
        <div className="mt-16 rounded-xl border border-stone-200/90 bg-white p-6 sm:p-8 shadow-xs">
          <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
            <div>
              <h2 className="font-display text-xl sm:text-2xl font-bold text-ink">
                Ingin rute khusus atau jemput di luar kota?
              </h2>
              <p className="mt-1.5 text-xs sm:text-sm text-stone-600 max-w-xl">
                Kami melayani antar-jemput stasiun/bandara di Purwokerto, Semarang, Jogja, atau Solo langsung ke penginapan Dieng.
              </p>
            </div>
            <a
              href={generalChat}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex min-h-[44px] items-center justify-center gap-2 rounded-xl bg-forest px-5 text-xs sm:text-sm font-semibold text-white shadow-xs hover:bg-forest-light transition shrink-0"
            >
              <MessageCircle className="h-4 w-4" />
              <span>Konsultasi Rute Custom</span>
            </a>
          </div>
        </div>
      </section>
    </main>
  );
}

export default function ToursPage() {
  return (
    <Suspense fallback={<ToursSkeleton />}>
      <ToursList />
    </Suspense>
  );
}