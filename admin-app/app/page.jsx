"use client";

import { useEffect, useState } from 'react';
import Link from 'next/link';
import { collection, getDocs } from 'firebase/firestore';
import { db } from '@/lib/firebase';

export default function AdminDashboard() {
  const [counts, setCounts] = useState({ stays: 0, tours: 0, loading: true });

  useEffect(() => {
    async function fetchCounts() {
      try {
        const [staySnap, tourSnap] = await Promise.all([
          getDocs(collection(db, 'penginapan')),
          getDocs(collection(db, 'tours')),
        ]);
        setCounts({
          stays: staySnap.size,
          tours: tourSnap.size,
          loading: false,
        });
      } catch (err) {
        console.warn('Dashboard Firestore read:', err);
        setCounts({ stays: 0, tours: 0, loading: false });
      }
    }
    fetchCounts();
  }, []);

  return (
    <div className="p-8 max-w-6xl mx-auto">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900">Dashboard Admin</h1>
        <p className="text-sm text-gray-500 mt-1">Ringkasan inventaris etalase Kediengaja</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
        <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-200">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-gray-500 text-sm font-medium">Total Penginapan Terdaftar</h3>
            <span className="text-2xl">🏡</span>
          </div>
          <p className="text-4xl font-bold text-gray-900 mb-4">
            {counts.loading ? '...' : counts.stays}
          </p>
          <div className="flex gap-3">
            <Link
              href="/penginapan"
              className="text-xs text-nature-secondary hover:underline font-semibold"
            >
              Lihat Daftar →
            </Link>
            <span className="text-gray-300">|</span>
            <Link
              href="/penginapan/create"
              className="text-xs text-nature-accent hover:underline font-semibold"
            >
              + Tambah Baru
            </Link>
          </div>
        </div>

        <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-200">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-gray-500 text-sm font-medium">Total Paket Tour &amp; Jeep</h3>
            <span className="text-2xl">🚙</span>
          </div>
          <p className="text-4xl font-bold text-gray-900 mb-4">
            {counts.loading ? '...' : counts.tours}
          </p>
          <div className="flex gap-3">
            <Link
              href="/tours"
              className="text-xs text-nature-secondary hover:underline font-semibold"
            >
              Lihat Daftar →
            </Link>
            <span className="text-gray-300">|</span>
            <Link
              href="/tours/create"
              className="text-xs text-nature-accent hover:underline font-semibold"
            >
              + Tambah Baru
            </Link>
          </div>
        </div>
      </div>

      <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
        <h2 className="text-lg font-bold text-gray-900 mb-2">Panduan Pengelolaan</h2>
        <p className="text-sm text-gray-600 leading-relaxed mb-4">
          Data yang Anda tambahkan atau hapus di dashboard ini akan langsung tersimpan di Cloud Firestore dan tampil di etalase web utama kediengaja.com.
        </p>
        <div className="bg-stone-50 rounded-lg p-4 text-xs text-stone-600 space-y-1.5 border border-stone-200">
          <p><strong>Tips Penginapan:</strong> Masukkan harga normal per malam dan kapasitas maksimal tamu.</p>
          <p><strong>Tips Tour &amp; Jeep:</strong> Sertakan rincian destinasi dan fasilitas apa saja yang sudah termasuk (BBM, tiket wisata, driver).</p>
        </div>
      </div>
    </div>
  );
}
