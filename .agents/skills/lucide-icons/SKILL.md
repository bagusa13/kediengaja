---
name: lucide-icons
description: >-
  Implementation guide and reference catalog for Lucide Icons (https://github.com/lucide-icons/lucide).
  Use this skill whenever designing or implementing icons in web applications across Vanilla HTML,
  React, Next.js, Vue, Tailwind CSS, or inline SVGs. Prevents using low-quality emojis and guarantees
  accessible, crisp vector iconography.
---

# Lucide Icons Skill & Integration Guide

[Lucide](https://lucide.dev) is an open-source, beautifully balanced icon set for web development. It provides clean, scalable vector icons that adapt seamlessly to Tailwind CSS and modern web design systems.

---

## 1. Quick Integration by Framework

### A. Vanilla HTML + Tailwind CSS (via CDN)
The fastest way for static landing pages without build tools:

```html
<!-- 1. Include Lucide CDN in <head> or before </body> -->
<script src="https://unpkg.com/lucide@latest"></script>

<!-- 2. Use data-lucide attribute in HTML -->
<button class="inline-flex items-center gap-2 px-4 py-2 bg-sky-600 text-white font-medium rounded-lg hover:bg-sky-700 transition">
  <i data-lucide="compass" class="w-5 h-5"></i>
  <span>Jelajahi Paket</span>
</button>

<!-- 3. Initialize icons at the end of <body> -->
<script>
  lucide.createIcons();
</script>
```

### B. Inline SVG (Zero Dependencies & Fastest Performance)
Ideal for single-file web templates or when JavaScript is disabled:
```html
<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="w-5 h-5 text-sky-500" aria-hidden="true">
  <!-- path data from Lucide icon -->
</svg>
```

### C. React / Next.js
```bash
npm install lucide-react
```
```tsx
import { MapPin, Compass, Calendar, Star, ChevronRight } from 'lucide-react';

export function TravelCard({ title, location, rating }) {
  return (
    <div className="rounded-xl border border-slate-200 p-5 bg-white shadow-sm hover:shadow-md transition">
      <div className="flex items-center gap-1.5 text-sky-600 text-sm font-medium mb-2">
        <MapPin className="w-4 h-4" aria-hidden="true" />
        <span>{location}</span>
      </div>
      <h3 className="text-lg font-bold text-slate-900">{title}</h3>
      <div className="flex items-center gap-1 text-amber-500 text-sm mt-3">
        <Star className="w-4 h-4 fill-amber-400 stroke-amber-500" aria-hidden="true" />
        <span className="font-semibold text-slate-800">{rating}</span>
      </div>
    </div>
  );
}
```

### D. Vue 3
```bash
npm install lucide-vue-next
```
```vue
<script setup>
import { Mountain, CheckCircle2 } from 'lucide-vue-next';
</script>

<template>
  <div class="flex items-center gap-2 text-emerald-600">
    <CheckCircle2 :size="20" aria-hidden="true" />
    <span>Tiket Masuk & Asuransi Termasuk</span>
  </div>
</template>
```

---

## 2. Essential Icon Catalog for Travel & Commercial Sites

| Category | Recommended Lucide Icons | Common Use Cases |
| :--- | :--- | :--- |
| **Travel & Outdoor** | `map-pin`, `compass`, `mountain`, `sun`, `sunrise`, `sunset`, `cloud-rain`, `tent`, `camera`, `footprints` | Lokasi wisata, Sunrise Sikunir, Kawah Sikidang, Telaga Warna, Pendakian Prau. |
| **Transport & Logistics** | `car`, `bus`, `navigation`, `map`, `fuel`, `gauge` | Sewa Jeep Dieng, Shuttle bus, petunjuk arah/rute. |
| **Booking & Commerce** | `calendar`, `clock`, `ticket`, `credit-card`, `shield-check`, `badge-check`, `tag`, `wallet` | Jadwal open trip, durasi tur, pembayaran, garansi. |
| **Contact & Chat** | `phone`, `message-circle`, `mail`, `send`, `headphones` | Tombol WhatsApp admin, CS, formulir booking. |
| **Navigation & UI** | `menu`, `x`, `chevron-down`, `chevron-right`, `arrow-right`, `search`, `filter`, `check` | Navbar responsif, dropdown, slider carousel, accordions FAQ. |
| **Social Proof & Stats** | `star`, `heart`, `users`, `award`, `sparkles`, `quote` | Rating bintang, testimoni pengunjung, jumlah wisatawan. |

---

## 3. Best Practices & Quality Standards (Anti-Slop Compliance)

1. **Accessibility First (`aria-hidden`)**:
   - Jika ikon bersifat dekoratif dan sudah memiliki teks penjelasan di sampingnya, selalu tambahkan `aria-hidden="true"`.
   - Jika tombol hanya berisi ikon (icon-only button), berikan `aria-label="Nama Tombol"` pada elemen `<button>`.
2. **Standardized Sizing Scale**:
   - Small (inline badge/meta): `w-4 h-4` (16px)
   - Medium (buttons, list items): `w-5 h-5` (20px)
   - Large (features, hero highlights): `w-6 h-6` (24px)
   - Hero header / card highlight: `w-8 h-8` (32px) or `w-10 h-10` (40px)
3. **Stroke Width Consistency**:
   - Pertahankan default `stroke-width="2"` (atau `stroke-[1.75]` untuk nuansa elegan). Jangan mencampur tebal-tipis ikon secara acak di halaman yang sama.
4. **No Emojis**:
   - Jangan gunakan emoji sistem (seperti 📍, ⛰️, ⭐, 🚗) sebagai ikon navigasi/card karena warnanya tidak konsisten dan tidak mengikuti tema website. Selalu gunakan Lucide SVG.
