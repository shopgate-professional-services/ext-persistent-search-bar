import React, { Component } from 'react';
import ReactPortal from 'react-portal';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import debounce from 'lodash/debounce';
import { withWidgetSettings, withTheme, i18n } from '@shopgate/engage/core';
import { ThemeContext } from '@shopgate/pwa-common/context';
import event from '@shopgate/pwa-core/classes/Event';
import { EVENT_KEYBOARD_WILL_CHANGE } from '@shopgate/pwa-core/constants/AppEvents';
import registerEvents from '@shopgate/pwa-core/commands/registerEvents';
import I18n from '@shopgate/pwa-common/components/I18n/';
import Input from '@shopgate/pwa-common/components/Input/';
import SearchIcon from '@shopgate/pwa-ui-shared/icons/MagnifierIcon';
import { router } from '@virtuous/conductor';
import BarcodeScannerIcon from '@shopgate/pwa-ui-shared/icons/BarcodeScannerIcon';
import SuggestionList from './components/SearchSuggestions/components/SuggestionList';
import SearchSuggestions from './components/SearchSuggestions';
import connect from './connector';
import styles from './style';
import { barBgColor, suggestionsMinChars } from '../../config';

/**
 * The SearchField component.
 */
class SearchField extends Component {
  static propTypes = {
    fetchSuggestions: PropTypes.func.isRequired,
    isIOSTheme: PropTypes.func.isRequired,
    isVisible: PropTypes.bool.isRequired,
    openScanner: PropTypes.func.isRequired,
    pageId: PropTypes.string.isRequired,
    submitSearch: PropTypes.func.isRequired,
    name: PropTypes.string,
    query: PropTypes.string,
    showScannerIcon: PropTypes.bool,
    TabBar: PropTypes.func,
    widgetSettings: PropTypes.shape(),
  };

  static defaultProps = {
    showScannerIcon: true,
    name: 'search',
    query: '',
    widgetSettings: {},
    TabBar: null,
  };

  /**
   * Creates a new search field instance.
   * @param {Object} props The component properties.
   */
  constructor(props) {
    super(props);
    this.state = {
      focused: null,
      bottomHeight: 0,
      query: this.props.query || '',
    };

    this.input = null;
  }

  /**
   * Adds callback for keyboardWillChange.
   */
  componentDidMount() {
    registerEvents([EVENT_KEYBOARD_WILL_CHANGE]);
    event.addCallback(EVENT_KEYBOARD_WILL_CHANGE, this.handleKeyboardChange);
  }

  /**
   * Removing callback for keyboardWillChange.
   */
  componentWillUnmount() {
    event.removeCallback(EVENT_KEYBOARD_WILL_CHANGE, this.handleKeyboardChange);
  }

  /**
   * Fetch the search suggestions, debounced to reduce the request amount.
   */
  fetchSuggestions = debounce((query) => {
    if (query.length >= suggestionsMinChars) {
      this.props.fetchSuggestions(query);
    }
  }, 200, { maxWait: 400 });

  /**
   * Sets a reference to the input fields DOM element.
   * @param {HTMLElement} ref The reference.
   */
  setInputRef = (ref) => {
    this.input = ref;
  };

  /**
   * Handler for keyboardWillChange event.
   * @param {Object} props Props.
   * @param {number} props.overlap Current overlap.
   * @type {func}
   */
  handleKeyboardChange = ({ overlap }) => {
    this.setState({
      bottomHeight: overlap,
    });
  };

  /**
   * resets the state
   */
  reset = () => {
    setTimeout(() => {
      /*
       * Delay the execution of the state change until the next cycle
       * to give pending click events a chance to run.
       */
      this.setState({
        query: '',
        focused: null,
      });
    }, 0);
  }

  /**
   * @param {string} value The updated value.
   */
  update = (value) => {
    this.fetchSuggestions(value);
    this.setState({ query: value });
  };

  /**
   * Handles changes to the focus of the input element.
   * @param {boolean} focused Whether the element currently became focused.
   */
  handleFocusChange = (focused) => {
    const { TabBar } = this.props;
    const bufferTimeout = 100;

    setTimeout(() => {
      /*
       * Delay the execution of the state change until the next cycle
       * to give pending click events a chance to run.
       */
      this.setState({ focused });
    }, 0);

    if (!TabBar) {
      return;
    }

    if (!focused) {
      setTimeout(() => {
        TabBar.show();
      }, bufferTimeout);
    } else {
      TabBar.hide();
    }
  };

  /**
   * Handles the form submit event.
   * @param {Object} e The event object.
   * @param {string} searchQuery Defaults to query in state.
   */
  handleSubmit = (e, searchQuery) => {
    e.preventDefault();

    const query = searchQuery || this.state.query;
    if (!query) {
      return;
    }
    setTimeout(() => {
      router.update(this.props.pageId, { query });

      this.setState({ focused: false });
      this.input.blur();
      this.props.submitSearch(query);
    }, 0);
  };

  /**
   * Renders the hint element.
   * @return {JSX}
   */
  renderLabelElement = () => (
    <label
      htmlFor={this.props.name}
      className={styles.label}
    >
      <div className={styles.icon}>
        <SearchIcon />
      </div>
      {!this.state.query.length && <I18n.Text string="persistent_search_bar.label" />}
    </label>
  );

  /**
   * Renders the cancel button.
   * @return {JSX}
   */
  renderCancelButton = () => (
    <button
      className={classNames(styles.button, {
        [styles.hidden]: this.state.focused === null,
      })}
      onClick={this.reset}
      type="button"
    >
      <I18n.Text string="persistent_search_bar.cancel" />
    </button>
  );

  /**
   * Renders the input field.
   * @return {JSX}
   */
  renderInputField = () => (
    <Input
      autoComplete={false}
      className={styles.input}
      onFocusChange={this.handleFocusChange}
      onChange={this.update}
      onSubmit={this.handleSubmit}
      value={this.state.query}
      setRef={this.setInputRef}
      type="search"
    />
  );

  /**
 * Renders the scanner icon
 * @returns {JSX}
 */
  renderScannerIcon = () => {
    if (!this.props.showScannerIcon || this.state.focused !== null) {
      return null;
    }
    return (
      <button className={styles.scannerIcon} onClick={this.props.openScanner} type="button" aria-label={i18n.text('persistent_search_bar.open_scanner')}>
        <BarcodeScannerIcon />
      </button>

    );
  }

  /**
   * Renders the text field.
   * @return {JSX}
   */
  render() {
    const { focused } = this.state;

    if (!this.props.isVisible) {
      return null;
    }

    let { widgetSettings: { background } } = this.props;
    if (barBgColor) {
      background = barBgColor;
    }

    const overlayClassname = classNames(styles.overlay, {
      [styles.overlayIOS]: this.props.isIOSTheme(),
      [styles.overlayGmd]: !this.props.isIOSTheme(),
    });

    return (
      <div data-test-id="SearchField">
        <div
          className={styles.container}
          {...background && { style: { backgroundColor: background } }}
        >
          <div className={styles.inputWrapper}>
            <form onSubmit={this.handleSubmit} action=".">
              {this.renderLabelElement()}
              {this.renderInputField()}
              {this.renderScannerIcon()}
            </form>
          </div>
          <div>
            {this.renderCancelButton()}
          </div>
        </div>

        {
          /**
           * Since we use React-portal to render outside theme tree (since the theme context will
           * not be available anymore) we need to pass theme context value down for children
           *
          */
        }

        <ThemeContext.Consumer>
          {theme => (
            <ReactPortal isOpened={focused !== null}>
              <ThemeContext.Provider value={theme}>
                <div className={overlayClassname}>
                  <SearchSuggestions
                    searchPhrase={this.state.query}
                    bottomHeight={this.state.bottomHeight}
                    onClick={this.handleSubmit}
                    visible={focused !== null}
                  >
                    {focused !== null && (
                    <SuggestionList
                      isIOSTheme={this.props.isIOSTheme}
                      searchPhrase={this.state.query}
                      onClick={this.handleSubmit}
                      bottomHeight={this.state.bottomHeight}
                    />
                    )}
                  </SearchSuggestions>
                </div>
              </ThemeContext.Provider>
            </ReactPortal>
          )}
        </ThemeContext.Consumer>
      </div>
    );
  }
}

export default withTheme(
  withWidgetSettings(
    connect(SearchField),
    '@shopgate/engage/components/AppBar'
  )
);
