
const photosReducer = (state = {
    lastLocation: {},
    searchValue: ''
}, action) => {
    switch (action.type) {
        case 'CHANGE_LOCATION':
            return { ...state, lastLocation: action.payload }
        case 'CHANGE_SEARCH_VALUE':
            return { ...state, searchValue: action.payload }
    }
    return state;
};

export default photosReducer;