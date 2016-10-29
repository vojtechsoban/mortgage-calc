import React, {Component, PropTypes} from 'react';
import {connect} from 'react-redux';
import {reduxForm, Field} from 'redux-form'
import {renderInput} from '../services/Utils';

class MortgageInputForm extends Component {

    render() {

        const {handleSubmit} = this.props;

        return (<form onSubmit={handleSubmit}>
                <div>
                    <label>Principal</label>
                    <Field name="principal" component={renderInput} type="text"/>
                </div>
                <div>
                    <label>Rate</label>
                    <Field name="rate" component={renderInput} type="text"/>
                </div>
                <div>
                    <label>Monthly payment</label>
                    <Field name="monthlyPayment" component={renderInput} type="text"/>
                </div>
                <div>
                    <button type="submit">Calculate</button>
                </div>
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
