import React, { Component } from 'react';
import { createStore } from 'redux';
import { Provider } from 'react-redux';

import App from './App';
import reducer from './reducers';

// properties must match reducer names
const initialState = {
    clickReducer: {
        name: 'My Name',
        click1: 0,
        click2: 0
    },
    calculateMortgageReducer: {
        mortgage: {
            principal: null,
            rate: null,
            monthlyPayment: null
        }
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
