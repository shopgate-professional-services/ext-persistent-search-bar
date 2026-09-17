import React from 'react';
import PropTypes from 'prop-types';
import { useSelector } from 'react-redux';
import { SEARCH_SUGGESTIONS } from '@shopgate/engage/search';
import { getSuggestions } from '@shopgate/pwa-common-commerce/search/selectors';
import { SurroundPortals } from '@shopgate/engage/components';

/**
 * SearchSuggestions
 * @param {Object} props Props.
 * @return {JSX.Element}
 */
const SearchSuggestions = ({
  searchPhrase,
  bottomHeight,
  onClick,
  closeSearch,
  visible,
  children,
}) => {
  const suggestions = useSelector(state => getSuggestions(state, { searchPhrase }));

  return (
    <SurroundPortals
      portalName={`persistent-search-bar.${SEARCH_SUGGESTIONS}`}
      portalProps={{
        searchPhrase,
        suggestions,
        bottomHeight,
        onClick,
        closeSearch,
        visible,
      }}
    >
      {children}
    </SurroundPortals>
  );
};

SearchSuggestions.propTypes = {
  bottomHeight: PropTypes.number.isRequired,
  closeSearch: PropTypes.func.isRequired,
  onClick: PropTypes.func.isRequired,
  visible: PropTypes.bool.isRequired,
  children: PropTypes.node,
  searchPhrase: PropTypes.string,
};

SearchSuggestions.defaultProps = {
  children: null,
  searchPhrase: '',
};

export default SearchSuggestions;
