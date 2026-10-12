import { useEffect, useState } from 'react';

export type AssetStatus = 'checking' | 'available' | 'missing';

const cache = new Map<string, Promise<boolean>>();

/**
 * Checks whether a static file really exists.
 * Dev servers and SPA hosts often answer unknown paths with index.html (HTTP 200),
 * so an HTML response for a non-HTML asset is treated as "missing".
 */
export function checkAsset(url: string): Promise<boolean> {
  const cached = cache.get(url);
  if (cached) return cached;
  const probe = fetch(url, { method: 'HEAD', cache: 'no-cache' })
    .then((res) => {
      if (!res.ok) return false;
      const type = res.headers.get('content-type') ?? '';
      return !type.includes('text/html');
    })
    .catch(() => false);
  cache.set(url, probe);
  return probe;
}

export function useAssetAvailable(url?: string): AssetStatus {
  const [status, setStatus] = useState<AssetStatus>(url ? 'checking' : 'missing');

  useEffect(() => {
    if (!url) {
      setStatus('missing');
      return;
    }
    let alive = true;
    setStatus('checking');
    checkAsset(url).then((ok) => {
      if (alive) setStatus(ok ? 'available' : 'missing');
    });
    return () => {
      alive = false;
    };
  }, [url]);

  return status;
}

export const isPdf = (path?: string) => !!path && /\.pdf($|\?)/i.test(path);
export const isImage = (path?: string) => !!path && /\.(png|jpe?g|webp)($|\?)/i.test(path);
