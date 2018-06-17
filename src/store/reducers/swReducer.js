const swReducer = (state = {
    updatePending: false,
    sw: null
}, action) => {
    switch (action.type) {
        case 'UPDATE_READY':
            return { ...state, updatePending: true, sw: action.payload }
        case 'UPDATE_INSTALLED':
            if (state.sw)
                state.sw.postMessage('take over');
            return { ...state, updatePending: false }
        case 'DISCARD_UPDATE':
            return { ...state, updatePending: false, sw: null }
    }
    return state;
};

export default swReducer;