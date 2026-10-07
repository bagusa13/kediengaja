import Link from 'next/link';
import { ArrowRight, Compass, Home } from 'lucide-react';
import LiveWeatherDieng from '@/components/LiveWeatherDieng';
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
      {/* 1. HERO SECTION: Authentic Dieng Landscape Photography */}
      <section className="relative isolate min-h-[90vh] sm:min-h-[92vh] flex items-center overflow-hidden bg-slate-950">
        {/* Landscape Photography */}
        <picture>
          <source
            media="(max-width: 640px)"
            srcSet="/images/hero/dieng-hero-mobile.webp"
            type="image/webp"
          />
          <source
            srcSet="/images/hero/dieng-hero.webp"
            type="image/webp"
          />
          <img
            src="/images/hero/dieng-hero.jpg"
            alt="Pemandangan fajar dan perbukitan dataran tinggi Dieng"
            className="absolute inset-0 h-full w-full object-cover object-[center_35%]"
            loading="eager"
            fetchPriority="high"
          />
        </picture>

        {/* Non-destructive overlay for legible typography */}
        <div className="absolute inset-0 bg-slate-950/60" />
        <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/20 to-slate-950/40" />
        <div className="absolute inset-0 bg-gradient-to-r from-slate-950/90 via-slate-950/50 to-transparent sm:w-2/3" />

        {/* Hero Content */}
        <div className="relative z-10 mx-auto w-full max-w-6xl px-4 pt-24 pb-16 sm:px-6 sm:py-24 lg:px-8">
          {/* Weather status */}
          <div className="mb-4 inline-flex items-center rounded-full bg-slate-950/60 px-3.5 py-1.5 backdrop-blur-md border border-white/10">
            <LiveWeatherDieng />
          </div>

          {/* Main Headline */}
          <h1 className="max-w-2xl font-display text-3xl font-extrabold tracking-tight text-white sm:text-5xl lg:text-6xl leading-[1.15]">
            Liburan ke Dieng,<br />Tanpa Ribet.
          </h1>

          {/* Subheadline */}
          <p className="mt-4 max-w-xl text-sm sm:text-base leading-relaxed text-stone-200">
            Penginapan, jeep, dan paket wisata lokal untuk pengalaman Dieng yang lebih dekat.
          </p>

          {/* Primary & Secondary CTA */}
          <div className="mt-8 flex flex-wrap items-center gap-3 sm:gap-4">
            <Link
              href="#penginapan"
              className="inline-flex min-h-[46px] items-center gap-2 rounded-xl bg-forest px-6 text-xs sm:text-sm font-bold text-white shadow-xs hover:bg-forest-light active:scale-[0.98] transition-all"
            >
              <Home className="h-4 w-4 text-brand-orange" aria-hidden="true" />
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

      {/* 6. KENAPA KE DIENG AJA?: Local Proof & Differentiation */}
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