import React from 'react';
import PropTypes from 'prop-types';
import isIOSTheme from '@shopgate-ps/pwa-extension-kit/env/helpers/isIOSTheme';
import { withPageState } from '@shopgate-ps/pwa-extension-kit/connectors';
import { INDEX_PATH } from '@shopgate/pwa-common/constants/RoutePaths';
import connect from './connector';
import GMDCartButton from '../../components/GmdCartButton';
import { Placeholder } from '../../components/Placeholder';

/**
 * Renders SeachedField component in app-bar.below.before portal
 * @returns {JSX}
 */
const AppBarRight = ({ children, pattern, count }) => {
  if (isIOSTheme()) {
    return children;
  }
  if (pattern === INDEX_PATH) {
    return (
      <Placeholder />
    );
  }

  return (<GMDCartButton count={count} />);
};

AppBarRight.propTypes = {
  count: PropTypes.number.isRequired,
  pattern: PropTypes.string.isRequired,
  children: PropTypes.node,
};

AppBarRight.defaultProps = {
  children: null,
};

export default connect(withPageState(AppBarRight));
