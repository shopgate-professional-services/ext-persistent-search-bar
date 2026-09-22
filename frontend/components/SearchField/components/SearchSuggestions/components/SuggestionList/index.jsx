import React, { useRef } from 'react';
import PropTypes from 'prop-types';
import { useSelector } from 'react-redux';
import { i18n } from '@shopgate/engage/core';
import { getSuggestions } from '@shopgate/engage/search';
import { makeStyles } from '@shopgate/engage/styles';
import List from './components/List';
import SearchSuggestion from './components/SearchSuggestion';

const useStyles = makeStyles()((theme, {
  topGap,
  paddingBottom,
}) => ({
  srOnly: {
    border: 0,
    clip: 'rect(0 0 0 0)',
    height: 1,
    margin: -1,
    overflow: 'hidden',
    padding: 0,
    position: 'absolute',
    width: 1,
    whiteSpace: 'nowrap',
  },
  list: {
    fontSize: 16,
    fontWeight: 400,
    bottom: 0,
    position: 'fixed',
    left: 0,
    right: 0,
    top: topGap,
    background: theme.palette.background.surface,
    color: theme.palette.text.primary,
    overflowY: 'scroll',
    zIndex: 3,
    borderTop: `0.5px solid ${theme.components.separatorLine.borderColor}`,
    paddingTop: 5,
    paddingBottom,
  },
}));

/**
 * The SuggestionList component.
 * @param {Object} props Props.
 * @returns {JSX.Element|null}
 */
const SuggestionList = ({
  onClick, bottomHeight, searchPhrase, topGap, closeSearch,
}) => {
  const rawSuggestions = useSelector(state => getSuggestions(state, { searchPhrase }));

  const lastSuggestions = useRef(rawSuggestions);
  if (rawSuggestions) {
    lastSuggestions.current = rawSuggestions;
  }
  const suggestions = rawSuggestions === null && searchPhrase.length > 2
    ? lastSuggestions.current
    : rawSuggestions;

  const { classes, cx } = useStyles({
    topGap,
    paddingBottom: bottomHeight,
  });

  if (searchPhrase === '' || !suggestions || suggestions.length === 0) {
    return null;
  }

  return (
    <div
      role="button"
      tabIndex={0}
      aria-live="polite"
      aria-atomic="true"
      className={cx('persistent-search-bar__suggestions', classes.list)}
      onClick={(e) => {
        if (e.target?.className?.includes('persistent-search-bar__suggestions')) {
          closeSearch();
        }
      }}
      onKeyDown={(e) => {
        if (e.key === 'Enter' || e.key === ' ') {
          closeSearch();
        }
      }}
    >
      <div className={classes.srOnly} id="suggestions-announcement">
        {i18n.text('persistent_search_bar.suggestions')}
      </div>
      <List aria-labelledby="suggestions-announcement">
        {suggestions.map(suggestion => (
          <SearchSuggestion
            key={suggestion}
            suggestion={suggestion}
            onClick={e => onClick(e, suggestion)}
          />
        ))}
      </List>
    </div>
  );
};

SuggestionList.propTypes = {
  bottomHeight: PropTypes.number.isRequired,
  onClick: PropTypes.func.isRequired,
  topGap: PropTypes.number.isRequired,
  closeSearch: PropTypes.func,
  searchPhrase: PropTypes.string,
};

SuggestionList.defaultProps = {
  closeSearch: () => {},
  searchPhrase: '',
};

export default SuggestionList;
