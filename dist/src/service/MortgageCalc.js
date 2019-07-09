var __values = (this && this.__values) || function (o) {
    var m = typeof Symbol === "function" && o[Symbol.iterator], i = 0;
    if (m) return m.call(o);
    return {
        next: function () {
            if (o && i >= o.length) o = void 0;
            return { value: o && o[i++], done: !o };
        }
    };
};
import moment from 'moment';
import { MONTHS_IN_YEAR } from 'src/constants/Constants';
import { InstallmentSum, MortgageParameters } from 'src/models/Mortgage';
export var calculateMonthlyPayment = function (principal, rate, payment) {
    var installment = principal * rate / MONTHS_IN_YEAR;
    var principalPart = payment != null ? payment - installment : null;
    if (principalPart && principalPart <= principal) {
        return {
            installmentPart: installment,
            principalPart: principalPart,
        };
    }
    else {
        return {
            installmentPart: installment,
            principalPart: principal,
        };
    }
};
export var getMortgageParameters = function (mortgage, paymentIndex) {
    var e_1, _a;
    // when we calculate mortgage with constant parameters
    if (mortgage.parameters.length === 1) {
        return mortgage.parameters[0];
    }
    else { // calculate mortgage with variable parameters
        var paymentSum = 0;
        try {
            for (var _b = __values(mortgage.parameters), _c = _b.next(); !_c.done; _c = _b.next()) {
                var parameters = _c.value;
                paymentSum += parameters.payments;
                if (paymentSum > paymentIndex) {
                    return parameters;
                }
            }
        }
        catch (e_1_1) { e_1 = { error: e_1_1 }; }
        finally {
            try {
                if (_c && !_c.done && (_a = _b.return)) _a.call(_b);
            }
            finally { if (e_1) throw e_1.error; }
        }
        // fallback - return the last parameters if there are no more parameters
        // to calculate mortgage with the last used parameters.
        return mortgage.parameters[mortgage.parameters.length - 1];
    }
};
export var pushMortgageParameters = function (mortgage, paymentIndex, parameters) {
    // FIXME insert into correct position
    mortgage.parameters.splice(0, 1, parameters);
};
export var getRemainingPeriod = function (mortgage, paymentIndex) {
    var e_2, _a;
    var remainder = function (parameters, paymentIndex, paymentSum) {
        if (paymentSum === void 0) { paymentSum = 0; }
        var result = paymentSum + parameters.payments - paymentIndex - 1;
        // cover scenario when requesting remainder after period finished (and mortgage is not payed) and also for constant parameters
        return result > 0 ? result : 0;
    };
    if (mortgage.parameters.length === 1) {
        return remainder(mortgage.parameters[0], paymentIndex);
    }
    else {
        var paymentSum = 0;
        try {
            for (var _b = __values(mortgage.parameters), _c = _b.next(); !_c.done; _c = _b.next()) {
                var parameters = _c.value;
                if (paymentSum + parameters.payments >= paymentIndex + 1) {
                    return remainder(parameters, paymentIndex, paymentSum);
                }
                paymentSum += parameters.payments;
            }
        }
        catch (e_2_1) { e_2 = { error: e_2_1 }; }
        finally {
            try {
                if (_c && !_c.done && (_a = _b.return)) _a.call(_b);
            }
            finally { if (e_2) throw e_2.error; }
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
export var getExtraPayment = function (mortgage, paymentIndex) {
    var e_3, _a;
    if (!mortgage.extraPayments) {
        return null;
    }
    try {
        for (var _b = __values(mortgage.extraPayments), _c = _b.next(); !_c.done; _c = _b.next()) {
            var extraPayment = _c.value;
            if (extraPayment.paymentIndex === paymentIndex) {
                return extraPayment;
            }
        }
    }
    catch (e_3_1) { e_3 = { error: e_3_1 }; }
    finally {
        try {
            if (_c && !_c.done && (_a = _b.return)) _a.call(_b);
        }
        finally { if (e_3) throw e_3.error; }
    }
    return null;
};
/**
 *
 * @param {Mortgage} mortgageIn
 */
export var calculate = function (mortgageIn) {
    var mortgage = Object.assign({}, mortgageIn);
    mortgage.installments = [];
    var count = -1;
    var balance = mortgage.principal;
    var annualInstalment = new InstallmentSum();
    while (balance > 0 && count++ <= 1000) {
        var _a = getMortgageParameters(mortgage, count), rate = _a.rate, payment = _a.payment;
        var _b = calculateMonthlyPayment(balance, rate, payment), installmentPart = _b.installmentPart, principalPart = _b.principalPart;
        balance -= principalPart;
        mortgage.installmentSum += installmentPart;
        mortgage.installmentCount += 1;
        annualInstalment.add(principalPart, installmentPart);
        mortgage.installments.push({
            type: 'regular',
            date: moment(mortgageIn.start).add(count + 1, 'M').format('D.M.Y'),
            principalPart: principalPart,
            count: count,
            installmentPart: installmentPart,
            payment: payment,
            rate: rate,
        });
        var extraPayment = getExtraPayment(mortgage, count);
        if (extraPayment) {
            // TODO use a flag to determine amount type of extra payment
            var absoluteExtraPayment = extraPayment.amount > 1 ? extraPayment.amount : extraPayment.amount * balance;
            balance -= absoluteExtraPayment;
            if (extraPayment.type === 'constant_duration') {
                var remainingPeriod = getRemainingPeriod(mortgage, count);
                var actualMortgageLength = mortgageLength(balance, payment, rate);
                var newMonthlyPayment = monthlyInstallment(balance, rate, actualMortgageLength);
                pushMortgageParameters(mortgage, count, new MortgageParameters(remainingPeriod, rate, newMonthlyPayment));
            }
            mortgage.installments.push({
                type: 'extra',
                count: count,
                payment: absoluteExtraPayment,
            });
        }
        if (count > 0 && (count + 1) % 12 === 0) {
            mortgage.installments.push({
                type: 'annual',
                principalPart: annualInstalment.principalPart,
                installmentPart: annualInstalment.installmentPart,
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
export var monthlyInstallment = function (principal, rate, installmentCount) {
    var q = 1 + rate / 12;
    return principal * Math.pow(q, installmentCount) * (q - 1) / (Math.pow(q, installmentCount) - 1);
};
/**
 *
 * @param {number} principal
 * @param {number} monthlyPayment
 * @param {number} rate in float not in %, i.e 0.0125 for 12.5%
 * @returns {number}
 */
export var mortgageLength = function (principal, monthlyPayment, rate) {
    var j = rate / 12;
    return Math.ceil(-Math.log(1 - principal * j / monthlyPayment) / Math.log(1 + j));
};
//# sourceMappingURL=MortgageCalc.js.map