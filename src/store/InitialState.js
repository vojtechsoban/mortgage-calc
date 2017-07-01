// properties must match reducer names - see reducers/index.js
export const initialState = {
    calculateMortgageReducer: {
        mortgage: null,
        editingExtraPayment: null,
        extraPayments: [],
        initialValues: {
            mortgage: {
                principal: 2000000,
                rate: 3.79,
                monthlyPayment: 10000
            },
            extraPayments: {
                paymentIndex: 11,
                type: 'constant_duration',
                amount: 0.1
            }
        }
    }
};

