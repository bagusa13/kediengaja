"use client";

import { useCallback, useEffect, useState } from 'react';
import { collection, getDocs, query, orderBy } from 'firebase/firestore';
import { db } from '@/lib/firebase';
import VillaCard from '@/components/VillaCard';
import ListingStatus from '@/components/ListingStatus';
import WhatsAppButton from '@/components/WhatsAppButton';
import { FALLBACK_PENGINAPAN } from '@/lib/mockData';

export default function PenginapanList() {
  const [penginapan, setPenginapan] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  const fetchPenginapan = useCallback(async () => {
    setLoading(true);
    setError('');
    try {
      const q = query(collection(db, 'penginapan'), orderBy('createdAt', 'desc'));
      const querySnapshot = await getDocs(q);
      const data = querySnapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() }));
      setPenginapan(data.length > 0 ? data : FALLBACK_PENGINAPAN);
    } catch (err) {
      console.warn('Firestore fallback activated:', err);
      setPenginapan(FALLBACK_PENGINAPAN);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchPenginapan();
  }, [fetchPenginapan]);

  return (
    <main>
      <section className="border-b border-stone-200 bg-moss px-4 py-12 text-white sm:px-6 lg:px-8 lg:py-16">
        <div className="mx-auto max-w-6xl">
          <p className="text-xs uppercase tracking-wider text-amber-200 font-semibold">Katalog Menginap</p>
          <h1 className="mt-2 font-display text-4xl sm:text-5xl">Penginapan Estetik Dieng</h1>
          <p className="mt-3 max-w-xl text-stone-200 text-base sm:text-lg">
            Pilihan Cabin House kayu, homestay hangat, dan villa view pegunungan. Booking dan konfirmasi ketersediaan langsung via WhatsApp.
          </p>
        </div>
      </section>

      <section className="mx-auto max-w-6xl px-4 py-12 sm:px-6 lg:px-8">
        <ListingStatus
          loading={loading}
          error={error}
          empty={!loading && !error && penginapan.length === 0}
          loadingLabel="Memuat penginapan..."
          emptyTitle="Belum ada penginapan di katalog"
          emptyBody="Admin masih menambahkan listing. Anda bisa langsung chat admin untuk menanyakan ketersediaan kamar hari ini."
          onRetry={fetchPenginapan}
        />

        {!loading && penginapan.length > 0 ? (
          <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {penginapan.map((item) => (
              <VillaCard key={item.id} {...item} />
            ))}
          </div>
        ) : null}

        <div className="mt-14 rounded-xl border border-stone-200 bg-white p-6 sm:p-8">
          <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
            <div>
              <h2 className="font-display text-2xl text-ink">Butuh rekomendasi penginapan?</h2>
              <p className="mt-1 text-sm text-stone-600">
                Sebutkan tanggal check-in, kapasitas orang, dan budget Anda. Admin akan carikan yang paling pas.
              </p>
            </div>
            <div className="flex-shrink-0">
              <WhatsAppButton
                message="Halo Admin Kediengaja, saya butuh rekomendasi penginapan untuk liburan ke Dieng."
                className="bg-wa hover:bg-[#0c573d] text-white font-semibold"
              >
                Konsultasi Penginapan
              </WhatsAppButton>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}
