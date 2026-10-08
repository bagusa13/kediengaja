import Link from 'next/link';
import { MessageCircle, Instagram, MapPin } from 'lucide-react';
import { SITE, waLink } from '@/lib/site';
import BrandLogo from './BrandLogo';

export default function Footer() {
  const chatHref = waLink('Halo Kediengaja, saya ingin konsultasi rencana liburan ke Dieng.');

  return (
    <footer className="mt-auto bg-slate-950 text-stone-300 border-t border-stone-800">
      {/* DESKTOP 3-COLUMN FOOTER (hidden md:grid) */}
      <div className="hidden md:grid mx-auto max-w-6xl gap-10 px-4 py-12 sm:px-6 md:grid-cols-[1.5fr_1fr_1fr] lg:px-8">
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
            <Link href="/tentang" className="hover:text-white transition-colors">
              Tentang Kami
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

      {/* MOBILE ART-DIRECTED STREAMLINED FOOTER (md:hidden) */}
      <div className="md:hidden px-5 py-8 space-y-6">
        <div>
          <BrandLogo variant="light" showTagline={false} />
          <p className="mt-2 text-xs leading-relaxed text-stone-400">
            Platform perjalanan dan akomodasi lokal Dataran Tinggi Dieng.
          </p>
          <p className="mt-1.5 flex items-center gap-1.5 text-[11px] text-stone-400">
            <MapPin className="h-3 w-3 text-amber-400 shrink-0" />
            <span>{SITE.location}</span>
          </p>
        </div>

        {/* Quick Action Contact Buttons */}
        <div className="grid grid-cols-2 gap-2.5">
          <a
            href={chatHref}
            target="_blank"
            rel="noopener noreferrer"
            className="flex min-h-[40px] items-center justify-center gap-2 rounded-xl bg-forest px-3 text-xs font-semibold text-white shadow-xs active:bg-forest-light"
          >
            <MessageCircle className="h-3.5 w-3.5 text-amber-400" />
            <span>WhatsApp</span>
          </a>
          <a
            href={SITE.instagram}
            target="_blank"
            rel="noopener noreferrer"
            className="flex min-h-[40px] items-center justify-center gap-2 rounded-xl border border-stone-700 bg-stone-900 px-3 text-xs font-semibold text-stone-200 active:bg-stone-800"
          >
            <Instagram className="h-3.5 w-3.5 text-rose-400" />
            <span>Instagram</span>
          </a>
        </div>

        {/* Compact 2-Column Navigation Grid */}
        <div className="border-t border-stone-800/80 pt-4">
          <p className="text-[10px] font-bold uppercase tracking-wider text-amber-400/90 mb-2.5">
            Navigasi Cepat
          </p>
          <div className="grid grid-cols-2 gap-y-2 gap-x-4 text-xs text-stone-300">
            <Link href="/penginapan" className="hover:text-white">Penginapan</Link>
            <Link href="/jelajahi-dieng" className="hover:text-white">Destinasi</Link>
            <Link href="/jeep-dieng" className="hover:text-white">Jeep 4x4</Link>
            <Link href="/tentang" className="hover:text-white">Tentang Kami</Link>
            <Link href="/tours" className="hover:text-white">Paket Wisata</Link>
            <Link href="/availability" className="hover:text-white">Cek Jadwal</Link>
          </div>
        </div>
      </div>

      <div className="border-t border-stone-800/80 py-5 text-center text-xs text-stone-500">
        © {new Date().getFullYear()} Kediengaja. Platform perjalanan wisata Dieng, Jawa Tengah.
      </div>
    </footer>
  );
}