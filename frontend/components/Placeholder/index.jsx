import React from 'react';
import { makeStyles } from '@shopgate/engage/styles';

const useStyles = makeStyles()(() => ({
  placeholder: {
    height: 56,
    width: 56,
    ':empty': {
      height: 56,
      width: 56,
    },
  },
}));

/**
 * Renders placeholder component for home page GMD route
 * @returns {JSX.Element}
 */
export const Placeholder = () => {
  const { classes } = useStyles();

  return <div aria-hidden className={classes.placeholder} />;
};
