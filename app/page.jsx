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
import Testimonials from '@/components/Testimonials';
import FAQSection from '@/components/FAQSection';
import FinalCTA from '@/components/FinalCTA';

export default function HomePage() {
  return (
    <main className="relative overflow-x-hidden">
      {/* 1. HERO SECTION: Full-Viewport Mountain Hospitality Landscape */}
      <section className="relative isolate min-h-[560px] h-[88svh] xs:h-[90svh] sm:h-[95svh] lg:h-[100svh] lg:min-h-[720px] flex flex-col justify-start sm:justify-center overflow-hidden bg-slate-950 border-b border-stone-300/60">
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
        {/* Mobile: Gentle top mist protecting text in upper 58%, leaving lower mountain & village untouched */}
        <div
          className="absolute inset-x-0 top-0 pointer-events-none z-[1] sm:hidden"
          style={{
            height: '58%',
            background: 'linear-gradient(to bottom, rgba(8, 14, 12, 0.75) 0%, rgba(8, 14, 12, 0.45) 50%, rgba(8, 14, 12, 0.12) 80%, transparent 100%)',
          }}
        />
        {/* Desktop: Horizontal 105deg gradient on left side */}
        <div
          className="absolute inset-0 pointer-events-none z-[1] hidden sm:block"
          style={{
            background: 'linear-gradient(105deg, rgba(8, 14, 12, 0.50) 0%, rgba(8, 14, 12, 0.28) 25%, rgba(8, 14, 12, 0.08) 46%, transparent 64%)',
          }}
        />

        {/* Hero Content: Optically centered with refined upward lift on desktop */}
        <div className="relative z-10 mx-auto w-full max-w-6xl px-5 sm:px-6 lg:px-8 pt-20 xs:pt-24 sm:pt-24 lg:pt-28 pb-6 sm:pb-10 lg:pb-12 sm:-translate-y-8 lg:-translate-y-12">
          {/* Quiet Environmental Metadata: Small icon + text, secondary weight, zero pill */}
          <div className="mb-2 sm:mb-3.5">
            <LiveWeatherDieng
              className="text-[11px] sm:text-xs text-stone-300/85 font-normal"
              iconClassName="h-3 w-3 sm:h-3.5 sm:w-3.5 text-stone-300/75"
            />
          </div>

          {/* Main Headline: Editorial Hospitality Weight (700 bold), tight line-height, controlled mobile width */}
          <h1
            className="max-w-[320px] xs:max-w-[360px] sm:max-w-[480px] font-display text-[32px] xs:text-[36px] sm:text-5xl lg:text-[52px] font-bold tracking-tight text-white leading-[1.14] sm:leading-[1.12]"
            style={{ textShadow: '0 2px 10px rgba(0, 0, 0, 0.40), 0 1px 3px rgba(0, 0, 0, 0.30)' }}
          >
            Liburan ke Dieng,<br />Tanpa Ribet.
          </h1>

          {/* Supporting Copy: 2-3 lines, comfortable line-height */}
          <p
            className="mt-2 sm:mt-3.5 max-w-[280px] xs:max-w-[340px] sm:max-w-lg text-[13px] sm:text-base leading-snug sm:leading-relaxed text-stone-200/90 font-normal"
            style={{ textShadow: '0 1px 6px rgba(0, 0, 0, 0.35)' }}
          >
            Penginapan, jeep, dan paket wisata lokal untuk perjalanan yang lebih dekat.
          </p>

          {/* Restrained Hospitality CTAs: 48-52px height, 10-12px radius, quiet secondary */}
          <div className="mt-4 sm:mt-7 flex flex-col sm:flex-row items-stretch sm:items-center gap-2 sm:gap-3.5 max-w-[280px] xs:max-w-[320px] sm:max-w-none">
            <Link
              href="#penginapan"
              className="inline-flex min-h-[46px] sm:min-h-[48px] items-center justify-center rounded-xl bg-forest px-6 text-xs sm:text-sm font-semibold text-white shadow-xs hover:bg-forest-light active:scale-[0.98] transition-all"
            >
              <span>Cari Penginapan</span>
            </Link>

            <Link
              href="#paket-wisata"
              className="inline-flex min-h-[40px] sm:min-h-[48px] items-center justify-center sm:justify-start gap-1.5 sm:gap-2 rounded-xl border border-white/20 bg-slate-950/50 sm:bg-white/5 px-4 sm:px-6 text-xs sm:text-sm font-medium text-stone-200 hover:text-white hover:bg-white/10 hover:border-white/35 active:scale-[0.98] transition-all"
            >
              <span>Lihat Paket Wisata</span>
              <ArrowRight className="h-3.5 w-3.5 sm:h-4 sm:w-4 text-stone-300" aria-hidden="true" />
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

      {/* 8. TESTIMONI: Cerita Perjalanan Tamu */}
      <Testimonials />

      {/* 9. FAQ: Compact Accordion */}
      <FAQSection />

      {/* 10. FINAL CTA: Siap Berangkat ke Dieng? */}
      <FinalCTA />
    </main>
  );
}