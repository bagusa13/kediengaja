"use client";

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { doc, getDoc, updateDoc } from 'firebase/firestore';
import { db } from '@/lib/firebase';

export default function EditPenginapan({ params }) {
  const { id } = params;
  const router = useRouter();
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [formData, setFormData] = useState({
    nama: '',
    tipe: 'Cabin House',
    lokasi: '',
    harga: '',
    kapasitas: '',
    gambar: '',
    deskripsi: '',
  });

  useEffect(() => {
    async function loadItem() {
      try {
        const snap = await getDoc(doc(db, 'penginapan', id));
        if (snap.exists()) {
          const d = snap.data();
          setFormData({
            nama: d.nama || '',
            tipe: d.tipe || 'Cabin House',
            lokasi: d.lokasi || '',
            harga: d.harga || '',
            kapasitas: d.kapasitas || '',
            gambar: d.gambar || '',
            deskripsi: d.deskripsi || '',
          });
        } else {
          alert('Data penginapan tidak ditemukan.');
          router.push('/penginapan');
        }
      } catch (err) {
        console.error('Error fetching penginapan:', err);
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
      await updateDoc(doc(db, 'penginapan', id), {
        nama: formData.nama,
        tipe: formData.tipe,
        lokasi: formData.lokasi,
        harga: Number(formData.harga),
        kapasitas: Number(formData.kapasitas),
        gambar: formData.gambar,
        deskripsi: formData.deskripsi,
      });
      router.push('/penginapan');
    } catch (err) {
      console.error('Error updating document:', err);
      alert('Gagal memperbarui data penginapan.');
    } finally {
      setSaving(false);
    }
  }

  if (loading) {
    return (
      <div className="p-8 max-w-3xl mx-auto text-gray-500">
        Memuat data penginapan...
      </div>
    );
  }

  return (
    <div className="p-8 max-w-3xl mx-auto">
      <h1 className="text-3xl font-bold text-gray-900 mb-6">Edit Penginapan</h1>

      <form onSubmit={handleSubmit} className="bg-white p-6 rounded-lg shadow-sm border border-gray-200 space-y-4">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Nama Penginapan</label>
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
              value={formData.lokasi}
              onChange={handleChange}
              required
              className="w-full border border-gray-300 rounded-md p-2"
            />
          </div>
        </div>

        <div className="grid grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Harga per Malam (Rp)</label>
            <input
              type="number"
              name="harga"
              value={formData.harga}
              onChange={handleChange}
              required
              className="w-full border border-gray-300 rounded-md p-2"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Kapasitas (Orang)</label>
            <input
              type="number"
              name="kapasitas"
              value={formData.kapasitas}
              onChange={handleChange}
              required
              className="w-full border border-gray-300 rounded-md p-2"
            />
          </div>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">URL Foto Penginapan</label>
          <input
            type="url"
            name="gambar"
            value={formData.gambar}
            onChange={handleChange}
            className="w-full border border-gray-300 rounded-md p-2 focus:ring-2 focus:ring-nature-secondary focus:outline-none"
            placeholder="https://..."
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Deskripsi Singkat</label>
          <textarea
            name="deskripsi"
            rows="3"
            value={formData.deskripsi}
            onChange={handleChange}
            required
            className="w-full border border-gray-300 rounded-md p-2 focus:ring-2 focus:ring-nature-secondary focus:outline-none"
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
