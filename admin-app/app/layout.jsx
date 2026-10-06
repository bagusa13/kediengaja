import './globals.css';
import AdminShell from '@/components/AdminShell';

export const metadata = {
  title: 'Admin Control Panel | Kediengaja',
  description: 'Panel pengelolaan inventaris, kalender, dan dokumentasi Kediengaja Dieng.',
};

export default function RootLayout({ children }) {
  return (
    <html lang="id">
      <body className="bg-stone-50 text-stone-900 antialiased">
        <AdminShell>{children}</AdminShell>
      </body>
    </html>
  );
}
