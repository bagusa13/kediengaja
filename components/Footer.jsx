import Link from 'next/link';
import { SITE, waLink } from '@/lib/site';
import BrandLogo from './BrandLogo';

export default function Footer() {
  const chatHref = waLink('Halo Kediengaja, saya ingin konsultasi rencana liburan ke Dieng.');

  return (
    <footer className="mt-auto bg-slate-950 text-stone-300 border-t border-stone-800">
      <div className="mx-auto grid max-w-6xl gap-10 px-4 py-12 sm:px-6 md:grid-cols-[1.5fr_1fr_1fr] lg:px-8">
        <div>
          <BrandLogo variant="light" showTagline={true} />
          <p className="mt-3 max-w-sm text-xs sm:text-sm leading-relaxed text-stone-400">
            Platform perjalanan dan akomodasi lokal Dieng. Menemani Anda menemukan penginapan hangat, armada Jeep 4x4, dan paket wisata langsung bersama warga lokal.
          </p>
          <p className="mt-3 text-xs text-stone-400 font-medium">
            {SITE.location}
          </p>
        </div>

        <div>
          <h3 className="text-xs font-bold uppercase tracking-wider text-amber-400/90">
            Layanan Wisata
          </h3>
          <div className="mt-3 flex flex-col gap-2.5 text-xs sm:text-sm text-stone-300">
            <Link href="/penginapan" className="hover:text-white transition-colors">
              Penginapan &amp; Villa
            </Link>
            <Link href="/jeep-dieng" className="hover:text-white transition-colors">
              Jeep 4x4 Offroad
            </Link>
            <Link href="/tours" className="hover:text-white transition-colors">
              Paket Wisata Dieng
            </Link>
            <Link href="/jelajahi-dieng" className="hover:text-white transition-colors">
              Destinasi Populer
            </Link>
            <Link href="/trip-builder" className="hover:text-white transition-colors">
              Rancang Trip Sendiri
            </Link>
          </div>
        </div>

        <div>
          <h3 className="text-xs font-bold uppercase tracking-wider text-amber-400/90">
            Kontak &amp; Informasi
          </h3>
          <div className="mt-3 flex flex-col gap-2.5 text-xs sm:text-sm text-stone-300">
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
            <Link href="/availability" className="hover:text-white transition-colors">
              Cek Kalender Jadwal
            </Link>
            <Link href="/kontak" className="hover:text-white transition-colors">
              Hubungi Kami
            </Link>
          </div>
        </div>
      </div>

      <div className="border-t border-stone-800/80 py-5 text-center text-xs text-stone-500">
        © {new Date().getFullYear()} Kediengaja. Platform perjalanan wisata Dieng, Jawa Tengah.
      </div>
    </footer>
  );
}