import { MessageCircle, MapPin, Instagram, Clock, Phone } from 'lucide-react';
import { SITE, waLink } from '@/lib/site';

export const metadata = {
  title: 'Kontak Resmi & Informasi | Kediengaja',
  description: 'Hubungi pengelola resmi Kediengaja untuk pemesanan villa, sewa Jeep 4x4, dan konsultasi liburan Dataran Tinggi Dieng.',
};

export default function KontakPage() {
  const directChat = waLink('Halo Kediengaja, saya ingin konsultasi rencana liburan ke Dieng.');

  return (
    <main className="bg-cream/30 min-h-screen py-16 sm:py-24">
      <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8">
        <span className="inline-block rounded-md bg-forest/10 px-3 py-1 text-xs font-bold tracking-wider uppercase text-forest">
          Pusat Bantuan &amp; Reservasi
        </span>
        <h1 className="mt-3 font-display text-3xl font-extrabold tracking-tight text-ink sm:text-5xl">
          Kontak Resmi Kediengaja
        </h1>
        <p className="mt-3 text-sm sm:text-base text-stone-600">
          Semua pertanyaan, pengecekan jadwal kamar, dan pemesanan Jeep dilayani langsung melalui WhatsApp resmi kami setiap hari.
        </p>

        <div className="mt-10 grid gap-6 sm:grid-cols-2">
          {/* WhatsApp Card */}
          <div className="rounded-2xl border border-emerald-200/80 bg-white p-6 shadow-soft">
            <span className="inline-flex h-10 w-10 items-center justify-center rounded-xl bg-emerald-50 text-wa mb-3">
              <MessageCircle className="h-5 w-5" />
            </span>
            <h2 className="font-display text-lg font-bold text-ink">
              WhatsApp Layanan Pelanggan
            </h2>
            <p className="mt-1 text-xs text-stone-500">
              Respon cepat setiap hari pukul 06.00 – 22.00 WIB
            </p>
            <p className="mt-3 font-display text-xl font-black text-forest">
              {SITE.phoneDisplay}
            </p>
            <a
              href={directChat}
              target="_blank"
              rel="noopener noreferrer"
              className="mt-5 inline-flex min-h-[42px] w-full items-center justify-center gap-2 rounded-xl bg-wa px-4 text-xs font-bold text-white hover:bg-[#15803d] transition"
            >
              <MessageCircle className="h-4 w-4" />
              <span>Buka Chat WhatsApp</span>
            </a>
          </div>

          {/* Social & Basecamp Info */}
          <div className="space-y-4">
            <div className="rounded-xl border border-stone-200/80 bg-white p-5">
              <div className="flex items-start gap-3">
                <MapPin className="h-5 w-5 text-forest shrink-0 mt-0.5" />
                <div>
                  <h3 className="font-bold text-ink text-sm">Alamat &amp; Area Layanan</h3>
                  <p className="mt-1 text-xs text-stone-600 leading-relaxed">
                    {SITE.location}
                  </p>
                </div>
              </div>
            </div>

            <div className="rounded-xl border border-stone-200/80 bg-white p-5">
              <div className="flex items-start gap-3">
                <Instagram className="h-5 w-5 text-forest shrink-0 mt-0.5" />
                <div>
                  <h3 className="font-bold text-ink text-sm">Media Sosial Resmi</h3>
                  <p className="mt-1 text-xs text-stone-600">
                    Instagram: <a href={SITE.instagram} target="_blank" rel="noopener noreferrer" className="font-semibold text-forest hover:underline">@kediengaja</a>
                  </p>
                  <p className="text-xs text-stone-600">
                    TikTok: <a href={SITE.tiktok} target="_blank" rel="noopener noreferrer" className="font-semibold text-forest hover:underline">@kediengaja</a>
                  </p>
                </div>
              </div>
            </div>

            <div className="rounded-xl border border-stone-200/80 bg-white p-5">
              <div className="flex items-start gap-3">
                <Clock className="h-5 w-5 text-forest shrink-0 mt-0.5" />
                <div>
                  <h3 className="font-bold text-ink text-sm">Ketentuan Booking</h3>
                  <p className="mt-1 text-xs text-stone-600 leading-relaxed">
                    DP dibayarkan setelah tanggal diverifikasi oleh admin. Bukti reservasi resmi akan dikirimkan langsung ke nomor WhatsApp Anda.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}
