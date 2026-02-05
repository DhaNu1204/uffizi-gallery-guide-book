// Uffizi Unveiled Service Worker
// Version: 3.0.0 - 15 Languages Support

const CACHE_NAME = 'uffizi-guide-v3';
const STATIC_CACHE = 'uffizi-static-v3';
const DYNAMIC_CACHE = 'uffizi-dynamic-v3';
const DATA_CACHE = 'uffizi-data-v3';

// Static assets to cache on install
const STATIC_ASSETS = [
  '/',
  '/index.html',
  '/manifest.json',
  '/favicon.svg'
];

// All 15 supported languages
const LANGUAGES = ['en', 'it', 'es', 'fr', 'de', 'pt', 'nl', 'pl', 'ru', 'zh', 'ja', 'ko', 'ar', 'hi', 'el'];

// Generate data file paths for all languages
const DATA_ASSETS = LANGUAGES.flatMap(lang => [
  `/data/${lang}/introduction.json`,
  `/data/${lang}/second-floor.json`,
  `/data/${lang}/first-floor.json`
]);

// Install event - cache static assets and language data
self.addEventListener('install', (event) => {
  console.log('[SW] Installing Service Worker...');

  event.waitUntil(
    Promise.all([
      // Cache static assets
      caches.open(STATIC_CACHE)
        .then((cache) => {
          console.log('[SW] Caching static assets');
          return cache.addAll(STATIC_ASSETS);
        }),
      // Cache language data files
      caches.open(DATA_CACHE)
        .then((cache) => {
          console.log('[SW] Caching language data files');
          return cache.addAll(DATA_ASSETS);
        })
    ])
      .then(() => {
        console.log('[SW] All assets cached');
        return self.skipWaiting();
      })
      .catch((error) => {
        console.error('[SW] Failed to cache assets:', error);
      })
  );
});

// Activate event - clean up old caches
self.addEventListener('activate', (event) => {
  console.log('[SW] Activating Service Worker...');

  const currentCaches = [STATIC_CACHE, DYNAMIC_CACHE, DATA_CACHE];

  event.waitUntil(
    caches.keys()
      .then((cacheNames) => {
        return Promise.all(
          cacheNames
            .filter((name) => {
              // Delete old versions of our caches
              return name.startsWith('uffizi-') && !currentCaches.includes(name);
            })
            .map((name) => {
              console.log('[SW] Deleting old cache:', name);
              return caches.delete(name);
            })
        );
      })
      .then(() => {
        console.log('[SW] Service Worker activated');
        return self.clients.claim();
      })
  );
});

// Fetch event - serve from cache, fallback to network
self.addEventListener('fetch', (event) => {
  const { request } = event;
  const url = new URL(request.url);

  // Skip non-GET requests
  if (request.method !== 'GET') {
    return;
  }

  // Skip chrome-extension and other non-http(s) requests
  if (!url.protocol.startsWith('http')) {
    return;
  }

  // Handle different request types
  if (isStaticAsset(url)) {
    // Cache-first strategy for static assets
    event.respondWith(cacheFirst(request, STATIC_CACHE));
  } else if (isDataFile(url)) {
    // Cache-first for language data files (for offline support)
    event.respondWith(cacheFirst(request, DATA_CACHE));
  } else if (isPlaceholderImage(url)) {
    // Cache-first for placeholder images
    event.respondWith(cacheFirst(request, DYNAMIC_CACHE));
  } else if (isNavigationRequest(request)) {
    // Network-first for navigation, fallback to cached index.html
    event.respondWith(networkFirstWithFallback(request));
  } else {
    // Stale-while-revalidate for everything else
    event.respondWith(staleWhileRevalidate(request, DYNAMIC_CACHE));
  }
});

// Helper functions
function isStaticAsset(url) {
  return url.pathname.match(/\.(js|css|png|jpg|jpeg|gif|svg|ico|woff|woff2|webp)$/);
}

function isDataFile(url) {
  return url.pathname.match(/^\/data\/.*\.json$/);
}

function isPlaceholderImage(url) {
  return url.hostname === 'placehold.co';
}

function isNavigationRequest(request) {
  return request.mode === 'navigate';
}

// Cache-first strategy
async function cacheFirst(request, cacheName) {
  const cachedResponse = await caches.match(request);

  if (cachedResponse) {
    return cachedResponse;
  }

  try {
    const networkResponse = await fetch(request);

    if (networkResponse.ok) {
      const cache = await caches.open(cacheName);
      cache.put(request, networkResponse.clone());
    }

    return networkResponse;
  } catch (error) {
    console.error('[SW] Fetch failed:', error);
    // Return a fallback response if available
    return new Response('Offline - Content not available', {
      status: 503,
      statusText: 'Service Unavailable',
      headers: { 'Content-Type': 'text/plain' }
    });
  }
}

// Network-first with fallback to cached index.html for SPA
async function networkFirstWithFallback(request) {
  try {
    const networkResponse = await fetch(request);

    if (networkResponse.ok) {
      const cache = await caches.open(STATIC_CACHE);
      cache.put(request, networkResponse.clone());
    }

    return networkResponse;
  } catch (error) {
    console.log('[SW] Network failed, serving cached version');

    // Try to serve the cached version of the request
    const cachedResponse = await caches.match(request);
    if (cachedResponse) {
      return cachedResponse;
    }

    // Fall back to index.html for SPA routing
    const indexResponse = await caches.match('/index.html');
    if (indexResponse) {
      return indexResponse;
    }

    return new Response('Offline - Please check your connection', {
      status: 503,
      statusText: 'Service Unavailable',
      headers: { 'Content-Type': 'text/plain' }
    });
  }
}

// Stale-while-revalidate strategy
async function staleWhileRevalidate(request, cacheName) {
  const cachedResponse = await caches.match(request);

  const fetchPromise = fetch(request)
    .then(async (networkResponse) => {
      if (networkResponse.ok) {
        const cache = await caches.open(cacheName);
        cache.put(request, networkResponse.clone());
      }
      return networkResponse;
    })
    .catch((error) => {
      console.error('[SW] Revalidate failed:', error);
      return null;
    });

  return cachedResponse || fetchPromise;
}

// Handle messages from the main app
self.addEventListener('message', (event) => {
  if (event.data && event.data.type === 'SKIP_WAITING') {
    self.skipWaiting();
  }

  if (event.data && event.data.type === 'CLEAR_CACHE') {
    event.waitUntil(
      caches.keys().then((cacheNames) => {
        return Promise.all(
          cacheNames.map((name) => caches.delete(name))
        );
      })
    );
  }
});

// Background sync for offline actions (future enhancement)
self.addEventListener('sync', (event) => {
  console.log('[SW] Background sync triggered:', event.tag);
});

// Push notifications (future enhancement)
self.addEventListener('push', (event) => {
  console.log('[SW] Push notification received');
});

console.log('[SW] Service Worker loaded');
