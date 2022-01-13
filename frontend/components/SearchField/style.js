import { css } from 'glamor';
import { themeConfig } from '@shopgate/pwa-common/helpers/config';
import { border, borderRadius, searchIconColor } from '../../config';

const { colors } = themeConfig;
export const HEADER_HEIGHT = 56;
export const IOS_SEARCH_HEIGHT = 44;
export const GMD_SEARCH_HEIGHT = 58;

const container = css({
  display: 'flex',
  justifyContent: 'space-between',
  flexWrap: 'nowrap',
  alignItems: 'center',
  padding: '8px 16px',
  backgroundColor: 'white',
  flex: 1,
}).toString();

const inputWrapper = css({
  display: 'flex',
  justifyContent: 'space-between',
  alignItems: 'center',
  position: 'relative',
  flex: 1,
  overflow: 'hidden',
  ...(border ? { border } : null),
  ...(borderRadius ? { borderRadius } : null),
  padding: `0px ${border ? '8px' : '0px'}`,
}).toString();

const form = css({
  display: 'flex',
  flex: 1,
}).toString();

const input = css({
  display: 'flex',
  flex: 1,
  lineHeight: '28px',
  padding: '4px 0',
  outline: 'none',
  background: colors.background,
  WebkitAppearance: 'none',
}).toString();

const scannerIcon = css({
  padding: '4px 6px 4px 4px',
  color: '#8a8a8f',
  fontSize: '1.7rem',
  right: 0,
}).toString();

const button = css({
  color: colors.accent,
  paddingLeft: 16,
  paddingRight: 0,
  marginLeft: 0,
  marginRight: 0,
}).toString();

const hidden = css({
  display: 'none',
}).toString();

const label = css({
  alignItems: 'center',
  color: '#8a8a8f',
  display: 'flex',
  height: '36px',
  position: 'absolute',
  pointerEvents: 'none',
  width: '100%',
}).toString();

const labelHidden = css({
  display: 'none',
}).toString();

const icon = css({
  marginRight: 8,
  flexShrink: 0,
  color: '#8a8a8f',
  fontSize: '1.235rem',
  ...(searchIconColor ? { color: searchIconColor } : null),
}).toString();

const overlay = css({
  background: 'rgba(0,0,0, 0.4)',
  position: 'fixed',
  left: 0,
  width: '100%',
  bottom: 0,
  zIndex: 2,
  overflow: 'hidden',
  outline: 'none',
}).toString();

const overlayIOS = css({
  top: `calc(var(--safe-area-inset-top) + ${HEADER_HEIGHT}px + ${IOS_SEARCH_HEIGHT}px )`,
}).toString();

const overlayGmd = css({
  top: `calc(var(--safe-area-inset-top) + ${HEADER_HEIGHT}px + ${GMD_SEARCH_HEIGHT}px )`,
}).toString();

export default {
  container,
  inputWrapper,
  input,
  form,
  scannerIcon,
  button,
  hidden,
  icon,
  label,
  labelHidden,
  overlay,
  overlayIOS,
  overlayGmd,
};
