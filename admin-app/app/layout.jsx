import Link from 'next/link';
import './globals.css';

export const metadata = {
  title: 'Admin Dashboard | Kediengaja',
  description: 'Admin dashboard for Kediengaja portal.',
};

export default function RootLayout({ children }) {
  return (
    <html lang="id">
      <body className="bg-gray-50 text-gray-900">
        <div className="flex min-h-screen">
          <aside className="w-64 bg-gray-900 text-white p-6 hidden md:flex flex-col justify-between">
            <div>
              <div className="flex items-center gap-2 mb-8">
                <span className="h-8 w-8 rounded-lg bg-nature-accent flex items-center justify-center font-bold text-white text-sm">
                  Kd
                </span>
                <div>
                  <span className="font-bold text-lg leading-tight block">Kediengaja</span>
                  <span className="text-[11px] text-gray-400">Admin Control Panel</span>
                </div>
              </div>

              <nav className="flex flex-col gap-2">
                <Link
                  href="/"
                  className="px-3 py-2 rounded-md hover:bg-gray-800 transition-colors text-sm font-medium text-gray-300 hover:text-white"
                >
                  📊 Dashboard
                </Link>
                <Link
                  href="/penginapan"
                  className="px-3 py-2 rounded-md hover:bg-gray-800 transition-colors text-sm font-medium text-gray-300 hover:text-white"
                >
                  🏡 Kelola Penginapan
                </Link>
                <Link
                  href="/tours"
                  className="px-3 py-2 rounded-md hover:bg-gray-800 transition-colors text-sm font-medium text-gray-300 hover:text-white"
                >
                  🚙 Kelola Tours &amp; Jeep
                </Link>
              </nav>
            </div>

            <div className="border-t border-gray-800 pt-4">
              <a
                href="http://localhost:3000"
                target="_blank"
                rel="noopener noreferrer"
                className="text-xs text-gray-400 hover:text-white flex items-center gap-1.5 transition-colors"
              >
                ↗ Buka Website Publik
              </a>
            </div>
          </aside>

          <main className="flex-1 bg-gray-50 overflow-y-auto">
            {children}
          </main>
        </div>
      </body>
    </html>
  );
}
