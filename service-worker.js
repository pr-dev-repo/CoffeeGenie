self.addEventListener('install', event => {
  event.waitUntil(
    caches.open('coffee-geenie-v1').then(cache => {
      return cache.addAll([
        './',
        './index.html',
        './script.js',
        './manifest.json',
        './icons/icon-192.png',
        './icons/icon-512.png'
      ]);
    })
  );
});

self.addEventListener('fetch', event => {
  event.respondWith(
    caches.match(event.request).then(response => response || fetch(event.request))
  );
});