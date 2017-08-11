import 'jsdom-global/register'; // for Enzyme mount - whithout this the following error will occur: TypeError: Cannot read property
                                // 'addEventListener' of undefined
import React from 'react';
import chai, {expect} from 'chai'
import chaiEnzyme from 'chai-enzyme';
import {shallow} from 'enzyme';
import rewire from 'rewire';

chai.use(chaiEnzyme);

const ExtraPaymentListModule = rewire('../ExtraPaymentList');
const ExtraPaymentList = ExtraPaymentListModule.__get__('ExtraPaymentList');
const dummyCallback = () => {
};
const defaultProps = {
  handleSubmit: dummyCallback,
  onClickHandler: dummyCallback,
  cancelExtraPaymentEdit: dummyCallback,
  removeExtraPayment: dummyCallback
};

describe('Component <ExtraPaymentList />', () => {
  it('should not render when there are no data', () => {
    const extraPaymentList = shallow(<ExtraPaymentList extraPayments={[]} {...defaultProps} />);
    expect(extraPaymentList.find('form')).to.have.length(0);
  });
  
  it('should have basic structure', () => {
    const extraPaymentList = shallow(<ExtraPaymentList extraPayments={[{}]} {...defaultProps} />);
    expect(extraPaymentList.find('form')).to.have.length(1);
    expect(extraPaymentList.find('Table')).to.have.length(1);
    expect(extraPaymentList.find('thead')).to.have.length(1);
    expect(extraPaymentList.find('tbody')).to.have.length(1);
    expect(extraPaymentList.find('ExtraPayment')).to.have.length(1);
  });
  
  it('should have the header', () => {
    const thead = shallow(<ExtraPaymentList extraPayments={[{}]} {...defaultProps} />).find('thead tr');
    expect(thead).to.have.length(1);
    const headers = thead.find('th');
    const headerDescriptions = new Array(5).fill().map((value, index) => headers.at(index).text());
    expect(headerDescriptions).to.be.deep.equal(['Payment index', 'Payment date', 'Payment', 'Type', '']);
    expect(thead.find('th')).to.have.length(5);
  });
  
  it('should have 3 ExtraPayment components for 3 extra payments', () => {
    const extraPaymentList = shallow(<ExtraPaymentList extraPayments={[{}, {}, {}]} {...defaultProps} />);
    expect(extraPaymentList.find('ExtraPayment')).to.have.length(3);
  });
});
