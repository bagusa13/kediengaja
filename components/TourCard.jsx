import Link from 'next/link';
import { Clock, MapPin } from 'lucide-react';
import { formatRupiah, tourCover } from '@/lib/covers';

export default function TourCard(item) {
  const { id, nama, lokasi, harga, tipe, durasi, deskripsi, destinasi = [] } = item;

  return (
    <article className="flex h-full flex-col overflow-hidden rounded-lg border border-stone-200 bg-white">
      <Link href={`/tours/${id}`} className="relative block h-52 overflow-hidden sm:h-56">
        <img src={tourCover(item)} alt={nama} className="h-full w-full object-cover" />
        <span className="absolute left-3 top-3 rounded bg-clay px-2.5 py-1 text-xs font-semibold text-white">
          {tipe || 'Private Trip'}
        </span>
      </Link>

      <div className="flex flex-1 flex-col p-5">
        <h3 className="font-display text-xl text-ink">
          <Link href={`/tours/${id}`} className="hover:text-clay">
            {nama}
          </Link>
        </h3>

        <div className="mt-2 flex flex-wrap items-center gap-x-4 gap-y-1 text-sm text-stone-600">
          <span className="flex items-center gap-1">
            <MapPin className="h-4 w-4 shrink-0" aria-hidden="true" />
            {lokasi}
          </span>
          {durasi ? (
            <span className="flex items-center gap-1">
              <Clock className="h-4 w-4 shrink-0" aria-hidden="true" />
              {durasi}
            </span>
          ) : null}
        </div>

        {deskripsi ? <p className="mt-3 line-clamp-2 flex-grow text-sm leading-relaxed text-stone-600">{deskripsi}</p> : null}

        {destinasi.length > 0 ? (
          <div className="mt-3 flex flex-wrap gap-1.5">
            {destinasi.slice(0, 3).map((dest) => (
              <span key={dest} className="rounded border border-stone-200 bg-paper px-2 py-0.5 text-xs text-moss">
                {dest}
              </span>
            ))}
            {destinasi.length > 3 ? <span className="self-center text-xs text-stone-500">+{destinasi.length - 3}</span> : null}
          </div>
        ) : null}

        <div className="mt-auto flex items-end justify-between border-t border-stone-100 pt-4">
          <div>
            <p className="text-xs text-stone-600">Mulai dari</p>
            <p className="text-lg font-bold text-clay">
              {formatRupiah(harga)}
              <span className="text-sm font-normal text-stone-600">/orang</span>
            </p>
          </div>
          <Link
            href={`/tours/${id}`}
            className="inline-flex min-h-[44px] items-center rounded-md bg-moss px-4 text-sm font-medium text-white hover:bg-[#323a30]"
          >
            Cek paket
          </Link>
        </div>
      </div>
    </article>
  );
}
