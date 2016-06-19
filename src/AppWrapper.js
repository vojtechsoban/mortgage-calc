import React, { Component } from 'react';
import { createStore } from 'redux';
import { Provider } from 'react-redux';

import App from './App';
import reducer from './reducers';

const initialState = {
    clickReducer: {
        name: 'My Name',
        click1: 0,
        click2: 0
    },
    anotherReducer: {
    }
}

const store = createStore(reducer, initialState);

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
