import Link from 'next/link';
import { MapPin, Users } from 'lucide-react';
import { formatRupiah, villaCover } from '@/lib/covers';

export default function VillaCard(item) {
  const { id, nama, lokasi, harga, kapasitas, tipe, deskripsi } = item;

  return (
    <article className="flex h-full flex-col overflow-hidden rounded-lg border border-stone-200 bg-white">
      <Link href={`/penginapan/${id}`} className="relative block h-52 overflow-hidden sm:h-56">
        <img src={villaCover(item)} alt={nama} className="h-full w-full object-cover" />
        <span className="absolute left-3 top-3 rounded bg-white px-2.5 py-1 text-xs font-semibold text-moss">
          {tipe || 'Villa'}
        </span>
      </Link>

      <div className="flex flex-1 flex-col p-5">
        <h3 className="font-display text-xl text-ink">
          <Link href={`/penginapan/${id}`} className="hover:text-clay">
            {nama}
          </Link>
        </h3>

        <div className="mt-2 flex items-center text-sm text-stone-600">
          <MapPin className="mr-1 h-4 w-4 shrink-0" aria-hidden="true" />
          <span className="truncate">{lokasi}</span>
        </div>

        {deskripsi ? <p className="mt-3 line-clamp-2 flex-grow text-sm leading-relaxed text-stone-600">{deskripsi}</p> : null}

        <div className="mt-4 flex items-center text-xs font-medium text-stone-600">
          <Users className="mr-1 h-4 w-4" aria-hidden="true" />
          {kapasitas} orang
        </div>

        <div className="mt-auto flex items-end justify-between border-t border-stone-100 pt-4">
          <div>
            <p className="text-xs text-stone-600">Mulai dari</p>
            <p className="text-lg font-bold text-clay">
              {formatRupiah(harga)}
              <span className="text-sm font-normal text-stone-600">/malam</span>
            </p>
          </div>
          <Link
            href={`/penginapan/${id}`}
            className="inline-flex min-h-[44px] items-center rounded-md bg-moss px-4 text-sm font-medium text-white hover:bg-[#323a30]"
          >
            Cek kamar
          </Link>
        </div>
      </div>
    </article>
  );
}
