import React from 'react';
import PropTypes from 'prop-types';
import { useDispatch } from 'react-redux';
import Transition from 'react-transition-group/Transition';
import { AppBar } from '@shopgate/pwa-ui-material';
import { CartIcon } from '@shopgate/pwa-ui-shared';
import { SurroundPortals } from '@shopgate/engage/components';
import { historyPush } from '@shopgate/pwa-common/actions/router';
import { CART_PATH } from '@shopgate/pwa-common-commerce/cart/constants';
import { APP_BAR_CART_BUTTON } from '@shopgate/pwa-common/constants/Portals';
import { makeStyles } from '@shopgate/engage/styles';
import Badge from './components/CartBadge';

const useStyles = makeStyles()(() => ({
  transition: {
    flexShrink: 0,
    overflow: 'hidden',
    transition: 'width 250ms cubic-bezier(0.25, 0.1, 0.25, 1)',
  },
}));

const transitionStyles = {
  entering: { width: 56 },
  entered: { width: 56 },
  exiting: { width: 0 },
  exited: { width: 0 },
};

/**
 * The GMD CartButton component.
 * @param {Object} props Props.
 * @param {number} props.count The cart product count.
 * @returns {JSX.Element}
 */
const GMDCartButton = ({ count }) => {
  const { classes, theme } = useStyles();
  const dispatch = useDispatch();

  return (
    <Transition in={count > 0} timeout={250}>
      {state => (
        <SurroundPortals portalName={APP_BAR_CART_BUTTON}>
          <div
            aria-hidden={count === 0}
            className={classes.transition}
            style={transitionStyles[state]}
          >
            <AppBar.Icon
              background={theme.palette.primary.main}
              badge={() => <Badge count={count} />}
              color={theme.palette.primary.contrastText}
              icon={CartIcon}
              onClick={() => dispatch(historyPush({ pathname: CART_PATH }))}
              testId="CartButton"
            />
          </div>
        </SurroundPortals>
      )}
    </Transition>
  );
};

GMDCartButton.propTypes = {
  count: PropTypes.number.isRequired,
};

export default GMDCartButton;
