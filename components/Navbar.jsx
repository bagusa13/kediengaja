"use client";

import { useEffect, useState } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Home, Menu, MessageCircle, X } from 'lucide-react';
import { waLink } from '@/lib/site';

const links = [
  { href: '/', label: 'Beranda' },
  { href: '/penginapan', label: 'Penginapan' },
  { href: '/tours', label: 'Paket wisata' },
];

export default function Navbar() {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);
  const chatHref = waLink('Halo Kediengaja, saya ingin tanya tentang liburan ke Dieng.');

  useEffect(() => {
    function onKey(e) {
      if (e.key === 'Escape') setOpen(false);
    }
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, []);

  const isActive = (href) => (href === '/' ? pathname === '/' : pathname.startsWith(href));

  return (
    <header className="sticky top-0 z-50 border-b border-stone-200 bg-paper/95 backdrop-blur-md">
      <nav className="mx-auto flex max-w-6xl items-center justify-between px-4 py-3 sm:px-6 lg:px-8">
        <Link href="/" className="flex min-h-[44px] items-center gap-2.5" onClick={() => setOpen(false)}>
          <span className="flex h-9 w-9 items-center justify-center rounded-lg bg-clay text-white shadow-sm">
            <Home className="h-5 w-5" aria-hidden="true" />
          </span>
          <span className="leading-tight">
            <span className="block font-display text-lg text-ink">Kediengaja</span>
            <span className="hidden text-[11px] text-stone-600 sm:block">Guest House, Trip &amp; Tour</span>
          </span>
        </Link>

        <div className="hidden items-center gap-7 md:flex">
          {links.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className={`text-sm font-medium ${isActive(link.href) ? 'text-clay' : 'text-stone-600 hover:text-ink'}`}
            >
              {link.label}
            </Link>
          ))}
          <a
            href={chatHref}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex min-h-[44px] cursor-pointer items-center gap-2 rounded-md bg-wa px-4 text-sm font-semibold text-white hover:bg-[#0c573d]"
          >
            <MessageCircle className="h-4 w-4" aria-hidden="true" />
            Chat admin
          </a>
        </div>

        <button
          type="button"
          className="flex min-h-[44px] min-w-[44px] cursor-pointer items-center justify-center text-ink md:hidden"
          onClick={() => setOpen((v) => !v)}
          aria-expanded={open}
          aria-label={open ? 'Tutup menu' : 'Buka menu'}
        >
          {open ? <X className="h-6 w-6" aria-hidden="true" /> : <Menu className="h-6 w-6" aria-hidden="true" />}
        </button>
      </nav>

      {open ? (
        <div className="border-t border-stone-200 bg-paper px-4 py-4 md:hidden">
          <div className="flex flex-col gap-1">
            {links.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                onClick={() => setOpen(false)}
                className={`min-h-[44px] rounded-md px-3 py-2 text-sm font-medium ${
                  isActive(link.href) ? 'bg-stone-100 text-clay' : 'text-ink'
                }`}
              >
                {link.label}
              </Link>
            ))}
            <a
              href={chatHref}
              target="_blank"
              rel="noopener noreferrer"
              className="mt-2 inline-flex min-h-[44px] cursor-pointer items-center justify-center gap-2 rounded-md bg-wa px-4 text-sm font-semibold text-white"
            >
              <MessageCircle className="h-4 w-4" aria-hidden="true" />
              Chat admin
            </a>
          </div>
        </div>
      ) : null}
    </header>
  );
}
