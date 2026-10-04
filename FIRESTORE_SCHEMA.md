# Kediengaja - Firestore Database Schema

Struktur data NoSQL di bawah ini adalah tata letak (schema) yang akan digunakan untuk menyimpan data penginapan dan paket tur di Firebase Firestore.

## 1. Collection: `penginapan`
Digunakan untuk menyimpan daftar villa, homestay, atau cabin.

**Document ID:** Auto-generated atau manual (misal: `villa-serenity`)

```json
{
  "nama": "Villa Serenity Dieng",
  "tipe": "Villa", // Villa, Homestay, Cabin
  "lokasi": "Dieng Plateau",
  "kapasitas": 6,
  "kamarTidur": 3,
  "kamarMandi": 2,
  "harga": 1500000,
  "deskripsi": "Penginapan eksklusif dengan pemandangan langsung ke perbukitan hijau Dieng.",
  "fasilitas": [
    "Water Heater",
    "WiFi",
    "Dapur Lengkap",
    "Smart TV",
    "Balkon"
  ],
  "gambarUtama": "https://firebasestorage.googleapis.com/v0/b/...",
  "galeri": [
    "https://firebasestorage.googleapis.com/...",
    "https://firebasestorage.googleapis.com/..."
  ],
  "isActive": true,
  "createdAt": "timestamp"
}
```

## 2. Collection: `tours`
Digunakan untuk menyimpan daftar paket wisata / open trip / private trip.

**Document ID:** Auto-generated atau manual (misal: `sunrise-sikunir-trip`)

```json
{
  "nama": "Private Trip Sikunir Sunrise",
  "durasi": "1 Hari",
  "tipe": "Private Trip", // Private Trip, Open Trip
  "harga": 350000, // Harga per pax (jika ada variasi, bisa dipecah)
  "lokasi": "Dieng",
  "deskripsi": "Nikmati golden sunrise terbaik di Asia Tenggara dari puncak Bukit Sikunir.",
  "destinasi": [
    "Bukit Sikunir",
    "Telaga Warna",
    "Kawah Sikidang"
  ],
  "termasuk": [
    "Transportasi",
    "Tiket Masuk",
    "Guide Lokal",
    "Air Mineral"
  ],
  "tidakTermasuk": [
    "Makan Siang",
    "Pengeluaran Pribadi"
  ],
  "gambarUtama": "https://firebasestorage.googleapis.com/v0/b/...",
  "isActive": true,
  "createdAt": "timestamp"
}
```

---
**Catatan untuk Admin:**
Jika menggunakan Opsi A (tanpa web admin khusus), Anda dapat membuat koleksi (`penginapan` & `tours`) langsung di [Firebase Console > Firestore Database](https://console.firebase.google.com/) dan menambahkan dokumen menggunakan struktur kolom/field persis seperti di atas.
