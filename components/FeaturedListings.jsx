"use client";

import { useCallback, useEffect, useState } from 'react';
import Link from 'next/link';
import { collection, getDocs, limit, query } from 'firebase/firestore';
import { db } from '@/lib/firebase';
import VillaCard from '@/components/VillaCard';
import TourCard from '@/components/TourCard';
import ListingStatus from '@/components/ListingStatus';
import { FALLBACK_PENGINAPAN, FALLBACK_TOURS } from '@/lib/mockData';

export default function FeaturedListings() {
  const [villas, setVillas] = useState([]);
  const [tours, setTours] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  const load = useCallback(async () => {
    setLoading(true);
    setError('');
    try {
      const [villaSnap, tourSnap] = await Promise.all([
        getDocs(query(collection(db, 'penginapan'), limit(3))),
        getDocs(query(collection(db, 'tours'), limit(3))),
      ]);
      const loadedVillas = villaSnap.docs.map((doc) => ({ id: doc.id, ...doc.data() }));
      const loadedTours = tourSnap.docs.map((doc) => ({ id: doc.id, ...doc.data() }));

      setVillas(loadedVillas.length > 0 ? loadedVillas : FALLBACK_PENGINAPAN);
      setTours(loadedTours.length > 0 ? loadedTours : FALLBACK_TOURS);
    } catch (err) {
      console.warn('Firestore fallback activated:', err);
      // Graceful fallback to initial aesthetic Dieng data
      setVillas(FALLBACK_PENGINAPAN);
      setTours(FALLBACK_TOURS);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    load();
  }, [load]);

  return (
    <>
      <section className="border-t border-stone-200 bg-white py-14 sm:py-20">
        <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
          <div className="mb-8 flex flex-wrap items-end justify-between gap-3">
            <div>
              <p className="text-xs font-semibold uppercase tracking-wider text-clay">Katalog Pilihan</p>
              <h2 className="mt-1 font-display text-3xl text-ink sm:text-4xl">Penginapan Estetik</h2>
              <p className="mt-2 max-w-md text-sm text-stone-600">Cabin house, homestay, dan villa Dieng. Booking langsung lewat WhatsApp.</p>
            </div>
            <Link href="/penginapan" className="text-sm font-semibold text-clay hover:underline">
              Semua penginapan →
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

      <section className="py-14 sm:py-20">
        <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
          <div className="mb-8 flex flex-wrap items-end justify-between gap-3">
            <div>
              <p className="text-xs font-semibold uppercase tracking-wider text-moss">Petualangan &amp; Trip</p>
              <h2 className="mt-1 font-display text-3xl text-ink sm:text-4xl">Paket Tour &amp; Fun Jeep</h2>
              <p className="mt-2 max-w-md text-sm text-stone-600">Armada Fun Jeep 4x4, Open Trip Sunrise Sikunir, dan Private Trip lengkap.</p>
            </div>
            <Link href="/tours" className="text-sm font-semibold text-clay hover:underline">
              Semua paket trip →
            </Link>
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
