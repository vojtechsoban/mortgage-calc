import React from 'react';
import PropTypes from 'prop-types';
import {Table} from 'semantic-ui-react';
import RegularPayment from 'src/components/paymentschedule/RegularPayment';
import ExtraPayment from 'src/components/paymentschedule/ExtraPayment';
import AnnualSummary from 'src/components/paymentschedule/AnnualSummary';

/* eslint-disable react/display-name */
const PaymentScheduleListMapper = monthlyPaymentsHidden => (item, id) => {

  if (item.type === 'regular' && monthlyPaymentsHidden) {
    return null;
  }

  switch (item.type) {
    case 'regular':
      return (<RegularPayment key={id} {...item} />);
    case 'annual':
      return (<AnnualSummary key={id} {...item} />);
    case 'extra':
      return (<ExtraPayment key={id} {...item} />);
    default:
      console.warn(`Unsupported payment schedule type: ${item.type}`);
      return null;
  }
};

const PaymentSchedule = ({installments: paymentScheduleList, monthlyPaymentsHidden}) => {
  return (<Table>
    <thead>
    <tr>
      <th>order</th>
      <th>date</th>
      <th>monthly payment</th>
      <th>rate</th>
      <th>principal</th>
      <th>installment</th>
      <th>type</th>
    </tr>
    </thead>
    <tbody>
    {paymentScheduleList.map(PaymentScheduleListMapper(monthlyPaymentsHidden))}
    </tbody>
  </Table>);
};

PaymentSchedule.propTypes = {
  installments: PropTypes.array.isRequired,
  monthlyPaymentsHidden: PropTypes.bool.isRequired
};

export default PaymentSchedule;
