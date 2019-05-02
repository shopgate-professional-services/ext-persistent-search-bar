import React from 'react';
import { shallow } from 'enzyme';
import isIOSTheme from '@shopgate-ps/pwa-extension-kit/env/helpers/isIOSTheme';
import { UnwrappedAppBarRight as AppBarRight } from './index';

jest.mock('@shopgate/pwa-common/components/Swiper', () => () => (<div>Swiper</div>));
jest.mock('@shopgate-ps/pwa-extension-kit/env/helpers/isIOSTheme', () => () => true);

describe('<CouponField />', () => {
  it('should render as expected without any props', () => {
    const wrapper = shallow(<AppBarRight visible isIOSTheme={isIOSTheme} />);
    expect(wrapper).toMatchSnapshot();
  });
});
