import Link from 'next/link';
import { Clock, MapPin, ArrowRight, MessageCircle } from 'lucide-react';
import { formatRupiah, tourCover } from '@/lib/covers';
import { priceSuffix } from '@/lib/listings';
import { waLink } from '@/lib/site';

export default function TourCard(item) {
  const { id, nama, lokasi, harga, tipe, durasi, deskripsi, destinasi = [] } = item;

  const bookingHref = waLink(
    `Halo Admin Kediengaja,\nSaya ingin booking paket trip di Dieng:\n\nPaket: ${nama}\nHarga: ${formatRupiah(harga)} ${priceSuffix('tour', tipe)}\n\nMohon informasi jadwal ketersediaannya. Terima kasih.`
  );

  return (
    <article className="group flex h-full flex-col overflow-hidden rounded-xl border border-stone-200/90 bg-white transition hover:border-forest/40 hover:shadow-xs">
      <Link href={`/tours/${id}`} className="relative aspect-16/10 w-full overflow-hidden bg-slate-900 block">
        <img
          src={tourCover(item)}
          alt={nama}
          className="h-full w-full object-cover transition duration-300 group-hover:scale-105"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-slate-950/60 via-transparent to-transparent pointer-events-none" />
        <span className="absolute left-3 top-3 rounded-md bg-stone-900/85 px-2.5 py-1 text-[11px] font-semibold text-white backdrop-blur-xs">
          {tipe || 'Paket Wisata'}
        </span>
      </Link>

      <div className="flex flex-1 flex-col p-5">
        <h3 className="font-display text-lg font-bold text-ink">
          <Link href={`/tours/${id}`} className="hover:text-forest transition-colors">
            {nama}
          </Link>
        </h3>

        <div className="mt-2.5 flex flex-wrap items-center gap-3 text-xs text-stone-500">
          <span className="flex items-center gap-1.5 truncate">
            <MapPin className="h-3.5 w-3.5 text-forest shrink-0" aria-hidden="true" />
            <span className="truncate">{lokasi || 'Kawasan Wisata Dieng'}</span>
          </span>
          {durasi ? (
            <span className="flex items-center gap-1.5 shrink-0">
              <Clock className="h-3.5 w-3.5 text-stone-400 shrink-0" aria-hidden="true" />
              <span>{durasi}</span>
            </span>
          ) : null}
        </div>

        {deskripsi ? (
          <p className="mt-2.5 line-clamp-2 text-xs leading-relaxed text-stone-600 flex-1">
            {deskripsi}
          </p>
        ) : null}

        {destinasi.length > 0 ? (
          <div className="mt-3 flex flex-wrap gap-1.5">
            {destinasi.slice(0, 3).map((dest) => (
              <span
                key={dest}
                className="rounded-md border border-stone-200/80 bg-stone-100/70 px-2 py-0.5 text-[10px] font-medium text-stone-700"
              >
                {dest}
              </span>
            ))}
            {destinasi.length > 3 ? (
              <span className="self-center text-[10px] text-stone-500 font-medium">
                +{destinasi.length - 3} lagi
              </span>
            ) : null}
          </div>
        ) : null}

        <div className="mt-auto flex flex-col xs:flex-row xs:items-end justify-between gap-3 border-t border-stone-100 pt-4">
          <div>
            <p className="text-[10px] text-stone-500 uppercase tracking-wider">Tarif Mulai</p>
            <p className="font-display text-lg font-bold text-forest">
              {formatRupiah(harga)}
              <span className="text-xs font-normal text-stone-500">{priceSuffix('tour', tipe)}</span>
            </p>
          </div>

          <div className="grid grid-cols-2 gap-2 w-full xs:w-auto xs:flex xs:items-center">
            <Link
              href={`/tours/${id}`}
              className="inline-flex min-h-[40px] items-center justify-center rounded-xl border border-stone-200 bg-stone-50 px-3 text-xs font-semibold text-stone-700 active:bg-stone-100 transition"
            >
              Detail
            </Link>
            <a
              href={bookingHref}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex min-h-[40px] items-center justify-center gap-1.5 rounded-xl bg-forest px-3.5 text-xs font-semibold text-white shadow-xs active:bg-forest-light transition"
            >
              <MessageCircle className="h-3.5 w-3.5" />
              <span>Pesan</span>
            </a>
          </div>
        </div>
      </div>
    </article>
  );
}