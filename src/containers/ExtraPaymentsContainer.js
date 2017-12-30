import { connect } from 'react-redux';
import ExtraPayments from 'src/components/ExtraPaymentList';

export default connect((state) => {
    return {
        extraPayments: state.calculateMortgageReducer.extraPayments
    };})(ExtraPayments);
