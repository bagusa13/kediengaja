"use client";

import { createContext, useContext, useEffect, useState } from 'react';
import {
  onIdTokenChanged,
  signInWithEmailAndPassword,
  signOut,
} from 'firebase/auth';
import { getFirebaseAuth } from '@/lib/firebase';

const AuthContext = createContext({
  user: null,
  loading: true,
  login: async () => {},
  logout: async () => {},
});

const COOKIE_NAME = 'kediengaja_admin_session';

function setSessionCookie(token) {
  if (typeof document === 'undefined') return;
  if (token) {
    document.cookie = `${COOKIE_NAME}=${token}; path=/; max-age=86400; SameSite=Lax`;
  } else {
    document.cookie = `${COOKIE_NAME}=; path=/; expires=Thu, 01 Jan 1970 00:00:00 GMT`;
  }
}

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const auth = getFirebaseAuth();
    if (!auth) {
      setLoading(false);
      return;
    }

    const unsubscribe = onIdTokenChanged(auth, async (currentUser) => {
      if (currentUser) {
        setUser(currentUser);
        try {
          const token = await currentUser.getIdToken();
          setSessionCookie(token);
        } catch {
          setSessionCookie('active');
        }
      } else {
        setUser(null);
        setSessionCookie(null);
      }
      setLoading(false);
    });

    return () => unsubscribe();
  }, []);

  async function login(email, password) {
    const auth = getFirebaseAuth();
    if (!auth) throw new Error('Firebase Auth belum siap.');
    const cred = await signInWithEmailAndPassword(auth, email.trim(), password);
    const token = await cred.user.getIdToken();
    setSessionCookie(token);
    return cred.user;
  }

  async function logout() {
    const auth = getFirebaseAuth();
    if (auth) {
      await signOut(auth);
    }
    setSessionCookie(null);
    if (typeof window !== 'undefined') {
      window.location.href = '/login';
    }
  }

  return (
    <AuthContext.Provider value={{ user, loading, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  return useContext(AuthContext);
}
