import React from 'react';
import { mount } from 'enzyme';
import { createMockStore } from '@shopgate/pwa-common/store';
import { Provider } from 'react-redux';
import GmdCartButton from './index';

jest.mock('@shopgate/pwa-common/components/Swiper', () => () => (<div>Swiper</div>));
const store = createMockStore();
const mockProps = {
  count: 1,
  naviagate: () => {},
};
describe('<GmdCartButton />', () => {
  it('should render', () => {
    const component = mount((
      <Provider store={store}>
        <GmdCartButton {...mockProps} />
      </Provider>
    ));
    expect(component).toMatchSnapshot();
  });
});
