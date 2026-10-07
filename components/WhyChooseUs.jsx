import { Flame, Users, ShieldCheck, Navigation } from 'lucide-react';

const standards = [
  {
    icon: Flame,
    title: 'Air Panas 24 Jam Pasti Aktif',
    desc: 'Suhu malam Dieng bisa menyentuh 8°C. Seluruh kabin terdaftar wajib memiliki pemanas air aktif dan selimut tebal.',
  },
  {
    icon: Users,
    title: 'Sopir Asli Warga Dieng',
    desc: 'Armada Jeep 4x4 dikemudikan warga yang hafal medan tanjakan, jalur alternatif saat ramai, dan spot foto tersembunyi.',
  },
  {
    icon: ShieldCheck,
    title: 'Transparan Tanpa Biaya Tersembunyi',
    desc: 'Tarif sewa dan tur tertera jelas. Verifikasi jadwal dan pembayaran DP dilakukan langsung via WhatsApp resmi.',
  },
  {
    icon: Navigation,
    title: 'Rekomendasi Berdasarkan Cuaca Aktual',
    desc: 'Saran rute disesuaikan dengan kondisi kabut, hujan, atau embun upas hari itu agar trip Anda tidak sia-sia.',
  },
];

export default function WhyChooseUs() {
  return (
    <section className="border-b border-stone-200/90 bg-[#F5F4EE] py-16 sm:py-20">
      <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-start">
          {/* Editorial Headline Column (5 cols) */}
          <div className="lg:col-span-5">
            <p className="text-xs font-semibold tracking-widest uppercase text-forest/90">
              05 / Standar Kediengaja
            </p>
            <h2 className="mt-2 font-display text-2xl font-bold tracking-tight text-ink sm:text-3xl lg:text-4xl leading-tight">
              Kenyamanan Nyata di Dataran Tinggi
            </h2>
            <p className="mt-3 text-sm sm:text-base text-stone-600 leading-relaxed">
              Bukan janji manis tanpa bukti. Kami menyusun standar wajib bagi setiap kabin dan armada jeep yang bermitra dengan Kediengaja demi kepuasan liburan Anda.
            </p>
          </div>

          {/* Minimalist 2x2 Feature List (7 cols) - Zero card soup */}
          <div className="lg:col-span-7 grid grid-cols-1 sm:grid-cols-2 gap-6 sm:gap-8">
            {standards.map((item) => {
              const Icon = item.icon;
              return (
                <div key={item.title} className="flex flex-col space-y-2 border-t border-stone-300/70 pt-4">
                  <div className="flex items-center gap-2">
                    <span className="flex h-7 w-7 items-center justify-center rounded-lg bg-forest/10 text-forest shrink-0">
                      <Icon className="h-4 w-4" aria-hidden="true" />
                    </span>
                    <h3 className="font-display text-sm sm:text-base font-bold text-ink">
                      {item.title}
                    </h3>
                  </div>
                  <p className="text-xs sm:text-sm text-stone-600 leading-relaxed">
                    {item.desc}
                  </p>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}
