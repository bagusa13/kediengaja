"use client";

import { useEffect, useState } from 'react';
import Link from 'next/link';
import { doc, getDoc } from 'firebase/firestore';
import { Clock, MapPin, CheckCircle2 } from 'lucide-react';
import { db } from '@/lib/firebase';
import BookingForm from '@/components/BookingForm';
import ImageGallery from '@/components/ImageGallery';
import { formatRupiah, tourCover } from '@/lib/covers';
import { FALLBACK_TOURS } from '@/lib/mockData';

export default function TourDetail({ params }) {
  const { id } = params;
  const [item, setItem] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    async function load() {
      setError('');
      try {
        const snap = await getDoc(doc(db, 'tours', id));
        if (snap.exists()) {
          setItem({ id: snap.id, ...snap.data() });
        } else {
          const fallback = FALLBACK_TOURS.find(t => t.id === id);
          if (fallback) setItem(fallback);
        }
      } catch (err) {
        console.warn('Firestore fallback activated for tour detail:', err);
        const fallback = FALLBACK_TOURS.find(t => t.id === id);
        if (fallback) {
          setItem(fallback);
        } else {
          setError('Paket tidak bisa dimuat.');
        }
      } finally {
        setLoading(false);
      }
    }
    load();
  }, [id]);

  if (loading) {
    return <div className="flex min-h-[40vh] items-center justify-center text-sm text-moss">Memuat paket...</div>;
  }

  if (error) {
    return (
      <main className="mx-auto max-w-lg px-4 py-24 text-center">
        <h1 className="font-display text-3xl text-ink">Gagal memuat</h1>
        <p className="mt-3 text-stone-600">{error}</p>
        <Link href="/tours" className="mt-6 inline-block font-semibold text-clay hover:underline">
          Kembali ke paket wisata
        </Link>
      </main>
    );
  }

  if (!item) {
    return (
      <main className="mx-auto max-w-lg px-4 py-24 text-center">
        <h1 className="font-display text-3xl text-ink">Paket tidak ditemukan</h1>
        <p className="mt-3 text-stone-600">Data mungkin sudah dihapus atau tautannya salah.</p>
        <Link href="/tours" className="mt-6 inline-block font-semibold text-clay hover:underline">
          Kembali ke paket wisata
        </Link>
      </main>
    );
  }

  const galleryImages = item.galeri && item.galeri.length > 0 ? item.galeri : [tourCover(item)];
  const destinasi = item.destinasi || [];
  const termasuk = item.termasuk || [];

  return (
    <main className="mx-auto max-w-6xl px-4 py-8 sm:px-6 lg:px-8 lg:py-12">
      <Link href="/tours" className="text-sm font-medium text-moss hover:text-clay">
        ← Semua paket wisata &amp; Jeep
      </Link>

      <div className="mt-5 grid gap-8 lg:grid-cols-[minmax(0,1.4fr)_minmax(320px,0.8fr)] lg:items-start">
        <article>
          {/* Multi-Photo Gallery */}
          <ImageGallery images={galleryImages} alt={item.nama} />

          <div className="mt-6">
            <span className="inline-block rounded bg-clay/10 px-3 py-1 text-xs font-semibold text-clay">
              {item.tipe || 'Fun Jeep Wisata'}
            </span>
            <h1 className="mt-3 font-display text-3xl text-ink sm:text-4xl">{item.nama}</h1>
            <div className="mt-3 flex flex-wrap gap-4 text-sm text-stone-600">
              <span className="flex items-center gap-1">
                <MapPin className="h-4 w-4" aria-hidden="true" /> {item.lokasi}
              </span>
              {item.durasi ? (
                <span className="flex items-center gap-1">
                  <Clock className="h-4 w-4" aria-hidden="true" /> {item.durasi}
                </span>
              ) : null}
            </div>

            <div className="mt-6 border-t border-stone-200 pt-6">
              <h2 className="font-display text-xl text-ink mb-3">Tentang Paket Wisata</h2>
              <p className="leading-relaxed text-stone-700">{item.deskripsi}</p>
            </div>

            {destinasi.length > 0 ? (
              <div className="mt-8 border-t border-stone-200 pt-6">
                <h2 className="mb-3 font-display text-xl text-ink">Destinasi yang Dikunjungi</h2>
                <div className="flex flex-wrap gap-2">
                  {destinasi.map((dest) => (
                    <span key={dest} className="rounded-lg border border-stone-200 bg-white px-3.5 py-1.5 text-sm font-medium text-moss shadow-sm">
                      📍 {dest}
                    </span>
                  ))}
                </div>
              </div>
            ) : null}

            {termasuk.length > 0 ? (
              <div className="mt-8 border-t border-stone-200 pt-6">
                <h2 className="mb-3 font-display text-xl text-ink">Fasilitas Termasuk</h2>
                <ul className="grid gap-2.5 text-sm text-stone-700 sm:grid-cols-2">
                  {termasuk.map((row) => (
                    <li key={row} className="flex items-center gap-2 rounded-lg bg-white p-3 border border-stone-200 shadow-sm">
                      <CheckCircle2 className="h-4 w-4 text-moss flex-shrink-0" />
                      <span>{row}</span>
                    </li>
                  ))}
                </ul>
              </div>
            ) : null}
          </div>
        </article>

        {/* Sticky Booking Form Sidebar */}
        <aside className="rounded-xl border border-stone-200 bg-white p-6 shadow-lift lg:sticky lg:top-24">
          <p className="text-xs text-stone-600">Harga mulai dari</p>
          <p className="mb-5 text-2xl font-bold text-clay">
            {formatRupiah(item.harga)}
            <span className="text-sm font-normal text-stone-600">/orang /mobil</span>
          </p>
          <BookingForm kind="tour" itemName={item.nama} defaultPax={2} />
        </aside>
      </div>
    </main>
  );
}
