import { showInstallAppNotyfication } from '../store/actions/metaActions';

export function homescreenPrompt(store) {
    window.addEventListener('beforeinstallprompt', (e) => {
        e.preventDefault();
        deferredPrompt = e;
        store.dispatch(showInstallAppNotyfication(deferredPrompt));
    });
}