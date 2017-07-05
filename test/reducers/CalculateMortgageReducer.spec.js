import {assert, expect} from 'chai'
import calc from '../../src/reducers/CalculateMortgageReducer';
import {CalculateMortgageAction} from '../../src/actions/Actions';
import moment from 'moment';

describe('MortgageCalcReducer', () => {
    it('should handle undefined state', () => {
        expect(calc(undefined, {type: 'init'})).to.be.null;
    });

    it('should handle null state', () => {
        expect(calc(null, {type: 'init'})).to.be.null;
    });

    it('should should calculate mortgage - constant parameters', () => {
        expect(calc(undefined, {type: 'init'})).to.be.null;
        // TODO share initialState between tests and app
        const start = moment('2016-07-03').unix() * 1000;
        const initialState = {mortgage: null, extraPayments: [], start};
        console.log(`initial state start=${initialState.start}`);
        const formData = {principal: 10000, rate: 1.5, monthlyPayment: 6000};

        const expected = {
            start,
            extraPayments: [],
            mortgage: {
                start,
                extraPayments: [],
                installmentCount: 2,
                installmentSum: 17.515625,
                principal: 10000,
                parameters: [
                    {
                        payment: 6000,
                        payments: 0,
                        rate: 0.015
                    }
                ],
                installments: [
                    {
                        count: 0,
                        date: moment(start).add(1, 'M').format('D.M.Y'),
                        type: 'regular',
                        installmentPart: 12.5,
                        principalPart: 5987.5,
                        payment: formData.monthlyPayment,
                        rate: formData.rate / 100
                    },
                    {
                        count: 1,
                        date: moment(start).add(2, 'M').format('D.M.Y'),
                        type: 'regular',
                        installmentPart: 5.015625,
                        principalPart: 4012.5,
                        payment: formData.monthlyPayment,
                        rate: formData.rate / 100
                    }
                ]
            }
        };

        expect(calc(initialState, CalculateMortgageAction(formData))).to.deep.equal(expected);
    });
});
