import Link from 'next/link';
import FeaturedListings from '@/components/FeaturedListings';
import Testimonials from '@/components/Testimonials';
import FAQSection from '@/components/FAQSection';
import { Home, Mountain, MessageCircle } from 'lucide-react';
import { waLink } from '@/lib/site';

export default function HomePage() {
  const directChat = waLink('Halo Admin Kediengaja, saya ingin konsultasi rencana liburan ke Dieng.');

  return (
    <main>
      {/* Hero Section */}
      <section className="relative isolate overflow-hidden">
        <img
          src="https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?auto=format&fit=crop&w=1920&q=80"
          alt="Lanskap perbukitan kabut Dieng Plateau"
          className="absolute inset-0 h-full w-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-ink/85 via-ink/60 to-ink/30" />
        <div className="relative mx-auto flex min-h-[30rem] max-w-6xl flex-col justify-end px-4 py-16 sm:min-h-[34rem] sm:px-6 lg:px-8 lg:py-24">
          <div className="inline-flex items-center gap-2 text-xs font-semibold uppercase tracking-wider text-stone-200">
            <span>Kediengaja</span>
            <span>•</span>
            <span>Guest House, Trip &amp; Tour</span>
          </div>
          <h1 className="mt-3 max-w-2xl font-display text-4xl leading-tight text-white sm:text-5xl lg:text-6xl">
            Penginapan estetik, fun jeep, dan open trip Dieng
          </h1>
          <p className="mt-4 max-w-xl text-base text-stone-200 sm:text-lg">
            Temukan cabin kayu hangat, homestay ramah keluarga, sensasi offroad jeep wisata, hingga golden sunrise Sikunir. Pilih paketnya di web, konfirmasi slot dan bayar langsung di WhatsApp.
          </p>
          <div className="mt-8 flex flex-wrap gap-3">
            <Link
              href="/penginapan"
              className="inline-flex min-h-[48px] items-center gap-2 rounded-md bg-clay px-5 text-sm font-semibold text-white transition hover:bg-[#823318]"
            >
              <Home className="h-5 w-5" aria-hidden="true" />
              Cari Penginapan
            </Link>
            <Link
              href="/tours"
              className="inline-flex min-h-[48px] items-center gap-2 rounded-md bg-white px-5 text-sm font-semibold text-ink transition hover:bg-stone-100"
            >
              <Mountain className="h-5 w-5" aria-hidden="true" />
              Paket Trip &amp; Jeep
            </Link>
            <a
              href={directChat}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex min-h-[48px] items-center gap-2 rounded-md bg-wa px-5 text-sm font-semibold text-white transition hover:bg-[#0c573d]"
            >
              <MessageCircle className="h-5 w-5" aria-hidden="true" />
              Tanya Admin via WA
            </a>
          </div>
        </div>
      </section>

      {/* 3 Core Pillars: Penginapan, Fun Jeep, Open Trip */}
      <section className="px-4 py-14 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-6xl">
          <div className="mb-8">
            <p className="text-xs font-semibold uppercase tracking-wider text-clay">Pilihan Layanan</p>
            <h2 className="mt-1 font-display text-3xl text-ink sm:text-4xl">Layanan Kediengaja</h2>
          </div>

          <div className="grid gap-6 md:grid-cols-3">
            {/* 1. Penginapan Estetik */}
            <Link
              href="/penginapan"
              className="group relative flex min-h-[260px] flex-col justify-end overflow-hidden rounded-xl border border-stone-200 bg-white p-6 shadow-sm transition hover:shadow-md"
            >
              <img
                src="https://images.unsplash.com/photo-1510797215324-95aa89f43c33?auto=format&fit=crop&w=1000&q=80"
                alt="Cabin kayu dan villa penginapan Dieng"
                className="absolute inset-0 h-full w-full object-cover transition duration-300 group-hover:scale-[1.03]"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-ink/85 via-ink/40 to-transparent" />
              <div className="relative text-white">
                <span className="rounded bg-white/20 px-2 py-0.5 text-xs font-medium uppercase tracking-wide backdrop-blur-sm">
                  Menginap
                </span>
                <h3 className="mt-2 font-display text-2xl">Penginapan Estetik</h3>
                <p className="mt-1 text-sm text-stone-200">
                  Cabin house kayu, villa view pegunungan, dan homestay dekat spot wisata Dieng.
                </p>
              </div>
            </Link>

            {/* 2. Fun Jeep Wisata */}
            <Link
              href="/tours"
              className="group relative flex min-h-[260px] flex-col justify-end overflow-hidden rounded-xl border border-stone-200 bg-white p-6 shadow-sm transition hover:shadow-md"
            >
              <img
                src="https://images.unsplash.com/photo-1533473359331-0135ef1b58bf?auto=format&fit=crop&w=1000&q=80"
                alt="Armada Jeep wisata 4x4 Dieng"
                className="absolute inset-0 h-full w-full object-cover transition duration-300 group-hover:scale-[1.03]"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-ink/85 via-ink/40 to-transparent" />
              <div className="relative text-white">
                <span className="rounded bg-white/20 px-2 py-0.5 text-xs font-medium uppercase tracking-wide backdrop-blur-sm">
                  Petualangan
                </span>
                <h3 className="mt-2 font-display text-2xl">Fun Jeep Wisata</h3>
                <p className="mt-1 text-sm text-stone-200">
                  Keliling kawah, savana Pangonan, dan bukit dengan armada jeep 4x4 lokal terpercaya.
                </p>
              </div>
            </Link>

            {/* 3. Open Trip & Sunrise Sikunir */}
            <Link
              href="/tours"
              className="group relative flex min-h-[260px] flex-col justify-end overflow-hidden rounded-xl border border-stone-200 bg-white p-6 shadow-sm transition hover:shadow-md"
            >
              <img
                src="https://images.unsplash.com/photo-1469474968028-56623f02e42e?auto=format&fit=crop&w=1000&q=80"
                alt="Golden Sunrise Sikunir Dieng"
                className="absolute inset-0 h-full w-full object-cover transition duration-300 group-hover:scale-[1.03]"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-ink/85 via-ink/40 to-transparent" />
              <div className="relative text-white">
                <span className="rounded bg-white/20 px-2 py-0.5 text-xs font-medium uppercase tracking-wide backdrop-blur-sm">
                  Trip Hemat
                </span>
                <h3 className="mt-2 font-display text-2xl">Open Trip &amp; Sunrise</h3>
                <p className="mt-1 text-sm text-stone-200">
                  Golden sunrise Bukit Sikunir, Candi Arjuna, dan Telaga Warna bareng teman baru.
                </p>
              </div>
            </Link>
          </div>
        </div>
      </section>

      {/* Cara Pemesanan */}
      <section className="border-t border-stone-200 bg-stone-50 py-14 sm:py-18">
        <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
          <div className="grid gap-8 lg:grid-cols-12 lg:items-center">
            <div className="lg:col-span-5">
              <span className="text-xs font-semibold uppercase tracking-wider text-moss">Alur Booking</span>
              <h2 className="mt-2 font-display text-3xl text-ink sm:text-4xl">Cara pesan di Kediengaja</h2>
              <p className="mt-4 text-stone-600 leading-relaxed">
                Tanpa login dan tanpa proses checkout rumit. Cukup pilih tanggal dan jumlah orang di form, pesan akan tersusun otomatis untuk chat langsung ke WhatsApp admin.
              </p>
            </div>
            <div className="grid gap-4 sm:grid-cols-3 lg:col-span-7">
              <div className="rounded-lg border border-stone-200 bg-white p-5 shadow-sm">
                <div className="mb-3 flex h-9 w-9 items-center justify-center rounded bg-clay/10 text-clay font-bold text-sm">
                  1
                </div>
                <h3 className="font-semibold text-ink">Pilih di Web</h3>
                <p className="mt-1 text-xs text-stone-600">
                  Cek foto kamar, fasilitas, kapasitas, atau rute jeep dan itinerary trip.
                </p>
              </div>
              <div className="rounded-lg border border-stone-200 bg-white p-5 shadow-sm">
                <div className="mb-3 flex h-9 w-9 items-center justify-center rounded bg-moss/10 text-moss font-bold text-sm">
                  2
                </div>
                <h3 className="font-semibold text-ink">Kirim via WA</h3>
                <p className="mt-1 text-xs text-stone-600">
                  Klik tombol WA di halaman detail untuk mengirim rincian tanggal dan jumlah pax.
                </p>
              </div>
              <div className="rounded-lg border border-stone-200 bg-white p-5 shadow-sm">
                <div className="mb-3 flex h-9 w-9 items-center justify-center rounded bg-wa/10 text-wa font-bold text-sm">
                  3
                </div>
                <h3 className="font-semibold text-ink">Konfirmasi &amp; Bayar</h3>
                <p className="mt-1 text-xs text-stone-600">
                  Admin memverifikasi slot yang tersedia lalu memandu DP/pelunasan secara aman.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Featured dynamic listings from Firestore */}
      <FeaturedListings />

      {/* Cerita Tamu & Ulasan */}
      <Testimonials />

      {/* Pertanyaan Umum Seputar Dieng (FAQ) + Schema.org */}
      <FAQSection />
    </main>
  );
}
