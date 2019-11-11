import React from 'react';
import isIOSTheme from '@shopgate-ps/pwa-extension-kit/env/helpers/isIOSTheme';
import SearchField from '../../components/SearchField';

/**
 * Renders SeachedField component in app-bar.below.before portal
 * @returns {JSX}
 */
const AppBarBelowBefore = () => (
  <SearchField isIOSTheme={isIOSTheme} />
);

export default AppBarBelowBefore;
