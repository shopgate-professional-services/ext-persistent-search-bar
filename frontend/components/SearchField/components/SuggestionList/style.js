import { css } from 'glamor';
import { HEADER_HEIGHT, IOS_SEARCH_HEIGHT, GMD_SEARCH_HEIGHT } from '../../style';

/**
 * Manipulates the css when keyboard is opened to keep the UI scrollable.
 * @param {number} value Keyboard overlap value.
 * @returns {string}
 */
const bottom = value => css({
  paddingBottom: value,
}).toString();

const iosList = css({
  fontSize: 16,
  fontWeight: 400,
  bottom: 0,
  position: 'fixed',
  left: 0,
  right: 0,
  top: `calc(var(--safe-area-inset-top) + ${HEADER_HEIGHT}px + ${IOS_SEARCH_HEIGHT}px )`,
  backgroundColor: '#fff',
  overflowY: 'scroll',
  zIndex: 3,
  borderTop: '0.5px #cecece solid',
  paddingTop: 5,
}).toString();

const gmdList = css({
  fontSize: 16,
  fontWeight: 400,
  bottom: 0,
  position: 'fixed',
  left: 0,
  right: 0,
  top: `calc(var(--safe-area-inset-top) + ${HEADER_HEIGHT}px + ${GMD_SEARCH_HEIGHT}px )`,
  backgroundColor: '#fff',
  overflowY: 'scroll',
  zIndex: 3,
  borderTop: '0.5px #cecece solid',
  paddingTop: 5,
}).toString();

const item = css({
  alignItems: 'center',
  background: '#fff',
  display: 'flex',
  marginTop: 2,
  outline: 0,
  padding: '10px 16px 10px 50px',
  width: '100%',
  textAlign: 'left',
  borderBottom: '0.5px #cecece solid',
}).toString();

export default {
  bottom,
  iosList,
  gmdList,
  item,
};
