import {reduxForm} from 'redux-form';
import {MortgageInputForm, fields} from '../components/MortgageInputForm';
import {CalculateMortgageAction} from '../actions/Actions';

const mapStateToProps = (state) => {
    return {
        // TODO add initial values to state and extract these values from the state
        initialValues: {principal: 2000000, rate: 3.79, monthlyPayment: 10000}
    }
};

const mapDispatchToProps = (dispatch) => {
    return {
        onSubmit: (formData) => dispatch(CalculateMortgageAction(formData))
    }
};

export default reduxForm({
                             form: 'mortgageInputForm',
                             fields
                         },
                         mapStateToProps,
                         mapDispatchToProps
)(MortgageInputForm);
