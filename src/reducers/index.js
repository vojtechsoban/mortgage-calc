import {combineReducers} from 'redux'

// The reducer is called during some initialization before the initial state is assigned.
// Even if we use initial state in createStore we need to use default argument and assing null
const clickReducer = (state = null, action) => {

    console.log(`click reducer=${state}, action.type=${action.type}`);

    switch (action.type) {
        case 'CLICK':
            const result = Object.assign({}, state);
            result.click1++;
            result.name = action.type;
            return result;
    }

    return state;
};

const anotherReducer = (state = null, action) => {
    console.log(`another reducer=${state}, action.type=${action.type}`);
    return state
};

const rootReducer = combineReducers({clickReducer, anotherReducer});

export default rootReducer