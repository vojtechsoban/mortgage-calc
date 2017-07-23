import React from 'react';
import chai, {assert, expect} from 'chai'
import chaiEnzyme from 'chai-enzyme';
import {shallow} from 'enzyme';
import ExtraPayment from '../ExtraPayment';

chai.use(chaiEnzyme);

const dummyCallback = () => {};

const defaultProps = {
  onClickHandler: dummyCallback,
  cancelExtraPaymentEdit: dummyCallback,
  removeExtraPayment: dummyCallback
};

const extraPayment = {
  paymentIndex: 0,
  edit: false,
  date: 'date',
  amount: 100,
  type: 'type'
};

// TODO extremely basic and fragile test due to <Button />.
// need to write additional tests testing buttons, callbacks, ... using render/mount and sinon

describe('Component <ExtraPayment />', () => {
  it('should display the extra payment in display mode (edit=false)', () => {
    const extraPaymentWrapper = shallow(<ExtraPayment extraPayment={extraPayment} {...defaultProps}/>);
    const columns = extraPaymentWrapper.find('td');
    const extraPaymentColumns = new Array(5).fill().map((value, index) => columns.at(index).text());
    expect(extraPaymentColumns).to.be.deep.equal(['1', 'date', '100', 'type', '<Button />']);
  });
  
  it('should display the extra payment in form mode (edit=true)', () => {
    const extraPaymentWrapper = shallow(<ExtraPayment extraPayment={Object.assign({}, extraPayment, {edit:true})} {...defaultProps}/>);
    const columns = extraPaymentWrapper.find('td');
    const extraPaymentColumns = new Array(5).fill().map((value, index) => columns.at(index).text());
    expect(extraPaymentColumns).to.be.deep.equal(['1', 'date', '<Field />', 'type', '<Button /><Button /><Button />']);
  });
});
