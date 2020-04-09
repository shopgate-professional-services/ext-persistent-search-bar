import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { withWidgetSettings } from '@shopgate/engage/core';
import List from './components/List';
import SearchSuggestion from './components/SearchSuggestion';
import connect from './connector';
import styles from './style';
import { bgColor, textColor } from '../../../../config';

/**
 * The SuggestionList component.
 */
class SuggestionList extends Component {
  static propTypes = {
    bottomHeight: PropTypes.number.isRequired,
    isIOSTheme: PropTypes.func.isRequired,
    onClick: PropTypes.func.isRequired,
    fetching: PropTypes.bool,
    suggestions: PropTypes.arrayOf(PropTypes.string),
    widgetSettings: PropTypes.shape(),
  };

  static defaultProps = {
    suggestions: [],
    fetching: false,
    widgetSettings: {},
  };

  /**
   * @param { Object } nextProps Next props.
   * @return {boolean}
   */
  shouldComponentUpdate(nextProps) {
    return nextProps.fetching === false && nextProps.suggestions;
  }

  /**
   * @return {JSX}
   */
  render() {
    const {
      onClick, suggestions, bottomHeight, widgetSettings,
    } = this.props;

    if (!suggestions || suggestions.length === 0) {
      return null;
    }

    let { background, color } = widgetSettings;

    if (bgColor) {
      background = bgColor;
    }

    if (textColor) {
      color = textColor;
    }

    return (
      <div className={styles.list(this.props.isIOSTheme(), bottomHeight, background, color)}>
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
  }
}

export default withWidgetSettings(connect(SuggestionList), '@shopgate/engage/components/AppBar');
