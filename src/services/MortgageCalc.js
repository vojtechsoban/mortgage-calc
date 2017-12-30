import assert from 'assert';
import moment from 'moment';
import {MONTHS_IN_YEAR} from 'src/constants/Constants';
import {InstallmentSum, MortgageParameters} from 'src/models/Mortgage';

export const monthlyPayment = (principal, rate, payment = null) => {

    const installment = principal * rate / MONTHS_IN_YEAR;
    const principalPart = payment != null ? payment - installment : null;

    if (principalPart <= principal) {
        return {
            installmentPart: installment,
            principalPart
        };
    } else {
        return {
            installmentPart: installment,
            principalPart: principal
        };
    }
};

export const getMortgageParameters = (mortgage, paymentIndex) => {

    assert.isNotEmpty(mortgage.parameters);

    // when we calculate mortgage with constant parameters
    if (mortgage.parameters.length === 1) {
        return mortgage.parameters[0];
    }  else { // calculate mortgage with variable parameters
        let paymentSum = 0;
        for (let parameters of mortgage.parameters) {
            paymentSum += parameters.payments;
            if (paymentSum > paymentIndex) {
                return parameters;
            }
        }

        // fallback - return the last parameters if there are no more parameters
        // to calculate mortgage with the last used parameters.
        return mortgage.parameters[mortgage.parameters.length - 1];
    }
};

export const pushMortgageParameters = (mortgage, paymentIndex, parameters) => {

    assert.isNotEmpty(mortgage.parameters);

// FIXME insert into correct position
    mortgage.parameters.splice(0, 1, parameters);
};

export const getRemainingPeriod = (mortgage, paymentIndex) => {

    assert.isNotEmpty(mortgage.parameters);

    const remainder = (parameters, paymentIndex, paymentSum = 0) => {
        const result = paymentSum + parameters.payments - paymentIndex - 1;
        // cover scenario when requesting remainder after period finished (and mortgage is not payed) and also for constant parameters
        return result > 0 ? result : 0;
    };

    if (mortgage.parameters.length === 1) {
        return remainder(mortgage.parameters[0], paymentIndex);
    } else {
        let paymentSum = 0;
        for (let parameters of mortgage.parameters) {
            if (paymentSum + parameters.payments >= paymentIndex + 1) {
                return remainder(parameters, paymentIndex, paymentSum);
            }
            paymentSum += parameters.payments;
        }

        // fallback - return 0 if there are no more parameters
        return 0;
    }
};

/**
 * Get extra payment for payment index (count) or null if no extra payment is defined or extra peyments are not defined at all.
 * @param {Mortgage} mortgage
 * @param {number} paymentIndex
 * @returns {ExtraPayment}
 */
export const getExtraPayment = (mortgage, paymentIndex) => {

    if (!mortgage.extraPayments) {
        return null;
    }

    for (let extraPayment of mortgage.extraPayments) {
        if (extraPayment.paymentIndex === paymentIndex) {
            return extraPayment;
        }
    }

    return null;
};

/**
 *
 * @param {Mortgage} mortgageIn
 */
export const calculate = (mortgageIn) => {

    const mortgage = Object.assign({}, mortgageIn);
    mortgage.installments = [];

    const _monthlyPayment = monthlyPayment;

    let count = -1;
    let balance = mortgage.principal;
    const annualInstalment = new InstallmentSum();

    while (balance > 0 && ++count <= 1000) {

        const { rate, payment } = getMortgageParameters(mortgage, count);
        const {installmentPart, principalPart} = _monthlyPayment(balance, rate, payment);

        balance -= principalPart;
        mortgage.installmentSum += installmentPart;
        mortgage.installmentCount++;

        annualInstalment.add(principalPart, installmentPart);

        mortgage.installments.push({
            type: 'regular',
            date: moment(mortgageIn.start).add(count + 1, 'M').format('D.M.Y'),
            principalPart,
            count,
            installmentPart,
            payment,
            rate
        });

        const extraPayment = getExtraPayment(mortgage, count);
        if (extraPayment) {
            // TODO use a flag to determine amount type of extra payment
            let absoluteExtraPayment = extraPayment.amount > 1 ? extraPayment.amount : extraPayment.amount * balance;
            balance -= absoluteExtraPayment;

            if (extraPayment.type === 'constant_duration') {
                const remainingPeriod = getRemainingPeriod(mortgage, count);
                const actualMortgageLength = mortgageLength(balance, payment, rate);
                const newMonthlyPayment = monthlyInstallment(balance, rate, actualMortgageLength);
                pushMortgageParameters(mortgage, count, new MortgageParameters(remainingPeriod, rate, newMonthlyPayment));
            }

            mortgage.installments.push({
                type: 'extra',
                count,
                payment: absoluteExtraPayment
            });
        }

        if (count > 0 && (count + 1) % 12 === 0) {
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

/**
 *
 * @param {number} principal
 * @param {number} monthlyPayment
 * @param {number} rate in float not in %, i.e 0.0125 for 12.5%
 * @returns {number}
 */
export const mortgageLength = (principal, monthlyPayment, rate) => {
    const j = rate / 12;
    return Math.ceil(- Math.log(1 - principal * j / monthlyPayment) / Math.log(1 + j));
};
