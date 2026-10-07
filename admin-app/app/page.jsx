"use client";

import { useEffect, useState } from 'react';
import Link from 'next/link';
import {
  Home,
  Compass,
  Image as ImageIcon,
  Calendar,
  Plus,
  ArrowRight,
  Sparkles,
  CheckCircle2,
  ExternalLink,
  Layers,
} from 'lucide-react';
import { collection, getDocs, doc, getDoc } from 'firebase/firestore';
import { db } from '@/lib/firebase';

export default function AdminDashboard() {
  const [counts, setCounts] = useState({ stays: 0, tours: 0, polaroids: 10, loading: true });

  useEffect(() => {
    async function fetchCounts() {
      try {
        const [staySnap, tourSnap, gallerySnap] = await Promise.all([
          getDocs(collection(db, 'penginapan')),
          getDocs(collection(db, 'tours')),
          getDoc(doc(db, 'settings', 'gallery')).catch(() => null),
        ]);

        const polaroidCount = gallerySnap?.exists?.() && gallerySnap.data()?.slides?.length
          ? gallerySnap.data().slides.length
          : 10;

        setCounts({
          stays: staySnap.size,
          tours: tourSnap.size,
          polaroids: polaroidCount,
          loading: false,
        });
      } catch (err) {
        console.warn('Dashboard Firestore read fallback:', err);
        setCounts({ stays: 0, tours: 0, polaroids: 10, loading: false });
      }
    }
    fetchCounts();
  }, []);

  return (
    <div className="p-4 sm:p-6 md:p-8 max-w-6xl mx-auto">
      {/* Page Header */}
      <div className="mb-6 sm:mb-8 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <div className="flex items-center gap-2">
            <h1 className="text-2xl sm:text-3xl font-bold tracking-tight text-stone-900 font-display">
              Dashboard Admin
            </h1>
            <span className="inline-flex items-center gap-1 rounded-full bg-emerald-50 border border-emerald-200/80 px-2.5 py-0.5 text-[11px] font-semibold text-emerald-700">
              <span className="h-1.5 w-1.5 rounded-full bg-emerald-500 animate-pulse" />
              Live System
            </span>
          </div>
          <p className="text-xs sm:text-sm text-stone-500 mt-1">
            Ringkasan etalase, inventaris, dan galeri dokumentasi Kediengaja
          </p>
        </div>

        {/* Quick Action Buttons */}
        <div className="flex flex-wrap items-center gap-2">
          <Link
            href="/penginapan/create"
            className="inline-flex items-center gap-1.5 rounded-xl bg-emerald-700 px-3.5 py-2 text-xs font-semibold text-white shadow-xs hover:bg-emerald-800 transition active:scale-95"
          >
            <Plus className="h-3.5 w-3.5" />
            <span>Tambah Penginapan</span>
          </Link>

          <Link
            href="/tours/create"
            className="inline-flex items-center gap-1.5 rounded-xl bg-stone-900 px-3.5 py-2 text-xs font-semibold text-white shadow-xs hover:bg-stone-800 transition active:scale-95"
          >
            <Plus className="h-3.5 w-3.5" />
            <span>Tambah Tour</span>
          </Link>
        </div>
      </div>

      {/* Main Stats Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6 mb-6 sm:mb-8">
        {/* Card 1: Penginapan */}
        <div className="bg-white rounded-2xl p-5 sm:p-6 shadow-xs border border-stone-200/80 flex flex-col justify-between hover:border-emerald-300 transition-colors">
          <div>
            <div className="flex items-center justify-between mb-3">
              <span className="text-xs font-semibold uppercase tracking-wider text-stone-500">
                Penginapan
              </span>
              <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-emerald-50 text-emerald-700 border border-emerald-100">
                <Home className="h-5 w-5" aria-hidden="true" />
              </div>
            </div>
            <p className="text-3xl sm:text-4xl font-extrabold text-stone-900 tracking-tight font-display">
              {counts.loading ? '...' : counts.stays}
            </p>
            <p className="text-xs text-stone-500 mt-1">
              Villa, cabin house, &amp; homestay aktif
            </p>
          </div>

          <div className="mt-5 pt-4 border-t border-stone-100 flex items-center justify-between text-xs">
            <Link
              href="/penginapan"
              className="font-semibold text-emerald-700 hover:text-emerald-800 flex items-center gap-1"
            >
              <span>Lihat Daftar</span>
              <ArrowRight className="h-3 w-3" />
            </Link>
            <Link
              href="/penginapan/create"
              className="font-medium text-stone-500 hover:text-stone-800"
            >
              + Baru
            </Link>
          </div>
        </div>

        {/* Card 2: Tours & Jeep */}
        <div className="bg-white rounded-2xl p-5 sm:p-6 shadow-xs border border-stone-200/80 flex flex-col justify-between hover:border-sky-300 transition-colors">
          <div>
            <div className="flex items-center justify-between mb-3">
              <span className="text-xs font-semibold uppercase tracking-wider text-stone-500">
                Paket Tour &amp; Jeep
              </span>
              <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-sky-50 text-sky-700 border border-sky-100">
                <Compass className="h-5 w-5" aria-hidden="true" />
              </div>
            </div>
            <p className="text-3xl sm:text-4xl font-extrabold text-stone-900 tracking-tight font-display">
              {counts.loading ? '...' : counts.tours}
            </p>
            <p className="text-xs text-stone-500 mt-1">
              Trip sunrise, jeep savana, &amp; paket wisata
            </p>
          </div>

          <div className="mt-5 pt-4 border-t border-stone-100 flex items-center justify-between text-xs">
            <Link
              href="/tours"
              className="font-semibold text-sky-700 hover:text-sky-800 flex items-center gap-1"
            >
              <span>Lihat Daftar</span>
              <ArrowRight className="h-3 w-3" />
            </Link>
            <Link
              href="/tours/create"
              className="font-medium text-stone-500 hover:text-stone-800"
            >
              + Baru
            </Link>
          </div>
        </div>

        {/* Card 3: 10 Foto Polaroid */}
        <div className="bg-white rounded-2xl p-5 sm:p-6 shadow-xs border border-stone-200/80 flex flex-col justify-between sm:col-span-2 lg:col-span-1 hover:border-purple-300 transition-colors">
          <div>
            <div className="flex items-center justify-between mb-3">
              <span className="text-xs font-semibold uppercase tracking-wider text-stone-500">
                Dokumentasi Polaroid
              </span>
              <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-purple-50 text-purple-700 border border-purple-100">
                <ImageIcon className="h-5 w-5" aria-hidden="true" />
              </div>
            </div>
            <p className="text-3xl sm:text-4xl font-extrabold text-stone-900 tracking-tight font-display">
              {counts.polaroids} <span className="text-base font-medium text-stone-500">Foto</span>
            </p>
            <p className="text-xs text-stone-500 mt-1">
              Etalase carousel polaroid di web utama
            </p>
          </div>

          <div className="mt-5 pt-4 border-t border-stone-100 flex items-center justify-between text-xs">
            <Link
              href="/gallery"
              className="font-semibold text-purple-700 hover:text-purple-800 flex items-center gap-1"
            >
              <span>Kelola 10 Foto Polaroid</span>
              <ArrowRight className="h-3 w-3" />
            </Link>
            <span className="text-[11px] font-medium text-emerald-600 bg-emerald-50 px-2 py-0.5 rounded-full">
              Cloudinary Auto-WebP
            </span>
          </div>
        </div>
      </div>

      {/* Quick Navigation Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-6 sm:mb-8">
        <Link
          href="/calendar"
          className="group flex items-center justify-between p-4 rounded-xl bg-white border border-stone-200/80 hover:border-emerald-500 hover:shadow-xs transition"
        >
          <div className="flex items-center gap-3">
            <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-amber-50 text-amber-700 border border-amber-100">
              <Calendar className="h-5 w-5" />
            </div>
            <div>
              <h2 className="text-xs sm:text-sm font-bold text-stone-900">
                Kalender &amp; Ketersediaan Tanggal
              </h2>
              <p className="text-[11px] text-stone-500">
                Kelola tanggal penuh / booked untuk penginapan
              </p>
            </div>
          </div>
          <ArrowRight className="h-4 w-4 text-stone-400 group-hover:text-emerald-600 group-hover:translate-x-0.5 transition" />
        </Link>

        <a
          href="/"
          target="_blank"
          rel="noopener noreferrer"
          className="group flex items-center justify-between p-4 rounded-xl bg-white border border-stone-200/80 hover:border-emerald-500 hover:shadow-xs transition"
        >
          <div className="flex items-center gap-3">
            <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-stone-100 text-stone-700 border border-stone-200">
              <ExternalLink className="h-5 w-5" />
            </div>
            <div>
              <h2 className="text-xs sm:text-sm font-bold text-stone-900">
                Pratinjau Website Publik
              </h2>
              <p className="text-[11px] text-stone-500">
                Buka etalase kediengaja.com di tab baru
              </p>
            </div>
          </div>
          <ArrowRight className="h-4 w-4 text-stone-400 group-hover:text-emerald-600 group-hover:translate-x-0.5 transition" />
        </a>
      </div>

      {/* Guide Section */}
      <div className="bg-white rounded-2xl shadow-xs border border-stone-200/80 p-5 sm:p-6">
        <div className="flex items-center gap-2 mb-2">
          <Sparkles className="h-4 w-4 text-amber-500" />
          <h2 className="text-sm sm:text-base font-bold text-stone-900">
            Panduan Pengelolaan Cepat
          </h2>
        </div>
        <p className="text-xs sm:text-sm text-stone-600 leading-relaxed mb-4">
          Perubahan yang Anda simpan akan langsung tersinkronisasi ke Cloud Firestore dan tampil otomatis di website utama para tamu.
        </p>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
          <div className="rounded-xl border border-stone-100 bg-stone-50/70 p-3.5">
            <div className="flex items-center gap-2 font-semibold text-xs text-stone-800 mb-1">
              <CheckCircle2 className="h-3.5 w-3.5 text-emerald-600" />
              <span>Kelola Penginapan &amp; Jeep</span>
            </div>
            <p className="text-[11px] text-stone-500 leading-relaxed">
              Unggah foto resolusi tinggi, tentukan kapasitas maksimal tamu, dan tulis fasilitas utama (air hangat, sarapan, view Sindoro).
            </p>
          </div>

          <div className="rounded-xl border border-stone-100 bg-stone-50/70 p-3.5">
            <div className="flex items-center gap-2 font-semibold text-xs text-stone-800 mb-1">
              <CheckCircle2 className="h-3.5 w-3.5 text-purple-600" />
              <span>Ganti 10 Foto Polaroid</span>
            </div>
            <p className="text-[11px] text-stone-500 leading-relaxed">
              Di menu <strong>10 Foto Polaroid</strong>, Anda bisa mengganti foto tamu atau suasana kapan saja. Sistem otomatis mengompresi gambar ke WebP super cepat via Cloudinary.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
