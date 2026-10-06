import { MessageCircle, Instagram, MapPin, Mail, ExternalLink } from 'lucide-react';
import { SITE, waLink } from '@/lib/site';

function TikTokIcon({ className }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="currentColor">
      <path d="M19.59 6.69a4.83 4.83 0 0 1-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 0 1-5.2 1.74 2.89 2.89 0 0 1 2.31-4.64c.29 0 .58.04.86.12V9.4a6.33 6.33 0 0 0-.86-.06 6.34 6.34 0 0 0-6.34 6.34 6.34 6.34 0 0 0 6.34 6.34 6.34 6.34 0 0 0 6.34-6.34V8.56a8.27 8.27 0 0 0 4.77 1.52V6.69z" />
    </svg>
  );
}

export default function OfficialContactHub() {
  const directChat = waLink('Halo Admin Kediengaja, saya ingin menghubungi pihak Kediengaja.');

  return (
    <section className="border-t border-stone-200 bg-white py-12 sm:py-16">
      <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-2xl mx-auto mb-8">
          <span className="inline-block rounded-full bg-emerald-50 px-3 py-1 text-xs font-bold uppercase tracking-wider text-moss border border-emerald-200">
            Kontak Resmi
          </span>
          <h2 className="mt-2 font-display text-3xl font-extrabold tracking-tight text-ink sm:text-4xl">
            Hubungi Kediengaja
          </h2>
          <p className="mt-1.5 text-stone-600 text-xs sm:text-sm">
            Agar aman, pastikan Anda hanya menghubungi kontak dan media sosial resmi Kediengaja berikut.
          </p>
        </div>

        <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {/* WhatsApp Card */}
          <a
            href={directChat}
            target="_blank"
            rel="noopener noreferrer"
            className="flex flex-col justify-between rounded-xl border border-stone-200 bg-surface p-5 transition-all duration-150 hover:border-wa hover:shadow-lift hover:-translate-y-0.5 group"
          >
            <div>
              <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-wa text-white mb-4">
                <MessageCircle className="h-6 w-6" />
              </div>
              <h3 className="font-display text-lg text-ink group-hover:text-wa transition-colors">
                WhatsApp Resmi
              </h3>
              <p className="mt-1 text-xs text-stone-500">Respon ramah setiap hari</p>
              <p className="mt-3 font-semibold text-sm text-ink">{SITE.phoneDisplay}</p>
            </div>
            <span className="mt-5 inline-flex items-center gap-1 text-xs font-semibold text-wa">
              Mulai Chat <ExternalLink className="h-3 w-3" />
            </span>
          </a>

          {/* Instagram Card */}
          <a
            href={SITE.instagram}
            target="_blank"
            rel="noopener noreferrer"
            className="flex flex-col justify-between rounded-xl border border-stone-200 bg-surface p-5 transition-all duration-150 hover:border-pink-500 hover:shadow-lift hover:-translate-y-0.5 group"
          >
            <div>
              <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-gradient-to-tr from-amber-500 via-pink-500 to-purple-600 text-white mb-4">
                <Instagram className="h-6 w-6" />
              </div>
              <h3 className="font-display text-lg font-bold text-ink group-hover:text-pink-600 transition-colors">
                Instagram Resmi
              </h3>
              <p className="mt-1 text-xs text-stone-500">Foto &amp; kabar terbaru Dieng</p>
              <p className="mt-3 font-semibold text-sm text-ink">@kediengaja</p>
            </div>
            <span className="mt-5 inline-flex items-center gap-1 text-xs font-semibold text-pink-600">
              Kunjungi Profil <ExternalLink className="h-3 w-3" />
            </span>
          </a>

          {/* TikTok Card */}
          <a
            href={SITE.tiktok}
            target="_blank"
            rel="noopener noreferrer"
            className="flex flex-col justify-between rounded-xl border border-stone-200 bg-surface p-5 transition-all duration-150 hover:border-stone-900 hover:shadow-lift hover:-translate-y-0.5 group"
          >
            <div>
              <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-stone-900 text-white mb-4">
                <TikTokIcon className="h-6 w-6" />
              </div>
              <h3 className="font-display text-lg font-bold text-ink group-hover:text-stone-900 transition-colors">
                TikTok Resmi
              </h3>
              <p className="mt-1 text-xs text-stone-500">Video suasana sejuk &amp; kabut</p>
              <p className="mt-3 font-semibold text-sm text-ink">@kediengaja</p>
            </div>
            <span className="mt-5 inline-flex items-center gap-1 text-xs font-semibold text-stone-900">
              Tonton Video <ExternalLink className="h-3 w-3" />
            </span>
          </a>

          {/* Lokasi Operasional */}
          <div className="flex flex-col justify-between rounded-xl border border-stone-200 bg-surface p-5">
            <div>
              <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-candi text-white mb-4">
                <MapPin className="h-6 w-6" />
              </div>
              <h3 className="font-display text-lg font-bold text-ink">Lokasi Basecamp</h3>
              <p className="mt-1 text-xs text-stone-500">Dataran Tinggi Dieng</p>
              <p className="mt-3 text-xs leading-relaxed text-stone-700">
                Kawasan Dieng, Wonosobo – Banjarnegara, Jawa Tengah.
              </p>
            </div>
            <span className="mt-5 inline-flex items-center gap-1 text-xs font-semibold text-moss">
              Dikelola Warga Lokal
            </span>
          </div>
        </div>
      </div>
    </section>
  );
}
