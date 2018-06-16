
const photosReducer = (state = {
    lastLocation: {}
}, action) => {
    switch (action.type) {
        case 'CHANGE_LOCATION':
            return { ...state, lastLocation: action.payload }
    }
    return state;
};

export default photosReducer;