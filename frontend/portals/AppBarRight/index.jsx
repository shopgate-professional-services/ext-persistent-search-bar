import React, { useMemo } from 'react';
import PropTypes from 'prop-types';
import { useSelector } from 'react-redux';
import { isIOSTheme } from '@shopgate/engage/core';
import { INDEX_PATH } from '@shopgate/pwa-common/constants/RoutePaths';
import { getCurrentRoute } from '@shopgate/pwa-common/helpers/router';
import { getCartProductDisplayCount } from '@shopgate/pwa-common-commerce/cart/selectors';
import { makeGetIsAppBarIconVisible } from '../../selectors';
import GMDCartButton from '../../components/GmdCartButton';
import { Placeholder } from '../../components/Placeholder';

/**
 * Renders SearchField component in app-bar.below.before portal
 * @param {Object} props Props.
 * @returns {JSX}
 */
const AppBarRight = ({ children }) => {
  const getIsAppBarIconVisible = useMemo(makeGetIsAppBarIconVisible, []);
  const isVisible = useSelector(getIsAppBarIconVisible);
  const count = useSelector(getCartProductDisplayCount);
  const pattern = useSelector(state => getCurrentRoute(state).pattern);

  if (isIOSTheme() || !isVisible) {
    return children;
  }
  if (pattern === INDEX_PATH && count === 0) {
    return (
      <Placeholder />
    );
  }
  return (<GMDCartButton count={count} />);
};

AppBarRight.propTypes = {
  children: PropTypes.node,
};

AppBarRight.defaultProps = {
  children: null,
};

export default AppBarRight;

export { AppBarRight as UnwrappedAppBarRight };
