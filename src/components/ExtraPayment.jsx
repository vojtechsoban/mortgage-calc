import React, {Component, PropTypes} from 'react';

const renderExtraPayment = (extraPayment) => {
    return (<li key={extraPayment.paymentIndex}>PaymentIndex={extraPayment.paymentIndex}, amount={extraPayment.amount}</li>);
};

export default function (state) {

    if (!state.extraPayments || state.extraPayments.length === 0) {
        return null;
    }

    return (<ul>{state.extraPayments.map(renderExtraPayment)}</ul>);
}
