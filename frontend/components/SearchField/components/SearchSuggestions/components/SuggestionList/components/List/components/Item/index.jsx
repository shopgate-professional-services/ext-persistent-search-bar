import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Grid, Link, Glow } from '@shopgate/engage/components';
import { withStyles, cx } from '@shopgate/engage/styles';

/**
 * The list item component.
 */
class Item extends Component {
  static propTypes = {
    classes: PropTypes.shape().isRequired,
    title: PropTypes.string.isRequired,
    className: PropTypes.string,
    image: PropTypes.element,
    isDisabled: PropTypes.bool,
    isSelected: PropTypes.bool,
    link: PropTypes.string,
    onClick: PropTypes.func,
    rightComponent: PropTypes.element,
    testId: PropTypes.string,
  };

  static defaultProps = {
    className: null,
    image: null,
    isDisabled: false,
    isSelected: false,
    link: null,
    onClick: null,
    rightComponent: null,
    testId: null,
  };

  /**
   * Should only update what the `selected` or `disabled` props change.
   * @param {Object} nextProps The next set of component props.
   * @returns {boolean}
   */
  shouldComponentUpdate(nextProps) {
    return (
      this.props.isSelected !== nextProps.isSelected ||
      this.props.isDisabled !== nextProps.isDisabled
    );
  }

  /**
   * Renders the bulk of the content.
   * @returns {JSX.Element}
   */
  renderContent() {
    const {
      isDisabled, isSelected, title, image, classes,
    } = this.props;

    return (
      <Grid className={cx(classes.grid, isSelected && classes.selected)} component="div">
        {!!image && <div className={classes.image}>{image}</div>}
        <Grid.Item
          className={cx(classes.title, isDisabled && classes.disabled)}
          component="div"
          grow={1}
        >
          {title}
        </Grid.Item>
        {this.props.rightComponent && (
          <Grid.Item component="div" grow={1}>
            {this.props.rightComponent}
          </Grid.Item>
        )}
      </Grid>
    );
  }

  /**
   * Renders the component.
   * @returns {JSX.Element}
   */
  render() {
    if (
      this.props.isDisabled ||
      (!this.props.link && !this.props.onClick)
    ) {
      return this.renderContent();
    }

    if (this.props.link) {
      return (
        <Glow className={this.props.className}>
          <Link href={this.props.link} onClick={this.props.onClick}>
            {this.renderContent()}
          </Link>
        </Glow>
      );
    }

    return (
      <button
        type="button"
        onClick={this.props.onClick}
        data-test-id={this.props.testId}
        aria-label={this.props.title}
        className={this.props.classes.button}
      >
        <Glow className={this.props.className}>
          {this.renderContent()}
        </Glow>
      </button>
    );
  }
}

export default withStyles(Item, () => ({
  disabled: {
    color: '#ccc',
  },
  selected: {
    background: '#eaeaea',
    boxShadow: '0 -1px 0 0 #eaeaea, 0 1px 0 0 #eaeaea',
  },
  title: {
    width: '100%',
    marginTop: 2,
    paddingRight: 16,
    hyphens: 'auto',
    overflowWrap: 'break-word',
    wordBreak: 'break-word',
    textAlign: 'left',
  },
  grid: {
    alignItems: 'center',
    minHeight: 56,
    padding: '8px 0',
    paddingLeft: 40,
    position: 'relative',
    zIndex: 2,
  },
  image: {
    alignSelf: 'flex-start',
    flexShrink: 0,
    margin: '0 16px',
    width: 40,
  },
  button: {
    flex: 1,
  },
}));
