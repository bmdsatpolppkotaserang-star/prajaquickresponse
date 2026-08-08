const CACHE_NAME = 'DALMAS-v1.4';
const urlsToCache = [
  './',
  './index.html',
  './kotaserang.png',
  './polpp.png',
  './manifest.json',
  './icons/maskable_icon_x192.png',
  './icons/maskable_icon_x512.png'
];

// Install Service Worker
self.addEventListener('install', event => {
  event.waitUntil(
    caches.open(CACHE_NAME).then(cache => {
      return cache.addAll(urlsToCache);
    })
  );
  self.skipWaiting();
});

// Aktivasi & pembersihan cache lama
self.addEventListener('activate', event => {
  event.waitUntil(
    caches.keys().then(cacheNames => {
      return Promise.all(
        cacheNames.map(cache => {
          if (cache !== CACHE_NAME) {
            return caches.delete(cache);
          }
        })
      );
    })
  );
  self.clients.claim();
});

// Strategy Network First (Mengambil data terbaru dari Google Apps Script)
self.addEventListener('fetch', event => {
  event.respondWith(
    fetch(event.request).catch(() => {
      return caches.match(event.request);
    })
  );
});
