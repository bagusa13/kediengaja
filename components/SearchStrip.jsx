"use client";

import { useState } from 'react';
import { useRouter } from 'next/navigation';

export default function SearchStrip() {
  const router = useRouter();
  const [kind, setKind] = useState('stay');
  const today = new Date().toISOString().split('T')[0];

  function handleSubmit(e) {
    e.preventDefault();
    const form = new FormData(e.target);
    const params = new URLSearchParams();
    const date = String(form.get('tanggal') || '');
    const pax = String(form.get('pax') || '');
    if (date) params.set('tanggal', date);
    if (pax) params.set('pax', pax);
    const path = kind === 'stay' ? '/penginapan' : '/tours';
    const query = params.toString();
    router.push(query ? `${path}?${query}` : path);
  }

  return (
    <form
      onSubmit={handleSubmit}
      className="w-full rounded-md bg-white p-3 shadow-lift sm:p-4"
    >
      <div className="mb-3 flex gap-2">
        <button
          type="button"
          onClick={() => setKind('stay')}
          aria-pressed={kind === 'stay'}
          className={`min-h-[44px] flex-1 rounded-md px-3 text-sm font-semibold sm:flex-none sm:px-4 ${
            kind === 'stay' ? 'bg-moss text-white' : 'bg-stone-100 text-ink'
          }`}
        >
          Penginapan
        </button>
        <button
          type="button"
          onClick={() => setKind('tour')}
          aria-pressed={kind === 'tour'}
          className={`min-h-[44px] flex-1 rounded-md px-3 text-sm font-semibold sm:flex-none sm:px-4 ${
            kind === 'tour' ? 'bg-moss text-white' : 'bg-stone-100 text-ink'
          }`}
        >
          Paket wisata
        </button>
      </div>

      <div className="grid gap-3 sm:grid-cols-[1fr_8rem_auto]">
        <div>
          <label htmlFor="heroTanggal" className="mb-1 block text-xs font-medium text-stone-600">
            {kind === 'stay' ? 'Tanggal check-in' : 'Tanggal trip'}
          </label>
          <input id="heroTanggal" name="tanggal" type="date" min={today} className="field" />
        </div>
        <div>
          <label htmlFor="heroPax" className="mb-1 block text-xs font-medium text-stone-600">
            Jumlah orang
          </label>
          <input id="heroPax" name="pax" type="number" min="1" max="50" defaultValue="2" className="field" />
        </div>
        <div className="flex items-end">
          <button
            type="submit"
            className="inline-flex min-h-[48px] w-full items-center justify-center rounded-md bg-clay px-5 text-sm font-semibold text-white hover:bg-[#823318] sm:w-auto"
          >
            Lihat ketersediaan
          </button>
        </div>
      </div>
    </form>
  );
}