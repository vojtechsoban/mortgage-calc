import React, { Component } from 'react';
// Import bundled CSS files globally
import 'semantic-ui-css/semantic.min.css';
import { Button, Container, Grid, Segment } from 'semantic-ui-react';
import '../assets/css/react-datetime.css';
import { AddExtraPaymentAction, CalculateMortgageAction, SaveExtraPayment } from './actions/Actions';
import ExtraPaymentInputForm from './components/ExtraPaymentInputForm';
import MortgageInputForm from './components/MortgageInputForm';
import ExtraPaymentsContainer from './containers/ExtraPaymentsContainer';
import MortgageResultFormContainer from './containers/MortgageResultContainer';

// If you use React Router, make this component
// render <Router> with your routes. Currently,
// only synchronous routes are hot reloaded, and
// you will see a warning from <Router> on every reload.
// You can ignore this warning. For details, see:
// https://github.com/reactjs/react-router/issues/2182

export default class App extends Component {

  onClicksubmitFormon = () => {
    this.refs.mortgageForm.getWrappedInstance().submit();
  };

  render() {
    return (
      <Container>
        <Segment.Group>
          <Segment>
            <MortgageInputForm ref={'mortgageForm'} onSubmit={(formData, dispatch) => {
              dispatch(CalculateMortgageAction(formData));
            }}/>
          </Segment>
          <Segment>
            <ExtraPaymentInputForm onSubmit={(formData, dispatch) => {
              dispatch(AddExtraPaymentAction(formData));
            }}/>
          </Segment>
          <Segment>
            <ExtraPaymentsContainer onSubmit={(extraPayment, dispatch) => {
              dispatch(SaveExtraPayment(extraPayment));
            }}/>
          </Segment>
          <Segment>
            <Button primary type="submit" onClick={this.onClicksubmitFormon}>Calculate</Button>
          </Segment>
          <Segment>
            <MortgageResultFormContainer/>
          </Segment>
        </Segment.Group>

        <Grid.Row>
          <Grid.Column>
          </Grid.Column>
        </Grid.Row>
      </Container>
    );
  }
}
