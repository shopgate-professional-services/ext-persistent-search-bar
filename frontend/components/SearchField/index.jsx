import React, {
  useState, useEffect, useRef, useCallback, useMemo, useContext,
} from 'react';
import { createPortal } from 'react-dom';
import PropTypes from 'prop-types';
import { useSelector, useDispatch } from 'react-redux';
import debounce from 'lodash/debounce';
import get from 'lodash/get';
import { i18n } from '@shopgate/engage/core';
import { makeStyles } from '@shopgate/engage/styles';
import { ViewContext } from '@shopgate/engage/components/View';
import event from '@shopgate/pwa-core/classes/Event';
import { EVENT_KEYBOARD_WILL_CHANGE } from '@shopgate/pwa-core/constants/AppEvents';
import registerEvents from '@shopgate/pwa-core/commands/registerEvents';
import {
  SCANNER_SCOPE_DEFAULT,
  SCANNER_TYPE_BARCODE,
} from '@shopgate/pwa-core/constants/Scanner';
import Input from '@shopgate/pwa-common/components/Input/';
import appConfig from '@shopgate/pwa-common/helpers/config';
import { historyPush } from '@shopgate/pwa-common/actions/router';
import { hasScannerSupport } from '@shopgate/pwa-common/selectors/client';
import { getCurrentRoute } from '@shopgate/pwa-common/helpers/router';
import { getCurrentSearchQuery } from '@shopgate/pwa-common/selectors/router';
import SearchIcon from '@shopgate/pwa-ui-shared/icons/MagnifierIcon';
import { router } from '@virtuous/conductor';
import BarcodeScannerIcon from '@shopgate/pwa-ui-shared/icons/BarcodeScannerIcon';
import { getScannerRoute } from '@shopgate/pwa-common-commerce/scanner/helpers';
import fetchSearchSuggestions from '@shopgate/pwa-common-commerce/search/actions/fetchSearchSuggestions';
import { SEARCH_PATH } from '@shopgate/pwa-common-commerce/search/constants';
import { SurroundPortals, I18n } from '@shopgate/engage/components';
import SuggestionList from './components/SearchSuggestions/components/SuggestionList';
import SearchSuggestions from './components/SearchSuggestions';
import config from '../../config.json';

const {
  border,
  suggestionsMinChars,
  searchFieldLabel,
  showLastSearchQuery,
} = config;

const portalNode = document.getElementById('portals');

const { hasNoScanner, scanner: { showSearchFieldIcon } = {} } = appConfig;
const scannerIconEnabled = !hasNoScanner && showSearchFieldIcon;

const useStyles = makeStyles()(theme => ({
  container: {
    display: 'flex',
    justifyContent: 'space-between',
    flexWrap: 'nowrap',
    alignItems: 'center',
    padding: '8px 10px',
    backgroundColor: theme.palette.background.surface,
    flex: 1,
    overflow: 'hidden',
  },
  inputWrapper: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    position: 'relative',
    ...(border ? { border } : null),
    borderRadius: theme.shape.borderRadius,
    padding: 0,
    background: theme.components.input.background,
    width: '100%',
  },
  form: {
    display: 'flex',
    flex: 1,
    alignItems: 'center',
  },
  input: {
    display: 'flex',
    flex: 1,
    lineHeight: '28px',
    padding: '4px 0',
    outline: 'none',
    WebkitAppearance: 'none',
    width: '0%',
    color: theme.components.input.text,
  },
  scannerIcon: {
    padding: '4px 6px 4px 4px',
    color: theme.components.input.text,
    fontSize: '1.7rem',
    right: 0,
    marginRight: 4,
    flexShrink: 0,
  },
  button: {
    color: theme.palette.secondary.main,
    paddingLeft: 10,
    paddingRight: 0,
    marginLeft: 0,
    marginRight: 0,
    outline: 0,
  },
  hidden: {
    display: 'none',
  },
  label: {
    alignItems: 'center',
    color: theme.components.input.text,
    display: 'flex',
    position: 'absolute',
    pointerEvents: 'none',
    width: '100%',
  },
  icon: {
    marginRight: 6,
    marginLeft: 6,
    flexShrink: 0,
    color: theme.components.input.text,
    fontSize: '1.235rem',
  },
  overlay: {
    background: 'rgba(0,0,0, 0.4)',
    position: 'fixed',
    left: 0,
    width: '100%',
    bottom: 0,
    zIndex: 2,
    overflow: 'hidden',
    outline: 'none',
  },
}));

/**
 * The SearchField component.
 * @param {Object} props The component props.
 * @returns {JSX.Element}
 */
const SearchField = ({ pageId, name, TabBar }) => {
  const { classes, cx } = useStyles();
  const dispatch = useDispatch();
  const view = useContext(ViewContext);

  const hasScanner = useSelector(hasScannerSupport);
  const currentRoute = useSelector(getCurrentRoute);
  const currentSearchQuery = useSelector(getCurrentSearchQuery);

  const [focused, setFocused] = useState(null);
  const [bottomHeight, setBottomHeight] = useState(0);
  const [topGap, setTopGap] = useState(0);
  const [query, setQuery] = useState(
    showLastSearchQuery && currentSearchQuery ? currentSearchQuery : ''
  );

  const inputRef = useRef(null);
  const containerRef = useRef(null);
  const initialOverflowRef = useRef(null);
  const mountedRef = useRef(false);
  const didMountRef = useRef(false);

  const showScannerIcon = scannerIconEnabled && hasScanner;

  const setInputRef = useCallback((ref) => {
    inputRef.current = ref;
  }, []);

  const fetchSuggestions = useMemo(() => debounce((value) => {
    if (value.length >= suggestionsMinChars) {
      dispatch(fetchSearchSuggestions(value));
    }
  }, 200, { maxWait: 400 }), [dispatch]);

  const update = useCallback((value) => {
    if (mountedRef.current) {
      fetchSuggestions(value);
      setQuery(value);
    }
  }, [fetchSuggestions]);

  const getViewOverflow = useCallback(() => {
    const viewRef = view.getContentRef();

    if (viewRef.current) {
      return viewRef.current.style.overflow;
    }

    return null;
  }, [view]);

  const setViewOverflow = useCallback((reset = false) => {
    const viewRef = view.getContentRef();
    if (get(viewRef, 'current.style.overflow') && initialOverflowRef.current !== null) {
      viewRef.current.style.overflow = reset ? initialOverflowRef.current : 'hidden';
    }
  }, [view]);

  const handleKeyboardChange = useCallback(({ overlap }) => {
    setBottomHeight(overlap);
  }, []);

  const reset = useCallback(() => {
    setTimeout(() => {
      if (mountedRef.current) {
        setQuery(showLastSearchQuery && currentSearchQuery ? currentSearchQuery : '');
        setFocused(null);
      }

      setViewOverflow(true);

      if (TabBar) {
        TabBar.show();
      }
    }, 0);
  }, [currentSearchQuery, setViewOverflow, TabBar]);

  const handleFocusChange = useCallback((isFocused) => {
    let newTopGap = topGap;

    if (focused === null) {
      initialOverflowRef.current = getViewOverflow();
      setViewOverflow();
      if (containerRef.current) {
        ({ bottom: newTopGap } = containerRef.current.getBoundingClientRect());
      }
      if (TabBar) {
        TabBar.hide();
      }
    }

    setTimeout(() => {
      setFocused(isFocused);
      setTopGap(newTopGap);
    }, 0);
  }, [focused, topGap, getViewOverflow, setViewOverflow, TabBar]);

  const handleSubmit = useCallback((e, searchQuery) => {
    e.stopPropagation();
    e.preventDefault();

    const submitQuery = searchQuery || query;
    if (!submitQuery) {
      return;
    }

    // setTimeout prevents double click while VoiceOver is active
    setTimeout(() => {
      const { filters = {} } = currentRoute.state;

      router.update(pageId, { query: submitQuery });

      setFocused(false);
      inputRef.current.blur();
      dispatch(historyPush({
        pathname: `${SEARCH_PATH}?s=${encodeURIComponent(submitQuery)}`,
        state: { filters },
      }));
      reset();
    }, 0);
  }, [query, currentRoute, pageId, dispatch, reset]);

  const openScanner = useCallback(() => {
    dispatch(historyPush({
      pathname: getScannerRoute(SCANNER_SCOPE_DEFAULT, SCANNER_TYPE_BARCODE),
      title: 'navigation.scanner',
    }));
  }, [dispatch]);

  useEffect(() => {
    registerEvents([EVENT_KEYBOARD_WILL_CHANGE]);
    event.addCallback(EVENT_KEYBOARD_WILL_CHANGE, handleKeyboardChange);
    mountedRef.current = true;

    if (showLastSearchQuery && query) {
      update(currentSearchQuery);
    }

    return () => {
      event.removeCallback(EVENT_KEYBOARD_WILL_CHANGE, handleKeyboardChange);
      mountedRef.current = false;
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    if (!didMountRef.current) {
      didMountRef.current = true;
      return;
    }
    reset();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [currentRoute.pathname]);

  return (
    <div data-test-id="SearchField" ref={containerRef}>
      <div className={classes.container}>
        <SurroundPortals
          portalName="persistent-search-bar.input.wrapper"
          portalProps={{
            focused,
            query,
          }}
        >
          <div className={classes.inputWrapper}>
            <div className={classes.icon}>
              <SearchIcon />
            </div>
            <form onSubmit={handleSubmit} action="." className={classes.form}>
              <label htmlFor={name} className={classes.label}>
                {!query.length && searchFieldLabel && (
                  <I18n.Text string={searchFieldLabel} />
                )}
                {!query.length && !searchFieldLabel && (
                  <I18n.Text string="persistent_search_bar.label" />
                )}
              </label>
              <Input
                autoComplete={false}
                className={classes.input}
                onFocusChange={handleFocusChange}
                onChange={update}
                onSubmit={handleSubmit}
                value={query}
                setRef={setInputRef}
                type="search"
              />
              {showScannerIcon && focused === null && (
                <button
                  className={classes.scannerIcon}
                  onClick={openScanner}
                  type="button"
                  aria-label={i18n.text('persistent_search_bar.open_scanner')}
                >
                  <BarcodeScannerIcon />
                </button>
              )}
            </form>
          </div>
          <div>
            <button
              className={cx(classes.button, { [classes.hidden]: focused === null })}
              onClick={reset}
              type="button"
            >
              <I18n.Text string="persistent_search_bar.cancel" />
            </button>
          </div>
        </SurroundPortals>
      </div>

      { focused !== null && createPortal(
        /* eslint-disable-next-line max-len */
        /* eslint-disable-next-line jsx-a11y/click-events-have-key-events, jsx-a11y/no-static-element-interactions */
        <div
          className={classes.overlay}
          style={{ top: topGap }}
          onClick={(e) => {
            if (e.target?.className?.includes(classes.overlay)) {
              reset();
            }
          }}
        >
          <SearchSuggestions
            searchPhrase={query}
            bottomHeight={bottomHeight}
            onClick={handleSubmit}
            closeSearch={reset}
            visible={focused !== null}
          >
            {focused !== null && (
              <SuggestionList
                searchPhrase={query}
                onClick={handleSubmit}
                closeSearch={reset}
                bottomHeight={bottomHeight}
                topGap={topGap}
              />
            )}
          </SearchSuggestions>
        </div>,
        portalNode
      )}
    </div>
  );
};

SearchField.propTypes = {
  pageId: PropTypes.string.isRequired,
  name: PropTypes.string,
  TabBar: PropTypes.elementType,
};

SearchField.defaultProps = {
  name: 'search',
  TabBar: null,
};

export default SearchField;
