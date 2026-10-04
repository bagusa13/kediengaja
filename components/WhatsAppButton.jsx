import { MessageCircle } from 'lucide-react';
import { waLink } from '@/lib/site';

export default function WhatsAppButton({
  children,
  text,
  message = 'Halo Kediengaja, saya ingin informasi lebih lanjut.',
  className = '',
}) {
  const label = children || text || 'Chat admin';
  return (
    <a
      href={waLink(message)}
      target="_blank"
      rel="noopener noreferrer"
      className={`inline-flex min-h-[48px] cursor-pointer items-center justify-center gap-2 rounded-md bg-wa px-5 py-3 text-sm font-semibold text-white hover:bg-[#0c573d] transition-colors ${className}`}
    >
      <MessageCircle className="h-5 w-5" aria-hidden="true" />
      {label}
    </a>
  );
}
