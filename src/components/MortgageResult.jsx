import React, {Component} from 'react';
import {Table} from 'react-bootstrap';
import PaymentSchedule from './paymentschedule/PaymentSchedule';


export default class MortgageResult extends Component {

    render() {
        if (!this.props.mortgage) {
            return null;
        }

        const {monthlyPaymentsHidden, mortgage: {installmentCount, installmentSum, installments}} = this.props;

        return (
            <div>
                <Table striped bordered condensed hover>
                    <tbody>
                    <tr>
                        <td>Installment count</td>
                        <td>{installmentCount}</td>
                    </tr>
                    <tr>
                        <td>Installment sum</td>
                        <td>{installmentSum.toFixed(0)}</td>
                    </tr>
                    </tbody>
                </Table>

                <PaymentSchedule installments={installments} monthlyPaymentsHidden={monthlyPaymentsHidden}/>

            </div>
        )
    }
}
