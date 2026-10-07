import Link from 'next/link';
import { Home, Compass, Sparkles, Calendar, ArrowUpRight } from 'lucide-react';

const services = [
  {
    title: 'Menginap',
    subtitle: 'Cabin & Villa Dieng',
    desc: 'Kabin kayu hangat dan villa keluarga dengan fasilitas water heater 24 jam.',
    href: '#penginapan',
    icon: Home,
  },
  {
    title: 'Jeep 4x4',
    subtitle: 'Offroad Alam Dieng',
    desc: 'Jelajah jalur kawah, savana Lembah Pangonan, hingga puncak Sikunir bersama sopir lokal.',
    href: '/jeep-dieng',
    icon: Compass,
  },
  {
    title: 'Paket Wisata',
    subtitle: 'Open & Private Trip',
    desc: 'Trip praktis all-in untuk keluarga, teman kantor, atau gabungan sunrise Sikunir.',
    href: '#paket-wisata',
    icon: Sparkles,
  },
  {
    title: 'Cek Ketersediaan',
    subtitle: 'Jadwal Tanggal Kosong',
    desc: 'Pastikan ketersediaan kamar dan jadwal armada sebelum Anda memesan tiket perjalanan.',
    href: '#cek-ketersediaan',
    icon: Calendar,
  },
];

export default function QuickServices() {
  return (
    <section className="border-b border-stone-200/80 bg-brand-cream/60 py-12 sm:py-16">
      <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col sm:flex-row sm:items-end sm:justify-between gap-4 mb-8">
          <div>
            <p className="text-xs font-bold tracking-wider uppercase text-brand-green">
              Layanan Perjalanan
            </p>
            <h2 className="mt-1 font-display text-2xl font-bold tracking-tight text-brand-ink sm:text-3xl">
              Mau ke Dieng untuk apa?
            </h2>
          </div>
          <p className="text-xs sm:text-sm text-stone-600 max-w-md">
            Pilih layanan yang Anda butuhkan. Semua dikoordinasikan langsung bersama tim dan warga lokal Dieng.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-5">
          {services.map((item) => {
            const Icon = item.icon;
            return (
              <Link
                key={item.title}
                href={item.href}
                className="group relative flex flex-col justify-between rounded-xl border border-stone-200/90 bg-white p-5 sm:p-6 transition-all duration-200 hover:border-brand-green hover:shadow-sm"
              >
                <div>
                  <div className="flex items-center justify-between">
                    <span className="flex h-10 w-10 items-center justify-center rounded-lg bg-stone-100 text-brand-dark transition-colors group-hover:bg-brand-dark group-hover:text-white">
                      <Icon className="h-5 w-5" aria-hidden="true" />
                    </span>
                    <ArrowUpRight className="h-4 w-4 text-stone-400 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5 group-hover:text-brand-green" />
                  </div>
                  <h3 className="mt-4 font-display text-lg font-bold text-brand-ink">
                    {item.title}
                  </h3>
                  <p className="text-xs font-semibold text-brand-green">
                    {item.subtitle}
                  </p>
                  <p className="mt-2 text-xs text-stone-600 leading-relaxed">
                    {item.desc}
                  </p>
                </div>
              </Link>
            );
          })}
        </div>
      </div>
    </section>
  );
}
