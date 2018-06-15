const photosMapper = photo => {
    return {
        description: photo.description._content,
        uploadDate: new Date(Number(photo.dateupload * 1000)), // API returns number of seconds since 1970, we need miliseconds
        author: photo.ownername,
        title: photo.title,
        url: photo.url_s
    }
}

const photosReducer = (state = {
    fetching: false,
    fetched: false,
    error: null,
    photos: []
}, action) => {
    switch(action.type) {
        case 'FETCH_PHOTOS_PENDING':
            return {...state, fetching: true}
        case 'FETCH_PHOTOS_REJECTED':
            return {...state, fetching: false, error: action.payload}
        case 'FETCH_PHOTOS_FULFILLED':
            return {...state,
                    fetching: false,
                    fetched: true,
                    page: action.payload.data.photos.page,
                    total_pages: action.payload.data.photos.pages,
                    photos: action.payload.data.photos.photo.map(photosMapper)
                }
    }
    return state;
};

export default photosReducer;