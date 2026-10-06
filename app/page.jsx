import { MessageCircle } from 'lucide-react';
import LiveWeatherDieng from '@/components/LiveWeatherDieng';
import ParallaxJourneyLine, { ParallaxSectionLine } from '@/components/ParallaxJourneyLine';
import WhyChooseUs from '@/components/WhyChooseUs';
import AccommodationSection from '@/components/AccommodationSection';
import DestinationSection from '@/components/DestinationSection';
import LocalExperience from '@/components/LocalExperience';
import GuestDocumentation from '@/components/GuestDocumentation';
import AvailabilityCalendar from '@/components/AvailabilityCalendar';
import FAQSection from '@/components/FAQSection';
import FinalCTA from '@/components/FinalCTA';
import { SITE, waLink } from '@/lib/site';

export default function HomePage() {
  const directChat = waLink('Halo Admin Kediengaja, saya ingin konsultasi rencana liburan ke Dieng.');

  return (
    <main className="relative">
      {/* 0. AMBIENT PARALLAX ELEVATION JOURNEY LINE (Visual Signature) */}
      <ParallaxJourneyLine />

      {/* 1. HERO SECTION: PHOTOGRAPHY AS PRIMARY HERO */}
      <section className="relative isolate min-h-[92vh] sm:min-h-screen flex items-end overflow-hidden bg-slate-950">
        {/* Responsive Landscape Photography with Priority Loading */}
        <picture>
          {/* Mobile: 4:5 vertical framing centered on Gunung Sindoro & village terraces */}
          <source
            media="(max-width: 640px)"
            srcSet="/images/hero/dieng-hero-mobile.webp"
            type="image/webp"
          />
          {/* Desktop & Tablet: Full 2560px cinematic master */}
          <source
            srcSet="/images/hero/dieng-hero.webp"
            type="image/webp"
          />
          {/* High-fidelity fallback */}
          <img
            src="/images/hero/dieng-hero.jpg"
            alt="Pemandangan megah Gunung Sindoro dan perkampungan dataran tinggi Dieng saat fajar"
            className="absolute inset-0 h-full w-full object-cover object-[center_35%]"
            loading="eager"
            fetchPriority="high"
          />
        </picture>

        {/* Subtle, Non-Destructive CSS Overlay: Leaves mountain summit & sunlight terraces open */}
        <div className="absolute inset-0 bg-gradient-to-r from-slate-950/85 via-slate-950/45 to-transparent sm:w-3/4" />
        <div className="absolute inset-0 bg-gradient-to-t from-slate-950/90 via-transparent to-slate-950/30" />

        {/* Hero Content: Strict Visual Hierarchy */}
        <div className="relative z-10 mx-auto w-full max-w-6xl px-4 pt-32 pb-16 sm:px-6 sm:pb-24 lg:px-8 lg:pb-28">
          {/* Minimal Context Row: Location + Compact Live Weather */}
          <div className="flex flex-wrap items-center gap-3">
            <span className="text-xs font-semibold tracking-wider uppercase text-stone-200">
              Dieng, Jawa Tengah
            </span>
            <span className="text-white/40">•</span>
            <LiveWeatherDieng />
          </div>

          {/* Main Headline */}
          <h1 className="mt-4 max-w-2xl font-display text-3xl font-extrabold tracking-tight text-white sm:text-5xl lg:text-6xl leading-[1.15]">
            Liburan Nyaman<br />di Dataran Tinggi Dieng
          </h1>

          {/* Supporting Copy */}
          <p className="mt-4 max-w-xl text-sm leading-relaxed text-stone-200 sm:text-base">
            Jelajahi Dieng, menginap dengan nyaman, dan nikmati perjalanan bersama orang lokal.
          </p>

          {/* Clean Primary & Secondary CTA */}
          <div className="mt-8 flex flex-wrap items-center gap-3">
            <a
              href={directChat}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex min-h-[46px] items-center gap-2 rounded-xl bg-wa px-5 text-sm font-bold text-white shadow-lift hover:bg-[#15803d] active:scale-[0.98] transition-all"
            >
              <MessageCircle className="h-4 w-4" aria-hidden="true" />
              <span>Chat WhatsApp</span>
            </a>

            <a
              href="#penginapan"
              className="inline-flex min-h-[46px] items-center rounded-xl border border-white/25 bg-white/10 px-5 text-sm font-semibold text-white backdrop-blur-xs hover:bg-white/20 active:scale-[0.98] transition-all"
            >
              <span>Lihat Penginapan</span>
            </a>
          </div>
        </div>
      </section>

      {/* 2. PARALLAX TRANSITION LINE: Hero -> Why Choose Us */}
      <ParallaxSectionLine label="Elevasi 2.093 mdpl" />

      {/* 3. WHY CHOOSE US: Editorial Features */}
      <WhyChooseUs />

      {/* 4. ACCOMMODATION SECTION: Tempat Istirahat Terbaik di Dieng */}
      <AccommodationSection />

      {/* 5. PARALLAX TRANSITION LINE: Accommodation -> Destinations */}
      <ParallaxSectionLine label="Jalur Wisata Dataran Tinggi" />

      {/* 6. DESTINATIONS: Jelajahi Keindahan Dieng */}
      <DestinationSection />

      {/* 7. LOCAL EXPERIENCE: Kenal Dieng dari Orang Lokal */}
      <LocalExperience />

      {/* 8. GUEST DOCUMENTATION: Polaroid Line Moments */}
      <GuestDocumentation />

      {/* 9. AVAILABILITY CALENDAR: Interactive 6-Month Scheduling */}
      <section id="kalender" className="scroll-mt-20 border-t border-stone-200/70 bg-cream/40 py-16 sm:py-24">
        <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
          <AvailabilityCalendar />
        </div>
      </section>

      {/* 10. FAQ SECTION */}
      <FAQSection />

      {/* 11. FINAL CTA: Siap Berangkat ke Dieng? */}
      <FinalCTA />
    </main>
  );
}