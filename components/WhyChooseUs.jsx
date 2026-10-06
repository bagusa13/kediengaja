import { Flame, Mountain, Car, Users } from 'lucide-react';

const features = [
  {
    icon: Flame,
    title: 'Water Heater 24 Jam',
    description: 'Nyaman di udara dingin Dieng, kapan saja.',
  },
  {
    icon: Mountain,
    title: 'Jeep 4x4 Offroad',
    description: 'Jelajahi spot terbaik Dieng dengan jeep.',
  },
  {
    icon: Car,
    title: 'Antar-Jemput',
    description: 'Layanan jemput dan antar sesuai kebutuhan.',
  },
  {
    icon: Users,
    title: 'Dikelola Warga Lokal',
    description: 'Pengalaman lebih autentik bersama orang lokal.',
  },
];

export default function WhyChooseUs() {
  return (
    <section className="border-t border-stone-200/70 bg-cream py-16 sm:py-20">
      <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
        {/* Editorial Heading */}
        <div className="max-w-2xl">
          <p className="text-xs font-bold tracking-wider uppercase text-forest">
            Kenyamanan &amp; Pelayanan
          </p>
          <h2 className="mt-2 font-display text-2xl font-bold tracking-tight text-ink sm:text-3xl lg:text-4xl">
            Pengalaman Lebih dari Sekadar Menginap
          </h2>
          <p className="mt-2 text-sm text-stone-600 leading-relaxed">
            Standar fasilitas dan pendampingan terpercaya agar liburan Anda di dataran tinggi terasa hangat dan berkesan.
          </p>
        </div>

        {/* 4 Concise Features with Clean Dividers */}
        <div className="mt-12 grid grid-cols-1 divide-y divide-stone-200/80 border-y border-stone-200/80 sm:grid-cols-2 sm:divide-y-0 sm:divide-x lg:grid-cols-4">
          {features.map((item, idx) => {
            const Icon = item.icon;
            return (
              <div
                key={item.title}
                className={`py-6 sm:py-8 ${
                  idx === 0
                    ? 'sm:pr-6 lg:pr-6'
                    : idx === 1
                    ? 'sm:px-6 lg:px-6'
                    : idx === 2
                    ? 'sm:px-6 lg:px-6'
                    : 'sm:pl-6 lg:pl-6'
                }`}
              >
                <div className="flex items-center gap-3">
                  <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-stone-100 text-forest">
                    <Icon className="h-4.5 w-4.5" aria-hidden="true" />
                  </span>
                  <h3 className="font-display text-base font-bold text-ink">
                    {item.title}
                  </h3>
                </div>
                <p className="mt-3 text-xs sm:text-sm text-stone-600 leading-relaxed">
                  {item.description}
                </p>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
