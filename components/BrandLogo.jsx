import Image from 'next/image';

export default function BrandLogo({
  variant = 'light', // 'light' (for dark bg) or 'dark' (for light bg)
  showTagline = false,
  className = '',
}) {
  return (
    <div className={`flex items-center gap-2.5 select-none ${className}`}>
      {/* Brand Mark: Mountain + Sunrise + Road */}
      <div className="relative h-9 w-9 sm:h-10 sm:w-10 shrink-0 overflow-hidden rounded-lg">
        <img
          src="/images/logo/icon-192.webp"
          alt="Ke Dieng Aja Logo"
          className="h-full w-full object-contain"
        />
      </div>

      {/* Brand Text */}
      <div className="flex flex-col justify-center">
        <div className="flex items-baseline">
          <span
            className={`font-display text-lg sm:text-xl font-extrabold tracking-tight leading-none ${
              variant === 'light' ? 'text-white' : 'text-brand-dark'
            }`}
          >
            Ke Dieng
          </span>
          <span className="font-display text-lg sm:text-xl font-extrabold tracking-tight leading-none text-brand-orange ml-1">
            Aja
          </span>
        </div>
        {showTagline ? (
          <span
            className={`text-[9px] sm:text-[10px] font-semibold tracking-wider uppercase mt-0.5 leading-none ${
              variant === 'light' ? 'text-stone-300' : 'text-brand-green'
            }`}
          >
            Jelajahi Dieng, Lebih Dekat
          </span>
        ) : (
          <span
            className={`text-[9px] sm:text-[10px] font-medium tracking-wide mt-0.5 leading-none ${
              variant === 'light' ? 'text-stone-300' : 'text-stone-500'
            }`}
          >
            Wisata Dataran Tinggi Dieng
          </span>
        )}
      </div>
    </div>
  );
}
