import 'babel-polyfill';
import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { createConnectedRouter, createRender, resolver } from 'found';
import { Actions } from 'farce';

import store from './store';

store.dispatch(Actions.init());

const ConnectedRouter = createConnectedRouter({
    render: createRender({
        renderError: (
            { error }, // eslint-disable-line react/prop-types
        ) => <div>{error.status === 404 ? 'Not found' : 'Error'}</div>,
    }),
});

ReactDOM.render(
    <Provider store={store}>
        <ConnectedRouter resolver={resolver} />
    </Provider>,
    document.getElementById('root')
);