import React from 'react';
import isIOSTheme from '@shopgate-ps/pwa-extension-kit/env/helpers/isIOSTheme';
import { useRoute } from '@shopgate/engage/core';
import SearchField from '../../components/SearchField';
import ScrollHeader from '../../components/ScrollHeader';

/**
 * Renders SearchField component in app-bar.below.before portal
 * @returns {JSX}
 */
const SearchFieldPortal = () => {
  const { id } = useRoute();
  return (
    <ScrollHeader>
      <SearchField pageId={id} isIOSTheme={isIOSTheme} />
    </ScrollHeader>
  );
};

export default SearchFieldPortal;
