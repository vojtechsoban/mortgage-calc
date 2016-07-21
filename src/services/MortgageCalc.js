import assert from 'assert';

import { MONTHS_IN_YEAR } from '../constants/Constants';
import { InstallmentSum } from '../models/Mortgage';

export const monthlyPayment = (principal, rate, payment = null) => {

    const installment = principal * rate / MONTHS_IN_YEAR;
    const principalPart = payment != null ? payment - installment : null;

    if (principalPart <= principal) {
        return {
            installmentPart: installment,
            principalPart
        }
    } else {
        return {
            installmentPart: installment,
            principalPart: principal
        }
    }
};

export const getMortgageParameters = (mortgage, paymentIndex) => {
  // FIXME return parameters based on index and payment count
    assert.isNotEmpty(mortgage.parameters);
    return mortgage.parameters[0];
};

/**
 *
 * @param {Mortgage} mortgageIn
 */
export const calculate = (mortgageIn) => {

    const mortgage = Object.assign({}, mortgageIn);
    mortgage.installments = [];

    const _monthlyPayment = monthlyPayment;

    let count = 0;
    let balance = mortgageIn.principal;
    let annualInstalment = new InstallmentSum();

    while (balance > 0 && ++count <= 1000) {

        const { rate, payment } = getMortgageParameters(mortgageIn, count);
        const {installmentPart, principalPart} = _monthlyPayment(balance, rate, payment);

        balance -= principalPart;
        mortgage.installmentSum += installmentPart;
        mortgage.installmentCount++;

        annualInstalment.add(principalPart, installmentPart);

        mortgage.installments.push({
            type: 'regular',
            principalPart,
            count,
            installmentPart,
            payment: payment});

        if (count % 12 === 0) {
            mortgage.installments.push({
                type: 'annual',
                principalPart: annualInstalment.principalPart,
                installmentPart: annualInstalment.installmentPart
                                       });
            annualInstalment.reset();
        }
    }

    return mortgage;
};

/**
 * Calculate monthly installment value based on principal, rate and mortgage length (installments count)
 * @param {number} principal
 * @param {number} rate
 * @param {number} installmentCount
 * @returns {number}
 */
export const monthlyInstallment = (principal, rate, installmentCount) => {
    const q = 1 + rate / 12;
    return principal * Math.pow(q, installmentCount) * (q - 1) / (Math.pow(q, installmentCount) - 1);
};

