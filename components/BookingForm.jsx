"use client";

import { useMemo, useState } from 'react';
import { MessageCircle } from 'lucide-react';
import { formatWaDate, waLink } from '@/lib/site';

function tomorrowIso(fromIso) {
  const date = fromIso ? new Date(`${fromIso}T00:00:00`) : new Date();
  date.setDate(date.getDate() + 1);
  return date.toISOString().split('T')[0];
}

export default function BookingForm({
  kind,
  itemName,
  priceLabel,
  defaultPax = 2,
  defaultDate = '',
}) {
  const [error, setError] = useState('');
  const [checkIn, setCheckIn] = useState(defaultDate);
  const today = useMemo(() => new Date().toISOString().split('T')[0], []);
  const minOut = tomorrowIso(checkIn || today);

  function handleSubmit(e) {
    e.preventDefault();
    setError('');
    const form = new FormData(e.target);
    const name = String(form.get('customerName') || '').trim();
    const date = String(form.get('tripDate') || '');
    const checkOut = String(form.get('checkOut') || '');
    const pax = String(form.get('paxCount') || '');
    const notes = String(form.get('notes') || '').trim();

    if (!name || !date || !pax) {
      setError('Isi nama, tanggal, dan jumlah orang dulu.');
      return;
    }

    if (kind === 'stay' && (!checkOut || checkOut <= date)) {
      setError('Tanggal check-out harus setelah check-in.');
      return;
    }

    const label = kind === 'stay' ? 'Penginapan' : 'Paket wisata';
    let message = `Halo Admin Kediengaja,\nSaya ingin cek ketersediaan dan cara bayar untuk:\n\nNama: ${name}\n${label}: ${itemName}`;
    if (kind === 'stay') {
      message += `\nCheck-in: ${formatWaDate(date)}\nCheck-out: ${formatWaDate(checkOut)}`;
    } else {
      message += `\nTanggal: ${formatWaDate(date)}`;
    }
    message += `\nJumlah orang: ${pax}`;
    if (notes) message += `\nCatatan: ${notes}`;
    message += '\n\nMohon konfirmasi slot dan rincian pembayaran via WhatsApp. Terima kasih.';

    window.open(waLink(message), '_blank', 'noopener,noreferrer');
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-4" noValidate>
      <p className="font-display text-xl font-bold text-ink">Cek slot reservasi via WhatsApp</p>
      <p className="text-sm text-stone-600">
        Form ini menyusun pesan ke admin. Harga final, DP, dan pelunasan dikonfirmasi di chat, bukan di situs.
      </p>
      {priceLabel ? <p className="text-sm font-medium text-clay">{priceLabel}</p> : null}

      {error ? (
        <p role="alert" className="rounded-xl border border-red-200 bg-red-50 px-3 py-2 text-sm text-red-800">
          {error}
        </p>
      ) : null}

      <div>
        <label htmlFor="customerName" className="mb-1 block text-sm font-medium text-ink">
          Nama lengkap
        </label>
        <input id="customerName" name="customerName" type="text" required autoComplete="name" className="field" placeholder="Nama pemesan" />
      </div>

      {kind === 'stay' ? (
        <div className="grid grid-cols-2 gap-3">
          <div>
            <label htmlFor="tripDate" className="mb-1 block text-xs sm:text-sm font-medium text-ink">
              Check-in
            </label>
            <input
              id="tripDate"
              name="tripDate"
              type="date"
              min={today}
              required
              className="field text-xs sm:text-sm"
              value={checkIn}
              onChange={(e) => setCheckIn(e.target.value)}
            />
          </div>
          <div>
            <label htmlFor="checkOut" className="mb-1 block text-xs sm:text-sm font-medium text-ink">
              Check-out
            </label>
            <input id="checkOut" name="checkOut" type="date" min={minOut} required className="field text-xs sm:text-sm" />
          </div>
        </div>
      ) : (
        <div>
          <label htmlFor="tripDate" className="mb-1 block text-xs sm:text-sm font-medium text-ink">
            Tanggal trip
          </label>
          <input
            id="tripDate"
            name="tripDate"
            type="date"
            min={today}
            required
            className="field text-xs sm:text-sm"
            value={checkIn}
            onChange={(e) => setCheckIn(e.target.value)}
          />
        </div>
      )}

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
        className="inline-flex min-h-[48px] w-full cursor-pointer items-center justify-center gap-2 rounded-xl bg-forest px-4 py-3 text-sm font-semibold text-white shadow-xs hover:bg-forest-light active:scale-[0.99] transition"
      >
        <MessageCircle className="h-5 w-5" aria-hidden="true" />
        Kirim ke WhatsApp
      </button>
    </form>
  );
}