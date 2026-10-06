"use client";

import { useEffect, useState } from 'react';

export default function ImageGallery({ images = [], alt = 'Foto Kediengaja' }) {
  const [activeIdx, setActiveIdx] = useState(0);
  const total = images.length;

  useEffect(() => {
    if (total < 2) return undefined;
    function onKey(e) {
      if (e.key === 'ArrowRight') setActiveIdx((i) => (i + 1) % total);
      if (e.key === 'ArrowLeft') setActiveIdx((i) => (i - 1 + total) % total);
    }
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [total]);

  if (!total) {
    return (
      <div className="flex h-64 w-full items-center justify-center rounded-md bg-stone-100 text-sm text-stone-600">
        Foto belum diunggah
      </div>
    );
  }

  const activeImage = images[activeIdx] || images[0];

  return (
    <div className="space-y-3">
      <div className="relative overflow-hidden rounded-md bg-stone-100">
        <img
          src={activeImage}
          alt={`${alt}, foto ${activeIdx + 1} dari ${total}`}
          className="h-72 w-full object-cover sm:h-96 lg:h-[28rem]"
        />
        {total > 1 ? (
          <span className="absolute bottom-3 right-3 rounded bg-ink/80 px-2.5 py-1 text-xs font-medium text-white">
            {activeIdx + 1} / {total}
          </span>
        ) : null}
      </div>

      {total > 1 ? (
        <div className="flex gap-2 overflow-x-auto pb-1">
          {images.map((img, idx) => (
            <button
              key={`${img}-${idx}`}
              type="button"
              onClick={() => setActiveIdx(idx)}
              aria-pressed={activeIdx === idx}
              aria-label={`Lihat foto ${idx + 1}`}
              className={`relative h-16 w-20 shrink-0 overflow-hidden rounded-md ${
                activeIdx === idx ? 'ring-2 ring-clay ring-offset-2' : 'opacity-70 hover:opacity-100'
              }`}
            >
              <img src={img} alt="" className="h-full w-full object-cover" />
            </button>
          ))}
        </div>
      ) : null}
    </div>
  );
}