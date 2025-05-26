import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import { i18n } from '@shopgate/engage/core';
import { CART_MAX_ITEMS } from '../../../../constants';
import styles from './style';

/**
 * The CartButtonBadge component.
 */
class CartButtonBadge extends PureComponent {
  static propTypes = {
    count: PropTypes.number.isRequired,
  };

  /**
   * @returns {string}
   */
  get productCount() {
    const { count } = this.props;

    let productCount = `${count}`;

    if (count > CART_MAX_ITEMS) {
      productCount = `${CART_MAX_ITEMS}+`;
    }

    return productCount;
  }

  /**
   * @returns {JSX.Element}
   */
  render() {
    const ariaLabel = `${i18n.text('navigation.cart')}. ${i18n.text('common.products')}: ${this.productCount}.`;

    return (
      <div
        aria-label={ariaLabel}
        aria-hidden={this.productCount === '0'}
        className={styles}
      >
        {this.productCount}
      </div>
    );
  }
}

export default CartButtonBadge;
