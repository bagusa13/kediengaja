const VILLA_COVERS = [
  'https://images.unsplash.com/photo-1510797215324-95aa89f43c33?auto=format&fit=crop&w=1200&q=80',
  'https://images.unsplash.com/photo-1470770841072-f978cf4d019e?auto=format&fit=crop&w=1200&q=80',
  'https://images.unsplash.com/photo-1542718610-a1d656d1884c?auto=format&fit=crop&w=1200&q=80',
  'https://images.unsplash.com/photo-1520250497591-112f2f40a3f4?auto=format&fit=crop&w=1200&q=80',
  'https://images.unsplash.com/photo-1449158743715-0a90ebb6d2d8?auto=format&fit=crop&w=1200&q=80',
];

const TOUR_COVERS = [
  'https://images.unsplash.com/photo-1469474968028-56623f02e42e?auto=format&fit=crop&w=1200&q=80',
  'https://images.unsplash.com/photo-1501785888041-af3ef285b470?auto=format&fit=crop&w=1200&q=80',
  'https://images.unsplash.com/photo-1470071459604-3b5ec3a7fe05?auto=format&fit=crop&w=1200&q=80',
  'https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?auto=format&fit=crop&w=1200&q=80',
  'https://images.unsplash.com/photo-1486870591958-9b9d0d1dda99?auto=format&fit=crop&w=1200&q=80',
];

function pick(list, seed) {
  const str = String(seed || 'kediengaja');
  let n = 0;
  for (let i = 0; i < str.length; i += 1) n += str.charCodeAt(i);
  return list[n % list.length];
}

function listingPhoto(item = {}) {
  if (item.gambar) return item.gambar;
  if (item.gambarUtama) return item.gambarUtama;
  if (item.image) return item.image;
  if (item.foto) return item.foto;
  if (item.fotoUtama) return item.fotoUtama;
  if (Array.isArray(item.galeri) && item.galeri[0]) return item.galeri[0];
  return '';
}

export function villaCover(item = {}) {
  return listingPhoto(item) || pick(VILLA_COVERS, item.id || item.nama);
}

export function tourCover(item = {}) {
  return listingPhoto(item) || pick(TOUR_COVERS, item.id || item.nama);
}

export function formatRupiah(value) {
  return new Intl.NumberFormat('id-ID', {
    style: 'currency',
    currency: 'IDR',
    minimumFractionDigits: 0,
  }).format(Number(value) || 0);
}
