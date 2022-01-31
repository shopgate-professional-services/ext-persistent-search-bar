import { css } from 'glamor';
import { themeConfig } from '@shopgate/pwa-common/helpers/config';
import { border, borderRadius, searchIconColor } from '../../config';

const { colors } = themeConfig;

const container = css({
  display: 'flex',
  justifyContent: 'space-between',
  flexWrap: 'nowrap',
  alignItems: 'center',
  padding: '8px 10px',
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
  padding: 0,
  background: colors.background,
}).toString();

const form = css({
  display: 'flex',
  flex: 1,
  alignItems: 'center',
}).toString();

const input = css({
  display: 'flex',
  flex: 1,
  lineHeight: '28px',
  padding: '4px 0',
  outline: 'none',
  WebkitAppearance: 'none',
}).toString();

const scannerIcon = css({
  padding: '4px 6px 4px 4px',
  color: '#8a8a8f',
  fontSize: '1.7rem',
  right: 0,
  marginRight: 4,
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
  position: 'absolute',
  pointerEvents: 'none',
  width: '100%',
}).toString();

const labelHidden = css({
  display: 'none',
}).toString();

const icon = css({
  marginRight: 6,
  marginLeft: 6,
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
};
