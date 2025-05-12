import React from 'react';
import { ViewContext } from '@shopgate/engage/components/View';

/**
 * Injects the view properties into the desired component.
 * @param {JSX} WrappedComponent The react component to wrap.
 * @returns {JSX}
 */
export function withView(WrappedComponent) {
  /**
   * The actual HOC.
   * @param {Object} props The component props.
   * @returns {JSX}
   */
  const WithView = props => (
    <ViewContext.Consumer>
      {viewContext => (
        <WrappedComponent view={viewContext} {...props} />
      )}
    </ViewContext.Consumer>
  );

  const displayName = WrappedComponent.displayName || WrappedComponent.name || 'Component';
  WithView.displayName = `WithView(${displayName})`;

  return WithView;
}
