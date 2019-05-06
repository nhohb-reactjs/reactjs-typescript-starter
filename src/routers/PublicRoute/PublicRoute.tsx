import * as React from 'react';
import { Route } from 'react-router-dom';
import { RouteProps } from './RouteProps';

class PublicRoute extends React.Component<RouteProps, {}> {
  public render() {
    const {
      path,
      componentName,
      exact = true,
    } = this.props;

    const ComponentRoute = React.lazy(() => import(`src/modules/${componentName}`));

    return <Route
      exact={exact}
      path={path}
      render={(props) => (
        <React.Suspense fallback={<div>Loading...</div>}>
          <ComponentRoute {...props} />
        </React.Suspense>
      )}
    />;
  }
}

export default PublicRoute;
