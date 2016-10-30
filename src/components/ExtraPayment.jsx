import React, {Component, PropTypes} from 'react';
import {RemoveExtraPayment} from '../actions/Actions'
import {connect} from 'react-redux';

class RenderExtraPayment extends Component {
    render() {
        const extraPayment = this.props.extraPayment;
        return (
            <li onClick={this.props.onClickHandler(extraPayment.paymentIndex)}>PaymentIndex={extraPayment.paymentIndex},
                amount={extraPayment.amount}</li>
        );
    }
}

const mapStateToProps = state => state;

const mapDispatchToProps = dispatch => {
    return {
        onClickHandler: (paymentIndex) => {
            dispatch(RemoveExtraPayment(paymentIndex))
        }
    }
};

const RenderExtraPaymentContainer = connect(mapStateToProps, mapDispatchToProps)(RenderExtraPayment);

export default function (state) {

    if (!state.extraPayments || state.extraPayments.length === 0) {
        return null;
    }

    return (<ul>{state.extraPayments.map(
        (extraPayment) => <RenderExtraPaymentContainer
            key={extraPayment.paymentIndex}
            extraPayment={extraPayment}/>)}</ul>);
}
