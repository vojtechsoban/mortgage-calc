import {calculate} from '../services/MortgageCalc';
import {Mortgage, MortgageParameters} from '../models/Mortgage';
import * as actionTypes from '../constants/ActionTypes';

// The reducer is called during some initialization before the initial state is assigned.
// Even if we use initial state in createStore we need to use default argument and assing null
export default (state = null, action) => {
    const result = Object.assign({}, state);
    switch (action.type) {
        case actionTypes.CALCULATE_MORTGAGE:
            const parameters = new MortgageParameters(0, action.formData.rate / 100, action.formData.monthlyPayment);
            result.mortgage = calculate(new Mortgage(action.formData.principal, [parameters]));
            return result;
        case actionTypes.ADD_EXTRA_PAYMENT:
            console.log('add extra payment formData=', action.formData);
            if (!result.extraPayments) {
                // TODO initialize extra payments in default state
                result.extraPayments = [];
            }

            result.extraPayments = [...result.extraPayments, action.formData];

            console.log('add extra payment payments=', result.extraPayments);
            return result;
        default:
            return state;
    }
};
