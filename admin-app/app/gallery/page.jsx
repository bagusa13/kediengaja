"use client";

import { useEffect, useState } from 'react';
import { doc, getDoc, setDoc } from 'firebase/firestore';
import { db } from '@/lib/firebase';
import { uploadToCloudinary } from '@/lib/uploader';

const DEFAULT_SLIDES = [
  { id: '1', title: 'Sunrise Sikunir', image: '/images/destinasi/bukit-sikunir.webp' },
  { id: '2', title: 'Cabin House 1', image: '/images/cabin-house-1/building.jpg' },
  { id: '3', title: 'Tamu Kediengaja', image: '/images/dokumentasi/tamu-2.jpg' },
  { id: '4', title: 'Cabin House 2', image: '/images/cabin-house-2/building.jpg' },
  { id: '5', title: 'Offroad Jeep Dieng', image: '/images/dokumentasi/tamu-3.jpg' },
  { id: '6', title: 'Daun Villa Dieng', image: '/images/daun-villa/daun-villa-1.jpg' },
  { id: '7', title: 'Rombongan Tamu', image: '/images/dokumentasi/tamu-4.jpg' },
  { id: '8', title: 'Candi Arjuna', image: '/images/destinasi/candi-arjuna.webp' },
  { id: '9', title: 'Kawah Sikidang', image: '/images/destinasi/kawah-sikidang.webp' },
  { id: '10', title: 'Telaga Warna', image: '/images/destinasi/telaga-warna.webp' },
];

const PRESET_PHOTOS = [
  { label: 'Destinasi: Bukit Sikunir (HD WebP)', url: '/images/destinasi/bukit-sikunir.webp' },
  { label: 'Destinasi: Candi Arjuna (HD WebP)', url: '/images/destinasi/candi-arjuna.webp' },
  { label: 'Destinasi: Kawah Sikidang (HD WebP)', url: '/images/destinasi/kawah-sikidang.webp' },
  { label: 'Destinasi: Telaga Warna (HD WebP)', url: '/images/destinasi/telaga-warna.webp' },
  { label: 'Tamu 1 (Sunrise Sikunir)', url: '/images/dokumentasi/tamu-1.jpg' },
  { label: 'Tamu 2 (Keluarga/Gathering)', url: '/images/dokumentasi/tamu-2.jpg' },
  { label: 'Tamu 3 (Jeep Offroad)', url: '/images/dokumentasi/tamu-3.jpg' },
  { label: 'Tamu 4 (Daun Villa Tamu)', url: '/images/dokumentasi/tamu-4.jpg' },
  { label: 'Cabin House 1 (Bangunan)', url: '/images/cabin-house-1/building.jpg' },
  { label: 'Cabin House 1 (Living Room)', url: '/images/cabin-house-1/livingroom.jpg' },
  { label: 'Cabin House 2 (Bangunan)', url: '/images/cabin-house-2/building.jpg' },
  { label: 'Daun Villa (Eksterior)', url: '/images/daun-villa/daun-villa-1.jpg' },
  { label: 'Daun Villa (Kamar)', url: '/images/daun-villa/daun-villa-2.jpg' },
];

export default function GalleryManagerPage() {
  const [slides, setSlides] = useState(DEFAULT_SLIDES);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [uploadingIdx, setUploadingIdx] = useState(null);
  const [msg, setMsg] = useState({ text: '', type: '' });

  async function handleSlotUpload(idx, e) {
    const file = e.target.files?.[0];
    if (!file) return;
    setUploadingIdx(idx);
    setMsg({ text: '', type: '' });
    try {
      const url = await uploadToCloudinary(file, 'gallery');
      handleChange(idx, 'image', url);
      setMsg({ text: `Foto #${idx + 1} berhasil diunggah ke Cloudinary! Jangan lupa klik "Simpan Perubahan".`, type: 'info' });
    } catch (err) {
      alert(err.message || 'Gagal mengunggah foto.');
    } finally {
      setUploadingIdx(null);
    }
  }

  useEffect(() => {
    async function load() {
      try {
        const snap = await getDoc(doc(db, 'settings', 'gallery'));
        if (snap.exists() && snap.data()?.slides?.length > 0) {
          const loaded = snap.data().slides;
          // Ensure always 10 slots
          const filled = Array.from({ length: 10 }, (_, i) => {
            return loaded[i] || DEFAULT_SLIDES[i] || { id: String(i + 1), title: `Foto ${i + 1}`, image: '' };
          });
          setSlides(filled);
        } else {
          setSlides(DEFAULT_SLIDES);
        }
      } catch (err) {
        console.warn('Load gallery settings fallback:', err);
        setSlides(DEFAULT_SLIDES);
      } finally {
        setLoading(false);
      }
    }
    load();
  }, []);

  const handleChange = (index, field, value) => {
    setSlides((prev) => {
      const copy = [...prev];
      copy[index] = { ...copy[index], [field]: value };
      return copy;
    });
    setMsg({ text: '', type: '' });
  };

  const handleApplyPreset = (index, presetUrl, presetTitle) => {
    setSlides((prev) => {
      const copy = [...prev];
      copy[index] = {
        ...copy[index],
        image: presetUrl,
        title: copy[index].title || presetTitle,
      };
      return copy;
    });
    setMsg({ text: '', type: '' });
  };

  const handleReset = () => {
    if (confirm('Kembalikan 10 foto polaroid ke susunan standar awal?')) {
      setSlides(DEFAULT_SLIDES);
      setMsg({ text: 'Daftar foto dikembalikan ke standar awal. Klik "Simpan Perubahan" untuk menerapkan.', type: 'info' });
    }
  };

  const handleSave = async () => {
    setSaving(true);
    setMsg({ text: '', type: '' });
    try {
      await setDoc(doc(db, 'settings', 'gallery'), {
        slides: slides.map((s, idx) => ({
          id: String(idx + 1),
          title: (s.title || `Foto ${idx + 1}`).trim(),
          image: (s.image || '').trim(),
        })),
        updatedAt: new Date().toISOString(),
      });
      setMsg({
        text: 'Berhasil! 10 Foto Polaroid telah disimpan ke database Firestore. Website publik langsung terupdate secara otomatis.',
        type: 'success',
      });
    } catch (err) {
      console.error('Error saving gallery:', err);
      // Fallback response for local state simulation
      setMsg({
        text: 'Perubahan tersimpan di memori aplikasi lokal (Firestore rules atau koneksi perlu dikonfigurasi untuk write publik).',
        type: 'info',
      });
    } finally {
      setSaving(false);
    }
  };

  if (loading) {
    return (
      <div className="p-4 sm:p-6 md:p-8 max-w-6xl mx-auto">
        <p className="text-gray-500 text-sm">Memuat pengaturan galeri polaroid...</p>
      </div>
    );
  }

  return (
    <div className="p-4 sm:p-6 md:p-8 max-w-6xl mx-auto">
      {/* HEADER */}
      <div className="mb-6 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Kelola 10 Foto Polaroid</h1>
          <p className="text-sm text-gray-500 mt-1">
            Ganti footage gambar dan judul singkat untuk 10 foto polaroid yang tergantung di beranda utama website.
          </p>
        </div>

        <div className="flex items-center gap-3">
          <button
            type="button"
            onClick={handleReset}
            disabled={saving}
            className="px-4 py-2 border border-gray-300 text-gray-700 bg-white hover:bg-gray-50 rounded-lg text-sm font-semibold transition"
          >
            🔄 Reset Standar
          </button>
          <button
            type="button"
            onClick={handleSave}
            disabled={saving}
            className="px-5 py-2.5 bg-emerald-600 hover:bg-emerald-700 text-white rounded-lg text-sm font-semibold shadow transition disabled:opacity-50"
          >
            {saving ? 'Menyimpan...' : '💾 Simpan Perubahan'}
          </button>
        </div>
      </div>

      {/* NOTIFIKASI PESAN */}
      {msg.text ? (
        <div
          className={`mb-6 p-4 rounded-lg text-sm ${
            msg.type === 'success'
              ? 'bg-emerald-50 text-emerald-800 border border-emerald-200'
              : msg.type === 'error'
              ? 'bg-red-50 text-red-800 border border-red-200'
              : 'bg-blue-50 text-blue-800 border border-blue-200'
          }`}
        >
          {msg.text}
        </div>
      ) : null}

      {/* QUICK PRESET REFERENCE BAR */}
      <div className="mb-8 rounded-xl bg-gray-50 border border-gray-200 p-4">
        <p className="text-xs font-bold text-gray-700 mb-2 uppercase tracking-wider">
          Pilihan Cepat Foto Koleksi Asli (Google Drive):
        </p>
        <div className="flex flex-wrap gap-2 text-xs">
          {PRESET_PHOTOS.map((p) => (
            <span
              key={p.url}
              className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-md bg-white border border-gray-200 text-gray-600"
            >
              <span className="font-medium text-gray-800">{p.label}:</span>
              <code className="text-[11px] text-emerald-600 font-mono">{p.url}</code>
            </span>
          ))}
        </div>
      </div>

      {/* 10 SLOTS GRID */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {slides.map((slide, idx) => (
          <div
            key={idx}
            className="rounded-xl border border-gray-200 bg-white p-5 shadow-xs hover:border-emerald-300 transition-all flex flex-col justify-between"
          >
            <div className="flex items-start gap-4">
              {/* Slot Number & Live Thumbnail */}
              <div className="flex flex-col items-center gap-2 shrink-0">
                <span className="inline-flex items-center justify-center h-6 px-2.5 rounded-full bg-emerald-100 text-emerald-800 text-xs font-bold">
                  Foto #{idx + 1}
                </span>

                <div className="w-24 h-24 rounded-lg border border-gray-200 bg-gray-100 overflow-hidden relative shadow-inner">
                  {slide.image ? (
                    <img
                      src={slide.image}
                      alt={slide.title || `Slot ${idx + 1}`}
                      className="w-full h-full object-cover"
                      onError={(e) => {
                        e.currentTarget.style.display = 'none';
                      }}
                    />
                  ) : (
                    <div className="w-full h-full flex items-center justify-center text-[10px] text-gray-400 text-center p-1">
                      Belum ada gambar
                    </div>
                  )}
                </div>
              </div>

              {/* Form Input: Title & Image URL */}
              <div className="flex-1 space-y-3">
                <div>
                  <label className="block text-xs font-semibold text-gray-700 mb-1">
                    Judul Singkat Foto:
                  </label>
                  <input
                    type="text"
                    value={slide.title || ''}
                    maxLength={30}
                    onChange={(e) => handleChange(idx, 'title', e.target.value)}
                    placeholder="Contoh: Sunrise Sikunir"
                    className="w-full p-2 border border-gray-300 rounded-lg text-sm text-gray-900 focus:outline-emerald-500 font-medium"
                  />
                  <p className="text-[11px] text-gray-400 mt-0.5">Maks. 30 karakter, tampil di bawah polaroid.</p>
                </div>

                {/* File Upload Button to Cloudinary */}
                <div>
                  <label className="block text-xs font-semibold text-gray-700 mb-1">
                    Unggah Foto Polaroid (Otomatis ke Cloudinary):
                  </label>
                  <div className="flex items-center gap-2">
                    <label className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg border border-gray-300 bg-gray-50 hover:bg-emerald-50 hover:border-emerald-500 text-xs font-semibold text-gray-700 cursor-pointer transition">
                      <input
                        type="file"
                        accept="image/*"
                        disabled={uploadingIdx === idx}
                        onChange={(e) => handleSlotUpload(idx, e)}
                        className="hidden"
                      />
                      {uploadingIdx === idx ? (
                        <span className="text-emerald-600 font-bold animate-pulse">⏳ Mengompresi &amp; Mengunggah...</span>
                      ) : (
                        <span>📷 Pilih Foto dari HP / PC</span>
                      )}
                    </label>
                    <span className="text-[11px] text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded border border-emerald-200">
                      Rasio 1:1 / 4:5
                    </span>
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-semibold text-gray-700 mb-1">
                    URL Gambar / CDN Link:
                  </label>
                  <input
                    type="text"
                    value={slide.image || ''}
                    onChange={(e) => handleChange(idx, 'image', e.target.value)}
                    placeholder="URL otomatis terisi saat upload atau masukkan manual..."
                    className="w-full p-2 border border-gray-300 rounded-lg text-xs font-mono text-gray-800 focus:outline-emerald-500"
                  />
                </div>

                {/* Dropdown Preset */}
                <div>
                  <label className="block text-[11px] font-medium text-gray-500 mb-0.5">
                    Gunakan Preset Koleksi:
                  </label>
                  <select
                    onChange={(e) => {
                      if (e.target.value) {
                        const found = PRESET_PHOTOS.find((p) => p.url === e.target.value);
                        handleApplyPreset(idx, e.target.value, found?.label.split(' (')[0] || '');
                      }
                    }}
                    defaultValue=""
                    className="w-full p-1.5 border border-gray-200 rounded text-xs text-gray-600 bg-gray-50"
                  >
                    <option value="" disabled>-- Pilih dari koleksi lokal Dieng --</option>
                    {PRESET_PHOTOS.map((p) => (
                      <option key={p.url} value={p.url}>
                        {p.label}
                      </option>
                    ))}
                  </select>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* BOTTOM SAVE BUTTON */}
      <div className="mt-8 pt-6 border-t border-gray-200 flex justify-end">
        <button
          type="button"
          onClick={handleSave}
          disabled={saving}
          className="px-6 py-3 bg-emerald-600 hover:bg-emerald-700 text-white rounded-xl text-sm font-bold shadow-md transition disabled:opacity-50"
        >
          {saving ? 'Menyimpan ke Sistem...' : '💾 Simpan Perubahan 10 Foto Polaroid'}
        </button>
      </div>
    </div>
  );
}
