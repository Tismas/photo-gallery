import axios from 'axios';

export function fetchPhotos() {
    return {
        type: "FETCH_PHOTOS",
        payload: axios.get('https://api.flickr.com/services/rest/', {
            params: {
                method: 'flickr.photos.search',
                api_key: '1a475b8d3b2322b93260d9afa8145353',
                text: 'dogs',
                format: 'json',
                nojsoncallback: 1,
                extras: 'description, date_upload, owner_name, url_s'
            }
        })
    }
}

export function fetchMorePhotos(page) {
    return {
        type: "FETCH_MORE_PHOTOS",
        payload: axios.get('https://api.flickr.com/services/rest/', {
            params: {
                method: 'flickr.photos.search',
                api_key: '1a475b8d3b2322b93260d9afa8145353',
                text: 'dogs',
                format: 'json',
                nojsoncallback: 1,
                page,
                extras: 'description, date_upload, owner_name, url_s'
            }
        })
    }
}