"use client";

import { useState } from 'react';
import { ChevronDown } from 'lucide-react';

const faqs = [
  {
    q: 'Apakah pembayaran dilakukan langsung di website?',
    a: 'Tidak. Pembayaran dan konfirmasi slot dilakukan secara aman melalui WhatsApp resmi setelah admin memastikan ketersediaan kamar atau armada.',
  },
  {
    q: 'Bagaimana cara konfirmasi pemesanan?',
    a: 'Pilih penginapan atau paket yang Anda inginkan di website, lalu klik tombol "Pesan via WA" atau "Chat WhatsApp". Admin kami akan langsung merespons dan memberikan rincian pembayaran serta invoice resmi.',
  },
  {
    q: 'Apakah bisa menyewa Jeep tanpa mengambil paket?',
    a: 'Bisa. Kami melayani sewa Jeep 4x4 lepas paket untuk rute short, medium, maupun sunrise Sikunir. Satu armada Jeep berkapasitas maksimal 4 orang penumpang.',
  },
  {
    q: 'Kapan waktu terbaik untuk berlibur ke Dieng?',
    a: 'Sepanjang tahun Dieng menawarkan pesona tersendiri. Namun untuk golden sunrise terbaik dan peluang melihat embun es (frost), bulan Mei hingga September saat musim kemarau adalah waktu paling disukai wisatawan.',
  },
  {
    q: 'Apakah penginapan memiliki fasilitas air panas?',
    a: 'Ya, seluruh unit kabin dan villa mitra Kediengaja wajib memiliki fasilitas water heater aktif 24 jam untuk kenyamanan mandi di tengah udara dingin Dieng.',
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
    <section className="border-b border-stone-200/80 bg-brand-cream/40 py-16 sm:py-24">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }} />

      <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-2xl mx-auto mb-10">
          <p className="text-xs font-bold tracking-wider uppercase text-brand-green">
            Tanya Jawab
          </p>
          <h2 className="mt-1 font-display text-2xl font-bold tracking-tight text-brand-ink sm:text-3xl">
            Pertanyaan yang Sering Diajukan
          </h2>
          <p className="mt-2 text-xs sm:text-sm text-stone-600 leading-relaxed">
            Informasi penting seputar pemesanan, ketersediaan air panas, cuaca, dan armada jeep.
          </p>
        </div>

        {/* Compact FAQ Accordion */}
        <div className="space-y-3">
          {faqs.map((item, idx) => {
            const isOpen = openIdx === idx;
            return (
              <div
                key={item.q}
                className="rounded-xl border border-stone-200/90 bg-white overflow-hidden transition-all duration-150"
              >
                <button
                  type="button"
                  onClick={() => setOpenIdx(isOpen ? -1 : idx)}
                  className="flex w-full items-center justify-between p-4 sm:p-5 text-left transition-colors hover:bg-stone-50"
                  aria-expanded={isOpen}
                >
                  <span className="font-display text-sm sm:text-base font-bold text-brand-ink pr-4">
                    {item.q}
                  </span>
                  <ChevronDown
                    className={`h-4 w-4 shrink-0 text-stone-500 transition-transform duration-200 ${
                      isOpen ? 'rotate-180 text-brand-dark' : ''
                    }`}
                    aria-hidden="true"
                  />
                </button>

                {isOpen && (
                  <div className="border-t border-stone-100 px-4 sm:px-5 pb-4 pt-3 text-xs sm:text-sm leading-relaxed text-stone-600 bg-brand-cream/20">
                    {item.a}
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