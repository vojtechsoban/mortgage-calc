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
        const formData = {principal: 100000, rate: 1.5, monthlyPayment: 1000};
        const expected = {
            mortgage: {
                installmentCount: 107,
                installmentSum: 6891.926123325957,
                payment: 1000,
                principal: 100000,
                rate: 0.015
            }
        };
        
        expect(calc(initialState, CalculateMortgageAction(formData))).to.deep.equal(expected);
    });
});
