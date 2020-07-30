import React from 'react';
import PropTypes from 'prop-types';
import { SEARCH_SUGGESTIONS } from '@shopgate/engage/search';
import { SurroundPortals } from '@shopgate/engage/components';
import connect from './connector';

/**
 * SearchSuggestions
 * @return {JSX}
 */
const SearchSuggestions = ({
  searchPhrase,
  suggestions,
  bottomHeight,
  onClick,
  visible,
  children,
}) => (
  <SurroundPortals
    portalName={`persistent-search-bar.${SEARCH_SUGGESTIONS}`}
    portalProps={{
      searchPhrase,
      suggestions,
      bottomHeight,
      onClick,
      visible,
    }}
  >
    {children}
  </SurroundPortals>
);

SearchSuggestions.propTypes = {
  bottomHeight: PropTypes.number.isRequired,
  onClick: PropTypes.func.isRequired,
  visible: PropTypes.bool.isRequired,
  children: PropTypes.node,
  searchPhrase: PropTypes.string,
  suggestions: PropTypes.arrayOf(PropTypes.string),
};

SearchSuggestions.defaultProps = {
  suggestions: [],
  children: null,
  searchPhrase: '',
};

export default connect(SearchSuggestions);
