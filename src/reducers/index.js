import {combineReducers} from 'redux'
import {reducer as formReducer} from 'redux-form';

// The reducer is called during some initialization before the initial state is assigned.
// Even if we use initial state in createStore we need to use default argument and assing null
const clickReducer = (state = null, action) => {

    // console.log(`clickReducer(state=${state}, action.type=${action.type})`);

    switch (action.type) {
        case 'CLICK':
            const result = Object.assign({}, state);
            result.click1++;
            result.name = action.type;
            return result;
    }

    return state;
};

// redux-form assets ...
const loadReducer = (state = null, action) => {
    switch (action.type) {
        case 'LOAD':
            const result = Object.assign({}, state);
            state.user.firstName = 'loaded first name';
            state.user.lastName = 'loaded last name';
            return result;
        default:
            return state;
    }
};

const rootReducer = combineReducers({clickReducer, loadReducer, form: formReducer});

export default rootReducer
