import PropTypes from 'prop-types';
import React from 'react';
import { connect } from 'react-redux';
import { Checkbox } from 'semantic-ui-react';
import { hideMonthlyPaymentChange } from '../actions/Actions';

const HideMonthlyPaymentCheckbox = ({checked, onChange}) => (
  <Checkbox checked={checked} onChange={onChange} toggle label="Hide monthly payments"/>
);

HideMonthlyPaymentCheckbox.propTypes = {
  checked: PropTypes.bool.isRequired,
  onChange: PropTypes.func.isRequired,
};

export default connect(
  state => ({
    checked: state.calculateMortgageReducer.monthlyPaymentsHidden,
  }),
  dispatch => ({onChange: () => dispatch(hideMonthlyPaymentChange())})
)(HideMonthlyPaymentCheckbox);
