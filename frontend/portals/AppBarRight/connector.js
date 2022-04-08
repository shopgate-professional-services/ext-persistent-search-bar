import { connect } from 'react-redux';
import { getCartProductDisplayCount } from '@shopgate/pwa-common-commerce/cart/selectors';
import { makeGetIsAppBarIconVisible } from '../../selectors';

/**
 * Maps the contents of the state to the component props.
 * @param {Object} state The current application state.
 * @return {Object} The extended component props.
 */
const makeMapStateToProps = () => {
  const getIsAppBarIconVisible = makeGetIsAppBarIconVisible();

  return (state, props) => ({
    isVisible: getIsAppBarIconVisible(state, props),
    count: getCartProductDisplayCount(state),
  });
};

export default connect(makeMapStateToProps);
