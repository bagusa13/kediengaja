"use client";

import { useState } from 'react';
import { MessageCircle } from 'lucide-react';
import { formatWaDate, waLink } from '@/lib/site';

export default function BookingForm({
  kind,
  itemName,
  priceLabel,
  defaultPax = 2,
}) {
  const [error, setError] = useState('');

  function handleSubmit(e) {
    e.preventDefault();
    setError('');
    const form = new FormData(e.target);
    const name = String(form.get('customerName') || '').trim();
    const date = String(form.get('tripDate') || '');
    const pax = String(form.get('paxCount') || '');
    const notes = String(form.get('notes') || '').trim();

    if (!name || !date || !pax) {
      setError('Isi nama, tanggal, dan jumlah orang dulu.');
      return;
    }

    const label = kind === 'stay' ? 'Penginapan' : 'Paket wisata';
    let message = `Halo Admin Kediengaja,\nSaya ingin cek ketersediaan dan cara bayar untuk:\n\nNama: ${name}\n${label}: ${itemName}\nTanggal: ${formatWaDate(date)}\nJumlah orang: ${pax}`;
    if (notes) message += `\nCatatan: ${notes}`;
    message += '\n\nMohon konfirmasi slot dan rincian pembayaran via WhatsApp. Terima kasih.';

    window.open(waLink(message), '_blank', 'noopener,noreferrer');
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-4" noValidate>
      <p className="font-display text-xl text-ink">Pesan via WhatsApp</p>
      <p className="text-sm text-stone-600">
        Isi data singkat. Kami kirim ke chat admin. Harga dan pembayaran dikonfirmasi di WhatsApp, bukan di situs ini.
      </p>
      {priceLabel ? (
        <p className="text-sm font-medium text-clay">{priceLabel}</p>
      ) : null}

      {error ? (
        <p role="alert" className="rounded-md bg-red-50 px-3 py-2 text-sm text-red-800">
          {error}
        </p>
      ) : null}

      <div>
        <label htmlFor="customerName" className="mb-1 block text-sm font-medium text-ink">
          Nama lengkap
        </label>
        <input id="customerName" name="customerName" type="text" required autoComplete="name" className="field" placeholder="Nama pemesan" />
      </div>

      <div>
        <label htmlFor="tripDate" className="mb-1 block text-sm font-medium text-ink">
          {kind === 'stay' ? 'Tanggal menginap' : 'Tanggal trip'}
        </label>
        <input
          id="tripDate"
          name="tripDate"
          type="date"
          min={new Date().toISOString().split('T')[0]}
          required
          className="field"
        />
      </div>

      <div>
        <label htmlFor="paxCount" className="mb-1 block text-sm font-medium text-ink">
          Jumlah orang
        </label>
        <input id="paxCount" name="paxCount" type="number" min="1" max="50" defaultValue={defaultPax} required className="field" />
      </div>

      <div>
        <label htmlFor="notes" className="mb-1 block text-sm font-medium text-ink">
          Catatan (opsional)
        </label>
        <textarea id="notes" name="notes" rows="2" className="field min-h-[72px]" placeholder="Jemput stasiun, minta kamar bawah, alergi, dll." />
      </div>

      <button
        type="submit"
        className="inline-flex min-h-[48px] w-full cursor-pointer items-center justify-center gap-2 rounded-md bg-wa px-4 py-3 text-sm font-semibold text-white transition hover:bg-[#0c573d]"
      >
        <MessageCircle className="h-5 w-5" aria-hidden="true" />
        Kirim ke WhatsApp
      </button>
    </form>
  );
}
