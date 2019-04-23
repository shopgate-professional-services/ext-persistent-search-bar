import { css } from 'glamor';

const placeholder = css({
  height: '56px',
  width: '56px',
  ':empty': {
    height: '56px',
    width: '56px',
  },
}).toString();

export default { placeholder };
