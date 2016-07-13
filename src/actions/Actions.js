export const CalculateMortgageAction = (formData = {}) => {
    return {
        type: 'CALCULATE_MORTGAGE',
        formData
    }
};
