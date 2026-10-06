import Link from 'next/link';
import { Clock, MapPin } from 'lucide-react';
import { formatRupiah, tourCover } from '@/lib/covers';
import { priceSuffix } from '@/lib/listings';

export default function TourCard(item) {
  const { id, nama, lokasi, harga, tipe, durasi, deskripsi, destinasi = [] } = item;

  return (
    <article className="flex h-full flex-col overflow-hidden rounded-xl border border-stone-200 bg-white transition-all duration-150 hover:-translate-y-0.5 hover:border-moss/40 hover:shadow-lift">
      <Link href={`/tours/${id}`} className="relative block h-52 overflow-hidden sm:h-56 bg-slate-900 group">
        <img src={tourCover(item)} alt={nama} className="h-full w-full object-cover transition duration-300 group-hover:scale-105" />
        <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-black/20 pointer-events-none" />
        <span className="absolute left-3 top-3 rounded-lg bg-slate-900/90 px-2.5 py-1 text-xs font-bold text-white shadow-sm backdrop-blur-sm border border-white/15">
          {tipe || 'Paket wisata'}
        </span>
      </Link>

      <div className="flex flex-1 flex-col p-5">
        <h3 className="font-display text-lg font-bold text-ink">
          <Link href={`/tours/${id}`} className="hover:text-moss transition-colors">
            {nama}
          </Link>
        </h3>

        <div className="mt-2 flex flex-wrap items-center gap-x-4 gap-y-1 text-xs text-stone-500">
          <span className="flex items-center gap-1">
            <MapPin className="h-3.5 w-3.5 text-moss shrink-0" aria-hidden="true" />
            {lokasi}
          </span>
          {durasi ? (
            <span className="flex items-center gap-1">
              <Clock className="h-3.5 w-3.5 text-stone-400 shrink-0" aria-hidden="true" />
              {durasi}
            </span>
          ) : null}
        </div>

        {deskripsi ? <p className="mt-2.5 line-clamp-2 flex-grow text-xs leading-relaxed text-stone-600">{deskripsi}</p> : null}

        {destinasi.length > 0 ? (
          <div className="mt-3 flex flex-wrap gap-1.5">
            {destinasi.slice(0, 3).map((dest) => (
              <span key={dest} className="rounded-full border border-emerald-200 bg-emerald-50 px-2.5 py-0.5 text-[11px] font-semibold text-moss">
                {dest}
              </span>
            ))}
            {destinasi.length > 3 ? <span className="self-center text-xs text-stone-500 font-medium">+{destinasi.length - 3}</span> : null}
          </div>
        ) : null}

        <div className="mt-auto flex items-end justify-between gap-3 border-t border-stone-100 pt-4">
          <div>
            <p className="text-[11px] text-stone-500">Mulai dari</p>
            <p className="text-base font-extrabold text-moss">
              {formatRupiah(harga)}
              <span className="text-xs font-normal text-stone-500">{priceSuffix('tour', tipe)}</span>
            </p>
          </div>
          <Link
            href={`/tours/${id}`}
            className="inline-flex min-h-[40px] items-center rounded-xl bg-moss px-4 text-xs font-bold text-white hover:bg-emerald-700 active:scale-[0.98] transition-all shadow-sm"
          >
            Cek Paket
          </Link>
        </div>
      </div>
    </article>
  );
}