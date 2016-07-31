import {assert, expect, should} from 'chai'
import {describe, it} from 'mocha';

import {monthlyPayment, calculate, monthlyInstallment, getMortgageParameters, mortgageLength} from '../../src/services/MortgageCalc';
import {Mortgage, MortgageParameters} from '../../src/models/Mortgage';
import {MONTHS_IN_YEAR} from '../../src/constants/Constants';

describe('MortgageCalc', () => {

    describe('Retrieve mortgage parameters', () => {
        const parameters1 = new MortgageParameters(36, 0.015, 1000);
        const parameters2 = new MortgageParameters(60, 0.012, 2000);
        const parameters3 = new MortgageParameters(24, 0.011, 1500);

        it('should return always the only parameter set', () => {
            const mortgage = new Mortgage(1000000, parameters1);
            expect(getMortgageParameters(mortgage, 0)).to.deep.equal(parameters1);
            expect(getMortgageParameters(mortgage, 5)).to.deep.equal(parameters1);
            expect(getMortgageParameters(mortgage, 25)).to.deep.equal(parameters1);
        });

        it('should return specific parameter set for particular payment', () => {
            const parameters = [parameters1, parameters2, parameters3];
            const mortgage = new Mortgage(1000000, parameters);
            // 1st period 36 payments: 0 - 35
            expect(getMortgageParameters(mortgage, 0)).to.deep.equal(parameters1);
            expect(getMortgageParameters(mortgage, 15)).to.deep.equal(parameters1);
            expect(getMortgageParameters(mortgage, 35)).to.deep.equal(parameters1);
            // 2nd period 60 payments: 36 - 95
            expect(getMortgageParameters(mortgage, 36)).to.deep.equal(parameters2);
            expect(getMortgageParameters(mortgage, 55)).to.deep.equal(parameters2);
            expect(getMortgageParameters(mortgage, 95)).to.deep.equal(parameters2);
            // 3d period 24 payments: 96 - 119
            expect(getMortgageParameters(mortgage, 96)).to.deep.equal(parameters3);
            expect(getMortgageParameters(mortgage, 105)).to.deep.equal(parameters3);
            expect(getMortgageParameters(mortgage, 119)).to.deep.equal(parameters3);
            // rest periods

            expect(getMortgageParameters(mortgage, 200)).to.deep.equal(parameters3);
        });
    });

    describe('Monthly payment calculation', () => {
        it('Calculate monthly payment without payment', () => {
            const principal = 1000000;
            const rate = 0.023;
            const expected = principal / MONTHS_IN_YEAR * rate;
            expect(monthlyPayment(principal, rate).installmentPart).to.be.closeTo(expected, 0.001);
        });

        it('Calculate monthly payment with payment', () => {
            const principal = 1000000;
            const rate = 0.023;
            const payment = 3000;
            const expectedInstallmentPart = principal / MONTHS_IN_YEAR * rate;
            const expectedPrincipalPart = payment - expectedInstallmentPart;
            const {installmentPart, principalPart} = monthlyPayment(principal, rate, payment);

            expect(installmentPart).to.be.closeTo(expectedInstallmentPart, 0.001);
            expect(principalPart).to.be.closeTo(expectedPrincipalPart, 0.001);
        });

        it('Calculate monthly payment with payment - last payment', () => {
            const principal = 1500;
            const rate = 0.023;
            const payment = 3000;
            const expectedInstallmentPart = principal / MONTHS_IN_YEAR * rate;
            const {installmentPart, principalPart} = monthlyPayment(principal, rate, payment);

            expect(installmentPart).to.be.closeTo(expectedInstallmentPart, 0.002);
            expect(principalPart).to.be.closeTo(principal, 0.001);
        })
    });

    describe('Monthly installment', () => {
        it('Basic calculation', () => {
            expect(monthlyInstallment(200000, 0.15, 60)).to.be.closeTo(4758, 0.1);
        });
    });

    describe('Total number of payments', () => {
        it('Basic calculation', () => {
            expect(mortgageLength(2000000, 10000, 0.0379)).to.be.equal(317);
        });
    });

    describe('Total mortgage calculation', () => {
        it('Basic type', () => {
            const mortgage = new Mortgage(2000000, [new MortgageParameters(0, 0.0379, 10000)]);
            const {installmentSum, installmentCount} = calculate(mortgage);
            expect(installmentSum).to.be.closeTo(1167317.11, 0.1);
            expect(installmentCount).to.be.equal(317);
        })
    });
});
