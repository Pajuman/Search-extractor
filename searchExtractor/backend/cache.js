const cache = new Map();

export function getCache(key) {
  const item = cache.get(key);
  if (!item) return null;
  if (Date.now() > item.expiry) {
    cache.delete(key);
    return null;
  }
  return item.data;
}

export function setCache(key, data, ttl) {
  cache.set(key, { data, expiry: Date.now() + ttl });
}
