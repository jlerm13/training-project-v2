// service-worker.js
// Simple service worker for PWA functionality and offline support

const CACHE_NAME = 'athletic-training-v1';
const urlsToCache = [
  '/',
  '/docs/js/app.js',
  '/docs/js/templates/earlyOffSeason/white.js',
  '/docs/js/templates/earlyOffSeason/red.js',
  '/docs/js/templates/earlyOffSeason/blue.js',
  '/docs/js/templates/earlyOffSeason/gold.js',
  '/docs/css/styles.css',
  '/manifest.json'
];

// Install service worker and cache files
self.addEventListener('install', (event) => {
  event.waitUntil(
    caches.open(CACHE_NAME)
      .then((cache) => {
        console.log('Opened cache');
        return cache.addAll(urlsToCache);
      })
  );
});

// Serve from cache, fallback to network
self.addEventListener('fetch', (event) => {
  event.respondWith(
    caches.match(event.request)
      .then((response) => {
        // Cache hit - return response
        if (response) {
          return response;
        }
        return fetch(event.request);
      }
    )
  );
});

// Update service worker
self.addEventListener('activate', (event) => {
  const cacheWhitelist = [CACHE_NAME];
  event.waitUntil(
    caches.keys().then((cacheNames) => {
      return Promise.all(
        cacheNames.map((cacheName) => {
          if (cacheWhitelist.indexOf(cacheName) === -1) {
            return caches.delete(cacheName);
          }
        })
      );
    })
  );
});
