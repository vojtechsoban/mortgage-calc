import React from 'react';
import PropTypes from 'prop-types';

const RegularPayment = ({payment}) => (
  <tr>
    <td>{/*TODO order*/}</td>
    <td>{/*TODO date*/}</td>
    <td>{payment.toFixed(0)}</td>
    <td></td>
    <td>{/*TODO fill in principalPart*/}{payment.toFixed(0)}</td>
    <td>{/*TODO fill in installmentPart*/}0</td>
    <td>Extra payment</td>
  </tr>
);

RegularPayment.propTypes = {
  type: PropTypes.oneOf(['extra']).isRequired,
  payment: PropTypes.number.isRequired,
};

export default RegularPayment;
