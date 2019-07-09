import React from 'react'
import ReactDOM from 'react-dom'
import { AppContainer } from 'react-hot-loader'
import RootComponent from './RootComponent'

const renderApp = App => {
  ReactDOM.render(
    <AppContainer>
      <App />
    </AppContainer>,
    document.getElementById('root'),
  )
}

// Intl polyfill
if (!window.Intl) {
  /* eslint-disable global-require */
  require('intl')
  /* eslint-enable global-require */
}

renderApp(RootComponent)

if (module.hot) {
  module.hot.accept('./RootComponent', () => {
    renderApp(RootComponent)
  })
}
