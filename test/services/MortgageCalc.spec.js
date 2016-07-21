import { assert, expect, should } from 'chai'
import { describe } from 'mocha';

import { monthlyPayment, calculate, monthlyInstallment, getMortgageParameters } from '../../src/services/MortgageCalc';
import { Mortgage, MortgageParameters } from '../../src/models/Mortgage';
import { MONTHS_IN_YEAR } from '../../src/constants/Constants';

describe('MortgageCalc', () => {

    describe('Retrieve mortgage parameters', () => {
        // TODO more tests
        const mortgage = new Mortgage(1000000, [new MortgageParameters(0, 0.015, 1000)]);
        it('should return the first parameter set', () => {
            expect(getMortgageParameters(mortgage, 0)).to.deep.equal({payments: 0, rate: 0.015, payment: 1000});
        });
    });

    describe('Monthly payment calculation', () =>  {
        it('Calculate monthly payment without payment', () => {
            const principal = 1000000;
            const rate = 0.023;
            const expected = principal / MONTHS_IN_YEAR * rate;
            expect(monthlyPayment(principal, rate).installmentPart).to.be.closeTo(expected, 0.001);
        })

        it('Calculate monthly payment with payment', () => {
            const principal = 1000000;
            const rate = 0.023;
            const payment = 3000;
            const expectedInstallmentPart = principal / MONTHS_IN_YEAR * rate;
            const expectedPrincipalPart = payment - expectedInstallmentPart;
            const { installmentPart, principalPart } = monthlyPayment(principal, rate, payment);

            expect(installmentPart).to.be.closeTo(expectedInstallmentPart, 0.001);
            expect(principalPart).to.be.closeTo(expectedPrincipalPart, 0.001);
        })
        
        it('Calculate monthly payment with payment - last payment', () => {
            const principal = 1500;
            const rate = 0.023;
            const payment = 3000;
            const expectedInstallmentPart = principal / MONTHS_IN_YEAR * rate;
            const { installmentPart, principalPart } = monthlyPayment(principal, rate, payment);

            expect(installmentPart).to.be.closeTo(expectedInstallmentPart, 0.002);
            expect(principalPart).to.be.closeTo(principal, 0.001);
        })
    });

    describe('Monthly installment', () => {
        it('Basic calculation', () => {
            expect(monthlyInstallment(200000, 0.15, 60)).to.be.closeTo(4758, 0.1);
        })
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
