"use client";

import { Suspense, useState } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import { Lock, Mail, AlertCircle, ArrowRight, ShieldCheck } from 'lucide-react';
import { useAuth } from '@/lib/auth';

function LoginForm() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const from = searchParams.get('from') || '/';
  const { login } = useAuth();

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  async function handleSubmit(e) {
    e.preventDefault();
    if (!email || !password) {
      setError('Masukkan email dan kata sandi admin.');
      return;
    }

    setLoading(true);
    setError('');

    try {
      await login(email, password);
      router.push(from);
      router.refresh();
    } catch (err) {
      console.error('Login error:', err);
      const code = err?.code || '';
      if (
        code === 'auth/invalid-credential' ||
        code === 'auth/wrong-password' ||
        code === 'auth/user-not-found'
      ) {
        setError('Email atau kata sandi tidak cocok. Pastikan akun admin terdaftar.');
      } else if (code === 'auth/too-many-requests') {
        setError('Terlalu banyak percobaan gagal. Silakan coba beberapa saat lagi.');
      } else {
        setError(err.message || 'Gagal masuk ke sistem admin.');
      }
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="rounded-2xl border border-stone-800 bg-stone-950/80 p-6 sm:p-8 backdrop-blur-md shadow-xl text-white">
      {error && (
        <div className="mb-5 flex items-start gap-2.5 rounded-xl border border-red-500/20 bg-red-500/10 p-3.5 text-xs text-red-300">
          <AlertCircle className="h-4 w-4 shrink-0 text-red-400 mt-0.5" />
          <span>{error}</span>
        </div>
      )}

      <form onSubmit={handleSubmit} className="space-y-4" noValidate>
        <div>
          <label className="block text-xs font-semibold text-stone-300 uppercase tracking-wider mb-1.5">
            Email Admin
          </label>
          <div className="relative">
            <span className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3.5 text-stone-400">
              <Mail className="h-4 w-4" />
            </span>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="admin@kediengaja.com"
              autoComplete="email"
              required
              className="w-full rounded-xl border border-stone-700 bg-stone-900/90 py-2.5 pl-10 pr-3.5 text-sm text-white placeholder-stone-500 focus:border-emerald-500 focus:outline-none focus:ring-1 focus:ring-emerald-500 transition"
            />
          </div>
        </div>

        <div>
          <label className="block text-xs font-semibold text-stone-300 uppercase tracking-wider mb-1.5">
            Kata Sandi
          </label>
          <div className="relative">
            <span className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3.5 text-stone-400">
              <Lock className="h-4 w-4" />
            </span>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="••••••••••••"
              autoComplete="current-password"
              required
              className="w-full rounded-xl border border-stone-700 bg-stone-900/90 py-2.5 pl-10 pr-3.5 text-sm text-white placeholder-stone-500 focus:border-emerald-500 focus:outline-none focus:ring-1 focus:ring-emerald-500 transition"
            />
          </div>
        </div>

        <button
          type="submit"
          disabled={loading}
          className="mt-6 flex w-full items-center justify-center gap-2 rounded-xl bg-emerald-600 py-3 text-xs sm:text-sm font-bold text-white hover:bg-emerald-500 active:scale-[0.98] transition disabled:opacity-50 shadow-md cursor-pointer"
        >
          {loading ? (
            <span>Memverifikasi akun...</span>
          ) : (
            <>
              <span>Masuk ke Dashboard</span>
              <ArrowRight className="h-4 w-4" />
            </>
          )}
        </button>
      </form>

      <div className="mt-6 border-t border-stone-800 pt-4 flex items-center justify-center gap-2 text-[11px] text-stone-400">
        <ShieldCheck className="h-3.5 w-3.5 text-emerald-400" />
        <span>Koneksi terenkripsi &amp; diverifikasi Firebase Auth</span>
      </div>
    </div>
  );
}

export default function LoginPage() {
  return (
    <div className="flex min-h-screen items-center justify-center bg-stone-900 px-4 py-12 text-stone-900">
      <div className="w-full max-w-md">
        {/* Brand Header */}
        <div className="text-center mb-8">
          <div className="inline-flex h-12 w-12 items-center justify-center rounded-xl bg-emerald-700 text-white font-extrabold text-lg shadow-md mb-3">
            KD
          </div>
          <h1 className="font-display text-2xl font-bold tracking-tight text-white sm:text-3xl">
            Panel Admin Kediengaja
          </h1>
          <p className="mt-1.5 text-xs sm:text-sm text-stone-400">
            Masuk untuk mengelola akomodasi, trip, kalender, dan dokumentasi.
          </p>
        </div>

        <Suspense fallback={<div className="p-8 text-center text-stone-400 text-sm">Memuat halaman login...</div>}>
          <LoginForm />
        </Suspense>
      </div>
    </div>
  );
}
