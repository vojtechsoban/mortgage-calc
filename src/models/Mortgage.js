import assert from 'assert';
import 'dash-assert';

export class Mortgage {

    /**
     *
     * @param {number} principal
     * @param {Array} parameters
     * @param {Array} extraPayments
     */
    constructor(principal, parameters, extraPayments=[]) {
        assert.isNotNull(principal);
        this.principal = principal;

        assert.isNotNull(parameters);
        if (parameters.constructor.name === 'MortgageParameters') {
            this.parameters = [parameters];
        } else {
            assert.isArray(parameters);
            assert.isNotEmpty(parameters);
            this.parameters = parameters;
        }
        this.installmentSum = 0;
        this.installmentCount = 0;

        this.extraPayments = extraPayments;
    }
}

/**
 * Mortgage parameters
 */
export class MortgageParameters {

    /**
     * Constructor
     * @param payments number of payments for which this parameters are valid --> fixation period
     * @param rate installment rate
     * @param payment monthly payment
     */
    constructor(payments, rate, payment) {
        this.payments = payments;
        this.rate = rate;
        this.payment = payment;
    }
}

export class InstallmentSum {

    constructor() {
        this.reset();
    }

    reset() {
        this.principalPart = 0;
        this.installmentPart = 0;
    }

    add(principalPart, installmentPart) {
        this.installmentPart += installmentPart;
        this.principalPart += principalPart;
    }
}

/**
 * Extra payment
 */
export class ExtraPayment {
    /**
     * Extra payment constructor
     * @param {number} paymentIndex
     * @param {number} amount
     * @param {string} type
     */
    constructor(paymentIndex, amount, type = 'default') {
        this.paymentIndex = parseInt(paymentIndex);
        this.amount = parseFloat(amount);
        this.type = type;
    }
}
