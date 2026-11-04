// Bump VERSION whenever you change any file so returning visitors get the update.
const VERSION = 'v2';
const ASSETS = ['./', 'index.html', 'icon.svg', 'manifest.webmanifest', 'cocktail-club-2027-08.ics'];

self.addEventListener('install', e => {
  e.waitUntil(caches.open(VERSION).then(c => c.addAll(ASSETS)).then(() => self.skipWaiting()));
});

self.addEventListener('activate', e => {
  e.waitUntil(caches.keys()
    .then(keys => Promise.all(keys.filter(k => k !== VERSION).map(k => caches.delete(k))))
    .then(() => self.clients.claim()));
});

// Stale-while-revalidate: answer instantly from cache, refresh in the background.
self.addEventListener('fetch', e => {
  const { request } = e;
  if (request.method !== 'GET' || new URL(request.url).origin !== location.origin) return;
  e.respondWith(caches.open(VERSION).then(async cache => {
    const cached = await cache.match(request, { ignoreSearch: true });
    const network = fetch(request).then(res => {
      if (res.ok) cache.put(request, res.clone());
      return res;
    }).catch(() => cached);
    return cached || network;
  }));
});
