import React, {Component, PropTypes} from 'react';
import {connect} from 'react-redux';
import {EditExtraPayment, RemoveExtraPayment} from '../actions/Actions';
import {Table} from 'react-bootstrap';

const ExtraPayment = ({extraPayment, onClickHandler, removeExtraPayment}) => (
  <tr onClick={() => {
    onClickHandler(extraPayment.paymentIndex)
  }}>
    <td>{extraPayment.paymentIndex}</td>
    <td>{extraPayment.amount}</td>
    <td>{extraPayment.type}</td>
    <td onClick={() => {
      removeExtraPayment(extraPayment.paymentIndex)
    }}>
      [x]
    </td>
  </tr>
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
  
  return (<Table striped bordered condensed hover>
    <thead>
    <tr>
      <th>Payment index</th>
      <th>Payment</th>
      <th>Type</th>
      <th></th>
    </tr>
    </thead>
    <tbody>
    {extraPayments.map((extraPayment) =>
      <ExtraPayment
        key={extraPayment.paymentIndex}
        onClickHandler={onClickHandler}
        removeExtraPayment={removeExtraPayment}
        extraPayment={extraPayment}
      />
    )}
    </tbody>
  </Table>);
};

export default connect(mapStateToProps, mapDispatchToProps)(ExtraPaymentList);
