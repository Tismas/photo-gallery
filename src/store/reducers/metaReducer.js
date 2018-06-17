const photosReducer = (state = {
    lastLocation: {},
    searchValue: '',
    canAddToHomescreen: false,
    deferredPrompt: null
}, action) => {
    switch (action.type) {
        case 'CHANGE_LOCATION':
            return { ...state, lastLocation: action.payload }
        case 'CHANGE_SEARCH_VALUE':
            return { ...state, searchValue: action.payload }
        case 'SHOW_INSTALL_NOTYFICATION':
            return { ...state, canAddToHomescreen: true, deferredPrompt: action.payload }
        case 'DISCARD_INSTALL_NOTYFICATION':
            return { ...state, canAddToHomescreen: false, deferredPrompt: null }
    }
    return state;
};

export default photosReducer;