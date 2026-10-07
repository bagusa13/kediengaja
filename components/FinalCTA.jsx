import Link from 'next/link';
import { MessageCircle, ArrowRight } from 'lucide-react';
import { SITE, waLink } from '@/lib/site';

export default function FinalCTA() {
  const directChat = waLink('Halo Kediengaja, saya ingin konsultasi rencana liburan ke Dieng.');

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
        <p className="text-xs font-semibold tracking-widest uppercase text-emerald-300">
          Kediengaja
        </p>

        <h2 className="mt-3 font-display text-3xl font-bold tracking-tight text-white sm:text-4xl lg:text-5xl">
          Siap Berangkat ke Dieng?
        </h2>

        <p className="mx-auto mt-3 max-w-xl text-sm sm:text-base leading-relaxed text-stone-200">
          Kami bantu siapkan penginapan, armada jeep, dan perjalanan Anda. Konsultasikan rencana trip Anda langsung bersama warga lokal.
        </p>

        <div className="mt-8 flex flex-col items-center justify-center gap-3.5 max-w-sm mx-auto">
          <a
            href={directChat}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex min-h-[50px] w-full sm:w-auto items-center justify-center gap-2.5 rounded-xl bg-forest px-8 text-sm font-bold text-white shadow-md hover:bg-forest-light active:scale-[0.98] transition-all"
          >
            <MessageCircle className="h-4.5 w-4.5 text-white" aria-hidden="true" />
            <span>Rencanakan Perjalanan via WhatsApp</span>
          </a>

          <Link
            href="/availability"
            className="text-xs font-medium text-stone-300 hover:text-white transition-colors"
          >
            Atau cek kalender ketersediaan 6 bulan ke depan →
          </Link>
        </div>
      </div>
    </section>
  );
}
