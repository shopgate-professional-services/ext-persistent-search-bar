import React from 'react';
import PropTypes from 'prop-types';
import isIOSTheme from '@shopgate-ps/pwa-extension-kit/env/helpers/isIOSTheme';
import { withPageState } from '@shopgate-ps/pwa-extension-kit/connectors';
import { INDEX_PATH } from '@shopgate/pwa-common/constants/RoutePaths';
import { Placeholder } from '../../components/Placeholder';

/**
 * Renders SeachedField component in app-bar.below.before portal
 * @returns {JSX}
 */
const AppBarRight = ({ children, pattern }) => {
  if (isIOSTheme()) {
    return children;
  }
  if (pattern === INDEX_PATH) {
    return (
      <Placeholder />
    );
  }
  return null;
};

AppBarRight.propTypes = {
  pattern: PropTypes.string.isRequired,
  children: PropTypes.node,
};

AppBarRight.defaultProps = {
  children: null,
};

export default withPageState(AppBarRight);
