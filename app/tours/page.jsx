"use client";

import { useCallback, useEffect, useState } from 'react';
import { collection, getDocs, query, orderBy } from 'firebase/firestore';
import { db } from '@/lib/firebase';
import TourCard from '@/components/TourCard';
import ListingStatus from '@/components/ListingStatus';
import WhatsAppButton from '@/components/WhatsAppButton';
import { FALLBACK_TOURS } from '@/lib/mockData';

export default function ToursPage() {
  const [tours, setTours] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  const fetchTours = useCallback(async () => {
    setLoading(true);
    setError('');
    try {
      const q = query(collection(db, 'tours'), orderBy('createdAt', 'desc'));
      const querySnapshot = await getDocs(q);
      const data = querySnapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() }));
      setTours(data.length > 0 ? data : FALLBACK_TOURS);
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

  return (
    <main>
      <section className="relative isolate overflow-hidden px-4 py-14 sm:px-6 lg:px-8 lg:py-20">
        <img
          src="https://images.unsplash.com/photo-1469474968028-56623f02e42e?auto=format&fit=crop&w=1920&q=80"
          alt="Lereng dataran tinggi Dieng"
          className="absolute inset-0 h-full w-full object-cover"
        />
        <div className="absolute inset-0 bg-ink/75" />
        <div className="relative mx-auto max-w-6xl text-white">
          <p className="text-xs uppercase tracking-wider text-amber-200 font-semibold">Katalog Trip &amp; Jeep</p>
          <h1 className="mt-2 font-display text-4xl sm:text-5xl">Fun Jeep &amp; Paket Wisata Dieng</h1>
          <p className="mt-3 max-w-xl text-stone-200 text-base sm:text-lg">
            Petualangan armada Jeep 4x4, Open Trip Golden Sunrise Sikunir, hingga Private Trip All-In. Pilih paket, jadwal fleksibel, bayar via WhatsApp.
          </p>
        </div>
      </section>

      <section className="mx-auto max-w-6xl px-4 py-12 sm:px-6 lg:px-8">
        <ListingStatus
          loading={loading}
          error={error}
          empty={!loading && !error && tours.length === 0}
          loadingLabel="Memuat paket wisata..."
          emptyTitle="Belum ada paket di katalog"
          emptyBody="Paket sedang diperbarui. Anda bisa langsung chat admin untuk menanyakan ketersediaan armada Jeep atau jadwal Open Trip."
          onRetry={fetchTours}
        />

        {!loading && tours.length > 0 ? (
          <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {tours.map((item) => (
              <TourCard key={item.id} {...item} />
            ))}
          </div>
        ) : null}

        <div className="mt-14 rounded-xl border border-stone-200 bg-white p-6 sm:p-8">
          <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
            <div>
              <h2 className="font-display text-2xl text-ink">Ingin custom rute trip atau sewa Jeep?</h2>
              <p className="mt-1 text-sm text-stone-600">
                Mau request rute kawah, savana, atau antar-jemput stasiun/bandara? Chat admin untuk penawaran khusus.
              </p>
            </div>
            <div className="flex-shrink-0">
              <WhatsAppButton
                message="Halo Admin Kediengaja, saya ingin konsultasi custom paket trip / sewa Jeep di Dieng."
                className="bg-wa hover:bg-[#0c573d] text-white font-semibold"
              >
                Konsultasi Paket Trip
              </WhatsAppButton>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}
