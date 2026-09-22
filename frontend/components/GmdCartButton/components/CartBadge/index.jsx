import React, { memo } from 'react';
import PropTypes from 'prop-types';
import { i18n } from '@shopgate/engage/core';
import { makeStyles } from '@shopgate/engage/styles';
import { CART_MAX_ITEMS } from '../../../../constants';

const useStyles = makeStyles()(theme => ({
  badge: {
    position: 'absolute',
    fontSize: '0.75rem',
    lineHeight: 1.4,
    fontWeight: 700,
    background: theme.palette.primary.contrastText,
    color: theme.palette.primary.main,
    borderRadius: 8,
    height: 16,
    minWidth: 16,
    paddingLeft: 4,
    paddingRight: 4,
    top: 12,
    right: 18,
    transform: 'translateX(50%)',
    boxShadow: '0 1px 1px rgba(0, 0, 0, 0.25)',
  },
}));

/**
 * The CartButtonBadge component.
 * @param {Object} props Props.
 * @param {number} props.count The cart product count.
 * @returns {JSX.Element}
 */
const CartButtonBadge = ({ count }) => {
  const { classes } = useStyles();

  let productCount = `${count}`;
  if (count > CART_MAX_ITEMS) {
    productCount = `${CART_MAX_ITEMS}+`;
  }

  const ariaLabel = `${i18n.text('navigation.cart')}. ${i18n.text('common.products')}: ${productCount}.`;

  return (
    <div
      aria-label={ariaLabel}
      aria-hidden={productCount === '0'}
      className={classes.badge}
    >
      {productCount}
    </div>
  );
};

CartButtonBadge.propTypes = {
  count: PropTypes.number.isRequired,
};

export default memo(CartButtonBadge);
