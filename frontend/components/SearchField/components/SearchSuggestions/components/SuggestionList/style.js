import { css } from 'glamor';
import { HEADER_HEIGHT, IOS_SEARCH_HEIGHT, GMD_SEARCH_HEIGHT } from '../../../../style';

/**
 * @param {boolean} iOS Wether the iOS theme is active
 * @param {numeric} paddingBottom  The bottom padding
 * @param {string} bgColor The background color
 * @param {string} textColor The text color
 * @returns {string}
 */
const list = (iOS, paddingBottom, bgColor, textColor) => css({
  fontSize: 16,
  fontWeight: 400,
  bottom: 0,
  position: 'fixed',
  left: 0,
  right: 0,
  top: `calc(var(--safe-area-inset-top) + ${HEADER_HEIGHT}px + ${iOS ? IOS_SEARCH_HEIGHT : GMD_SEARCH_HEIGHT}px )`,
  background: bgColor,
  color: textColor,
  overflowY: 'scroll',
  zIndex: 3,
  borderTop: '0.5px #cecece solid',
  paddingTop: 5,
  paddingBottom,
}).toString();

export default {
  list,
};
