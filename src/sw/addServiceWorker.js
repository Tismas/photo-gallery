import { updateReady } from '../store/actions/swActions';

const watchForStateChange = (sw, store) => {
    if (sw.state == 'installed') {
        store.dispatch(updateReady(sw));
    }
}

const registerServiceWorker = store => {
    navigator.serviceWorker.register('sw.bundle.js').then(reg => {
        if (!navigator.serviceWorker.controller) return;

        if (reg.waiting) {
            store.dispatch(updateReady(reg.waiting));
        }

        if (reg.installing) {
            const sw = reg.installing;
            sw.addEventListener('statechange', watchForStateChange.bind(this, sw, store));
        }

        reg.addEventListener('updatefound', () => {
            const sw = reg.installing;
            sw.addEventListener('statechange', watchForStateChange.bind(this, sw, store));
        });
    });

    navigator.serviceWorker.addEventListener('controllerchange', ev => {
        window.location.reload();
    });
}

export function addServiceWorker(store) {
    if ('serviceWorker' in navigator) {
        window.addEventListener('load', registerServiceWorker.bind(this, store));
    }
}