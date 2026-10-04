---
name: seo-schema-opengraph
description: >-
  Comprehensive guide and templates for SEO, OpenGraph social sharing preview cards,
  and Schema.org JSON-LD structured data. Use when optimizing web pages for search engines
  (Google, Bing), rich search snippets (ratings, prices, FAQs), WhatsApp/social link preview cards,
  and local business SEO.
---

# SEO, OpenGraph & Structured Data (JSON-LD) Skill

This skill provides production-grade templates and standards for ensuring websites achieve top search engine visibility, captivating social media preview cards on WhatsApp/Facebook/X, and rich snippets on Google Search.

---

## 1. Core Meta Tags & OpenGraph Standard

Every production webpage must include the following tags in the `<head>`:

```html
<!-- Primary Meta Tags -->
<title>Paket Wisata Dieng Murah & Terpercaya - KeDiengAja.com</title>
<meta name="title" content="Paket Wisata Dieng Murah & Terpercaya - KeDiengAja.com">
<meta name="description" content="Jelajahi keindahan Sunrise Sikunir, Kawah Sikidang, Telaga Warna & Gunung Prau bersama KeDiengAja. Paket trip lengkap, sewa jeep, dan homestay nyaman.">
<meta name="keywords" content="wisata dieng, paket trip dieng, sunrise sikunir, sewa jeep dieng, open trip prau, homestay dieng">
<meta name="robots" content="index, follow">
<meta name="viewport" content="width=device-width, initial-scale=1.0">
<link rel="canonical" href="https://kediengaja.com/">

<!-- Open Graph / Facebook / WhatsApp Preview -->
<meta property="og:type" content="website">
<meta property="og:url" content="https://kediengaja.com/">
<meta property="og:title" content="KeDiengAja - Liburan Seru & Praktis ke Negeri di Atas Awan">
<meta property="og:description" content="Paket wisata Dieng all-in mulai Rp 350rb-an. Termasuk transportasi Jeep, tiket masuk objek wisata, dan pemandu lokal berlisensi.">
<meta property="og:image" content="https://kediengaja.com/images/og-sikunir-sunrise.jpg">
<meta property="og:image:width" content="1200">
<meta property="og:image:height" content="630">
<meta property="og:image:alt" content="Pemandangan Golden Sunrise Sikunir Dieng">
<meta property="og:locale" content="id_ID">

<!-- Twitter Card -->
<meta name="twitter:card" content="summary_large_image">
<meta name="twitter:url" content="https://kediengaja.com/">
<meta name="twitter:title" content="KeDiengAja - Paket Wisata Dieng All-Inclusive">
<meta name="twitter:description" content="Pesan paket trip Dieng mudah via WhatsApp. Sunrise Sikunir, Kawah Sikidang, dan Telaga Warna.">
<meta name="twitter:image" content="https://kediengaja.com/images/og-sikunir-sunrise.jpg">

<!-- Local Business Geo Tags -->
<meta name="geo.region" content="ID-JT">
<meta name="geo.placename" content="Wonosobo, Jawa Tengah">
<meta name="geo.position" content="-7.2084;109.9078">
<meta name="ICBM" content="-7.2084, 109.9078">
```

---

## 2. Schema.org (JSON-LD) Structured Data

Use JSON-LD to unlock rich badges on Google (Star reviews, price ranges, FAQ dropdowns in search results).

### A. TravelAgency & LocalBusiness Schema
```html
<script type="application/ld+json">
{
  "@context": "https://schema.org",
  "@type": "TravelAgency",
  "name": "KeDiengAja Tour & Travel",
  "image": "https://kediengaja.com/images/logo.png",
  "url": "https://kediengaja.com",
  "telephone": "+6281234567890",
  "priceRange": "Rp 250.000 - Rp 1.500.000",
  "address": {
    "@type": "PostalAddress",
    "streetAddress": "Jl. Dieng Km. 0, Dieng Kulon",
    "addressLocality": "Wonosobo / Banjarnegara",
    "addressRegion": "Jawa Tengah",
    "postalCode": "56351",
    "addressCountry": "ID"
  },
  "geo": {
    "@type": "GeoCoordinates",
    "latitude": -7.2084,
    "longitude": 109.9078
  },
  "openingHoursSpecification": {
    "@type": "OpeningHoursSpecification",
    "dayOfWeek": [
      "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday"
    ],
    "opens": "06:00",
    "closes": "22:00"
  },
  "aggregateRating": {
    "@type": "AggregateRating",
    "ratingValue": "4.9",
    "reviewCount": "184"
  }
}
</script>
```

### B. FAQ Schema (Appears Directly in Google Search Results)
```html
<script type="application/ld+json">
{
  "@context": "https://schema.org",
  "@type": "FAQPage",
  "mainEntity": [
    {
      "@type": "Question",
      "name": "Kapan waktu terbaik untuk melihat Golden Sunrise Sikunir?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Waktu terbaik berkunjung adalah saat musim kemarau antara bulan Mei hingga September, di mana langit cenderung cerah dan pemandangan sunrise terlihat sempurna tanpa kabut tebal."
      }
    },
    {
      "@type": "Question",
      "name": "Apakah paket tour KeDiengAja sudah termasuk tiket wisata dan jeep?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Ya, semua paket all-inclusive sudah mencakup transportasi armada Jeep lokal berlisensi, tiket masuk seluruh objek wisata (Sikunir, Kawah Sikidang, Telaga Warna, Batu Ratapan Angin), driver profesional, dan parkir."
      }
    }
  ]
}
</script>
```

---

## 3. SEO Checklist Before Publishing

- [ ] **Single H1 Tag**: Exactly one clear `<h1>` per page containing primary keywords.
- [ ] **Logical Heading Hierarchy**: `h1` -> `h2` -> `h3`, never skipping levels.
- [ ] **Descriptive Image Alt Text**: All `<img>` tags have contextual alt text (e.g. `alt="Jeep wisata melintasi Kawah Sikidang Dieng"` instead of `alt="foto1"`).
- [ ] **Fast Mobile Loading**: Images use `loading="lazy"` and modern web formats (WebP/AVIF).
- [ ] **Valid OG Image**: Ratio 1.91:1 (1200x630 px) with under 300KB file size so WhatsApp loads preview instantly.
