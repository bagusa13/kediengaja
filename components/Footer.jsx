import Link from 'next/link';
import { SITE, waLink } from '@/lib/site';

export default function Footer() {
  const chatHref = waLink('Halo Kediengaja, saya ingin konsultasi rencana liburan ke Dieng.');

  return (
    <footer className="mt-auto bg-slate-950 text-stone-300 border-t border-white/10">
      <div className="mx-auto grid max-w-6xl gap-10 px-4 py-12 sm:px-6 md:grid-cols-[1.6fr_1fr_1fr] lg:px-8">
        <div>
          <p className="font-display text-xl font-bold tracking-tight text-white">
            Kediengaja
          </p>
          <p className="mt-2 max-w-sm text-xs sm:text-sm leading-relaxed text-stone-400">
            Layanan penginapan villa, cabin hangat, sewa Jeep 4x4, dan paket trip wisata yang dikelola langsung oleh warga lokal Dataran Tinggi Dieng.
          </p>
        </div>

        <div>
          <h3 className="text-xs font-bold uppercase tracking-wider text-white">
            Navigasi
          </h3>
          <div className="mt-3 flex flex-col gap-2.5 text-xs sm:text-sm text-stone-300">
            <Link href="/#penginapan" className="hover:text-white transition-colors">
              Penginapan &amp; Villa
            </Link>
            <Link href="/#destinasi" className="hover:text-white transition-colors">
              Destinasi Dieng
            </Link>
            <Link href="/tours" className="hover:text-white transition-colors">
              Paket Wisata &amp; Jeep
            </Link>
            <Link href="/#kalender" className="hover:text-white transition-colors">
              Kalender Jadwal
            </Link>
          </div>
        </div>

        <div>
          <h3 className="text-xs font-bold uppercase tracking-wider text-white">
            Kontak &amp; Lokasi
          </h3>
          <div className="mt-3 flex flex-col gap-2 text-xs sm:text-sm text-stone-300">
            <a
              href={chatHref}
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-white transition-colors"
            >
              WhatsApp: {SITE.phoneDisplay}
            </a>
            <a
              href={SITE.instagram}
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-white transition-colors"
            >
              Instagram: @kediengaja
            </a>
            <p className="mt-1 text-xs text-stone-400">
              {SITE.location}
            </p>
          </div>
        </div>
      </div>

      <div className="border-t border-white/5 py-5 text-center text-xs text-stone-500">
        © {new Date().getFullYear()} Kediengaja. Hak cipta dilindungi.
      </div>
    </footer>
  );
}