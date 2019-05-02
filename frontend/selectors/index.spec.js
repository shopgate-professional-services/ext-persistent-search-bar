import { getCurrentRoute } from '@shopgate/pwa-common/helpers/router';
import {
  trueState,
  falseState,
} from './mock';

import { isSearchBarVisible } from './index';

jest.mock('@shopgate/pwa-common/helpers/router', () => ({ getCurrentRoute: jest.fn() }));

describe('selectors', () => {
  describe('isSearchBarVisible', () => {
    it('should return false', () => {
      getCurrentRoute.mockReturnValueOnce(falseState);
      const result = isSearchBarVisible({});
      expect(result).toBe(false);
    });
    it('should return true', () => {
      getCurrentRoute.mockReturnValueOnce(trueState);
      const result = isSearchBarVisible({});
      expect(result).toBe(true);
    });
  });
});
