---
name: whatsapp-booking-engine
description: >-
  Interactive WhatsApp booking engine, conversion-optimized forms, and URL message composer.
  Use when building lead generation, booking flows, tour reservations, e-commerce checkout via WhatsApp,
  or floating chat widgets for Indonesian and Southeast Asian consumer markets.
---

# WhatsApp Booking Engine & Conversion Skill

In Southeast Asia and Indonesia specifically, over 90% of travel and service bookings are finalized through direct WhatsApp communication. This skill provides UI patterns, form validation, and dynamic message composers to convert landing page visitors into confirmed orders.

---

## 1. High-Converting Booking Form Architecture

### HTML & Tailwind Form Template

```html
<!-- Interactive Booking Card -->
<div class="bg-white rounded-2xl p-6 sm:p-8 shadow-xl border border-slate-100 max-w-lg mx-auto">
  <div class="mb-6">
    <span class="inline-block px-3 py-1 bg-emerald-100 text-emerald-800 text-xs font-semibold rounded-full uppercase tracking-wider mb-2">
      ⚡ Konfirmasi Instan
    </span>
    <h3 class="text-2xl font-bold text-slate-900">Reservasi Trip Dieng</h3>
    <p class="text-slate-600 text-sm mt-1">Pilih paket & tanggal, admin kami langsung merespon dalam 5 menit.</p>
  </div>

  <form id="bookingForm" class="space-y-4">
    <!-- Pilihan Paket -->
    <div>
      <label for="tripPackage" class="block text-sm font-medium text-slate-700 mb-1">Pilih Paket Wisata</label>
      <select id="tripPackage" required class="w-full px-4 py-2.5 rounded-lg border border-slate-300 focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 outline-none text-slate-800 text-sm">
        <option value="" disabled selected>Pilih salah satu paket...</option>
        <option value="Paket One Day Trip (Sunrise Sikunir & Sikidang)">One Day Trip (Sunrise Sikunir & Kawah Sikidang) - Rp 350.000/orang</option>
        <option value="Paket 2D1N Jelajah Lengkap Dieng">2D1N Jelajah Lengkap Dieng (Homestay + Jeep) - Rp 750.000/orang</option>
        <option value="Paket Private Camping Gunung Prau 2D1N">Private Camping Gunung Prau 2D1N (All In) - Rp 650.000/orang</option>
        <option value="Sewa Jeep Wisata Dieng Saja">Sewa Jeep Wisata Dieng Saja (Max 4 Orang) - Rp 450.000/jeep</option>
      </select>
    </div>

    <!-- Tanggal Keberangkatan -->
    <div>
      <label for="tripDate" class="block text-sm font-medium text-slate-700 mb-1">Rencana Tanggal Trip</label>
      <input type="date" id="tripDate" required class="w-full px-4 py-2.5 rounded-lg border border-slate-300 focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 outline-none text-slate-800 text-sm">
    </div>

    <!-- Jumlah Peserta -->
    <div>
      <label for="paxCount" class="block text-sm font-medium text-slate-700 mb-1">Jumlah Peserta (Orang)</label>
      <input type="number" id="paxCount" min="1" max="50" value="2" required class="w-full px-4 py-2.5 rounded-lg border border-slate-300 focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 outline-none text-slate-800 text-sm">
    </div>

    <!-- Nama Pemesan -->
    <div>
      <label for="customerName" class="block text-sm font-medium text-slate-700 mb-1">Nama Lengkap</label>
      <input type="text" id="customerName" placeholder="Contoh: Budi Santoso" required class="w-full px-4 py-2.5 rounded-lg border border-slate-300 focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 outline-none text-slate-800 text-sm">
    </div>

    <!-- Catatan Tambahan (Opsional) -->
    <div>
      <label for="notes" class="block text-sm font-medium text-slate-700 mb-1">Catatan Tambahan (Opsional)</label>
      <textarea id="notes" rows="2" placeholder="Contoh: Butuh jemput di Stasiun Purwokerto..." class="w-full px-4 py-2 rounded-lg border border-slate-300 focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 outline-none text-slate-800 text-sm"></textarea>
    </div>

    <!-- Submit Button -->
    <button type="submit" class="w-full mt-4 flex items-center justify-center gap-2.5 bg-emerald-600 hover:bg-emerald-700 text-white font-semibold py-3 px-6 rounded-xl shadow-lg shadow-emerald-600/25 transition duration-200 cursor-pointer">
      <i data-lucide="message-circle" class="w-5 h-5" aria-hidden="true"></i>
      <span>Lanjut Booking via WhatsApp</span>
    </button>
  </form>
</div>
```

---

## 2. Dynamic Message Generator Script

```javascript
// Ganti dengan nomor WhatsApp Admin bisnis Anda (format internasional tanpa '+' atau spasi, contoh: 6281234567890)
const WA_PHONE_NUMBER = "6281234567890";

document.getElementById('bookingForm')?.addEventListener('submit', function(e) {
  e.preventDefault();

  const pkg = document.getElementById('tripPackage').value;
  const date = document.getElementById('tripDate').value;
  const pax = document.getElementById('paxCount').value;
  const name = document.getElementById('customerName').value;
  const notes = document.getElementById('notes').value.trim();

  // Format pesan WhatsApp terstruktur dan profesional
  let message = `*HALO ADMIN KEDIENGAJA.COM!* 👋\n`;
  message += `Saya tertarik untuk melakukan pemesanan trip dengan detail berikut:\n\n`;
  message += `👤 *Nama:* ${name}\n`;
  message += `📦 *Paket:* ${pkg}\n`;
  message += `📅 *Tanggal Trip:* ${date}\n`;
  message += `👥 *Jumlah Peserta:* ${pax} Orang\n`;
  
  if (notes) {
    message += `📝 *Catatan Khusus:* ${notes}\n`;
  }
  
  message += `\nMohon konfirmasi ketersediaan slot dan rincian pembayarannya ya. Terima kasih!`;

  // Encode URI dan arahkan ke WhatsApp
  const waUrl = `https://wa.me/${WA_PHONE_NUMBER}?text=${encodeURIComponent(message)}`;
  window.open(waUrl, '_blank');
});
```

---

## 3. Floating WhatsApp CTA Widget

Tambahkan tombol mengambang (*floating button*) di pojok kanan bawah yang selalu terlihat di mobile & desktop:

```html
<a href="https://wa.me/6281234567890?text=Halo%20Admin%20KeDiengAja%2C%20saya%20ingin%20tanya%20seputar%20paket%20wisata%20Dieng" 
   target="_blank" 
   rel="noopener noreferrer"
   class="fixed bottom-6 right-6 z-50 flex items-center gap-2.5 bg-emerald-600 text-white px-4 py-3 rounded-full shadow-2xl hover:bg-emerald-700 hover:scale-105 transition duration-300 focus:outline-none focus:ring-4 focus:ring-emerald-400/50"
   aria-label="Hubungi Admin WhatsApp">
  <span class="relative flex h-3 w-3">
    <span class="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-300 opacity-75"></span>
    <span class="relative inline-flex rounded-full h-3 w-3 bg-white"></span>
  </span>
  <i data-lucide="message-circle" class="w-5 h-5" aria-hidden="true"></i>
  <span class="font-medium text-sm hidden sm:inline">Chat Admin (Fast Response)</span>
</a>
```

---

## 4. Anti-Slop & Quality Checks
- [ ] **Valid E.164 Phone Format**: Nomor WA diawali dengan kode negara (misal: `628...`, bukan `08...`).
- [ ] **EncodeURIComponent**: Karakter khusus, spasi, dan newline (`\n`) ter-encode dengan benar tanpa error URL.
- [ ] **Mobile Touch-Friendly**: Input dan tombol formulir memiliki tinggi minimal 44px (`py-2.5` atau `py-3`) untuk kenyamanan jari di layar smartphone.
- [ ] **Target Blank & Rel Noopener**: Membuka WhatsApp di tab/aplikasi terpisah tanpa mengganggu sesi penjelajahan website.
