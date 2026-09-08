const CACHE_NAME = 'treino-cache-v3';
const ASSETS = [
  './', './index.html', './manifest.json', './icon-192.png', './icon-512.png',
  './images/face-pull.jpg',
  './images/desenvolvimento-halteres.jpg',
  './images/triceps-testa.jpg',
  './images/elevacao-lateral.jpg',
  './images/elevacao-frontal.jpg'
];

self.addEventListener('install', (event) => {
  event.waitUntil(
    caches.open(CACHE_NAME).then((cache) => cache.addAll(ASSETS))
  );
  self.skipWaiting();
});

self.addEventListener('activate', (event) => {
  event.waitUntil(
    caches.keys().then((keys) =>
      Promise.all(keys.filter((k) => k !== CACHE_NAME).map((k) => caches.delete(k)))
    )
  );
  self.clients.claim();
});

self.addEventListener('fetch', (event) => {
  event.respondWith(
    caches.match(event.request).then((cached) => cached || fetch(event.request))
  );
});
