import { css } from 'glamor';

/**
 * @param {numeric} topGap The top gap value
 * @param {numeric} paddingBottom  The bottom padding
 * @param {string} bgColor The background color
 * @param {string} textColor The text color
 * @returns {string}
 */
const list = (topGap, paddingBottom, bgColor, textColor) => css({
  fontSize: 16,
  fontWeight: 400,
  bottom: 0,
  position: 'fixed',
  left: 0,
  right: 0,
  top: topGap,
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
