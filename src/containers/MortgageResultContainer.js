import MortgageResult from '../components/MortgageResult';
import {connect} from 'react-redux';

export default connect((state) => {
  return {
    mortgage: state.calculateMortgageReducer.mortgage,
    monthlyPaymentsHidden: state.calculateMortgageReducer.monthlyPaymentsHidden
  }
})(MortgageResult)
