import 'jsdom-global/register'; // for Enzyme mount - whithout this the following error will occur: TypeError: Cannot read property 'addEventListener' of undefined
import React from 'react';
import chai, {assert, expect} from 'chai'
import sinonChai from 'sinon-chai';
import chaiEnzyme from 'chai-enzyme';
import {shallow} from 'enzyme';
import sinon from 'sinon';
import rewire from 'rewire';

chai.use(sinonChai).use(chaiEnzyme);

const ExtraPayment = rewire('../../src/components/ExtraPaymentList.jsx').__get__('ExtraPayment');

const defaultExtraPayment = {paymentIndex: 1, date: 'date', type: 'type', edit: false};

describe('Component <ExtraPayment />', () => {

  it('should handle row click', () => {

    const extraPaymentActions = {onClickHandler: sinon.spy()};

    const extraPayments = shallow(<ExtraPayment
      extraPayment={defaultExtraPayment}
      extraPaymentActions={extraPaymentActions}
    />);

    extraPayments.simulate('click');
    expect(extraPaymentActions.onClickHandler).calledOnce;
  });
});
