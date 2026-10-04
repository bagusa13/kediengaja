import Link from 'next/link';
import { SITE } from '@/lib/site';

export default function Footer() {
  return (
    <footer className="mt-auto bg-moss text-stone-200">
      <div className="mx-auto grid max-w-6xl gap-10 px-4 py-12 sm:px-6 md:grid-cols-[1.4fr_1fr_1fr] lg:px-8">
        <div>
          <p className="font-display text-2xl text-white">Kediengaja</p>
          <p className="mt-3 max-w-sm text-sm leading-relaxed text-stone-300">
            Etalase penginapan dan paket wisata Dieng. Pilih di sini, booking dan bayar lewat WhatsApp.
          </p>
        </div>
        <div>
          <h2 className="mb-3 text-sm font-semibold text-white">Katalog</h2>
          <div className="flex flex-col gap-2 text-sm">
            <Link href="/penginapan" className="hover:text-white">Penginapan</Link>
            <Link href="/tours" className="hover:text-white">Paket wisata</Link>
          </div>
        </div>
        <div>
          <h2 className="mb-3 text-sm font-semibold text-white">Kontak</h2>
          <p className="text-sm">WhatsApp: +{SITE.waNumber}</p>
          <p className="text-sm">{SITE.email}</p>
          <p className="mt-2 text-sm">{SITE.location}</p>
        </div>
      </div>
      <div className="border-t border-white/10 py-4 text-center text-xs text-stone-400">
        © {new Date().getFullYear()} Kediengaja
      </div>
    </footer>
  );
}
