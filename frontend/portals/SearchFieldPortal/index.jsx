import React, { useMemo } from 'react';
import PropTypes from 'prop-types';
import { useSelector } from 'react-redux';
import { ConditionalWrapper, ScrollHeader } from '@shopgate/engage/components';
import { useRoute } from '@shopgate/engage/core';
import { makeStyles } from '@shopgate/engage/styles';
import { makeGetIsSearchBarVisible } from '../../selectors';
import SearchField from '../../components/SearchField';
import config from '../../config.json';

const { hideOnScroll } = config;

const useStyles = makeStyles()({
  scrollHeader: {
    top: 0,
    zIndex: 100,
    boxShadow: 'none',
  },
});

/**
 * Renders SearchField component in app-bar.below.before portal
 * @param {Object} props Props.
 * @returns {JSX}
 */
const SearchFieldPortal = ({ name }) => {
  const { classes } = useStyles();
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
        <ScrollHeader className={classes.scrollHeader} hideOnScroll={hideOnScroll}>
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
