import React from 'react';
import PropTypes from 'prop-types';

const AnnualSummary = ({principalPart, installmentPart}) => (
  <tr>
    <td>{/* TODO period count*/}</td>
    <td>{/* TODO last payment year*/}</td>
    <td colSpan={2}>Annual summary</td>
    <td>{principalPart.toFixed(0)}</td>
    <td>{installmentPart.toFixed(0)}</td>
    <td/>
  </tr>
);

AnnualSummary.propTypes = {
  type: PropTypes.oneOf(['annual']).isRequired,
  principalPart: PropTypes.number.isRequired,
  installmentPart: PropTypes.number.isRequired
};

export default AnnualSummary;
