import { initializeApp } from "firebase/app";
import { getFirestore, collection, addDoc, serverTimestamp, getDocs } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyD6NqMVcqlRnFoRJkoH5wJ7ZZ337hyjcOM",
  authDomain: "kediengaja.firebaseapp.com",
  projectId: "kediengaja",
  storageBucket: "kediengaja.firebasestorage.app",
  messagingSenderId: "79623061497",
  appId: "1:79623061497:web:bf4aa4b870e16166854728"
};

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

const samplePenginapan = [
  {
    nama: "Cabin House Sikunir View",
    tipe: "Cabin House",
    lokasi: "Sembungan, Dieng (Desa Tertinggi)",
    harga: 450000,
    kapasitas: 4,
    deskripsi: "Kabin kayu berarsitektur segitiga estetik dengan pemandangan langsung ke perbukitan dan Telaga Cebong. Udara sejuk pegunungan, water heater hangat, dan hanya 5 menit menuju gerbang pendakian Sunrise Sikunir.",
    gambar: "https://images.unsplash.com/photo-1510797215324-95aa89f43c33?auto=format&fit=crop&w=1200&q=80",
    isActive: true
  },
  {
    nama: "Homestay Panorama Candi",
    tipe: "Homestay",
    lokasi: "Dieng Kulon, Banjarnegara",
    harga: 250000,
    kapasitas: 6,
    deskripsi: "Homestay ramah keluarga berlokasi strategis di pusat Dieng, dekat Kompleks Candi Arjuna. Dilengkapi dapur bersama, fasilitas teh & kopi Dieng gratis, water heater, serta ruang santai yang hangat.",
    gambar: "https://images.unsplash.com/photo-1586611292717-f828b167408c?auto=format&fit=crop&w=1200&q=80",
    isActive: true
  },
  {
    nama: "Villa Estetik Dieng Plateau",
    tipe: "Villa",
    lokasi: "Kejajar, Jalur Utama Dieng",
    harga: 850000,
    kapasitas: 10,
    deskripsi: "Villa privat dengan desain kontemporer bernuansa alam. Ruang kumpul luas, perapian hangat, view perkebunan carica dan lereng gunung berkabut yang syahdu. Sangat cocok untuk rombongan maupun liburan keluarga besar.",
    gambar: "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=1200&q=80",
    isActive: true
  }
];

const sampleTours = [
  {
    nama: "Fun Jeep Wisata Dieng (Kawah & Savana)",
    tipe: "Fun Jeep Wisata",
    lokasi: "Basecamp Kediengaja Dieng",
    durasi: "3 - 4 Jam",
    harga: 450000,
    deskripsi: "Sensasi menjelajah alam Dieng menggunakan armada Jeep 4x4 bersama driver lokal ramah dan berpengalaman. Melewati jalur seru ke kawah belerang, telaga tersembunyi, hingga padang savana hijau yang luas.",
    destinasi: ["Kawah Sikidang", "Savana Pangonan", "Telaga Warna & Pengilon", "Batu Pandang Ratapan Angin"],
    termasuk: ["Armada Jeep 4x4 & BBM", "Driver lokal merangkap pemandu", "Dokumentasi foto di spot terbaik", "Tiket masuk kawasan kawah"],
    gambar: "https://images.unsplash.com/photo-1533473359331-0135ef1b58bf?auto=format&fit=crop&w=1200&q=80",
    isActive: true
  },
  {
    nama: "Open Trip Golden Sunrise Sikunir",
    tipe: "Open Trip Sunrise",
    lokasi: "Meeting Point Rest Area Dieng",
    durasi: "1 Hari (03.00 - Siang)",
    harga: 175000,
    deskripsi: "Berburu golden sunrise terbaik se-Asia Tenggara di puncak Bukit Sikunir. Paket hemat gabungan bareng teman-teman baru, sudah termasuk tiket masuk dan pemandu lokal yang siap mengawal trip Anda.",
    destinasi: ["Puncak Bukit Sikunir", "Telaga Cebong", "Kompleks Candi Arjuna", "Pusat Oleh-oleh Carica"],
    termasuk: ["Transportasi lokal Dieng", "Tiket masuk semua objek wisata", "Tour Leader & Guide Lokal", "Welcome drink teh hangat"],
    gambar: "https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?auto=format&fit=crop&w=1200&q=80",
    isActive: true
  },
  {
    nama: "Private Trip Eksplor Dieng 2D1N All-In",
    tipe: "Private Trip Dieng",
    lokasi: "Antar-Jemput Stasiun / Terminal / Bandara",
    durasi: "2 Hari 1 Malam",
    harga: 650000,
    deskripsi: "Liburan santai tanpa ribet untuk keluarga atau rombongan. Sudah termasuk penginapan estetik, mobil privat antar-jemput, keliling seluruh destinasi ikonik Dieng, dan kuliner khas mie ongklok.",
    destinasi: ["Bukit Sikunir", "Kawah Sikidang", "Telaga Menjer & Perahu", "Candi Arjuna", "Pusat Oleh-Oleh"],
    termasuk: ["Akomodasi penginapan 1 malam", "Mobil privat + Driver + BBM", "Tiket wisata all-in", "Makan sesuai program", "Dokumentasi"],
    gambar: "https://images.unsplash.com/photo-1469474968028-56623f02e42e?auto=format&fit=crop&w=1200&q=80",
    isActive: true
  }
];

async function seed() {
  console.log("Memeriksa data penginapan yang ada...");
  const penginapanSnap = await getDocs(collection(db, "penginapan"));
  if (penginapanSnap.empty) {
    console.log("Mengisi data contoh Penginapan...");
    for (const item of samplePenginapan) {
      await addDoc(collection(db, "penginapan"), {
        ...item,
        createdAt: serverTimestamp()
      });
      console.log(`+ Ditambahkan penginapan: ${item.nama}`);
    }
  } else {
    console.log(`Penginapan sudah memiliki ${penginapanSnap.size} data.`);
  }

  console.log("Memeriksa data tour yang ada...");
  const tourSnap = await getDocs(collection(db, "tours"));
  if (tourSnap.empty) {
    console.log("Mengisi data contoh Tour & Jeep...");
    for (const item of sampleTours) {
      await addDoc(collection(db, "tours"), {
        ...item,
        createdAt: serverTimestamp()
      });
      console.log(`+ Ditambahkan tour: ${item.nama}`);
    }
  } else {
    console.log(`Tour sudah memiliki ${tourSnap.size} data.`);
  }

  console.log("Proses seeding selesai dengan sukses!");
  process.exit(0);
}

seed().catch((err) => {
  console.error("Gagal melakukan seeding:", err);
  process.exit(1);
});
