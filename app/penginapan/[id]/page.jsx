"use client";

import { useEffect, useState } from 'react';
import Link from 'next/link';
import { doc, getDoc } from 'firebase/firestore';
import { MapPin, Users, CheckCircle2 } from 'lucide-react';
import { db } from '@/lib/firebase';
import BookingForm from '@/components/BookingForm';
import ImageGallery from '@/components/ImageGallery';
import { formatRupiah, villaCover } from '@/lib/covers';
import { FALLBACK_PENGINAPAN } from '@/lib/mockData';

export default function PenginapanDetail({ params }) {
  const { id } = params;
  const [item, setItem] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    async function load() {
      setError('');
      try {
        const snap = await getDoc(doc(db, 'penginapan', id));
        if (snap.exists()) {
          setItem({ id: snap.id, ...snap.data() });
        } else {
          const fallback = FALLBACK_PENGINAPAN.find(p => p.id === id);
          if (fallback) setItem(fallback);
        }
      } catch (err) {
        console.warn('Firestore fallback activated for detail:', err);
        const fallback = FALLBACK_PENGINAPAN.find(p => p.id === id);
        if (fallback) {
          setItem(fallback);
        } else {
          setError('Penginapan tidak bisa dimuat.');
        }
      } finally {
        setLoading(false);
      }
    }
    load();
  }, [id]);

  if (loading) {
    return (
      <div className="flex min-h-[40vh] items-center justify-center text-sm text-moss">Memuat penginapan...</div>
    );
  }

  if (error) {
    return (
      <main className="mx-auto max-w-lg px-4 py-24 text-center">
        <h1 className="font-display text-3xl text-ink">Gagal memuat</h1>
        <p className="mt-3 text-stone-600">{error}</p>
        <Link href="/penginapan" className="mt-6 inline-block font-semibold text-clay hover:underline">
          Kembali ke daftar penginapan
        </Link>
      </main>
    );
  }

  if (!item) {
    return (
      <main className="mx-auto max-w-lg px-4 py-24 text-center">
        <h1 className="font-display text-3xl text-ink">Penginapan tidak ditemukan</h1>
        <p className="mt-3 text-stone-600">Data mungkin sudah dihapus atau tautannya salah.</p>
        <Link href="/penginapan" className="mt-6 inline-block font-semibold text-clay hover:underline">
          Kembali ke daftar penginapan
        </Link>
      </main>
    );
  }

  const galleryImages = item.galeri && item.galeri.length > 0 ? item.galeri : [villaCover(item)];
  const fasilitas = item.fasilitas || [
    "Water Heater Panas 24 Jam",
    "Kamar Mandi Dalam",
    "Fasilitas Teh & Kopi",
    "Akses Dekat Wisata"
  ];

  return (
    <main className="mx-auto max-w-6xl px-4 py-8 sm:px-6 lg:px-8 lg:py-12">
      <Link href="/penginapan" className="text-sm font-medium text-moss hover:text-clay">
        ← Semua penginapan
      </Link>

      <div className="mt-5 grid gap-8 lg:grid-cols-[minmax(0,1.4fr)_minmax(320px,0.8fr)] lg:items-start">
        <article>
          {/* Multi-Photo Gallery */}
          <ImageGallery images={galleryImages} alt={item.nama} />

          <div className="mt-6">
            <span className="inline-block rounded bg-stone-100 px-3 py-1 text-xs font-semibold text-moss">
              {item.tipe || 'Cabin House'}
            </span>
            <h1 className="mt-3 font-display text-3xl text-ink sm:text-4xl">{item.nama}</h1>
            <div className="mt-3 flex flex-wrap gap-4 text-sm text-stone-600">
              <span className="flex items-center gap-1">
                <MapPin className="h-4 w-4" aria-hidden="true" /> {item.lokasi}
              </span>
              <span className="flex items-center gap-1">
                <Users className="h-4 w-4" aria-hidden="true" /> Kapasitas {item.kapasitas} orang
              </span>
            </div>

            <div className="mt-6 border-t border-stone-200 pt-6">
              <h2 className="font-display text-xl text-ink mb-3">Tentang Penginapan</h2>
              <p className="leading-relaxed text-stone-700">{item.deskripsi}</p>
            </div>

            {/* Fasilitas Kamar */}
            <div className="mt-8 border-t border-stone-200 pt-6">
              <h2 className="font-display text-xl text-ink mb-4">Fasilitas Utama</h2>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                {fasilitas.map((f, i) => (
                  <div key={i} className="flex items-center gap-2 text-sm text-stone-700 bg-white p-3 rounded-lg border border-stone-200">
                    <CheckCircle2 className="h-4 w-4 text-moss flex-shrink-0" />
                    <span>{f}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </article>

        {/* Sticky Booking Form Sidebar */}
        <aside className="rounded-xl border border-stone-200 bg-white p-6 shadow-lift lg:sticky lg:top-24">
          <p className="text-xs text-stone-600">Harga mulai dari</p>
          <p className="mb-5 text-2xl font-bold text-clay">
            {formatRupiah(item.harga)}
            <span className="text-sm font-normal text-stone-600">/malam</span>
          </p>
          <BookingForm
            kind="stay"
            itemName={item.nama}
            defaultPax={item.kapasitas ? Math.min(Number(item.kapasitas), 4) : 2}
          />
        </aside>
      </div>
    </main>
  );
}
