import React from 'react';
import { shallow } from 'enzyme';
import isIOSTheme from '@shopgate-ps/pwa-extension-kit/env/helpers/isIOSTheme';
import AppBarBelowBefore from './index';

jest.mock('@shopgate/engage/core', () => ({
  useRoute: () => ({ id: 123 }),
}));

jest.mock('@shopgate/pwa-ui-shared/Glow', () => <div>Glow</div>);

jest.mock('../../components/SearchField', () => <div>SearchField</div>);

jest.mock('@shopgate-ps/pwa-extension-kit/env/helpers/isIOSTheme', () => () => true);

describe('<AppBarBelowBefore />', () => {
  it('should render', () => {
    const component = shallow(<AppBarBelowBefore isIOSTheme={isIOSTheme} />);
    expect(component).toMatchSnapshot();
  });
});
