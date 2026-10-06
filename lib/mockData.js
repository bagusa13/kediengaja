export const FALLBACK_PENGINAPAN = [
  {
    id: "cabin-house-1",
    nama: "Cabin House 1",
    tipe: "Cabin House",
    lokasi: "Dataran Tinggi Dieng (View Gn. Prau & Bukit Pangonan)",
    harga: 1500000,
    kapasitas: 8,
    deskripsi: "Kabin kayu hangat berarsitektur estetik dengan pemandangan langsung ke Gunung Prau dan Bukit Pangonan. Dilengkapi 3 bed (2 atas, 1 bawah), smart TV, water heater 24 jam, peralatan dapur lengkap, sofa santai, dan area parkir mobil aman.",
    gambar: "/images/cabin-house-1/bigbed.jpg",
    galeri: [
      "/images/cabin-house-1/bigbed.jpg",
      "/images/cabin-house-1/livingroom.jpg",
      "/images/cabin-house-1/kamar-1.jpg",
      "/images/cabin-house-1/kamar-2.jpg",
      "/images/cabin-house-1/dapur.jpg",
      "/images/cabin-house-1/toilet.jpg"
    ],
    fasilitas: [
      "Kapasitas Maksimal 8 Orang",
      "View Gunung Prau & Bukit Pangonan",
      "Water Heater Panas 24 Jam",
      "3 Bed (Atas 2, Bawah 1)",
      "Smart TV & Free WiFi",
      "Peralatan Dapur & Rice Cooker",
      "Sofa Ruang Santai",
      "Area Parkir Mobil Aman"
    ],
    bookedDates: ["2026-10-10", "2026-10-11", "2026-10-17", "2026-10-18", "2026-10-24", "2026-10-25"],
    isActive: true
  },
  {
    id: "cabin-house-2",
    nama: "Cabin House 2",
    tipe: "Cabin House Lt 2",
    lokasi: "Dataran Tinggi Dieng",
    harga: 1200000,
    kapasitas: 10,
    deskripsi: "Kabin 2 lantai berkapasitas hingga 10 orang dengan 4 tempat tidur nyaman. Dilengkapi dapur dan peralatan masak, smart TV, 1 kamar mandi water heater, area parkir aman, dan suguhan welcome drink hangat.",
    gambar: "/images/cabin-house-2/building.jpg",
    galeri: [
      "/images/cabin-house-2/building.jpg",
      "/images/cabin-house-2/2-bed-lantai-1.jpg",
      "/images/cabin-house-2/lantai-2-bed.jpg",
      "/images/cabin-house-2/lantai-1.jpg",
      "/images/cabin-house-2/kamar-1.jpg",
      "/images/cabin-house-2/meja-dapur.jpg"
    ],
    fasilitas: [
      "Kapasitas Maksimal 10 Orang",
      "4 Bed (Lantai 1 & Lantai 2)",
      "1 Kamar Mandi Water Heater",
      "Dapur Beserta Alat Masak",
      "Smart TV",
      "Welcome Drink Hangat",
      "Area Parkir Mobil Aman"
    ],
    bookedDates: ["2026-10-11", "2026-10-12", "2026-10-18", "2026-10-19"],
    isActive: true
  },
  {
    id: "daun-villa",
    nama: "Kediengaja by Daun Villa",
    tipe: "Villa Privat",
    lokasi: "Kawasan Wisata Dataran Tinggi Dieng",
    harga: 1800000,
    kapasitas: 12,
    deskripsi: "Villa privat bernuansa asri dan hangat untuk liburan keluarga besar atau rombongan hingga 12 orang. Ruang kumpul luas, kamar tidur bersih, water heater 24 jam, smart TV, dapur lengkap, dan halaman parkir luas.",
    gambar: "/images/daun-villa/daun-villa-1.jpg",
    galeri: [
      "/images/daun-villa/daun-villa-1.jpg",
      "/images/daun-villa/daun-villa-2.jpg",
      "/images/daun-villa/daun-villa-3.jpg",
      "/images/daun-villa/daun-villa-4.jpg",
      "/images/daun-villa/daun-villa-5.jpg",
      "/images/daun-villa/daun-villa-6.jpg",
      "/images/daun-villa/daun-villa-7.jpg",
      "/images/daun-villa/daun-villa-8.jpg"
    ],
    fasilitas: [
      "Kapasitas Rombongan 12 Orang",
      "Kamar Mandi Water Heater 24 Jam",
      "Ruang Keluarga & Kumpul Luas",
      "Dapur Lengkap & Alat Masak",
      "Smart TV & Free WiFi",
      "Balkon View Perbukitan Dieng",
      "Halaman & Parkir Mobil Luas"
    ],
    bookedDates: ["2026-10-10", "2026-10-11", "2026-10-24", "2026-10-25"],
    isActive: true
  }
];

export const FALLBACK_TOURS = [
  {
    id: "fun-jeep-kawah-savana",
    nama: "Fun Jeep Wisata Dieng (Kawah & Savana)",
    tipe: "Fun Jeep Wisata",
    lokasi: "Basecamp Kediengaja Dieng",
    durasi: "3 - 4 Jam",
    harga: 450000,
    deskripsi: "Sensasi menjelajah alam Dieng menggunakan armada Jeep 4x4 bersama driver lokal ramah dan berpengalaman. Melewati jalur seru ke kawah belerang, telaga tersembunyi, hingga padang savana hijau yang luas.",
    gambar: "https://images.unsplash.com/photo-1533473359331-0135ef1b58bf?auto=format&fit=crop&w=1200&q=80",
    galeri: [
      "https://images.unsplash.com/photo-1533473359331-0135ef1b58bf?auto=format&fit=crop&w=1200&q=80",
      "https://images.unsplash.com/photo-1469474968028-56623f02e42e?auto=format&fit=crop&w=1200&q=80",
      "https://images.unsplash.com/photo-1470071459604-3b5ec3a7fe05?auto=format&fit=crop&w=1200&q=80"
    ],
    destinasi: ["Kawah Sikidang", "Savana Pangonan", "Telaga Warna & Pengilon", "Batu Pandang Ratapan Angin"],
    termasuk: ["Armada Jeep 4x4 & BBM", "Driver lokal merangkap pemandu", "Dokumentasi foto di spot terbaik", "Air mineral"],
    isActive: true
  },
  {
    id: "open-trip-sunrise-sikunir",
    nama: "Open Trip Golden Sunrise Sikunir",
    tipe: "Open Trip Sunrise",
    lokasi: "Meeting Point Rest Area Dieng",
    durasi: "1 Hari (03.00 - Siang)",
    harga: 175000,
    deskripsi: "Berburu golden sunrise terbaik se-Asia Tenggara di puncak Bukit Sikunir. Paket hemat gabungan bareng teman-teman baru, sudah termasuk tiket masuk dan pemandu lokal yang siap mengawal trip Anda.",
    gambar: "https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?auto=format&fit=crop&w=1200&q=80",
    galeri: [
      "https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?auto=format&fit=crop&w=1200&q=80",
      "https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?auto=format&fit=crop&w=1200&q=80",
      "https://images.unsplash.com/photo-1501785888041-af3ef285b470?auto=format&fit=crop&w=1200&q=80",
      "https://images.unsplash.com/photo-1470770841072-f978cf4d019e?auto=format&fit=crop&w=1200&q=80"
    ],
    destinasi: ["Puncak Bukit Sikunir", "Telaga Cebong", "Kompleks Candi Arjuna", "Pusat Oleh-oleh Carica"],
    termasuk: ["Transportasi lokal Dieng", "Tiket masuk semua objek wisata", "Tour Leader & Guide Lokal", "Welcome drink teh hangat"],
    isActive: true
  },
  {
    id: "private-trip-dieng-2d1n",
    nama: "Private Trip Eksplor Dieng 2D1N All-In",
    tipe: "Private Trip Dieng",
    lokasi: "Antar-Jemput Stasiun / Terminal / Bandara",
    durasi: "2 Hari 1 Malam",
    harga: 650000,
    deskripsi: "Liburan santai tanpa ribet untuk keluarga atau rombongan. Sudah termasuk penginapan estetik, mobil privat antar-jemput, keliling seluruh destinasi ikonik Dieng, dan kuliner khas mie ongklok.",
    gambar: "https://images.unsplash.com/photo-1469474968028-56623f02e42e?auto=format&fit=crop&w=1200&q=80",
    galeri: [
      "https://images.unsplash.com/photo-1469474968028-56623f02e42e?auto=format&fit=crop&w=1200&q=80",
      "https://images.unsplash.com/photo-1510797215324-95aa89f43c33?auto=format&fit=crop&w=1200&q=80",
      "https://images.unsplash.com/photo-1533473359331-0135ef1b58bf?auto=format&fit=crop&w=1200&q=80"
    ],
    destinasi: ["Bukit Sikunir", "Kawah Sikidang", "Telaga Menjer & Perahu", "Candi Arjuna", "Pusat Oleh-Oleh"],
    termasuk: ["Akomodasi penginapan 1 malam", "Mobil privat + Driver + BBM", "Tiket wisata all-in", "Makan sesuai program", "Dokumentasi"],
    isActive: true
  }
];

export const GUEST_DOCUMENTATIONS = [
  {
    id: 'doc-1',
    title: 'Keseruan Rombongan Tamu Kediengaja',
    category: 'Trip & Tour Dieng',
    location: 'Dataran Tinggi Dieng',
    guest: 'Rombongan Tamu Kediengaja',
    image: '/images/dokumentasi/tamu-1.jpg',
    date: 'Dokumentasi Tamu',
    desc: 'Momen seru dan hangat saat menjelajahi panorama alam serta udara sejuk Dataran Tinggi Dieng.'
  },
  {
    id: 'doc-2',
    title: 'Eksplorasi Alam & Spot Foto Terbaik',
    category: 'Wisata Budaya & Alam',
    location: 'Kawasan Wisata Dieng',
    guest: 'Wisatawan Sahabat Kediengaja',
    image: '/images/dokumentasi/tamu-2.jpg',
    date: 'Dokumentasi Tamu',
    desc: 'Menikmati liburan santai didampingi pemandu dan sopir lokal yang siap membantu foto di setiap spot.'
  },
  {
    id: 'doc-3',
    title: 'Momen Hangat Liburan Keluarga',
    category: 'Penginapan & Villa',
    location: 'Villa & Cabin Kediengaja',
    guest: 'Keluarga Tamu Kediengaja',
    image: '/images/dokumentasi/tamu-3.jpg',
    date: 'Dokumentasi Tamu',
    desc: 'Menginap nyaman di kabin bersih dengan jaminan air panas aktif 24 jam di tengah dinginnya Dieng.'
  },
  {
    id: 'doc-4',
    title: 'Petualangan Offroad Fun Jeep 4x4',
    category: 'Jeep Wisata 4x4',
    location: 'Jalur Kawah & Savana Dieng',
    guest: 'Rombongan Jelajah Dieng',
    image: '/images/dokumentasi/tamu-4.jpg',
    date: 'Dokumentasi Tamu',
    desc: 'Keseruan keliling kawah belerang dan perbukitan Dieng dengan Jeep offroad terbuka bersama sopir lokal ramah.'
  }
];

export const DEFAULT_POLAROID_SLIDES = [
  { id: '1', title: 'Sunrise Sikunir', image: '/images/dokumentasi/tamu-1.jpg' },
  { id: '2', title: 'Cabin House 1', image: '/images/cabin-house-1/building.jpg' },
  { id: '3', title: 'Tamu Kediengaja', image: '/images/dokumentasi/tamu-2.jpg' },
  { id: '4', title: 'Cabin House 2', image: '/images/cabin-house-2/building.jpg' },
  { id: '5', title: 'Offroad Jeep Dieng', image: '/images/dokumentasi/tamu-3.jpg' },
  { id: '6', title: 'Daun Villa Dieng', image: '/images/daun-villa/daun-villa-1.jpg' },
  { id: '7', title: 'Rombongan Tamu', image: '/images/dokumentasi/tamu-4.jpg' },
  { id: '8', title: 'Lautan Awan Prau', image: 'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?q=80&w=1800&auto=format&fit=crop' },
  { id: '9', title: 'Telaga Dieng', image: 'https://images.unsplash.com/photo-1501785888041-af3ef285b470?q=80&w=1800&auto=format&fit=crop' },
  { id: '10', title: 'Lembah Dieng', image: 'https://images.unsplash.com/photo-1469474968028-56623f02e42e?q=80&w=1800&auto=format&fit=crop' },
];

export const FALLBACK_JEEP = [
  {
    id: "jeep-short-trip",
    slug: "jeep-short-trip",
    nama: "Jeep 4x4 Rute Kawah & Savana (Short Trip)",
    kategori: "Short Route",
    harga: 450000,
    kapasitas: 4,
    durasi: "2 - 3 Jam",
    meetingPoint: "Basecamp Kediengaja / Jemput di Homestay",
    deskripsi: "Petualangan offroad seru menyusuri jalur tanah perkebunan dan kawah belerang. Sangat cocok untuk keluarga atau pemula yang ingin menikmati sensasi naik mobil terbuka di tengah udara sejuk pegunungan.",
    rute: ["Kawah Sikidang", "Batu Pandang Ratapan Angin", "Telaga Warna / Pengilon", "Kompleks Candi Arjuna"],
    termasuk: ["Armada Jeep 4x4", "BBM & Driver Lokal", "Jasa Foto di Spot Menarik", "Air Mineral"],
    tidakTermasuk: ["Tiket Masuk Wisata", "Pengeluaran Pribadi"],
    gambar: "https://images.unsplash.com/photo-1533473359331-0135ef1b58bf?auto=format&fit=crop&w=1200&q=80",
    isActive: true
  },
  {
    id: "jeep-medium-savana",
    slug: "jeep-medium-savana",
    nama: "Jeep 4x4 Eksplor Savana & Telaga Dringo (Medium Trip)",
    kategori: "Medium Route",
    harga: 550000,
    kapasitas: 4,
    durasi: "3 - 4 Jam",
    meetingPoint: "Basecamp Kediengaja / Jemput di Homestay",
    deskripsi: "Rute offroad jalur perbukitan menuju padang savana Lembah Pangonan dan Telaga Dringo yang tenang. Menawarkan pemandangan alam terbuka yang jarang dilalui kendaraan biasa.",
    rute: ["Kawah Sikidang", "Lembah Savana Pangonan", "Telaga Dringo (Ranu Kumbolo-nya Dieng)", "Kawah Candradimuka"],
    termasuk: ["Armada Jeep 4x4", "BBM & Driver Lokal", "Pendamping Dokumentasi", "Air Mineral"],
    tidakTermasuk: ["Tiket Masuk Wisata", "Pengeluaran Pribadi"],
    gambar: "https://images.unsplash.com/photo-1469474968028-56623f02e42e?auto=format&fit=crop&w=1200&q=80",
    isActive: true
  },
  {
    id: "jeep-sunrise-sikunir",
    slug: "jeep-sunrise-sikunir",
    nama: "Jeep 4x4 Sunrise Sikunir & Curug Sikarim (Long Trip)",
    kategori: "Long Route",
    harga: 750000,
    kapasitas: 4,
    durasi: "5 - 6 Jam (Mulai 03.30 Subuh)",
    meetingPoint: "Penjemputan Pukul 03.30 di Homestay",
    deskripsi: "Paket jelajah lengkap mulai dari penjemputan subuh untuk berburu sunrise di Sikunir, dilanjutkan tur offroad melewati air terjun Curug Sikarim dan kawah vulkanik Dieng.",
    rute: ["Bukit Sikunir (Sunrise)", "Telaga Cebong", "Curug Sikarim", "Kawah Sikidang", "Batu Angin"],
    termasuk: ["Armada Jeep 4x4 All-In", "Driver Pemandu Asli Dieng", "BBM", "Dokumentasi Foto", "Air Mineral"],
    tidakTermasuk: ["Tiket Objek Wisata", "Sarapan Pagi"],
    gambar: "https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?auto=format&fit=crop&w=1200&q=80",
    isActive: true
  }
];

export const FALLBACK_DESTINASI = [
  {
    id: "bukit-sikunir",
    slug: "bukit-sikunir",
    nama: "Bukit Sikunir",
    elevasi: "2.263 mdpl",
    kategori: "Golden Sunrise",
    jamTerbaik: "03.30 – 06.30 WIB",
    durasiKunjungan: "2 - 3 Jam",
    tiketMasuk: "Rp15.000 / orang",
    lokasi: "Desa Sembungan, Kejajar, Wonosobo",
    ringkasan: "Spot berburu golden sunrise terbaik di Asia Tenggara dengan latar belakang siluet Gunung Sindoro, Sumbing, Merbabu, dan Merapi.",
    deskripsi: "Terletak di Desa Sembungan (desa tertinggi di Pulau Jawa), Bukit Sikunir menyajikan panorama matahari terbit berbalut lautan awan yang menakjubkan. Jalur trekking tangga batu membutuhkan waktu sekitar 20–30 menit dari area parkir Telaga Cebong.",
    tipsLokal: [
      "Mulai mendaki maksimal pukul 04.30 WIB agar tidak tertinggal momen fajar emas.",
      "Gunakan jaket tebal windproof dan sarung tangan karena suhu subuh bisa mencapai 8°C.",
      "Sepatu dengan grip yang baik sangat disarankan untuk jalur tangga berembun."
    ],
    gambar: "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?auto=format&fit=crop&w=1200&q=80",
    galeri: [
      "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?auto=format&fit=crop&w=1200&q=80",
      "https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?auto=format&fit=crop&w=1200&q=80"
    ],
    rekomendasiStay: "Cabin House 1",
    rekomendasiJeep: "jeep-sunrise-sikunir"
  },
  {
    id: "telaga-warna",
    slug: "telaga-warna",
    nama: "Telaga Warna & Pengilon",
    elevasi: "2.000 mdpl",
    kategori: "Danau Alami & Hutan Pinus",
    jamTerbaik: "08.00 – 14.00 WIB (Saat Matahari Terik)",
    durasiKunjungan: "1.5 - 2 Jam",
    tiketMasuk: "Rp22.000 / orang (Domestik)",
    lokasi: "Dieng Wetan, Kejajar, Wonosobo",
    ringkasan: "Danau vulkanik unik dengan gradasi warna air hijau toska dan kuning akibat pantulan sulfur alami dan mineral belerang.",
    deskripsi: "Telaga Warna berdampingan dengan Telaga Pengilon yang airnya sangat jernih. Dikelilingi rimbunnya pohon pinus dan perbukitan, tempat ini memiliki udara yang sangat menyejukkan. Dari spot Batu Pandang Ratapan Angin di atas bukit, Anda dapat melihat pemandangan kedua telaga ini sekaligus.",
    tipsLokal: [
      "Waktu terbaik berkunjung adalah saat siang hari yang cerah agar gradasi warna air telaga terlihat jelas terkena pantulan sinar matahari.",
      "Kunjungi juga Gua Semar dan Gua Jaran yang berada di sisi jalur setapak pinggir danau."
    ],
    gambar: "https://images.unsplash.com/photo-1501785888041-af3ef285b470?auto=format&fit=crop&w=1200&q=80",
    galeri: [
      "https://images.unsplash.com/photo-1501785888041-af3ef285b470?auto=format&fit=crop&w=1200&q=80",
      "https://images.unsplash.com/photo-1470071459604-3b5ec3a7fe05?auto=format&fit=crop&w=1200&q=80"
    ],
    rekomendasiStay: "Kediengaja by Daun Villa",
    rekomendasiJeep: "jeep-short-trip"
  },
  {
    id: "kawah-sikidang",
    slug: "kawah-sikidang",
    nama: "Kawah Sikidang",
    elevasi: "2.050 mdpl",
    kategori: "Vulkanik Geotermal",
    jamTerbaik: "07.30 – 15.00 WIB",
    durasiKunjungan: "1 - 1.5 Jam",
    tiketMasuk: "Rp20.000 / orang (Tiket Terusan Candi Arjuna)",
    lokasi: "Dieng Kulon, Batur, Banjarnegara",
    ringkasan: "Kawah vulkanik aktif dengan kubangan lumpur mendidih dan jembatan kayu estetik sepanjang 1 km.",
    deskripsi: "Dinamakan Sikidang karena letup-letup lumpur panasnya sering berpindah tempat menyerupai kijang yang melompat. Saat ini telah dibangun jembatan kayu layang (boardwalk) yang mengelilingi area kawah sehingga pengunjung dapat berjalan santai dan berfoto tanpa menginjak tanah belerang.",
    tipsLokal: [
      "Gunakan masker medis atau kain penutup hidung karena aroma belerang di area kawah cukup kuat.",
      "Kacamata hitam dianjurkan saat siang hari karena permukaan pasir kawah memantulkan cahaya terik."
    ],
    gambar: "https://images.unsplash.com/photo-1469474968028-56623f02e42e?auto=format&fit=crop&w=1200&q=80",
    galeri: [
      "https://images.unsplash.com/photo-1469474968028-56623f02e42e?auto=format&fit=crop&w=1200&q=80"
    ],
    rekomendasiStay: "Cabin House 2",
    rekomendasiJeep: "jeep-short-trip"
  },
  {
    id: "candi-arjuna",
    slug: "candi-arjuna",
    nama: "Kompleks Candi Arjuna",
    elevasi: "2.093 mdpl",
    kategori: "Warisan Sejarah & Budaya",
    jamTerbaik: "07.00 – 11.00 WIB & Sore Hari",
    durasiKunjungan: "1 - 1.5 Jam",
    tiketMasuk: "Rp20.000 / orang (Tiket Terusan Kawah Sikidang)",
    lokasi: "Desa Dieng Kulon, Batur, Banjarnegara",
    ringkasan: "Gugusan candi Hindu tertua di tanah Jawa peninggalan Dinasti Sanjaya abad ke-7 yang berdiri megah di tengah lembah berkabut.",
    deskripsi: "Kompleks ini terdiri dari lima candi: Candi Arjuna, Semar, Srikandi, Puntadewa, dan Sembadra. Pada bulan Juli–Agustus saat musim kemarau, area lapangan rumput Candi Arjuna sering menjadi titik munculnya fenomena embun upas (lapisan es salju Dieng).",
    tipsLokal: [
      "Pagi hari adalah waktu terbaik untuk mengambil foto dengan latar rumput hijau berembun dan siluet kabut perbukitan.",
      "Jaga kesopanan dan tidak memanjat dinding batu candi purbakala demi pelestarian cagar budaya."
    ],
    gambar: "https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?auto=format&fit=crop&w=1200&q=80",
    galeri: [
      "https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?auto=format&fit=crop&w=1200&q=80"
    ],
    rekomendasiStay: "Cabin House 1",
    rekomendasiJeep: "jeep-short-trip"
  }
];
