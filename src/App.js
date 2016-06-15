import React, { Component } from 'react';
import Layout from './Layout';
import Button from './components/Button';
import { createStore } from 'redux'
import counter from './reducers/index'

// If you use React Router, make this component
// render <Router> with your routes. Currently,
// only synchronous routes are hot reloaded, and
// you will see a warning from <Router> on every reload.
// You can ignore this warning. For details, see:
// https://github.com/reactjs/react-router/issues/2182

// FIXME this is just POC, use bindActionCreator later
const store = createStore(counter);

export default class App extends Component {
  render() {
    return (
      <Layout>
        <Button text="some button" onClick={() => store.dispatch({type: 'click1'})} />
    	{" "}
        <Button text="other button" onClick={() => store.dispatch({type: 'click2'})}  />
      </Layout>
    );
  }
}
