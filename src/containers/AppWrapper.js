import React, { Component } from 'react';
import { combineReducers, createStore } from 'redux';
import { Provider } from 'react-redux';

import App from '../App';
import * as reducers from '../reducers';

const reducer = combineReducers(reducers);
const store = createStore(reducer);

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
