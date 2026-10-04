import Link from 'next/link';

export default function NotFound() {
  return (
    <main className="mx-auto max-w-lg px-4 py-24 text-center">
      <h1 className="font-display text-4xl text-ink">Halaman tidak ada</h1>
      <p className="mt-3 text-stone-600">Tautan ini tidak mengarah ke penginapan atau paket wisata yang kami kenal.</p>
      <Link
        href="/"
        className="mt-8 inline-flex min-h-[48px] items-center rounded-md bg-clay px-6 text-sm font-semibold text-white hover:bg-[#823318]"
      >
        Kembali ke beranda
      </Link>
    </main>
  );
}
