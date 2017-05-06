import React, {Component} from 'react';
import {Grid, Row, Col, FormGroup, Button} from 'react-bootstrap';
import MortgageInputForm from './components/MortgageInputForm';
import ExtraPaymentsContainer from './containers/ExtraPaymentsContainer';
import MortgageResultFormContainer from './containers/MortgageResultContainer';
import ExtraPaymentInputForm from './components/ExtraPaymentInputForm'
import {AddExtraPaymentAction, CalculateMortgageAction} from './actions/Actions';

// If you use React Router, make this component
// render <Router> with your routes. Currently,
// only synchronous routes are hot reloaded, and
// you will see a warning from <Router> on every reload.
// You can ignore this warning. For details, see:
// https://github.com/reactjs/react-router/issues/2182

export default class App extends Component {
  
  onClicksubmitFormon = () => {
    this.refs.mortgageForm.getWrappedInstance().submit()
  }
  
  render() {
    return (
      <Grid>
        <Row>
          <MortgageInputForm ref={'mortgageForm'} onSubmit={(formData, dispatch) => {
            dispatch(CalculateMortgageAction(formData));
          } }/>
        </Row>
        <Row>
          <ExtraPaymentInputForm onSubmit={(formData, dispatch) => {
            dispatch(AddExtraPaymentAction(formData));
          } }/>
        </Row>
        <Row>
          <Col xs={8} xsOffset={8} md={4}>
            <FormGroup>
              <Button type="submit" onClick={this.onClicksubmitFormon}>Calculate</Button>
            </FormGroup>
          </Col>
        </Row>
        <Row>
          <Col xs={8} md={8}>
            <ExtraPaymentsContainer />
          </Col>
        </Row>
        <Row>
          <MortgageResultFormContainer />
        </Row>
      </Grid>
    );
  }
}
