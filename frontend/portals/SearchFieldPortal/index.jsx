import React, { useMemo } from 'react';
import PropTypes from 'prop-types';
import { useSelector } from 'react-redux';
import { ConditionalWrapper } from '@shopgate/engage/components';
import { useRoute } from '@shopgate/engage/core';
import { makeGetIsSearchBarVisible } from '../../selectors';
import SearchField from '../../components/SearchField';
import ScrollHeader from '../../components/ScrollHeader';

/**
 * Renders SearchField component in app-bar.below.before portal
 * @param {Object} props Props.
 * @returns {JSX}
 */
const SearchFieldPortal = ({ name }) => {
  const route = useRoute();
  const getIsSearchBarVisible = useMemo(makeGetIsSearchBarVisible, []);
  const isVisible = useSelector(state => getIsSearchBarVisible(state, {
    route,
    name,
  }));

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
      <SearchField pageId={route.id} />

    </ConditionalWrapper>
  );
};

SearchFieldPortal.propTypes = {
  name: PropTypes.string.isRequired,
};

export default SearchFieldPortal;
