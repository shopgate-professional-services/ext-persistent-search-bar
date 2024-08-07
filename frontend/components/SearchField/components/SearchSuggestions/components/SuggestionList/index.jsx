import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { withWidgetSettings } from '@shopgate/engage/core';
import List from './components/List';
import SearchSuggestion from './components/SearchSuggestion';
import connect from '../../connector';
import styles from './style';
import { bgColor, textColor } from '../../../../../../config';

/**
 * The SuggestionList component.
 */
class SuggestionList extends Component {
  static propTypes = {
    bottomHeight: PropTypes.number.isRequired,
    onClick: PropTypes.func.isRequired,
    topGap: PropTypes.number.isRequired,
    closeSearch: PropTypes.func,
    fetching: PropTypes.bool,
    searchPhrase: PropTypes.string,
    suggestions: PropTypes.arrayOf(PropTypes.string),
    widgetSettings: PropTypes.shape(),
  };

  static defaultProps = {
    closeSearch: () => {},
    suggestions: [],
    fetching: false,
    searchPhrase: '',
    widgetSettings: {},
  };

  /**
   * @param { Object } nextProps Next props.
   * @return {boolean}
   */
  shouldComponentUpdate(nextProps) {
    if (
      nextProps.suggestions === null &&
      this.props.suggestions !== null &&
      nextProps.searchPhrase.length > 2) {
      return false;
    }

    return (nextProps.fetching === false && nextProps.suggestions) ||
      this.props.searchPhrase !== nextProps.searchPhrase;
  }

  /**
   * @return {JSX}
   */
  render() {
    const {
      onClick, suggestions, bottomHeight, widgetSettings, searchPhrase, topGap,
    } = this.props;

    if (searchPhrase === '' || !suggestions || suggestions.length === 0) {
      return null;
    }

    let { background, color } = widgetSettings;

    if (bgColor) {
      background = bgColor;
    }

    if (textColor) {
      color = textColor;
    }

    /* eslint-disable jsx-a11y/click-events-have-key-events,
      jsx-a11y/no-static-element-interactions */
    return (
      <div
        className={`persistent-search-bar__suggestions ${styles.list(topGap, bottomHeight, background, color)}`}
        onClick={(e) => {
          if (e.target?.className?.includes('persistent-search-bar__suggestions')) {
            this.props.closeSearch();
          }
        }}
      >
        <List>
          {suggestions.map(suggestion =>
            (<SearchSuggestion
              key={suggestion}
              suggestion={suggestion}
              onClick={e => onClick(e, suggestion)}
            />))}
        </List>
      </div>
    );
    /* eslint-enable jsx-a11y/click-events-have-key-events,
      jsx-a11y/no-static-element-interactions */
  }
}

export default withWidgetSettings(connect(SuggestionList), '@shopgate/engage/components/AppBar');
