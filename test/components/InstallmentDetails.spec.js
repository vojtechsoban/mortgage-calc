import React from 'react';
import {assert, expect} from 'chai'
import {shallow, mount, render} from 'enzyme';

import InstallmentDetails from '../../src/components/InstallmentDetails';

const extracted = bodyRows => bodyRows.at(1).find('td').map(node => node.text());

const getInstallmentDetailsWrapper = () => {
  const installments = [{
    count: 0, type: 'annual', rate: 0.01
  }, {
    count: 1,
    type: 'regular',
    date: 'date',
    payment: 123.456,
    installmentPart: 567.890,
    principalPart: 234,
    rate: 0.01
  }];

  return shallow(<InstallmentDetails installments={installments}/>);
};

describe('Component <InstallmentDetails />', () => {
  it('should have header with columns description', () => {
    const head = getInstallmentDetailsWrapper().find('thead');
    expect(head.contains(<tr>
      <th>order</th>
      <th>date</th>
      <th>monthly payment</th>
      <th>rate</th>
      <th>principal</th>
      <th>installment</th>
      <th>type</th>
    </tr>)).to.equal(true);
  });

  it('should have regular installment', () => {

    const wrapper = shallow(<InstallmentDetails installments={[{
      count: 0,
      type: 'regular',
      date: 'date',
      payment: 123.456,
      installmentPart: 567.890,
      principalPart: 234,
      rate: 0.01
    }]}/>);

    const bodyRows = wrapper.find('tr');
    expect(bodyRows).to.have.length(2); // header + one row
    const installmentColumnContents = bodyRows.at(1).find('td').map(node => node.text());
    expect(installmentColumnContents).to.be.deep.equal(['1', 'date', '123', '1.00', '234', '568', 'regular']);
  });

  it('should have extra payment', () => {

    const wrapper = shallow(<InstallmentDetails installments={[{
      count: 11,
      type: 'extra',
      payment: 1000
    }]}/>);

    const bodyRows = wrapper.find('tr');
    expect(bodyRows).to.have.length(2); // header + one row

    const installmentColumnContents = extracted(bodyRows);
    expect(installmentColumnContents).to.be.deep.equal(['12', '', '1000', '', '', '', 'extra']);
  });

  it('should have annual summary', () => {

    const wrapper = shallow(<InstallmentDetails installments={[{
      type: 'annual',
      installmentPart: 100,
      principalPart: 200
    }]}/>);

    const bodyRows = wrapper.find('tr');
    expect(bodyRows).to.have.length(2); // header + one row
    const installmentColumnContents = bodyRows.at(1).find('td').map(node => node.text());
    expect(installmentColumnContents).to.be.deep.equal(['', '', '', '', '200', '100', 'annual']);
  });
});
