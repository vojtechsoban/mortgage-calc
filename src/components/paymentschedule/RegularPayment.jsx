import React from 'react';
import PropTypes from 'prop-types';

const RegularPayment = ({count, date, payment, rate, principalPart, installmentPart}) => (
  <tr>
    <td>{count + 1}</td>
    <td>{date}</td>
    <td>{payment.toFixed(0)}</td>
    <td>{(rate * 100).toFixed(2)}</td>
    <td>{principalPart.toFixed(0)}</td>
    <td>{installmentPart.toFixed(0)}</td>
    <td>Regular payment</td>
  </tr>
);

RegularPayment.propTypes = {
  type: PropTypes.oneOf(['regular']).isRequired,
  count: PropTypes.number.isRequired,
  payment: PropTypes.number.isRequired,
  principalPart: PropTypes.number.isRequired,
  installmentPart: PropTypes.number.isRequired
};

export default RegularPayment;
