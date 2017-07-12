import moment from 'moment';

// properties must match reducer names - see reducers/index.js

const start = moment().valueOf();

export const initialState = {
    calculateMortgageReducer: {
        mortgage: null,
        editingExtraPayment: null,
        extraPayments: [],
        start,
        monthlyPaymentsHidden: true,
        initialValues: {
            mortgage: {
                principal: 2000000,
                rate: 3.79,
                monthlyPayment: 10000,
                start,
            },
            extraPayments: {
                paymentIndex: 11,
                type: 'constant_duration',
                date: moment(start).add(12, 'M').valueOf(),
                amount: 0.1
            }
        }
    }
};

