import AvailabilityCalendar from '@/components/AvailabilityCalendar';

export const metadata = {
  title: 'Kalender Ketersediaan Penginapan | Kediengaja',
  description: 'Cek jadwal dan tanggal kosong villa, cabin, dan homestay di Dataran Tinggi Dieng hingga 6 bulan ke depan.',
  openGraph: {
    title: 'Kalender Ketersediaan Penginapan Dieng | Kediengaja',
    description: 'Cek tanggal yang masih tersedia sebelum reservasi via WhatsApp resmi.',
  },
};

export default function AvailabilityPage() {
  return (
    <main className="bg-[#F8F7F3] min-h-screen py-12 sm:py-20">
      <div className="mx-auto max-w-5xl px-4 sm:px-6 lg:px-8">
        <div className="mb-10 text-center max-w-2xl mx-auto">
          <span className="inline-block rounded-lg bg-white/80 border border-stone-200 px-3 py-1 text-xs font-semibold tracking-wider uppercase text-forest shadow-xs">
            Jadwal Booking Real-Time
          </span>
          <h1 className="mt-3 font-display text-3xl font-bold tracking-tight text-ink sm:text-4xl">
            Kalender Ketersediaan Penginapan
          </h1>
          <p className="mt-3 text-xs sm:text-sm text-stone-600 leading-relaxed">
            Pilih unit penginapan dan tentukan rentang tanggal menginap Anda. Pemesanan dibuka maksimal untuk 6 bulan ke depan.
          </p>
        </div>

        <AvailabilityCalendar />
      </div>
    </main>
  );
}
