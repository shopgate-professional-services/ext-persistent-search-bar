import React, { Component, createRef } from 'react';
import { createPortal } from 'react-dom';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import debounce from 'lodash/debounce';
import get from 'lodash/get';
import { withWidgetSettings, withTheme, i18n } from '@shopgate/engage/core';
import event from '@shopgate/pwa-core/classes/Event';
import { EVENT_KEYBOARD_WILL_CHANGE } from '@shopgate/pwa-core/constants/AppEvents';
import registerEvents from '@shopgate/pwa-core/commands/registerEvents';
import Input from '@shopgate/pwa-common/components/Input/';
import SearchIcon from '@shopgate/pwa-ui-shared/icons/MagnifierIcon';
import { router } from '@virtuous/conductor';
import BarcodeScannerIcon from '@shopgate/pwa-ui-shared/icons/BarcodeScannerIcon';
import { SurroundPortals, I18n } from '@shopgate/engage/components';
import { withView } from '../../helpers/hocs';
import SuggestionList from './components/SearchSuggestions/components/SuggestionList';
import SearchSuggestions from './components/SearchSuggestions';
import connect from './connector';
import styles from './style';
import {
  barBgColor,
  suggestionsMinChars,
  searchFieldLabel,
  showLastSearchQuery,
} from '../../config';

const portalNode = document.getElementById('portals');

/**
 * The SearchField component.
 */
class SearchField extends Component {
  static propTypes = {
    fetchSuggestions: PropTypes.func.isRequired,
    openScanner: PropTypes.func.isRequired,
    pageId: PropTypes.string.isRequired,
    submitSearch: PropTypes.func.isRequired,
    view: PropTypes.shape().isRequired,
    currentRoute: PropTypes.shape(),
    name: PropTypes.string,
    query: PropTypes.string,
    showScannerIcon: PropTypes.bool,
    TabBar: PropTypes.elementType,
    widgetSettings: PropTypes.shape(),
  };

  static defaultProps = {
    showScannerIcon: true,
    name: 'search',
    query: '',
    widgetSettings: {},
    currentRoute: {},
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
      topGap: 0,
      query: showLastSearchQuery && this.props.query ? this.props.query : '',
    };

    this.input = null;
    this.containerRef = createRef();
    this.initialOverflow = null;
    this.mounted = null;
  }

  /**
   * Adds callback for keyboardWillChange.
   */
  componentDidMount() {
    registerEvents([EVENT_KEYBOARD_WILL_CHANGE]);
    event.addCallback(EVENT_KEYBOARD_WILL_CHANGE, this.handleKeyboardChange);
    this.mounted = true;

    if (showLastSearchQuery && this.state.query) {
      this.update(this.props.query);
    }
  }

  /**
   * Resets search bar on route changes
   * @param {Object} nextProps The next props
   */
  UNSAFE_componentWillReceiveProps(nextProps) {
    if (nextProps.currentRoute.pathname !== this.props.currentRoute.pathname) {
      this.reset();
    }
  }

  /**
   * Removing callback for keyboardWillChange.
   */
  componentWillUnmount() {
    event.removeCallback(EVENT_KEYBOARD_WILL_CHANGE, this.handleKeyboardChange);
    this.mounted = false;
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
   * Retrieves the current overflow style from the View component
   * @returns {string|null}
   */
  getViewOverflow = () => {
    const viewRef = this.props.view.getContentRef();

    if (viewRef.current) {
      return viewRef.current.style.overflow;
    }

    return null;
  };

  /**
   * Updates the overflow property of the surrounding View to prevent scrolling of the view
   * "through" the search field.
   * @param {boolean} reset Whether the overflow needs to be reset
   */
  setViewOverflow = (reset = false) => {
    const viewRef = this.props.view.getContentRef();
    if (get(viewRef, 'current.style.overflow') && this.initialOverflow !== null) {
      viewRef.current.style.overflow = reset ? this.initialOverflow : 'hidden';
    }
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
      if (this.mounted) {
        this.setState({
          // Reset the query to the current search term when component closes
          query: showLastSearchQuery && this.props.query ? this.props.query : '',
          focused: null,
        });
      }

      // reset the view overflow to the original state
      this.setViewOverflow(true);

      if (this.props.TabBar) {
        this.props.TabBar.show();
      }
    }, 0);
  }

  /**
   * @param {string} value The updated value.
   */
  update = (value) => {
    if (this.mounted) {
      this.fetchSuggestions(value);
      this.setState({
        query: value,
      });
    }
  };

  /**
   * Handles changes to the focus of the input element.
   * @param {boolean} focused Whether the element currently became focused.
   */
  handleFocusChange = (focused) => {
    const { TabBar } = this.props;
    let newTopGap = this.state.topGap;

    if (this.state.focused === null) {
      // When the search overlay opens, save the original overflow style of the View
      this.initialOverflow = this.getViewOverflow();
      // Prevent View scrolling while the search is open
      this.setViewOverflow();
      // Measure the container distance to the top of the viewport
      if (this.containerRef.current) {
        ({ bottom: newTopGap } = this.containerRef.current.getBoundingClientRect());
      }
      // Hide the TabBar
      if (TabBar) {
        TabBar.hide();
      }
    }

    setTimeout(() => {
      /*
       * Delay the execution of the state change until the next cycle
       * to give pending click events a chance to run.
       */
      this.setState({
        focused,
        topGap: newTopGap,
      });
    }, 0);
  };

  /**
   * Handles the form submit event.
   * @param {Object} e The event object.
   * @param {string} searchQuery Defaults to query in state.
   */
  handleSubmit = (e, searchQuery) => {
    e.stopPropagation();
    e.preventDefault();

    const query = searchQuery || this.state.query;
    if (!query) {
      return;
    }

    // setTimeout prevents double click while VoiceOver is active
    setTimeout(() => {
      const { filters = {} } = this.props.currentRoute.state;

      router.update(this.props.pageId, { query });

      this.setState({ focused: false });
      this.input.blur();
      this.props.submitSearch(query, filters);
      this.reset();
    }, 0);
  };

  /**
   * Renders the hint element.
   * @return {JSX.Element}
   */
  renderLabelElement = () => (
    <label
      htmlFor={this.props.name}
      className={styles.label}
    >
      {!this.state.query.length && searchFieldLabel && (
      <I18n.Text string={searchFieldLabel} />
      )}
      {!this.state.query.length && !searchFieldLabel && (
      <I18n.Text string="persistent_search_bar.label" />
      )}
    </label>
  )

  /**
   * Renders the cancel button.
   * @return {JSX.Element}
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
   * @return {JSX.Element}
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
  )

  /**
   * Renders the scanner icon
   * @returns {JSX.Element}
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
   * @return {JSX.Element}
   */
  render() {
    const { focused } = this.state;

    let { widgetSettings: { background } } = this.props;
    if (barBgColor) {
      background = barBgColor;
    }

    return (
      <div data-test-id="SearchField" ref={this.containerRef}>
        <div
          className={styles.container}
          {...background && { style: { backgroundColor: background } }}
        >
          <SurroundPortals
            portalName="persistent-search-bar.input.wrapper"
            portalProps={{
              focused: this.state.focused,
              query: this.state.query,
            }}
          >
            <div className={styles.inputWrapper}>
              <div className={styles.icon}>
                <SearchIcon />
              </div>
              <form onSubmit={this.handleSubmit} action="." className={styles.form}>
                {this.renderLabelElement()}
                {this.renderInputField()}
                {this.renderScannerIcon()}
              </form>
            </div>
            <div>
              {this.renderCancelButton()}
            </div>
          </SurroundPortals>
        </div>

        { focused !== null && createPortal(
          /* eslint-disable-next-line max-len */
          /* eslint-disable-next-line jsx-a11y/click-events-have-key-events, jsx-a11y/no-static-element-interactions */
          <div
            className={styles.overlay}
            style={{ top: this.state.topGap }}
            onClick={(e) => {
              if (e.target?.className?.includes(styles.overlay)) {
                this.reset();
              }
            }}
          >
            <SearchSuggestions
              searchPhrase={this.state.query}
              bottomHeight={this.state.bottomHeight}
              onClick={this.handleSubmit}
              closeSearch={this.reset}
              visible={focused !== null}
            >
              {focused !== null && (
              <SuggestionList
                searchPhrase={this.state.query}
                onClick={this.handleSubmit}
                closeSearch={this.reset}
                bottomHeight={this.state.bottomHeight}
                topGap={this.state.topGap}
              />
              )}
            </SearchSuggestions>
          </div>,
          portalNode
        )}
      </div>
    );
  }
}

export default withTheme(
  withView(
    withWidgetSettings(
      connect(SearchField),
      '@shopgate/engage/components/AppBar'
    )
  )
);
