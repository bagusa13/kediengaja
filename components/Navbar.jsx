"use client";

import { useEffect, useState } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { MessageCircle, Menu, X } from 'lucide-react';
import { waLink } from '@/lib/site';
import BrandLogo from './BrandLogo';

const navLinks = [
  { href: '/penginapan', label: 'Penginapan' },
  { href: '/tours', label: 'Paket Wisata' },
  { href: '/jeep-dieng', label: 'Jeep 4x4' },
  { href: '/jelajahi-dieng', label: 'Destinasi' },
  { href: '/trip-builder', label: 'Trip Builder' },
  { href: '/availability', label: 'Cek Jadwal' },
];

export default function Navbar() {
  const pathname = usePathname();
  const [isScrolled, setIsScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  const chatHref = waLink('Halo Kediengaja, saya ingin konsultasi rencana liburan ke Dieng.');

  useEffect(() => {
    function onScroll() {
      setIsScrolled(window.scrollY > 30);
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
  }, []);

  const isHome = pathname === '/';
  const showDarkBg = isScrolled || !isHome;

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-colors duration-250 ${
        showDarkBg
          ? 'bg-slate-950/95 backdrop-blur-md border-b border-stone-800 text-white shadow-xs'
          : 'bg-gradient-to-b from-slate-950/80 via-slate-950/40 to-transparent text-white border-b border-transparent'
      }`}
    >
      <div className="mx-auto flex max-w-6xl items-center justify-between px-4 py-3 sm:px-6 lg:px-8">
        {/* Brand identity */}
        <Link
          href="/"
          className="transition-opacity hover:opacity-95"
          onClick={() => setOpen(false)}
        >
          <BrandLogo variant="light" showTagline={false} />
        </Link>

        {/* Desktop links */}
        <nav className="hidden items-center gap-7 lg:flex">
          {navLinks.map((link) => {
            const isActive = pathname === link.href;
            return (
              <Link
                key={link.label}
                href={link.href}
                className={`text-xs font-semibold tracking-wide transition-colors ${
                  isActive
                    ? 'text-amber-400 font-bold'
                    : 'text-stone-200 hover:text-white'
                }`}
              >
                {link.label}
              </Link>
            );
          })}
        </nav>

        {/* Right CTA */}
        <div className="hidden items-center gap-3 md:flex">
          <a
            href={chatHref}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex min-h-[38px] items-center gap-2 rounded-xl bg-forest px-4 text-xs font-semibold text-white shadow-xs hover:bg-forest-light active:scale-[0.98] transition-all"
            aria-label="Hubungi Kediengaja via WhatsApp"
          >
            <MessageCircle className="h-3.5 w-3.5 text-amber-400" aria-hidden="true" />
            <span>Hubungi Kami</span>
          </a>
        </div>

        {/* Mobile menu button */}
        <button
          type="button"
          className="flex h-10 w-10 items-center justify-center rounded-lg text-white hover:bg-white/10 lg:hidden"
          onClick={() => setOpen((v) => !v)}
          aria-expanded={open}
          aria-label={open ? 'Tutup menu' : 'Buka menu'}
        >
          {open ? <X className="h-6 w-6" aria-hidden="true" /> : <Menu className="h-6 w-6" aria-hidden="true" />}
        </button>
      </div>

      {/* Mobile Nav Menu */}
      {open && (
        <div className="border-t border-stone-800 bg-slate-950/98 px-5 py-4 backdrop-blur-xl lg:hidden">
          <nav className="flex flex-col gap-1">
            {navLinks.map((link) => {
              const isActive = pathname === link.href;
              return (
                <Link
                  key={link.label}
                  href={link.href}
                  onClick={() => setOpen(false)}
                  className={`rounded-lg px-3 py-2.5 text-sm font-semibold transition-colors ${
                    isActive
                      ? 'bg-white/10 text-amber-400 font-bold'
                      : 'text-stone-200 hover:bg-white/5 hover:text-white'
                  }`}
                >
                  {link.label}
                </Link>
              );
            })}
          </nav>
          <div className="mt-4 border-t border-stone-800 pt-3">
            <a
              href={chatHref}
              target="_blank"
              rel="noopener noreferrer"
              className="flex min-h-[44px] w-full items-center justify-center gap-2 rounded-xl bg-forest px-4 text-xs font-bold text-white hover:bg-forest-light transition-all"
            >
              <MessageCircle className="h-4 w-4 text-amber-400" aria-hidden="true" />
              <span>Hubungi Kami via WhatsApp</span>
            </a>
          </div>
        </div>
      )}
    </header>
  );
}
