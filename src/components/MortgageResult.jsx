import React, { Component } from 'react';
import { Table } from 'semantic-ui-react';
import PaymentSchedule from 'src/components/paymentschedule/PaymentSchedule';
import HideMonthlyPaymentCheckbox from 'src/containers/HideMonthlyPaymentsCheckbox';

export default class MortgageResult extends Component {

  render() {
    if (!this.props.mortgage) {
      return null;
    }

    const {monthlyPaymentsHidden, mortgage: {installmentCount, installmentSum, installments}} = this.props;

    return (
      <div>
        <Table>
          <tbody>
          <tr>
            <td>Installment count</td>
            <td>{installmentCount}</td>
          </tr>
          <tr>
            <td>Installment sum</td>
            <td>{installmentSum.toFixed(0)}</td>
          </tr>
          <Table.Row>
            <Table.Cell colSpan={2}>
              <HideMonthlyPaymentCheckbox/>
            </Table.Cell>
          </Table.Row>
          </tbody>
        </Table>

        <PaymentSchedule installments={installments} monthlyPaymentsHidden={monthlyPaymentsHidden}/>

      </div>
    );
  }
}
