import React, {Component} from 'react';
import {createStore} from 'redux';
import {Provider} from 'react-redux';

import App from './App';
import reducer from './reducers';

// properties must match reducer names - see reducers/index.js
const initialState = {
    calculateMortgageReducer: {
        mortgage: null
    }
};

const configureStore = (initialState) => {

    const store = createStore(reducer, initialState);

    if (module.hot) {
        // Enable Webpack hot module replacement for reducers
        module.hot.accept('./reducers', () => {
            const nextRootReducer = require('./reducers/index').default;
            store.replaceReducer(nextRootReducer);
        });
    }

    return store;
};

const store = configureStore(initialState);

export default class AppWrapper extends Component {
    render() {
        return (
            <div>
                <Provider store={store}>
                    <App />
                </Provider>
            </div>
        );
    }
}
