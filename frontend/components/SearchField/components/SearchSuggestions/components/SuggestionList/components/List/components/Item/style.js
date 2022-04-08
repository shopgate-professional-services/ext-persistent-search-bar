import { css } from 'glamor';
import { themeConfig } from '@shopgate/pwa-common/helpers/config';

const { colors, variables } = themeConfig;

const disabled = css({
  color: colors.shade5,
}).toString();

const selected = css({
  background: colors.shade7,
  boxShadow: `0 -1px 0 0 ${colors.shade7}, 0 1px 0 0 ${colors.shade7}`,
}).toString();

const title = css({
  width: '100%',
  marginTop: 2,
  paddingRight: 16,
  hyphens: 'auto',
  overflowWrap: 'break-word',
  wordBreak: 'break-word',
  textAlign: 'left',
}).toString();

const grid = css({
  alignItems: 'center',
  minHeight: variables.navigator.height,
  padding: `${variables.gap.small}px 0`,
  paddingLeft: 40,
  position: 'relative',
  zIndex: 2,
}).toString();

const image = css({
  alignSelf: 'flex-start',
  flexShrink: 0,
  margin: `0 ${variables.gap.big}px`,
  width: 40,
}).toString();

const button = css({
  flex: 1,
}).toString();

export default {
  disabled,
  selected,
  title,
  grid,
  image,
  button,
};
