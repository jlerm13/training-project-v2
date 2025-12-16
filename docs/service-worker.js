// =====================================================
// SERVICE WORKER DISABLED FOR PILOT
// Reason: Path configuration needs deployment-specific setup
// Will re-enable after pilot if offline access is requested
// =====================================================

/*
const CACHE_NAME = 'athletic-training-v1';
const urlsToCache = [
  './',
  './js/app.js',
  ... etc
];
*/

// No-op service worker - just registers successfully but does nothing
self.addEventListener('install', () => {
  console.log('Service worker installed (no-op for pilot)');
  self.skipWaiting();
});

self.addEventListener('activate', () => {
  console.log('Service worker activated (no-op for pilot)');
});

self.addEventListener('fetch', (event) => {
  // Just pass through to network
  event.respondWith(fetch(event.request));
});
