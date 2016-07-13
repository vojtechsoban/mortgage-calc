import {combineReducers} from 'redux'
import {reducer as formReducer} from 'redux-form';

import { calculate } from '../services/MortgageCalc';
import Mortgage from '../models/Mortgage';

// The reducer is called during some initialization before the initial state is assigned.
// Even if we use initial state in createStore we need to use default argument and assing null
const clickReducer = (state = null, action) => {

    switch (action.type) {
        case 'CLICK':
            const result = Object.assign({}, state);
            result.click1++;
            result.name = action.type;
            return result;
    }

    return state;
};

const calculateMortgageReducer = (state = null, action) => {
    switch (action.type) {
        case 'CALCULATE_MORTGAGE':
            const result = Object.assign({}, state);
            result.mortgage = calculate(new Mortgage(action.formData.principal, action.formData.rate/100, action.formData.monthlyPayment));
            return result;
        default:
            return state;
    }
};

const rootReducer = combineReducers({clickReducer, calculateMortgageReducer, form: formReducer});

export default rootReducer
