import React from 'react';
import PropTypes from 'prop-types';
import {reduxForm} from 'redux-form';
import {connect} from 'react-redux';
import {EditExtraPayment, RemoveExtraPayment, CancelExtraPaymentEdit} from '../actions/Actions';
import {Table} from 'semantic-ui-react';
import ExtraPayment from './ExtraPayment';

const mapStateToProps = state => {
  return {initialValues: state.calculateMortgageReducer.editingExtraPayment};
};

const mapDispatchToProps = dispatch => {
  return {
    onClickHandler: (paymentIndex) => {
      dispatch(EditExtraPayment(paymentIndex));
    },
    removeExtraPayment: (paymentIndex) => {
      dispatch(RemoveExtraPayment(paymentIndex));
    },
    cancelExtraPaymentEdit: (paymentIndex) => {
      dispatch(CancelExtraPaymentEdit(paymentIndex));
    }
  };
};

const ExtraPaymentList = ({extraPayments, onClickHandler, cancelExtraPaymentEdit, removeExtraPayment, handleSubmit}) => {

  if (!extraPayments || extraPayments.length === 0) {
    return null;
  }

  return (<form onSubmit={handleSubmit}><Table>
    <thead>
    <tr>
      <th>Payment index</th>
      <th>Payment date</th>
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
        onClickHandler={onClickHandler}
        cancelExtraPaymentEdit={cancelExtraPaymentEdit}
        removeExtraPayment={removeExtraPayment}
      />
    )}
    </tbody>
  </Table></form>);
};

ExtraPaymentList.propTypes = {
  extraPayments: PropTypes.array.isRequired,
  handleSubmit: PropTypes.func.isRequired
};

export default connect(mapStateToProps, mapDispatchToProps)(reduxForm({
  form: 'extraPaymentEditForm',
  enableReinitialize: true
})(ExtraPaymentList));
