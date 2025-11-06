const cacheName = 'offline-cache-v1';

const WC = [
    '/pwapouchdb/',
    '/pwapouchdb/index.html',
    '/pwapouchdb/offline.html',
    '/pwapouchdb/main.js',
    '/pwapouchdb/app.js',
    '/pwapouchdb/manifest.json',
    'https://cdn.jsdelivr.net/npm/bootstrap@5.3.3/dist/css/bootstrap.min.css',
    'https://cdn.jsdelivr.net/npm/bootstrap@5.3.3/dist/js/bootstrap.bundle.min.js'
];


self.addEventListener('install', event => {
    event.waitUntil(
        caches.open(cacheName)
            .then(cache => {
                return cache.addAll(
                    WC
                );
            })
    );
});

self.addEventListener('fetch', event => {
    if (event.request.mode === 'navigate') {
        event.respondWith(
            fetch(event.request)
                .catch(() => {
                    return caches.match(event.request);
                })
        )
    }
})