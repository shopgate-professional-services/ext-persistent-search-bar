import React, {
  useState, useContext, useRef, useCallback,
} from 'react';
import PropTypes from 'prop-types';
import { ViewContext } from '@shopgate/engage/components/View';
import { makeStyles } from '@shopgate/engage/styles';
import { useScroll } from './useScroll';

const useStyles = makeStyles()(() => ({
  header: {
    position: 'sticky',
    top: 0,
    left: 0,
    zIndex: 100,
    transform: 'translateY(0)',
    transition: 'transform 0.3s ease',
  },
  hidden: {
    transform: 'translateY(-110%)',
  },
}));

/**
 * Scroll Header component
 * @param {Object} props props
 * @returns {JSX}
 *
 * @refactor since Engage 6.14.0
 */
function ScrollHeader({ children }) {
  const { classes, cx } = useStyles();
  const ref = useRef();
  const [shouldHideHeader, setShouldHideHeader] = useState(false);
  const { contentRef } = useContext(ViewContext);
  const [offset, setOffset] = useState(0);

  const onScroll = useCallback((callbackData) => {
    if (!ref.current) {
      // Node is not ready or unmounted
      return;
    }
    const { previousScrollTop, currentScrollTop } = callbackData;
    if (previousScrollTop !== currentScrollTop) {
      const isScrolledDown = previousScrollTop < currentScrollTop;
      const box = ref.current.getBoundingClientRect();
      const stickHeader = currentScrollTop >= offset + 100;
      if (!previousScrollTop) {
        setOffset(currentScrollTop + box.top);
      }
      setShouldHideHeader(isScrolledDown && stickHeader);
    }
  }, [offset]);

  useScroll(onScroll, contentRef.current);

  return (
    <div
      ref={ref}
      className={cx(classes.header, shouldHideHeader && classes.hidden)}
    >
      {children}
    </div>
  );
}

ScrollHeader.propTypes = {
  children: PropTypes.node.isRequired,
};

export default ScrollHeader;
