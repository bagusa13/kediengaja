import Link from 'next/link';
import { ArrowRight, Compass, Home } from 'lucide-react';
import BrandLogo from '@/components/BrandLogo';
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
      {/* 1. HERO SECTION: Living Photograph Video Background (Desktop 60-70vh, Compact Mobile) */}
      <section className="relative isolate min-h-[540px] sm:min-h-[580px] lg:min-h-[66vh] max-h-[740px] flex items-center overflow-hidden bg-slate-950">
        {/* Seamless Dual-Buffer Background Video (Hidden loop seam, zero black bars, static camera) */}
        <HeroVideoBackground
          videoSrc="/video/kediengajaVideo.mp4"
          posterSrc="/images/hero/hero-video-poster.webp"
        />

        {/* Subtle, Non-Destructive Dark & Gradient Overlays: Preserves natural Dieng landscape while guaranteeing text contrast */}
        <div className="absolute inset-0 bg-slate-950/25 pointer-events-none" />
        <div className="absolute inset-0 bg-gradient-to-r from-slate-950/85 via-slate-950/45 to-transparent sm:w-3/4 max-w-3xl pointer-events-none" />
        <div className="absolute inset-0 bg-gradient-to-t from-slate-950/80 via-transparent to-transparent h-24 top-auto bottom-0 pointer-events-none" />

        {/* Hero Content */}
        <div className="relative z-10 mx-auto w-full max-w-6xl px-4 pt-20 pb-14 sm:px-6 sm:py-20 lg:px-8">
          {/* Logo Kediengaja & Weather Capsule */}
          <div className="mb-4 sm:mb-5 flex flex-wrap items-center gap-3">
            <BrandLogo variant="light" showTagline={false} />
            <span className="hidden sm:inline-block text-white/30">•</span>
            <div className="inline-flex items-center rounded-full bg-slate-950/60 px-3.5 py-1.5 backdrop-blur-md border border-white/10">
              <LiveWeatherDieng />
            </div>
          </div>

          {/* Main Headline */}
          <h1 className="max-w-2xl font-display text-3xl font-extrabold tracking-tight text-white sm:text-5xl lg:text-6xl leading-[1.14]">
            Liburan ke Dieng,<br />Tanpa Ribet.
          </h1>

          {/* Subheadline */}
          <p className="mt-3.5 sm:mt-4 max-w-xl text-sm sm:text-base leading-relaxed text-stone-200">
            Penginapan, jeep, dan paket wisata lokal untuk perjalanan yang lebih dekat.
          </p>

          {/* Primary & Secondary CTA */}
          <div className="mt-7 sm:mt-8 flex flex-wrap items-center gap-3 sm:gap-4">
            <Link
              href="#penginapan"
              className="inline-flex min-h-[46px] items-center gap-2 rounded-xl bg-forest px-6 text-xs sm:text-sm font-bold text-white shadow-xs hover:bg-forest-light active:scale-[0.98] transition-all"
            >
              <Home className="h-4 w-4 text-amber-400" aria-hidden="true" />
              <span>Cari Penginapan</span>
            </Link>

            <Link
              href="#paket-wisata"
              className="inline-flex min-h-[46px] items-center gap-2 rounded-xl border border-white/25 bg-white/10 px-6 text-xs sm:text-sm font-semibold text-white backdrop-blur-xs hover:bg-white/20 active:scale-[0.98] transition-all"
            >
              <span>Lihat Paket Wisata</span>
              <ArrowRight className="h-4 w-4" aria-hidden="true" />
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