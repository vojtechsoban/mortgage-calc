import * as actionTypes from '../../src/constants/ActionTypes';

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

export const EditExtraPayment = (paymentIndex) => {
    return {type: actionTypes.EDIT_EXTRA_PAYMENT, paymentIndex};
};

