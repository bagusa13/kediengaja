export default function ListingStatus({ loading, error, empty, emptyTitle, emptyBody, onRetry }) {
  if (loading) {
    return (
      <div className="grid grid-cols-1 gap-8 md:grid-cols-3">
        {[1, 2, 3].map((i) => (
          <div
            key={i}
            className="flex flex-col overflow-hidden rounded-2xl border border-stone-200/80 bg-white p-4 animate-pulse shadow-xs"
          >
            <div className="aspect-16/10 w-full rounded-xl bg-stone-200" />
            <div className="mt-4 space-y-2.5">
              <div className="h-4 w-2/3 rounded bg-stone-200" />
              <div className="h-3 w-1/3 rounded bg-stone-100" />
              <div className="h-3 w-full rounded bg-stone-100" />
              <div className="h-3 w-4/5 rounded bg-stone-100" />
            </div>
            <div className="mt-6 flex items-center justify-between border-t border-stone-100 pt-4">
              <div className="h-5 w-24 rounded bg-stone-200" />
              <div className="h-8 w-20 rounded-lg bg-stone-200" />
            </div>
          </div>
        ))}
      </div>
    );
  }

  if (error) {
    return (
      <div className="rounded-2xl border border-red-200 bg-red-50/50 px-6 py-12 text-center">
        <h3 className="font-display text-xl font-bold text-red-950">Gagal Memuat Data</h3>
        <p className="mt-2 text-sm text-red-700 max-w-md mx-auto">{error}</p>
        {onRetry ? (
          <button
            type="button"
            onClick={onRetry}
            className="mt-5 inline-flex min-h-[42px] cursor-pointer items-center justify-center rounded-xl bg-red-700 px-5 text-xs font-bold text-white hover:bg-red-800 transition active:scale-95"
          >
            Coba Muat Ulang
          </button>
        ) : null}
      </div>
    );
  }

  if (empty) {
    return (
      <div className="rounded-2xl border border-stone-200 bg-white px-6 py-12 text-center">
        <h3 className="font-display text-xl font-bold text-ink">{emptyTitle || 'Katalog Belum Tersedia'}</h3>
        <p className="mt-2 text-sm text-stone-600 max-w-md mx-auto">
          {emptyBody || 'Data sedang diperbarui oleh tim pengelola. Silakan hubungi admin kami langsung melalui WhatsApp.'}
        </p>
      </div>
    );
  }

  return null;
}
