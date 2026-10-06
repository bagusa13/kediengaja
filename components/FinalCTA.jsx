import { MessageCircle } from 'lucide-react';
import { SITE, waLink } from '@/lib/site';

export default function FinalCTA() {
  const directChat = waLink('Halo Admin Kediengaja, saya ingin konsultasi rencana liburan ke Dieng.');

  return (
    <section className="relative isolate overflow-hidden bg-slate-950 py-24 sm:py-32">
      {/* Background landscape photograph */}
      <img
        src="https://images.unsplash.com/photo-1506905925346-21bda4d32df4?auto=format&fit=crop&w=2000&q=80"
        alt="Lanskap perbukitan berselimut kabut di dataran tinggi Dieng"
        className="absolute inset-0 h-full w-full object-cover object-center"
        loading="lazy"
      />

      {/* Non-destructive CSS Overlay */}
      <div className="absolute inset-0 bg-slate-950/70" />
      <div className="absolute inset-0 bg-gradient-to-t from-slate-950/90 via-slate-950/40 to-slate-950/40" />

      {/* Content */}
      <div className="relative mx-auto max-w-4xl px-4 text-center sm:px-6 lg:px-8">
        <p className="text-xs font-bold tracking-widest uppercase text-stone-300">
          Dataran Tinggi Dieng · Jawa Tengah
        </p>

        <h2 className="mt-4 font-display text-3xl font-extrabold tracking-tight text-white sm:text-5xl lg:text-6xl">
          Siap Berangkat ke Dieng?
        </h2>

        <p className="mx-auto mt-4 max-w-xl text-sm sm:text-base leading-relaxed text-stone-200">
          Hubungi kami untuk informasi penginapan, paket wisata, atau perjalanan lainnya. Kami siap membantu merencanakan liburan Anda.
        </p>

        <div className="mt-8 flex justify-center">
          <a
            href={directChat}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex min-h-[48px] items-center gap-2 rounded-xl bg-wa px-6 text-sm font-bold text-white shadow-lift hover:bg-[#15803d] active:scale-[0.98] transition-all"
          >
            <MessageCircle className="h-4.5 w-4.5" aria-hidden="true" />
            <span>Chat WhatsApp ({SITE.phoneDisplay})</span>
          </a>
        </div>
      </div>
    </section>
  );
}
