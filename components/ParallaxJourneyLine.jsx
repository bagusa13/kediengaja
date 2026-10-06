"use client";

import { useEffect, useState } from 'react';

/**
 * ParallaxJourneyLine
 * 
 * Deliberate, sophisticated visual signature for Kediengaja:
 * - Evokes a mountain journey / elevation contour path through Dieng (2.093 mdpl -> 2.263 mdpl).
 * - Thin, elegant hairline synchronized with scroll.
 * - Extremely low visual noise (never covers text, never competes with photography).
 */
export default function ParallaxJourneyLine() {
  const [progress, setProgress] = useState(0);
  const [elevation, setElevation] = useState(2093);

  useEffect(() => {
    let ticking = false;

    function onScroll() {
      if (!ticking) {
        window.requestAnimationFrame(() => {
          const scrollY = window.scrollY;
          const maxScroll = document.documentElement.scrollHeight - window.innerHeight;
          const pct = maxScroll > 0 ? Math.min(Math.max(scrollY / maxScroll, 0), 1) : 0;
          setProgress(pct);
          // Elevation interpolation from Dataran Tinggi Dieng (2,093m) to Puncak Sikunir (2,263m)
          setElevation(Math.round(2093 + pct * 170));
          ticking = false;
        });
        ticking = true;
      }
    }

    window.addEventListener('scroll', onScroll, { passive: true });
    onScroll();

    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  return (
    <aside
      aria-hidden="true"
      className="pointer-events-none fixed right-4 top-1/2 z-40 hidden -translate-y-1/2 select-none lg:flex lg:flex-col lg:items-center"
    >
      {/* Starting elevation anchor */}
      <span className="mb-2 text-[10px] font-medium tracking-widest uppercase text-stone-400/80">
        2.093m
      </span>

      {/* The Parallax Vertical Spine Track */}
      <div className="relative h-44 w-[1px] bg-stone-300/40">
        {/* Active travel progress line */}
        <div
          className="absolute top-0 left-0 w-full bg-forest/70 transition-all duration-100 ease-out"
          style={{ height: `${progress * 100}%` }}
        />

        {/* Current Elevation Needle / Waypoint */}
        <div
          className="absolute left-1/2 -translate-x-1/2 -translate-y-1/2 transition-all duration-100 ease-out"
          style={{ top: `${progress * 100}%` }}
        >
          <div className="h-2 w-2 rounded-full border border-forest/80 bg-white shadow-xs" />
          <div className="absolute right-3.5 top-1/2 -translate-y-1/2 whitespace-nowrap rounded-md border border-stone-200/60 bg-white/90 px-1.5 py-0.5 text-[9px] font-semibold text-stone-600 backdrop-blur-xs shadow-xs">
            {elevation} mdpl
          </div>
        </div>
      </div>

      {/* Summit elevation anchor */}
      <span className="mt-2 text-[10px] font-medium tracking-widest uppercase text-stone-400/80">
        2.263m
      </span>
    </aside>
  );
}

/**
 * ParallaxSectionLine
 * Elegant horizontal hairline connector between sections with subtle parallax contour movement.
 */
export function ParallaxSectionLine({ label = '', align = 'center', className = '' }) {
  const [offset, setOffset] = useState(0);

  useEffect(() => {
    let ticking = false;
    function onScroll() {
      if (!ticking) {
        window.requestAnimationFrame(() => {
          // Slow parallax drift based on scroll
          const drift = (window.scrollY * 0.03) % 40;
          setOffset(drift);
          ticking = false;
        });
        ticking = true;
      }
    }
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  return (
    <div
      aria-hidden="true"
      className={`relative w-full overflow-hidden py-4 select-none ${className}`}
    >
      <div className="mx-auto flex max-w-6xl items-center px-4 sm:px-6 lg:px-8">
        {/* Left hairline */}
        <div className="relative h-[1px] flex-1 bg-stone-200/80 overflow-hidden">
          <div
            className="absolute inset-0 bg-gradient-to-r from-transparent via-forest/20 to-transparent transition-transform duration-75"
            style={{ transform: `translateX(${offset}px)` }}
          />
        </div>

        {label ? (
          <span className="px-4 text-[11px] font-medium tracking-widest uppercase text-stone-400">
            {label}
          </span>
        ) : (
          <div className="mx-3 h-1.5 w-1.5 rounded-full border border-stone-300 bg-stone-100" />
        )}

        {/* Right hairline */}
        <div className="relative h-[1px] flex-1 bg-stone-200/80 overflow-hidden">
          <div
            className="absolute inset-0 bg-gradient-to-r from-transparent via-forest/20 to-transparent transition-transform duration-75"
            style={{ transform: `translateX(-${offset}px)` }}
          />
        </div>
      </div>
    </div>
  );
}
