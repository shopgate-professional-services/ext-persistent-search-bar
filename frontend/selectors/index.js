import { createSelector } from 'reselect';
import { CATEGORY_PATTERN } from '@shopgate/engage/category';
import { SEARCH_PATTERN } from '@shopgate/engage/search';
import { getCurrentRoute } from '@shopgate/pwa-common/helpers/router';
import { SEARCH_BAR_BLACKLIST, FILTER_BAR_PORTAL } from '../constants';

/**
 * Creates a selector to determine if connected component is rendered within a filter bar portal
 * @returns {Function}
 */
const makeGetIsFilterBarPortal = () => createSelector(
  (_, props) => props,
  ({ name }) => name === FILTER_BAR_PORTAL
);

/**
 * Creates a selector to determine if a route has a filter bar
 * @returns {Function}
 */
const makeGetIsFilterBarRoute = () => createSelector(
  (_, props) => props.route,
  (route) => {
    const { pattern } = route;
    return [CATEGORY_PATTERN, SEARCH_PATTERN].includes(pattern);
  }
);

/**
 * Creates a selector to determine if a route is blacklisted
 * @returns {Function}
 */
const makeGetIsBlacklistedRoute = () => createSelector(
  (_, props) => props.route,
  (route) => {
    const { pattern } = route;
    return SEARCH_BAR_BLACKLIST.includes(pattern);
  }
);

/**
 * Creates a selector to determine if the search bar is supposed to be visible
 * @returns {Function}
 */
export const makeGetIsSearchBarVisible = () => {
  const getIsBlacklistedRoute = makeGetIsBlacklistedRoute();
  const getIsFilterBarPortal = makeGetIsFilterBarPortal();
  const getIsFilterBarRoute = makeGetIsFilterBarRoute();

  return createSelector(
    getIsBlacklistedRoute,
    getIsFilterBarRoute,
    getIsFilterBarPortal,
    (isBlacklistedRoute, isFilterBarRoute, isFilterBarPortal) => {
      if (isBlacklistedRoute) {
        return false;
      }

      return !isFilterBarRoute || (isFilterBarRoute && isFilterBarPortal);
    }
  );
};

/**
 * Creates a selector to determine if the app bar icon is supposed to be visible
 * @returns {Function}
 */
export const makeGetIsAppBarIconVisible = () => createSelector(
  // Usage of currentRoute, since the portal is outside the router context
  getCurrentRoute,
  route => !SEARCH_BAR_BLACKLIST.includes(route.pattern)
);
