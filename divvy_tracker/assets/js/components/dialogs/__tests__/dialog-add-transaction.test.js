import React from 'react';
import { shallow, mount, render } from 'enzyme';
import DialogAddTransaction from '../dialog-add-transaction';

describe('DialogAddTransaction Component', () => {
  it('should render without throwing an error', () => {
    const wrapper = shallow(<DialogAddTransaction />);
    expect(wrapper.find('#add-transaction-form').exists()).toBe(true);
  });
});
