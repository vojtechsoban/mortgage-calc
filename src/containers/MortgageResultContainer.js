import MortgageResult from '../components/MortgageResult';
import { connect } from 'react-redux';

export default connect((state) => {
    return {
        state,
        mortgage: state.calculateMortgageReducer.mortgage
    }})(MortgageResult)
