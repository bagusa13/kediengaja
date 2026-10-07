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
      {/* 1. HERO SECTION: Living Photograph Mountain Hospitality First Viewport */}
      <section className="relative isolate h-[84dvh] min-h-[520px] max-h-[660px] sm:h-[82vh] sm:min-h-[560px] sm:max-h-[720px] lg:h-[84vh] lg:min-h-[600px] lg:max-h-[760px] flex flex-col justify-center overflow-hidden bg-[#F8F7F3]">
        {/* Seamless Dual-Buffer Background Video with Smoothstep Edge Dissolve */}
        {/* 100% untouched until final 32px; smoothstep easing eliminates all Mach bands and white fog */}
        <div
          className="absolute inset-0 pointer-events-none select-none overflow-hidden"
          style={{
            WebkitMaskImage: 'linear-gradient(to bottom, black 0%, black calc(100% - 32px), rgba(0, 0, 0, 0.95) calc(100% - 22px), rgba(0, 0, 0, 0.65) calc(100% - 12px), rgba(0, 0, 0, 0.20) calc(100% - 4px), transparent 100%)',
            maskImage: 'linear-gradient(to bottom, black 0%, black calc(100% - 32px), rgba(0, 0, 0, 0.95) calc(100% - 22px), rgba(0, 0, 0, 0.65) calc(100% - 12px), rgba(0, 0, 0, 0.20) calc(100% - 4px), transparent 100%)',
          }}
        >
          <HeroVideoBackground
            videoSrc="/video/kediengajaVideo.mp4"
            posterSrc="/images/hero/hero-video-poster.webp"
          />
        </div>

        {/* Localized Directional Contrast: Spans full width with organic decay, zero bounding box lines */}
        {/* Soft, photographic vignette that preserves 100% of the Sindoro peak, golden clouds, and morning light */}
        <div
          className="absolute inset-0 pointer-events-none z-[1]"
          style={{
            background: 'linear-gradient(to right, rgba(8, 14, 12, 0.72) 0%, rgba(8, 14, 12, 0.42) 28%, rgba(8, 14, 12, 0.12) 48%, rgba(8, 14, 12, 0.02) 62%, transparent 72%)',
          }}
        />

        {/* Hero Content: Disciplined vertical positioning, no floating dead air */}
        <div className="relative z-10 mx-auto w-full max-w-6xl px-4 pt-20 pb-8 sm:pt-24 sm:pb-10 lg:pt-28 lg:pb-12 lg:px-8">
          {/* Quiet Environmental Metadata: Small icon + text, zero capsule, zero pill */}
          <div className="mb-3 sm:mb-3.5">
            <LiveWeatherDieng className="text-stone-300/85" />
          </div>

          {/* Main Headline: Editorial Hospitality Weight (700 bold), tight line-height, controlled max-width */}
          <h1
            className="max-w-xl font-display text-3xl sm:text-5xl lg:text-[52px] font-bold tracking-tight text-white leading-[1.12]"
            style={{ textShadow: '0 2px 10px rgba(0, 0, 0, 0.3)' }}
          >
            Liburan ke Dieng,<br />Tanpa Ribet.
          </h1>

          {/* Supporting Copy */}
          <p
            className="mt-3 sm:mt-3.5 max-w-[340px] sm:max-w-lg text-xs sm:text-base leading-relaxed text-stone-200/90 font-normal"
            style={{ textShadow: '0 1px 6px rgba(0, 0, 0, 0.25)' }}
          >
            Penginapan, jeep, dan paket wisata lokal untuk perjalanan yang lebih dekat.
          </p>

          {/* Restrained Hospitality CTAs: 10-12px radius, no pills, no neon, no glass */}
          <div className="mt-6 sm:mt-7 flex flex-col sm:flex-row items-stretch sm:items-center gap-2.5 sm:gap-3.5 max-w-[320px] sm:max-w-none">
            <Link
              href="#penginapan"
              className="inline-flex min-h-[44px] sm:min-h-[46px] items-center justify-center rounded-xl bg-forest px-6 text-xs sm:text-sm font-semibold text-white shadow-xs hover:bg-forest-light hover:shadow-sm active:scale-[0.98] transition-all"
            >
              <span>Cari Penginapan</span>
            </Link>

            <Link
              href="#paket-wisata"
              className="inline-flex min-h-[44px] sm:min-h-[46px] items-center justify-center gap-2 rounded-xl border border-white/25 bg-white/10 px-5 sm:px-6 text-xs sm:text-sm font-semibold text-white hover:bg-white/20 hover:border-white/40 active:scale-[0.98] transition-all"
            >
              <span>Lihat Paket Wisata</span>
              <ArrowRight className="h-4 w-4 text-white/80" aria-hidden="true" />
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