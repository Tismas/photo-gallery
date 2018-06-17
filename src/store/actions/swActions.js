export function updateReady(sw) {
    return {
        type: "UPDATE_READY",
        payload: sw
    }
}

export function updateInstalled() {
    return {
        type: "UPDATE_INSTALLED"
    }
}

export function discardUpdate() {
    return {
        type: "DISCARD_UPDATE"
    }
}