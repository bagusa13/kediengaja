const VILLA_COVERS = [
  '/images/cabin-house-1/building.jpg',
  '/images/cabin-house-2/building.jpg',
  '/images/daun-villa/daun-villa-1.jpg',
  '/images/cabin-house-1/bigbed.jpg',
  '/images/daun-villa/daun-villa-3.jpg',
];

const TOUR_COVERS = [
  '/images/destinasi/telaga-warna.webp',
  '/images/destinasi/bukit-sikunir.webp',
  '/images/destinasi/kawah-sikidang.webp',
  '/images/destinasi/candi-arjuna.webp',
  '/images/dokumentasi/tamu-1.jpg',
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
