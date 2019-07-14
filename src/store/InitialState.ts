import moment from 'moment'
import { RootState } from '../types/state'

const start = moment().valueOf()

export const initialState: RootState = {
  calculateMortgageReducer: {
    mortgage: undefined,
    editingExtraPayment: undefined,
    edit: false,
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
        paymentIndex: 12,
        type: 'constant_duration',
        date: moment(start).add(12, 'M').valueOf(),
        amount: 0.1,
      },
    },
  },
}

