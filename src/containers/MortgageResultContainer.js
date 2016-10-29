import MortgageResult from '../components/MortgageResult';
import { connect } from 'react-redux';

export default connect((state) => {
    return {
        mortgage: state.calculateMortgageReducer.mortgage
    }})(MortgageResult)
