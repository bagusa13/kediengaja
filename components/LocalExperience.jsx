import { CheckCircle2 } from 'lucide-react';

export default function LocalExperience() {
  return (
    <section id="tentang" className="scroll-mt-20 border-t border-stone-200/70 bg-white py-16 sm:py-24">
      <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
        <div className="grid gap-12 lg:grid-cols-12 lg:items-center">
          {/* Main Story Text */}
          <div className="lg:col-span-7">
            <p className="text-xs font-bold tracking-wider uppercase text-forest">
              Otentik &amp; Terpercaya
            </p>
            <h2 className="mt-2 font-display text-2xl font-bold tracking-tight text-ink sm:text-3xl lg:text-4xl">
              Kenal Dieng dari Orang Lokal
            </h2>

            <div className="mt-5 space-y-4 text-sm sm:text-base leading-relaxed text-stone-600">
              <p>
                Kami tinggal dan beraktivitas di dataran tinggi ini setiap hari. Kami hafal kapan kabut mulai tebal, bagaimana perubahan suhu saat malam tiba, dan rute mana yang nyaman untuk dilalui keluarga.
              </p>
              <p>
                Kediengaja hadir untuk menghubungkan Anda langsung dengan unit penginapan hangat, armada Jeep 4x4 berizin, dan layanan antar-jemput yang dikemudikan oleh warga Dieng sendiri.
              </p>
              <p className="font-medium text-stone-800">
                Bukan sekadar perantara, kami memastikan setiap detail kecil—mulai dari ketersediaan air panas hingga kesiapan sopir—terjaga dengan baik sebelum Anda tiba.
              </p>
            </div>
          </div>

          {/* 3 Human & Honest Values */}
          <div className="space-y-4 lg:col-span-5">
            <div className="rounded-xl border border-stone-200/80 bg-cream p-5">
              <h3 className="font-display text-base font-bold text-ink">
                Pendampingan Nyata
              </h3>
              <p className="mt-1.5 text-xs text-stone-600 leading-relaxed">
                Anda berkomunikasi langsung dengan warga lokal melalui WhatsApp untuk memastikan kondisi kamar dan rute perjalanan.
              </p>
            </div>

            <div className="rounded-xl border border-stone-200/80 bg-cream p-5">
              <h3 className="font-display text-base font-bold text-ink">
                Ritme Perjalanan yang Masuk Akal
              </h3>
              <p className="mt-1.5 text-xs text-stone-600 leading-relaxed">
                Kami memberi saran jujur mengenai jam berangkat sunrise, perkiraan kabut, dan jalur bebas macet agar liburan tidak terburu-buru.
              </p>
            </div>

            <div className="rounded-xl border border-stone-200/80 bg-cream p-5">
              <h3 className="font-display text-base font-bold text-ink">
                Transparan Sejak Awal
              </h3>
              <p className="mt-1.5 text-xs text-stone-600 leading-relaxed">
                Semua fasilitas kamar, kapasitas tamu, dan harga paket dijelaskan secara terbuka sebelum Anda membayar uang muka.
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
