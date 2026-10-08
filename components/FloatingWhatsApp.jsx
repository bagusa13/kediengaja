'use client';

import { usePathname } from 'next/navigation';
import { MessageCircle } from 'lucide-react';
import { waLink } from '@/lib/site';

export default function FloatingWhatsApp() {
  const pathname = usePathname();
  const href = waLink('Halo Kediengaja, saya ingin konsultasi rencana liburan ke Dieng.');

  // If on a detail page or availability calendar that has a dedicated mobile sticky bottom action bar,
  // hide the floating bubble on mobile (sm:hidden) to avoid overlapping the bottom action bar
  const hasMobileBottomBar = Boolean(
    pathname &&
    (pathname.startsWith('/penginapan/') ||
     pathname.startsWith('/tours/') ||
     pathname.startsWith('/jeep-dieng/') ||
     pathname.startsWith('/jelajahi-dieng/') ||
     pathname === '/availability')
  );

  return (
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      aria-label="Chat admin WhatsApp"
      className={`${
        hasMobileBottomBar ? 'hidden sm:inline-flex' : 'inline-flex'
      } fixed bottom-[max(1rem,calc(0.75rem+env(safe-area-inset-bottom)))] right-3.5 sm:right-6 z-40 h-11 w-11 sm:h-auto sm:w-auto sm:min-h-[40px] items-center justify-center sm:justify-start gap-2 rounded-full bg-forest p-0 sm:px-3.5 sm:py-2 text-xs font-semibold text-white shadow-lg hover:bg-forest-light active:scale-95 transition-all`}
    >
      <MessageCircle className="h-4 w-4" aria-hidden="true" />
      <span className="hidden sm:inline">WhatsApp</span>
    </a>
  );
}