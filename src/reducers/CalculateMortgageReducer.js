import {calculate} from '../services/MortgageCalc';
import {Mortgage, MortgageParameters, ExtraPayment} from '../models/Mortgage';
import * as actionTypes from '../constants/ActionTypes';
import moment from 'moment';

export default (state = null, action) => {
  
  const result = Object.assign({}, state);
  
  switch (action.type) {
    case actionTypes.CALCULATE_MORTGAGE: {

      const parameters = new MortgageParameters(
        0,
        action.formData.rate / 100, parseFloat(action.formData.monthlyPayment));

      result.mortgage = calculate(new Mortgage(parseFloat(action.formData.principal), [parameters], state.extraPayments, state.start));
      return result;
    }

    case actionTypes.ADD_EXTRA_PAYMENT: {

      const extraPaymentToAdd = new ExtraPayment(action.formData.paymentIndex, action.formData.amount, action.formData.type);
      extraPaymentToAdd.date = moment(state.start).add(parseInt(action.formData.paymentIndex) + 1, 'M').format('D.M.Y');

      // check whether edit existing extra payment or add a new one
      for (let i = 0; i < result.extraPayments.length; i++) {
        if (extraPaymentToAdd.paymentIndex === result.extraPayments[i].paymentIndex) {
          const extraPayments = result.extraPayments.slice();
          extraPayments[i] = extraPaymentToAdd;
          result.extraPayments = [...extraPayments];
          return result;
        }
      }

      result.extraPayments = [...result.extraPayments, extraPaymentToAdd];

      result.initialValues.extraPayments.paymentIndex += 12;
      result.initialValues.extraPayments.date = moment(result.initialValues.extraPayments.date).add(12, 'M').valueOf();

      return result;
    }

    case actionTypes.UPDATE_MORTGAGE_START: {

      result.start = action.start;

      result.extraPayments = result.extraPayments.map(extraPayment => {
        const date = moment(result.start).add(extraPayment.paymentIndex + 1, 'M').format('D.M.Y');
        return Object.assign({}, extraPayment, {date});
      });

      if (result.mortgage && result.mortgage.installments) {
        result.mortgage.installments = result.mortgage.installments.map(extraPayment => {
          const date = moment(result.start).add(extraPayment.count + 1, 'M').format('D.M.Y');
          return Object.assign({}, extraPayment, {date});
        });
        result.mortgage = Object.assign({}, result.mortgage);
      }

      result.initialValues.extraPayments.date = moment(result.start)
        .add(result.initialValues.extraPayments.paymentIndex + 1, 'M')
        .valueOf();
      result.initialValues = Object.assign({}, result.initialValues);

      return result;
    }

    case actionTypes.REMOVE_EXTRA_PAYMENT: {
      result.extraPayments = state.extraPayments
        .filter(extraPayment => extraPayment.paymentIndex !== action.paymentIndex);
      return result;
    }

    case actionTypes.EDIT_EXTRA_PAYMENT: {
      result.extraPayments = result.extraPayments.map(extraPayment => {
        const copy = Object.assign({}, extraPayment);
        copy.edit = extraPayment.paymentIndex === action.paymentIndex;
        return copy;
      });
      result.editingExtraPayment = state.extraPayments.find(extraPayment => extraPayment.paymentIndex === action.paymentIndex);
      return result;
    }

    case actionTypes.CANCEL_EXTRA_PAYMENT_EDIT: {
      result.extraPayments = result.extraPayments.map(extraPayment => {
        const copy = Object.assign({}, extraPayment);
        copy.edit = false;
        return copy;
      });
      return result;
    }

    case actionTypes.SAVE_EXTRA_PAYMENT: {

      const paymentIndex = state.editingExtraPayment.paymentIndex;

      result.extraPayments = result.extraPayments.map(extraPayment => {
        if (extraPayment.paymentIndex === paymentIndex) {
          const copy = Object.assign({}, state.editingExtraPayment);
          copy.amount = action.extraPayment.amount;
          copy.edit = false;
          return copy;
        } else {
          const copy = Object.assign({}, extraPayment);
          copy.edit = false;
          return copy;
        }
      });

      result.editingExtraPayment = null;

      return result;
    }

    case actionTypes.HIDE_MONTHLY_PAYMENT_CHAGE: {
      result.monthlyPaymentsHidden = !state.monthlyPaymentsHidden;
      return result;
    }

    default:
      return state;
  }
};
