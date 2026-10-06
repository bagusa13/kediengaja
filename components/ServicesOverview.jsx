import Link from 'next/link';
import { Home, Mountain, Compass, Car, Check, ArrowRight, MessageCircle } from 'lucide-react';
import { waLink } from '@/lib/site';

const services = [
  {
    id: 'penginapan',
    title: 'Villa, Cabin & Homestay',
    tag: 'Pilihan Utama',
    badgeClass: 'bg-emerald-50 text-moss border border-emerald-200',
    icon: Home,
    summary:
      'Kamar bersih dan hangat untuk keluarga, pasangan, maupun rombongan.',
    highlights: [
      'Pasti ada air panas (water heater) 24 jam',
      'Kapasitas 2 hingga 15+ orang per unit',
      'Parkir aman untuk mobil pribadi',
      'Dekat tempat wisata dan warung makan',
    ],
    catalogLink: '/penginapan',
    catalogLabel: 'Lihat Penginapan',
    waPrompt: 'Halo Admin Kediengaja, saya ingin tanya ketersediaan penginapan di Dieng.',
  },
  {
    id: 'jeep',
    title: 'Sewa Jeep Wisata 4x4',
    tag: 'Petualangan',
    badgeClass: 'bg-slate-100 text-candi border border-slate-200',
    icon: Mountain,
    summary:
      'Keliling kawah, savana, dan bukit dengan Jeep offroad terbuka bersama sopir lokal yang siap bantu ambil foto.',
    highlights: [
      'Harga per mobil (muat hingga 4 orang)',
      'Sudah termasuk bensin dan sopir pemandu',
      'Sopir ramah & tahu spot foto terbaik',
      'Rute seru: Kawah Sikidang, Savana, Telaga',
    ],
    catalogLink: '/tours',
    catalogLabel: 'Lihat Pilihan Jeep',
    waPrompt: 'Halo Admin Kediengaja, saya ingin sewa Jeep 4x4 di Dieng.',
  },
  {
    id: 'tours',
    title: 'Paket Wisata & Open Trip',
    tag: 'Hemat & Praktis',
    badgeClass: 'bg-emerald-50 text-moss border border-emerald-200',
    icon: Compass,
    summary:
      'Jadwal santai ke sunrise Sikunir, candi purbakala, dan telaga tanpa ribet atur waktu dan tiket.',
    highlights: [
      'Bisa privat keluarga atau open trip hemat',
      'Sudah termasuk tiket semua tempat wisata',
      'Jadwal santai dan tidak terburu-buru',
      'Didampingi pemandu asli Dieng',
    ],
    catalogLink: '/tours',
    catalogLabel: 'Lihat Paket Trip',
    waPrompt: 'Halo Admin Kediengaja, saya ingin tanya paket wisata Dieng.',
  },
  {
    id: 'shuttle',
    title: 'Antar-Jemput Stasiun & Bandara',
    tag: 'Mobil Privat',
    badgeClass: 'bg-slate-100 text-candi border border-slate-200',
    icon: Car,
    summary:
      'Mobil jemputan privat langsung dari stasiun atau bandara menuju penginapan Dieng tanpa oper angkutan.',
    highlights: [
      'Mobil nyaman & ber-AC (Avanza, Innova, HiAce)',
      'Sopir berpengalaman di jalur tanjakan Dieng',
      'Area jemput: Jogja, Semarang, Solo, Purwokerto',
      'Diantar tepat waktu sampai depan kamar',
    ],
    catalogLink: null,
    catalogLabel: null,
    waPrompt: 'Halo Admin Kediengaja, saya butuh jemputan stasiun/bandara ke Dieng.',
  },
];

export default function ServicesOverview() {
  return (
    <section className="border-t border-stone-200 bg-white py-12 sm:py-16">
      <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
        <div className="max-w-2xl">
          <span className="inline-block rounded-full bg-emerald-50 px-3 py-1 text-xs font-bold uppercase tracking-wider text-moss border border-emerald-200">
            Layanan Kami
          </span>
          <h2 className="mt-2 font-display text-3xl font-extrabold tracking-tight text-ink sm:text-4xl">
            Semua Kebutuhan Liburan di Satu Tempat
          </h2>
          <p className="mt-2 text-xs sm:text-sm text-stone-600 leading-relaxed">
            Pilih layanan yang Anda cari, atau langsung konsultasikan rencana perjalanan Anda ke admin via WhatsApp.
          </p>
        </div>

        <div className="mt-10 grid grid-cols-1 gap-6 md:grid-cols-2">
          {services.map((item) => {
            const Icon = item.icon;
            const waChatUrl = waLink(item.waPrompt);

            return (
              <div
                key={item.id}
                className="flex flex-col justify-between rounded-xl border border-stone-200 bg-surface p-5 sm:p-6 transition-all duration-150 hover:-translate-y-0.5 hover:border-moss/40 hover:shadow-lift"
              >
                <div>
                  <div className="flex items-center justify-between gap-3">
                    <span className="flex h-10 w-10 items-center justify-center rounded-xl bg-moss text-white shadow-sm">
                      <Icon className="h-5 w-5" aria-hidden="true" />
                    </span>
                    <span className={`rounded-full px-2.5 py-0.5 text-[11px] font-bold ${item.badgeClass}`}>
                      {item.tag}
                    </span>
                  </div>

                  <h3 className="mt-4 font-display text-xl font-bold text-ink">{item.title}</h3>
                  <p className="mt-1.5 text-xs sm:text-sm leading-relaxed text-stone-600">{item.summary}</p>

                  <ul className="mt-4 space-y-2 border-t border-stone-200/80 pt-4 text-xs sm:text-sm text-stone-700">
                    {item.highlights.map((h, i) => (
                      <li key={i} className="flex items-start gap-2">
                        <Check className="h-4 w-4 text-moss shrink-0 mt-0.5" aria-hidden="true" />
                        <span>{h}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                <div className="mt-6 flex flex-wrap items-center gap-2.5 pt-4 border-t border-stone-200/80">
                  {item.catalogLink ? (
                    <Link
                      href={item.catalogLink}
                      className="inline-flex min-h-[42px] items-center gap-1.5 rounded-xl bg-ink px-4 text-xs font-bold text-white hover:bg-stone-800 active:scale-[0.98] transition-all"
                    >
                      {item.catalogLabel}
                      <ArrowRight className="h-3.5 w-3.5" aria-hidden="true" />
                    </Link>
                  ) : null}

                  <a
                    href={waChatUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex min-h-[42px] items-center gap-1.5 rounded-xl bg-wa px-4 text-xs font-bold text-white hover:bg-[#15803d] active:scale-[0.98] transition-all"
                  >
                    <MessageCircle className="h-3.5 w-3.5" aria-hidden="true" />
                    Tanya Admin WA
                  </a>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
