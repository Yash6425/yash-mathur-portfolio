import { useEffect, useState } from 'react';
import { apiGet } from '../lib/api';

export type DataSource = 'loading' | 'api' | 'local';

/**
 * Loads a list from the API (e.g. /projects → { projects: [...] }).
 * Shows the built-in fallback immediately and swaps in database data when it arrives;
 * keeps the fallback if the API is unreachable or returns something unexpected.
 */
export function useApiList<T>(path: string, key: string, fallback: T[], isValid: (item: unknown) => item is T) {
  const [items, setItems] = useState<T[]>(fallback);
  const [source, setSource] = useState<DataSource>('loading');

  useEffect(() => {
    let alive = true;
    apiGet<Record<string, unknown>>(path).then((data) => {
      if (!alive) return;
      const list = data?.[key];
      if (Array.isArray(list) && list.length > 0 && list.every(isValid)) {
        setItems(list);
        setSource('api');
      } else {
        setSource('local');
      }
    });
    return () => {
      alive = false;
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [path, key]);

  return { items, source };
}
