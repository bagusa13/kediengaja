import { doc, getDoc, collection, getDocs, limit, query, orderBy } from 'firebase/firestore';
import { db } from '@/lib/firebase';

export function isListed(item) {
  return item && item.isActive !== false;
}

export function priceSuffix(kind, tipe = '') {
  if (kind === 'stay') return '/malam';
  const t = String(tipe).toLowerCase();
  if (t.includes('jeep')) return '/jeep';
  return '/orang';
}

export async function fetchCollection(name, max) {
  const ref = collection(db, name);
  const mapDocs = (snap) => snap.docs.map((docSnap) => ({ id: docSnap.id, ...docSnap.data() })).filter(isListed);

  try {
    const clauses = [orderBy('createdAt', 'desc')];
    if (max) clauses.push(limit(max));
    return mapDocs(await getDocs(query(ref, ...clauses)));
  } catch {
    try {
      const snap = max ? await getDocs(query(ref, limit(max))) : await getDocs(ref);
      return mapDocs(snap);
    } catch {
      return [];
    }
  }
}

export async function fetchSingleDoc(collectionName, id, fallbackList = []) {
  const fallback = fallbackList.find((row) => row.id === id) || null;
  if (!process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID) {
    return fallback;
  }
  try {
    const timeout = new Promise((_, reject) => setTimeout(() => reject(new Error('timeout')), 2500));
    const snap = await Promise.race([
      getDoc(doc(db, collectionName, id)),
      timeout
    ]);
    if (snap && snap.exists && snap.exists()) {
      return { id: snap.id, ...snap.data() };
    }
    return fallback;
  } catch {
    return fallback;
  }
}

export function orFallback(rows, fallback) {
  return rows.length > 0 ? rows : fallback.filter(isListed);
}

