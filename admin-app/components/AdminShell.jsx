"use client";

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import {
  LayoutDashboard,
  Home,
  Calendar,
  Compass,
  Image as ImageIcon,
  LogOut,
  ExternalLink,
  ShieldAlert,
} from 'lucide-react';
import { AuthProvider, useAuth } from '@/lib/auth';

const NAV_LINKS = [
  { href: '/', label: 'Dashboard', icon: LayoutDashboard },
  { href: '/penginapan', label: 'Kelola Penginapan', icon: Home },
  { href: '/calendar', label: 'Jadwal & Kalender Booking', icon: Calendar },
  { href: '/tours', label: 'Kelola Tours & Jeep', icon: Compass },
  { href: '/gallery', label: '10 Foto Polaroid', icon: ImageIcon },
];

function ShellInner({ children }) {
  const pathname = usePathname();
  const { user, logout, loading } = useAuth();

  const isLoginPage = pathname === '/login';

  if (isLoginPage) {
    return <main className="min-h-screen bg-stone-900">{children}</main>;
  }

  const isActive = (href) => (href === '/' ? pathname === '/' : pathname.startsWith(href));

  return (
    <div className="flex min-h-screen bg-stone-50 text-stone-900">
      {/* Sidebar */}
      <aside className="w-64 bg-stone-900 text-white p-5 hidden md:flex flex-col justify-between border-r border-stone-800 shrink-0">
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

      {/* Main Content Area */}
      <main className="flex-1 bg-stone-50 overflow-y-auto min-w-0">
        {children}
      </main>
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
