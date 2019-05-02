import { createSelector } from 'reselect';
import { getCurrentRoute } from '@shopgate/pwa-common/helpers/router';
import { SEARCH_BAR_BLACKLIST } from '../constants';

/**
 * Checks if the search bar is visible for the current route.
 * @return {boolean}
 */
export const isSearchBarVisible = createSelector(
  getCurrentRoute,
  route => !SEARCH_BAR_BLACKLIST.find(entry => route.pattern === entry)
);
