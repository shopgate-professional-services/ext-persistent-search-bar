import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Grid from '@shopgate/pwa-common/components/Grid';
import Link from '@shopgate/pwa-common/components/Link';
import Glow from '@shopgate/pwa-ui-shared/Glow';
import styles from './style';

/**
 * The list item component.
 */
class Item extends Component {
  static propTypes = {
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
      isDisabled, isSelected, title, image,
    } = this.props;

    let gridStyles = styles.grid;
    let titleStyles = styles.title;

    if (isSelected) {
      gridStyles += ` ${styles.selected}`;
    }

    if (isDisabled) {
      titleStyles += ` ${styles.disabled}`;
    }

    return (
      <Grid className={gridStyles} component="div">
        {!!image && (
          <div className={styles.image}>
            {image}
          </div>)
        }
        <Grid.Item
          className={titleStyles}
          component="div"
          grow={1}
        >
          {title}
        </Grid.Item>
        {this.props.rightComponent &&
          <Grid.Item component="div" grow={1}>
            {this.props.rightComponent}
          </Grid.Item>
        }
      </Grid>
    );
  }

  /**
   * Renders the component.
   * @returns {JSX.Element}
   */
  render() {
    /**
     * If this item is disabled, selected or doesn't have a valid
     * link or click handler then wrap the content with other components.
     */
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
        className={styles.button}
      >
        <Glow className={this.props.className}>
          {this.renderContent()}
        </Glow>
      </button>
    );
  }
}

export default Item;
