import idb from 'idb';
import { imagesCache } from '..';

export const dbPromise = idb.open('photos', 1, upgradeDb => {
    const photosStore = upgradeDb.createObjectStore('photos', { keyPath: 'url' });
    photosStore.createIndex('timestamp', 'uploadDate');
});

export function getCachedPhotosFromDb() {
    if (!dbPromise) return;
    return dbPromise.then(db => {
        const store = db.transaction('photos').objectStore('photos').index('timestamp');
        return store.getAll();
    })
}

const cleanImageCache = () => {
    dbPromise.then(db => {
        const store = db.transaction('photos').objectStore('photos');
        return store.getAll();
    }).then(photos => {
        const photosUrls = photos.map(photo => photo.url);
        caches.open(imagesCache).then(cache => {
            cache.keys().then(requests => {
                requests.forEach(request => {
                    if (!photosUrls.includes(request.url)) {
                        cache.delete(request);
                    }
                });
            });
        })
    })
}

export function addPhotoToDb(photoObj) {
    dbPromise.then(db => {
        const tx = db.transaction('photos', 'readwrite')
        const store = tx.objectStore('photos');
        store.put(photoObj);
        store.index('timestamp').openCursor(null, 'prev').then(cursor => {
            return cursor.advance(100);
        }).then(function deleteRest(cursor) {
            if (!cursor) return cleanImageCache();
            cursor.delete();
            return cursor.continue().then(deleteRest);
        });
    })
}