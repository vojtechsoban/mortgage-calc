import React, { Component } from 'react';
import {Grid, Row} from 'react-bootstrap';
import MortgageInputForm from './components/MortgageInputForm';
import ExtraPaymentsContainer from './containers/ExtraPaymentsContainer';
import MortgageResultFormContainer from './containers/MortgageResultContainer';
import ExtraPaymentInputForm from './components/ExtraPaymentInputForm'
import { AddExtraPaymentAction, CalculateMortgageAction } from './actions/Actions';

// If you use React Router, make this component
// render <Router> with your routes. Currently,
// only synchronous routes are hot reloaded, and
// you will see a warning from <Router> on every reload.
// You can ignore this warning. For details, see:
// https://github.com/reactjs/react-router/issues/2182

export default class App extends Component {
  render() {
    return (
      <Grid>
        <Row>
          <MortgageInputForm onSubmit={(formData, dispatch) => {
            dispatch(CalculateMortgageAction(formData));
          } } className="form-group" />
        </Row>
        <Row>
          <ExtraPaymentInputForm onSubmit={(formData, dispatch) => {
            dispatch(AddExtraPaymentAction(formData));
          } }/>
        </Row>
        <Row>
          <ExtraPaymentsContainer />
        </Row>
        <Row>
          <MortgageResultFormContainer />
        </Row>
      </Grid>
    );
  }
}
