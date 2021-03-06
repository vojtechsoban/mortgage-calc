import React, {Component} from 'react';
import PropTypes from 'prop-types';
import {Provider} from 'react-redux';
import App from 'src/App';
import DevTools from 'src/containers/DevTools';

export default class Root extends Component {

  static propTypes = {store: PropTypes.object.isRequired};

  render() {
    const {store} = this.props;
    return (
      <Provider store={store}>
        <div>
          <App />
          <DevTools />
        </div>
      </Provider>
    );
  }
}
