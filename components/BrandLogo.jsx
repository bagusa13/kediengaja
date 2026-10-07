import Image from 'next/image';

export default function BrandLogo({
  variant = 'light', // 'light' (for dark bg) or 'dark' (for light bg)
  showTagline = false,
  className = '',
}) {
  return (
    <div className={`flex items-center gap-2.5 select-none ${className}`}>
      {/* Brand Mark */}
      <div className="relative h-9 w-9 sm:h-10 sm:w-10 shrink-0 overflow-hidden rounded-lg">
        <img
          src="/images/logo/icon-192.webp"
          alt="Kediengaja Logo"
          className="h-full w-full object-contain"
        />
      </div>

      {/* Brand Text */}
      <div className="flex flex-col justify-center">
        <div className="flex items-baseline">
          <span
            className={`font-display text-lg sm:text-xl font-bold tracking-tight leading-none ${
              variant === 'light' ? 'text-white' : 'text-stone-900'
            }`}
          >
            Kediengaja
          </span>
        </div>
        {showTagline ? (
          <span
            className={`text-[9px] sm:text-[10px] font-semibold tracking-wider mt-0.5 leading-none ${
              variant === 'light' ? 'text-stone-300' : 'text-forest'
            }`}
          >
            Ke Dieng aja.
          </span>
        ) : (
          <span
            className={`text-[9px] sm:text-[10px] font-medium tracking-wide mt-0.5 leading-none ${
              variant === 'light' ? 'text-stone-300' : 'text-stone-500'
            }`}
          >
            Wisata &amp; Penginapan Dieng
          </span>
        )}
      </div>
    </div>
  );
}
