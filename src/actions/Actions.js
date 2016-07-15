import * as actionTypes from '../../src/constants/ActionTypes';

export const CalculateMortgageAction = (formData = {}) => {
    return {
        type: actionTypes.CALCULATE_MORTGAGE,
        formData
    }
};
