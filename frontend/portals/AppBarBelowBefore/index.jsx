import React from 'react';
import isIOSTheme from '@shopgate-ps/pwa-extension-kit/env/helpers/isIOSTheme';
import { useRoute } from '@shopgate/engage/core';
import SearchField from '../../components/SearchField';

/**
 * Renders SeachedField component in app-bar.below.before portal
 * @returns {JSX}
 */
const AppBarBelowBefore = () => {
  const { id } = useRoute();
  return (
    <SearchField pageId={id} isIOSTheme={isIOSTheme} />
  );
};

export default AppBarBelowBefore;
