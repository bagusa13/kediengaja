export default function ListingStatus({ loading, error, empty, loadingLabel, emptyTitle, emptyBody, onRetry }) {
  if (loading) {
    return (
      <div className="flex min-h-[200px] items-center justify-center text-moss">
        <span className="text-sm font-medium">{loadingLabel}</span>
      </div>
    );
  }

  if (error) {
    return (
      <div className="rounded-xl border border-stone-200 bg-white px-6 py-12 text-center">
        <h3 className="font-display text-xl text-ink">Data tidak bisa dimuat</h3>
        <p className="mt-2 text-sm text-stone-600">{error}</p>
        {onRetry ? (
          <button
            type="button"
            onClick={onRetry}
            className="mt-5 min-h-[44px] cursor-pointer rounded-md bg-moss px-5 text-sm font-semibold text-white hover:bg-[#323a30]"
          >
            Coba lagi
          </button>
        ) : null}
      </div>
    );
  }

  if (empty) {
    return (
      <div className="rounded-xl border border-stone-200 bg-white px-6 py-12 text-center">
        <h3 className="font-display text-xl text-ink">{emptyTitle}</h3>
        <p className="mt-2 text-sm text-stone-600">{emptyBody}</p>
      </div>
    );
  }

  return null;
}
