import {assert, expect} from 'chai'
import calc from '../../src/reducers/CalculateMortgageReducer';
import {CalculateMortgageAction} from '../../src/actions/Actions';

describe('MortgageCalc reducer', () => {
    it('should handle undefined state', () => {
        expect(calc(undefined, {type: 'init'})).to.be.null;
    });

    it('should handle null state', () => {
        expect(calc(null, {type: 'init'})).to.be.null;
    });

    it('should should calculate mortgage', () => {
        expect(calc(undefined, {type: 'init'})).to.be.null;
        // TODO share initialState between tests and app
        const initialState = {mortgage: null};
        const formData = {principal: 10000, rate: 1.5, monthlyPayment: 6000};
        const expected = {
            mortgage: {
                installmentCount: 2,
                installmentSum: 17.515625,
                payment: 6000,
                principal: 10000,
                rate: 0.015,
                installments: [
                    {
                        count: 1,
                        type: 'regular',
                        installmentPart: 12.5,
                        principalPart: 5987.5,
                        payment: formData.monthlyPayment
                    },
                    {
                        count: 2,
                        type: 'regular',
                        installmentPart: 5.015625,
                        principalPart: 4012.5,
                        payment: formData.monthlyPayment
                    }
                ]
            }
        };

        expect(calc(initialState, CalculateMortgageAction(formData))).to.deep.equal(expected);
    });
});
