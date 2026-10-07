"use client";

export default function CatalogToolbar({ types, type, onType, sort, onSort, resultCount, hint }) {
  return (
    <div className="mb-8 flex flex-col gap-4 border-b border-stone-200 pb-5 sm:flex-row sm:items-end sm:justify-between">
      <div>
        {hint ? <p className="text-sm text-stone-600">{hint}</p> : null}
        <p className="mt-1 text-sm font-medium text-ink">{resultCount} listing</p>
      </div>
      <div className="grid grid-cols-2 gap-2.5 sm:flex sm:flex-row sm:items-center">
        <label className="text-xs sm:text-sm font-medium text-stone-600 block">
          Tipe
          <select
            value={type}
            onChange={(e) => onType(e.target.value)}
            className="field mt-1 min-h-[42px] text-xs sm:text-sm sm:ml-2 sm:mt-0 sm:w-44"
          >
            <option value="semua">Semua</option>
            {types.map((item) => (
              <option key={item} value={item}>
                {item}
              </option>
            ))}
          </select>
        </label>
        <label className="text-xs sm:text-sm font-medium text-stone-600 block">
          Urutkan
          <select
            value={sort}
            onChange={(e) => onSort(e.target.value)}
            className="field mt-1 min-h-[42px] text-xs sm:text-sm sm:ml-2 sm:mt-0 sm:w-44"
          >
            <option value="baru">Terbaru</option>
            <option value="murah">Harga terendah</option>
            <option value="mahal">Harga tertinggi</option>
          </select>
        </label>
      </div>
    </div>
  );
}