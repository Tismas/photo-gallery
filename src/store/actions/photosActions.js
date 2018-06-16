import axios from 'axios';

const baseParams = {
    api_key: '1a475b8d3b2322b93260d9afa8145353',
    format: 'json',
    nojsoncallback: 1,
    per_page: 100,
    extras: 'description, date_upload, owner_name, url_s, geo'
}

export function fetchPhotos({page=1, search=''} = {}) {
    return {
        type: page == 1 ? "FETCH_PHOTOS" : "FETCH_MORE_PHOTOS",
        payload: axios.get('https://api.flickr.com/services/rest/', {
            params: {
                ...baseParams,
                method: 'flickr.photos.search',
                tags: 'dog,dogs',
                text: search.toLowerCase(),
                page
            }
        })
    }
}

export function fetchUserPhotos({userID, page=1} = {}) {
    if (!userID) throw 'userID not provided to fetchUserPhotos';

    return {
        type: page == 1 ? "FETCH_PHOTOS" : "FETCH_MORE_PHOTOS",
        payload: axios.get('https://api.flickr.com/services/rest/', {
            params: {
                ...baseParams,
                method: 'flickr.people.getPhotos',
                user_id: userID,
                page
            }
        })
    }
}