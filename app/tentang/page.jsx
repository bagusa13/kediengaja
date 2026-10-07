import { ShieldCheck, Users, Flame, Mountain, MessageCircle } from 'lucide-react';
import { SITE, waLink } from '@/lib/site';

export const metadata = {
  title: 'Tentang Kami | Kediengaja Platform Wisata Dataran Tinggi',
  description: 'Mengenal Kediengaja: Platform akomodasi dan pariwisata yang dikelola langsung oleh warga lokal Dataran Tinggi Dieng.',
};

export default function TentangPage() {
  const directChat = waLink('Halo Kediengaja, saya ingin konsultasi rencana liburan ke Dieng.');

  return (
    <main className="bg-cream/30 min-h-screen py-16 sm:py-24">
      <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8">
        <span className="inline-block rounded-md bg-forest/10 px-3 py-1 text-xs font-bold tracking-wider uppercase text-forest">
          Profil &amp; Komitmen
        </span>
        <h1 className="mt-3 font-display text-3xl font-extrabold tracking-tight text-ink sm:text-5xl">
          Kenal Dieng dari Orang Lokal
        </h1>

        <div className="mt-8 space-y-6 text-sm sm:text-base leading-relaxed text-stone-700">
          <p>
            Kediengaja lahir dari pengalaman nyata kehidupan sehari-hari di Dataran Tinggi Dieng. Kami tumbuh di antara kebun kentang berundak, merasakan hawa subuh yang menusuk tulang saat embun upas turun, dan hafal jalur-jalur tanjakan sempit yang sering membingungkan wisatawan luar kota.
          </p>
          <p>
            Banyak wisatawan mengeluh saat liburan ke Dieng: kamar mandi tidak ada air panas, mobil mogok di tanjakan ekstrem, atau memesan paket trip lewat perantara yang tidak paham kondisi lapangan.
          </p>
          <p className="font-semibold text-ink">
            Kediengaja hadir untuk memastikan hal tersebut tidak terjadi pada liburan Anda.
          </p>
          <p>
            Setiap villa dan kabin yang kami kurasi wajib memiliki water heater aktif 24 jam. Setiap armada Jeep 4x4 dikemudikan oleh sopir lokal berpengalaman yang tahu ritme jalan dan hafal sudut foto terbaik. Serta seluruh proses tanya jawab dan konfirmasi pembayaran dipandu secara ramah melalui WhatsApp resmi.
          </p>
        </div>

        {/* 3 Pillars */}
        <div className="mt-12 grid gap-6 sm:grid-cols-3">
          <div className="rounded-xl border border-stone-200/80 bg-white p-5">
            <Flame className="h-6 w-6 text-forest mb-2" />
            <h3 className="font-bold text-ink text-sm">Pasti Air Panas 24 Jam</h3>
            <p className="mt-1 text-xs text-stone-600">Suhu Dieng dingin, kami pastikan kamar mandi selalu hangat.</p>
          </div>
          <div className="rounded-xl border border-stone-200/80 bg-white p-5">
            <Users className="h-6 w-6 text-forest mb-2" />
            <h3 className="font-bold text-ink text-sm">Warga Lokal Asli</h3>
            <p className="mt-1 text-xs text-stone-600">Dipandu langsung oleh masyarakat yang tinggal di sini.</p>
          </div>
          <div className="rounded-xl border border-stone-200/80 bg-white p-5">
            <ShieldCheck className="h-6 w-6 text-forest mb-2" />
            <h3 className="font-bold text-ink text-sm">Transparan &amp; Jelas</h3>
            <p className="mt-1 text-xs text-stone-600">Fasilitas dan slot dipastikan dulu sebelum Anda bayar DP.</p>
          </div>
        </div>

        <div className="mt-12 text-center border-t border-stone-200/80 pt-10">
          <a
            href={directChat}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex min-h-[46px] items-center gap-2 rounded-xl bg-wa px-6 text-sm font-bold text-white shadow-lift hover:bg-[#15803d] transition"
          >
            <MessageCircle className="h-4.5 w-4.5" />
            <span>Ngobrol Santai via WhatsApp Admin</span>
          </a>
        </div>
      </div>
    </main>
  );
}
