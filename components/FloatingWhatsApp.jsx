import { MessageCircle } from 'lucide-react';
import { waLink } from '@/lib/site';

export default function FloatingWhatsApp() {
  const href = waLink('Halo Kediengaja, saya ingin konsultasi rencana liburan ke Dieng.');

  return (
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      aria-label="Chat admin WhatsApp"
      className="fixed bottom-[max(1rem,calc(0.75rem+env(safe-area-inset-bottom)))] right-3.5 sm:right-6 z-40 inline-flex h-11 w-11 sm:h-auto sm:w-auto sm:min-h-[40px] items-center justify-center sm:justify-start gap-2 rounded-full bg-forest p-0 sm:px-3.5 sm:py-2 text-xs font-semibold text-white shadow-lg hover:bg-forest-light active:scale-95 transition-all"
    >
      <span className="relative flex h-2 w-2">
        <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75" />
        <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-400" />
      </span>
      <MessageCircle className="h-4 w-4" aria-hidden="true" />
      <span className="hidden sm:inline">WhatsApp</span>
    </a>
  );
}