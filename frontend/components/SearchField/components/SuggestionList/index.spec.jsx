import React from 'react';
import { mount } from 'enzyme';
import { Provider } from 'react-redux';
import { createMockStore } from '@shopgate/pwa-common/store';
import SuggestionList from './index';

const store = createMockStore();

let mockedFetchingState;
jest.mock('@shopgate/pwa-common-commerce/search/selectors', () => ({
  getSuggestions: () => ([
    'foo',
    'foo bar',
    'foo bar buz',
    'foo bar buz quz',
  ]),
  getSuggestionsFetchingState: () => mockedFetchingState,
}));
const mockProps = {
  isIOSTheme: () => {},
};

describe('<SuggestionList />', () => {
  beforeEach(() => {
    mockedFetchingState = false;
  });

  it('should render a list of suggestions', () => {
    const wrapper = mount((
      <Provider store={store}>
        <SuggestionList bottomHeight={10} onClick={() => {}} {...mockProps} />
      </Provider>
    ));

    expect(wrapper).toMatchSnapshot();
  });
});
