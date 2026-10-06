"use client";

import { useEffect, useState } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { MessageCircle, Menu, X } from 'lucide-react';
import { waLink } from '@/lib/site';

const links = [
  { href: '/', label: 'Beranda' },
  { href: '/penginapan', label: 'Penginapan' },
  { href: '/jeep-dieng', label: 'Jeep 4x4' },
  { href: '/jelajahi-dieng', label: 'Destinasi' },
  { href: '/trip-builder', label: 'Trip Builder' },
  { href: '/availability', label: 'Kalender' },
];

export default function Navbar() {
  const pathname = usePathname();
  const [isScrolled, setIsScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  const chatHref = waLink('Halo Admin Kediengaja, saya ingin konsultasi rencana liburan ke Dieng.');

  useEffect(() => {
    function onScroll() {
      setIsScrolled(window.scrollY > 40);
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

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        isScrolled || !isHome
          ? 'bg-slate-950/90 backdrop-blur-md border-b border-white/10 text-white shadow-sm'
          : 'bg-transparent text-white border-b border-transparent'
      }`}
    >
      <nav className="mx-auto flex max-w-6xl items-center justify-between px-4 py-3 sm:px-6 lg:px-8">
        {/* Brand identity */}
        <Link
          href="/"
          className="flex items-center gap-2.5 transition-opacity hover:opacity-90"
          onClick={() => setOpen(false)}
        >
          <span className="flex h-8 w-8 items-center justify-center rounded-lg bg-forest text-white text-xs font-black tracking-tight shadow-xs">
            KD
          </span>
          <span className="leading-tight">
            <span className="block font-display text-base font-extrabold tracking-tight text-white">
              Kediengaja
            </span>
            <span className="hidden text-[10px] text-stone-300 sm:block font-medium">
              Dataran Tinggi Dieng
            </span>
          </span>
        </Link>

        {/* Desktop links */}
        <div className="hidden items-center gap-7 md:flex">
          {links.map((link) => (
            <Link
              key={link.label}
              href={link.href}
              className="text-xs uppercase tracking-wider font-semibold text-stone-200 hover:text-white transition-colors"
            >
              {link.label}
            </Link>
          ))}

          {/* Primary single WhatsApp action */}
          <a
            href={chatHref}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex min-h-[38px] cursor-pointer items-center gap-1.5 rounded-lg bg-wa px-3.5 text-xs font-bold text-white hover:bg-[#15803d] active:scale-[0.98] transition-all shadow-xs"
          >
            <MessageCircle className="h-3.5 w-3.5" aria-hidden="true" />
            <span>Chat WhatsApp</span>
          </a>
        </div>

        {/* Mobile menu button */}
        <button
          type="button"
          className="flex h-10 w-10 cursor-pointer items-center justify-center text-white md:hidden"
          onClick={() => setOpen((v) => !v)}
          aria-expanded={open}
          aria-label={open ? 'Tutup menu navigasi' : 'Buka menu navigasi'}
        >
          {open ? <X className="h-5 w-5" aria-hidden="true" /> : <Menu className="h-5 w-5" aria-hidden="true" />}
        </button>
      </nav>

      {/* Mobile Drawer */}
      {open && (
        <div className="border-t border-white/10 bg-slate-950/95 px-5 py-4 backdrop-blur-lg md:hidden">
          <div className="flex flex-col gap-1.5">
            {links.map((link) => (
              <Link
                key={link.label}
                href={link.href}
                onClick={() => setOpen(false)}
                className="rounded-lg px-3 py-2.5 text-sm font-semibold text-stone-200 hover:bg-white/10 hover:text-white transition-colors"
              >
                {link.label}
              </Link>
            ))}
            <a
              href={chatHref}
              target="_blank"
              rel="noopener noreferrer"
              className="mt-3 inline-flex min-h-[42px] cursor-pointer items-center justify-center gap-2 rounded-lg bg-wa px-4 text-xs font-bold text-white hover:bg-[#15803d] active:scale-[0.98] transition-all shadow-xs"
            >
              <MessageCircle className="h-4 w-4" aria-hidden="true" />
              Chat WhatsApp
            </a>
          </div>
        </div>
      )}
    </header>
  );
}
