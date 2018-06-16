import { createStore, applyMiddleware, compose } from "redux";
import { createMatchEnhancer, Matcher} from 'found';
import { queryMiddleware, HashProtocol, createHistoryEnhancer } from 'farce';

import promise from 'redux-promise-middleware';

import reducers from './reducers';
import { routeConfig } from '../routeConfig';

const middleware = compose(
    createHistoryEnhancer({
        protocol: new HashProtocol(),
        middlewares: [queryMiddleware],
    }),
    createMatchEnhancer(new Matcher(routeConfig)),
    applyMiddleware(promise())
);

export default createStore(reducers, middleware);