"use client";

import { useState } from 'react';
import { ChevronDown, HelpCircle } from 'lucide-react';

const faqs = [
  {
    q: "Apakah seluruh penginapan di Kediengaja memiliki fasilitas air panas (water heater)?",
    a: "Ya, pasti. Suhu udara di dataran tinggi Dieng berkisar antara 5°C hingga 15°C pada malam dan pagi hari. Seluruh cabin house, villa, dan homestay yang terdaftar di Kediengaja wajib dilengkapi fasilitas water heater aktif 24 jam dan selimut tebal untuk kenyamanan istirahat Anda."
  },
  {
    q: "Bagaimana alur booking dan sistem pembayarannya?",
    a: "Tanpa perlu registrasi akun atau pembayaran otomatis di web. Anda cukup memilih penginapan atau paket trip, lalu kirim tanggal dan jumlah orang melalui form WhatsApp. Admin kami akan langsung memeriksa slot. Setelah slot dikonfirmasi, Anda cukup membayar uang muka (DP) via transfer bank resmi, dan pelunasan dilakukan saat tiba di Dieng."
  },
  {
    q: "Apakah bisa request antar-jemput dari Stasiun Purwokerto atau Terminal Wonosobo?",
    a: "Bisa sekali. Kediengaja menyediakan layanan shuttle privat dan rental mobil dengan driver lokal yang siap menjemput Anda di Stasiun Purwokerto, Stasiun Kutoarjo, Bandara YIA Yogyakarta, maupun Terminal Mendolo Wonosobo langsung menuju penginapan Dieng."
  },
  {
    q: "Pukul berapa keberangkatan untuk paket Golden Sunrise Sikunir?",
    a: "Penjemputan dimulai sekitar pukul 03.00 - 03.30 dini hari dari penginapan Anda. Perjalanan ke desa Sembungan memakan waktu 15 menit, dilanjutkan trekking santai menaiki tangga Bukit Sikunir sekitar 20–30 menit sebelum matahari terbit pada pukul 05.15 WIB."
  },
  {
    q: "Apakah Fun Jeep Wisata aman untuk anak-anak dan lansia?",
    a: "Sangat aman. Armada Jeep 4x4 kami dirawat berkala dan dikemudikan oleh driver lokal berpengalaman. Tingkat kecepatan dan jalur offroad (kawah, telaga, savana) dapat disesuaikan dengan kebutuhan kenyamanan keluarga, balita, maupun orang tua."
  }
];

export default function FAQSection() {
  const [openIdx, setOpenIdx] = useState(0);

  const faqSchema = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    "mainEntity": faqs.map(item => ({
      "@type": "Question",
      "name": item.q,
      "acceptedAnswer": {
        "@type": "Answer",
        "text": item.a
      }
    }))
  };

  return (
    <section className="border-t border-stone-200 bg-paper py-16 sm:py-24">
      {/* Schema.org FAQPage for Google Rich Snippets */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
      />

      <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <div className="inline-flex items-center gap-1.5 text-xs font-semibold uppercase tracking-wider text-clay mb-2">
            <HelpCircle className="h-4 w-4" />
            <span>Paling Sering Ditanyakan</span>
          </div>
          <h2 className="font-display text-3xl text-ink sm:text-4xl">Pertanyaan Seputar Liburan di Dieng</h2>
          <p className="mt-3 text-stone-600 text-sm sm:text-base max-w-xl mx-auto">
            Informasi praktis seputar suhu, ketersediaan air panas, sistem pembayaran, dan penjemputan stasiun.
          </p>
        </div>

        <div className="space-y-3">
          {faqs.map((faq, idx) => {
            const isOpen = openIdx === idx;
            return (
              <div
                key={idx}
                className="overflow-hidden rounded-xl border border-stone-200 bg-white transition shadow-sm"
              >
                <button
                  type="button"
                  onClick={() => setOpenIdx(isOpen ? -1 : idx)}
                  className="flex w-full items-center justify-between p-5 text-left font-display font-medium text-ink hover:text-clay transition-colors"
                  aria-expanded={isOpen}
                >
                  <span className="text-base sm:text-lg pr-4">{faq.q}</span>
                  <ChevronDown
                    className={`h-5 w-5 text-stone-400 transition-transform duration-200 flex-shrink-0 ${
                      isOpen ? 'rotate-180 text-clay' : ''
                    }`}
                  />
                </button>
                {isOpen && (
                  <div className="border-t border-stone-100 px-5 pb-5 pt-3 text-sm sm:text-base leading-relaxed text-stone-600">
                    {faq.a}
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
