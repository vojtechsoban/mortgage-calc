import React, {Component, PropTypes} from 'react';
import {connect} from 'react-redux';
import {EditExtraPayment, RemoveExtraPayment} from '../actions/Actions';

const ExtraPayment = ({extraPayment, onClickHandler, removeExtraPayment}) => (
    <li><span onClick={()=> {
        onClickHandler(extraPayment.paymentIndex)
    }}>
        PaymentIndex={extraPayment.paymentIndex}, amount={extraPayment.amount}</span>
        <span onClick={()=> {
            removeExtraPayment(extraPayment.paymentIndex)
        }}> [x]</span>
    </li>
);

const mapStateToProps = state => {
    return {extraPayment: state.extraPayment}
};

const mapDispatchToProps = dispatch => {
    return {
        onClickHandler: (paymentIndex) => {
            dispatch(EditExtraPayment(paymentIndex))
        },
        removeExtraPayment: (paymentIndex) => {
            dispatch(RemoveExtraPayment(paymentIndex))
        }
    }
};

const ExtraPaymentList = ({extraPayments, onClickHandler, removeExtraPayment}) => {

    if (!extraPayments || extraPayments.length === 0) {
        return null;
    }

    return (<ul>
        {extraPayments.map((extraPayment) =>
                               <ExtraPayment
                                   key={extraPayment.paymentIndex}
                                   onClickHandler={onClickHandler}
                                   removeExtraPayment={removeExtraPayment}
                                   extraPayment={extraPayment}
                               />
        )}
    </ul>);
};

export default connect(mapStateToProps, mapDispatchToProps)(ExtraPaymentList);
