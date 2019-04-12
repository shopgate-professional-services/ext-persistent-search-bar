import isIOSTheme from '@shopgate-ps/pwa-extension-kit/env/helpers/isIOSTheme';

/**
 * Renders SeachedField component in app-bar.below.before portal
 * @returns {JSX}
 */
const AppBarRight = ({ children }) => {
  if (isIOSTheme()) {
    return children;
  }
  return null;
};

export default AppBarRight;
