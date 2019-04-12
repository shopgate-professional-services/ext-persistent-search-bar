import React, { Component } from 'react';
import PropTypes from 'prop-types';
import classnames from 'classnames';
import List from './components/List';
import SearchSuggestion from './components/SearchSuggestion';
import connect from './connector';
import styles from './style';

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
  }

  static defaultProps = {
    suggestions: [],
    fetching: false,
  }

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
    const { onClick, suggestions, bottomHeight } = this.props;

    if (!suggestions || suggestions.length === 0) {
      return null;
    }

    return (
      <div className={this.props.isIOSTheme() ?
        classnames(styles.iosList, styles.bottom(bottomHeight)) :
        classnames(styles.gmdList, styles.bottom(bottomHeight))}
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
  }
}

export default connect(SuggestionList);
