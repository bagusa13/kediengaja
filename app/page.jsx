import Link from 'next/link';
import { ArrowRight } from 'lucide-react';
import LiveWeatherDieng from '@/components/LiveWeatherDieng';
import HeroVideoBackground from '@/components/HeroVideoBackground';
import QuickServices from '@/components/QuickServices';
import AccommodationSection from '@/components/AccommodationSection';
import ToursSection from '@/components/ToursSection';
import DestinationSection from '@/components/DestinationSection';
import WhyChooseUs from '@/components/WhyChooseUs';
import QuickAvailabilityCheck from '@/components/QuickAvailabilityCheck';
import FAQSection from '@/components/FAQSection';
import FinalCTA from '@/components/FinalCTA';

export default function HomePage() {
  return (
    <main className="relative overflow-x-hidden">
      {/* 1. HERO SECTION: Dedicated Art-Directed Multi-Viewport Mountain Landscape */}
      <section className="relative isolate min-h-[540px] max-h-[840px] sm:min-h-0 sm:max-h-none h-[100svh] lg:h-[100svh] flex flex-col justify-start sm:justify-center overflow-hidden bg-slate-950 border-b border-stone-300/60">
        {/* Full-bleed Living Landscape: Untouched from top to bottom, zero white mask */}
        <div className="absolute inset-0 pointer-events-none select-none overflow-hidden">
          <HeroVideoBackground
            videoSrc="/video/kediengajaVideo.mp4"
            posterSrc="/images/hero/hero-video-poster.webp"
          />
        </div>

        {/* Apple-style Hairline Divider: Crisp boundary separating hero media from content surface */}
        <div className="absolute inset-x-0 bottom-0 z-20 h-px bg-stone-300/80 shadow-[0_1px_4px_rgba(0,0,0,0.08)] pointer-events-none" />

        {/* Localized Readability Gradient */}
        {/* Mobile: Gentle top sky mist protecting text in upper zone, leaving mountain & village 100% untouched */}
        <div
          className="absolute inset-x-0 top-0 pointer-events-none z-[1] sm:hidden"
          style={{
            height: 'clamp(260px, 44svh, 360px)',
            background: 'linear-gradient(to bottom, rgba(7, 13, 11, 0.68) 0%, rgba(7, 13, 11, 0.32) 48%, rgba(7, 13, 11, 0.05) 82%, transparent 100%)',
          }}
        />
        {/* Desktop: Horizontal 105deg gradient on left side - PRESERVED EXACTLY AS APPROVED */}
        <div
          className="absolute inset-0 pointer-events-none z-[1] hidden sm:block"
          style={{
            background: 'linear-gradient(105deg, rgba(8, 14, 12, 0.50) 0%, rgba(8, 14, 12, 0.28) 25%, rgba(8, 14, 12, 0.08) 46%, transparent 64%)',
          }}
        />

        {/* Hero Content: Layered composition on mobile, optically centered on desktop */}
        <div className="relative z-10 mx-auto w-full max-w-6xl px-4 xs:px-5 sm:px-6 lg:px-8 pt-[calc(env(safe-area-inset-top,0px)+4.25rem)] xs:pt-[calc(env(safe-area-inset-top,0px)+4.75rem)] sm:pt-24 lg:pt-28 pb-6 sm:pb-10 lg:pb-12 sm:-translate-y-6 lg:-translate-y-8">
          {/* Quiet Environmental Metadata: Small icon + text, secondary weight, zero pill */}
          <div className="mb-2 xs:mb-2.5 sm:mb-3.5">
            <LiveWeatherDieng
              className="text-[11px] xs:text-xs text-stone-200/90 font-normal tracking-wide drop-shadow-xs"
              iconClassName="h-3 w-3 xs:h-3.5 xs:w-3.5 text-stone-300/80"
            />
          </div>

          {/* Main Headline: Fluid confident typography with clamp(), no awkward breaks, strict break at comma */}
          <h1
            className="max-w-[14ch] sm:max-w-[480px] font-display text-[clamp(1.75rem,6.8vw,2.35rem)] sm:text-5xl lg:text-[52px] font-bold tracking-tight text-white leading-[1.12] sm:leading-[1.12]"
            style={{ textShadow: '0 2px 10px rgba(0, 0, 0, 0.45), 0 1px 3px rgba(0, 0, 0, 0.35)' }}
          >
            Liburan ke Dieng,<br />Tanpa Ribet.
          </h1>

          {/* Supporting Copy: Controlled visual width, does not dominate the hero */}
          <p
            className="mt-2 xs:mt-2.5 sm:mt-3.5 max-w-[260px] xs:max-w-[300px] sm:max-w-lg text-[clamp(0.8125rem,2.8vw,0.9375rem)] sm:text-base leading-snug sm:leading-relaxed text-stone-200/90 font-normal"
            style={{ textShadow: '0 1px 6px rgba(0, 0, 0, 0.35)' }}
          >
            Penginapan, jeep, dan paket wisata lokal untuk perjalanan yang lebih dekat.
          </p>

          {/* Restrained Hospitality CTAs: Solid Primary + Frosted Secondary, thumb-friendly 44-48px touch targets */}
          <div className="mt-3.5 xs:mt-4 sm:mt-7 flex flex-row items-center gap-2 xs:gap-2.5 sm:gap-3.5">
            <Link
              href="#penginapan"
              className="inline-flex h-11 sm:h-12 items-center justify-center rounded-xl bg-forest px-3.5 xs:px-5 sm:px-6 text-[11px] xs:text-xs sm:text-sm font-semibold text-white shadow-sm hover:bg-forest-light active:scale-[0.98] transition-all shrink-0"
            >
              <span>Cari Penginapan</span>
            </Link>

            <Link
              href="#paket-wisata"
              className="inline-flex h-11 sm:h-12 items-center justify-center gap-1.5 rounded-xl border border-white/25 bg-white/12 sm:bg-white/5 backdrop-blur-xs px-3 xs:px-4.5 sm:px-6 text-[11px] xs:text-xs sm:text-sm font-medium text-white hover:bg-white/18 hover:border-white/35 active:scale-[0.98] transition-all group shrink-0"
            >
              <span>Lihat Paket Wisata</span>
              <ArrowRight className="h-3.5 w-3.5 sm:h-4 sm:w-4 text-stone-200 group-hover:translate-x-1 transition-transform" aria-hidden="true" />
            </Link>
          </div>
        </div>
      </section>

      {/* 2. QUICK SERVICE NAVIGATION: Mau ke Dieng untuk apa? */}
      <QuickServices />

      {/* 3. PENGINAPAN PILIHAN DI DIENG: Listing Nyata */}
      <AccommodationSection />

      {/* 4. PAKET WISATA DIENG: Photo-Led Tour & Jeep Listings */}
      <ToursSection />

      {/* 5. DESTINASI POPULER: Sikunir, Telaga Warna, Sikidang, Arjuna */}
      <DestinationSection />

      {/* 6. KENAPA KEDIENGAJA?: Local Proof & Differentiation */}
      <WhyChooseUs />

      {/* 7. AVAILABILITY / CEK KETERSEDIAAN: Simple Booking Checker */}
      <QuickAvailabilityCheck />

      {/* 8. FAQ: Compact Accordion */}
      <FAQSection />

      {/* 10. FINAL CTA: Siap Berangkat ke Dieng? */}
      <FinalCTA />
    </main>
  );
}