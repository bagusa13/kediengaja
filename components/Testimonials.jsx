import { Star } from 'lucide-react';

const reviews = [
  {
    name: "Rizky Pratama & Keluarga",
    origin: "Jakarta",
    rating: 5,
    date: "Trip September 2026",
    text: "Cabin House Sikunir pemandangannya juara banget, kabutnya pas pagi hari indah sekali. Udara dingin 12°C tapi water heaternya panas mantap, anak-anak nyaman banget."
  },
  {
    name: "Nabila & Sahabat",
    origin: "Bandung",
    rating: 5,
    date: "Trip Agustus 2026",
    text: "Driver Jeep Kediengaja ramah banget, diajak keliling savana dan kawah, difotoin bagus-bagus di spot yang jarang orang tahu. Gak nyesel ambil paket trip di sini!"
  },
  {
    name: "Dimas Prasetyo",
    origin: "Semarang",
    rating: 5,
    date: "Trip Juli 2026",
    text: "Booking via WA cepat dan respon admin informatif. Nyampe Dieng langsung dianter ke homestay bersih dekat Candi Arjuna. Next time ke Dieng pasti kontak Kediengaja lagi."
  }
];

export default function Testimonials() {
  return (
    <section className="border-t border-stone-200 bg-white py-16 sm:py-24">
      <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <p className="text-xs font-semibold uppercase tracking-wider text-clay">Pengalaman Nyata</p>
          <h2 className="mt-1 font-display text-3xl text-ink sm:text-4xl">Cerita Tamu Kediengaja</h2>
          <p className="mt-2 text-stone-600 text-sm sm:text-base">
            Ulasan jujur dari tamu yang telah menikmati liburan di Dieng bersama kami.
          </p>
        </div>

        <div className="grid gap-6 md:grid-cols-3">
          {reviews.map((rev, i) => (
            <div
              key={i}
              className="rounded-xl border border-stone-200 bg-paper p-6 shadow-sm flex flex-col justify-between"
            >
              <div>
                <div className="flex items-center gap-1 text-amber-500 mb-3">
                  {[...Array(rev.rating)].map((_, s) => (
                    <Star key={s} className="h-4 w-4 fill-amber-400 text-amber-400" />
                  ))}
                </div>
                <p className="text-sm leading-relaxed text-stone-700 italic">
                  "{rev.text}"
                </p>
              </div>
              <div className="mt-6 pt-4 border-t border-stone-200/60 flex items-center justify-between">
                <div>
                  <h3 className="font-semibold text-xs text-ink">{rev.name}</h3>
                  <p className="text-[11px] text-stone-500">{rev.origin}</p>
                </div>
                <span className="text-[10px] text-stone-400">{rev.date}</span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
