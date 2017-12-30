import PropTypes from 'prop-types';
import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Field, reduxForm } from 'redux-form';
import { Button, Form } from 'semantic-ui-react';
import { updateMortgageStart } from 'src/actions/Actions';
import { renderDateTime, renderInput } from 'src/services/Utils';

class MortgageInputForm extends Component {

  render() {

    const {handleSubmit, updateMortgageStart, initialValues: {start}} = this.props;

    return (<Form onSubmit={handleSubmit}>
      <Form.Group widths='equal'>
        <Form.Field>
          <Form.Field>
            <label>Principal</label>
            <Field
              name='principal'
              component={renderInput}
              type='text'
              parse={parseFloat}
            />
          </Form.Field>
        </Form.Field>
        <Form.Field>
          <label>Rate</label>
          <Field
            name='rate'
            component={renderInput}
            type='text'
            parse={parseFloat}
          />
        </Form.Field>
      </Form.Group>
      <Form.Group widths='equal'>
        <Form.Field>
          <label>Monthly payment</label>
          <Field
            name='monthlyPayment'
            component={renderInput}
            type='text'
            parse={parseFloat}
          />
        </Form.Field>
        <Form.Field>
          <label>Mortgage start</label>
          <Field
            name='start'
            value={start}
            component={renderDateTime}
            type='text'
            onChange={(event, value) => updateMortgageStart(value.valueOf())}
          />
        </Form.Field>
      </Form.Group>
      <Button primary type='submit'>Calculate</Button>
    </Form>);
  }
}

MortgageInputForm.propTypes = {
  onSubmit: PropTypes.func.isRequired,
  updateMortgageStart: PropTypes.func.isRequired
};

let decoratedForm = reduxForm({
    form: 'mortgageInputForm'
  }
)(MortgageInputForm);

decoratedForm = connect(state => ({
    initialValues: state.calculateMortgageReducer.initialValues.mortgage
  }),
  dispatch => ({updateMortgageStart: start => dispatch(updateMortgageStart(parseInt(start)))}),
  null,
  {withRef: true}
)(decoratedForm);

export default decoratedForm;
