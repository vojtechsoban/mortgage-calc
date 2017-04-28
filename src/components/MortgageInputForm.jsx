import React, {Component, PropTypes} from 'react';
import {connect} from 'react-redux';
import {reduxForm, Field} from 'redux-form'
import {FormGroup, ControlLabel, Button} from 'react-bootstrap';
import {renderInput} from '../services/Utils';

class MortgageInputForm extends Component {

    render() {

        const {handleSubmit} = this.props;

        return (<form onSubmit={handleSubmit}>
                <FormGroup>
                    <ControlLabel>Principal</ControlLabel>
                    <Field name="principal" component={renderInput} type="text" className="form-control" />
                </FormGroup>
                <FormGroup>
                    <label>Rate</label>
                    <Field name="rate" component={renderInput} type="text" className="form-control" />
                </FormGroup>
                <FormGroup>
                    <label>Monthly payment</label>
                    <Field name="monthlyPayment" component={renderInput} type="text" className="form-control" />
                </FormGroup>
                <FormGroup>
                    <Button type="submit">Calculate</Button>
                </FormGroup>
            </form>
        )
    }
}

MortgageInputForm.propTypes = {
    onSubmit: PropTypes.func.isRequired
};

let decoratedForm = reduxForm({
                                  form: 'mortgageInputForm'
                              }
)(MortgageInputForm);

decoratedForm = connect(state => {
    return {initialValues: state.calculateMortgageReducer.initialValues.mortgage};
})(decoratedForm);

export default decoratedForm;
