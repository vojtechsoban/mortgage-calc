import React, {Component, PropTypes} from "react";
import {
  Grid, Row, Col, ControlLabel, FormGroup, Button, RadioGroup, HelpBlock, OverlayTrigger, Tooltip
} from 'react-bootstrap';
import {reduxForm, Field} from "redux-form";
import {connect} from "react-redux";
import {renderInput, renderRadio} from "../services/Utils";
import DateTimeField from 'react-bootstrap-datetimepicker';
const tooltip = text => (<Tooltip placement="top" id="tooltip">
  {text}
</Tooltip>);

class ExtraPaymentInputForm extends Component {
  render() {

    const {handleSubmit} = this.props;

    return (<form onSubmit={handleSubmit}>
        <Grid>
          <Row>
            <Col xs={2} md={2}>
              <ControlLabel>Payment index</ControlLabel>
              <Field name="paymentIndex" component={renderInput} type="text"/>
            </Col>
            <Col xs={2} md={2}>
              <ControlLabel>Amount</ControlLabel>
              <OverlayTrigger placement="top" overlay={tooltip(
                'Extra payment amount. Could be absolute value or relative value as percentage of remaining balance.'
              )}><FormGroup>
                <Field name="amount" component={renderInput} type="text"/>
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
