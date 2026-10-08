"use client";

import { useEffect, useState } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import {
  MessageCircle,
  Menu,
  X,
  Home,
  Compass,
  Mountain,
  MapPin,
  Calendar,
  Info,
  ChevronRight,
} from 'lucide-react';
import { waLink } from '@/lib/site';
import BrandLogo from './BrandLogo';

const navLinks = [
  { href: '/penginapan', label: 'Penginapan', icon: Home },
  { href: '/tours', label: 'Paket Wisata', icon: Compass },
  { href: '/jeep-dieng', label: 'Jeep 4x4', icon: Mountain },
  { href: '/jelajahi-dieng', label: 'Destinasi', icon: MapPin },
  { href: '/availability', label: 'Cek Jadwal', icon: Calendar },
  { href: '/tentang', label: 'Tentang Kami', icon: Info },
];

export default function Navbar() {
  const pathname = usePathname();
  const [isScrolled, setIsScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  const chatHref = waLink('Halo Kediengaja, saya ingin konsultasi rencana liburan ke Dieng.');

  const isHome = pathname === '/';

  useEffect(() => {
    function onScroll() {
      const threshold = isHome ? 200 : 20;
      setIsScrolled(window.scrollY > threshold);
    }
    window.addEventListener('scroll', onScroll, { passive: true });
    onScroll();

    function onKey(e) {
      if (e.key === 'Escape') setOpen(false);
    }
    window.addEventListener('keydown', onKey);

    return () => {
      window.removeEventListener('scroll', onScroll);
      window.removeEventListener('keydown', onKey);
    };
  }, [isHome]);

  const showDarkBg = isScrolled || !isHome;

  useEffect(() => {
    if (open) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => {
      document.body.style.overflow = '';
    };
  }, [open]);

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 pt-[env(safe-area-inset-top,0px)] transition-all duration-300 ${
        showDarkBg || open
          ? 'bg-slate-950/92 backdrop-blur-md border-b border-white/10 text-white shadow-sm py-2.5 sm:py-3'
          : 'bg-gradient-to-b from-slate-950/80 via-slate-950/30 to-transparent text-white border-b border-transparent py-3 sm:py-4'
      }`}
    >
      <div className="mx-auto flex max-w-6xl items-center justify-between px-4 sm:px-6 lg:px-8">
        {/* Brand identity */}
        <Link
          href="/"
          className="transition-opacity hover:opacity-95 shrink-0"
          onClick={() => setOpen(false)}
        >
          <BrandLogo variant="light" showTagline={false} />
        </Link>

        {/* Desktop links */}
        <nav className="hidden items-center gap-1 xl:gap-1.5 lg:flex" aria-label="Navigasi Utama">
          {navLinks.map((link) => {
            const isActive = pathname === link.href;
            return (
              <Link
                key={link.label}
                href={link.href}
                className={`relative px-3 py-1.5 rounded-lg text-xs font-semibold tracking-wide transition-all ${
                  isActive
                    ? 'text-white bg-white/15 shadow-xs'
                    : 'text-stone-300 hover:text-white hover:bg-white/10'
                }`}
              >
                {link.label}
                {isActive && (
                  <span className="absolute bottom-0.5 left-3 right-3 h-0.5 bg-emerald-400 rounded-full" />
                )}
              </Link>
            );
          })}
        </nav>

        {/* Right CTA */}
        <div className="hidden items-center gap-3 sm:flex">
          <a
            href={chatHref}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex min-h-[38px] items-center gap-2 rounded-xl border border-emerald-500/30 bg-forest px-4 py-2 text-xs font-semibold text-white shadow-xs hover:bg-forest-light active:scale-[0.98] transition-all"
            aria-label="Hubungi Kediengaja via WhatsApp"
          >
            <MessageCircle className="h-3.5 w-3.5 text-emerald-300" aria-hidden="true" />
            <span>Hubungi Kami</span>
          </a>
        </div>

        {/* Mobile menu button */}
        <button
          type="button"
          className="flex h-10 w-10 items-center justify-center rounded-xl text-white hover:bg-white/10 active:scale-95 transition-all lg:hidden"
          onClick={() => setOpen((v) => !v)}
          aria-expanded={open}
          aria-label={open ? 'Tutup menu' : 'Buka menu'}
        >
          {open ? <X className="h-5 w-5" aria-hidden="true" /> : <Menu className="h-5 w-5" aria-hidden="true" />}
        </button>
      </div>

      {/* Art-Directed Mobile Nav Drawer */}
      {open && (
        <div className="fixed inset-x-0 top-[calc(env(safe-area-inset-top,0px)+56px)] bottom-0 z-50 bg-slate-950/98 backdrop-blur-2xl px-5 sm:px-6 py-6 lg:hidden flex flex-col justify-between overflow-y-auto animate-in fade-in duration-200">
          <div>
            <p className="text-[10px] font-bold uppercase tracking-widest text-stone-400 mb-3 px-1">
              Navigasi Utama
            </p>
            <nav className="flex flex-col space-y-1.5">
              {navLinks.map((link) => {
                const isActive = pathname === link.href;
                const Icon = link.icon;
                return (
                  <Link
                    key={link.label}
                    href={link.href}
                    onClick={() => setOpen(false)}
                    className={`flex items-center justify-between rounded-xl px-3.5 py-3 text-sm font-semibold transition-all ${
                      isActive
                        ? 'bg-white/15 text-white border border-white/10 shadow-xs'
                        : 'text-stone-200 hover:bg-white/5 active:bg-white/10'
                    }`}
                  >
                    <div className="flex items-center gap-3">
                      <div
                        className={`flex h-8 w-8 items-center justify-center rounded-lg ${
                          isActive ? 'bg-forest text-emerald-300' : 'bg-white/10 text-stone-300'
                        }`}
                      >
                        <Icon className="h-4 w-4" aria-hidden="true" />
                      </div>
                      <span>{link.label}</span>
                    </div>

                    <div className="flex items-center gap-2">
                      {isActive ? (
                        <span className="rounded-md bg-emerald-500/20 px-2 py-0.5 text-[10px] font-bold text-emerald-300">
                          Aktif
                        </span>
                      ) : (
                        <ChevronRight className="h-4 w-4 text-stone-500" aria-hidden="true" />
                      )}
                    </div>
                  </Link>
                );
              })}
            </nav>
          </div>

          <div className="mt-8 pt-5 border-t border-stone-800/80 space-y-4 pb-[env(safe-area-inset-bottom,0px)]">
            <a
              href={chatHref}
              target="_blank"
              rel="noopener noreferrer"
              onClick={() => setOpen(false)}
              className="flex min-h-[46px] w-full items-center justify-center gap-2.5 rounded-xl bg-forest px-4 text-sm font-bold text-white hover:bg-forest-light active:scale-[0.98] transition-all shadow-sm border border-emerald-500/30"
            >
              <MessageCircle className="h-4 w-4 text-emerald-300" aria-hidden="true" />
              <span>Konsultasi Liburan via WhatsApp</span>
            </a>

            <div className="flex items-center justify-between text-[11px] text-stone-400 px-1">
              <span>Dataran Tinggi Dieng, Wonosobo</span>
              <span className="flex items-center gap-1.5 text-emerald-400 font-medium">
                <span className="h-1.5 w-1.5 rounded-full bg-emerald-400" />
                Respon Cepat
              </span>
            </div>
          </div>
        </div>
      )}
    </header>
  );
}
