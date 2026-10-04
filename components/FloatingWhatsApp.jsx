import { MessageCircle } from 'lucide-react';
import { waLink } from '@/lib/site';

export default function FloatingWhatsApp() {
  const href = waLink('Halo Kediengaja, saya tertarik booking penginapan atau paket wisata.');

  return (
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      aria-label="Chat admin WhatsApp"
      className="fixed bottom-5 right-5 z-50 inline-flex min-h-[48px] items-center gap-2 rounded-md bg-wa px-4 py-3 text-sm font-semibold text-white shadow-lift hover:bg-[#0c573d] sm:bottom-6 sm:right-6"
    >
      <span className="relative flex h-2.5 w-2.5" aria-hidden="true">
        <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-300 opacity-75"></span>
        <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-emerald-400"></span>
      </span>
      <MessageCircle className="h-5 w-5" aria-hidden="true" />
      <span className="hidden sm:inline">Chat admin</span>
    </a>
  );
}
