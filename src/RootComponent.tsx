/* tslint:disable:space-in-parens */
import React from 'react'
import { Switch } from 'react-router'
import { BrowserRouter, Route } from 'react-router-dom'
import App from './App'

export default function RootComponent() {
  return (
      <BrowserRouter>
        <Switch>
          <Route component={App} />
        </Switch>
      </BrowserRouter>
  )
}
