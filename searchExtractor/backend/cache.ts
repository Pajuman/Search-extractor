type CacheItem = { data: any; expiry: number };
const cache = new Map<string, CacheItem>();

export function getCache(key: string): any | null {
  const item = cache.get(key);
  if (!item) return null;
  if (Date.now() > item.expiry) {
    cache.delete(key);
    return null;
  }
  return item.data;
}

export function setCache(key: string, data: any, ttl: number) {
  cache.set(key, { data, expiry: Date.now() + ttl });
}
