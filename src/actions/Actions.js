import * as actionTypes from 'src/constants/ActionTypes';

export const CalculateMortgageAction = (formData) => {
  return {
    type: actionTypes.CALCULATE_MORTGAGE,
    formData
  };
};

export const AddExtraPaymentAction = (formData) => {
  return {
    type: actionTypes.ADD_EXTRA_PAYMENT,
    formData
  };
};

export const RemoveExtraPayment = (paymentIndex) => {
  return {type: actionTypes.REMOVE_EXTRA_PAYMENT, paymentIndex};
};

export const CancelExtraPaymentEdit = (paymentIndex) => {
  return {type: actionTypes.CANCEL_EXTRA_PAYMENT_EDIT, paymentIndex};
};

export const SaveExtraPayment = (extraPayment) => {
  return {type: actionTypes.SAVE_EXTRA_PAYMENT, extraPayment};
};

export const EditExtraPayment = (paymentIndex) => {
  return {type: actionTypes.EDIT_EXTRA_PAYMENT, paymentIndex};
};

export const updateMortgageStart = start => ({
  type: actionTypes.UPDATE_MORTGAGE_START,
  start: start
});

export const updateExtraPaymentDate = date => ({
  type: actionTypes.UPDATE_EXTRA_PAYMENT_DATE,
  date: date
});

export const hideMonthlyPaymentChange = () => ({
  type: actionTypes.HIDE_MONTHLY_PAYMENT_CHAGE
});

