"use client";
import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { collection, addDoc, serverTimestamp } from 'firebase/firestore';
import { db } from '@/lib/firebase';

export default function CreatePenginapan() {
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
      harga: Number(formData.get('harga')),
      kapasitas: Number(formData.get('kapasitas')),
      deskripsi: formData.get('deskripsi'),
      gambar: formData.get('gambar') || '',
      isActive: true,
      createdAt: serverTimestamp()
    };
    
    try {
      await addDoc(collection(db, 'penginapan'), data);
      router.push('/penginapan');
    } catch (error) {
      console.error("Error adding document: ", error);
      alert("Gagal menyimpan data. Pastikan konfigurasi Firebase sudah benar.");
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="p-8 max-w-3xl mx-auto">
      <h1 className="text-3xl font-bold text-gray-900 mb-6">Tambah Penginapan</h1>
      
      <form onSubmit={handleSubmit} className="bg-white p-6 rounded-lg shadow-sm border border-gray-200 space-y-4">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Nama Penginapan</label>
          <input type="text" name="nama" required className="w-full border border-gray-300 rounded-md p-2 focus:ring-2 focus:ring-nature-secondary focus:outline-none" placeholder="Misal: Cabin House Sikunir View" />
        </div>
        
        <div className="grid grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Tipe</label>
            <select name="tipe" className="w-full border border-gray-300 rounded-md p-2 bg-white">
              <option value="Cabin House">Cabin House</option>
              <option value="Homestay">Homestay</option>
              <option value="Villa">Villa</option>
            </select>
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Lokasi</label>
            <input type="text" name="lokasi" required className="w-full border border-gray-300 rounded-md p-2" placeholder="Misal: Sembungan / Dieng Kulon" />
          </div>
        </div>

        <div className="grid grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Harga per Malam (Rp)</label>
            <input type="number" name="harga" required className="w-full border border-gray-300 rounded-md p-2" placeholder="450000" />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Kapasitas (Orang)</label>
            <input type="number" name="kapasitas" required className="w-full border border-gray-300 rounded-md p-2" placeholder="4" />
          </div>
        </div>
        
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">URL Foto Penginapan (Opsional)</label>
          <input type="url" name="gambar" className="w-full border border-gray-300 rounded-md p-2 focus:ring-2 focus:ring-nature-secondary focus:outline-none" placeholder="https://... (jika kosong akan memakai foto referensi Dieng yang estetik)" />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Deskripsi Singkat</label>
          <textarea name="deskripsi" rows="3" required className="w-full border border-gray-300 rounded-md p-2 focus:ring-2 focus:ring-nature-secondary focus:outline-none" placeholder="Jelaskan fasilitas, kenyamanan, atau keindahan view penginapan..."></textarea>
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
