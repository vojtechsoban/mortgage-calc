import PropTypes from 'prop-types';
import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Field, reduxForm } from 'redux-form';
import { Button, Form } from 'semantic-ui-react';
import { renderDateTime, renderInput, SemanticReduxFormField } from '../services/Utils';

// const tooltip = text => (<Tooltip placement="top" id="tooltip">
//   {text}
// </Tooltip>);
// 'Extra payment amount. Could be absolute value or relative value as percentage of remaining balance.'

class ExtraPaymentInputForm extends Component {
  render() {

    const {handleSubmit} = this.props;

    return (<Form onSubmit={handleSubmit}>
        <Form.Group>
          <Form.Field>
            <label>Payment index</label>
            <Field
              name="paymentIndex"
              component={renderInput}
              type="text"
              parse={parseInt}
            />
          </Form.Field>
          <Form.Field>
            <label>Payment date</label>
            <Field
              name="date"
              component={renderDateTime}
              parse={parseInt}
            />
          </Form.Field>
          <Form.Field>
            <label>Amount</label>
            <Field
              name="amount"
              component={renderInput}
              type="text"
              parse={parseFloat}
            />
          </Form.Field>
        </Form.Group>
        <Form.Group inline>
          <label>Extra Payment Type</label>
          <Form.Field>
            <Field
              name="type"
              type="radio"
              value="constant_payment"
              component={SemanticReduxFormField}
              as={Form.Radio}
              label="Constant payment"
            />
          </Form.Field>
          <Form.Field>
            <Field
              name="type"
              type="radio"
              value="constant_duration"
              component={SemanticReduxFormField}
              as={Form.Radio}
              label="Constant duration"
            />
          </Form.Field>
        </Form.Group>
        <Form.Group>
          Defines if monthly payment should be constant or should be recalculated so that mortgage duration remains the
          same.
        </Form.Group>
        <Form.Group>
          <Form.Field>
            <Button type="submit">Add extra payment</Button>
          </Form.Field>
        </Form.Group>
      </Form>
    );
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
