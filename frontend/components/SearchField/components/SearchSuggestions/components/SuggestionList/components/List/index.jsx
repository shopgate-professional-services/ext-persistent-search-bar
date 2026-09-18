import React from 'react';
import PropTypes from 'prop-types';
import { List as BaseList } from '@shopgate/engage/components';
import { makeStyles } from '@shopgate/engage/styles';
import Item from './components/Item';

const useStyles = makeStyles()(theme => ({
  item: {},
  itemNotLast: {
    borderBottom: `1px solid ${theme.components.separatorLine.borderColor}`,
  },
  innerContainer: {
    minHeight: 56,
    position: 'relative',
    display: 'flex',
  },
}));

/**
 * The list component.
 * @param {Object} props Props.
 * @returns {JSX.Element|null}
 */
const List = ({ children }) => {
  const { classes, cx } = useStyles();

  if (!React.Children.count(children)) {
    return null;
  }

  return (
    <BaseList>
      {React.Children.map(children, (child, index) => {
        if (!React.isValidElement(child)) {
          return null;
        }
        const key = `child-${index}`;
        const { isSelected } = child.props;
        const isLast = index === children.length - 1;

        return (
          <BaseList.Item
            className={cx(classes.item, !isLast && classes.itemNotLast)}
            isSelected={isSelected}
            key={key}
          >
            <div className={classes.innerContainer}>
              {child}
            </div>
          </BaseList.Item>
        );
      })}
    </BaseList>
  );
};

List.Item = Item;

List.propTypes = {
  children: PropTypes.node,
};

List.defaultProps = {
  children: null,
};

export default List;
