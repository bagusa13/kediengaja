"use client";

import { Suspense, useCallback, useEffect, useMemo, useState } from 'react';
import { useSearchParams } from 'next/navigation';
import TourCard from '@/components/TourCard';
import ListingStatus from '@/components/ListingStatus';
import WhatsAppButton from '@/components/WhatsAppButton';
import CatalogToolbar from '@/components/CatalogToolbar';
import { FALLBACK_TOURS } from '@/lib/mockData';
import { fetchCollection, orFallback } from '@/lib/listings';
import { formatWaDate } from '@/lib/site';

function sortRows(rows, sort) {
  const copy = [...rows];
  if (sort === 'murah') copy.sort((a, b) => Number(a.harga || 0) - Number(b.harga || 0));
  if (sort === 'mahal') copy.sort((a, b) => Number(b.harga || 0) - Number(a.harga || 0));
  return copy;
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
  const hint = hintParts.length ? `Filter pencarian: ${hintParts.join(', ')}. Slot tetap dikonfirmasi admin.` : '';
  const waMessage = `Halo Ke Dieng Aja, saya ingin konsultasi paket trip atau sewa Jeep di Dieng${tanggal ? ` untuk ${formatWaDate(tanggal)}` : ''}${pax ? `, ${pax} orang` : ''}.`;

  return (
    <main>
      <section className="relative isolate overflow-hidden px-4 py-12 sm:px-6 lg:px-8 lg:py-16">
        <img
          src="https://images.unsplash.com/photo-1469474968028-56623f02e42e?auto=format&fit=crop&w=1920&q=80"
          alt="Lereng dataran tinggi Dieng"
          className="absolute inset-0 h-full w-full object-cover"
        />
        <div className="absolute inset-0 bg-ink/75" />
        <div className="relative mx-auto max-w-6xl text-white">
          <h1 className="font-display text-4xl sm:text-5xl">Paket wisata dan Fun Jeep</h1>
          <p className="mt-3 max-w-xl text-base text-stone-200 sm:text-lg">
            Jeep per kendaraan, open trip per orang, privat untuk rombongan. Jadwal dan bayar di WhatsApp.
          </p>
        </div>
      </section>

      <section className="mx-auto max-w-6xl px-4 py-10 sm:px-6 lg:px-8">
        <ListingStatus
          loading={loading}
          error={error}
          empty={!loading && !error && tours.length === 0}
          loadingLabel="Memuat paket wisata..."
          emptyTitle="Belum ada paket di katalog"
          emptyBody="Paket sedang diperbarui. Chat admin untuk armada Jeep atau jadwal open trip."
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
              <p className="text-sm text-stone-600">Tidak ada listing untuk tipe ini.</p>
            ) : (
              <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
                {visible.map((item) => (
                  <TourCard key={item.id} {...item} />
                ))}
              </div>
            )}
          </>
        ) : null}

        <div className="mt-14 rounded-md border border-stone-200 bg-white p-6 sm:p-8">
          <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
            <div>
              <h2 className="font-display text-2xl text-ink">Rute custom atau sewa Jeep?</h2>
              <p className="mt-1 text-sm text-stone-600">
                Tulis rute, jemput stasiun, atau jumlah jeep. Admin yang cek armada.
              </p>
            </div>
            <WhatsAppButton message={waMessage}>Konsultasi paket trip</WhatsAppButton>
          </div>
        </div>
      </section>
    </main>
  );
}

export default function ToursPage() {
  return (
    <Suspense fallback={<div className="flex min-h-[40vh] items-center justify-center text-sm text-moss">Memuat katalog...</div>}>
      <ToursList />
    </Suspense>
  );
}