import {connect} from 'react-redux';
import MortgageResult from 'src/components/MortgageResult';

export default connect((state) => {
  return {
    mortgage: state.calculateMortgageReducer.mortgage,
    monthlyPaymentsHidden: state.calculateMortgageReducer.monthlyPaymentsHidden
  };
})(MortgageResult);
