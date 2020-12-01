import { css } from 'glamor';

export const header = css({
  height: 'auto',
  overflow: 'hidden',
  transform: 'translateY(0)',
  transition: 'height,translateY 2s ease',
}).toString();

export const hidden = css({
  transform: 'translateY(-110%)',
  height: 0,
}).toString();
