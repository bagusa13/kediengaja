import Link from 'next/link';
import { MessageCircle, ArrowRight } from 'lucide-react';
import { SITE, waLink } from '@/lib/site';

export default function FinalCTA() {
  const directChat = waLink('Halo Ke Dieng Aja, saya ingin konsultasi rencana liburan ke Dieng.');

  return (
    <section className="relative isolate overflow-hidden bg-slate-950 py-20 sm:py-28">
      {/* Background authentic landscape photograph */}
      <img
        src="/images/hero/dieng-hero.webp"
        alt="Lanskap pegunungan Dieng"
        className="absolute inset-0 h-full w-full object-cover object-center"
        loading="lazy"
      />

      {/* Non-destructive CSS Overlay */}
      <div className="absolute inset-0 bg-slate-950/80" />
      <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/50 to-slate-950/40" />

      {/* Content */}
      <div className="relative mx-auto max-w-4xl px-4 text-center sm:px-6 lg:px-8">
        <p className="text-xs font-bold tracking-widest uppercase text-brand-orange">
          Ke Dieng Aja
        </p>

        <h2 className="mt-3 font-display text-3xl font-extrabold tracking-tight text-white sm:text-4xl lg:text-5xl">
          Siap Berangkat ke Dieng?
        </h2>

        <p className="mx-auto mt-3 max-w-xl text-sm sm:text-base leading-relaxed text-stone-200">
          Kami bantu siapkan penginapan, jeep, dan perjalanan Anda. Konsultasikan rencana trip Anda langsung bersama warga lokal.
        </p>

        <div className="mt-8 flex flex-wrap items-center justify-center gap-3 sm:gap-4">
          <a
            href={directChat}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex min-h-[46px] items-center gap-2 rounded-xl bg-forest px-6 text-xs sm:text-sm font-bold text-white shadow-xs hover:bg-forest-light active:scale-[0.98] transition-all"
          >
            <MessageCircle className="h-4 w-4 text-brand-orange" aria-hidden="true" />
            <span>Chat WhatsApp</span>
          </a>

          <Link
            href="/penginapan"
            className="inline-flex min-h-[46px] items-center gap-1.5 rounded-xl border border-white/20 bg-white/10 px-6 text-xs sm:text-sm font-semibold text-white backdrop-blur-xs hover:bg-white/20 active:scale-[0.98] transition-all"
          >
            <span>Lihat Semua Penginapan</span>
            <ArrowRight className="h-4 w-4" aria-hidden="true" />
          </Link>
        </div>
      </div>
    </section>
  );
}
