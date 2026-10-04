"use client";

import { useState } from 'react';

export default function ImageGallery({ images = [], alt = "Foto Kediengaja" }) {
  const [activeIdx, setActiveIdx] = useState(0);

  if (!images || images.length === 0) {
    return (
      <div className="flex h-64 w-full items-center justify-center rounded-xl bg-stone-100 text-stone-400">
        Tidak ada foto tersedia
      </div>
    );
  }

  const activeImage = images[activeIdx] || images[0];

  return (
    <div className="space-y-3">
      {/* Main Image */}
      <div className="relative overflow-hidden rounded-xl bg-stone-100 border border-stone-200">
        <img
          src={activeImage}
          alt={`${alt} - Foto ${activeIdx + 1}`}
          className="h-72 w-full object-cover sm:h-96 lg:h-[28rem] transition-all duration-300"
        />
        {images.length > 1 && (
          <span className="absolute bottom-3 right-3 rounded-full bg-ink/75 px-3 py-1 text-xs font-medium text-white backdrop-blur-sm">
            {activeIdx + 1} / {images.length}
          </span>
        )}
      </div>

      {/* Thumbnail Strip */}
      {images.length > 1 && (
        <div className="flex gap-2 overflow-x-auto pb-1">
          {images.map((img, idx) => (
            <button
              key={idx}
              type="button"
              onClick={() => setActiveIdx(idx)}
              className={`relative h-16 w-20 flex-shrink-0 overflow-hidden rounded-lg border-2 transition-all ${
                activeIdx === idx
                  ? 'border-clay shadow-sm scale-95'
                  : 'border-transparent opacity-70 hover:opacity-100'
              }`}
            >
              <img
                src={img}
                alt={`${alt} thumbnail ${idx + 1}`}
                className="h-full w-full object-cover"
              />
            </button>
          ))}
        </div>
      )}
    </div>
  );
}
