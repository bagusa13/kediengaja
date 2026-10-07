import { Home, Users, CheckCircle, Navigation } from 'lucide-react';

const reasons = [
  {
    icon: Home,
    title: 'Penginapan Nyata di Kawasan Dieng',
    desc: 'Semua kabin dan villa benar-benar berada di dataran tinggi Dieng. Bersih, terawat, dan dilengkapi water heater aktif 24 jam untuk mengatasi suhu dingin malam hari.',
  },
  {
    icon: Users,
    title: 'Driver & Guide Asli Dieng',
    desc: 'Didampingi warga lokal yang hafal medan perbukitan, jalur alternatif saat musim ramai, serta titik terbaik untuk menikmati kabut dan matahari terbit.',
  },
  {
    icon: CheckCircle,
    title: 'Konfirmasi Langsung & Pasti',
    desc: 'Jadwal dan slot dikonfirmasi langsung oleh tim lokal lewat WhatsApp resmi. Tanpa perantara berlapis dan tanpa biaya tersembunyi.',
  },
  {
    icon: Navigation,
    title: 'Rute & Rekomendasi Nyata',
    desc: 'Saran waktu kunjungan disesuaikan dengan kondisi cuaca aktual di Dieng hari itu, agar liburan Anda tidak terbuang karena salah jam berkunjung.',
  },
];

export default function WhyChooseUs() {
  return (
    <section className="border-b border-stone-200/80 bg-brand-cream/60 py-16 sm:py-24">
      <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
        {/* Section Heading */}
        <div className="max-w-2xl">
          <p className="text-xs font-bold tracking-wider uppercase text-brand-green">
            Kelebihan Bersama Warga Lokal
          </p>
          <h2 className="mt-1 font-display text-2xl font-bold tracking-tight text-brand-ink sm:text-3xl lg:text-4xl">
            Kenapa Ke Dieng Aja?
          </h2>
          <p className="mt-3 text-sm sm:text-base text-stone-600 leading-relaxed">
            Ke Dieng Aja menghubungkan Anda langsung dengan warga lokal dan pengalaman dataran tinggi yang sesungguhnya.
          </p>
        </div>

        {/* 4 Concrete Proof Points with Clean Layout */}
        <div className="mt-12 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {reasons.map((item) => {
            const Icon = item.icon;
            return (
              <div
                key={item.title}
                className="flex flex-col rounded-xl border border-stone-200/90 bg-white p-6 shadow-xs"
              >
                <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-lg bg-stone-100 text-brand-dark mb-4">
                  <Icon className="h-5 w-5 text-brand-dark" aria-hidden="true" />
                </span>
                <h3 className="font-display text-base font-bold text-brand-ink leading-snug">
                  {item.title}
                </h3>
                <p className="mt-2.5 text-xs sm:text-sm text-stone-600 leading-relaxed flex-1">
                  {item.desc}
                </p>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
