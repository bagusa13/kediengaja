"use client";

import { useEffect, useRef, useState } from 'react';
import { ChevronLeft, ChevronRight, Maximize2, X, Play, Pause } from 'lucide-react';

const NATURAL_TILTS = [-2.5, 1.8, -1.2, 2.4, -2.8, 1.5, -2.0, 2.2, -1.6, 2.0];

export default function PolaroidLineCarousel({
  slides = [],
  className = '',
  autoPlay = false,
  autoPlayInterval = 3500,
}) {
  const scrollRef = useRef(null);
  const [canScrollLeft, setCanScrollLeft] = useState(false);
  const [canScrollRight, setCanScrollRight] = useState(true);
  const [isDragging, setIsDragging] = useState(false);
  const [startX, setStartX] = useState(0);
  const [scrollStart, setScrollStart] = useState(0);
  const [activeModalSlide, setActiveModalSlide] = useState(null);
  const [isPlaying, setIsPlaying] = useState(autoPlay);

  const checkScroll = () => {
    const el = scrollRef.current;
    if (!el) return;
    setCanScrollLeft(el.scrollLeft > 10);
    setCanScrollRight(el.scrollLeft < el.scrollWidth - el.clientWidth - 10);
  };

  useEffect(() => {
    checkScroll();
    const el = scrollRef.current;
    if (!el) return;
    el.addEventListener('scroll', checkScroll, { passive: true });
    window.addEventListener('resize', checkScroll);
    return () => {
      el.removeEventListener('scroll', checkScroll);
      window.removeEventListener('resize', checkScroll);
    };
  }, [slides]);

  // Autoplay loop
  useEffect(() => {
    if (!isPlaying || isDragging) return;
    const interval = setInterval(() => {
      const el = scrollRef.current;
      if (!el) return;
      if (el.scrollLeft >= el.scrollWidth - el.clientWidth - 20) {
        el.scrollTo({ left: 0, behavior: 'smooth' });
      } else {
        el.scrollBy({ left: 300, behavior: 'smooth' });
      }
    }, autoPlayInterval);

    return () => clearInterval(interval);
  }, [isPlaying, isDragging, autoPlayInterval]);

  const scroll = (direction) => {
    const el = scrollRef.current;
    if (!el) return;
    const offset = direction === 'left' ? -320 : 320;
    el.scrollBy({ left: offset, behavior: 'smooth' });
  };

  // Pointer drag gestures
  const onPointerDown = (e) => {
    const el = scrollRef.current;
    if (!el) return;
    setIsDragging(true);
    setStartX(e.pageX - el.offsetLeft);
    setScrollStart(el.scrollLeft);
  };

  const onPointerMove = (e) => {
    if (!isDragging) return;
    e.preventDefault();
    const el = scrollRef.current;
    if (!el) return;
    const x = e.pageX - el.offsetLeft;
    const walk = (x - startX) * 1.3;
    el.scrollLeft = scrollStart - walk;
  };

  const onPointerUp = () => {
    setIsDragging(false);
  };

  if (!slides || slides.length === 0) return null;

  return (
    <div className={`relative w-full select-none ${className}`}>
      {/* 1. HEADER KONTROL (Judul status & tombol geser) */}
      <div className="mb-4 flex items-center justify-between px-2 sm:px-4">
        <div className="flex items-center gap-2">
          <span className="text-xs font-bold tracking-wider uppercase text-stone-500">
            Galeri Polaroid ({slides.length} Momen)
          </span>
          <button
            type="button"
            onClick={() => setIsPlaying(!isPlaying)}
            className="inline-flex cursor-pointer items-center gap-1 rounded-full border border-stone-200 bg-white px-2.5 py-1 text-[11px] font-semibold text-stone-600 shadow-xs hover:bg-stone-50 active:scale-95 transition"
            title={isPlaying ? 'Jeda otomatis' : 'Mulai geser otomatis'}
          >
            {isPlaying ? (
              <>
                <Pause className="h-3 w-3 text-emerald-600" />
                <span>Jeda</span>
              </>
            ) : (
              <>
                <Play className="h-3 w-3 text-stone-500" />
                <span>Putar</span>
              </>
            )}
          </button>
        </div>

        <div className="flex items-center gap-2">
          <button
            type="button"
            onClick={() => scroll('left')}
            disabled={!canScrollLeft}
            className={`flex h-9 w-9 items-center justify-center rounded-full border border-stone-200 bg-white shadow-soft transition-all ${
              canScrollLeft
                ? 'cursor-pointer text-stone-700 hover:bg-stone-100 hover:scale-105 active:scale-95'
                : 'cursor-not-allowed text-stone-300 opacity-40'
            }`}
            aria-label="Geser ke kiri"
          >
            <ChevronLeft className="h-4 w-4" />
          </button>
          <button
            type="button"
            onClick={() => scroll('right')}
            disabled={!canScrollRight}
            className={`flex h-9 w-9 items-center justify-center rounded-full border border-stone-200 bg-white shadow-soft transition-all ${
              canScrollRight
                ? 'cursor-pointer text-stone-700 hover:bg-stone-100 hover:scale-105 active:scale-95'
                : 'cursor-not-allowed text-stone-300 opacity-40'
            }`}
            aria-label="Geser ke kanan"
          >
            <ChevronRight className="h-4 w-4" />
          </button>
        </div>
      </div>

      {/* 2. AREA TALI GANTUNG & JEPITAN KAYU (PHYSICAL ROPE & PEG TRACK) */}
      <div className="relative mx-auto w-full max-w-7xl">
        {/* TALI / TALI JEMURAN FISIK (Continuous Gallery Hanging Rope) */}
        {/* Posisi Y: tepat 24px dari atas area scroll, menembus tepat di tengah lekukan jepitan kayu */}
        <div className="pointer-events-none absolute left-0 right-0 top-[24px] z-10">
          {/* Bayangan halus tali di latar belakang */}
          <div className="absolute -top-[1px] left-3 right-3 h-[3px] bg-stone-900/15 blur-[1px]" />
          {/* Badan tali utama bertekstur rami / wire rope */}
          <div className="relative left-2 right-2 h-[2.5px] rounded-full bg-gradient-to-r from-[#7a6b5a] via-[#a89a87] to-[#7a6b5a] shadow-xs border-y border-[#5f5344]/30" />
        </div>

        {/* Pin pengait dinding di ujung kiri dan kanan tali */}
        <div
          className="pointer-events-none absolute left-1 top-[24px] z-20 -translate-y-1/2 flex items-center justify-center"
          title="Pengait Tali Kiri"
        >
          <div className="h-4.5 w-4.5 rounded-full border border-stone-500 bg-gradient-to-br from-stone-600 via-stone-700 to-stone-900 shadow-md flex items-center justify-center">
            <div className="h-1.5 w-1.5 rounded-full bg-stone-400" />
          </div>
        </div>

        <div
          className="pointer-events-none absolute right-1 top-[24px] z-20 -translate-y-1/2 flex items-center justify-center"
          title="Pengait Tali Kanan"
        >
          <div className="h-4.5 w-4.5 rounded-full border border-stone-500 bg-gradient-to-br from-stone-600 via-stone-700 to-stone-900 shadow-md flex items-center justify-center">
            <div className="h-1.5 w-1.5 rounded-full bg-stone-400" />
          </div>
        </div>

        {/* TRACK FOTO POLAROID BERGESER */}
        <div
          ref={scrollRef}
          onPointerDown={onPointerDown}
          onPointerMove={onPointerMove}
          onPointerUp={onPointerUp}
          onPointerLeave={onPointerUp}
          className={`flex gap-6 overflow-x-auto pb-8 pt-2 px-6 no-scrollbar ${
            isDragging ? 'cursor-grabbing select-none' : 'cursor-grab'
          }`}
          style={{
            scrollSnapType: isDragging ? 'none' : 'x mandatory',
            WebkitOverflowScrolling: 'touch',
            scrollbarWidth: 'none',
            msOverflowStyle: 'none',
          }}
        >
          {slides.map((slide, idx) => {
            const rot = NATURAL_TILTS[idx % NATURAL_TILTS.length];
            return (
              <div
                key={`${slide.image}-${idx}`}
                className="group relative flex-none"
                style={{
                  scrollSnapAlign: 'center',
                  // Pivot tepat pada titik tembus tali di koordinat peg (y: 22px dari atas wrapper kartu)
                  transformOrigin: '50% 22px',
                  transform: `rotate(${rot}deg)`,
                  transition: 'transform 0.35s cubic-bezier(0.34, 1.56, 0.64, 1), box-shadow 0.3s ease',
                }}
              >
                {/* JEPITAN KAYU ASLI (REALISTIC CLOTHESPIN / PEG) */}
                {/* Bagian jepitan diposisikan sedemikian rupa sehingga tali menembus tepat di lekukan tengahnya */}
                <div className="relative mx-auto z-20 flex flex-col items-center pointer-events-none w-4 h-9 -mb-3">
                  {/* Kepala jepitan atas (di atas tali) */}
                  <div className="w-3.5 h-3.5 rounded-t-xs bg-gradient-to-b from-[#e3b888] to-[#d4a373] border-t border-x border-[#8c5638]/40 shadow-xs flex items-center justify-center">
                    <div className="w-1.5 h-0.5 bg-[#8c5638]/30 rounded-full" />
                  </div>

                  {/* Lekukan jepitan & kawat pegas logam (tempat tali lewat tepat di sini) */}
                  <div className="w-4 h-2 bg-gradient-to-r from-[#a8a29e] via-[#e7e5e4] to-[#a8a29e] border border-stone-600/50 shadow-xs flex items-center justify-center my-[-1px] z-30">
                    <div className="w-2.5 h-0.5 bg-stone-700/40 rounded-full" />
                  </div>

                  {/* Kaki jepitan bawah (menjepit kertas polaroid) */}
                  <div className="w-3.5 h-3.5 rounded-b-xs bg-gradient-to-b from-[#d4a373] to-[#b88258] border-b border-x border-[#8c5638]/50 shadow-sm flex items-center justify-center">
                    <div className="w-1.5 h-0.5 bg-[#8c5638]/30 rounded-full" />
                  </div>
                </div>

                {/* BINGKAI FOTO POLAROID KLASIK */}
                <div
                  onClick={() => setActiveModalSlide(slide)}
                  className="relative w-[260px] cursor-pointer rounded-xs border border-stone-200/90 bg-[#fafafa] p-3 pb-6 shadow-md transition-all group-hover:rotate-0 group-hover:scale-[1.03] group-hover:shadow-2xl sm:w-[280px]"
                >
                  {/* Area Gambar Foto */}
                  <div className="relative aspect-[4/3] w-full overflow-hidden bg-stone-900 shadow-inner rounded-xs">
                    <img
                      src={slide.image}
                      alt={slide.title || 'Foto Polaroid'}
                      className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
                      loading="lazy"
                      draggable={false}
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity flex items-end justify-end p-2.5">
                      <span className="flex h-7 w-7 items-center justify-center rounded-full bg-white/95 text-stone-800 shadow-sm backdrop-blur-xs">
                        <Maximize2 className="h-3.5 w-3.5" />
                      </span>
                    </div>
                  </div>

                  {/* Chin / Area Teks Polaroid Bawah: Judul Singkat Saja */}
                  <div className="mt-3.5 px-1 text-center">
                    <h4 className="font-display text-sm font-bold tracking-tight text-stone-900 group-hover:text-emerald-700 transition-colors truncate">
                      {slide.title}
                    </h4>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* 3. LIGHTBOX PREVIEW MODAL */}
      {activeModalSlide ? (
        <div
          role="dialog"
          aria-modal="true"
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/85 p-4 backdrop-blur-sm"
          onClick={() => setActiveModalSlide(null)}
        >
          <div
            className="relative max-w-2xl w-full overflow-hidden rounded-xl bg-white p-4 shadow-2xl"
            onClick={(e) => e.stopPropagation()}
          >
            <button
              type="button"
              onClick={() => setActiveModalSlide(null)}
              className="absolute right-3 top-3 z-10 flex h-8 w-8 items-center justify-center rounded-full bg-stone-900/80 text-white hover:bg-black transition shadow-md"
              aria-label="Tutup preview"
            >
              <X className="h-4 w-4" />
            </button>

            <div className="relative aspect-[4/3] w-full overflow-hidden rounded-md bg-stone-950">
              <img
                src={activeModalSlide.image}
                alt={activeModalSlide.title}
                className="h-full w-full object-cover"
              />
            </div>

            <div className="mt-3.5 px-1 pb-1 text-center">
              <h3 className="font-display text-base font-bold text-stone-900">
                {activeModalSlide.title}
              </h3>
            </div>
          </div>
        </div>
      ) : null}
    </div>
  );
}
