import {combineReducers} from 'redux';
import {reducer as formReducer} from 'redux-form';
import calculateMortgageReducer from 'src/reducers/CalculateMortgageReducer';

// name 'form' of the form reducer is required, TODO check if the name could be changed to avoid some name clash
const rootReducer = combineReducers({calculateMortgageReducer, form: formReducer});

export default rootReducer;
