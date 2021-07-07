import React, {
  useState, useContext, useRef, useCallback,
} from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import { ViewContext } from '@shopgate/engage/components/View';
import { useScroll } from './useScroll';
import { header, hidden } from './style';

/**
 * Scroll Header component
 * @param {Object} props props
 * @returns {JSX}
 *
 * @refactor since Engage 6.14.0
 */
function ScrollHeader({ children }) {
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
      className={classNames(
        header,
        shouldHideHeader && hidden
      )}
    >
      {children}
    </div>
  );
}

ScrollHeader.propTypes = {
  children: PropTypes.node.isRequired,
};

export default ScrollHeader;
