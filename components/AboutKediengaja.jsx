import { ShieldCheck, Flame, Users2, MapPinned, MessageCircle } from 'lucide-react';
import { SITE, waLink } from '@/lib/site';

export default function AboutKediengaja() {
  const directConsultation = waLink('Halo Admin Kediengaja, saya ingin konsultasi rencana liburan ke Dieng.');

  return (
    <section className="border-t border-stone-200 bg-surface py-12 sm:py-16">
      <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
        <div className="grid gap-10 lg:grid-cols-12 lg:items-center">
          {/* Kolom Teks Profil */}
          <div className="lg:col-span-7">
            <span className="inline-block rounded-full bg-emerald-50 px-3 py-1 text-xs font-bold uppercase tracking-wider text-moss border border-emerald-200">
              Tentang Kediengaja
            </span>
            <h2 className="mt-3 font-display text-3xl font-extrabold tracking-tight text-ink sm:text-4xl leading-tight">
              Liburan ke Dieng Jadi Nyaman &amp; Tenang
            </h2>
            <div className="mt-4 space-y-2 text-sm sm:text-base leading-relaxed text-stone-600">
              <p>
                <strong className="text-ink">Kediengaja</strong> dikelola langsung oleh warga lokal Dieng. Kami bantu siapkan penginapan yang hangat, sewa Jeep 4x4, paket keliling wisata, sampai jemputan dari stasiun atau bandara.
              </p>
              <p>
                Pemesanan dipandu santai lewat WhatsApp. Anda bisa tanya rekomendasi rute, cek kondisi kamar, dan pastikan jadwal sebelum bayar.
              </p>
            </div>

            <div className="mt-6 flex flex-wrap items-center gap-3">
              <a
                href={directConsultation}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex min-h-[46px] items-center gap-2 rounded-xl bg-wa px-5 text-sm font-bold text-white shadow-sm hover:bg-[#15803d] active:scale-[0.98] transition-all"
              >
                <MessageCircle className="h-4 w-4" aria-hidden="true" />
                Tanya Admin via WhatsApp
              </a>
              <span className="text-xs font-medium text-stone-500">
                Bebas tanya-tanya • Respon ramah setiap hari
              </span>
            </div>
          </div>

          {/* Kolom Nilai & Komitmen Layanan */}
          <div className="space-y-3 lg:col-span-5">
            <div className="rounded-xl border border-stone-200 bg-white p-4 shadow-soft transition-all duration-150 hover:border-moss/40 hover:shadow-lift">
              <div className="flex items-start gap-3.5">
                <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-emerald-50 text-moss">
                  <Flame className="h-5 w-5" />
                </span>
                <div>
                  <h3 className="font-display text-base font-bold text-ink">Air Panas 24 Jam</h3>
                  <p className="mt-1 text-xs text-stone-600 leading-relaxed">
                    Suhu Dieng dingin menusuk. Semua kamar mitra kami wajib ada air panas aktif agar Anda nyaman saat mandi.
                  </p>
                </div>
              </div>
            </div>

            <div className="rounded-xl border border-stone-200 bg-white p-4 shadow-soft transition-all duration-150 hover:border-moss/40 hover:shadow-lift">
              <div className="flex items-start gap-3.5">
                <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-emerald-50 text-moss">
                  <Users2 className="h-5 w-5" />
                </span>
                <div>
                  <h3 className="font-display text-base font-bold text-ink">Sopir &amp; Pemandu Asli Dieng</h3>
                  <p className="mt-1 text-xs text-stone-600 leading-relaxed">
                    Warga lokal ramah yang paham jalan tanjakan dan tahu spot foto terbaik tanpa antre panjang.
                  </p>
                </div>
              </div>
            </div>

            <div className="rounded-xl border border-stone-200 bg-white p-4 shadow-soft transition-all duration-150 hover:border-moss/40 hover:shadow-lift">
              <div className="flex items-start gap-3.5">
                <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-slate-100 text-candi">
                  <MapPinned className="h-5 w-5" />
                </span>
                <div>
                  <h3 className="font-display text-base font-bold text-ink">Jemputan Stasiun &amp; Bandara</h3>
                  <p className="mt-1 text-xs text-stone-600 leading-relaxed">
                    Mobil privat jemput langsung dari Jogja, Solo, Semarang, atau Purwokerto sampai depan penginapan.
                  </p>
                </div>
              </div>
            </div>

            <div className="rounded-xl border border-stone-200 bg-white p-4 shadow-soft transition-all duration-150 hover:border-moss/40 hover:shadow-lift">
              <div className="flex items-start gap-3.5">
                <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-emerald-50 text-moss">
                  <ShieldCheck className="h-5 w-5" />
                </span>
                <div>
                  <h3 className="font-display text-base font-bold text-ink">Aman &amp; Jelas</h3>
                  <p className="mt-1 text-xs text-stone-600 leading-relaxed">
                    Jadwal dan kamar dicek dulu sampai pasti, baru Anda transfer DP. Tanpa biaya mendadak.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
