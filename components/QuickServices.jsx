import Link from 'next/link';
import { Home, Compass, Sparkles, Calendar, ArrowRight, ArrowUpRight, CheckCircle2 } from 'lucide-react';

export default function QuickServices() {
  return (
    <section className="border-b border-stone-200/80 bg-stone-50/70 py-12 sm:py-16">
      <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col sm:flex-row sm:items-end sm:justify-between gap-4 mb-8">
          <div>
            <p className="text-xs font-bold tracking-wider uppercase text-forest">
              Layanan Utama
            </p>
            <h2 className="mt-1 font-display text-2xl font-bold tracking-tight text-ink sm:text-3xl">
              Mau ke Dieng untuk apa?
            </h2>
          </div>
          <p className="text-xs sm:text-sm text-stone-600 max-w-md">
            Pilih kebutuhan perjalanan Anda. Seluruh akomodasi dan rute diatur langsung bersama warga lokal Dieng.
          </p>
        </div>

        {/* Hierarchical Discovery Grid: Photo-led stays/jeep + utility availability */}
        <div className="grid grid-cols-1 md:grid-cols-12 gap-5">
          {/* 1. Photography-Led: Menginap (Cabin & Villa) */}
          <Link
            href="/penginapan"
            className="group relative md:col-span-6 flex flex-col justify-end overflow-hidden rounded-2xl bg-slate-950 min-h-[220px] sm:min-h-[250px] p-6 text-white shadow-xs transition hover:shadow-md"
          >
            <img
              src="/images/cabin-house-1/bigbed.jpg"
              alt="Kabin dan Penginapan Hangat Dieng"
              className="absolute inset-0 h-full w-full object-cover opacity-60 transition-transform duration-500 group-hover:scale-105"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/40 to-transparent" />
            <div className="relative z-10">
              <div className="flex items-center justify-between mb-2">
                <span className="inline-flex items-center gap-1.5 rounded-md bg-white/20 px-2.5 py-1 text-[11px] font-bold text-white backdrop-blur-xs">
                  <Home className="h-3.5 w-3.5" />
                  <span>Akomodasi</span>
                </span>
                <span className="flex h-8 w-8 items-center justify-center rounded-full bg-white/20 backdrop-blur-xs text-white transition group-hover:bg-white group-hover:text-ink">
                  <ArrowUpRight className="h-4 w-4" />
                </span>
              </div>
              <h3 className="font-display text-xl font-bold sm:text-2xl text-white">
                Sewa Cabin &amp; Homestay
              </h3>
              <p className="mt-1 text-xs sm:text-sm text-stone-200 line-clamp-2">
                Kabin kayu estetik dengan jaminan water heater 24 jam dan view langsung pegunungan.
              </p>
            </div>
          </Link>

          {/* 2. Photography-Led: Jeep 4x4 */}
          <Link
            href="/jeep-dieng"
            className="group relative md:col-span-6 flex flex-col justify-end overflow-hidden rounded-2xl bg-slate-950 min-h-[220px] sm:min-h-[250px] p-6 text-white shadow-xs transition hover:shadow-md"
          >
            <img
              src="https://images.unsplash.com/photo-1533473359331-0135ef1b58bf?auto=format&fit=crop&w=1000&q=80"
              alt="Armada Jeep 4x4 Dieng"
              className="absolute inset-0 h-full w-full object-cover opacity-60 transition-transform duration-500 group-hover:scale-105"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/40 to-transparent" />
            <div className="relative z-10">
              <div className="flex items-center justify-between mb-2">
                <span className="inline-flex items-center gap-1.5 rounded-md bg-white/20 px-2.5 py-1 text-[11px] font-bold text-white backdrop-blur-xs">
                  <Compass className="h-3.5 w-3.5" />
                  <span>Jelajah Alam</span>
                </span>
                <span className="flex h-8 w-8 items-center justify-center rounded-full bg-white/20 backdrop-blur-xs text-white transition group-hover:bg-white group-hover:text-ink">
                  <ArrowUpRight className="h-4 w-4" />
                </span>
              </div>
              <h3 className="font-display text-xl font-bold sm:text-2xl text-white">
                Jeep 4x4 Offroad Wisata
              </h3>
              <p className="mt-1 text-xs sm:text-sm text-stone-200 line-clamp-2">
                Jalur kawah, savana Pangonan, dan sunrise Sikunir bersama armada 4x4 &amp; driver pemandu lokal.
              </p>
            </div>
          </Link>

          {/* 3. Editorial Service Card: Paket Wisata & Trip Builder */}
          <div className="md:col-span-7 flex flex-col justify-between rounded-2xl border border-stone-200/90 bg-white p-6 shadow-xs">
            <div>
              <div className="flex items-center justify-between">
                <span className="inline-flex items-center gap-1.5 text-xs font-bold uppercase tracking-wider text-forest">
                  <Sparkles className="h-4 w-4 text-forest" />
                  <span>Paket All-In &amp; Custom Trip</span>
                </span>
                <Link
                  href="/trip-builder"
                  className="text-xs font-bold text-forest hover:underline inline-flex items-center gap-1"
                >
                  <span>Trip Builder</span>
                  <ArrowRight className="h-3.5 w-3.5" />
                </Link>
              </div>
              <h3 className="mt-3 font-display text-lg sm:text-xl font-bold text-ink">
                Paket Wisata Terpadu atau Rancang Sendiri
              </h3>
              <p className="mt-1.5 text-xs sm:text-sm text-stone-600 leading-relaxed">
                Pilih paket open trip sunrise, privat rombongan 2D1N all-in dengan antar-jemput, atau gunakan Trip Builder untuk menyusun rencana perjalanan mandiri sesuai budget.
              </p>
            </div>
            <div className="mt-5 pt-4 border-t border-stone-100 flex flex-wrap items-center gap-3">
              <Link
                href="/tours"
                className="inline-flex min-h-[38px] items-center gap-1.5 rounded-lg bg-stone-100 px-3.5 text-xs font-bold text-ink hover:bg-stone-200 transition"
              >
                <span>Lihat Paket Wisata</span>
                <ArrowRight className="h-3.5 w-3.5" />
              </Link>
              <Link
                href="/trip-builder"
                className="inline-flex min-h-[38px] items-center gap-1.5 rounded-lg border border-forest/30 bg-forest/5 px-3.5 text-xs font-bold text-forest hover:bg-forest/10 transition"
              >
                <span>Coba Trip Builder</span>
              </Link>
            </div>
          </div>

          {/* 4. Action & Utility Card: Realtime Availability */}
          <div className="md:col-span-5 flex flex-col justify-between rounded-2xl border border-emerald-200/90 bg-emerald-50/50 p-6 shadow-xs">
            <div>
              <div className="flex items-center justify-between">
                <span className="inline-flex items-center gap-1.5 text-xs font-bold uppercase tracking-wider text-forest">
                  <Calendar className="h-4 w-4 text-forest" />
                  <span>Cek Ketersediaan</span>
                </span>
                <span className="inline-flex items-center gap-1 rounded-full bg-emerald-100 px-2 py-0.5 text-[10px] font-bold text-forest">
                  <span className="h-1.5 w-1.5 rounded-full bg-emerald-600 animate-pulse" />
                  Live Sync
                </span>
              </div>
              <h3 className="mt-3 font-display text-lg sm:text-xl font-bold text-ink">
                Kalender Tanggal Menginap
              </h3>
              <p className="mt-1.5 text-xs sm:text-sm text-stone-600 leading-relaxed">
                Hindari bentrok jadwal. Cek langsung tanggal yang masih kosong untuk cabin dan villa mitra hingga 6 bulan ke depan.
              </p>
            </div>
            <div className="mt-5 pt-4 border-t border-emerald-200/60">
              <Link
                href="/availability"
                className="inline-flex min-h-[40px] w-full items-center justify-center gap-2 rounded-xl bg-forest px-4 text-xs font-bold text-white shadow-xs hover:bg-forest-light active:scale-[0.98] transition"
              >
                <Calendar className="h-4 w-4" />
                <span>Buka Kalender Ketersediaan</span>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
