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
      className="fixed bottom-[max(1.25rem,calc(1rem+env(safe-area-inset-bottom)))] right-4 sm:right-6 z-40 inline-flex min-h-[44px] items-center gap-2 rounded-full bg-wa px-4 py-2.5 text-xs font-semibold text-white shadow-lg shadow-forest/20 hover:bg-[#15803d] active:scale-95 transition-all"
    >
      <span className="h-2 w-2 rounded-full bg-emerald-200" aria-hidden="true" />
      <MessageCircle className="h-4 w-4" aria-hidden="true" />
      <span className="hidden sm:inline">WhatsApp</span>
    </a>
  );
}