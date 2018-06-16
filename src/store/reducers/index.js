import { combineReducers } from 'redux';
import { foundReducer } from 'found';

import photosReducer from './photosReducer';
import metaReducer from './metaReducer';

export default combineReducers({
    photos: photosReducer,
    meta: metaReducer,
    found: foundReducer
});