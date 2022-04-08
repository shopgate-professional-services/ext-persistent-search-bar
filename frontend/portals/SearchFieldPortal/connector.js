import { connect } from 'react-redux';
import { makeGetIsSearchBarVisible } from '../../selectors';

/**
 * Maps the contents of the state to the component props.
 * @param {Object} state The current application state.
 * @param {Object} props The component props.
 * @return {Object} The extended component props.
 */
const makeMapStateToProps = () => {
  const getIsSearchBarVisible = makeGetIsSearchBarVisible();

  return (state, props) => ({
    isVisible: getIsSearchBarVisible(state, props),
  });
};

/**
 * Connects a component to the store.
 * @param {Object} Component A react component.
 * @return {Object} The react component with extended props.
 */
export default connect(makeMapStateToProps);
