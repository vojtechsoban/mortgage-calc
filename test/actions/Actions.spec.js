import { assert, expect } from 'chai'
import { CalculateMortgageAction } from '../../src/actions/Actions';
import * as actionTypes from '../../src/constants/ActionTypes';

describe('Action creator', () => {
    it('should create CalculateMortgageAction', () => {
        const formData = {principal: 10000, rate: 1.5, payment: 1000};
        const expected = {type: actionTypes.CALCULATE_MORTGAGE, formData: formData};
        expect(CalculateMortgageAction(formData)).to.deep.equal(expected);
    });
});
