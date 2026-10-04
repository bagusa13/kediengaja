"use client";
import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { collection, addDoc, serverTimestamp } from 'firebase/firestore';
import { db } from '@/lib/firebase';

export default function CreateTour() {
  const router = useRouter();
  const [loading, setLoading] = useState(false);

  async function handleSubmit(e) {
    e.preventDefault();
    setLoading(true);

    const formData = new FormData(e.target);
    const data = {
      nama: formData.get('nama'),
      tipe: formData.get('tipe'),
      lokasi: formData.get('lokasi'),
      durasi: formData.get('durasi'),
      harga: Number(formData.get('harga')),
      deskripsi: formData.get('deskripsi'),
      gambar: formData.get('gambar') || '',
      destinasi: formData.get('destinasi').split(',').map(s => s.trim()).filter(Boolean),
      termasuk: formData.get('termasuk').split(',').map(s => s.trim()).filter(Boolean),
      isActive: true,
      createdAt: serverTimestamp()
    };

    try {
      await addDoc(collection(db, 'tours'), data);
      router.push('/tours');
    } catch (error) {
      console.error("Error adding document: ", error);
      alert("Gagal menyimpan data. Pastikan konfigurasi Firebase sudah benar.");
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="p-8 max-w-3xl mx-auto">
      <h1 className="text-3xl font-bold text-gray-900 mb-6">Tambah Paket Tour &amp; Jeep</h1>

      <form onSubmit={handleSubmit} className="bg-white p-6 rounded-lg shadow-sm border border-gray-200 space-y-4">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Nama Paket Tour / Trip</label>
          <input type="text" name="nama" required className="w-full border border-gray-300 rounded-md p-2 focus:ring-2 focus:ring-nature-secondary focus:outline-none" placeholder="Misal: Paket Fun Jeep Wisata Savana &amp; Kawah" />
        </div>

        <div className="grid grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Tipe</label>
            <select name="tipe" className="w-full border border-gray-300 rounded-md p-2 bg-white">
              <option value="Fun Jeep Wisata">Fun Jeep Wisata</option>
              <option value="Open Trip Sunrise">Open Trip Sunrise</option>
              <option value="Private Trip Dieng">Private Trip Dieng</option>
            </select>
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Durasi</label>
            <input type="text" name="durasi" required className="w-full border border-gray-300 rounded-md p-2" placeholder="Misal: 1 Hari / Half Day" />
          </div>
        </div>

        <div className="grid grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Lokasi Titik Kumpul</label>
            <input type="text" name="lokasi" required className="w-full border border-gray-300 rounded-md p-2" placeholder="Misal: Basecamp Kediengaja / Stasiun" />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Harga per Orang / Mobil (Rp)</label>
            <input type="number" name="harga" required className="w-full border border-gray-300 rounded-md p-2" placeholder="350000" />
          </div>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">URL Foto Paket (Opsional)</label>
          <input type="url" name="gambar" className="w-full border border-gray-300 rounded-md p-2 focus:ring-2 focus:ring-nature-secondary focus:outline-none" placeholder="https://... (jika kosong akan memakai foto referensi landscape Dieng)" />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Deskripsi Ringkas</label>
          <textarea name="deskripsi" rows="3" required className="w-full border border-gray-300 rounded-md p-2 focus:ring-2 focus:ring-nature-secondary focus:outline-none" placeholder="Jelaskan daya tarik paket, spot yang dikunjungi, atau fasilitas jeep..."></textarea>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Destinasi yang Dikunjungi <span className="text-gray-400">(pisahkan dengan koma)</span></label>
          <input type="text" name="destinasi" required className="w-full border border-gray-300 rounded-md p-2" placeholder="Bukit Sikunir, Kawah Sikidang, Telaga Warna, Candi Arjuna" />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Fasilitas Termasuk <span className="text-gray-400">(pisahkan dengan koma)</span></label>
          <input type="text" name="termasuk" required className="w-full border border-gray-300 rounded-md p-2" placeholder="Armada Jeep 4x4, Driver &amp; BBM, Tiket Wisata, Dokumentasi" />
        </div>

        <div className="pt-4 border-t border-gray-100 flex justify-end gap-3">
          <button type="button" onClick={() => router.back()} className="px-4 py-2 text-gray-600 hover:text-gray-900 transition-colors">Batal</button>
          <button type="submit" disabled={loading} className="bg-nature-accent hover:bg-opacity-90 text-white px-6 py-2 rounded-md font-medium transition-colors disabled:opacity-50">
            {loading ? 'Menyimpan...' : 'Simpan Data'}
          </button>
        </div>
      </form>
    </div>
  );
}
