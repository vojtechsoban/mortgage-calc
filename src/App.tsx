import React, { Component } from 'react'
import { Button, Container, Segment } from 'semantic-ui-react'
import MortgageInputForm from 'src/MortgageInputForm'

import 'semantic-ui-css/semantic.min.css'
import 'react-semantic-ui-datepickers/dist/react-semantic-ui-datepickers.css'

export default class App extends Component {

  render() {
    return (
      <Container>
        <Segment.Group>
          <Segment>
            <MortgageInputForm />
          </Segment>
          {/*<Segment>*/}
          {/*  <ExtraPaymentInputForm onSubmit={(formData, dispatch) => {*/}
          {/*    dispatch(AddExtraPaymentAction(formData))*/}
          {/*  }}/>*/}
          {/*</Segment>*/}
          {/*<Segment>*/}
          {/*  <ExtraPaymentsContainer onSubmit={(extraPayment, dispatch) => {*/}
          {/*    dispatch(SaveExtraPayment(extraPayment))*/}
          {/*  }}/>*/}
          {/*</Segment>*/}
          {/*<Segment>*/}
          {/*  <Button primary type="submit" onClick={this.onClicksubmitFormon}>Calculate</Button>*/}
          {/*</Segment>*/}
          {/*<Segment>*/}
          {/*  <MortgageResultFormContainer/>*/}
          {/*</Segment>*/}
        </Segment.Group>
      </Container>
    )
  }
}
