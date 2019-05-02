import React from 'react';
import { mount } from 'enzyme';
import SearchSuggestion from './index';

describe('<SearchSuggestion', () => {
  it('should render', () => {
    const component = mount(<SearchSuggestion suggestion="foo" onClick={() => {}} />);
    expect(component).toMatchSnapshot();
  });
});
