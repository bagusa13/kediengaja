"use client";

import { useCallback, useEffect, useState } from 'react';
import Link from 'next/link';
import VillaCard from '@/components/VillaCard';
import TourCard from '@/components/TourCard';
import ListingStatus from '@/components/ListingStatus';
import { FALLBACK_PENGINAPAN, FALLBACK_TOURS } from '@/lib/mockData';
import { fetchCollection, orFallback } from '@/lib/listings';

export default function FeaturedListings() {
  const [villas, setVillas] = useState([]);
  const [tours, setTours] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  const load = useCallback(async () => {
    setLoading(true);
    setError('');
    try {
      const [loadedVillas, loadedTours] = await Promise.all([
        fetchCollection('penginapan', 3),
        fetchCollection('tours', 3),
      ]);
      setVillas(orFallback(loadedVillas, FALLBACK_PENGINAPAN).slice(0, 3));
      setTours(orFallback(loadedTours, FALLBACK_TOURS).slice(0, 3));
    } catch (err) {
      console.warn('Firestore fallback activated:', err);
      setVillas(FALLBACK_PENGINAPAN.slice(0, 3));
      setTours(FALLBACK_TOURS.slice(0, 3));
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    load();
  }, [load]);

  return (
    <>
      <section className="border-t border-stone-200/80 bg-[#F8F7F3] py-12 sm:py-16">
        <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
          <div className="mb-8 grid gap-3 sm:grid-cols-[1fr_auto] sm:items-end">
            <div>
              <h2 className="font-display text-3xl font-bold text-ink sm:text-4xl">Kamar, cabin, dan villa</h2>
              <p className="mt-2 max-w-md text-sm text-stone-600">
                Pilih unit, kirim tanggal check-in ke admin. Pembayaran tidak diproses di web.
              </p>
            </div>
            <Link href="/penginapan" className="text-sm font-semibold text-forest hover:text-forest-light transition-colors">
              Katalog penginapan &rarr;
            </Link>
          </div>
          <ListingStatus
            loading={loading}
            error={error}
            empty={!loading && !error && villas.length === 0}
            loadingLabel="Memuat penginapan..."
            emptyTitle="Belum ada penginapan di katalog"
            emptyBody="Admin masih menambahkan listing. Chat WhatsApp untuk tanya ketersediaan malam ini."
            onRetry={load}
          />
          {!loading && villas.length > 0 ? (
            <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
              {villas.map((item) => (
                <VillaCard key={item.id} {...item} />
              ))}
            </div>
          ) : null}
        </div>
      </section>

      <section className="border-t border-stone-200/80 bg-[#F8F7F3] py-12 sm:py-16">
        <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
          <div className="mb-8 lg:grid lg:grid-cols-12 lg:items-end lg:gap-8">
            <div className="lg:col-span-8">
              <h2 className="font-display text-3xl font-bold text-ink sm:text-4xl">Jeep, sunrise, dan trip privat</h2>
              <p className="mt-2 max-w-lg text-sm text-stone-600">
                Harga jeep biasanya per kendaraan. Open trip dihitung per orang. Admin yang memastikan slot.
              </p>
            </div>
            <div className="mt-3 lg:col-span-4 lg:text-right">
              <Link href="/tours" className="text-sm font-semibold text-forest hover:text-forest-light transition-colors">
                Katalog paket wisata &rarr;
              </Link>
            </div>
          </div>
          <ListingStatus
            loading={loading}
            error={error}
            empty={!loading && !error && tours.length === 0}
            loadingLabel="Memuat paket wisata..."
            emptyTitle="Belum ada paket di katalog"
            emptyBody="Paket sedang diperbarui. Tanyakan itinerary langsung ke admin."
            onRetry={load}
          />
          {!loading && tours.length > 0 ? (
            <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
              {tours.map((item) => (
                <TourCard key={item.id} {...item} />
              ))}
            </div>
          ) : null}
        </div>
      </section>
    </>
  );
}