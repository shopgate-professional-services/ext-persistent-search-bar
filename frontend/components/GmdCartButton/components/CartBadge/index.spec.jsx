import React from 'react';
import { mount } from 'enzyme';
import CartBadge from './index';

const badgeProps = {
  count: 1,
};

describe('<CartBadge />', () => {
  it('should render', () => {
    const component = mount(<CartBadge {...badgeProps} />);
    expect(component).toMatchSnapshot();
  });
});
