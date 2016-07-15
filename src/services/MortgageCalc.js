import {MONTHS_IN_YEAR} from '../constants/Constants'

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

/**
 *
 * @param {Mortgage} mortgageIn
 */
export const calculate = (mortgageIn) => {

    const mortgage = Object.assign({}, mortgageIn);
    const _monthlyPayment = monthlyPayment;

    let count = 0;
    let principal = mortgageIn.principal;

    while (principal > 0 && ++count <= 1000) {
        const {installmentPart, principalPart} = _monthlyPayment(principal, mortgage.rate, mortgageIn.payment);

        principal -= principalPart;
        mortgage.installmentSum += installmentPart;
        mortgage.installmentCount++;
    }

    return mortgage;
};
