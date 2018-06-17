import { combineReducers } from 'redux';
import { foundReducer } from 'found';

import photosReducer from './photosReducer';
import metaReducer from './metaReducer';
import swReducer from './swReducer';

export default combineReducers({
    photos: photosReducer,
    meta: metaReducer,
    serviceWorker: swReducer,
    found: foundReducer
});