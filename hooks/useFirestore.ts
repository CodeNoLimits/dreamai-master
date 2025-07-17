import { useEffect, useState } from 'react';
import {
  collection, query, where, onSnapshot, DocumentData, Query
} from 'firebase/firestore';
import { db } from '../firebase';

export function useCollection<T = DocumentData>(path: string, qFn?: (ref: any) => Query) {
  const [data, setData] = useState<T[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    try {
      const q = qFn ? qFn(collection(db, path)) : query(collection(db, path));
      const unsub = onSnapshot(q, (snap) => {
        setData(snap.docs.map((d) => ({ id: d.id, ...d.data() } as T)));
        setLoading(false);
      }, (err) => {
        setError(err.message);
        setLoading(false);
      });
      return () => unsub();
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Unknown error');
      setLoading(false);
    }
  }, [path]);

  return { data, loading, error };
}

