import { createSelector } from 'reselect';
import { getCurrentRoute } from '@shopgate/pwa-common/helpers/router';
import { searchBarBlacklist } from '../constants';

/**
 * Checks if the search bar is visible for the current route.
 * @return {boolean}
 */
export const isSearchBarVisible = createSelector(
  getCurrentRoute,
  route =>
    !searchBarBlacklist.find(entry => route.pattern === entry)
);
