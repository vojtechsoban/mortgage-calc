import 'dash-assert'

export class Mortgage {

  principal: number
  installmentSum: number
  installmentCount: number
  start: number
  parameters: Array<MortgageParameters>
  extraPayments: Array<ExtraPayment>

    /**
     *
     * @param {number} principal
     * @param {Array} parameters
     * @param {Array} extraPayments
     * @param {Number} start timestamp
     */
  constructor(
      principal: number,
      parameters: Array<MortgageParameters> | MortgageParameters,
      extraPayments: Array<ExtraPayment> = [],
      start: number = 0,
    ) {
    this.principal = principal

    if (parameters instanceof MortgageParameters) {
      this.parameters = [parameters]
    } else {
      this.parameters = parameters
    }
    this.installmentSum = 0
    this.installmentCount = 0
    this.extraPayments = extraPayments
    this.start = start
  }
}

/**
 * Mortgage parameters
 */
export class MortgageParameters {
  rate: number
  payment: number
  payments: number

    /**
     * Constructor
     * @param payments number of payments for which this parameters are valid --> fixation period
     * @param rate installment rate
     * @param payment monthly payment
     */
  constructor(payments, rate, payment) {
    this.payments = payments
    this.rate = rate
    this.payment = payment
  }
}

export class InstallmentSum {

  principalPart: number = 0
  installmentPart: number = 0

  constructor() {
    this.reset()
  }

  reset() {
    this.principalPart = 0
    this.installmentPart = 0
  }

  add(principalPart, installmentPart) {
    this.installmentPart += installmentPart
    this.principalPart += principalPart
  }
}

/**
 * Extra payment
 */
export class ExtraPayment {

  paymentIndex: number
  amount: number
  type: string

    /**
     * Extra payment constructor
     * @param {number} paymentIndex
     * @param {number} amount
     * @param {string} type
     */
  constructor(paymentIndex, amount, type = 'default') {
    this.paymentIndex = paymentIndex
    this.amount = amount
    this.type = type
  }
}
