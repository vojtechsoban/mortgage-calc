import { ExtraPayment, Mortgage, MortgageParameters } from '../models/Mortgage'

export interface RootState {
  calculateMortgageReducer: MortgageState
}

export interface MortgageState {
  start: number,
  extraPayments: Array<ExtraPayment>,
  mortgage?: Mortgage
  initialValues: InitialValues,
  edit: boolean
  editingExtraPayment?: ExtraPayment
  monthlyPaymentsHidden: boolean
}


export interface InitialValues {
  mortgage: {
    principal: number,
    rate: number,
    monthlyPayment: number,
    start: number,
  },
  extraPayments: {
    paymentIndex: number,
    type: string,
    date: number,
    amount: number,
  }
}
