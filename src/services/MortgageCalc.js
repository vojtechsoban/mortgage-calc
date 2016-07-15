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

/**
 *
 * @param {Mortgage} mortgageIn
 */
export const calculate = (mortgageIn) => {

    const mortgage = Object.assign({}, mortgageIn);
    mortgage.installments = [];

    const _monthlyPayment = monthlyPayment;

    let count = 0;
    let principal = mortgageIn.principal;
    let annualInstalment = new InstallmentSum();

    while (principal > 0 && ++count <= 1000) {

        const {installmentPart, principalPart} = _monthlyPayment(principal, mortgage.rate, mortgageIn.payment);

        principal -= principalPart;
        mortgage.installmentSum += installmentPart;
        mortgage.installmentCount++;

        annualInstalment.add(principalPart, installmentPart);


        mortgage.installments.push({
            type: 'regular',
            principalPart,
            count,
            installmentPart,
            payment: mortgageIn.payment});

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
