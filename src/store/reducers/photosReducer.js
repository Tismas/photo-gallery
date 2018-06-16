const photosMapper = photo => {
    return {
        description: photo.description._content,
        uploadDate: new Date(Number(photo.dateupload * 1000)), // API returns number of seconds since 1970, we need miliseconds
        user_id: photo.owner,
        author: photo.ownername,
        title: photo.title,
        url: photo.url_s,
        location: {lat: photo.latitude, long: photo.longitude}
    }
}

const photosReducer = (state = {
    fetching: false,
    fetchingMore: false,
    fetched: false,
    error: null,
    photos: []
}, action) => {
    switch (action.type) {
        case 'FETCH_PHOTOS_PENDING':
            return { ...state, fetching: true }
        case 'FETCH_PHOTOS_REJECTED':
            return { ...state, fetching: false, error: action.payload }
        case 'FETCH_PHOTOS_FULFILLED': 
        case 'FETCH_MORE_PHOTOS_FULFILLED':
            if (action.payload.data.stat == 'fail')
                return {
                    ...state,
                    fetching: false,
                    fetchingMore: false,
                    error: action.payload.data.message
                }
            return {
                ...state,
                fetching: false,
                fetched: true,
                fetchingMore: false,
                page: action.payload.data.photos.page,
                total_pages: action.payload.data.photos.pages,
                photos: action.type.includes('MORE') ? 
                        [...state.photos, ...action.payload.data.photos.photo.map(photosMapper)] 
                        : 
                        [...action.payload.data.photos.photo.map(photosMapper)]
            }

        case 'FETCH_MORE_PHOTOS_PENDING':
            return { ...state, fetchingMore: true }
        case 'FETCH_MORE_PHOTOS_REJECTED':
            return { ...state, fetchingMore: false, error: action.payload }
    }
    return state;
};

export default photosReducer;