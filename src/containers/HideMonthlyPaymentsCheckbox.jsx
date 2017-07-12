import React from 'react';
import PropTypes from 'prop-types';
import {connect} from 'react-redux';
import {Checkbox} from 'react-bootstrap';
import {hideMonthlyPaymentChange} from "../actions/Actions";

const HideMonthlyPaymentCheckbox = ({checked, onChange}) => (
  <Checkbox checked={checked} onChange={onChange}>Hide monthly payments</Checkbox>
);

HideMonthlyPaymentCheckbox.propTypes = {
  checked: PropTypes.bool.isRequired,
  onChange: PropTypes.func.isRequired
};

export default connect(
  state => ({
    checked: state.calculateMortgageReducer.monthlyPaymentsHidden
  }),
  dispatch => ({onChange: () => dispatch(hideMonthlyPaymentChange())}))
(HideMonthlyPaymentCheckbox);
