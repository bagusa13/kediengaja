"use client";

import { useState } from 'react';
import { ChevronDown } from 'lucide-react';

const faqs = [
  {
    q: 'Apakah pemesanan dibayar langsung di website?',
    a: 'Tidak. Seluruh konfirmasi dan pembayaran dipandu secara aman melalui WhatsApp resmi setelah admin memastikan kamar atau jadwal benar-benar tersedia. Anda tidak perlu memasukkan kartu kredit di website.',
  },
  {
    q: 'Bagaimana cara memastikan ketersediaan tanggal?',
    a: 'Anda bisa mengecek ketersediaan di kalender jadwal website kami, lalu klik tombol WhatsApp untuk langsung mengunci tanggal dengan admin.',
  },
  {
    q: 'Apa perbedaan sewa Jeep dan Open Trip?',
    a: 'Sewa Jeep dihitung per kendaraan (kapasitas 4 orang) untuk rute jelajah kawah dan savana. Sedangkan Open Trip adalah paket gabungan per orang yang cocok dan hemat untuk solo traveler atau pasangan.',
  },
  {
    q: 'Udara Dieng sangat dingin, bagaimana fasilitas kamar mandinya?',
    a: 'Suhu malam Dieng berkisar 10°C–14°C. Semua unit penginapan dan villa mitra Kediengaja wajib memiliki fasilitas water heater (air panas) aktif 24 jam.',
  },
  {
    q: 'Apakah bisa memesan jemputan dari stasiun atau bandara?',
    a: 'Bisa. Kami melayani transportasi privat penjemputan dari stasiun maupun bandara di area Jogja, Semarang, Solo, dan Purwokerto langsung menuju penginapan Dieng.',
  },
];

export default function FAQSection() {
  const [openIdx, setOpenIdx] = useState(0);

  const faqSchema = {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: faqs.map((item) => ({
      '@type': 'Question',
      name: item.q,
      acceptedAnswer: {
        '@type': 'Answer',
        text: item.a,
      },
    })),
  };

  return (
    <section className="border-t border-stone-200/70 bg-cream/40 py-16 sm:py-24">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }} />

      <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
        <div className="grid gap-12 lg:grid-cols-12">
          {/* Section Heading */}
          <div className="lg:col-span-4">
            <p className="text-xs font-bold tracking-wider uppercase text-forest">
              Tanya Jawab
            </p>
            <h2 className="mt-2 font-display text-2xl font-bold tracking-tight text-ink sm:text-3xl">
              Pertanyaan yang Sering Diajukan
            </h2>
            <p className="mt-2 text-xs sm:text-sm leading-relaxed text-stone-600">
              Informasi praktis seputar pemesanan, kesiapan cuaca dingin, armada Jeep, dan jemputan stasiun.
            </p>
          </div>

          {/* FAQ Accordion */}
          <div className="space-y-3 lg:col-span-8">
            {faqs.map((item, idx) => {
              const isOpen = openIdx === idx;
              return (
                <div
                  key={item.q}
                  className="rounded-xl border border-stone-200/80 bg-white overflow-hidden transition-all duration-150"
                >
                  <button
                    type="button"
                    onClick={() => setOpenIdx(isOpen ? -1 : idx)}
                    className="flex w-full items-center justify-between p-4.5 text-left transition-colors hover:bg-stone-50/50"
                    aria-expanded={isOpen}
                  >
                    <span className="font-display text-sm sm:text-base font-bold text-ink pr-4">
                      {item.q}
                    </span>
                    <ChevronDown
                      className={`h-4 w-4 shrink-0 text-stone-500 transition-transform duration-200 ${
                        isOpen ? 'rotate-180 text-forest' : ''
                      }`}
                      aria-hidden="true"
                    />
                  </button>

                  {isOpen && (
                    <div className="border-t border-stone-100 px-4.5 pb-4 pt-3 text-xs sm:text-sm leading-relaxed text-stone-600 bg-stone-50/30">
                      {item.a}
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}