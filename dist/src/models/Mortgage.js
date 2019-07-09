import 'dash-assert';
var Mortgage = /** @class */ (function () {
    /**
     *
     * @param {number} principal
     * @param {Array} parameters
     * @param {Array} extraPayments
     * @param {Number} start timestamp
     */
    function Mortgage(principal, parameters, extraPayments, start) {
        if (extraPayments === void 0) { extraPayments = []; }
        if (start === void 0) { start = 0; }
        this.principal = principal;
        if (parameters instanceof MortgageParameters) {
            this.parameters = [parameters];
        }
        else {
            this.parameters = parameters;
        }
        this.installmentSum = 0;
        this.installmentCount = 0;
        this.extraPayments = extraPayments;
        this.start = start;
    }
    return Mortgage;
}());
export { Mortgage };
/**
 * Mortgage parameters
 */
var MortgageParameters = /** @class */ (function () {
    /**
     * Constructor
     * @param payments number of payments for which this parameters are valid --> fixation period
     * @param rate installment rate
     * @param payment monthly payment
     */
    function MortgageParameters(payments, rate, payment) {
        this.payments = payments;
        this.rate = rate;
        this.payment = payment;
    }
    return MortgageParameters;
}());
export { MortgageParameters };
var InstallmentSum = /** @class */ (function () {
    function InstallmentSum() {
        this.principalPart = 0;
        this.installmentPart = 0;
        this.reset();
    }
    InstallmentSum.prototype.reset = function () {
        this.principalPart = 0;
        this.installmentPart = 0;
    };
    InstallmentSum.prototype.add = function (principalPart, installmentPart) {
        this.installmentPart += installmentPart;
        this.principalPart += principalPart;
    };
    return InstallmentSum;
}());
export { InstallmentSum };
/**
 * Extra payment
 */
var ExtraPayment = /** @class */ (function () {
    /**
     * Extra payment constructor
     * @param {number} paymentIndex
     * @param {number} amount
     * @param {string} type
     */
    function ExtraPayment(paymentIndex, amount, type) {
        if (type === void 0) { type = 'default'; }
        this.paymentIndex = paymentIndex;
        this.amount = amount;
        this.type = type;
    }
    return ExtraPayment;
}());
export { ExtraPayment };
//# sourceMappingURL=Mortgage.js.map