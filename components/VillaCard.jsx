import Link from 'next/link';
import { MapPin, Users, Check, Flame, ChevronRight } from 'lucide-react';
import { formatRupiah, villaCover } from '@/lib/covers';

export default function VillaCard(item) {
  const { id, nama, lokasi, harga, kapasitas, tipe, deskripsi, fasilitas } = item;

  // Extract up to 2 key highlights
  const highlights = Array.isArray(fasilitas)
    ? fasilitas.slice(0, 2)
    : ['Water Heater 24 Jam', 'View Pegunungan'];

  return (
    <article className="group flex h-full flex-col overflow-hidden rounded-xl border border-stone-200/80 bg-white transition hover:border-forest/40 hover:shadow-xs">
      {/* Cover Image Container */}
      <Link href={`/penginapan/${id}`} className="relative block h-52 overflow-hidden sm:h-56 bg-stone-900">
        <img
          src={villaCover(item)}
          alt={nama}
          loading="lazy"
          className="h-full w-full object-cover transition duration-300 group-hover:scale-105"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-slate-950/70 via-slate-950/20 to-transparent pointer-events-none" />

        {/* Top Badges */}
        <div className="absolute left-3 top-3 flex items-center gap-1.5">
          <span className="rounded-md bg-white/95 px-2.5 py-1 text-xs font-bold text-forest shadow-xs border border-stone-100">
            {tipe || 'Cabin House'}
          </span>
        </div>

        {/* Warm Heater Feature Badge */}
        <div className="absolute right-3 top-3">
          <span className="inline-flex items-center gap-1 rounded-md bg-slate-950/70 backdrop-blur-xs px-2 py-1 text-[11px] font-medium text-amber-200 border border-white/10">
            <Flame className="w-3 h-3 text-amber-400" aria-hidden="true" />
            Air Panas 24 Jam
          </span>
        </div>

        {/* Capacity Banner over bottom of image */}
        <div className="absolute bottom-2.5 left-3 flex items-center gap-1.5 text-xs text-white/90 drop-shadow-sm font-medium">
          <Users className="h-3.5 w-3.5 text-white/80" aria-hidden="true" />
          <span>Kapasitas {kapasitas || 2} Orang</span>
        </div>
      </Link>

      {/* Card Content */}
      <div className="flex flex-1 flex-col p-5">
        <div className="flex items-start justify-between gap-2">
          <h3 className="font-display text-lg font-bold text-ink">
            <Link href={`/penginapan/${id}`} className="hover:text-forest transition-colors">
              {nama}
            </Link>
          </h3>
        </div>

        <div className="mt-1.5 flex items-center text-xs text-stone-500">
          <MapPin className="mr-1 h-3.5 w-3.5 text-forest shrink-0" aria-hidden="true" />
          <span className="truncate">{lokasi || 'Dataran Tinggi Dieng'}</span>
        </div>

        {deskripsi ? (
          <p className="mt-2.5 line-clamp-2 text-xs leading-relaxed text-stone-600">
            {deskripsi}
          </p>
        ) : null}

        {/* Facility Highlights */}
        {highlights.length > 0 ? (
          <div className="mt-3.5 flex flex-wrap gap-1.5">
            {highlights.map((feat) => (
              <span
                key={feat}
                className="inline-flex items-center gap-1 rounded-md bg-stone-50 border border-stone-200/80 px-2 py-0.5 text-[11px] font-medium text-stone-600"
              >
                <Check className="h-3 w-3 text-emerald-600 shrink-0" aria-hidden="true" />
                <span className="truncate max-w-[140px]">{feat}</span>
              </span>
            ))}
          </div>
        ) : null}

        {/* Bottom Price & Action */}
        <div className="mt-auto flex items-end justify-between gap-3 border-t border-stone-100 pt-4 mt-5">
          <div>
            <p className="text-[11px] font-medium text-stone-500">Mulai dari</p>
            <p className="font-display text-base font-bold text-forest">
              {formatRupiah(harga)}
              <span className="text-xs font-normal text-stone-500">/malam</span>
            </p>
          </div>
          <Link
            href={`/penginapan/${id}`}
            className="inline-flex min-h-[40px] items-center gap-1 rounded-xl bg-forest px-3.5 text-xs font-semibold text-white hover:bg-forest-light active:scale-[0.98] transition-all shadow-xs hover:shadow-sm"
          >
            <span>Cek Kamar</span>
            <ChevronRight className="w-3.5 h-3.5" aria-hidden="true" />
          </Link>
        </div>
      </div>
    </article>
  );
}