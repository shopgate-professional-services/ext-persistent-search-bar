import { connect } from 'react-redux';
import { historyPush } from '@shopgate/pwa-common/actions/router';
import { CART_PATH } from '@shopgate/pwa-common-commerce/cart/constants';

/**
 * @param {Function} dispatch The store dispatch method.
 * @return {Object}
 */
const mapDispatchToProps = dispatch => ({
  navigate: () => dispatch(historyPush({ pathname: CART_PATH })),
});

export default connect(null, mapDispatchToProps);
