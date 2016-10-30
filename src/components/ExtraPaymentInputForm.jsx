import React, {Component, PropTypes} from "react";
import {reduxForm, Field} from "redux-form";
import {connect} from "react-redux";
import {renderInput} from "../services/Utils"; // imported Field

class ExtraPaymentInputForm extends Component {
    render() {

        const {handleSubmit} = this.props;

        return (<form onSubmit={handleSubmit}>
                <div>
                    <label>Payment index</label>
                    <Field name="paymentIndex" component={renderInput} type="text"/>
                    <label>Amount</label>
                    <Field name="amount" component={renderInput} type="text"/>
                    <label>Type</label>
                    <Field name="type" component="input" type="radio" value="constant_payment" /> Constant payment
                    <Field name="type" component="input" type="radio" value="constant_duration" /> Constant duration
                    <button type="submit">Add extra payment</button>
                </div>
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
