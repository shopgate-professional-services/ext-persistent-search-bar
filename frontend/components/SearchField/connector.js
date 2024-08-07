import { connect } from 'react-redux';
import {
  SCANNER_SCOPE_DEFAULT,
  SCANNER_TYPE_BARCODE,
} from '@shopgate/pwa-core/constants/Scanner';
import appConfig from '@shopgate/pwa-common/helpers/config';
import { historyPush } from '@shopgate/pwa-common/actions/router';
import { hasScannerSupport } from '@shopgate/pwa-common/selectors/client';
import { getScannerRoute } from '@shopgate/pwa-common-commerce/scanner/helpers';
import fetchSearchSuggestions from '@shopgate/pwa-common-commerce/search/actions/fetchSearchSuggestions';
import { SEARCH_PATH } from '@shopgate/pwa-common-commerce/search/constants';
import { getCurrentRoute } from '@shopgate/pwa-common/helpers/router';
import { getCurrentSearchQuery } from '@shopgate/pwa-common/selectors/router';

const { hasNoScanner, scanner: { showSearchFieldIcon } = {} } = appConfig;
const showScannerIcon = !hasNoScanner && showSearchFieldIcon;

/**
 * Maps the contents of the state to the component props.
 * @param {Object} state The current application state.
 * @return {Object} The extended component props.
 */
const mapStateToProps = state => ({
  showScannerIcon: showScannerIcon && hasScannerSupport(state),
  currentRoute: getCurrentRoute(state),
  query: getCurrentSearchQuery(state),
});

/**
 * Maps action dispatchers to the component props.
 * @param {Function} dispatch The store dispatcher.
 * @return {Object} The extended component props.
 */
const mapDispatchToProps = dispatch => ({
  fetchSuggestions: query => dispatch(fetchSearchSuggestions(query)),
  submitSearch: (query, filters) => dispatch(historyPush({
    pathname: `${SEARCH_PATH}?s=${encodeURIComponent(query)}`,
    state: { filters },
  })),
  openScanner: () => dispatch(historyPush({
    pathname: getScannerRoute(SCANNER_SCOPE_DEFAULT, SCANNER_TYPE_BARCODE),
    title: 'navigation.scanner',
  })),
});

/**
 * Connects a component to the store.
 * @param {Object} Component A react component.
 * @return {Object} The react component with extended props.
 */
export default connect(mapStateToProps, mapDispatchToProps);
