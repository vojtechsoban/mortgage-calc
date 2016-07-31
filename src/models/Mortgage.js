import assert from 'assert';
import 'dash-assert';

export class Mortgage {

    /**
     *
     * @param {number} principal
     * @param {object} parameters
     */
    constructor(principal, parameters) {
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
    }
}

export class MortgageParameters {

    /**
     *
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
