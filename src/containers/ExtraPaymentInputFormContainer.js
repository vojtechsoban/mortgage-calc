import {reduxForm} from 'redux-form';
import {ExtraPaymentInputForm, fields} from '../components/ExtraPaymentInputForm';
import {AddExtraPaymentAction} from '../actions/Actions';

const mapStateToProps = (state) => {
    return {
        // TODO add initial values to state and extract these values from the state
        initialValues: {paymentIndex: 12, amount: 0.1}
    }
};

const mapDispatchToProps = (dispatch) => {
    return {
        onSubmit: (formData) => dispatch(AddExtraPaymentAction(formData))
    }
};

export default reduxForm({
                             form: 'extraPaymentInputForm',
                             fields
                         },
                         mapStateToProps,
                         mapDispatchToProps
)(ExtraPaymentInputForm);
