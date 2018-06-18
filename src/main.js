import 'babel-polyfill';
import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { createConnectedRouter, createRender, resolver } from 'found';
import { Actions } from 'farce';

import { addServiceWorker } from './sw/addServiceWorker';
import { homescreenPrompt } from './homescreenPrompt';
import store from './store';

import './images/icon-512.png';
import './images/icon-192.png';
import './manifest.json';


store.dispatch(Actions.init());
addServiceWorker(store);
homescreenPrompt(store);

const ConnectedRouter = createConnectedRouter({
    render: createRender({
        renderError: (
            { error },
        ) => <div>{error.status === 404 ? 'Not found' : 'Error'}</div>,
    }),
});

ReactDOM.render(
    <Provider store={store}>
        <ConnectedRouter resolver={resolver} />
    </Provider>,
    document.getElementById('root')
);