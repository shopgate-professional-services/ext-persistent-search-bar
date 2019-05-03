import React from 'react';
import { mount } from 'enzyme';
import { Placeholder } from './index';

describe('<Placeholder />', () => {
  it('should render', () => {
    const component = mount(<Placeholder />);
    expect(component).toMatchSnapshot();
  });
});
