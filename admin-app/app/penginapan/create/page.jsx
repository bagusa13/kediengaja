"use client";

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { collection, addDoc, serverTimestamp } from 'firebase/firestore';
import { db } from '@/lib/firebase';
import ImageUploader from '@/components/ImageUploader';

export default function CreatePenginapan() {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [gambar, setGambar] = useState('');

  async function handleSubmit(e) {
    e.preventDefault();
    setLoading(true);

    const formData = new FormData(e.target);
    const hargaVal = Number(formData.get('harga'));
    const kapasitasVal = Number(formData.get('kapasitas'));

    if (hargaVal <= 0 || kapasitasVal <= 0) {
      alert('Harga dan kapasitas harus bernilai positif.');
      setLoading(false);
      return;
    }

    const data = {
      nama: String(formData.get('nama') || '').trim(),
      tipe: String(formData.get('tipe') || 'Cabin House'),
      lokasi: String(formData.get('lokasi') || '').trim(),
      harga: hargaVal,
      kapasitas: kapasitasVal,
      deskripsi: String(formData.get('deskripsi') || '').trim(),
      gambar: gambar.trim(),
      bookedDates: [],
      isActive: true,
      createdAt: serverTimestamp(),
    };

    try {
      await addDoc(collection(db, 'penginapan'), data);
      router.push('/penginapan');
    } catch (error) {
      console.error('Error adding document: ', error);
      alert('Gagal menyimpan data penginapan. Pastikan sesi login admin aktif.');
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="p-4 sm:p-6 md:p-8 max-w-3xl mx-auto">
      <h1 className="text-3xl font-bold text-gray-900 mb-6">Tambah Penginapan</h1>

      <form onSubmit={handleSubmit} className="bg-white p-6 rounded-lg shadow-sm border border-gray-200 space-y-5">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Nama Penginapan</label>
          <input
            type="text"
            name="nama"
            required
            className="w-full border border-gray-300 rounded-md p-2 focus:ring-2 focus:ring-emerald-600 focus:outline-none"
            placeholder="Misal: Cabin House Sikunir View"
          />
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
            <input
              type="text"
              name="lokasi"
              required
              className="w-full border border-gray-300 rounded-md p-2"
              placeholder="Misal: Sembungan / Dieng Kulon"
            />
          </div>
        </div>

        <div className="grid grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Harga per Malam (Rp)</label>
            <input
              type="number"
              name="harga"
              min="1"
              required
              className="w-full border border-gray-300 rounded-md p-2"
              placeholder="450000"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Kapasitas (Orang)</label>
            <input
              type="number"
              name="kapasitas"
              min="1"
              required
              className="w-full border border-gray-300 rounded-md p-2"
              placeholder="4"
            />
          </div>
        </div>

        {/* Media Pipeline Uploader */}
        <ImageUploader
          value={gambar}
          onChange={setGambar}
          folder="penginapan"
          label="Foto Utama Penginapan"
        />

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Deskripsi Singkat</label>
          <textarea
            name="deskripsi"
            rows="3"
            required
            className="w-full border border-gray-300 rounded-md p-2 focus:ring-2 focus:ring-emerald-600 focus:outline-none"
            placeholder="Jelaskan fasilitas water heater 24 jam, pemandangan, dan kenyamanan kamar..."
          ></textarea>
        </div>

        <div className="pt-4 border-t border-gray-100 flex justify-end gap-3">
          <button
            type="button"
            onClick={() => router.back()}
            className="px-4 py-2 text-gray-600 hover:text-gray-900 transition-colors"
          >
            Batal
          </button>
          <button
            type="submit"
            disabled={loading}
            className="bg-emerald-700 hover:bg-emerald-800 text-white px-6 py-2 rounded-md font-medium transition-colors disabled:opacity-50"
          >
            {loading ? 'Menyimpan...' : 'Simpan Data'}
          </button>
        </div>
      </form>
    </div>
  );
}
