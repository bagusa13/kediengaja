export const SITE = {
  name: 'Kediengaja',
  url: 'https://kediengaja.com',
  waNumber: process.env.NEXT_PUBLIC_WA_PHONE || '',
  waShortlink: 'https://wa.me/message/SMBUBLCTW5P3K1',
  instagram: 'https://instagram.com/kediengaja',
  email: 'info@kediengaja.com',
  location: 'Dieng Plateau, Wonosobo, Jawa Tengah',
};

export function waLink(message) {
  // If user provided a real WhatsApp phone number in environment
  const directPhone = process.env.NEXT_PUBLIC_WA_PHONE || (SITE.waNumber && SITE.waNumber !== '6281234567890' ? SITE.waNumber : '');
  if (directPhone) {
    return `https://wa.me/${directPhone}${message ? `?text=${encodeURIComponent(message)}` : ''}`;
  }
  // Otherwise default to the official verified WhatsApp Business link from @kediengaja Instagram
  if (SITE.waShortlink) {
    return message ? `${SITE.waShortlink}?text=${encodeURIComponent(message)}` : SITE.waShortlink;
  }
  return `https://wa.me/6281234567890${message ? `?text=${encodeURIComponent(message)}` : ''}`;
}

export function formatWaDate(iso) {
  if (!iso) return '-';
  const [year, month, day] = iso.split('-');
  return `${day}/${month}/${year}`;
}
