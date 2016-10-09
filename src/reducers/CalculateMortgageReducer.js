import { calculate } from '../services/MortgageCalc';
import { Mortgage, MortgageParameters, ExtraPayment} from '../models/Mortgage';
import * as actionTypes from '../constants/ActionTypes';

// The reducer is called during some initialization before the initial state is assigned.
// Even if we use initial state in createStore we need to use default argument and assing null
export default (state = null, action) => {

    const result = Object.assign({}, state);

    switch (action.type) {
        case actionTypes.CALCULATE_MORTGAGE:
            const parameters = new MortgageParameters(0, action.formData.rate / 100, parseFloat(action.formData.monthlyPayment));
            result.mortgage = calculate(new Mortgage(parseFloat(action.formData.principal), [parameters], state.extraPayments));
            return result;

        case actionTypes.ADD_EXTRA_PAYMENT:

            if (!result.extraPayments) {
                // TODO initialize extra payments in default state
                result.extraPayments = [];
            }

            const extraPaymentToAdd = new ExtraPayment(action.formData.paymentIndex, action.formData.amount, action.formData.type);

            // check whether edit existing extra payment or add a new one
            for (let i=0; i < result.extraPayments.length; i++) {
                if (extraPaymentToAdd.paymentIndex === result.extraPayments[i].paymentIndex) {
                    const extraPayments = result.extraPayments.slice();
                    extraPayments[i] = extraPaymentToAdd;
                    result.extraPayments = [...extraPayments];
                    return result;
                }
            }

            result.extraPayments = [...result.extraPayments, extraPaymentToAdd];

            return result;

        default:
            return state;
    }
};
