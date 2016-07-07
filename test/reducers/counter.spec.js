import {assert, expect} from 'chai'
import rootReducer from '../../src/reducers'

describe('reducers', () => {
    describe('clickReducer', () => {
        it('should increase click count by one', () => {
            const initialClickCount = 5;
            const initialState = {
                clickReducer: {
                    click1: initialClickCount
                }
            }

            const action = {type: 'CLICK'};
            const nextAction = rootReducer(initialState, action);
            expect(nextAction.clickReducer.click1).to.equal(initialClickCount + 1);
        })
    })
})
