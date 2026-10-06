"use client";

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { doc, getDoc, updateDoc } from 'firebase/firestore';
import { db } from '@/lib/firebase';
import ImageUploader from '@/components/ImageUploader';

export default function EditTour({ params }) {
  const { id } = params;
  const router = useRouter();
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [formData, setFormData] = useState({
    nama: '',
    tipe: 'Fun Jeep Wisata',
    durasi: '',
    lokasi: '',
    harga: '',
    gambar: '',
    deskripsi: '',
    destinasi: '',
    termasuk: '',
  });

  useEffect(() => {
    async function loadItem() {
      try {
        const snap = await getDoc(doc(db, 'tours', id));
        if (snap.exists()) {
          const d = snap.data();
          setFormData({
            nama: d.nama || '',
            tipe: d.tipe || 'Fun Jeep Wisata',
            durasi: d.durasi || '',
            lokasi: d.lokasi || '',
            harga: d.harga || '',
            gambar: d.gambar || '',
            deskripsi: d.deskripsi || '',
            destinasi: Array.isArray(d.destinasi) ? d.destinasi.join(', ') : '',
            termasuk: Array.isArray(d.termasuk) ? d.termasuk.join(', ') : '',
          });
        } else {
          alert('Data paket tour tidak ditemukan.');
          router.push('/tours');
        }
      } catch (err) {
        console.error('Error fetching tour:', err);
        alert('Gagal memuat data.');
      } finally {
        setLoading(false);
      }
    }
    loadItem();
  }, [id, router]);

  function handleChange(e) {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  }

  async function handleSubmit(e) {
    e.preventDefault();
    setSaving(true);

    try {
      await updateDoc(doc(db, 'tours', id), {
        nama: formData.nama,
        tipe: formData.tipe,
        durasi: formData.durasi,
        lokasi: formData.lokasi,
        harga: Number(formData.harga),
        gambar: formData.gambar,
        deskripsi: formData.deskripsi,
        destinasi: formData.destinasi.split(',').map(s => s.trim()).filter(Boolean),
        termasuk: formData.termasuk.split(',').map(s => s.trim()).filter(Boolean),
      });
      router.push('/tours');
    } catch (err) {
      console.error('Error updating tour:', err);
      alert('Gagal memperbarui data paket tour.');
    } finally {
      setSaving(false);
    }
  }

  if (loading) {
    return (
      <div className="p-8 max-w-3xl mx-auto text-gray-500">
        Memuat data paket tour...
      </div>
    );
  }

  return (
    <div className="p-8 max-w-3xl mx-auto">
      <h1 className="text-3xl font-bold text-gray-900 mb-6">Edit Paket Tour &amp; Jeep</h1>

      <form onSubmit={handleSubmit} className="bg-white p-6 rounded-lg shadow-sm border border-gray-200 space-y-4">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Nama Paket Tour / Trip</label>
          <input
            type="text"
            name="nama"
            value={formData.nama}
            onChange={handleChange}
            required
            className="w-full border border-gray-300 rounded-md p-2 focus:ring-2 focus:ring-nature-secondary focus:outline-none"
          />
        </div>

        <div className="grid grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Tipe</label>
            <select
              name="tipe"
              value={formData.tipe}
              onChange={handleChange}
              className="w-full border border-gray-300 rounded-md p-2 bg-white"
            >
              <option value="Fun Jeep Wisata">Fun Jeep Wisata</option>
              <option value="Open Trip Sunrise">Open Trip Sunrise</option>
              <option value="Private Trip Dieng">Private Trip Dieng</option>
            </select>
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Durasi</label>
            <input
              type="text"
              name="durasi"
              value={formData.durasi}
              onChange={handleChange}
              required
              className="w-full border border-gray-300 rounded-md p-2"
            />
          </div>
        </div>

        <div className="grid grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Lokasi Titik Kumpul</label>
            <input
              type="text"
              name="lokasi"
              value={formData.lokasi}
              onChange={handleChange}
              required
              className="w-full border border-gray-300 rounded-md p-2"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Harga per Orang / Mobil (Rp)</label>
            <input
              type="number"
              name="harga"
              value={formData.harga}
              onChange={handleChange}
              required
              className="w-full border border-gray-300 rounded-md p-2"
            />
          </div>
        </div>

        {/* Media Pipeline Uploader */}
        <ImageUploader
          value={formData.gambar}
          onChange={(val) => setFormData(prev => ({ ...prev, gambar: val }))}
          folder="tours"
          label="Foto Utama Paket Tour / Jeep"
        />

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Deskripsi Ringkas</label>
          <textarea
            name="deskripsi"
            rows="3"
            value={formData.deskripsi}
            onChange={handleChange}
            required
            className="w-full border border-gray-300 rounded-md p-2 focus:ring-2 focus:ring-nature-secondary focus:outline-none"
          ></textarea>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Destinasi yang Dikunjungi <span className="text-gray-400">(pisahkan dengan koma)</span>
          </label>
          <input
            type="text"
            name="destinasi"
            value={formData.destinasi}
            onChange={handleChange}
            required
            className="w-full border border-gray-300 rounded-md p-2"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Fasilitas Termasuk <span className="text-gray-400">(pisahkan dengan koma)</span>
          </label>
          <input
            type="text"
            name="termasuk"
            value={formData.termasuk}
            onChange={handleChange}
            required
            className="w-full border border-gray-300 rounded-md p-2"
          />
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
            disabled={saving}
            className="bg-nature-accent hover:bg-opacity-90 text-white px-6 py-2 rounded-md font-medium transition-colors disabled:opacity-50"
          >
            {saving ? 'Menyimpan...' : 'Perbarui Data'}
          </button>
        </div>
      </form>
    </div>
  );
}
