import React from 'react';
import PropTypes from 'prop-types';
import {Table} from 'react-bootstrap';

const InstallmentDetails = ({installments, monthlyPaymentsHidden}) => {
  return (<Table striped bordered condensed hover>
    <thead>
    <tr>
      <th>order {monthlyPaymentsHidden}</th>
      <th>date</th>
      <th>monthly payment</th>
      <th>rate</th>
      <th>principal</th>
      <th>installment</th>
      <th>type</th>
    </tr>
    </thead>
    <tbody>
    {installments.map((item, id) => {
      return ((item.type !== 'regular' || ! monthlyPaymentsHidden)
        && <tr key={id}>
          <td>{typeof item.count === 'number' ? item.count + 1 : null}</td>
          <td>{item.date}</td>
          <td>{item.payment ? item.payment.toFixed(0) : null}</td>
          <td>{item.rate ? (item.rate * 100).toFixed(2) : null}</td>
          <td>{item.principalPart ? item.principalPart.toFixed(0) : null}</td>
          <td>{item.installmentPart ? item.installmentPart.toFixed(0) : null}</td>
          <td>{item.type}</td>
        </tr>
      );
    })}
    </tbody>
  </Table>);
};

InstallmentDetails.propTypes = {
  installments: PropTypes.array.isRequired,
  monthlyPaymentsHidden: PropTypes.bool.isRequired
};

export default InstallmentDetails;
