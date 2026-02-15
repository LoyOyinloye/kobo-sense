// ============================================
// KoboSense — Service Worker
// Cache-first for app shell, network-first for dynamic content
// ============================================

const CACHE_VERSION = 'kobo-v1';
const APP_SHELL_CACHE = `${CACHE_VERSION}-shell`;
const FONT_CACHE = `${CACHE_VERSION}-fonts`;

// App shell resources to pre-cache on install
const APP_SHELL = [
    './',
    './index.html',
    './manifest.json'
];

// Patterns for cache strategies
const FONT_ORIGINS = [
    'https://fonts.googleapis.com',
    'https://fonts.gstatic.com'
];

// ── Install ──────────────────────────────
self.addEventListener('install', (event) => {
    event.waitUntil(
        caches.open(APP_SHELL_CACHE)
            .then(cache => cache.addAll(APP_SHELL))
            .then(() => self.skipWaiting())
    );
});

// ── Activate ─────────────────────────────
self.addEventListener('activate', (event) => {
    event.waitUntil(
        caches.keys().then(keys =>
            Promise.all(
                keys
                    .filter(key => key !== APP_SHELL_CACHE && key !== FONT_CACHE)
                    .map(key => caches.delete(key))
            )
        ).then(() => self.clients.claim())
    );
});

// ── Fetch ────────────────────────────────
self.addEventListener('fetch', (event) => {
    const { request } = event;
    const url = new URL(request.url);

    // Skip non-GET requests
    if (request.method !== 'GET') return;

    // Strategy: Cache-first for fonts (they rarely change)
    if (FONT_ORIGINS.some(origin => request.url.startsWith(origin))) {
        event.respondWith(
            caches.open(FONT_CACHE).then(cache =>
                cache.match(request).then(cached => {
                    if (cached) return cached;
                    return fetch(request).then(response => {
                        cache.put(request, response.clone());
                        return response;
                    });
                })
            )
        );
        return;
    }

    // Strategy: Cache-first for built assets (hashed filenames)
    if (url.pathname.startsWith('/assets/')) {
        event.respondWith(
            caches.open(APP_SHELL_CACHE).then(cache =>
                cache.match(request).then(cached => {
                    if (cached) return cached;
                    return fetch(request).then(response => {
                        cache.put(request, response.clone());
                        return response;
                    });
                })
            )
        );
        return;
    }

    // Strategy: Network-first for navigation (HTML pages)
    if (request.mode === 'navigate') {
        event.respondWith(
            fetch(request)
                .then(response => {
                    const clone = response.clone();
                    caches.open(APP_SHELL_CACHE).then(cache => cache.put(request, clone));
                    return response;
                })
                .catch(() => caches.match(request).then(cached => cached || caches.match('./index.html')))
        );
        return;
    }

    // Strategy: Stale-while-revalidate for everything else
    event.respondWith(
        caches.open(APP_SHELL_CACHE).then(cache =>
            cache.match(request).then(cached => {
                const fetched = fetch(request).then(response => {
                    cache.put(request, response.clone());
                    return response;
                }).catch(() => cached);

                return cached || fetched;
            })
        )
    );
});
