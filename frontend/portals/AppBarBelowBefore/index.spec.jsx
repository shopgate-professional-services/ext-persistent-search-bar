import React from 'react';
import { mount } from 'enzyme';
import { Provider } from 'react-redux';
import isIOSTheme from '@shopgate-ps/pwa-extension-kit/env/helpers/isIOSTheme';
import { createMockStore } from '@shopgate/pwa-common/store';
import AppBarBelowBefore from './index';

jest.mock('@shopgate-ps/pwa-extension-kit/env/helpers/isIOSTheme', () => () => true);
const store = createMockStore();

describe('<AppBarBelowBefore />', () => {
  it('should render', () => {
    const component = mount((
      <Provider store={store}>
        <AppBarBelowBefore isIOSTheme={isIOSTheme} />
      </Provider>
    ));
    expect(component).toMatchSnapshot();
  });
});
