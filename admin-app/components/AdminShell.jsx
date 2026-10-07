"use client";

import { useEffect, useState } from 'react';
import Link from 'next/link';
import { usePathname, useRouter } from 'next/navigation';
import {
  LayoutDashboard,
  Home,
  Calendar,
  Compass,
  Image as ImageIcon,
  LogOut,
  ExternalLink,
  Menu,
  X,
  ChevronRight,
  ShieldCheck,
} from 'lucide-react';
import { AuthProvider, useAuth } from '@/lib/auth';

const NAV_LINKS = [
  { href: '/', label: 'Dashboard', shortLabel: 'Home', icon: LayoutDashboard },
  { href: '/penginapan', label: 'Kelola Penginapan', shortLabel: 'Penginapan', icon: Home },
  { href: '/calendar', label: 'Jadwal & Kalender', shortLabel: 'Kalender', icon: Calendar },
  { href: '/tours', label: 'Kelola Tours & Jeep', shortLabel: 'Tours', icon: Compass },
  { href: '/gallery', label: '10 Foto Polaroid', shortLabel: 'Galeri', icon: ImageIcon },
];

function ShellInner({ children }) {
  const pathname = usePathname();
  const router = useRouter();
  const { user, logout, loading } = useAuth();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const isLoginPage = pathname === '/login';

  // Close mobile menu on page transition
  useEffect(() => {
    setMobileMenuOpen(false);
  }, [pathname]);

  // Client-side authentication guard
  useEffect(() => {
    if (!loading && !user && !isLoginPage) {
      router.push('/login');
    }
  }, [loading, user, isLoginPage, router]);

  if (isLoginPage) {
    return <main className="min-h-[100dvh] bg-stone-900">{children}</main>;
  }

  if (loading) {
    return (
      <div className="flex min-h-[100dvh] items-center justify-center bg-stone-900 text-stone-300">
        <div className="flex flex-col items-center gap-3">
          <div className="h-8 w-8 animate-spin rounded-full border-2 border-emerald-500 border-t-transparent" />
          <p className="text-xs text-stone-400">Memuat panel admin...</p>
        </div>
      </div>
    );
  }

  if (!user) {
    return null;
  }

  const isActive = (href) => (href === '/' ? pathname === '/' : pathname.startsWith(href));

  return (
    <div className="flex min-h-[100dvh] flex-col md:flex-row bg-stone-50 text-stone-900">
      {/* 1. MOBILE TOP APP BAR (iOS Safari optimized) */}
      <header className="sticky top-0 z-40 flex h-14 w-full items-center justify-between border-b border-stone-800 bg-stone-900/95 px-4 backdrop-blur-md md:hidden">
        <Link href="/" className="flex items-center gap-2.5">
          <span className="flex h-8 w-8 items-center justify-center rounded-lg bg-emerald-700 text-xs font-black text-white shadow-xs">
            KD
          </span>
          <div>
            <span className="font-display text-sm font-bold leading-tight text-white block">
              Kediengaja
            </span>
            <span className="text-[10px] font-medium text-emerald-400 flex items-center gap-1">
              <ShieldCheck className="h-2.5 w-2.5" />
              Admin Panel
            </span>
          </div>
        </Link>

        <div className="flex items-center gap-1.5">
          <a
            href="/"
            target="_blank"
            rel="noopener noreferrer"
            className="flex h-9 items-center gap-1.5 rounded-lg bg-stone-800/80 px-2.5 text-[11px] font-semibold text-stone-300 hover:text-white hover:bg-stone-800 transition"
            aria-label="Buka website publik"
          >
            <ExternalLink className="h-3.5 w-3.5" />
            <span className="hidden sm:inline">Web Publik</span>
          </a>

          <button
            type="button"
            onClick={() => setMobileMenuOpen((prev) => !prev)}
            className="flex h-9 w-9 items-center justify-center rounded-lg bg-stone-800 text-stone-200 hover:bg-stone-700 hover:text-white transition active:scale-95"
            aria-expanded={mobileMenuOpen}
            aria-label={mobileMenuOpen ? 'Tutup menu' : 'Buka menu'}
          >
            {mobileMenuOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
          </button>
        </div>
      </header>

      {/* 2. MOBILE SLIDE-OVER DRAWER MENU */}
      {mobileMenuOpen && (
        <div className="fixed inset-0 z-50 md:hidden">
          {/* Backdrop */}
          <div
            className="fixed inset-0 bg-stone-950/70 backdrop-blur-xs transition-opacity"
            onClick={() => setMobileMenuOpen(false)}
            aria-hidden="true"
          />

          {/* Drawer Content */}
          <div className="fixed inset-y-0 right-0 flex w-full max-w-xs flex-col justify-between border-l border-stone-800 bg-stone-900 p-5 shadow-2xl">
            <div>
              <div className="flex items-center justify-between pb-4 border-b border-stone-800">
                <div className="flex items-center gap-2">
                  <span className="flex h-7 w-7 items-center justify-center rounded-md bg-emerald-700 text-xs font-black text-white">
                    KD
                  </span>
                  <span className="font-display font-bold text-sm text-white">
                    Menu Admin
                  </span>
                </div>
                <button
                  type="button"
                  onClick={() => setMobileMenuOpen(false)}
                  className="rounded-lg p-1 text-stone-400 hover:bg-stone-800 hover:text-white transition"
                  aria-label="Tutup menu"
                >
                  <X className="h-5 w-5" />
                </button>
              </div>

              {/* User email badge */}
              {user && (
                <div className="my-4 rounded-xl border border-stone-800 bg-stone-950/60 p-3">
                  <span className="block text-[9px] font-bold uppercase tracking-wider text-stone-500">
                    Akun Login
                  </span>
                  <span className="truncate block text-xs font-medium text-stone-200 mt-0.5">
                    {user.email || 'Admin User'}
                  </span>
                </div>
              )}

              {/* Nav links */}
              <nav className="flex flex-col gap-1.5 mt-2">
                {NAV_LINKS.map((link) => {
                  const Icon = link.icon;
                  const active = isActive(link.href);
                  return (
                    <Link
                      key={link.href}
                      href={link.href}
                      onClick={() => setMobileMenuOpen(false)}
                      className={`flex items-center justify-between px-3 py-2.5 rounded-xl text-xs font-semibold transition ${
                        active
                          ? 'bg-emerald-700 text-white shadow-xs'
                          : 'text-stone-300 hover:bg-stone-800 hover:text-white'
                      }`}
                    >
                      <div className="flex items-center gap-2.5">
                        <Icon className="h-4 w-4 shrink-0" aria-hidden="true" />
                        <span>{link.label}</span>
                      </div>
                      <ChevronRight className="h-3.5 w-3.5 opacity-50" />
                    </Link>
                  );
                })}
              </nav>
            </div>

            {/* Drawer Footer Actions */}
            <div className="border-t border-stone-800 pt-4 flex flex-col gap-2">
              <a
                href="/"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center justify-center gap-2 rounded-xl bg-stone-800 px-3 py-2.5 text-xs font-semibold text-stone-200 hover:bg-stone-700 hover:text-white transition"
              >
                <ExternalLink className="h-3.5 w-3.5" />
                <span>Buka Website Publik</span>
              </a>

              <button
                type="button"
                onClick={logout}
                className="flex w-full items-center justify-center gap-2 rounded-xl bg-red-500/10 border border-red-500/20 px-3 py-2.5 text-xs font-semibold text-red-400 hover:bg-red-500/20 transition active:scale-95"
              >
                <LogOut className="h-3.5 w-3.5" />
                <span>Keluar / Logout</span>
              </button>
            </div>
          </div>
        </div>
      )}

      {/* 3. DESKTOP SIDEBAR */}
      <aside className="hidden md:flex w-64 bg-stone-900 text-white p-5 flex-col justify-between border-r border-stone-800 shrink-0">
        <div>
          {/* Header */}
          <div className="flex items-center gap-2.5 mb-8 pb-4 border-b border-stone-800">
            <span className="h-8 w-8 rounded-lg bg-emerald-700 flex items-center justify-center font-black text-white text-xs shadow-xs">
              KD
            </span>
            <div>
              <span className="font-display font-bold text-base leading-tight block text-white">
                Kediengaja
              </span>
              <span className="text-[10px] text-stone-400 font-medium">
                Admin Control Panel
              </span>
            </div>
          </div>

          {/* Navigation Links */}
          <nav className="flex flex-col gap-1.5">
            {NAV_LINKS.map((link) => {
              const Icon = link.icon;
              const active = isActive(link.href);
              return (
                <Link
                  key={link.href}
                  href={link.href}
                  className={`flex items-center gap-2.5 px-3 py-2 rounded-lg text-xs font-semibold transition ${
                    active
                      ? 'bg-emerald-700 text-white shadow-xs'
                      : 'text-stone-300 hover:bg-stone-800 hover:text-white'
                  }`}
                >
                  <Icon className="h-4 w-4 shrink-0" aria-hidden="true" />
                  <span>{link.label}</span>
                </Link>
              );
            })}
          </nav>
        </div>

        {/* Footer Area: User Profile & Actions */}
        <div className="border-t border-stone-800 pt-4 flex flex-col gap-2">
          {user && (
            <div className="px-2 py-1.5 rounded-md bg-stone-800/60 text-[11px] text-stone-300 truncate">
              <span className="block text-[9px] text-stone-500 uppercase font-bold tracking-wider">
                Admin Aktif
              </span>
              <span className="truncate block font-medium">
                {user.email || 'Admin User'}
              </span>
            </div>
          )}

          <a
            href="/"
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-2 px-3 py-2 text-xs font-medium text-stone-400 hover:text-white hover:bg-stone-800 rounded-lg transition"
          >
            <ExternalLink className="h-3.5 w-3.5" />
            <span>Buka Website Publik</span>
          </a>

          <button
            type="button"
            onClick={logout}
            className="flex w-full items-center gap-2 px-3 py-2 text-xs font-semibold text-red-400 hover:text-red-300 hover:bg-red-500/10 rounded-lg transition cursor-pointer"
          >
            <LogOut className="h-3.5 w-3.5" />
            <span>Keluar / Logout</span>
          </button>
        </div>
      </aside>

      {/* 4. MAIN CONTENT AREA (Padded for Safari iOS address bar & bottom tab bar) */}
      <main className="flex-1 bg-stone-50 overflow-y-auto min-w-0 pb-[max(5.5rem,calc(4.5rem+env(safe-area-inset-bottom)))] md:pb-8">
        {children}
      </main>

      {/* 5. MOBILE BOTTOM TAB BAR (iOS App Style with Safe Area Padding) */}
      <nav
        className="fixed bottom-0 left-0 right-0 z-30 flex items-center justify-around border-t border-stone-800/80 bg-stone-900/95 px-1 py-1 backdrop-blur-xl md:hidden pb-[max(0.5rem,env(safe-area-inset-bottom))]"
        aria-label="Navigasi cepat ponsel"
      >
        {NAV_LINKS.map((link) => {
          const Icon = link.icon;
          const active = isActive(link.href);
          return (
            <Link
              key={link.href}
              href={link.href}
              className={`flex flex-1 flex-col items-center justify-center py-1.5 px-1 rounded-lg transition-colors active:scale-95 ${
                active
                  ? 'text-emerald-400 font-bold'
                  : 'text-stone-400 hover:text-stone-200'
              }`}
            >
              <div className="relative">
                <Icon className="h-4.5 w-4.5" aria-hidden="true" />
                {active && (
                  <span className="absolute -bottom-1 left-1/2 -translate-x-1/2 h-1 w-1 rounded-full bg-emerald-400" />
                )}
              </div>
              <span className="text-[10px] mt-1 leading-none tracking-tight">
                {link.shortLabel}
              </span>
            </Link>
          );
        })}
      </nav>
    </div>
  );
}

export default function AdminShell({ children }) {
  return (
    <AuthProvider>
      <ShellInner>{children}</ShellInner>
    </AuthProvider>
  );
}
