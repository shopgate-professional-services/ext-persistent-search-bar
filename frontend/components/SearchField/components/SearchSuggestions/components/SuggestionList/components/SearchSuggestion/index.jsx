import React from 'react';
import PropTypes from 'prop-types';
import List from '../List';

/**
 * Search suggestion list entry component.
 * @param {Object} props The component props.
 * @param {string} props.suggestion The search suggestion text.
 * @param {Function} props.onClick The action that is triggered on click.
 * @returns {JSX.Element}
 */
const SearchSuggestion = ({ suggestion, onClick }) => (
  <List.Item
    title={suggestion}
    onClick={onClick}
  />
);

SearchSuggestion.propTypes = {
  onClick: PropTypes.func.isRequired,
  suggestion: PropTypes.string.isRequired,
};

export default SearchSuggestion;
