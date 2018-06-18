export const staticCache = 'photo-gallery-v8';
export const imagesCache = 'photo-images-v1';
const actualCaches = [staticCache, imagesCache];

self.addEventListener('install', event => {
    event.waitUntil(
        caches.open(staticCache).then(cache => {
            return cache.addAll([
                './',
                'app.bundle.js',
                'app.css',
                'manifest.json',
                'https://fonts.googleapis.com/css?family=Roboto:400,500,700',
                'https://fonts.gstatic.com/s/roboto/v18/KFOmCnqEu92Fr1Mu72xKOzY.woff2',
                'https://fonts.gstatic.com/s/roboto/v18/KFOlCnqEu92Fr1MmEU9fCRc4EsA.woff2',
                'https://fonts.gstatic.com/s/roboto/v18/KFOlCnqEu92Fr1MmWUlfBBc4.woff2'
            ]);
        })
    );
});

self.addEventListener('activate', event => {
    event.waitUntil(
        caches.keys().then(cacheNames => {
            return Promise.all(
                cacheNames.filter(cacheName => {
                    return cacheName.startsWith('photo-') && !actualCaches.includes(cacheName);
                }).map(cacheName => caches.delete(cacheName))
            )
        })
    );
});

self.addEventListener('fetch', event => {
    if(event.request.url.endsWith('.jpg')) {
        event.respondWith(servePhoto(event.request));
    }
    else {
        event.respondWith(
            caches.match(event.request).then(response => {
                return response || fetch(event.request);
            })
        );
    }

});

self.addEventListener('message', event => {
    if(event.data == 'take over') {
        self.skipWaiting();
    }
});

const servePhoto = request => {
    return caches.open(imagesCache).then(cache => {
        return cache.match(request.url).then(response => {
            if(response) return response;

            return fetch(request).then(netResponse => {
                cache.put(request.url, netResponse.clone());
                return netResponse;
            });
        })
    })
}