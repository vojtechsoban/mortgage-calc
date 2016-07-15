import { calculate } from '../services/MortgageCalc';
import Mortgage from '../models/Mortgage';
import * as actionTypes from '../constants/ActionTypes';

// The reducer is called during some initialization before the initial state is assigned.
// Even if we use initial state in createStore we need to use default argument and assing null
export default (state = null, action) => {
    switch (action.type) {
        case actionTypes.CALCULATE_MORTGAGE:
            const result = Object.assign({}, state);
            result.mortgage = calculate(new Mortgage(action.formData.principal, action.formData.rate/100, action.formData.monthlyPayment));
            return result;
        default:
            return state;
    }
};
