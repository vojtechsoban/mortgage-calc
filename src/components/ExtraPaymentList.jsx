import React, {Component, PropTypes} from 'react';
import {reduxForm, Field} from 'redux-form';
import {Button} from 'react-bootstrap';
import {connect} from 'react-redux';
import {EditExtraPayment, RemoveExtraPayment, CancelExtraPaymentEdit} from '../actions/Actions';
import {Table} from 'react-bootstrap';
import {renderInput, renderRadio} from "../services/Utils";

const ExtraPayment = ({extraPayment, extraPaymentActions}) => (
  <tr onClick={() => {
    extraPaymentActions.onClickHandler(extraPayment.paymentIndex)
  }}>
    <td>{extraPayment.paymentIndex}</td>
    <td>{extraPayment.edit === true ? <Field name="amount" component={renderInput} type="text"/> : extraPayment.amount}</td>
    <td>{extraPayment.type}</td>
    <td >
      {extraPayment.edit && <Button type="submit">OK</Button>}
      {extraPayment.edit && <Button onClick={(e) => {
        e.stopPropagation();
        extraPaymentActions.cancelExtraPaymentEdit(extraPayment.paymentIndex)
      }}>Cancel</Button>}
      <Button onClick={(e) => {
        e.stopPropagation();
        extraPaymentActions.removeExtraPayment(extraPayment.paymentIndex)
      }}>Delete</Button>
    </td>
  </tr>
);

const mapStateToProps = state => {
  return {initialValues: state.calculateMortgageReducer.editingExtraPayment}
};

const mapDispatchToProps = dispatch => {
  return {
    extraPaymentActions: {
      onClickHandler: (paymentIndex) => {
        dispatch(EditExtraPayment(paymentIndex))
      },
      removeExtraPayment: (paymentIndex) => {
        dispatch(RemoveExtraPayment(paymentIndex))
      },
      cancelExtraPaymentEdit: (paymentIndex) => {
        dispatch(CancelExtraPaymentEdit(paymentIndex))
      }
    }
  }
};

const ExtraPaymentList = ({extraPayments, extraPaymentActions, handleSubmit}) => {
  
  if (!extraPayments || extraPayments.length === 0) {
    return null;
  }
  
  return (<form onSubmit={handleSubmit}><Table striped bordered condensed hover>
    <thead>
    <tr>
      <th>Payment index</th>
      <th>Payment</th>
      <th>Type</th>
      <th/>
    </tr>
    </thead>
    <tbody>
    {extraPayments.map((extraPayment) =>
      <ExtraPayment
        key={extraPayment.paymentIndex}
        extraPayment={extraPayment}
        extraPaymentActions={extraPaymentActions}
      />
    )}
    </tbody>
  </Table></form>);
};

export default connect(mapStateToProps, mapDispatchToProps)(reduxForm({
  form: 'extraPaymentEditForm',
  enableReinitialize: true
})(ExtraPaymentList));
