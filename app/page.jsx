import Link from 'next/link';
import {
  MessageCircle,
  Home,
  Compass,
  Calendar,
  Sparkles,
  Star,
  ShieldCheck,
  CheckCircle2,
  ArrowRight,
} from 'lucide-react';
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
    <main className="relative overflow-x-hidden">
      {/* 0. AMBIENT PARALLAX ELEVATION JOURNEY LINE (Visual Signature) */}
      <ParallaxJourneyLine />

      {/* 1. HERO SECTION: PHOTOGRAPHY AS PRIMARY HERO (iOS Safari 100dvh optimized) */}
      <section className="relative isolate min-h-[100dvh] flex items-end overflow-hidden bg-slate-950">
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
        <div className="absolute inset-0 bg-gradient-to-r from-slate-950/90 via-slate-950/55 to-transparent sm:w-3/4" />
        <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/20 to-slate-950/40" />

        {/* Hero Content: Strict Visual Hierarchy & Traveloka/Airbnb-style polish */}
        <div className="relative z-10 mx-auto w-full max-w-6xl px-4 pt-28 pb-10 sm:px-6 sm:pb-16 lg:px-8 lg:pb-20">
          {/* Context Capsule: Location + Live Weather */}
          <div className="inline-flex flex-wrap items-center gap-2 rounded-full border border-white/20 bg-slate-950/60 px-3.5 py-1.5 backdrop-blur-md shadow-xs">
            <span className="text-xs font-semibold tracking-wider uppercase text-emerald-400">
              Dieng, Jawa Tengah
            </span>
            <span className="text-white/40">•</span>
            <LiveWeatherDieng />
          </div>

          {/* Main Headline */}
          <h1 className="mt-4 max-w-2xl font-display text-3xl font-extrabold tracking-tight text-white sm:text-5xl lg:text-6xl leading-[1.12]">
            Liburan Nyaman<br />di Dataran Tinggi Dieng
          </h1>

          {/* Supporting Copy */}
          <p className="mt-3.5 max-w-xl text-sm leading-relaxed text-stone-200 sm:text-base">
            Jelajahi keindahan Dieng, menginap di cabin &amp; villa eksklusif, serta nikmati perjalanan tanpa ribet bersama pemandu lokal.
          </p>

          {/* Airbnb / Traveloka Style Quick Category Explore Pills */}
          <div className="mt-6 max-w-xl">
            <p className="text-[10px] font-bold uppercase tracking-wider text-stone-300 mb-2">
              Pilih Layanan Wisata
            </p>
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
              <Link
                href="#penginapan"
                className="flex items-center gap-2 rounded-xl border border-white/20 bg-slate-950/50 px-3 py-2 text-xs font-semibold text-white backdrop-blur-md hover:bg-white/15 hover:border-white/40 transition active:scale-95"
              >
                <Home className="h-3.5 w-3.5 text-emerald-400 shrink-0" />
                <span className="truncate">Penginapan</span>
              </Link>
              <Link
                href="/jeep-dieng"
                className="flex items-center gap-2 rounded-xl border border-white/20 bg-slate-950/50 px-3 py-2 text-xs font-semibold text-white backdrop-blur-md hover:bg-white/15 hover:border-white/40 transition active:scale-95"
              >
                <Compass className="h-3.5 w-3.5 text-sky-400 shrink-0" />
                <span className="truncate">Jeep 4x4</span>
              </Link>
              <Link
                href="/tours"
                className="flex items-center gap-2 rounded-xl border border-white/20 bg-slate-950/50 px-3 py-2 text-xs font-semibold text-white backdrop-blur-md hover:bg-white/15 hover:border-white/40 transition active:scale-95"
              >
                <Sparkles className="h-3.5 w-3.5 text-amber-400 shrink-0" />
                <span className="truncate">Paket Tour</span>
              </Link>
              <Link
                href="#kalender"
                className="flex items-center gap-2 rounded-xl border border-white/20 bg-slate-950/50 px-3 py-2 text-xs font-semibold text-white backdrop-blur-md hover:bg-white/15 hover:border-white/40 transition active:scale-95"
              >
                <Calendar className="h-3.5 w-3.5 text-purple-400 shrink-0" />
                <span className="truncate">Cek Tanggal</span>
              </Link>
            </div>
          </div>

          {/* Clean Primary & Secondary CTA */}
          <div className="mt-6 flex flex-wrap items-center gap-3">
            <a
              href={directChat}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex min-h-[46px] items-center gap-2.5 rounded-xl bg-wa px-5 text-sm font-bold text-white shadow-lift hover:bg-[#15803d] active:scale-[0.98] transition-all"
            >
              <MessageCircle className="h-4 w-4" aria-hidden="true" />
              <span>Chat WhatsApp</span>
            </a>

            <a
              href="#penginapan"
              className="inline-flex min-h-[46px] items-center gap-1.5 rounded-xl border border-white/25 bg-white/10 px-5 text-sm font-semibold text-white backdrop-blur-xs hover:bg-white/20 active:scale-[0.98] transition-all"
            >
              <span>Lihat Rekomendasi</span>
              <ArrowRight className="h-3.5 w-3.5" />
            </a>
          </div>

          {/* Social Proof & Trust Proof Line */}
          <div className="mt-8 pt-4 border-t border-white/10 flex flex-wrap items-center gap-x-6 gap-y-2 text-[11px] sm:text-xs text-stone-300">
            <div className="flex items-center gap-1.5">
              <Star className="h-3.5 w-3.5 text-amber-400 fill-amber-400" />
              <span className="font-bold text-white">4.9 / 5.0</span>
              <span className="text-stone-400">Rating 350+ Tamu</span>
            </div>
            <div className="flex items-center gap-1.5">
              <ShieldCheck className="h-3.5 w-3.5 text-emerald-400" />
              <span>Pemandu &amp; Driver Lokal Resmi</span>
            </div>
            <div className="flex items-center gap-1.5">
              <CheckCircle2 className="h-3.5 w-3.5 text-sky-400" />
              <span>Jadwal Terintegrasi Real-Time</span>
            </div>
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