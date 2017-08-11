import React, {Component} from 'react';
import PropTypes from 'prop-types';
import moment from 'moment';
import {
  Grid, Row, Col, ControlLabel, FormGroup, Button, RadioGroup, HelpBlock, OverlayTrigger, Tooltip
} from 'react-bootstrap';
import {reduxForm, Field} from "redux-form";
import {connect} from "react-redux";
import {renderDateTime, renderInput, renderRadio} from "../services/Utils";

const tooltip = text => (<Tooltip placement="top" id="tooltip">
  {text}
</Tooltip>);

class ExtraPaymentInputForm extends Component {
  render() {

    const {handleSubmit, initialValues: {date}} = this.props;

    const paymentDate = moment(date).format('D.M.YYYY');

    return (<form onSubmit={handleSubmit}>
        <Grid>
          <Row>
            <Col xs={2} md={2}>
              <ControlLabel>Payment index</ControlLabel>
              <Field name="paymentIndex" component={renderInput} type="text" parse={parseInt} />
            </Col>
            <Col xs={2} md={2}>
              <FormGroup>
                <ControlLabel>Payment date</ControlLabel>
                <Field name="date" component={renderDateTime} parse={parseInt} />
              </FormGroup>
            </Col>
            <Col xs={2} md={2}>
              <ControlLabel>Amount</ControlLabel>
              <OverlayTrigger placement="top" overlay={tooltip(
                'Extra payment amount. Could be absolute value or relative value as percentage of remaining balance.'
              )}><FormGroup>
                <Field name="amount" component={renderInput} type="text" parse={parseFloat} />
              </FormGroup>
              </OverlayTrigger>
            </Col>
          </Row>
          <Row>
            <Col xs={4} md={8}>
              <ControlLabel>Extra Payment Type</ControlLabel>
              <FormGroup>
                <Field name="type" type="radio" value="constant_payment" component={renderRadio('Constant payment')}/>
                <Field name="type" type="radio" value="constant_duration" component={renderRadio('Constant duration')}/>
                <HelpBlock>
                  Defines if monthly payment should be constant or should be recalculated
                  so that mortgage duration remains the same.
                </HelpBlock>
              </FormGroup>
            </Col>
          </Row>
          <Row>
            <Col xs={2} md={4}>
              <Button type="submit">Add extra payment</Button>
            </Col>
          </Row>
        </Grid>
      </form>
    )
  }
}

ExtraPaymentInputForm.propTypes = {
  onSubmit: PropTypes.func.isRequired
};

// TODO better than enableReinitialize - use redux-form action creator: initialize(form:String, data:Object, keepDirty:boolean)
let decoratedForm = reduxForm({
    form: 'extraPaymentInputForm',
    enableReinitialize: true
  }
)(ExtraPaymentInputForm);

decoratedForm = connect(state => ({
  initialValues: state.calculateMortgageReducer.initialValues.extraPayments
}))(decoratedForm);

export default decoratedForm;
