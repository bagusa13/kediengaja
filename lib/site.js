export const SITE = {
  name: 'Kediengaja',
  tagline: 'Ke Dieng aja.',
  url: 'https://kediengaja.com',
  waNumber: '6285727673069',
  phoneDisplay: '0857-2767-3069',
  instagram: 'https://instagram.com/kediengaja',
  tiktok: 'https://tiktok.com/@kediengaja',
  email: 'info@kediengaja.com',
  location: 'Dataran Tinggi Dieng, Wonosobo, Jawa Tengah',
};

export function waLink(message) {
  const directPhone = SITE.waNumber || '6285727673069';
  return `https://wa.me/${directPhone}${message ? `?text=${encodeURIComponent(message)}` : ''}`;
}

export function formatWaDate(iso) {
  if (!iso) return '-';
  const [year, month, day] = iso.split('-');
  return `${day}/${month}/${year}`;
}
