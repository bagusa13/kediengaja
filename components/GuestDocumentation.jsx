"use client";

import { useEffect, useState } from 'react';
import { doc, getDoc } from 'firebase/firestore';
import { db } from '@/lib/firebase';
import PolaroidLineCarousel from '@/components/ui/polaroid-line-carousel';
import { DEFAULT_POLAROID_SLIDES } from '@/lib/mockData';

export default function GuestDocumentation() {
  const [slides, setSlides] = useState(DEFAULT_POLAROID_SLIDES);

  useEffect(() => {
    async function loadGallery() {
      try {
        const snap = await getDoc(doc(db, 'settings', 'gallery'));
        if (snap.exists() && snap.data()?.slides?.length > 0) {
          setSlides(snap.data().slides);
        }
      } catch (err) {
        console.warn('Load gallery settings fallback:', err);
      }
    }
    loadGallery();
  }, []);

  return (
    <section className="border-t border-stone-200/70 bg-cream py-16 sm:py-24 overflow-hidden">
      <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
        <div className="mb-8 flex flex-col sm:flex-row sm:items-end sm:justify-between gap-3">
          <div>
            <p className="text-xs font-bold tracking-wider uppercase text-forest">
              Momen Nyata
            </p>
            <h2 className="mt-2 font-display text-2xl font-bold tracking-tight text-ink sm:text-3xl lg:text-4xl">
              Dokumentasi &amp; Suasana Dieng
            </h2>
            <p className="mt-2 text-xs sm:text-sm text-stone-600">
              Foto asli para tamu dan kehangatan perjalanan di Dataran Tinggi Dieng.
            </p>
          </div>
          <p className="text-xs text-stone-500 hidden sm:block">
            Geser foto ke samping untuk melihat dokumentasi lainnya
          </p>
        </div>

        {/* POLAROID LINE CAROUSEL CONTAINER */}
        <div className="rounded-xl border border-stone-200/80 bg-white p-3 shadow-xs sm:p-5">
          <PolaroidLineCarousel slides={slides} autoPlay={false} />
        </div>
      </div>
    </section>
  );
}
