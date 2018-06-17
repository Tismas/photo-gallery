export function changeLocation({ location = {} } = {}) {
    return {
        type: "CHANGE_LOCATION",
        payload: location
    }
}

export function changeSearchValue({searchValue = ''} = {}) {
    return {
        type: "CHANGE_SEARCH_VALUE",
        payload: searchValue
    }
}

export function showInstallAppNotyfication(deferredPrompt) {
    return {
        type: "SHOW_INSTALL_NOTYFICATION",
        payload: deferredPrompt
    }
}

export function discardInstallNotyfication() {
    return {
        type: "DISCARD_INSTALL_NOTYFICATION"
    }
}