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
      {/* 1. HERO SECTION: Living Photograph Video Background (Desktop 64-72vh, Compact Mobile) */}
      <section className="relative isolate min-h-[520px] sm:min-h-[580px] lg:min-h-[68vh] max-h-[760px] flex items-center overflow-hidden bg-slate-950">
        {/* Seamless Dual-Buffer Background Video (Hidden loop seam, zero black bars, static camera) */}
        <HeroVideoBackground
          videoSrc="/video/kediengajaVideo.mp4"
          posterSrc="/images/hero/hero-video-poster.webp"
        />

        {/* Directional Photographic Atmospheric Gradient: Concentrated on left/bottom-left text zone */}
        {/* Preserves 100% natural landscape visibility on right/upper quadrant while ensuring crisp text contrast */}
        <div
          className="absolute inset-0 pointer-events-none z-[1]"
          style={{
            background: 'radial-gradient(ellipse 85% 75% at 18% 46%, rgba(8, 14, 12, 0.70) 0%, rgba(8, 14, 12, 0.44) 42%, rgba(8, 14, 12, 0.12) 72%, transparent 100%)',
          }}
        />
        <div
          className="absolute inset-y-0 left-0 w-full sm:w-3/4 max-w-3xl pointer-events-none z-[2]"
          style={{
            background: 'linear-gradient(90deg, rgba(8, 14, 12, 0.65) 0%, rgba(8, 14, 12, 0.38) 45%, rgba(8, 14, 12, 0.10) 75%, transparent 100%)',
          }}
        />

        {/* Subtle Atmospheric Ground Depth before Dissolve */}
        <div
          className="absolute inset-x-0 bottom-0 h-44 sm:h-56 pointer-events-none z-[3]"
          style={{
            background: 'linear-gradient(to bottom, transparent 0%, rgba(8, 14, 12, 0.35) 45%, rgba(8, 14, 12, 0.72) 100%)',
          }}
        />

        {/* Dedicated Hero-to-Section Dissolve Transition Layer (140-180px tall) */}
        {/* Melts the mountain video smoothly into the warm neutral tone (#F8F7F3) of Layanan Utama */}
        <div
          className="absolute inset-x-0 bottom-0 h-36 sm:h-48 pointer-events-none z-[4]"
          style={{
            background: `linear-gradient(
              to bottom,
              rgba(248, 247, 243, 0) 0%,
              rgba(248, 247, 243, 0.18) 25%,
              rgba(248, 247, 243, 0.60) 60%,
              rgba(248, 247, 243, 0.92) 85%,
              #F8F7F3 100%
            )`,
          }}
        />

        {/* Hero Content */}
        <div className="relative z-10 mx-auto w-full max-w-6xl px-4 pt-20 pb-20 sm:px-6 sm:pt-24 sm:pb-24 lg:px-8">
          {/* Quiet Environmental Metadata: Small icon + text, no capsule, no pill, no border, no shadow */}
          <div className="mb-4 sm:mb-5">
            <LiveWeatherDieng className="text-stone-300/85" />
          </div>

          {/* Main Headline: Editorial Hospitality Weight (700 bold), tight line-height, controlled max-width */}
          <h1
            className="max-w-xl font-display text-3xl font-bold tracking-tight text-white sm:text-5xl lg:text-[54px] leading-[1.12]"
            style={{ textShadow: '0 2px 10px rgba(0, 0, 0, 0.22)' }}
          >
            Liburan ke Dieng,<br />Tanpa Ribet.
          </h1>

          {/* Supporting Copy */}
          <p
            className="mt-3.5 sm:mt-4 max-w-lg text-sm sm:text-base leading-relaxed text-stone-200/90 font-normal"
            style={{ textShadow: '0 1px 6px rgba(0, 0, 0, 0.18)' }}
          >
            Penginapan, jeep, dan paket wisata lokal untuk perjalanan yang lebih dekat.
          </p>

          {/* Restrained Hospitality CTAs: 10-12px radius, no pills, no neon, no glass */}
          <div className="mt-7 sm:mt-8 flex flex-wrap items-center gap-3 sm:gap-4">
            <Link
              href="#penginapan"
              className="inline-flex min-h-[46px] items-center justify-center rounded-xl bg-forest px-6 text-xs sm:text-sm font-semibold text-white shadow-xs hover:bg-forest-light hover:shadow-sm active:scale-[0.98] transition-all"
            >
              <span>Cari Penginapan</span>
            </Link>

            <Link
              href="#paket-wisata"
              className="inline-flex min-h-[46px] items-center justify-center gap-2 rounded-xl border border-white/30 bg-white/10 px-6 text-xs sm:text-sm font-semibold text-white hover:bg-white/20 hover:border-white/50 active:scale-[0.98] transition-all"
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