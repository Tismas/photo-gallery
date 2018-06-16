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