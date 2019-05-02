import React from 'react';
import isIOSTheme from '@shopgate-ps/pwa-extension-kit/env/helpers/isIOSTheme';
import SearchField from '../../components/SearchField';

jest.mock('../../selectors', () => ({
  isSearchBarVisible: jest.fn().mockReturnValue(true),
}));

/**
 * Renders SeachedField component in app-bar.below.before portal
 * @returns {JSX}
 */
const AppBarBelowBefore = () => (
  <SearchField isIOSTheme={isIOSTheme} />
);

export default AppBarBelowBefore;
