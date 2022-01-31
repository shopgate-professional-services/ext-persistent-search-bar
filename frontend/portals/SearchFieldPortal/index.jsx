import React from 'react';
import PropTypes from 'prop-types';
import { ConditionalWrapper } from '@shopgate/engage/components';
import isIOSTheme from '@shopgate-ps/pwa-extension-kit/env/helpers/isIOSTheme';
import { withRoute, useRoute } from '@shopgate/engage/core';
import SearchField from '../../components/SearchField';
import ScrollHeader from '../../components/ScrollHeader';
import connect from './connector';

/**
 * Renders SearchField component in app-bar.below.before portal
 * @returns {JSX}
 */
const SearchFieldPortal = ({ name, isVisible }) => {
  const { id } = useRoute();

  if (!isVisible) {
    return null;
  }

  return (
    <ConditionalWrapper
      condition={name !== 'filter-bar.content.before'}
      wrapper={children => (
        <ScrollHeader>
          {children}
        </ScrollHeader>
      )}
    >
      <SearchField pageId={id} isIOSTheme={isIOSTheme} />

    </ConditionalWrapper>
  );
};

SearchFieldPortal.propTypes = {
  isVisible: PropTypes.bool.isRequired,
  name: PropTypes.string.isRequired,
};

export default withRoute(connect(SearchFieldPortal), { prop: 'route' });
