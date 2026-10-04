"use client";

import { useEffect, useState } from 'react';
import Link from 'next/link';
import { collection, getDocs, deleteDoc, doc, orderBy, query } from 'firebase/firestore';
import { db } from '@/lib/firebase';

export default function ToursAdmin() {
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [deletingId, setDeletingId] = useState(null);

  async function loadData() {
    setLoading(true);
    try {
      const q = query(collection(db, 'tours'), orderBy('createdAt', 'desc'));
      const snap = await getDocs(q);
      setItems(snap.docs.map(d => ({ id: d.id, ...d.data() })));
    } catch (err) {
      console.error('Error fetching tours:', err);
      try {
        const snap = await getDocs(collection(db, 'tours'));
        setItems(snap.docs.map(d => ({ id: d.id, ...d.data() })));
      } catch (e) {
        console.error(e);
      }
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    loadData();
  }, []);

  async function handleDelete(id, name) {
    if (!confirm(`Hapus paket tour "${name}"?`)) return;
    setDeletingId(id);
    try {
      await deleteDoc(doc(db, 'tours', id));
      setItems(prev => prev.filter(item => item.id !== id));
    } catch (err) {
      console.error('Error deleting:', err);
      alert('Gagal menghapus data.');
    } finally {
      setDeletingId(null);
    }
  }

  function formatPrice(val) {
    return new Intl.NumberFormat('id-ID', { style: 'currency', currency: 'IDR', minimumFractionDigits: 0 }).format(Number(val) || 0);
  }

  return (
    <div className="p-8">
      <div className="flex justify-between items-center mb-6">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Kelola Paket Wisata &amp; Jeep</h1>
          <p className="text-sm text-gray-500 mt-1">Daftar Fun Jeep, Open Trip, dan Private Trip Kediengaja</p>
        </div>
        <Link href="/tours/create" className="bg-nature-secondary hover:bg-opacity-90 text-white px-4 py-2 rounded-md font-medium transition-colors">
          + Tambah Paket Tour
        </Link>
      </div>

      <div className="bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden">
        <table className="w-full text-left border-collapse">
          <thead>
            <tr className="bg-gray-50 border-b border-gray-200">
              <th className="p-4 font-semibold text-gray-600">Nama Paket</th>
              <th className="p-4 font-semibold text-gray-600">Tipe</th>
              <th className="p-4 font-semibold text-gray-600">Lokasi / Durasi</th>
              <th className="p-4 font-semibold text-gray-600">Harga / Orang</th>
              <th className="p-4 font-semibold text-gray-600 text-right">Aksi</th>
            </tr>
          </thead>
          <tbody>
            {loading ? (
              <tr>
                <td colSpan="5" className="p-8 text-center text-gray-500">
                  Memuat data paket tour...
                </td>
              </tr>
            ) : items.length === 0 ? (
              <tr>
                <td colSpan="5" className="p-8 text-center text-gray-500">
                  Belum ada paket tour. Silakan klik tombol <strong>+ Tambah Paket Tour</strong>.
                </td>
              </tr>
            ) : (
              items.map((item) => (
                <tr key={item.id} className="border-b border-gray-100 hover:bg-gray-50">
                  <td className="p-4 font-medium text-gray-900">{item.nama}</td>
                  <td className="p-4">
                    <span className="inline-block px-2.5 py-0.5 rounded text-xs font-medium bg-amber-50 text-amber-800 border border-amber-200/50">
                      {item.tipe || 'Trip'}
                    </span>
                  </td>
                  <td className="p-4 text-gray-600 text-sm">
                    {item.lokasi || 'Dieng'} {item.durasi ? `(${item.durasi})` : ''}
                  </td>
                  <td className="p-4 text-nature-accent font-semibold text-sm">{formatPrice(item.harga)}</td>
                  <td className="p-4 text-right space-x-3">
                    <Link
                      href={`/tours/edit/${item.id}`}
                      className="text-blue-600 hover:text-blue-800 text-sm font-medium"
                    >
                      Edit
                    </Link>
                    <button
                      onClick={() => handleDelete(item.id, item.nama)}
                      disabled={deletingId === item.id}
                      className="text-red-600 hover:text-red-800 text-sm font-medium disabled:opacity-50"
                    >
                      {deletingId === item.id ? 'Menghapus...' : 'Hapus'}
                    </button>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}
