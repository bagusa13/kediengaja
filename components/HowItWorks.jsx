import { Search, CalendarCheck, MessageCircle, ShieldCheck } from 'lucide-react';
import { SITE, waLink } from '@/lib/site';

const steps = [
  {
    step: '01',
    title: 'Pilih Layanan',
    desc: 'Tentukan penginapan, sewa Jeep, atau jemputan stasiun yang Anda butuhkan.',
    icon: Search,
  },
  {
    step: '02',
    title: 'Cek Tanggal',
    desc: 'Lihat kalender web. Tanggal hijau berarti masih kosong dan siap dipesan.',
    icon: CalendarCheck,
  },
  {
    step: '03',
    title: 'Chat WhatsApp',
    desc: 'Kirim tanggal pilihan dan jumlah orang langsung ke admin lewat WhatsApp.',
    icon: MessageCircle,
  },
  {
    step: '04',
    title: 'Kunci Jadwal & DP',
    desc: 'Admin amankan jadwal, lalu pandu transfer DP resmi. Liburan Anda siap!',
    icon: ShieldCheck,
  },
];

export default function HowItWorks() {
  const chatHref = waLink('Halo Admin Kediengaja, saya ingin konsultasi rencana liburan ke Dieng.');

  return (
    <section className="border-t border-stone-200 bg-white py-12 sm:py-16">
      <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-2xl mx-auto mb-10">
          <span className="inline-block rounded-full bg-emerald-50 px-3 py-1 text-xs font-bold uppercase tracking-wider text-moss border border-emerald-200">
            Cara Pesan
          </span>
          <h2 className="mt-2 font-display text-3xl font-extrabold tracking-tight text-ink sm:text-4xl">
            Cara Pesan Sangat Mudah
          </h2>
          <p className="mt-1.5 text-stone-600 text-xs sm:text-sm">
            Tanpa perlu login dan tanpa kartu kredit. Cek jadwal di web, konfirmasi langsung via WhatsApp.
          </p>
        </div>

        <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {steps.map((item) => {
            const Icon = item.icon;
            return (
              <div
                key={item.step}
                className="relative flex flex-col justify-between rounded-xl border border-stone-200 bg-surface p-5 transition-all hover:border-moss/40 hover:shadow-soft"
              >
                <div>
                  <div className="flex items-center justify-between mb-3">
                    <span className="font-display text-2xl font-black text-moss/30">{item.step}</span>
                    <span className="flex h-9 w-9 items-center justify-center rounded-xl bg-emerald-50 text-moss">
                      <Icon className="h-4 w-4" aria-hidden="true" />
                    </span>
                  </div>
                  <h3 className="font-display text-base font-bold text-ink">{item.title}</h3>
                  <p className="mt-1 text-xs leading-relaxed text-stone-600">{item.desc}</p>
                </div>
              </div>
            );
          })}
        </div>

        <div className="mt-10 rounded-2xl border border-stone-200 bg-surface p-6 sm:p-7 text-center max-w-3xl mx-auto shadow-soft">
          <h3 className="font-display text-2xl font-bold text-ink">Mau Tanya Dulu?</h3>
          <p className="mt-1.5 text-xs sm:text-sm text-stone-600 max-w-xl mx-auto">
            Masih bingung pilih kamar atau mau tanya rute wisata? Silakan ngobrol santai dengan admin kami.
          </p>
          <div className="mt-5">
            <a
              href={chatHref}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex min-h-[46px] items-center gap-2 rounded-xl bg-wa px-6 text-sm font-bold text-white hover:bg-[#15803d] active:scale-[0.98] transition-all shadow-sm"
            >
              <MessageCircle className="h-4 w-4" aria-hidden="true" />
              Chat WhatsApp ({SITE.phoneDisplay})
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}
