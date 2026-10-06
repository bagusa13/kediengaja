import { initializeApp, getApps } from 'firebase/app';
import { getFirestore } from 'firebase/firestore';

const firebaseConfig = {
  apiKey: process.env.NEXT_PUBLIC_FIREBASE_API_KEY,
  authDomain: process.env.NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN,
  projectId: process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID,
  storageBucket: process.env.NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: process.env.NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID,
  appId: process.env.NEXT_PUBLIC_FIREBASE_APP_ID,
};

const app = getApps().length === 0 ? initializeApp(firebaseConfig) : getApps()[0];
const db = getFirestore(app);

// Lazy/Client-only getter for Auth and Storage to prevent Next.js server-side undici parser error
function getFirebaseAuth() {
  if (typeof window === 'undefined') return null;
  const { getAuth } = require('firebase/auth');
  return getAuth(app);
}

function getFirebaseStorage() {
  if (typeof window === 'undefined') return null;
  const { getStorage } = require('firebase/storage');
  return getStorage(app);
}

export { app, db, getFirebaseAuth, getFirebaseStorage };
