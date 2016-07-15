import {assert, expect} from 'chai'
import calc from '../../src/reducers/CalculateMortgageReducer';
import * as actionTypes from '../../src/constants/ActionTypes';

describe('MortgageCalc reducer', () => {
    it('should handle undefined state', () => {
        expect(calc(undefined, {type: 'init'})).to.be.null;
    });

    it('should handle null state', () => {
        expect(calc(null, {type: 'init'})).to.be.null;
    });

    it('should should calculate mortgage', () => {
        expect(calc(undefined, {type: 'init'})).to.be.null;
    });
});
