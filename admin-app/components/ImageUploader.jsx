"use client";

import { useState } from 'react';
import { Upload, X, Check, Image as ImageIcon, Loader2 } from 'lucide-react';
import { ref, uploadBytes, getDownloadURL } from 'firebase/storage';
import { getFirebaseStorage } from '@/lib/firebase';

/**
 * Compresses an image client-side using HTML5 Canvas to WebP format.
 * Max dimension: 1600px, Quality: 0.82
 */
async function compressImageClient(file, maxDimension = 1600, quality = 0.82) {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = (event) => {
      const img = new Image();
      img.src = event.target.result;
      img.onload = () => {
        let width = img.width;
        let height = img.height;

        if (width > maxDimension || height > maxDimension) {
          if (width > height) {
            height = Math.round((height * maxDimension) / width);
            width = maxDimension;
          } else {
            width = Math.round((width * maxDimension) / height);
            height = maxDimension;
          }
        }

        const canvas = document.createElement('canvas');
        canvas.width = width;
        canvas.height = height;
        const ctx = canvas.getContext('2d');
        ctx.drawImage(img, 0, 0, width, height);

        canvas.toBlob(
          (blob) => {
            if (blob) {
              resolve(blob);
            } else {
              reject(new Error('Gagal mengompresi gambar.'));
            }
          },
          'image/webp',
          quality
        );
      };
      img.onerror = (err) => reject(err);
    };
    reader.onerror = (err) => reject(err);
  });
}

export default function ImageUploader({
  value = '',
  onChange = () => {},
  folder = 'accommodations',
  label = 'Foto Penginapan',
}) {
  const [uploading, setUploading] = useState(false);
  const [error, setError] = useState('');
  const [preview, setPreview] = useState(value);

  async function handleFileSelect(e) {
    const file = e.target.files?.[0];
    if (!file) return;

    if (!file.type.startsWith('image/')) {
      setError('Hanya file gambar (JPEG, PNG, WebP) yang diizinkan.');
      return;
    }

    if (file.size > 15 * 1024 * 1024) {
      setError('Ukuran file maksimal 15MB.');
      return;
    }

    setError('');
    setUploading(true);

    try {
      // 1. Client-side compression to WebP
      const compressedBlob = await compressImageClient(file);

      const cloudinaryCloud = process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME;
      const cloudinaryPreset = process.env.NEXT_PUBLIC_CLOUDINARY_UPLOAD_PRESET;

      // 2A. Jika Cloudinary terkonfigurasi (Opsi Bebas Kartu Kredit)
      if (cloudinaryCloud && cloudinaryPreset) {
        const formData = new FormData();
        formData.append('file', compressedBlob, `${Date.now()}.webp`);
        formData.append('upload_preset', cloudinaryPreset);
        formData.append('folder', `kediengaja/${folder}`);

        const res = await fetch(`https://api.cloudinary.com/v1_1/${cloudinaryCloud}/image/upload`, {
          method: 'POST',
          body: formData,
        });

        if (!res.ok) {
          const errData = await res.json().catch(() => ({}));
          throw new Error(errData?.error?.message || 'Gagal mengunggah foto ke Cloudinary.');
        }

        const data = await res.json();
        const imageUrl = data.secure_url || data.url;
        setPreview(imageUrl);
        onChange(imageUrl);
        return;
      }

      // 2B. Fallback ke Firebase Storage (Jika aktif)
      const storage = getFirebaseStorage();
      if (storage) {
        const safeName = file.name.replace(/[^a-zA-Z0-9.-]/g, '_').replace(/\.[^/.]+$/, '');
        const storagePath = `uploads/${folder}/${Date.now()}_${safeName}.webp`;
        const storageRef = ref(storage, storagePath);

        await uploadBytes(storageRef, compressedBlob, {
          contentType: 'image/webp',
          customMetadata: {
            originalName: file.name,
            compressedAt: new Date().toISOString(),
          },
        });

        const downloadUrl = await getDownloadURL(storageRef);
        setPreview(downloadUrl);
        onChange(downloadUrl);
        return;
      }

      throw new Error('Penyimpanan cloud belum aktif. Silakan masukkan Cloudinary di .env atau tempel URL gambar manual di bawah.');
    } catch (err) {
      console.warn('Media upload notice:', err);
      setError(err.message || 'Gagal mengunggah foto. Anda tetap dapat memasukkan URL gambar secara manual di bawah.');
    } finally {
      setUploading(false);
    }
  }

  function handleClear() {
    setPreview('');
    onChange('');
    setError('');
  }

  return (
    <div className="space-y-2">
      <label className="block text-xs font-semibold text-stone-700 uppercase tracking-wider">
        {label}
      </label>

      {/* Preview Box */}
      {preview ? (
        <div className="relative aspect-16/9 w-full max-w-md overflow-hidden rounded-xl border border-stone-200 bg-stone-100">
          <img src={preview} alt="Preview foto" className="h-full w-full object-cover" />
          <button
            type="button"
            onClick={handleClear}
            className="absolute top-2 right-2 flex h-7 w-7 items-center justify-center rounded-full bg-slate-900/80 text-white hover:bg-red-600 transition shadow-sm cursor-pointer"
            title="Hapus foto"
          >
            <X className="h-4 w-4" />
          </button>
          <div className="absolute bottom-2 left-2 rounded-md bg-slate-900/80 px-2 py-0.5 text-[10px] font-semibold text-emerald-400">
            Terpasang
          </div>
        </div>
      ) : (
        /* Drag / File dropzone */
        <label className="relative flex flex-col items-center justify-center rounded-xl border-2 border-dashed border-stone-300 bg-stone-50/60 p-6 text-center hover:bg-stone-50 hover:border-emerald-500 transition cursor-pointer">
          <input
            type="file"
            accept="image/*"
            onChange={handleFileSelect}
            disabled={uploading}
            className="hidden"
          />
          {uploading ? (
            <div className="flex flex-col items-center gap-2 text-stone-600">
              <Loader2 className="h-6 w-6 animate-spin text-emerald-600" />
              <span className="text-xs font-medium">Mengompresi ke WebP &amp; Mengunggah...</span>
            </div>
          ) : (
            <div className="flex flex-col items-center gap-1.5 text-stone-600">
              <Upload className="h-6 w-6 text-stone-400" />
              <span className="text-xs font-bold text-stone-800">
                Pilih atau Tarik Foto dari Komputer / HP
              </span>
              <span className="text-[11px] text-stone-500">
                Otomatis dikonversi ke WebP tajam &amp; ringan (Maks. 15MB)
              </span>
            </div>
          )}
        </label>
      )}

      {/* Manual URL input fallback */}
      <div className="flex items-center gap-2 pt-1">
        <input
          type="url"
          value={preview}
          onChange={(e) => {
            setPreview(e.target.value);
            onChange(e.target.value);
          }}
          placeholder="Atau tempel URL gambar manual: https://..."
          className="w-full rounded-lg border border-stone-300 p-2 text-xs text-stone-800 placeholder-stone-400 focus:border-emerald-600 focus:outline-none"
        />
      </div>

      {error && <p className="text-xs text-red-600">{error}</p>}
    </div>
  );
}
