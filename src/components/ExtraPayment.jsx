import React from 'react';
import {Field} from 'redux-form';
import {Button} from 'semantic-ui-react';
import PropTypes from 'prop-types';
import {renderInput} from 'src/services/Utils';

const ExtraPayment = ({extraPayment, onClickHandler, cancelExtraPaymentEdit, removeExtraPayment}) => (
  <tr onClick={() => {
    onClickHandler(extraPayment.paymentIndex);
  }}>
    <td>{extraPayment.paymentIndex + 1}</td>
    <td>{extraPayment.date}</td>
    <td>
      {extraPayment.edit === true
        ? <Field name="amount" component={renderInput} type="text" parse={parseFloat}/>
        : extraPayment.amount}
    </td>
    <td>{extraPayment.type}</td>
    <td>
      {extraPayment.edit && <Button type="submit">OK</Button>}
      {extraPayment.edit && <Button onClick={(e) => {
        e.stopPropagation();
        cancelExtraPaymentEdit(extraPayment.paymentIndex);
      }}>Cancel</Button>}
      <Button onClick={(e) => {
        e.stopPropagation();
        removeExtraPayment(extraPayment.paymentIndex);
      }}>Delete</Button>
    </td>
  </tr>
);

ExtraPayment.propTypes = {
  extraPayment: PropTypes.object.isRequired,
  onClickHandler: PropTypes.func.isRequired,
  cancelExtraPaymentEdit: PropTypes.func.isRequired,
  removeExtraPayment: PropTypes.func.isRequired
};

export default ExtraPayment;
