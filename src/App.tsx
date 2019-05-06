import * as React from 'react';
import { Switch } from 'react-router-dom';

import { Layout } from './components';
import { PublicRoute } from './routers';

interface Props { }

class App extends React.Component {
  constructor(props: Props) {
    super(props);
  }

  public render() {
    return (
      <Layout>
        <Switch>
          <PublicRoute exact path="/" componentName="Login" />
          <PublicRoute exact path="/sign-up" componentName="SignUp" />
        </Switch>
      </Layout>
    );
  }
}

export default App;
